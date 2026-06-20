const DATA_URL = "assets/data/presentations-index.json?v=nasp";
const INITIAL_LIMIT = 80;
const LIMIT_STEP = 80;
const CARD_PREVIEW_LIMIT = 520;
const CARD_PREVIEW_SECTIONS = [
  "Highlights",
  "Objective",
  "Objectives",
  "Background",
  "Methods",
  "Methodology",
  "Results",
  "Conclusion",
  "Conclusions",
];

const state = {
  data: null,
  query: "",
  year: "",
  category: "",
  therapy: "",
  sort: "year-desc",
  visibleLimit: INITIAL_LIMIT,
};
const elements = {};

function text(value) {
  return value == null ? "" : String(value);
}

function escapeHtml(value) {
  return text(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function numberFormat(value) {
  return new Intl.NumberFormat("en-US").format(value || 0);
}

function cleanMarkdownExcerpt(value) {
  return text(value)
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => !/^!\[[^\]]*\]\([^)]+\)/.test(line.trim()))
    .filter((line) => !/^```/.test(line.trim()))
    .filter((line) => {
      const trimmed = line.trim();
      const pipeCount = (trimmed.match(/\|/g) || []).length;
      return !(pipeCount >= 2 || /^\|?[-:\s|]+\|?$/.test(trimmed));
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function truncateMarkdown(value, limit = CARD_PREVIEW_LIMIT) {
  const markdown = cleanMarkdownExcerpt(value);
  if (markdown.length <= limit) return markdown;
  const slice = markdown.slice(0, limit + 1);
  const breakpoints = [slice.lastIndexOf("\n\n"), slice.lastIndexOf("\n"), slice.lastIndexOf(" ")];
  const usableBreakpoints = breakpoints.filter((point) => point > Math.floor(limit * 0.55));
  const cut = usableBreakpoints.length ? Math.max(...usableBreakpoints) : limit;
  return slice.slice(0, cut).replace(/[\s,;:.-]+$/g, "") + "...";
}

function cardPreviewMarkdown(record) {
  const sections = record.sections || {};
  const selected = [];
  for (const label of CARD_PREVIEW_SECTIONS) {
    const entry = Object.entries(sections).find(([key]) => key.toLowerCase() === label.toLowerCase());
    if (entry && cleanMarkdownExcerpt(entry[1]).length > 40) selected.push(entry);
    if (selected.length >= 2) break;
  }
  if (!selected.length) {
    const fallback = cleanMarkdownExcerpt(record.summary || "");
    return truncateMarkdown(fallback || "No parsed abstract text was available for this poster.");
  }
  const markdown = selected.map(([label, value]) => `## ${label}\n${cleanMarkdownExcerpt(value)}`).join("\n\n");
  return truncateMarkdown(markdown);
}

function initElements() {
  elements.filters = document.querySelector("#filters");
  elements.search = document.querySelector("#search");
  elements.yearFilter = document.querySelector("#year-filter");
  elements.categoryFilter = document.querySelector("#category-filter");
  elements.therapyFilter = document.querySelector("#therapy-filter");
  elements.sortFilter = document.querySelector("#sort-filter");
  elements.clearFilters = document.querySelector("#clear-filters");
  elements.resultCount = document.querySelector("#result-count");
  elements.results = document.querySelector("#results");
  elements.loadMore = document.querySelector("#load-more");
  elements.categoryList = document.querySelector("#category-list");
  elements.therapyList = document.querySelector("#therapy-list");
  elements.dialog = document.querySelector("#abstract-dialog");
  elements.dialogContent = document.querySelector("#dialog-content");
  elements.topButton = document.querySelector("#top-button");
}

