const METHODS_DATA_URL = "assets/data/methods-analysis.json?v=nasp-2";
const INITIAL_LIMIT = 80;
const LIMIT_STEP = 80;
const palette = ["#243770", "#d12630", "#e99e25", "#187c8f", "#4d8a67", "#7561a8", "#b86b3d", "#68758d"];

const state = {
  data: null,
  query: "",
  method: "",
  outcome: "",
  outcomeCategory: "",
  sample: "",
  sponsor: "",
  design: "",
  year: "",
  category: "",
  therapy: "",
  sort: "year-desc",
  visibleLimit: INITIAL_LIMIT,
};

const el = {};

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

function initElements() {
  el.summary = document.querySelector("#methods-summary");
  el.methodBars = document.querySelector("#method-bars");
  el.outcomeBars = document.querySelector("#outcome-bars");
  el.outcomeCategoryBars = document.querySelector("#outcome-category-bars");
  el.sampleBars = document.querySelector("#sample-bars");
  el.designBars = document.querySelector("#design-bars");
  el.sponsorGrid = document.querySelector("#sponsor-grid");
  el.filters = document.querySelector("#methods-filters");
  el.search = document.querySelector("#method-search");
  el.methodFilter = document.querySelector("#method-filter");
  el.outcomeFilter = document.querySelector("#outcome-filter");
  el.outcomeCategoryFilter = document.querySelector("#outcome-category-filter");
  el.sampleFilter = document.querySelector("#sample-filter");
  el.sponsorFilter = document.querySelector("#sponsor-filter");
  el.designFilter = document.querySelector("#design-filter");
  el.yearFilter = document.querySelector("#year-filter");
  el.categoryFilter = document.querySelector("#category-filter");
  el.therapyFilter = document.querySelector("#therapy-filter");
  el.sortFilter = document.querySelector("#sort-filter");
  el.clearFilters = document.querySelector("#clear-method-filters");
  el.resultCount = document.querySelector("#method-result-count");
  el.records = document.querySelector("#method-records");
  el.loadMore = document.querySelector("#load-more-methods");
  el.dialog = document.querySelector("#method-dialog");
  el.dialogContent = document.querySelector("#method-dialog-content");
}

function countBy(records, getter) {
  const counter = new Map();
  records.forEach((record) => {
    const values = getter(record);
    const list = Array.isArray(values) ? values : [values];
    list.filter(Boolean).forEach((value) => counter.set(value, (counter.get(value) || 0) + 1));
  });
  return [...counter.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || String(a.name).localeCompare(String(b.name)));
}

