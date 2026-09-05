# RosterEase Website

Static Astro site for [rosterease.app](https://rosterease.app), using local assets, system fonts and vanilla CSS. Motion provides lightweight browser animation; there is no client framework, analytics or font CDN.

## Develop and verify

Requires Node 22.12 or newer.

```sh
npm install
npm run dev
npm run check:a11y
npm run preview
```

`check:a11y` builds all pages, checks landmarks and image alternatives, validates local links and sitemap coverage, and measures theme-token contrast. It is a static guard, not a complete accessibility audit. Also check keyboard navigation, narrow layouts, both colour themes and reduced motion in a browser.

The build outputs to `dist/`. `.github/workflows/gh-pages.yml` deploys the site when its configured trigger runs. Local changes do not publish it.

## Pages

- `/`: concise introduction, three-step story and on-device positioning.
- `/app`: Shift/Field workflows, boundaries, Free/Plus and beta status.
- `/on-device`: local processing and optional data-sharing destinations.
- `/help`: setup, Smart Import, Calendar/privacy and backup/restore guides.
- `/contact`, `/privacy`, `/terms`: support, policy and Apple standard EULA information.

Keep `public/sitemap.xml` in sync with public routes. Canonical metadata always uses the configured production origin, including in local previews.

## Design and assets

[Design decisions and sources](docs/design/quiet-morning.md) describe the approved Concept B implementation, Apple artwork, motion and content boundaries. [Release checks](docs/website-release-readiness.md) separate website validation from App Store submission.

The existing `rosterease-app-icon.svg` remains the brand asset. The shared social image remains `og-image.png`.

Current screenshot sources are copied without alteration from the app's 5 September 2026 populated design review into `src/assets/rosterease/screenshots/review-2026-09-05/`. They show development builds with synthetic data; check them against the intended release before publication. Astro produces responsive WebP files at build time. Screenshot previews zoom from the selected image into a native dialog and load a sharper WebP after opening. The visible preview stays in place until it is ready.

The hero and walkthrough use a shared layered 3D enclosure in DeviceBody.astro, with no hardware controls or logo. The hero also includes stepped platforms. `PhoneScreenshot.astro` on the product page places real screenshots under the official iPhone 17 bezel. The measured screen aperture is 1206 × 2622 at (72, 69) in a 1350 × 2760 frame. Do not stretch screenshots from another device into this geometry. The artwork's licence is retained in `docs/design/`.

Earlier screenshot sets and recordings remain available as historical assets. The current pages do not load the recordings. Do not reintroduce them without checking their build provenance and motion controls.

## Motion and themes

`src/styles/rosterease.css` owns all tokens and styling. System appearance is the default; Light/Dark/System choices in the footer persist locally. The pre-paint theme script prevents an appearance flash.

`src/scripts/site-motion.ts` uses Motion for entrances, gestures and screenshot transitions. Desktop homepage scenes load Three.js on demand: licensed iPhone models in the hero and lightweight procedural phones in the walkthrough. Below 1121px, static previews avoid loading the 3D runtime. Rendering stops when idle; reduced motion bypasses rotation. Official Apple artwork stays stationary. See [current 3D implementation and frame analysis](docs/design/three-motion.md) for model provenance, size budgets and browser evidence.
