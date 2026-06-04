# Codex build prompt

You are building an executive microsite for a Parkview Health onsite led by West Monroe. Use this package as the source of truth for design direction, content, structure, assets, and interactions.

## Goal

Create a polished, responsive microsite that tells the story of a Databricks-centric Healthcare Data Platform. The site should show how foundational healthcare data domains become governed platform data products, which then enable analytics, predictive intelligence, and AI-powered workflows.

## Primary audience

Parkview Health executives and technology / analytics leaders. Tone should be executive-facing, practical, and confident. Avoid overly technical copy unless it is in a detail drawer, demo panel, or implementation section.

## Required pages or sections

1. Executive Overview
   - Show foundation systems on the left.
   - Show Databricks Healthcare Data Platform at the core.
   - Show platform data products/services as a distinct middle-right layer: Certified Metrics, Normalized Views, Forecast / Budget, Interop, Transaction Detail, Reusable AI Features.
   - Show enabled analytics outcomes as the far-right layer: Rapid Insights, Predictive Analytics, AI & Workflow.
   - Do not visually conflate platform data products with analytics outcomes.

2. Data Platform Foundations
   - Core Application System Data
   - Streaming Data, with Redox Engine partner callout
   - Unstructured Data
   - Cards must be useful when collapsed and richer when expanded.
   - Include visible data-type badges.

3. Platform Data Products
   - Certified Metrics
   - Normalized Views
   - Forecast / Budget
   - Interop
   - Transaction Detail
   - Reusable AI Features

4. Use Case Library
   - Filterable by foundation prerequisite and outcome family.
   - Each use case should show description, prerequisites, complexity, benefits to validate, and relevant partners/tools.

5. Featured Use Case
   - Post-Acquisition Data Integration Hub
   - Make it easily accessible from the Core System Data card and the Use Case Library.
   - Include Databricks, Sigma Computing, and Redox Engine branding.
   - Reserve space for a Sigma workbook or demo embed.
   - Flow: acquire sources -> discover inventory and quality -> standardize key elements -> publish certified metrics -> analyze in Sigma.

6. Analytics and Intelligence
   - Rapid Insights: Sigma Computing, Databricks SQL, Databricks Genie, Databricks Apps.
   - Predictive Analytics: Databricks Lakehouse AI, MLflow, Feature Store, Model Serving.
   - AI & Workflow: Databricks Apps, Databricks Lakebase, Redox Engine, Sigma AI Apps.

## Implementation expectations

- Use accessible semantic HTML.
- Make interactions keyboard-friendly.
- Use local SVG assets from `assets/logos` and `assets/icons` unless approved brand assets are provided.
- Use CSS variables from `styles.css` as starting brand tokens.
- Add route or anchor deep links for every major section and use case.
- Keep animations tasteful and support `prefers-reduced-motion`.
- Ensure the site works on executive briefing room displays and mobile.

## Deliverable

Convert this prototype into a maintainable production-ready app using the chosen project stack. If no stack is specified, a Vite + React implementation with content-driven components is recommended.
