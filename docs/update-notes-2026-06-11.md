# Parkview Microsite Updates - Content Review + Provider Demo Integration

## Applied content review updates

- Header CTA changed from **Featured demo** to **Featured Use Case**.
- Hero eyebrow changed to **Onsite Data Workshop**.
- Removed the **Private onsite concept** status pill from the hero.
- Hero lede updated to: "Turning Parkview's enterprise data into governed insight, predictive intelligence, and AI-enabled workflow through a modern Databricks-centered platform."
- Hero CTA changed from **Open acquisition demo** to **View Acquisition Use Case**.
- Platform map headline changed to: "A platform-centric architecture accelerates innovation while strengthening enterprise-wide data & AI governance."
- Removed the platform-map intro sentence that read as build guidance.
- Updated source/domain/capability icons for Connected / IoT Devices, Streaming Data, Reusable AI Features, and Innovation at Scale.
- Removed the **Redox Engine relevant** note from the platform map Streaming Data domain.
- Removed **Master** from the core Databricks platform domain chip list.
- Closing section aligned to the top header framing.
- Replaced the acquisition-hub bottom benefit wording with moderate, directional estimate ranges to calibrate in the workshop.
- Updated the use-case side-panel label from **Benefits to validate** to **Expected benefits**.

## New Databricks App Demos section

Added a new section titled **Databricks App Demos** with a sticky-nav quick jump and header button.

Only Provider demos from the supplied healthcare AI microsite were integrated:

1. Ambient Clinical Documentation
2. Clinical Coding & CDI Copilot
3. Prior Authorization Automation
4. Denial Management & Appeals
5. Patient Access & Referral Leakage
6. Hospital Operations Command Center
7. Multi-Site Eye-Care Performance Analytics

## Integrated files

- Provider demo screenshots copied to `assets/demos/shots/`.
- Provider static demo bundles copied to `demos/<demo-slug>/`.
- Demo `index.html` files were patched from root-absolute references to relative asset references so they are portable inside this microsite package.

## Production notes

- The demo section currently embeds the static prototype bundles in an iframe modal.
- Each demo card also includes a **New tab** link for full-screen review.
- The demo content is framed as conceptual/illustrative and should be calibrated with Parkview-specific priorities during the onsite.
- Approved logo files should still be used before any client-facing deployment if brand review requires exact vendor/client assets.
