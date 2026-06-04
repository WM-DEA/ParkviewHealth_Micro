# Finished-product detail spec

This microsite should feel like a guided executive briefing product rather than a static one-page landing page. Preserve the following details when converting to a framework implementation.

## Header and access context

- Sticky West Monroe-branded header with Parkview-prepared-for lockup.
- Client-safe language: "Private onsite concept" rather than public marketing copy.
- Primary CTA should open the featured demo story.
- Production version should support a protected route or lightweight access gate if externally hosted.

## Overview architecture

- Preserve four distinct layers: source systems, foundation data domains, platform data products, and enabled analytics outcomes.
- Platform products should look like reusable platform services, not user-facing analytics experiences.
- Add hover paths in production: source -> foundation -> platform product -> enabled outcome.
- Keep the foundation side more neutral and the outcome side more active / blue to reinforce story progression.

## Foundation cards

- Collapsed state must include title, executive summary, data-type indicators, and a clear action.
- Expanded state should include typical scope, benefits, initial use cases, future use cases, and partner callouts.
- Streaming Data should consistently surface Redox Engine as the event/interoperability partner.
- Core Application System Data should deep-link to the Post-Acquisition Data Integration Hub.

## Platform products

Each product should have a short executive summary and an implementation meaning:

- Certified Metrics: governed gold-layer metrics with ownership and quality rules.
- Normalized Views: curated semantic views for common healthcare concepts.
- Forecast / Budget: planning datasets and predictive inputs.
- Interop: FHIR, HL7, API, and partner exchange services.
- Transaction Detail: traceable detail for audit, claims, encounters, payments, orders, and supply activity.
- Reusable AI Features: features, embeddings, and model inputs that accelerate AI use cases.

## Use-case library

- Filter by foundation prerequisite and enabled outcome.
- Use cards for scanning, then a side panel for detail.
- Detail panel should include prerequisites, complexity, partners/tools, benefits to validate, and demo availability.
- Avoid unvalidated numerical value claims; keep quantification fields as "to validate" until Parkview baselines are confirmed.

## Featured demo story

The Post-Acquisition Data Integration Hub should be the most accessible path in the site.

- Links from hero, Core Application System Data, Use Case Library, and Demo nav item.
- Five-step interactive story: Acquire, Quality, Standardize, Certify, Analyze.
- Demo area can support a Sigma workbook embed, video, static screenshot carousel, or guided mock flow.
- Partner strip should include Databricks, Sigma Computing, and Redox Engine.

## Visual polish details

- Use subtle ambient gradients, cards with soft depth, glassy panels, and strong executive whitespace.
- Icons should be consistent line-style SVGs with restrained color.
- Badges should be informative but not visually noisy.
- Keep copy crisp and business-outcome oriented.
- Support responsive stacking and `prefers-reduced-motion`.
