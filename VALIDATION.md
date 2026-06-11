# Validation checklist

- [x] Header uses the provided West Monroe logo file.
- [x] Parkview wordmark treatment is updated and marked for production replacement with an approved asset.
- [x] Platform map is reorganized into readable lanes.
- [x] Certified Metrics, Normalized Views, Transaction Detail, Forecast / Budget Inputs, Interoperability, and Reusable AI Features are separated from Rapid Insights, Predictive Analytics, and AI & Workflow.
- [x] Foundation cards are full-width and expand inline.
- [x] Tags are categorized consistently.
- [x] Use cases include more detail, complexity, benefits, prerequisites, and conceptual solution examples.
- [x] Enabled analytics sections are full-width and include tools, prerequisites, examples, and visuals.
- [x] Instructional microsite-build copy has been replaced with finished executive content.

## June 2026 update validation

Completed after applying content feedback and adding Provider Databricks App Demos:

- `node --check assets/js/main.js` passed.
- `python -m json.tool` passed for `build-manifest.json`, `content/site-content.json`, and `content/content-model.json`.
- Local asset path check passed for `index.html` and all copied provider demo `index.html` files.
- Local HTTP smoke test returned 200 for the root index, an embedded provider demo, a provider demo screenshot, and the Hospital Operations Command Center mock API file.
