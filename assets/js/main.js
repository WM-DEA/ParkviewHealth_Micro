const useCaseDetails = {
  acquisition: {
    title: "Post-Acquisition Data Integration Hub",
    outcome: "Rapid Insights",
    complexity: "Medium",
    what: "A repeatable integration pattern for bringing acquired clinical, financial, operational, and master data into Databricks, assessing quality, aligning definitions, and publishing certified metrics for executive consumption.",
    solution: ["Parkview EHR", "Acquired EHR(s)", "Finance System(s)", "Supply Chain System(s)", "Workforce System(s)", "Integration Hub", "Certified metrics", "AI/BI workbook"],
    prerequisites: ["Core Application System Data", "Certified Metrics", "Normalized Views", "Transaction Detail", "Data quality rules", "Security and stewardship"],
    benefits: ["25-40% faster KPI onboarding for acquired entities (directional estimate)", "20-35% less reconciliation and report rework (directional estimate)", "Earlier visibility into data quality risks", "Consistent board and executive reporting", "Reusable playbook for future transactions"],
    complexityDrivers: ["Source data dictionary coverage", "Patient / provider identity resolution", "Finance definition alignment", "Stewardship ownership and access model"],
    partners: ["Databricks", "AI/BI", "Redox Engine where event feeds are in scope"]
  },
  "sigma-bi": {
    title: "AI/BI Business Intelligence",
    outcome: "Rapid Insights",
    complexity: "Low to Medium",
    what: "A governed self-service analytics experience where leaders can explore trusted metrics, ask follow-up questions, and inspect operational and financial performance without recreating business logic in every report.",
    solution: ["Certified metrics", "AI/BI workbook", "AI-assisted exploration", "Executive decisions"],
    prerequisites: ["Core system data", "Certified Metrics", "Normalized Views", "Unity Catalog / access model", "Semantic definitions"],
    benefits: ["Fewer conflicting KPI conversations", "Faster answers for business leaders", "Reduced report backlog", "Consistent logic across dashboards and ad hoc analysis"],
    complexityDrivers: ["Metric ownership", "Existing BI/report inventory", "Security roles", "Executive priority alignment"],
    partners: ["AI/BI", "Databricks"]
  },
  "redox-adt": {
    title: "Redox ADT Event Enablement",
    outcome: "AI & Workflow",
    complexity: "Medium",
    what: "A streaming integration pattern that brings admission, discharge, and transfer events into the platform for time-sensitive visibility, downstream worklists, and operational actions.",
    solution: ["ADT event", "Redox Engine", "Databricks stream", "Operational trigger"],
    prerequisites: ["Streaming Data", "Interoperability", "Event taxonomy", "Operational data model", "Workflow ownership"],
    benefits: ["Improved event visibility", "Faster operational response", "Reusable streaming pattern", "Better freshness for command-center and workflow use cases"],
    complexityDrivers: ["Event source readiness", "Payload standardization", "Routing rules", "Workflow adoption"],
    partners: ["Redox Engine", "Databricks"]
  },
  continuity: {
    title: "Continuity of Care Document Intelligence",
    outcome: "AI & Workflow",
    complexity: "Medium",
    what: "A document intelligence pattern that extracts, classifies, and routes important clinical context from scans, faxes, PDFs, and referrals so information can be searched and acted on faster.",
    solution: ["Fax / scan", "Document extraction", "Structured data", "Workflow routing"],
    prerequisites: ["Unstructured Data", "Document intake", "Extraction rules", "PHI controls", "Routing ownership"],
    benefits: ["Reduced manual review", "Faster follow-up", "Better availability of clinical context", "Reusable extraction pipeline for future document types"],
    complexityDrivers: ["Document variability", "Image quality", "Validation requirements", "Downstream workflow integration"],
    partners: ["Databricks"]
  },
  "command-center": {
    title: "Clinical Command Center",
    outcome: "Predictive Analytics",
    complexity: "High",
    what: "A near-real-time operating view that combines clinical, operational, ADT, capacity, and discharge signals so leaders can manage patient flow and bottlenecks more proactively.",
    solution: ["System + ADT data", "Operational metrics", "Predictive signals", "Command center"],
    prerequisites: ["Core system data", "Streaming Data", "Certified operational metrics", "Forecast / Budget inputs", "Operational governance"],
    benefits: ["Earlier bottleneck detection", "Better discharge readiness visibility", "Improved capacity planning", "More coordinated operational response"],
    complexityDrivers: ["Workflow ownership", "Signal quality", "Real-time operational adoption", "Change management"],
    partners: ["Databricks"]
  },
  "clinician-scheduling": {
    title: "Clinician Scheduling Optimization",
    outcome: "Predictive Analytics",
    complexity: "High",
    what: "A planning and optimization use case that combines appointment demand, provider capacity, workforce rules, utilization, and access goals to improve scheduling decisions.",
    solution: ["Demand signals", "Capacity constraints", "Forecast model", "Schedule options"],
    prerequisites: ["Scheduling data", "Provider master", "HRIS / timekeeping", "Forecasting models", "Access goals"],
    benefits: ["Improved access planning", "Better utilization visibility", "Reduced avoidable scheduling gaps", "More data-informed workforce decisions"],
    complexityDrivers: ["Scheduling rule complexity", "Provider preferences", "Capacity constraints", "Operational adoption"],
    partners: ["Databricks"]
  },
  supply: {
    title: "Supply Chain Optimization",
    outcome: "Predictive Analytics",
    complexity: "Medium",
    what: "A service-line and supply intelligence use case that connects ERP, utilization, vendor, inventory, and finance data to reduce variance and improve planning decisions.",
    solution: ["ERP + utilization", "Cost drivers", "Forecast view", "Service-line action"],
    prerequisites: ["ERP data", "Financial data", "Operational data", "Forecast / Budget inputs", "Service-line definitions"],
    benefits: ["Better cost variance insight", "Improved inventory and vendor planning", "Reduced disconnected analysis", "Stronger service-line decision support"],
    complexityDrivers: ["ERP data quality", "Item master standardization", "Service-line attribution", "Vendor data integration"],
    partners: ["Databricks", "AI/BI"]
  },
  "patient-engagement": {
    title: "Patient Engagement Chatbot",
    outcome: "AI & Workflow",
    complexity: "High",
    what: "A governed AI engagement pattern that grounds patient-facing or staff-assisted interactions in approved knowledge, operational context, and workflow integration.",
    solution: ["Knowledge assets", "Operational context", "AI assistant", "Workflow handoff"],
    prerequisites: ["Unstructured knowledge base", "Core system data", "Reusable AI Features", "Databricks Apps / Lakebase", "Interoperability and controls"],
    benefits: ["More consistent answers", "Scalable patient navigation", "Potential call deflection", "Better handoff to human workflows"],
    complexityDrivers: ["Clinical safety review", "Knowledge governance", "Integration scope", "Model monitoring and escalation rules"],
    partners: ["Databricks Apps", "Databricks Lakebase", "Redox Engine"]
  }
};

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function setExpanded(button, open) {
  const card = button.closest('.foundation-card');
  const panel = qs('.foundation-detail', card);
  button.setAttribute('aria-expanded', String(open));
  button.textContent = open ? 'Collapse details' : 'Expand details';
  panel.hidden = !open;
}

