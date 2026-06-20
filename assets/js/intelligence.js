const DATA_URL = "assets/data/presentations-index.json?v=nasp-2";
const PAGE_SIZE = 120;

const colors = {
  blue: "#243770",
  red: "#d12630",
  gold: "#e99e25",
  teal: "#187c8f",
  green: "#4d8a67",
  purple: "#7561a8",
  slate: "#68758d",
  rust: "#b86b3d",
};
const palette = Object.values(colors);

const termGroups = {
  access: ["access", "prior authorization", "limited distribution", "benefit", "payer", "financial assistance", "copay", "affordability"],
  adherence: ["adherence", "persistence", "pdc", "compliance", "refill", "gap", "discontinuation"],
  operations: ["workflow", "operations", "implementation", "process", "turnaround", "delivery", "call center", "accreditation"],
  clinical: ["outcomes", "safety", "efficacy", "hospitalization", "therapy", "intervention", "treatment"],
  patient: ["patient satisfaction", "quality of life", "patient-reported", "education", "outreach", "caregiver", "support program"],
  rwe: ["real-world", "retrospective", "claims", "database", "cohort", "survey", "registry"],
  workforce: ["extern", "student", "technician", "pharmacist", "residency", "training", "staff"],
  digital: ["digital", "text", "telehealth", "portal", "automation", "algorithm", "ai", "machine learning"],
  oncology: ["oncology", "cancer", "carcinoma", "tumor", "chemotherapy", "myeloma", "lymphoma"],
  inflammatory: ["ibd", "crohn", "ulcerative colitis", "arthritis", "dermatitis", "psoriasis", "rheumatology"],
  infectious: ["hiv", "hcv", "hepatitis", "covid", "vaccine", "prep"],
  neurology: ["multiple sclerosis", "migraine", "neurology", "cgrp", "als"],
  cardiometabolic: ["diabetes", "obesity", "cardiovascular", "heart", "pcsk9", "hyperkalemia"],
  rare: ["rare", "orphan", "cystic fibrosis", "hemophilia", "hereditary", "sickle"],
};

