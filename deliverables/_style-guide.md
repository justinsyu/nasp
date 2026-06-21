# HTML Report Style Guide

Distilled verbatim from `company-specific-insights.html` (MASCC/ISOO 2026). Every class, color, and font below is copied from that source. Do not invent new styles. The complete, exact CSS lives in `_reference-template.html` (a working component gallery). Start every new page from that file's `<head>`, header, and footer.

## 1. Fonts

Loaded via one Google Fonts `<link>`: Lora, Instrument Sans, Inter, IBM Plex Mono.

| Role | CSS variable | Stack | Used for |
|---|---|---|---|
| Display / serif | `--font-display` | `"Lora",Georgia,"Times New Roman",serif` | `h1`, all `h2` (`.step h2`, `.closing h2`, `.gloss-title`). Weight 500. |
| Body | `--font-body` | `"Instrument Sans",-apple-system,...,sans-serif` | `body` default text, `.lead`, `.explain`, `.field`, list items. Base size 17px, line-height 1.6, `letter-spacing:-.01em`. |
| UI / labels | `--font-ui` | `"Inter",-apple-system,...,sans-serif` | All small uppercase labels: `.pill`, `.result-label`, `.step-eyebrow`, `.flabel`, `.metric-card`, `.toc a`, `.tag`, `.gap-key`, `.badge`, `footer.doc`, glossary labels. |
| Mono | `--font-mono` | `"IBM Plex Mono",ui-monospace,...,monospace` | `code.mono`, `.bar-value`, `.signal-head a`, `a.ref-abs`, `.gloss-term`, `.gloss-count`. Also drives `font-variant-numeric:tabular-nums` on numerics. |

## 2. Color palette (`:root` custom properties)

| Variable | Value | Purpose |
|---|---|---|
| `--ink` | `#0d261a` | Primary dark green-black: headings, strong text, dark panels (`.closing`, glossary toggle bg). |
| `--body` | `#252525` | Default body text color. |
| `--muted` | `rgba(13,38,26,.62)` | Secondary/muted text (`.lead`, `.meta`, `.activity`, `.resnote`). |
| `--faint` | `rgba(13,38,26,.32)` | Faintest text (`h1 .soft`, activity dot bullet). |
| `--bg` | `#ffffff` | Page background. |
| `--warm` | `#fbfaf9` | Warm off-white card fill (`.metric-card`, `.chart-block`, `.signal`, `.gap`, `.glossary`). |
| `--warm2` | `#f4f2f1` | Slightly darker chip fill (`.flabel`, `.toc a`, `code.mono`, `.tier-landscape`, `.gloss-count`). |
| `--accent` | `#2cc396` | Brand green accent: `.pill .dot`, `.bar-fill`, `.gicon`, hover states, `.tier-direct`. |
| `--accent-ink` | `#0c7a5c` | Darker accent for links and accent labels (`.step-eyebrow`, `.flabel`, `a`, ref links, `.gap-key`). |
| `--black` | `#0b0b0b` | `.badge` circle background. |
| `--line` | `rgba(13,38,26,.12)` | Default hairline borders / dividers. |
| `--line-strong` | `rgba(13,38,26,.2)` | Stronger borders (`.pill`, `.resnote` left rule, glossary edge). |

Other notable literal colors (not variables): `#073a2c` (`.tier-direct` text), `#9bf3d3` (light accent text/links inside `.closing`), `#fff`/`#ffffff` (text on dark surfaces, `.uc-tag` text), and several `rgba(44,195,150,.18)` / `rgba(13,38,26,.08)` tints for tier and gap chips.

## 3. Content type to markup mapping