function populateSelect(select, items, formatter = (item) => item.name) {
  select.insertAdjacentHTML(
    "beforeend",
    items.map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(formatter(item))}</option>`).join(""),
  );
}

function populateStats(data) {
  document.querySelector('[data-stat="records"]').textContent = numberFormat(data.record_count);
  document.querySelector('[data-stat="years"]').textContent = numberFormat(data.year_counts.length);
  document.querySelector('[data-stat="categories"]').textContent = numberFormat(data.categories.length);
}

function renderAnalytics(list, items, type, maxItems = 16) {
  list.innerHTML = items
    .slice(0, maxItems)
    .map(
      (item) => `
        <li>
          <button class="topic-card-link analytics-button" type="button" data-filter-type="${type}" data-filter-value="${escapeHtml(item.name)}">
            <span class="topic-card-title">${escapeHtml(item.name)}</span>
            <span class="topic-card-meta">${numberFormat(item.count)} posters</span>
          </button>
        </li>
      `,
    )
    .join("");
}

function recordText(record) {
  if (!record._searchText) {
    record._searchText = [
      record.year,
      record.poster_code,
      record.title,
      record.authors,
      record.summary,
      (record.categories || []).join(" "),
      (record.therapies || []).join(" "),
      Object.keys(record.sections || {}).join(" "),
      Object.values(record.sections || {}).join(" "),
      record.pdf?.filename,
    ]
      .join(" ")
      .toLowerCase();
  }
  return record._searchText;
}

function recordMatches(record) {
  if (state.year && String(record.year) !== state.year) return false;
  if (state.category && !(record.categories || []).includes(state.category)) return false;
  if (state.therapy && !(record.therapies || []).includes(state.therapy)) return false;
  if (!state.query) return true;
  const terms = state.query.toLowerCase().split(/\s+/).filter(Boolean);
  return terms.every((term) => recordText(record).includes(term));
}

function compareRecords(a, b) {
  const collator = new Intl.Collator("en-US", { numeric: true, sensitivity: "base" });
  if (state.sort === "year-asc") return a.year - b.year || collator.compare(a.poster_code, b.poster_code);
  if (state.sort === "title") return collator.compare(a.title, b.title);
  if (state.sort === "code") return collator.compare(a.poster_code, b.poster_code);
  return b.year - a.year || collator.compare(a.poster_code, b.poster_code);
}

function metadata(record) {
  return [
    record.year,
    record.poster_code,
    (record.categories || []).slice(0, 2).join(", "),
    (record.therapies || []).filter((item) => item !== "Unclassified").slice(0, 2).join(", "),
  ].filter(Boolean);
}

function renderRecord(record) {
  return `
    <li>
      <article class="document-row-link abstract-row">
        <div class="document-row-chip">${escapeHtml(record.year)}<br>${escapeHtml(record.poster_code)}</div>
        <div class="document-row-body">
          <h3 class="document-row-title">${escapeHtml(record.title || "Untitled NASP poster")}</h3>
          <p class="document-row-meta">${metadata(record).map((part) => `<span>${escapeHtml(part)}</span>`).join("")}</p>
          <div class="abstract-actions">
            <button class="button button-primary" type="button" data-uid="${escapeHtml(record.uid)}">View details</button>
            <a class="button button-secondary" href="${escapeHtml(record.pdf.local_path)}" target="_blank" rel="noopener">Open PDF</a>
          </div>
        </div>
      </article>
    </li>
  `;
}

function filteredRecords() {
  return state.data.presentations.filter(recordMatches).sort(compareRecords);
}

function renderResults() {
  const records = filteredRecords();
  const visible = records.slice(0, state.visibleLimit);
  elements.resultCount.textContent = `${numberFormat(records.length)} matching poster${records.length === 1 ? "" : "s"}`;
  elements.results.innerHTML = visible.map(renderRecord).join("");
  elements.loadMore.hidden = records.length <= state.visibleLimit;
  elements.loadMore.textContent = `Load ${numberFormat(Math.min(LIMIT_STEP, records.length - state.visibleLimit))} more`;
}

function syncStateFromControls() {
  state.query = elements.search.value.trim();
  state.year = elements.yearFilter.value;
  state.category = elements.categoryFilter.value;
  state.therapy = elements.therapyFilter.value;
  state.sort = elements.sortFilter.value;
  state.visibleLimit = INITIAL_LIMIT;
  renderResults();
}

function clearFilters() {
  elements.search.value = "";
  elements.yearFilter.value = "";
  elements.categoryFilter.value = "";
  elements.therapyFilter.value = "";
  elements.sortFilter.value = "year-desc";
  syncStateFromControls();
}

function sectionMarkup(record) {
  const entries = Object.entries(record.sections || {});
  if (!entries.length) return '<p class="lead">No structured markdown sections were extracted for this poster.</p>';
  return entries
    .slice(0, 12)
    .map(
      ([label, value]) => `
        <section class="abstract-section">
          <h3>${escapeHtml(label)}</h3>
          <p>${escapeHtml(value)}</p>
        </section>
      `,
    )
    .join("");
}

function recordDetailMarkdown(record) {
  const lines = [];
  if (record.authors) {
    lines.push("## Authors / Affiliations", "", record.authors.trim(), "");
  }
  const entries = Object.entries(record.sections || {});
  for (const [label, value] of entries) {
    lines.push(`## ${label}`, "", text(value).trim(), "");
  }
  return lines.join("\n").trim();
}

function markdownMarkup(record) {
  const markdown = recordDetailMarkdown(record);
  if (!markdown) return '<p class="lead">No structured markdown sections were extracted for this poster.</p>';
  return `<div class="markdown-detail markdown-rendered">${renderMarkdown(markdown)}</div>`;
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
}

