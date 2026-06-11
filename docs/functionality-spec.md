# Functionality spec

## Navigation

The header remains sticky and allows leaders to move between Overview, Platform map, Foundations, Capabilities, Use cases, Demos, and Analytics. Active navigation updates as the user scrolls.

## Platform map

The platform map is a readable executive architecture, not a detailed engineering diagram. It shows five distinct lanes and intentionally separates consumption-layer features / platform capabilities from enabled analytics outcomes.

## Foundation cards

Foundation components are full-width horizontal cards. Each card is readable when collapsed and expands inline to reveal scope, executive benefits, initial use cases, and future use cases.

## Capabilities section

Certified Metrics, Normalized Views, Transaction Detail, and Forecast / Budget Inputs are consumption-layer features. Interoperability and Reusable AI Features are platform capabilities. These capabilities support analytics, but are not themselves the analytics outcomes.

## Use-case library

Use cases are filterable by foundation, outcome, and partner relevance. Tags have consistent meanings:

- Foundation tags identify prerequisite data foundations.
- Outcome tags identify the analytics family.
- Partner tags identify relevant vendors or platform tools.
- Complexity tags indicate implementation complexity.

Use-case detail panels include business description, solution sketch, prerequisites, expected benefits, complexity, complexity drivers, and partner/tool relevance.

## Featured acquisition demo

The Post-Acquisition Data Integration Hub is the anchor demo. The demo tab sequence is: acquire sources, profile quality, align definitions, certify metrics, and analyze in Sigma.

## Enabled analytics

Rapid Insights, Predictive Analytics, and AI & Workflow are full-width sections with tools, platform needs, example use cases, and conceptual visuals.

## Databricks App Demos

A new `#databricks-demos` section is included in the sticky navigation and the header quick-jump button.

Behavior:
- Demo cards show provider-focused Databricks App prototype content only.
- Each card includes a screenshot, use-case framing, role/purpose summary, workflow bullets, illustrative value statement, and two actions.
- `Open demo` opens an iframe modal on the current page.
- `New tab` opens the same static prototype bundle directly.
- Escape key and close controls close the modal.
- Demo iframe source is cleared on close to stop app state/audio/network activity.

Integrated provider demos:
- Ambient Clinical Documentation
- Clinical Coding & CDI Copilot
- Prior Authorization Automation
- Denial Management & Appeals
- Patient Access & Referral Leakage
- Hospital Operations Command Center
- Multi-Site Eye-Care Performance Analytics


## Icon consistency

Use the icon taxonomy in `content/content-model.json`. The same source system, foundation component, platform capability, or enabled outcome should use the same SVG file everywhere it appears in the microsite. Streaming Data uses `assets/icons/event-stream.svg` in both the platform map and foundation card.
