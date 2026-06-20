# NASP Abstract and Poster Archive

Static GitHub Pages interface for NASP annual meeting abstract and poster PDFs from 2019-2025, including parsed markdown from LlamaParse, source PDF links, browse filters, an Intelligence dashboard, and an HSSP Insights page for Shields, CPS, Clearway, and VytlOne/Maxor research content.

## Local preview

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Rebuild data

After adding or reparsing PDFs in `nasp_abstracts_posters_pdfs_2019_2025`, rebuild the browser index and Markdown export:

```powershell
python scripts/build_site_data.py
```
