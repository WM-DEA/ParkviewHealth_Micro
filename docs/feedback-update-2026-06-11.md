# Parkview Microsite Feedback Update - 2026-06-11

This pass applies the revised feedback workbook and the global icon-consistency note.

## Applied content revisions

- Removed the **Partner: Redox Engine** tag from the Streaming Data foundation card.
- Updated the Streaming Data foundation card icon to `assets/icons/event-stream.svg`, matching the platform map.
- Changed the Post-Acquisition Data Integration Hub use-case badge from **Featured onsite demo** to **Current Use Case Initiative**.
- Updated the Post-Acquisition Data Integration Hub conceptual solution sketch source labels to:
  - Parkview EHR
  - Acquired EHR(s)
  - Finance System(s)
  - Supply Chain System(s)
  - Workforce System(s)
- Changed the Databricks middle node in the acquisition use-case solution sketch to **Integration Hub**.
- Removed the **Sigma + Redox** partner tag from the Clinical Command Center use-case card.
- Updated the Featured Acquisition story source-onboarding demo visual with the same five source labels used in the use-case sketch.
- Renamed the bottom benefit card from **Illustrative benefit ranges to calibrate** to **Benefits**.
- Removed the bottom **Prerequisites** card from the Featured Acquisition story.
- Removed the instructional sentence from the Enabled Analytics section intro.
- Removed **Redox Engine** and **Sigma AI Apps** from the AI & Workflow tools row.

## Applied visual / style revisions

- Added a two-card layout for the Featured Acquisition story bottom cards after removing Prerequisites.
- Added a more legible source mosaic for the acquisition source-onboarding demo tab so the five source systems are readable.
- Added an icon taxonomy to `content/content-model.json` and `content/site-content.json` so production implementation can maintain consistent icons across recurring concepts.

## Icon taxonomy rule

Use the same icon file every time the same source system, foundation component, platform capability, or enabled outcome is referenced.

Key mappings:

- Core Application System Data: `assets/icons/warehouse.svg`
- Streaming Data: `assets/icons/event-stream.svg`
- Unstructured Data: `assets/icons/documents.svg`
- Certified Metrics: `assets/icons/certified.svg`
- Normalized Views: `assets/icons/views.svg`
- Transaction Detail: `assets/icons/transaction.svg`
- Forecast / Budget Inputs: `assets/icons/forecast.svg`
- Interoperability: `assets/icons/interoperability.svg`
- Reusable AI Features: `assets/icons/model-features.svg`
- Rapid Insights: `assets/icons/rapid.svg`
- Predictive Analytics: `assets/icons/predictive.svg`
- AI & Workflow: `assets/icons/workflow.svg`
