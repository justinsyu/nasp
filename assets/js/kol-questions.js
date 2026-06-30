const KOL_DATA_URL = "assets/data/kol-questions.json?v=nasp-1";

const state = {
  data: null,
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

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function initElements() {
  el.domainNav = document.querySelector("#domain-nav");
  el.list = document.querySelector("#kol-list");
  el.dialog = document.querySelector("#kol-dialog");
  el.dialogContent = document.querySelector("#kol-dialog-content");
}

function renderDomainNav() {
  const domains = uniqueSorted(state.data.questions.map((question) => question.domain));
  el.domainNav.innerHTML = domains.map((domain) => {
    const count = state.data.questions.filter((question) => question.domain === domain).length;
    return `<span>${escapeHtml(domain)} <strong>${numberFormat(count)}</strong></span>`;
  }).join("");
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
  const questions = state.data.questions || [];
  el.list.innerHTML = questions.map((question, index) => renderQuestionCard(question, index)).join("");
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
