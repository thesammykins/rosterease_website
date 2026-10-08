# Website release readiness

Updated 9 October 2026 (Australia/Melbourne). RosterEase is available on the App Store at the URL supplied by the owner. The App Store is the primary download destination. Optional TestFlight signup lives on `/beta/`.

## Public destinations

| Purpose | URL | Prepared behavior |
| --- | --- | --- |
| Marketing | `https://rosterease.app/` | App Store download badge, Shift/Field walkthrough |
| Download | `https://apps.apple.com/us/app/rosterease/id6762237930` | Shared destination for all App Store links |
| Beta access | `https://rosterease.app/beta/` | TestFlight invitation, backup and feedback guidance |
| Support | `https://rosterease.app/contact/` | Email, reporting details, help links |
| Privacy | `https://rosterease.app/privacy/` | App Store and optional TestFlight distribution wording |
| Terms | `https://rosterease.app/terms/` | Apple standard EULA and subscription management |
| Product | `https://rosterease.app/app/` | Workflows, Free/Plus, download and beta-page link |
| Data handling | `https://rosterease.app/on-device/` | On-device processing and optional sharing |
| Help | `https://rosterease.app/help/` | Four guides; setup now starts with the App Store |

## Launch pass

- All download links use the supplied App Store URL. Apple artwork is unmodified, served locally, proportionate, stationary and surrounded by clear space. Each page has one badge. See [asset provenance](design/app-store-badge.md).
- Removed pre-launch availability copy from the homepage, footer, product, setup guide and privacy/terms distribution wording. Beta participation remains optional.
- Beta access is linked from every footer and the mobile menu, plus the product page. The small-screen menu retains an App Store download link when the header CTA is hidden.
- `/beta/` is included in the sitemap and has production canonical, Open Graph and social metadata. Homepage application structured data includes the App Store installation destination; indexed pages also advertise the app ID to Safari's native Smart App Banner.
- Existing support, privacy, EULA, subscription management, encrypted-backup guidance and branded noindex 404 recovery remain available.
- `npm run check:a11y` checks 14 generated HTML pages, internal routes/anchors/assets, sitemap/canonicals, language, H1, skip links, image alternatives, theme contrast, download destinations and beta-link isolation. It now checks released availability instead of prohibiting the App Store badge.
- `npm run check:motion` checks the existing hero rotation behavior. The deferred 3D bundle remains within its existing budget; Vite's bundle-size advisory is unchanged.

## Local browser verification

Browser plugin not available; regular Playwright used the installed Chromium against `http://localhost:4321/`. The tested flow is homepage → App Store download destination, and mobile Menu → Beta access → TestFlight invitation destination.

Public routes were checked at widths 320, 390, 768 and 1280px for page identity, meaningful content, loaded badge artwork, horizontal overflow, framework overlays, runtime/console errors and failed local asset responses. Additional checks cover Shift/Field selection, screenshot dialog open/Escape close, Light/Dark switching, beta invitation links and HTTP 404 recovery. Screenshots are kept outside source in `/tmp/rosterease-launch-*.png` and `/tmp/rosterease-beta-*.png`.

## Deployment and remaining verification

The Pages workflow builds and checks the site before publishing on a push to `main`. This work is prepared for review in a separate branch; no production deployment is performed as part of this pass.

After deployment:

- Open the App Store and TestFlight invitation on physical iPhone/iPad, confirming install availability and the linked build. Automated web retrieval could not load either Apple destination in this session; local checks prove the configured URLs, not installation availability.
- Check Safari touch scrolling, screenshot previews, worker selection, theme persistence and reduced motion.
- Confirm support email delivery separately. A working `mailto:` link does not prove delivery.
- Recheck live sitemap/canonical URLs, support/privacy/terms and the nonexistent-path recovery page on the production domain.

Screenshot provenance remains in `src/assets/rosterease/screenshots/capture-2026-10-01/capture-manifest.json`. October development captures and September import captures use fictional data; this website pass does not compare every capture with the installed App Store binary. App Store Connect metadata and subscription prices are outside the website change. Earlier performance and browser samples remain in [the 1 October review](performance/2026-10-01/review.md).