const app = {
  records: [],
  charts: [],
  selectedRecords: [],
  rendered: 0,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function numberFormat(value) {
  return new Intl.NumberFormat("en-US").format(value || 0);
}

function recordText(record) {
  if (!record._intelText) {
    record._intelText = [
      record.year,
      record.poster_code,
      record.title,
      record.authors,
      record.summary,
      (record.categories || []).join(" "),
      (record.therapies || []).join(" "),
      Object.keys(record.sections || {}).join(" "),
      Object.values(record.sections || {}).join(" "),
    ].join(" ").toLowerCase();
  }
  return record._intelText;
}

function matchTerms(record, terms) {
  const haystack = recordText(record);
  return terms.some((term) => haystack.includes(term.toLowerCase()));
}

function recordsForTerms(terms) {
  return app.records.filter((record) => matchTerms(record, terms));
}

function recordsForCategory(label) {
  return app.records.filter((record) => (record.categories || []).includes(label));
}

function recordsForTherapy(label) {
  return app.records.filter((record) => (record.therapies || []).includes(label));
}

function groupRecords(records, keyFn) {
  const grouped = new Map();
  records.forEach((record) => {
    const key = keyFn(record) || "Unspecified";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(record);
  });
  return [...grouped.entries()]
    .map(([label, records]) => ({ label, records }))
    .sort((a, b) => b.records.length - a.records.length);
}

function countData(definitions) {
  return definitions.map(([label, definition]) => {
    const records = typeof definition === "function" ? app.records.filter(definition) : recordsForTerms(definition);
    return { label, records };
  });
}

function sourceLabel(record) {
  return [record.year, record.poster_code, (record.categories || [])[0], (record.therapies || []).filter((item) => item !== "Unclassified")[0]]
    .filter(Boolean)
    .join(" / ");
}

function recordUrl(record) {
  return record.pdf?.local_path || record.pdf?.source_url || "";
}

function openRecords(kind, label, records) {
  app.selectedRecords = [...records].sort((a, b) => b.year - a.year || String(a.poster_code).localeCompare(String(b.poster_code), undefined, { numeric: true }));
  app.rendered = 0;
  document.querySelector("#dialog-kind").textContent = kind;
  document.querySelector("#dialog-title").textContent = label;
  document.querySelector("#dialog-summary").textContent = `${numberFormat(app.selectedRecords.length)} matching NASP posters. Rows link to the saved PDF and parsed markdown when available.`;
  document.querySelector("#dialog-search").value = "";
  renderRecords(true);
  document.querySelector("#records-dialog").showModal();
}

function filteredSelectedRecords() {
  const query = document.querySelector("#dialog-search").value.trim().toLowerCase();
  if (!query) return app.selectedRecords;
  const terms = query.split(/\s+/).filter(Boolean);
  return app.selectedRecords.filter((record) => terms.every((term) => recordText(record).includes(term)));
}

function renderRecords(reset = false) {
  if (reset) app.rendered = 0;
  const list = document.querySelector("#records-list");
  const records = filteredSelectedRecords();
  app.rendered = Math.min(records.length, app.rendered + PAGE_SIZE);
  list.innerHTML = records.slice(0, app.rendered).map((record) => `
    <li>
      <a class="record-title" href="${escapeHtml(recordUrl(record))}" target="_blank" rel="noopener">${escapeHtml(record.title || "Untitled NASP poster")}</a>
      <div class="record-meta">${escapeHtml(sourceLabel(record))}</div>
      <a class="record-url" href="${escapeHtml(record.pdf.local_path)}" target="_blank" rel="noopener">PDF: ${escapeHtml(record.pdf.filename)}</a>
      <a class="record-url" href="${escapeHtml(record.markdown_path)}" target="_blank" rel="noopener">Parsed markdown</a>
    </li>
  `).join("");
  const loadMore = document.querySelector("#load-more-records");
  loadMore.hidden = app.rendered >= records.length;
  loadMore.textContent = `Load more (${numberFormat(records.length - app.rendered)} remaining)`;
}

function kpiButton(label, records, className) {
  const button = document.createElement("button");
  button.className = `kpi kpi-${className}`;
  button.type = "button";
  button.innerHTML = `<div class="num">${numberFormat(records.length)}</div><div class="label">${escapeHtml(label)}</div>`;
  button.addEventListener("click", () => openRecords("Metric", label, records));
  return button;
}

function renderKpis() {
  const grid = document.querySelector("#kpi-grid");
  grid.innerHTML = "";
  grid.append(
    kpiButton("Total posters", app.records, "blue"),
    kpiButton("2025 posters", app.records.filter((record) => record.year === 2025), "red"),
    kpiButton("Access & affordability", recordsForCategory("Access & Affordability"), "gold"),
    kpiButton("Adherence & persistence", recordsForCategory("Adherence & Persistence"), "green"),
    kpiButton("Health-system specialty pharmacy", recordsForCategory("Health-System Specialty Pharmacy"), "teal"),
    kpiButton("Patient support", recordsForCategory("Patient Experience & Support"), "purple"),
  );
}

function renderInsights() {
  const insights = [
    ["Health-system specialty pharmacy remains the central operating model across the archive", recordsForCategory("Health-System Specialty Pharmacy")],
    ["Access, limited distribution, prior authorization, and affordability form a large recurring evidence cluster", recordsForTerms(termGroups.access)],
    ["Adherence, persistence, refill behavior, and therapy gaps are among the most measurable outcomes", recordsForTerms(termGroups.adherence)],
    ["Oncology, inflammatory disease, infectious disease, and neurology are the most visible specialty treatment areas", recordsForTerms([...termGroups.oncology, ...termGroups.inflammatory, ...termGroups.infectious, ...termGroups.neurology])],
    ["Workforce models and technician/pharmacist training appear as a practical implementation theme", recordsForTerms(termGroups.workforce)],
    ["Digital engagement, texting, automation, and analytics are emerging but still smaller signals", recordsForTerms(termGroups.digital)],
  ];
  document.querySelector("#insight-list").innerHTML = insights.map(([label, records], index) => `
    <li><button type="button" data-insight="${index}"><strong>${escapeHtml(label)}</strong>: ${numberFormat(records.length)} matching posters</button></li>
  `).join("");
  document.querySelector("#insight-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-insight]");
    if (!button) return;
    const [label, records] = insights[Number(button.dataset.insight)];
    openRecords("Insight", label, records);
  });
}

