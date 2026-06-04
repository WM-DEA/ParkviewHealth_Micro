# Functionality spec

## Navigation

- Sticky West Monroe / Parkview header.
- Section anchors for Overview, Foundations, Platform Products, Use Cases, Demo, Analytics.
- Scroll-state active link behavior.
- CTA opens the featured use-case demo section.

## Overview interaction

- Platform data product tiles scroll to the Platform Data Products section.
- Foundation, platform product, and outcome layers must remain visually distinct.
- Suggested production enhancement: on hover, highlight the path from a source system to foundation domain to platform product to analytics outcome.

## Foundation cards

- Cards are valuable when collapsed: title, executive summary, badges, primary path link.
- Expanded panel reveals typical scope, primary benefits, initial use cases, and future use cases.
- Streaming card includes Redox Engine partner badge.
- Core System Data card links directly to Post-Acquisition Data Integration Hub.

## Use-case library

- Filter chips support foundation and outcome filters.
- Cards open a right-side detail panel with prerequisites, benefits, complexity, and partners/tools.
- Suggested production enhancement: add URL route support, e.g. `/use-cases/post-acquisition-data-integration-hub`.

## Featured use-case demo

- The current demo shell is a placeholder for a real demo, Sigma embed, or secure video.
- Demo tabs align to the story: Acquire, Quality, Standardize, Certify, Analyze.
- Demo should be accessible from the hero CTA, Core System Data card, and Use Case Library.

## Responsive behavior

- Desktop: architecture board uses side-by-side source, platform, product, and outcome lanes.
- Tablet: lanes stack while preserving story order.
- Mobile: all components are single-column; header nav wraps.

## Accessibility

- Buttons have explicit actions and labels.
- Details panel closes by button, backdrop, and Escape key.
- Reduced-motion users should not receive animated transitions.
- Production build should include focus traps for side panel and QA with keyboard-only navigation.

## Production details to add

- Replace local logo treatments with brand-approved SVGs.
- Add secure client access if microsite is externally hosted.
- Add analytics event tracking for use-case filters, card expansions, demo tab changes, and CTA clicks.
- Add CMS or JSON-driven content management for component and use-case updates.
- Add Parkview-specific baseline values once validated.
