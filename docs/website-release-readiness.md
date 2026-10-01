# Website and App Store review readiness

The performance, UX and launch-asset pass is prepared on `codex/performance-layout-pass`, based on `4b965c2`. The release pull request records the published commit, Pages workflow and hosted checks. TestFlight remains the primary action until the app is live. Website checks do not establish App Store approval or candidate-build readiness.

## Public destinations

| Purpose | URL | Local state |
| --- | --- | --- |
| Marketing | `https://rosterease.app/` | TestFlight landing page; responsive image and motion improvements |
| Support URL | `https://rosterease.app/contact/` | Direct email, useful reporting details, help links |
| Privacy Policy URL | `https://rosterease.app/privacy/` | Existing approved policy retained, redesigned layout |
| EULA explanation | `https://rosterease.app/terms/` | Links Apple standard EULA and subscription management |
| Product details | `https://rosterease.app/app/` | Role workflows, Free/Plus, limits and beta status |
| Data handling | `https://rosterease.app/on-device/` | On-device processing and explicit sharing boundaries |
| Help | `https://rosterease.app/help/` | Four complete guides |

The app-review task confirmed on 5 September that the **public** privacy page already contains the required encrypted-export/provider/restore wording. Do not carry the former missing-backup-copy blocker forward. Publication of App Privacy inside App Store Connect is a separate gate.

## Before publication/submission

- Compare the website captures with the TestFlight build during device testing. Today, Calendar, Clients and iPad light/dark pairs now show the 1 October development build with synthetic data; the two import-review examples remain from 5 September. Shift Today has no tutorial overlay. Provenance is in `src/assets/rosterease/screenshots/capture-2026-10-01/capture-manifest.json`.
- Social artwork is refreshed with current app-icon artwork, website fonts/tokens and genuine October Today captures. Its HTML source and export provenance are in `docs/design/social-preview*`. Social services may retain their cached previous preview.
- Refresh the TestFlight public-link availability and build. On 1 October the public invitation rendered a “View in TestFlight” link. This does not verify an install or the linked build. The app-review task previously reported Website Testers build 83 and latest internal build 92; those are dated observations, not fresh website validation.
- Confirm final subscription merchandising, eligibility and storefront prices in the app. The site avoids hardcoded price/trial claims and deferred Lifetime offers.
- Verify deployed support/privacy URLs return usable pages without authentication; verify email ownership/delivery separately. The local preview does not prove live email delivery.
- Ensure the app and App Store metadata link the public privacy page and chosen EULA as required. The site cannot update the binary or App Store Connect linkage.
- Complete App Store Connect App Privacy publication, account agreements and candidate-build linkage. The app-review task reported an expired attached build; no ASC actions are part of this website work.
- Exercise the deployed page on physical iPhone and iPad Safari, including touch scrolling, worker selection, enlarged screenshots, appearance, and reduced motion. Local Chromium screenshots and timing samples do not prove those paths.
- After deployment, recheck canonical metadata, all sitemap URLs, the primary CTA, both themes and a nonexistent URL on the actual domain. The custom recovery page should retain HTTP 404 with usable Home, Help and Support links.

Sources: [Apple App Review](https://developer.apple.com/app-store/review/), [Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [Apple standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

## Validation

`npm run check:a11y` builds all 13 HTML pages and checks language, one H1, skip link, image alternatives, internal page/anchor/asset destinations, sitemap/canonical coverage, theme contrast and motion guards. The error page must remain excluded from indexing and the sitemap. The Pages workflow runs this command and `npm run check:motion` before uploading its artifact. Both pass locally; the release pull request records remote CI and hosted checks.

The local recovery page returns HTTP 404 and loads its assets successfully. Its layout reflows at 320, 390, 768 and 1280px. Outside taps now dismiss the mobile menu; Escape still closes it and returns focus. Font and colour-token definitions remain unchanged. Current browser evidence, measurements and remaining limitations are recorded in [the 1 October review](performance/2026-10-01/review.md); earlier design evidence remains in `docs/design/verification.md`.

A passing website check does not establish App Store readiness or healthcare certification. No App Store changes are part of this website task.
