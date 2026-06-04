# Parkview Health Databricks Healthcare Data Platform Microsite - v3 Build Package

This package is a static, self-contained microsite prototype and implementation brief for the Parkview Health onsite. It is designed to be dropped into a coding agent environment such as Codex and turned into a production site or converted to a framework implementation.

## What is included

- `index.html` - runnable static microsite prototype with executive-grade content and interactions.
- `assets/css/styles.css` - visual system, layout, responsive rules, and print rules.
- `assets/js/main.js` - card expansion, use-case filtering, side panel, demo tabs, nav scroll state.
- `assets/logos/` - local vector logo treatments for West Monroe, Parkview Health, Databricks, Sigma, and Redox.
- `assets/icons/` - local SVG icon set for data domains, platform products, analytics capabilities, and healthcare source systems.
- `content/site-content.json` - reusable content model for a React/Next/Vite build, including foundation components, source systems, use cases, design tokens, and logo manifest.
- `content/content-model.json` - normalized content schema copied separately for Codex/CMS conversion.
- `design-tokens.json` - color, spacing, typography, radius, and motion tokens.
- `assets/logo-manifest.json` - local logo paths plus production/discoverable logo asset URLs where available.
- `docs/codex-build-prompt.md` - direct prompt to give Codex.
- `docs/functionality-spec.md` - production behavior and implementation notes.
- `docs/finished-product-detail-spec.md` - product-level details, states, and microinteraction guidance.
- `docs/asset-notes.md` - logo and trademark handling notes.

## Local preview

Open `index.html` in a browser, or serve the folder with any static server.

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080` from this directory.

## Recommended production conversion

1. Convert static sections into React components.
2. Move section copy and use-case definitions into `content/site-content.json` or a CMS.
3. Swap the local SVG logo treatments with brand-approved source files from West Monroe and vendor brand libraries.
4. Replace the demo shell with a Sigma workbook embed, protected video, or a secure app route.
5. Add analytics, route-level access control, and client-approved disclaimers before deployment.

## Design intent

The overview separates three layers:

1. Foundation data domains: System Data, Streaming Data, Unstructured Data.
2. Platform data products: Certified Metrics, Normalized Views, Forecast / Budget, Interop, Transaction Detail, Reusable AI Features.
3. Enabled analytics and workflow outcomes: Rapid Insights, Predictive Analytics, AI & Workflow.

This distinction keeps platform products visible without conflating them with the analytics experiences.