qsa('.expand-card').forEach(button => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    setExpanded(button, !isOpen);
  });
});

qsa('[data-scroll-target]').forEach(control => {
  control.addEventListener('click', event => {
    const id = control.dataset.scrollTarget;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const filterButtons = qsa('.filter-chip');
const useCaseCards = qsa('.use-case-card, .featured-usecase-card');
function applyFilter(filter) {
  filterButtons.forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
  useCaseCards.forEach(card => {
    const tags = card.dataset.tags || '';
    card.hidden = filter !== 'all' && !tags.includes(filter);
  });
}
filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
qsa('[data-filter-link]').forEach(link => {
  link.addEventListener('click', () => {
    window.setTimeout(() => applyFilter(link.dataset.filterLink), 120);
  });
});

const casePanel = qs('#casePanel');
const backdrop = qs('.panel-backdrop');
const panelContent = qs('.panel-content');

function miniSolutionHtml(items = []) {
  return `<div class="mini-solution">${items.map(item => `<span>${item}</span>`).join('')}</div>`;
}

function openCase(id) {
  const detail = useCaseDetails[id];
  if (!detail) return;
  panelContent.innerHTML = `
    <span class="eyebrow">${detail.outcome}</span>
    <h3>${detail.title}</h3>
    <p>${detail.what}</p>
    <div class="panel-visual">${miniSolutionHtml(detail.solution)}</div>
    <div class="panel-section"><strong>Prerequisites</strong><div class="mini-tags">${detail.prerequisites.map(x => `<span>${x}</span>`).join('')}</div></div>
    <div class="panel-section"><strong>Expected benefits</strong><ul>${detail.benefits.map(x => `<li>${x}</li>`).join('')}</ul></div>
    <div class="panel-section"><strong>Complexity</strong><p>${detail.complexity}</p><ul>${detail.complexityDrivers.map(x => `<li>${x}</li>`).join('')}</ul></div>
    <div class="panel-section"><strong>Relevant partners / tools</strong><div class="mini-tags">${detail.partners.map(x => `<span>${x}</span>`).join('')}</div></div>
  `;
  casePanel.classList.add('open');
  casePanel.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
  history.replaceState(null, '', `#use-case-${id}`);
}
function closeCase() {
  casePanel.classList.remove('open');
  casePanel.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
}

qsa('[data-open-case]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.openCase)));
qs('.panel-close')?.addEventListener('click', closeCase);
backdrop?.addEventListener('click', closeCase);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCase(); });

qsa('.story-step').forEach(step => {
  step.addEventListener('click', () => {
    const tab = step.dataset.demoTab;
    qsa('.story-step').forEach(s => {
      const active = s === step;
      s.classList.toggle('active', active);
      s.setAttribute('aria-selected', String(active));
    });
    qsa('.demo-tab').forEach(panel => {
      const active = panel.id === `demo-${tab}`;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
  });
});

const sections = qsa('main section[id]');
const navLinks = qsa('.primary-nav a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { threshold: 0.18, rootMargin: '-120px 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

(function openHashCase() {
  const match = location.hash.match(/^#use-case-(.+)$/);
  if (match) window.setTimeout(() => openCase(match[1]), 350);
})();


// Provider Databricks App Demo modal
const demoModal = qs('#demoModal');
const demoFrame = qs('#demoModalFrame');
const demoTitle = qs('#demoModalTitle');
const demoNewTab = qs('#demoModalNewTab');

function openDemo(cardOrButton) {
  const card = cardOrButton.closest('.demo-card');
  if (!card || !demoModal || !demoFrame || !demoTitle || !demoNewTab) return;
  const title = qs('h3', card)?.textContent?.trim() || 'Databricks App Demo';
  const src = card.dataset.demoSrc;
  if (!src) return;
  demoTitle.textContent = title;
  demoFrame.src = src;
  demoNewTab.href = src;
  demoModal.hidden = false;
  demoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeDemo() {
  if (!demoModal || !demoFrame) return;
  demoModal.hidden = true;
  demoModal.setAttribute('aria-hidden', 'true');
  demoFrame.src = 'about:blank';
  document.body.classList.remove('modal-open');
}

qsa('[data-open-demo]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    openDemo(button);
  });
});
qsa('.demo-card').forEach(card => {
  card.addEventListener('dblclick', () => openDemo(card));
});
qsa('[data-close-demo]').forEach(control => control.addEventListener('click', closeDemo));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDemo(); });