function populateSelect(select, items, formatter = (item) => item.name) {
  select.insertAdjacentHTML(
    "beforeend",
    items.map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(formatter(item))}</option>`).join(""),
  );
}

function renderSummary() {
  const data = state.data;
  const explicit = data.records.filter((record) => !(record.methods || []).some((method) => method.id === "not_reported"));
  const adjusted = data.records.filter((record) => (record.methods || []).some((method) => method.id === "adjustment"));
  const recordsWithOutcomes = data.records.filter((record) => (record.outcomes || []).length);
  el.summary.innerHTML = `
    <div class="summary-tile"><strong>Poster records analyzed</strong><span>${numberFormat(data.record_count)}</span><em>${numberFormat(data.excluded_abstract_books)} abstract-book rollups excluded</em></div>
    <div class="summary-tile"><strong>Explicit methods detected</strong><span>${numberFormat(explicit.length)}</span><em>Poster records with at least one method signal</em></div>
    <div class="summary-tile"><strong>Outcome variables detected</strong><span>${numberFormat(data.outcome_counts?.length || 0)}</span><em>${numberFormat(recordsWithOutcomes.length)} posters with outcome evidence</em></div>
    <div class="summary-tile"><strong>Confounding adjustment</strong><span>${numberFormat(adjusted.length)}</span><em>Adjustment, matching, or covariate evidence</em></div>
  `;
}

function setFilter(kind, value) {
  if (kind === "method") el.methodFilter.value = value;
  if (kind === "outcome") el.outcomeFilter.value = value;
  if (kind === "outcomeCategory") el.outcomeCategoryFilter.value = value;
  if (kind === "sample") el.sampleFilter.value = value;
  if (kind === "design") el.designFilter.value = value;
  if (kind === "sponsor") el.sponsorFilter.value = value;
  syncStateFromControls();
  document.querySelector("#records").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBarList(container, points, kind, limit = 16) {
  const visible = points.slice(0, limit);
  const max = Math.max(...visible.map((point) => point.count), 1);
  container.innerHTML = visible.map((point, index) => `
    <button class="bar-item" type="button" data-filter-kind="${escapeHtml(kind)}" data-filter-value="${escapeHtml(point.name)}">
      <span class="bar-name" title="${escapeHtml(point.name)}">${escapeHtml(point.name)}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${Math.max(2, (point.count / max) * 100).toFixed(1)}%; background:${palette[index % palette.length]}"></span></span>
      <span class="bar-value">${numberFormat(point.count)}</span>
    </button>
  `).join("");
}

function renderSponsorGrid(points) {
  el.sponsorGrid.innerHTML = points.slice(0, 24).map((point, index) => `
    <button class="sponsor-chip" type="button" data-filter-kind="sponsor" data-filter-value="${escapeHtml(point.name)}" style="border-left-color:${palette[index % palette.length]}">
      <strong>${escapeHtml(point.name)}</strong>
      <span>${numberFormat(point.count)} posters</span>
    </button>
  `).join("");
}

function renderLandscape() {
  renderBarList(el.methodBars, state.data.method_counts, "method", 14);
  renderBarList(el.outcomeBars, state.data.outcome_counts || [], "outcome", 18);
  renderBarList(el.outcomeCategoryBars, state.data.outcome_category_counts || [], "outcomeCategory", 8);
  renderBarList(el.sampleBars, state.data.sample_size_counts, "sample", 5);
  renderBarList(el.designBars, state.data.study_design_counts, "design", 8);
  renderSponsorGrid(state.data.sponsor_counts);
}

function recordText(record) {
  if (!record._searchText) {
    record._searchText = [
      record.year,
      record.poster_code,
      record.title,
      record.authors,
      record.organization?.name,
      record.organization?.evidence,
      record.sample_size?.bucket,
      record.sample_size?.evidence,
      record.study_design?.label,
      record.study_design?.evidence,
      record.data_source?.label,
      record.data_source?.evidence,
      (record.methods || []).map((method) => `${method.label} ${method.description} ${method.evidence}`).join(" "),
      (record.outcomes || []).map((outcome) => `${outcome.label} ${outcome.category} ${outcome.role} ${outcome.source_section} ${outcome.evidence}`).join(" "),
      (record.categories || []).join(" "),
      (record.therapies || []).join(" "),
      record.pdf?.filename,
    ].join(" ").toLowerCase();
  }
  return record._searchText;
}

function recordMatches(record) {
  if (state.method && !(record.methods || []).some((method) => method.label === state.method)) return false;
  if (state.outcome && !(record.outcomes || []).some((outcome) => outcome.label === state.outcome)) return false;
  if (state.outcomeCategory && !(record.outcomes || []).some((outcome) => outcome.category === state.outcomeCategory)) return false;
  if (state.sample && record.sample_size?.bucket !== state.sample) return false;
  if (state.sponsor && record.organization?.name !== state.sponsor) return false;
  if (state.design && record.study_design?.label !== state.design) return false;
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
  if (state.sort === "sample-desc") return (b.sample_size?.value || 0) - (a.sample_size?.value || 0) || b.year - a.year;
  if (state.sort === "method-count") return (b.methods || []).length - (a.methods || []).length || b.year - a.year;
  return b.year - a.year || collator.compare(a.poster_code, b.poster_code);
}

function filteredRecords() {
  return state.data.records.filter(recordMatches).sort(compareRecords);
}

function sourceLabel(record) {
  return [
    record.year,
    record.poster_code,
    record.organization?.name,
    record.sample_size?.bucket,
  ].filter(Boolean).join(" / ");
}

function sampleLabel(record) {
  const sample = record.sample_size || {};
  if (!sample.value) return sample.bucket || "Not reported";
  return `${numberFormat(sample.value)} ${sample.unit || "records"} (${sample.bucket})`;
}

function methodsPreview(record) {
  return (record.methods || []).slice(0, 4).map((method) => `<span class="method-tag">${escapeHtml(method.label)}</span>`).join("");
}

function outcomesPreview(record) {
  return (record.outcomes || []).slice(0, 4).map((outcome) => `<span class="outcome-tag">${escapeHtml(outcome.label)}</span>`).join("");
}

function renderRecord(record) {
  const posterPdfUrl = record.pdf?.source_url || record.pdf?.local_path || "#";
  return `
    <li>
      <article class="method-record">
        <div class="record-chip">${escapeHtml(record.year)}<br>${escapeHtml(record.poster_code)}</div>
        <div>
          <button class="record-title-button" type="button" data-uid="${escapeHtml(record.uid)}">${escapeHtml(record.title || "Untitled NASP poster")}</button>
          <div class="record-meta">
            <span>${escapeHtml(record.organization?.name || "Not parsed")}</span>
            <span>${escapeHtml(sampleLabel(record))}</span>
            <span>${escapeHtml(record.study_design?.label || "Not specified")}</span>
          </div>
          <div class="method-tags">${methodsPreview(record)}</div>
          ${(record.outcomes || []).length ? `<div class="method-tags">${outcomesPreview(record)}</div>` : ""}
          <div class="record-actions">
            <button class="button button-primary" type="button" data-uid="${escapeHtml(record.uid)}">View evidence</button>
            <a class="button button-secondary" href="${escapeHtml(posterPdfUrl)}" target="_blank" rel="noopener">View PDF</a>
          </div>
        </div>
      </article>
    </li>
  `;
}

function renderRecords() {
  const records = filteredRecords();
  const visible = records.slice(0, state.visibleLimit);
  el.resultCount.textContent = `${numberFormat(records.length)} matching poster${records.length === 1 ? "" : "s"}`;
  el.records.innerHTML = visible.map(renderRecord).join("");
  el.loadMore.hidden = records.length <= state.visibleLimit;
  el.loadMore.textContent = `Load ${numberFormat(Math.max(0, Math.min(LIMIT_STEP, records.length - state.visibleLimit)))} more`;
}

function syncStateFromControls() {
  state.query = el.search.value.trim();
  state.method = el.methodFilter.value;
  state.outcome = el.outcomeFilter.value;
  state.outcomeCategory = el.outcomeCategoryFilter.value;
  state.sample = el.sampleFilter.value;
  state.sponsor = el.sponsorFilter.value;
  state.design = el.designFilter.value;
  state.year = el.yearFilter.value;
  state.category = el.categoryFilter.value;
  state.therapy = el.therapyFilter.value;
  state.sort = el.sortFilter.value;
  state.visibleLimit = INITIAL_LIMIT;
  renderRecords();
}

function clearFilters() {
  [el.search, el.methodFilter, el.outcomeFilter, el.outcomeCategoryFilter, el.sampleFilter, el.sponsorFilter, el.designFilter, el.yearFilter, el.categoryFilter, el.therapyFilter].forEach((control) => {
    control.value = "";
  });
  el.sortFilter.value = "year-desc";
  syncStateFromControls();
}

function sourceLinks(record) {
  const posterPdfUrl = record.pdf?.source_url || record.pdf?.local_path || "#";
  const markdownUrl = record.markdown_path || "#";
  return `
    <div class="source-links">
      <a class="button button-primary" href="${escapeHtml(posterPdfUrl)}" target="_blank" rel="noopener">View PDF</a>
      <a class="button button-secondary" href="${escapeHtml(markdownUrl)}" target="_blank" rel="noopener">View parsed markdown</a>
    </div>
  `;
}

function openRecord(uid) {
  const record = state.data.records.find((item) => item.uid === uid);
  if (!record) return;
  el.dialogContent.innerHTML = `
    <div class="method-dialog-content">
      <header class="method-dialog-header">
        <p class="eyebrow">NASP ${escapeHtml(record.year)} / ${escapeHtml(record.poster_code)}</p>
        <h2>${escapeHtml(record.title || "Untitled NASP poster")}</h2>
        <div class="record-meta">
          <span>${escapeHtml(record.organization?.name || "Not parsed")}</span>
          <span>${escapeHtml(sampleLabel(record))}</span>
          <span>${escapeHtml(record.study_design?.label || "Not specified")}</span>
          <span>${escapeHtml(record.data_source?.label || "Not specified")}</span>
        </div>
      </header>
      <section class="evidence-block">
        <h3>Detected analysis methods</h3>
        <ul class="method-evidence-list">
          ${(record.methods || []).map((method) => `
            <li>
              <strong>${escapeHtml(method.label)}</strong>
              <p>${escapeHtml(method.evidence || method.description || "No evidence snippet available.")}</p>
            </li>
          `).join("")}
        </ul>
      </section>
      <section class="evidence-block">
        <h3>Outcome variables evaluated</h3>
        ${(record.outcomes || []).length ? `
          <ul class="method-evidence-list">
            ${(record.outcomes || []).map((outcome) => `
              <li>
                <strong>${escapeHtml(outcome.label)}</strong>
                <p><span class="method-tag">${escapeHtml(outcome.category || "Outcome")}</span> <span class="method-tag">${escapeHtml(outcome.role || "unspecified")}</span> <span class="method-tag">${escapeHtml(outcome.source_section || "Source section")}</span></p>
                <p>${escapeHtml(outcome.evidence || outcome.description || "No evidence snippet available.")}</p>
              </li>
            `).join("")}
          </ul>
        ` : `<p>No explicit evaluated outcome-variable signal was detected for this poster.</p>`}
      </section>
      <div class="evidence-grid">
        <section class="evidence-block">
          <h3>Sample-size evidence</h3>
          <p><strong>${escapeHtml(sampleLabel(record))}</strong></p>
          <p>${escapeHtml(record.sample_size?.evidence || "No explicit sample-size signal detected.")}</p>
        </section>
        <section class="evidence-block">
          <h3>Organization evidence</h3>
          <p><strong>${escapeHtml(record.organization?.name || "Not parsed")}</strong></p>
          <p>${escapeHtml(record.organization?.evidence || "No submitting or sponsoring organization was parsed with confidence.")}</p>
        </section>
        <section class="evidence-block">
          <h3>Study design evidence</h3>
          <p><strong>${escapeHtml(record.study_design?.label || "Not specified")}</strong></p>
          <p>${escapeHtml(record.study_design?.evidence || "No explicit study-design signal detected.")}</p>
        </section>
        <section class="evidence-block">
          <h3>Data-source evidence</h3>
          <p><strong>${escapeHtml(record.data_source?.label || "Not specified")}</strong></p>
          <p>${escapeHtml(record.data_source?.evidence || "No explicit data-source signal detected.")}</p>
        </section>
      </div>
      ${sourceLinks(record)}
    </div>
  `;
  el.dialog.showModal();
}

function bindEvents() {
  el.filters.addEventListener("submit", (event) => event.preventDefault());
  [el.search, el.methodFilter, el.outcomeFilter, el.outcomeCategoryFilter, el.sampleFilter, el.sponsorFilter, el.designFilter, el.yearFilter, el.categoryFilter, el.therapyFilter, el.sortFilter].forEach((control) => {
    control.addEventListener(control === el.search ? "input" : "change", syncStateFromControls);
  });
  el.clearFilters.addEventListener("click", clearFilters);
  el.loadMore.addEventListener("click", () => {
    state.visibleLimit += LIMIT_STEP;
    renderRecords();
  });
  document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter-kind][data-filter-value]");
    if (filterButton) {
      setFilter(filterButton.dataset.filterKind, filterButton.dataset.filterValue);
      return;
    }
    const recordButton = event.target.closest("[data-uid]");
    if (recordButton) openRecord(recordButton.dataset.uid);
  });
  el.dialog.addEventListener("click", (event) => {
    if (event.target === el.dialog || event.target.closest(".dialog-close")) el.dialog.close();
  });
}

function markLoaded() {
  document.querySelector("#methods-loading")?.setAttribute("hidden", "");
  document.body.classList.remove("is-loading");
  document.body.classList.add("is-loaded");
}

async function start() {
  initElements();
  bindEvents();
  const response = await fetch(METHODS_DATA_URL);
  if (!response.ok) throw new Error(`Failed to load ${METHODS_DATA_URL}`);
  state.data = await response.json();

  const categoryCounts = countBy(state.data.records, (record) => record.categories || []);
  const therapyCounts = countBy(state.data.records, (record) => record.therapies || []);
  populateSelect(el.methodFilter, state.data.method_counts, (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.outcomeFilter, state.data.outcome_counts || [], (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.outcomeCategoryFilter, state.data.outcome_category_counts || [], (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.sampleFilter, state.data.sample_size_counts, (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.sponsorFilter, state.data.sponsor_counts, (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.designFilter, state.data.study_design_counts, (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.yearFilter, [...state.data.year_counts].sort((a, b) => b.name - a.name), (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.categoryFilter, categoryCounts, (item) => `${item.name} (${numberFormat(item.count)})`);
  populateSelect(el.therapyFilter, therapyCounts, (item) => `${item.name} (${numberFormat(item.count)})`);

  renderSummary();
  renderLandscape();
  renderRecords();
  requestAnimationFrame(markLoaded);
}

start().catch((error) => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("has-load-error");
  document.querySelector("#methods-loading")?.setAttribute("hidden", "");
  document.querySelector(".methods-shell").insertAdjacentHTML("afterbegin", `<section class="panel"><h2>Unable to load methods data</h2><p>${escapeHtml(error.message)}</p></section>`);
});