| Content type | HTML structure + class names |
|---|---|
| Page title / hero | `<header class="cover">` > `<span class="pill"><span class="dot"></span>...</span>`, then `<div class="cover-main">` containing `<h1>Title<span class="soft">subtitle</span></h1>`, the `.lead` paragraph, and (optionally) stat strip + `.toc`. Close with `<p class="meta">` byline (`<b>` for inline labels). |
| Intro / lead paragraph | `<p class="lead">` (in hero) or `<p class="explain">` (inside a section). `.explain` is the standard intro/body paragraph for `.step` sections. |
| Section divider label (eyebrow above a group) | `<p class="result-label">Label</p>` (uppercase, tracked). Also used as a `<div class="result-label">` immediately before a `.signals` or `.gaps` list. |
| Summary stat strip (KPI cards) | `<div class="metric-grid">` of `<div class="metric-card"><span>LABEL</span><strong>VALUE</strong><em>qualifier</em></div>`. 4 columns desktop, 2 columns under 680px. |
| In-page nav / TOC | `<nav class="toc">` of `<a href="#id">Label</a>` pill links. |
| Major section (with number) | `<section class="step" id="cN">` > `<div class="step-head"><span class="badge">N</span><div><p class="step-eyebrow">eyebrow</p><h2>Title</h2></div></div>`. The **accent on the h2 is the colored `.step-eyebrow` label above it** (accent-ink, uppercase). There is no dot drawn directly on the h2. |
| Major section (no number) | Same, but `<div class="step-head no-badge">` and omit the `.badge` span. |
| Sub-section heading (h3-equivalent) | `<p class="sub-head">Label:</p>` (Inter, bold, small). The source has no `<h3>`; `.sub-head` is the sub-heading device, typically followed by `ul.activity`. |
| Labeled field (key/value prose) | `<p class="field"><span class="flabel">KEY</span> value text...</p>`. Variant `<p class="field match">` for muted/smaller. |
| Inline code / identifier | `<code class="mono">filename.md</code>. |
| Plain bulleted list | `<ul class="plain"><li>...</li></ul>` (standard bullet list at body size). |
| Insight card / signal | `<ul class="signals">` of `<li class="signal"><span class="signal-head"><a class="ref-abs" href="...">REF</a><span class="tag tier-portfolio">label</span></span><span class="signal-body">text</span></li>`. Card = warm fill + border + 12px radius. Tier chip classes: `tier-direct`, `tier-portfolio`, `tier-session`, `tier-landscape`. |
| Source / activity list (dotted) | `<ul class="activity">` of `<li>` items (each gets a small faint dot bullet). Links use `a.ref-src` (dotted underline). |
| Multi-column card grid | `.metric-grid` (4-up KPI cards) is the only true CSS grid card layout. `.signals` and `.gaps` are single-column grids of full-width cards (`gap` spacing, not columns). No generic N-column card-grid class exists; use `.metric-grid` for columns. |
| Structured gap / recommendation card | `<ul class="gaps">` of `<li class="gap">` containing `<div class="gap-row"><span class="gap-key">Label</span><span class="gap-val">...</span></div>`. Row variants: `gap-row gap-delta` (dashed top divider) and `gap-row gap-rec` (recommendation). Classifier chip: `<span class="gap-type gap-comm">` or `gap-type gap-evidence`. Recommendation prefix chip: `<span class="uc-tag">`. |
| Data table / chart | No `<table>` exists in the source. Tabular numeric data is shown as a bar chart: `<div class="chart-block">` > `<div class="chart-head"><span>SERIES</span><strong>total</strong></div>` > `<div class="bar-chart">` of `<div class="bar-row"><span class="bar-label">Cat</span><span class="bar-track"><span class="bar-fill" style="width:NN%"></span></span><span class="bar-value">N</span></div>`. Set bar length via inline `style="width:NN%"`. |
| Callout / note panel | `<p class="resnote"><b>Lead.</b> note text</p>` (left-border accent, muted). For an emphasis/closing panel use the dark `section.closing` (see below). |
| Takeaways / closing list | Dark panel `<section class="closing">` > `<p class="step-eyebrow light">eyebrow</p>` + `<h2>` + `<p>` + `<ul class="cross-list">` of `<li><strong>label:</strong> ...</li>`. |
| Glossary / definition list | `<dl class="gloss-list">` of `<div class="gloss-row"><dt class="gloss-term">TERM</dt><dd class="gloss-def">definition</dd></div>`, inside the fixed `<aside class="glossary">` panel. Optional `<span class="gloss-count">N terms</span>` chip in the head. |
| Horizontal divider | `<hr class="sep" />` (top hairline, large top margin). |
| Footer | `<footer class="doc">muted byline</footer>` inside `.page`. |

## 4. Layout and responsive notes

- Container: `.page` is `max-width:880px`, centered, padding `4rem 1.75rem 5rem`. All content goes inside one `<div class="page">`.
- Base type: 17px / line-height 1.6 / `letter-spacing:-.01em` on `body`.
- Breakpoints:
  - `max-width:680px`: `.metric-grid` drops to 2 columns; `.bar-row` and `.gap-row` tighten (`.gap-row` collapses to a single column).
  - `min-width:1180px`: when `body.gloss-open`, `.page` reserves right margin so the fixed glossary panel never overlaps text.
  - `max-width:1179px`: glossary overlays; the script defaults it hidden on load.
  - `prefers-reduced-motion:reduce`: disables panel/page transitions.
- The glossary panel is optional. If a page has no glossary, you may omit the toggle button, the `<aside class="glossary">`, the `gloss-open` body class, and the `<script>`. If you keep the glossary, keep all four together (button + aside + `body class="gloss-open"` + script).

## 5. Required page shell

Every page must reuse, **verbatim**, the `<head>` (meta tags, the Google Fonts `<link>`, and the entire `<style>` block), the `<body class="gloss-open">` wrapper, the optional glossary toggle + `<aside>`, the `<div class="page">` container with `<header class="cover">` and `<footer class="doc">`, and the trailing `<script>`. All of these are reproduced exactly in `_reference-template.html` (in this same folder). Copy that file as the starting skeleton and replace only the visible content; do not edit the CSS.

## 6. Components NOT present in the source (do not fabricate)

- No `<table>` / `<thead>` / `<tbody>` element (use `.chart-block`/`.bar-chart` for tabular data).
- No `<h3>`/`<h4>` headings (use `.sub-head`).
- No ordered list (`<ol>`); `.insights` is defined in CSS but the body uses `ul.plain`, `ul.signals`, `ul.activity`, `ul.gaps`, and `ul.cross-list` instead.
- No tabs, accordions, modals, or buttons other than the glossary toggle.
- No light/dark theme switch; the only dark surfaces are `.closing` and the glossary toggle/badge.
