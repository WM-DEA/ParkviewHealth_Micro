const useCaseDetails = {
  "acquisition": {
    title: "Post-Acquisition Data Integration Hub",
    outcome: "Rapid Insights",
    complexity: "Medium",
    description: "Integrate acquired health system data and inaccessible financial data into Databricks, profile source quality, map definitions to Parkview standard elements, and publish certified metrics for Sigma analysis.",
    prerequisites: ["Core Application System Data", "Certified Metrics", "Normalized Views", "Data Quality Rules", "Security and Stewardship"],
    benefits: ["Faster KPI onboarding for acquired entities", "Reduced manual reconciliation effort", "Earlier identification of data quality gaps", "Reusable integration pattern for future acquisitions"],
    partners: ["Databricks", "Sigma Computing", "Redox Engine"]
  },
  "sigma-bi": {
    title: "Sigma AI Business Intelligence",
    outcome: "Rapid Insights",
    complexity: "Low to Medium",
    description: "Deliver governed self-service exploration and executive dashboards on Databricks-backed certified metrics.",
    prerequisites: ["Core System Data", "Certified Metrics", "Unity Catalog / access model"],
    benefits: ["Fewer conflicting reports", "More trusted KPI conversations", "Faster leader access to answers"],
    partners: ["Sigma Computing", "Databricks"]
  },
  "redox-adt": {
    title: "Redox ADT Event Enablement",
    outcome: "AI & Workflow",
    complexity: "Medium",
    description: "Use real-time ADT and operational events to trigger dashboards, worklists, and downstream workflow actions.",
    prerequisites: ["Streaming Data", "Interop", "Operational data model", "Workflow ownership"],
    benefits: ["Improved event visibility", "Faster operational response", "Reusable event processing pattern"],
    partners: ["Redox Engine", "Databricks"]
  },
  "continuity": {
    title: "Continuity of Care Document Intelligence",
    outcome: "AI & Workflow",
    complexity: "Medium",
    description: "Transform scanned, faxed, and document-based information into searchable, classified, and routable data for downstream workflows.",
    prerequisites: ["Unstructured Data", "Document classification", "Data extraction rules", "Workflow routing"],
    benefits: ["Reduced manual review", "Faster context retrieval", "Better clinical and operational routing"],
    partners: ["Databricks"]
  },
  "command-center": {
    title: "Clinical Command Center",
    outcome: "Predictive Analytics",
    complexity: "High",
    description: "Combine system and streaming data to manage capacity, bottlenecks, discharge readiness, and operational risk in near real time.",
    prerequisites: ["Core System Data", "Streaming Data", "Certified operational metrics", "Forecasting data product"],
    benefits: ["Earlier visibility into bottlenecks", "Better care coordination", "More proactive capacity management"],
    partners: ["Databricks", "Redox Engine", "Sigma Computing"]
  },
  "clinician-scheduling": {
    title: "Clinician Scheduling Optimization",
    outcome: "Predictive Analytics",
    complexity: "High",
    description: "Use demand, capacity, appointment, and workforce data to optimize schedules and access goals.",
    prerequisites: ["Scheduling data", "HRIS / timekeeping", "Provider master", "Forecasting models"],
    benefits: ["Improved access planning", "Reduced avoidable gaps", "Better utilization visibility"],
    partners: ["Databricks"]
  },
  "supply": {
    title: "Supply Chain Optimization",
    outcome: "Predictive Analytics",
    complexity: "Medium",
    description: "Connect supply chain, utilization, vendor, service line, and finance data to surface variance and planning opportunities.",
    prerequisites: ["ERP data", "Financial data", "Operational data", "Forecast / Budget data product"],
    benefits: ["Better cost variance insight", "Improved planning", "Reduced disconnected analysis"],
    partners: ["Databricks", "Sigma Computing"]
  },
  "patient-engagement": {
    title: "Patient Engagement Chatbot",
    outcome: "AI & Workflow",
    complexity: "High",
    description: "Ground patient-facing or staff-facing engagement in governed operational, clinical, and knowledge data with workflow integration.",
    prerequisites: ["Core system data", "Unstructured knowledge base", "Lakebase / app state", "Workflow integration"],
    benefits: ["Improved experience", "Faster navigation", "Scalable engagement pattern"],
    partners: ["Databricks Apps", "Databricks Lakebase", "Redox Engine"]
  }
};

function qs(selector, root = document) { return root.querySelector(selector); }
function qsa(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

qsa('.expand-card').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.foundation-card');
    const panel = qs('.expand-panel', card);
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    button.textContent = isOpen ? 'Expand component' : 'Collapse component';
    panel.hidden = isOpen;
  });
});

qsa('[data-scroll-target]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.scrollTarget);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const filterButtons = qsa('.filter-chip');
const cards = qsa('.use-case-card');
function applyFilter(filter) {
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  cards.forEach(card => {
    const tags = card.dataset.tags || '';
    const show = filter === 'all' || tags.includes(filter);
    card.hidden = !show;
  });
}
filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
qsa('[data-filter-link]').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(() => applyFilter(link.dataset.filterLink), 200);
  });
});

const panel = qs('#casePanel');
const backdrop = qs('.panel-backdrop');
const panelContent = qs('.panel-content');
function openCase(id) {
  const detail = useCaseDetails[id];
  if (!detail) return;
  panelContent.innerHTML = `
    <span class="eyebrow">${detail.outcome}</span>
    <h3>${detail.title}</h3>
    <p>${detail.description}</p>
    <div class="panel-section"><strong>Prerequisites</strong><div class="mini-tags">${detail.prerequisites.map(x => `<span>${x}</span>`).join('')}</div></div>
    <div class="panel-section"><strong>Benefits to validate</strong><ul>${detail.benefits.map(x => `<li>${x}</li>`).join('')}</ul></div>
    <div class="panel-section"><strong>Complexity</strong><p>${detail.complexity}</p></div>
    <div class="panel-section"><strong>Relevant partners / tools</strong><div class="mini-tags">${detail.partners.map(x => `<span>${x}</span>`).join('')}</div></div>
  `;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
  history.replaceState(null, '', `#use-case-${id}`);
}
function closeCase() {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
}
qsa('[data-open-case]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.openCase)));
qs('.panel-close').addEventListener('click', closeCase);
backdrop.addEventListener('click', closeCase);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCase(); });

qsa('.story-step').forEach(step => {
  step.addEventListener('click', () => {
    const tab = step.dataset.demoTab;
    qsa('.story-step').forEach(s => s.classList.toggle('active', s === step));
    qsa('.demo-tab').forEach(panel => {
      const active = panel.id === `demo-${tab}`;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
  });
});

const sections = qsa('main .section[id]');
const navLinks = qsa('.primary-nav a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { threshold: 0.18, rootMargin: '-120px 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

qsa('.product-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    document.getElementById('platform-products').scrollIntoView({ behavior: 'smooth' });
  });
});
