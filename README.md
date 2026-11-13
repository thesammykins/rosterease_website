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

The app icon matches the current app branding source. The shared `og-image.png` is rendered from [self-contained campaign artwork](docs/design/social-preview.html), using the app's Libre Baskerville, Inter, cream and blue/green orbs with genuine Calendar and Visits captures. It replaces the old Today link card. [Export provenance](docs/design/social-preview-provenance.json) records its inputs and hash. The site's main stylesheet still uses its existing system-serif stack; the campaign artwork embeds the app font rather than claiming those stacks match.

Screens use unaltered native captures with synthetic fixtures. The local 12 November refresh replaces Shifts Today on iPhone 17 and both Duo displays, plus the help images for travel, roster changes, absence and Calendar Sync, in light and dark. These were captured against app sources at `28b65585` (capture-recipe commit `bf04010`), not an attested release binary. The other images retain their earlier provenance after the UI audit. [Website capture provenance](src/assets/rosterease/screenshots/capture-2026-11-07/capture-manifest.json) and [help capture provenance](src/assets/rosterease/screenshots/help-2026-11-07/capture-manifest.json) record each image's revision, fixture, dimensions and hash. Astro produces responsive WebP files at build time. Screenshot previews zoom from the selected image into a native dialog and load a sharper WebP after opening. The visible preview stays in place until it is ready.

Sammy approved the coordinated 1.1 website launch on [13 November 2026](https://ampcode.com/threads/T-01a1bdd5-f840-7150-a262-fcbe949823dc#M-034wadF18rYGCHMeleEvTk), superseding the earlier branch hold. Merge `help-1.1` into `main` for the normal Pages deployment and coordinate readiness with the App Store release. App Store listing artwork remains owned by the listing thread; its uploaded close-up header/search assets take precedence over the legacy local header layouts.

Every screenshot sits under an official Apple bezel through `DeviceFrame.astro`: iPhone 17 Black, iPad Pro (M5) 13" Space Black, and iPhone Duo Night Sky outer and inner. `src/lib/devices.ts` holds each screen opening, which matches the captures pixel for pixel; each screen is masked to its opening in Apple's artwork (`scripts/build-screen-masks.mjs`), so no screenshot shows past a bezel. The hero shows the same upright frames until its desktop 3D model loads. Do not stretch screenshots from another device into a frame. The artwork's licence is retained in `docs/design/`.

### Narrated help guides

All 16 help articles include task walkthroughs from the [21-guide review catalogue](https://ampcode.com/artifacts/rosterease-narrated-support-guide-library-d445fea6-caa4-4198-9681-1ebf37426a63). The catalogue retains capture receipts, production packs and the accepted scripts. New footage was recorded against app `origin/main` at [28b65585](https://github.com/thesammykins/rosterease/commit/28b655854e31f4493848411e2777dc5e3ecf589a); the accepted absence and visit-note guides are unchanged.

`src/assets/rosterease/support-guides/catalogue.json` maps each task to its article and records the SHA-256 of the reviewed MP4, captions, poster and transcript. MP4s and WebVTT captions live in `public/media/help/narrated/<id>/`; source posters and verbatim transcripts live beside the catalogue. Only website delivery assets are included, not production archives or voice stems. Astro optimises the posters to WebP at build time.

`NarratedGuide.astro` uses native, keyboard-accessible controls, English captions and an expandable transcript. Playback waits for the viewer, with no autoplay, muting, looping or video preloading; starting another guide pauses the first. Videos already contain their approved layout, tap indicators, AI-generated Marin/Cedar speech and Sammy's quiet Ease Loop music, so do not add a hardware frame or overlay. The AI-voice disclosure is beside the players. Written instructions and screenshots remain available without watching a video.

These are scoped demonstrations, not a spoken replacement for each article. Siri, location review and Live Activities show setup, not a Siri invocation, physical arrival or Lock Screen output. Imports demonstrate pasted-text review and apply using deterministic DEBUG parse fixtures, not OCR or AI accuracy. The client-import warning is intentional; fix broad addresses before relying on travel times. The reports guide shows zero reports, not sharing. Other cases, including real-device authentication, remain in the written articles.

`check:a11y` also checks article coverage, controls, captions, transcripts and reviewed-asset hashes. Before changing an export, review the complete video and update its captions, transcript, poster and catalogue hashes together. Browser-check playback, caption loading, transcript keyboard access, multiple-player behaviour, narrow layouts, themes and reduced motion. Earlier silent recordings in `public/media/help/` and their provenance remain historical assets; no current page loads them.

The narrated integration is included in the approved coordinated 1.1 launch. The Pages workflow deploys on `main` or manual dispatch, not a push to `help-1.1`; use the normal `main` push rather than a separate manual deployment.

The shared App Store link lives in `src/lib/rosterease.ts`. Apple's unmodified black download badge is served locally; [badge provenance and display rules](docs/design/app-store-badge.md) document its source. TestFlight signup lives only on `/beta/`.

## Motion and themes

`src/styles/rosterease.css` owns all tokens and styling. System appearance is the default; Light/Dark/System choices in the footer persist locally. The pre-paint theme script prevents an appearance flash.

`src/scripts/site-motion.ts` uses Motion for entrances, gestures and screenshot transitions. The desktop hero loads licensed iPhone models after its screenshots have decoded. Walkthrough previews remain static. Viewports below 1121px, coarse pointers, reduced motion, and connections reporting data saving or 3G avoid the 3D download. Rendering stops when idle, offscreen, or hidden. Hover settling uses elapsed time across display refresh rates. Official Apple artwork stays stationary. See [model provenance and earlier frame analysis](docs/design/three-motion.md), and [current performance and UX review](docs/performance/2026-10-01/review.md).