function renderBarList(id, points, kind) {
  const max = Math.max(...points.map((point) => point.records.length), 1);
  const container = document.querySelector(`#${id}`);
  container.innerHTML = "";
  points.forEach((point, index) => {
    const button = document.createElement("button");
    button.className = "bar-item";
    button.type = "button";
    button.innerHTML = `
      <span class="name">${escapeHtml(point.label)}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${Math.max(2, (point.records.length / max) * 100).toFixed(1)}%; background:${palette[index % palette.length]}"></span></span>
      <span class="val">${numberFormat(point.records.length)}</span>
    `;
    button.addEventListener("click", () => openRecords(kind, point.label, point.records));
    container.append(button);
  });
}

function chartClickHandler(points, kind) {
  return (_event, elements) => {
    if (!elements.length) return;
    const point = points[elements[0].index];
    openRecords(kind, point.label, point.records);
  };
}

function renderChart(canvasId, type, points, kind, extra = {}) {
  const chart = new Chart(document.getElementById(canvasId), {
    type,
    data: {
      labels: points.map((point) => point.label),
      datasets: [{
        label: "Matching posters",
        data: points.map((point) => point.records.length),
        backgroundColor: points.map((_, index) => palette[index % palette.length]),
        borderColor: type === "bar" ? "transparent" : "#d9e1ef",
        borderWidth: type === "bar" ? 0 : 1,
        borderRadius: type === "bar" ? 5 : 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: extra.indexAxis || "x",
      onClick: chartClickHandler(points, kind),
      plugins: {
        legend: { display: type !== "bar", position: "bottom", labels: { color: "#68758d", boxWidth: 10, font: { size: 10 } } },
        tooltip: { callbacks: { label: (context) => `${context.label}: ${numberFormat(context.parsed.y ?? context.parsed.x ?? context.parsed)} posters` } },
      },
      scales: type === "doughnut" || type === "polarArea" ? undefined : {
        x: { grid: { color: extra.indexAxis === "y" ? "#d9e1ef" : "transparent" }, ticks: { color: "#68758d", font: { size: 10 } } },
        y: { grid: { color: extra.indexAxis === "y" ? "transparent" : "#d9e1ef" }, ticks: { color: "#68758d", font: { size: 10 } } },
      },
    },
  });
  app.charts.push(chart);
}

function renderSpotlight() {
  const points = [
    ["Limited distribution and access services", recordsForTerms(["limited distribution", "access", "financial assistance"])],
    ["Integrated clinic and health-system pharmacy models", recordsForTerms(["integrated", "clinic", "health-system", "embedded"])],
    ["Patient engagement and support programs", recordsForTerms(["patient support", "outreach", "satisfaction", "education"])],
    ["Adherence measurement and persistence", recordsForTerms(termGroups.adherence)],
    ["Workforce, technician, and student models", recordsForTerms(termGroups.workforce)],
  ];
  const container = document.querySelector("#spotlight-list");
  container.innerHTML = "";
  points.forEach(([label, records], index) => {
    const button = document.createElement("button");
    button.className = "spotlight-item";
    button.type = "button";
    button.style.borderLeftColor = palette[index % palette.length];
    button.innerHTML = `<h3>${escapeHtml(label)}</h3><div class="tag-row"><span class="tag">${numberFormat(records.length)} posters</span><span class="tag">Click to inspect</span></div>`;
    button.addEventListener("click", () => openRecords("Spotlight", label, records));
    container.append(button);
  });
}

function renderThemeCards() {
  const cards = [
    ["Access Operations", recordsForTerms(termGroups.access), "Prior authorization, limited distribution networks, financial support, and payer coordination."],
    ["Adherence Outcomes", recordsForTerms(termGroups.adherence), "PDC, persistence, refill synchronization, treatment gaps, and adherence interventions."],
    ["Patient Support", recordsForTerms(termGroups.patient), "Education, outreach, support programs, satisfaction, quality of life, and caregiver evidence."],
    ["RWE & Analytics", recordsForTerms(termGroups.rwe), "Retrospective cohorts, claims, surveys, registries, and operational measurement."],
    ["Digital Pharmacy", recordsForTerms(termGroups.digital), "Texting, portals, telehealth, automation, algorithms, and analytics-enabled programs."],
    ["Workforce Models", recordsForTerms(termGroups.workforce), "Technician roles, extern programs, pharmacist teams, residency training, and staff models."],
  ];
  const container = document.querySelector("#theme-cards");
  container.innerHTML = "";
  cards.forEach(([label, records, description]) => {
    const button = document.createElement("button");
    button.className = "theme-card";
    button.type = "button";
    button.innerHTML = `<h3>${escapeHtml(label)}</h3><div class="big">${numberFormat(records.length)}</div><p>${escapeHtml(description)}</p>`;
    button.addEventListener("click", () => openRecords("Theme", label, records));
    container.append(button);
  });
}

function wireDialog() {
  document.querySelector(".dialog-close").addEventListener("click", () => document.querySelector("#records-dialog").close());
  document.querySelector("#records-dialog").addEventListener("click", (event) => {
    if (event.target.id === "records-dialog") event.target.close();
  });
  document.querySelector("#dialog-search").addEventListener("input", () => renderRecords(true));
  document.querySelector("#load-more-records").addEventListener("click", () => renderRecords());
  document.querySelector("#copy-urls").addEventListener("click", async () => {
    const urls = filteredSelectedRecords().map(recordUrl).filter(Boolean).join("\n");
    await navigator.clipboard.writeText(urls);
    document.querySelector("#copy-urls").textContent = "Copied";
    setTimeout(() => { document.querySelector("#copy-urls").textContent = "Copy URLs"; }, 1200);
  });
}

function renderAll() {
  renderKpis();
  renderInsights();
  renderChart("yearChart", "bar", groupRecords(app.records, (record) => record.year), "Year", { indexAxis: "y" });
  renderBarList("categoryBars", groupRecords(app.records.flatMap((record) => (record.categories || []).map((category) => ({ ...record, _category: category }))), (record) => record._category).slice(0, 10), "Category");
  renderSpotlight();
  renderChart("therapyChart", "polarArea", groupRecords(app.records.flatMap((record) => (record.therapies || []).map((therapy) => ({ ...record, _therapy: therapy }))), (record) => record._therapy).slice(0, 8), "Therapy area");
  renderBarList("accessBars", countData([["Access / authorization", termGroups.access], ["Adherence / persistence", termGroups.adherence], ["Patient experience", termGroups.patient], ["Operations / quality", termGroups.operations], ["Clinical outcomes", termGroups.clinical], ["Real-world evidence", termGroups.rwe], ["Workforce / education", termGroups.workforce], ["Digital / automation", termGroups.digital]]), "Signal");
  renderChart("modelChart", "doughnut", countData([["Oncology", termGroups.oncology], ["Inflammatory & autoimmune", termGroups.inflammatory], ["Infectious disease", termGroups.infectious], ["Neurology", termGroups.neurology], ["Cardiometabolic", termGroups.cardiometabolic], ["Rare disease", termGroups.rare]]), "Treatment signal");
  renderThemeCards();
}

function markLoaded() {
  document.querySelector("#dashboard-loading")?.setAttribute("hidden", "");
  document.body.classList.remove("is-loading");
  document.body.classList.add("is-loaded");
}

async function start() {
  wireDialog();
  const response = await fetch(DATA_URL);
  if (!response.ok) throw new Error(`Failed to load ${DATA_URL}`);
  const data = await response.json();
  app.records = data.presentations || [];
  renderAll();
  requestAnimationFrame(markLoaded);
}

start().catch((error) => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("has-load-error");
  document.querySelector("#dashboard-loading")?.setAttribute("hidden", "");
  document.querySelector(".dashboard-shell").insertAdjacentHTML("afterbegin", `<section class="insight-box"><h2>Unable to load dashboard data</h2><p>${escapeHtml(error.message)}</p></section>`);
});
