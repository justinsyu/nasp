import csv
import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CORPUS_DIR = ROOT / "nasp_abstracts_posters_pdfs_2019_2025"
MANIFEST = CORPUS_DIR / "download_manifest.csv"
OUT_JSON = ROOT / "assets" / "data" / "presentations-index.json"
OUT_MD = ROOT / "assets" / "data" / "nasp_abstracts_posters.md"
INFOGRAPHICS_DIR = ROOT / "infographics"


CATEGORY_RULES = {
    "Access & Affordability": [
        "access", "authorization", "benefit", "copay", "cost", "financial assistance",
        "limited distribution", "payer", "prior authorization", "reimbursement",
    ],
    "Adherence & Persistence": [
        "adherence", "compliance", "discontinuation", "gap", "pdc", "persistence",
        "proportion of days covered", "refill",
    ],
    "Clinical Outcomes": [
        "clinical outcome", "efficacy", "hospitalization", "outcome", "safety",
        "therapy", "treatment", "utilization",
    ],
    "Health-System Specialty Pharmacy": [
        "health-system", "health system", "integrated", "clinic", "collaborative",
        "embedded", "liaison", "specialty pharmacy services",
    ],
    "Operations & Quality": [
        "accreditation", "call center", "delivery", "implementation", "intervention",
        "operations", "process", "quality", "workflow",
    ],
    "Patient Experience & Support": [
        "caregiver", "education", "engagement", "experience", "outreach", "patient reported",
        "patient satisfaction", "quality of life", "support program",
    ],
    "Real-World Evidence & Analytics": [
        "claims", "cohort", "database", "evidence", "real-world", "retrospective",
        "review", "study", "survey",
    ],
    "Workforce & Education": [
        "extern", "pharmacist", "residency", "staff", "student", "technician",
        "training", "workforce",
    ],
}

THERAPY_RULES = {
    "Oncology": ["cancer", "carcinoma", "chemotherapy", "leukemia", "lymphoma", "myeloma", "oncology", "tumor"],
    "Inflammatory & Autoimmune": ["adalimumab", "arthritis", "crohn", "dermatitis", "ibd", "inflammatory", "psoriasis", "rheumatology", "ulcerative colitis"],
    "Neurology": ["als", "cgrp", "migraine", "multiple sclerosis", "neurology", "parkinson", "seizure"],
    "Infectious Disease": ["covid", "hcv", "hepatitis", "hiv", "infectious", "prep", "vaccine"],
    "Cardiometabolic": ["cardiovascular", "diabetes", "heart", "hyperkalemia", "lipid", "obesity", "pcsk9"],
    "Rare Disease": ["cystic fibrosis", "hemophilia", "hereditary", "orphan", "rare", "sickle"],
    "Renal": ["kidney", "renal", "dialysis"],
    "Respiratory": ["asthma", "pulmonary", "respiratory"],
}


def clean_text(value: str) -> str:
    value = value.replace("\ufeff", "").replace("\u00a0", " ")
    value = value.replace("â€“", "-").replace("â€™", "'").replace("â€œ", '"').replace("â€\u009d", '"')
    value = re.sub(r"<[^>]+>", "", value)
    value = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", value)
    value = re.sub(r"```.*?```", "", value, flags=re.S)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def safe_slug(value: str) -> str:
    value = value.lower().replace("\u200b", "")
    value = re.sub(r"\s+", "-", value)
    value = re.sub(r"[^a-z0-9_.-]+", "-", value)
    value = re.sub(r"-{2,}", "-", value).strip("-._")
    return value or "poster"


def first_heading(markdown: str, fallback: str) -> str:
    match = re.search(r"^#\s+(.+)$", markdown, flags=re.M)
    if match:
        return clean_text(match.group(1))
    stem = re.sub(r"_20\d{2}$", "", fallback)
    return stem.replace("-", " ").replace("_", " ").strip().title()


def poster_code(filename: str) -> str:
    stem = Path(filename).stem
    stem = re.sub(r"_20\d{2}$", "", stem)
    match = re.match(r"^(\d{1,4}-[A-Z]{2,4}\d{1,3}(?:-[A-Z]{2})?)", stem, flags=re.I)
    if match:
        return match.group(1).upper()
    match = re.match(r"^(\d{1,4})", stem)
    if match:
        return match.group(1)
    return stem[:24].upper()


