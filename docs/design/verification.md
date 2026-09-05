# Website verification — 5 September 2026

## Concept B comparison

Compared the accepted Quiet Morning image with a full-page browser capture using image inspection.

| Area | Result |
| --- | --- |
| Typography | Editorial serif headline and headings; system sans body text preserve the reference hierarchy. |
| Palette | Warm paper, forest text, mint actions and sage stage retained; dark theme added. |
| Hero | Asymmetric copy/product composition retained. Real icon retained. Generic CSS frames add depth to the hero; official static artwork remains on the product page. |
| Headline | The owner rejected the conceptual headline. “Plan your shifts. Organise your visits.” now states the two product jobs. |
| Story | Three compact columns and one shared worker selector replace the space-heavy rows after owner feedback. |
| Closing | On-device privacy explanation replaces generic promotion, with detail on a supporting page. |
| Controls | Compact appearance icon reveals named native radio choices. Internal arrows, external destinations and screenshot affordances are differentiated. |

## Checks

- `npm run check:a11y`: production build and static checks pass for all 11 routes, including local links, anchors, image assets, sitemap, canonical URLs, headings, labels and light/dark text contrast.
- `git diff --check`: passes. Reviewed tracked changes with `hunk diff --exclude-untracked`; source and new files reviewed separately.
- Browser reviewed at 1280, 768, 390 and 320px widths. Homepage reflows without horizontal overflow at these widths.
- Browser checked homepage, import guide, support and privacy policy; on-device page and appearance panel checked at mobile width.
- Appearance: Light/Dark selection, persistence across navigation, labelled disclosure, Escape dismissal and mobile panel placement checked. Outside-click dismissal implemented. No dependencies added.
- Keyboard skip link reaches the main content; mobile navigation opens and dismisses with Escape.
- Official device artwork is static. Editorial motion plays once and has a reduced-motion override; OS-level reduced-motion emulation was not performed.

These are focused checks, not a full WCAG certification or App Store approval. Public deployment, App Store Connect configuration and final release screenshots remain separate release gates. See `../website-release-readiness.md`.

## File audit

- Shared shell/theme/navigation: `src/layouts/RosterEaseLayout.astro`, `src/styles/rosterease.css`.
- Pages: redesigned `index.astro` and `contact.astro`; added `app.astro`, `on-device.astro`, `terms.astro`, `help/index.astro`, `help/[slug].astro` and `src/lib/guides.ts`. Approved `privacy.astro` policy source unchanged.
- Images: added `PhoneScreenshot.astro`, official bezel under `src/assets/rosterease/devices/`, and five real review captures under `src/assets/rosterease/screenshots/review-2026-09-05/`. Removed unused screenshot appearance components.
- Site metadata/verification: `src/lib/rosterease.ts`, `public/sitemap.xml`, `scripts/check-accessibility.mjs`.
- Documentation: `README.md`, `docs/design/quiet-morning.md`, Apple resource licence, this report, and `docs/website-release-readiness.md`.
- Pre-existing `.live-classes.txt`, `AGENTS.md` and `src/styles/rosterease.css.original` preserved. No commit or deployment made.

## Annotation follow-up

- Removed the full-screen text banners. Screenshot links now open a native dialog, with keyboard focus on Close and Escape returning focus to the correct preview.
- Replaced role-note cards and repeated selectors with one shared Shift/Field segmented control. Browser read-back confirmed all three selected panels update together.
- Replaced the blank-looking unframed hero panels with generic dimensional CSS frames and a restrained single-play entrance.
- Added 180/220ms dialog transitions. Keep the cached preview until the sharper image decodes, so opening does not wait on a download.
- Verified 320px reflow without horizontal overflow. Reviewed compact controls at 390px, product page at 768px and complete homepage at 1280px.
- All 11 routes pass the production build and static accessibility/link/asset/sitemap checks. Native dialog behaviour and worker switching were exercised in the local browser. Reduced-motion CSS guards are present; system-level emulation was not performed.
- New files for this pass: `src/components/AppScreenshot.astro`, `src/components/ScreenshotViewer.astro`, `src/lib/screenshots.ts`, two additional Field captures, `docs/design/deslop-report.md`, and `docs/design/help-source-audit.md`. Existing shell, stylesheet, homepage, product/support/on-device/help copy, guides, screenshot component and checker were updated. Privacy and Terms source remained unchanged.

Matching light/dark screenshot capture is coordinated with the app-review task. Screenshot source availability must be recorded before claiming every view follows the selected appearance.
