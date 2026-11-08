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

The build outputs to `dist/`. `.github/workflows/gh-pages.yml` runs `check:a11y` and `check:motion` before uploading the Pages artifact and deploying when its configured trigger runs. Local changes do not publish it.

## Pages

- `/`: concise introduction, three-step story and on-device positioning.
- `/app`: Shift/Field workflows, boundaries, Free/Plus and App Store download.
- `/beta`: optional TestFlight signup and feedback guidance.
- `/on-device`: local processing and optional data-sharing destinations.
- `/help`: one guide per `HelpArticle` slug in the app (`Sources/Shared/HelpArticleLink.swift`), from `src/lib/guides.ts`. The app links to these by slug, so keep every slug.
- `/contact`, `/privacy`, `/terms`: support, policy and Apple standard EULA information.

Keep `public/sitemap.xml` in sync with public routes. Page links, canonical metadata, and sitemap entries use trailing slashes to avoid GitHub Pages redirects. Canonical metadata always uses the configured production origin, including in local previews. The branded `404.html` recovery page is excluded from indexing and the sitemap. Main navigation and walkthrough links prefetch on hover or touch through Astro.

## Design and assets

[Design decisions and sources](docs/design/quiet-morning.md) describe the approved Concept B implementation, Apple artwork, motion and content boundaries. [Release checks](docs/website-release-readiness.md) separate website validation from App Store submission.

The app icon matches the current app branding source. The shared `og-image.png` is rendered from [brand-authored artwork](docs/design/social-preview.html), using the existing website fonts/tokens and genuine app captures. [Export provenance](docs/design/social-preview-provenance.json) records its inputs and hash.

Screens use unaltered native captures of the 1.1 release source taken on 7 November 2026 with `rosterease capture website` from the app repository: iPhone 17, iPad and iPhone Duo, each in light and dark, with synthetic fixtures. [Website capture provenance](src/assets/rosterease/screenshots/capture-2026-11-07/capture-manifest.json) and [help capture provenance](src/assets/rosterease/screenshots/help-2026-11-07/capture-manifest.json) record the app revision, fixtures, dimensions and hashes. Help guides show these screenshots, and four silent recordings in `public/media/help/` (posters and hashes in `help-2026-11-07/recordings/`). They are development simulator captures, not proof of the TestFlight or App Store binary. Astro produces responsive WebP files at build time. Screenshot previews zoom from the selected image into a native dialog and load a sharper WebP after opening. The visible preview stays in place until it is ready.

Every screenshot and help recording sits under an official Apple bezel through `DeviceFrame.astro`: iPhone 17 Black, iPad Pro (M5) 13" Space Black, and iPhone Duo Night Sky outer and inner. `src/lib/devices.ts` holds each screen opening, which matches the captures pixel for pixel; each screen is masked to its opening in Apple's artwork (`scripts/build-screen-masks.mjs`), so no screenshot shows past a bezel. The hero shows the same upright frames until its desktop 3D model loads. Do not stretch screenshots from another device into a frame. The artwork's licence is retained in `docs/design/`.

Earlier screenshot sets and recordings remain available as historical assets. The current pages do not load the recordings. Do not reintroduce them without checking their build provenance and motion controls.

The shared App Store link lives in `src/lib/rosterease.ts`. Apple's unmodified black download badge is served locally; [badge provenance and display rules](docs/design/app-store-badge.md) document its source. TestFlight signup lives only on `/beta/`.

## Motion and themes

`src/styles/rosterease.css` owns all tokens and styling. System appearance is the default; Light/Dark/System choices in the footer persist locally. The pre-paint theme script prevents an appearance flash.

`src/scripts/site-motion.ts` uses Motion for entrances, gestures and screenshot transitions. The desktop hero loads licensed iPhone models after its screenshots have decoded. Walkthrough previews remain static. Viewports below 1121px, coarse pointers, reduced motion, and connections reporting data saving or 3G avoid the 3D download. Rendering stops when idle, offscreen, or hidden. Hover settling uses elapsed time across display refresh rates. Official Apple artwork stays stationary. See [model provenance and earlier frame analysis](docs/design/three-motion.md), and [current performance and UX review](docs/performance/2026-10-01/review.md).
