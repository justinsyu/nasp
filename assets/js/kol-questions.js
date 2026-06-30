const KOL_DATA_URL = "assets/data/kol-questions.json?v=nasp-1";

const state = {
  data: null,
  domain: "",
  priority: "",
  answered: "",
  query: "",
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

function slug(value) {
  return text(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function questionText(question) {
  return [
    question.domain,
    question.priority,
    question.evidence_discrepancy,
    question.literature_verdict,
    question.question,
    (question.tags || []).join(" "),
    (question.evidence || []).map((item) => `${item.poster_code} ${item.title} ${item.snippet}`).join(" "),
    (question.sources || []).map((item) => `${item.title} ${item.rationale}`).join(" "),
  ].join(" ").toLowerCase();
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function initElements() {
  el.summary = document.querySelector("#kol-summary");
  el.domainNav = document.querySelector("#domain-nav");
  el.filters = document.querySelector("#kol-filters");
  el.search = document.querySelector("#kol-search");
  el.domain = document.querySelector("#domain-filter");
  el.priority = document.querySelector("#priority-filter");
  el.answered = document.querySelector("#answered-filter");
  el.clear = document.querySelector("#clear-kol-filters");
  el.count = document.querySelector("#kol-result-count");
  el.list = document.querySelector("#kol-list");
  el.dialog = document.querySelector("#kol-dialog");
  el.dialogContent = document.querySelector("#kol-dialog-content");
}

function populateSelect(select, values) {
  select.insertAdjacentHTML("beforeend", values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join(""));
}

function renderSummary() {
  const questions = state.data.questions || [];
  const posterCount = questions.reduce((total, question) => total + (question.evidence || []).length, 0);
  const sourceCount = uniqueSorted(questions.flatMap((question) => (question.sources || []).map((source) => source.url))).length;
  el.summary.innerHTML = `
    <div class="summary-tile"><strong>KOL questions</strong><span>${numberFormat(questions.length)}</span><em>Conference-derived discussion prompts</em></div>
    <div class="summary-tile"><strong>Poster evidence links</strong><span>${numberFormat(posterCount)}</span><em>Each link opens the NASP PDF</em></div>
    <div class="summary-tile"><strong>Evidence domains</strong><span>${numberFormat(uniqueSorted(questions.map((question) => question.domain)).length)}</span><em>Access, adherence, oncology, workforce, and more</em></div>
    <div class="summary-tile"><strong>External checks</strong><span>${numberFormat(sourceCount)}</span><em>Guidelines, regulator pages, and standards</em></div>
  `;
}

function renderDomainNav() {
  const domains = uniqueSorted(state.data.questions.map((question) => question.domain));
  el.domainNav.innerHTML = domains.map((domain) => {
    const count = state.data.questions.filter((question) => question.domain === domain).length;
    return `<button type="button" data-domain="${escapeHtml(domain)}">${escapeHtml(domain)} <span>${numberFormat(count)}</span></button>`;
  }).join("");
}

function syncStateFromControls() {
  state.query = el.search.value.trim().toLowerCase();
  state.domain = el.domain.value;
  state.priority = el.priority.value;
  state.answered = el.answered.value;
  renderQuestions();
}

function clearFilters() {
  el.search.value = "";
  el.domain.value = "";
  el.priority.value = "";
  el.answered.value = "";
  syncStateFromControls();
}

function filteredQuestions() {
  const terms = state.query.split(/\s+/).filter(Boolean);
  return state.data.questions.filter((question) => {
    if (state.domain && question.domain !== state.domain) return false;
    if (state.priority && question.priority !== state.priority) return false;
    if (state.answered && question.already_answered !== state.answered) return false;
    if (!terms.length) return true;
    const haystack = questionText(question);
    return terms.every((term) => haystack.includes(term));
  });
}

function evidencePreview(question) {
  return (question.evidence || []).slice(0, 3).map((item) => `
    <li>
      <strong>${escapeHtml(item.year)} / ${escapeHtml(item.poster_code)}</strong>
      <span>${escapeHtml(item.title)}</span>
    </li>
  `).join("");
}

function renderLiteratureCheck(question) {
  const citations = (question.sources || []).map((source) => `
    <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.title)}</a>
  `).join("; ");
  const citationMarkup = citations ? ` <span class="literature-citations">Sources: ${citations}.</span>` : "";
  return `<p>${escapeHtml(question.literature_verdict)}${citationMarkup}</p>`;
}

function renderQuestionCard(question, index) {
  return `
    <article class="kol-card" id="${escapeHtml(question.id)}">
      <div class="kol-card-topline">
        <span>${escapeHtml(question.domain)}</span>
        <span>${escapeHtml(question.priority)} priority</span>
        <span>${escapeHtml(question.already_answered)} answered</span>
      </div>
      <h2>${escapeHtml(question.question)}</h2>
      <div class="tag-row">${(question.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="kol-card-grid">
        <section>
          <h3>Evidence tension</h3>
          <p>${escapeHtml(question.evidence_discrepancy)}</p>
        </section>
        <section>
          <h3>Literature check</h3>
          ${renderLiteratureCheck(question)}
        </section>
      </div>
      <ul class="evidence-mini-list">${evidencePreview(question)}</ul>
      <div class="record-actions">
        <button class="button button-primary" type="button" data-question-index="${index}">View evidence</button>
      </div>
    </article>
  `;
}

function renderQuestions() {
  const questions = filteredQuestions();
  el.count.textContent = `${numberFormat(questions.length)} matching question${questions.length === 1 ? "" : "s"}`;
  el.list.innerHTML = questions.map((question, index) => renderQuestionCard(question, state.data.questions.indexOf(question))).join("");
}

function renderEvidence(question) {
  return (question.evidence || []).map((item) => `
    <article class="evidence-row">
      <div>
        <p class="eyebrow">${escapeHtml(item.year)} / ${escapeHtml(item.poster_code)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.snippet)}</p>
      </div>
      <a class="button button-primary" href="${escapeHtml(item.pdf_url)}" target="_blank" rel="noopener">View PDF</a>
    </article>
  `).join("");
}

function renderSources(question) {
  return (question.sources || []).map((source) => `
    <li>
      <a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.title)}</a>
      <p>${escapeHtml(source.rationale)}</p>
    </li>
  `).join("");
}

function openQuestion(index) {
  const question = state.data.questions[index];
  if (!question) return;
  el.dialogContent.innerHTML = `
    <div class="kol-dialog-content">
      <header class="kol-dialog-header">
        <p class="eyebrow">${escapeHtml(question.domain)} / ${escapeHtml(question.priority)} priority</p>
        <h2>${escapeHtml(question.question)}</h2>
        <div class="record-meta">
          <span>${escapeHtml(question.already_answered)} answered</span>
          <span>${numberFormat((question.evidence || []).length)} poster links</span>
          <span>${numberFormat((question.sources || []).length)} external checks</span>
        </div>
      </header>
      <section class="dialog-section">
        <h3>NASP poster evidence</h3>
        <div class="evidence-list">${renderEvidence(question)}</div>
      </section>
      <section class="dialog-section">
        <h3>Supporting publications and rationale</h3>
        <ul class="source-rationale-list">${renderSources(question)}</ul>
      </section>
    </div>
  `;
  el.dialog.showModal();
}

function bindEvents() {
  el.filters.addEventListener("submit", (event) => event.preventDefault());
  [el.search, el.domain, el.priority, el.answered].forEach((control) => {
    control.addEventListener(control === el.search ? "input" : "change", syncStateFromControls);
  });
  el.clear.addEventListener("click", clearFilters);
  el.domainNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-domain]");
    if (!button) return;
    el.domain.value = button.dataset.domain;
    syncStateFromControls();
    document.querySelector("#questions").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-question-index]");
    if (button) openQuestion(Number(button.dataset.questionIndex));
  });
  el.dialog.addEventListener("click", (event) => {
    if (event.target === el.dialog || event.target.closest(".dialog-close")) el.dialog.close();
  });
}

function markLoaded() {
  document.querySelector("#kol-loading")?.setAttribute("hidden", "");
  document.body.classList.remove("is-loading");
  document.body.classList.add("is-loaded");
}

async function start() {
  initElements();
  bindEvents();
  const response = await fetch(KOL_DATA_URL);
  if (!response.ok) throw new Error(`Failed to load ${KOL_DATA_URL}`);
  state.data = await response.json();

  populateSelect(el.domain, uniqueSorted(state.data.questions.map((question) => question.domain)));
  populateSelect(el.priority, uniqueSorted(state.data.questions.map((question) => question.priority)));
  populateSelect(el.answered, uniqueSorted(state.data.questions.map((question) => question.already_answered)));

  renderSummary();
  renderDomainNav();
  renderQuestions();
  requestAnimationFrame(markLoaded);
}

start().catch((error) => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("has-load-error");
  document.querySelector("#kol-loading")?.setAttribute("hidden", "");
  document.querySelector(".kol-shell").insertAdjacentHTML("afterbegin", `<section class="load-error"><h2>Unable to load KOL questions</h2><p>${escapeHtml(error.message)}</p></section>`);
});
