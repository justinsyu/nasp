from __future__ import annotations

import csv
import os
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from types import SimpleNamespace

RETINA_ROOT = Path(r"C:\Users\Justin\Desktop\retina-data")
NASP_ROOT = Path(r"C:\Users\Justin\Desktop\nasp")
INPUT_DIR = NASP_ROOT / "nasp_abstracts_posters_pdfs_2019_2025"
STATUS_CSV = NASP_ROOT / "llamaparse_nasp_status.csv"

sys.path.insert(0, str(RETINA_ROOT))
import llamaparse as lp  # noqa: E402


ARGS = SimpleNamespace(tier="agentic", version="latest")
LOCK = threading.Lock()


def load_key() -> str:
    env_path = NASP_ROOT / ".env"
    values = {}
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.lstrip().startswith("#"):
                key, value = line.split("=", 1)
                values[key.strip()] = value.strip().strip('"')
    key = os.environ.get("LLAMACLOUD_API_KEY") or values.get("LLAMACLOUD_API_KEY")
    if not key:
        raise RuntimeError(f"LLAMACLOUD_API_KEY not found in {env_path}")
    return key


def append_status(row: dict[str, str]) -> None:
    with LOCK:
        exists = STATUS_CSV.exists()
        with STATUS_CSV.open("a", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(
                handle,
                fieldnames=[
                    "timestamp",
                    "filename",
                    "status",
                    "markdown",
                    "images",
                    "error",
                ],
            )
            if not exists:
                writer.writeheader()
            writer.writerow(row)


def parse_one(pdf_path: Path, api_key: str) -> tuple[str, str]:
    markdown_path = pdf_path.with_suffix(".md")
    image_dir = pdf_path.with_name(f"{pdf_path.stem}_images")
    if markdown_path.exists() and markdown_path.stat().st_size > 0:
        return pdf_path.name, "skipped_existing"

    parser = lp.create_parser(api_key, ARGS)
    last_error: Exception | None = None
    for attempt in range(1, 4):
        try:
            job_result = parser.parse(str(pdf_path))
            if isinstance(job_result, list):
                if len(job_result) != 1:
                    raise RuntimeError(f"Expected one job result for {pdf_path}")
                job_result = job_result[0]

            downloaded_images = lp.download_images(job_result, image_dir)
            markdown = lp.build_markdown(
                job_result, image_dir.name, downloaded_images
            )
            markdown_path.write_text(markdown, encoding="utf-8")
            append_status(
                {
                    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                    "filename": pdf_path.name,
                    "status": "parsed",
                    "markdown": str(markdown_path),
                    "images": str(len(downloaded_images)),
                    "error": "",
                }
            )
            return pdf_path.name, "parsed"
        except Exception as error:  # noqa: BLE001
            last_error = error
            time.sleep(min(10 * attempt, 30))

    append_status(
        {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "filename": pdf_path.name,
            "status": "failed",
            "markdown": str(markdown_path),
            "images": "0",
            "error": repr(last_error),
        }
    )
    return pdf_path.name, "failed"


def main() -> int:
    api_key = load_key()
    pdfs = sorted(INPUT_DIR.glob("*.pdf"), key=lambda path: path.name.lower())
    remaining = [
        path
        for path in pdfs
        if not path.with_suffix(".md").exists()
        or path.with_suffix(".md").stat().st_size == 0
    ]
    print(f"PDFs: {len(pdfs)}")
    print(f"Remaining: {len(remaining)}")
    if not remaining:
        return 0

    completed = 0
    counts: dict[str, int] = {}
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = [executor.submit(parse_one, path, api_key) for path in remaining]
        for future in as_completed(futures):
            filename, status = future.result()
            completed += 1
            counts[status] = counts.get(status, 0) + 1
            if completed % 10 == 0 or status == "failed" or completed == len(futures):
                md_count = len(list(INPUT_DIR.glob("*.md")))
                print(
                    f"{completed}/{len(futures)} done; md={md_count}; "
                    f"last={status}: {filename}",
                    flush=True,
                )
    print(f"Counts: {counts}")
    return 1 if counts.get("failed") else 0


if __name__ == "__main__":
    raise SystemExit(main())
