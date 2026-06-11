# Parkview Health Databricks Healthcare Data Platform Microsite

This package is a refined static microsite prototype for the Parkview Health onsite executive briefing.

## How to run locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## What changed in this refinement

- Rebuilt the visual system around stronger West Monroe navy, better contrast, cleaner spacing, and consistent card sizing.
- Replaced the placeholder West Monroe mark with the provided West Monroe logo asset.
- Added a more faithful Parkview Health wordmark treatment based on the public Parkview mark. Replace with a client-approved Parkview brand file before production deployment.
- Reworked the platform map into a readable five-lane architecture: source systems, foundational data domains, Databricks core, consumption layer / platform capabilities, and enabled analytics outcomes.
- Renamed “Platform Data Products” to “Consumption layer & platform capabilities” to avoid conflating certified metrics, forecasting inputs, interop, transaction detail, and AI features with the enabled analytics experiences.
- Standardized tag types across cards: foundation, data, partner, outcome, complexity, consumption layer, and platform capability.
- Rewrote microsite-instruction copy into executive-facing content.
- Expanded use cases with business descriptions, prerequisites, benefit areas, complexity drivers, and conceptual solution sketches.
- Expanded enabled analytics into full-width sections with tools, prerequisites, use cases, and conceptual visual examples.

## Production notes

- Replace `assets/logos/parkview.svg` with Parkview-approved brand artwork before client-facing distribution.
- Vendor logo files are prototype-safe local SVG treatments. Replace with approved Databricks, Sigma Computing, and Redox Engine assets if this becomes a production artifact.
- No font files are included. The prototype uses system fonts for portability.

## June 2026 update: Content review + provider demo integration

This version applies the submitted content-review workbook updates and adds a new **Databricks App Demos** section using only Provider demos from the supplied healthcare AI microsite. See `docs/update-notes-2026-06-11.md` for details.
