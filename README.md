# RosterEase Website

Standalone Astro microsite for RosterEase, served from `https://rosterease.app`.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static build outputs to `dist/` and is deployed to GitHub Pages by `.github/workflows/gh-pages.yml`.

## Product screenshots

Launch imagery in `src/assets/rosterease/screenshots/launch/` mirrors the native iPhone and iPad captures from the RosterEase app repository under `metadata/marketing/screenshots/2026-07-launch-readiness/`. Update the app captures first, then copy the approved files here; Astro generates the responsive AVIF derivatives at build time.

The deferred hero walkthroughs in `public/media/` are compressed edits of the current iPad field-worker and iPhone shift-worker usage recordings from the app repository. Keep WebM and MP4 versions for both devices, retain the still-image fallbacks, and recheck the shared pause control, reduced-motion preference, Save-Data/2G handling, and low-memory fallback whenever either recording is replaced.

## Accessibility

The site targets WCAG 2.2 AA across System, Light, and Dark themes. Run `npm run check:a11y` to build the site and verify page landmarks, image alternatives, skip links, theme contrast tokens, focus styling, reduced motion, enhanced contrast, and forced-colour support.

## Embed Image

`src/assets/rosterease/og-image.png` is the canonical 1200x630 social/embed image for the site. Keep Open Graph and Twitter metadata pointed at this shared asset through `src/layouts/RosterEaseLayout.astro` so every page embeds with the same RosterEase screenshot-wall card.
