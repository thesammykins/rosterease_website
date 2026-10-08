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
- `/help`: setup, Smart Import, Calendar/privacy and backup/restore guides.
- `/contact`, `/privacy`, `/terms`: support, policy and Apple standard EULA information.

Keep `public/sitemap.xml` in sync with public routes. Page links, canonical metadata, and sitemap entries use trailing slashes to avoid GitHub Pages redirects. Canonical metadata always uses the configured production origin, including in local previews. The branded `404.html` recovery page is excluded from indexing and the sitemap. Main navigation and walkthrough links prefetch on hover or touch through Astro.

## Design and assets

[Design decisions and sources](docs/design/quiet-morning.md) describe the approved Concept B implementation, Apple artwork, motion and content boundaries. [Release checks](docs/website-release-readiness.md) separate website validation from App Store submission.

The app icon matches the current app branding source. The shared `og-image.png` is rendered from [brand-authored artwork](docs/design/social-preview.html), using the existing website fonts/tokens and genuine app captures. [Export provenance](docs/design/social-preview-provenance.json) records its inputs and hash.

Today, Calendar and Clients use unaltered native captures from the current app source on 1 October 2026. iPad Today and Calendar have light/dark pairs. [Capture provenance](src/assets/rosterease/screenshots/capture-2026-10-01/capture-manifest.json) records the app revision, synthetic fixtures, dimensions and hashes. Import-review examples retain the genuine 5 September captures. These are development simulator captures, not proof of the publicly linked TestFlight binary. Astro produces responsive WebP files at build time. Screenshot previews zoom from the selected image into a native dialog and load a sharper WebP after opening. The visible preview stays in place until it is ready.

The hero uses a layered enclosure in `DeviceBody.astro` before its desktop 3D enhancement loads. Walkthrough screenshots use upright, flat frames for readability. `PhoneScreenshot.astro` on the product page places real screenshots under the official iPhone 17 bezel. The measured screen aperture is 1206 × 2622 at (72, 69) in a 1350 × 2760 frame. Do not stretch screenshots from another device into this geometry. The artwork's licence is retained in `docs/design/`.

Earlier screenshot sets and recordings remain available as historical assets. The current pages do not load the recordings. Do not reintroduce them without checking their build provenance and motion controls.

The shared App Store link lives in `src/lib/rosterease.ts`. Apple's unmodified black download badge is served locally; [badge provenance and display rules](docs/design/app-store-badge.md) document its source. TestFlight signup lives only on `/beta/`.

## Motion and themes

`src/styles/rosterease.css` owns all tokens and styling. System appearance is the default; Light/Dark/System choices in the footer persist locally. The pre-paint theme script prevents an appearance flash.

`src/scripts/site-motion.ts` uses Motion for entrances, gestures and screenshot transitions. The desktop hero loads licensed iPhone models after its screenshots have decoded. Walkthrough previews remain static. Viewports below 1121px, coarse pointers, reduced motion, and connections reporting data saving or 3G avoid the 3D download. Rendering stops when idle, offscreen, or hidden. Hover settling uses elapsed time across display refresh rates. Official Apple artwork stays stationary. See [model provenance and earlier frame analysis](docs/design/three-motion.md), and [current performance and UX review](docs/performance/2026-10-01/review.md).
