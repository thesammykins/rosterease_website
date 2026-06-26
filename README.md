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

## Embed Image

`src/assets/rosterease/og-image.png` is the canonical 1200x630 social/embed image for the site. Keep Open Graph and Twitter metadata pointed at this shared asset through `src/layouts/RosterEaseLayout.astro` so every page embeds with the same RosterEase screenshot-wall card.
