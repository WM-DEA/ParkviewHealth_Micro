# Codex Instructions - Apply Parkview Feedback Pass

Apply the following updates to the Parkview Databricks microsite. Preserve the existing section order, responsive behavior, Provider-only Databricks App Demos section, West Monroe branding, and separation between consumption-layer/platform capabilities and enabled analytics outcomes.

## Content changes

1. Streaming Data foundation card
   - Remove the `Partner: Redox Engine` tag from the card.
   - Use the same Streaming Data icon as the platform map: `assets/icons/event-stream.svg`.

2. Post-Acquisition Data Integration Hub use-case card
   - Change `Featured onsite demo` to `Current Use Case Initiative`.
   - In the conceptual solution sketch, replace the source labels with:
     - Parkview EHR
     - Acquired EHR(s)
     - Finance System(s)
     - Supply Chain System(s)
     - Workforce System(s)
   - Change the Databricks middle node label to `Integration Hub`.

3. Clinical Command Center card
   - Remove the `Sigma + Redox` partner tag from the card. Do not remove Redox or Sigma from other places where they are intentionally referenced.

4. Featured Post-Acquisition story
   - In Step 01 / Source onboarding, replace the visual source labels with:
     - Parkview EHR
     - Acquired EHR(s)
     - Finance System(s)
     - Supply Chain System(s)
     - Workforce System(s)
   - Rename `Illustrative benefit ranges to calibrate` to `Benefits`.
   - Remove the bottom `Prerequisites` card.
   - Keep the `Complexity` bottom card.

5. Enabled Analytics and Intelligence
   - Remove the sentence: `Each analytics area now stands as a full-width story with relevant tools, required platform capabilities, example use cases, and a conceptual interface view.`
   - In the AI & Workflow tools row, keep only:
     - Databricks Apps
     - Databricks Lakebase
   - Remove `Redox Engine` and `Sigma AI Apps` from that tools row.

## Icon consistency requirement

Use the same icon asset for the same concept everywhere it appears. Follow this taxonomy:

- Integration Engine: `assets/icons/router.svg`
- Connected / IoT Devices: `assets/icons/iot-devices.svg`
- Scheduling & Referrals: `assets/icons/calendar.svg`
- Electronic Health Record: `assets/icons/clinical.svg`
- Pharmacy / Laboratory: `assets/icons/lab.svg`
- Financial Management: `assets/icons/financial.svg`
- ERP / Supply Chain: `assets/icons/warehouse.svg`
- Scanning / Faxing / Imaging: `assets/icons/documents.svg`
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

## Recommended validation

After changes, run:

```bash
node --check assets/js/main.js
python3 -m json.tool content/site-content.json >/dev/null
python3 -m json.tool content/content-model.json >/dev/null
python3 -m http.server 8080
```

Then open the microsite and verify the section jump links, foundation expansion, use-case filters, featured story tabs, Databricks App Demos modal, and responsive layout still work.
