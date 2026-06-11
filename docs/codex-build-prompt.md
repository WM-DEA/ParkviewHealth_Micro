# Codex build prompt

Refactor this static prototype into the preferred production frontend stack while preserving the current content hierarchy, visual intent, and interaction behavior.

## Core narrative

The site should tell a five-lane platform story:

1. **Source systems**: EHR, scheduling, referrals, pharmacy/lab, finance, ERP/supply chain, integration engine, IoT/device data, scanning/faxing/imaging.
2. **Data platform foundations**: Core Application System Data, Streaming Data, and Unstructured Data.
3. **Databricks Healthcare Data Platform**: the governed, secure, scalable, AI-ready platform core.
4. **Consumption layer & platform capabilities**: Certified Metrics, Normalized Views, Transaction Detail, Forecast / Budget Inputs, Interoperability, and Reusable AI Features.
5. **Enabled analytics outcomes**: Rapid Insights, Predictive Analytics, and AI & Workflow.

Do not rename the middle layer to “data products.” The items in that layer should be treated as consumption-layer features and platform capabilities that make analytics trustworthy, reusable, and scalable.

## Required interactions

- Sticky header navigation with active section state.
- Smooth scroll to sections and featured demo.
- Expand/collapse detail panels for foundation components.
- Filter use cases by foundation, outcome, and partner relevance.
- Slide-out use-case detail panel with prerequisites, benefits, complexity drivers, and conceptual solution sketch.
- Clickable acquisition demo tabs for source onboarding, quality profile, semantic alignment, certified metric hub, and Sigma executive workbook.

## Brand and assets

- Preserve West Monroe branding from `assets/logos/west-monroe-official.png`.
- Replace `assets/logos/parkview.svg` with an approved Parkview Health logo before production deployment.
- Replace prototype vendor logo SVGs with approved Databricks, Sigma Computing, and Redox Engine assets if available.
- Do not add font files; use system or licensed web fonts based on production standards.

## New implementation requirement: Databricks App Demos

Preserve the new `#databricks-demos` section and quick-jump navigation. The section must include only Provider demos from the supplied healthcare AI microsite. Keep the iframe modal behavior or convert it to a React modal component with the same behavior. Do not add Payer or Life Sciences demos unless explicitly requested.


## Follow-up content feedback to preserve

- Streaming Data uses the same `event-stream.svg` icon in the platform map and foundation card.
- Do not show a Redox Engine tag on the Streaming Data foundation card. Keep Redox references only for Redox-specific/event-feed use cases or partner strips where appropriate.
- The Post-Acquisition Data Integration Hub use-case tag is **Current Use Case Initiative**, not **Featured onsite demo**.
- The acquisition solution sketch uses source labels: Parkview EHR, Acquired EHR(s), Finance System(s), Supply Chain System(s), and Workforce System(s). The Databricks middle node is labeled **Integration Hub**.
- Clinical Command Center should not show a Sigma + Redox partner tag on the card.
- The Featured Acquisition story bottom cards are **Benefits** and **Complexity** only; remove the Prerequisites bottom card.
- In Enabled Analytics, AI & Workflow tools are **Databricks Apps** and **Databricks Lakebase** only.