def extract_sections(markdown: str) -> dict:
    sections = {}
    matches = list(re.finditer(r"^##+\s+(.+)$", markdown, flags=re.M))
    for index, match in enumerate(matches):
        label = clean_text(match.group(1)).title()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        body = clean_text(markdown[start:end])
        if body:
            sections[label] = body[:6000]
    return sections


def extract_authors(markdown: str, title: str) -> str:
    after_title = markdown.split(title, 1)[-1] if title in markdown else markdown
    before_first_section = re.split(r"^##+\s+", after_title, maxsplit=1, flags=re.M)[0]
    lines = [
        clean_text(line).strip("* ")
        for line in before_first_section.splitlines()
        if clean_text(line).strip("* ")
    ]
    lines = [line for line in lines if not re.search(r"\blogo\b|qr code", line, flags=re.I)]
    return " ".join(lines[:3])[:1200]


def summarize(markdown: str, sections: dict) -> str:
    preferred = ["Conclusion", "Conclusions", "Results", "Objective", "Background", "Highlights"]
    for key in preferred:
        for label, value in sections.items():
            if label.lower() == key.lower() and len(value) > 60:
                return re.sub(r"\s+", " ", value)[:520]
    body = clean_text(markdown)
    body = re.sub(r"^# .+$", "", body, flags=re.M)
    return re.sub(r"\s+", " ", body)[:520]


def classify(text: str, rules: dict) -> list:
    haystack = text.lower()
    labels = [label for label, terms in rules.items() if any(term in haystack for term in terms)]
    return labels or ["Unclassified"]


def counts(records, field):
    counter = Counter()
    for record in records:
        value = record.get(field)
        if isinstance(value, list):
            counter.update(value)
        elif value:
            counter[value] += 1
    return [{"name": name, "count": count} for name, count in counter.most_common()]


def main():
    manifest_rows = {}
    with MANIFEST.open(newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            manifest_rows[row["filename"]] = row

    records = []
    for pdf_path in sorted(CORPUS_DIR.glob("*.pdf"), key=lambda p: p.name.lower()):
        row = manifest_rows.get(pdf_path.name, {})
        year = int(row.get("year") or re.search(r"(20\d{2})", pdf_path.name).group(1))
        md_path = pdf_path.with_suffix(".md")
        markdown = md_path.read_text(encoding="utf-8", errors="replace") if md_path.exists() else ""
        title = first_heading(markdown, pdf_path.stem)
        sections = extract_sections(markdown)
        authors = extract_authors(markdown, title)
        full_text = " ".join([title, authors, markdown])
        categories = classify(full_text, CATEGORY_RULES)
        therapies = classify(full_text, THERAPY_RULES)
        uid = pdf_path.stem.lower()
        infographic_filename = f"{safe_slug(uid)}.html"
        records.append(
            {
                "uid": uid,
                "infographic_path": f"infographics/{infographic_filename}",
                "year": year,
                "poster_code": poster_code(pdf_path.name),
                "title": title,
                "authors": authors,
                "summary": summarize(markdown, sections),
                "categories": categories,
                "therapies": therapies,
                "sections": sections,
                "pdf": {
                    "filename": pdf_path.name,
                    "local_path": f"nasp_abstracts_posters_pdfs_2019_2025/{pdf_path.name}",
                    "source_url": row.get("url", ""),
                    "bytes": int(row.get("bytes") or pdf_path.stat().st_size),
                },
                "markdown_path": f"nasp_abstracts_posters_pdfs_2019_2025/{md_path.name}",
            }
        )

    records.sort(key=lambda item: (item["year"], item["poster_code"], item["title"]))
    data = {
        "source": "https://naspnet.org/annual-meeting/abstracts-posters",
        "record_count": len(records),
        "pdf_count": len(records),
        "year_counts": counts(records, "year"),
        "categories": counts(records, "categories"),
        "therapies": counts(records, "therapies"),
        "presentations": records,
    }
    OUT_JSON.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = ["# NASP Abstracts and Posters 2019-2025", ""]
    for record in records:
        lines.extend(
            [
                f"## {record['year']} / {record['poster_code']} / {record['title']}",
                "",
                f"- PDF: {record['pdf']['local_path']}",
                f"- Source: {record['pdf']['source_url']}",
                f"- Categories: {', '.join(record['categories'])}",
                f"- Therapy areas: {', '.join(record['therapies'])}",
                "",
                record["summary"],
                "",
            ]
        )
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(records)} records to {OUT_JSON}")


if __name__ == "__main__":
    main()
