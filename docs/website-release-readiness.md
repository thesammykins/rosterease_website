# Website and App Store review readiness

This is a website handoff, not App Store approval. Source baseline includes upstream `d7efdec` (approved launch privacy/Plus copy); redesign changes are local on `codex/quiet-morning-redesign`.

## Public destinations

| Purpose | URL | Local state |
| --- | --- | --- |
| Marketing | `https://rosterease.app/` | Redesigned |
| Support URL | `https://rosterease.app/contact` | Direct email, useful reporting details, help links |
| Privacy Policy URL | `https://rosterease.app/privacy` | Existing approved policy retained, redesigned layout |
| EULA explanation | `https://rosterease.app/terms` | Links Apple standard EULA and subscription management |
| Product details | `https://rosterease.app/app` | Role workflows, Free/Plus, limits and beta status |
| Data handling | `https://rosterease.app/on-device` | On-device processing and explicit sharing boundaries |
| Help | `https://rosterease.app/help` | Four complete guides |

The app-review task confirmed on 5 September that the **public** privacy page already contains the required encrypted-export/provider/restore wording. Do not carry the former missing-backup-copy blocker forward. Publication of App Privacy inside App Store Connect is a separate gate.

## Before publication/submission

- Review screenshot provenance against the build being promoted. Current website images show the 5 September development review, not proof of the publicly linked binary. Replace the Shift Today capture when a clean no-tutorial capture is available; do not edit away application UI.
- Refresh the TestFlight public-link availability and build. Current website CTA deliberately says TestFlight, not App Store download. The app-review task previously reported Website Testers build 83 and latest internal build 92; those are dated observations, not fresh website validation.
- Confirm final subscription merchandising, eligibility and storefront prices in the app. The site avoids hardcoded price/trial claims and deferred Lifetime offers.
- Verify deployed support/privacy URLs return usable pages without authentication; verify email ownership/delivery separately. The local preview does not prove live email delivery.
- Ensure the app and App Store metadata link the public privacy page and chosen EULA as required. The site cannot update the binary or App Store Connect linkage.
- Complete App Store Connect App Privacy publication, account agreements and candidate-build linkage. The app-review task reported an expired attached build; no ASC actions are part of this website work.
- After deployment, recheck canonical metadata, all sitemap URLs, primary CTA and both themes on the actual domain.

Sources: [Apple App Review](https://developer.apple.com/app-store/review/), [Review Guidelines](https://developer.apple.com/app-store/review/guidelines/), [Apple standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).

## Validation

`npm run check:a11y` builds every public page and checks language, one H1, skip link, image alternatives, all internal page/anchor/asset destinations, sitemap/canonical coverage, theme contrast and motion guards. Browser evidence and performance measurements are recorded in `docs/design/verification.md`.

No deployment, push, commit, App Store mutation or claim of healthcare certification is implied by a passing website check.