function isTableLine(line) {
  return (line.match(/\|/g) || []).length >= 2;
}

function isTableRule(line) {
  return /^\|?[\s|:-]+\|?$/.test(line.trim());
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !isTableRule(line))
    .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean));
  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `
    <div class="markdown-table-wrap">
      <table>
        <thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderMarkdown(markdown) {
  const lines = text(markdown).split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let table = [];

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    list = [];
  }

  function flushTable() {
    if (!table.length) return;
    html.push(renderTable(table));
    table = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }
    if (isTableLine(line)) {
      flushParagraph();
      flushList();
      table.push(line);
      continue;
    }
    flushTable();
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length === 2 ? "h3" : "h4";
      html.push(`<${level}>${inlineMarkdown(heading[2])}</${level}>`);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();
  flushList();
  flushTable();
  return html.join("");
}

function sourceList(record) {
  return `
    <section class="source-list" aria-labelledby="sources-heading">
      <h2 id="sources-heading">Files and Sources</h2>
      <ul>
        ${record.pdf.source_url ? `<li><a href="${escapeHtml(record.pdf.source_url)}" target="_blank" rel="noopener">Source PDF</a></li>` : ""}
        <li><a href="${escapeHtml(state.data.source)}" target="_blank" rel="noopener">NASP abstracts and posters page</a></li>
      </ul>
    </section>
  `;
}

function openDetail(uid) {
  const record = state.data.presentations.find((item) => item.uid === uid);
  if (!record) return;
  const parts = [
    ["Year", record.year],
    ["Poster code", record.poster_code],
    ["Categories", (record.categories || []).join(", ")],
    ["Therapy areas", (record.therapies || []).join(", ")],
    ["PDF file", record.pdf.filename],
  ].filter(([, value]) => value);
  elements.dialogContent.innerHTML = `
    <header class="document-header dialog-header">
      <p class="eyebrow">NASP ${escapeHtml(record.year)} / ${escapeHtml(record.poster_code)}</p>
      <h1 id="dialog-title">${escapeHtml(record.title || "Untitled NASP poster")}</h1>
      <dl class="metadata">
        ${parts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
      </dl>
      <div class="document-actions">
        <a class="button button-primary" href="${escapeHtml(record.pdf.local_path)}" target="_blank" rel="noopener">View PDF</a>
      </div>
    </header>
    <div class="content abstract-detail-content">
      ${markdownMarkup(record)}
      ${sourceList(record)}
    </div>
  `;
  elements.dialog.showModal();
}

function bindEvents() {
  elements.filters.addEventListener("submit", (event) => {
    event.preventDefault();
    syncStateFromControls();
  });
  [elements.search, elements.yearFilter, elements.categoryFilter, elements.therapyFilter, elements.sortFilter].forEach((element) => {
    element.addEventListener(element === elements.search ? "input" : "change", syncStateFromControls);
  });
  elements.clearFilters.addEventListener("click", clearFilters);
  elements.loadMore.addEventListener("click", () => {
    state.visibleLimit += LIMIT_STEP;
    renderResults();
  });
  elements.topButton?.addEventListener("click", () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }));
  elements.results.addEventListener("click", (event) => {
    const button = event.target.closest("[data-uid]");
    if (button) openDetail(button.dataset.uid);
  });
  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog || event.target.closest(".dialog-close")) elements.dialog.close();
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter-type][data-filter-value]");
    if (!button) return;
    if (button.dataset.filterType === "category") elements.categoryFilter.value = button.dataset.filterValue;
    if (button.dataset.filterType === "therapy") elements.therapyFilter.value = button.dataset.filterValue;
    syncStateFromControls();
    document.querySelector("#browse").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function start() {
  initElements();
  bindEvents();
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Failed to load ${DATA_URL}`);
    state.data = await response.json();
    populateSelect(elements.yearFilter, [...state.data.year_counts].sort((a, b) => b.name - a.name), (item) => `${item.name} (${numberFormat(item.count)})`);
    populateSelect(elements.categoryFilter, state.data.categories, (item) => `${item.name} (${numberFormat(item.count)})`);
    populateSelect(elements.therapyFilter, state.data.therapies, (item) => `${item.name} (${numberFormat(item.count)})`);
    populateStats(state.data);
    renderAnalytics(elements.categoryList, state.data.categories, "category", state.data.categories.length);
    renderAnalytics(elements.therapyList, state.data.therapies, "therapy", 18);
    renderResults();
  } catch (error) {
    elements.resultCount.textContent = "Unable to load NASP records.";
    elements.results.innerHTML = `<li><p>${escapeHtml(error.message)}</p></li>`;
  }
}

start();
