> Current hero implementation and motion findings: [Three.js review](three-motion.md). The CSS depth experiments below are historical.

# Motion refinement — 5 September 2026

The approved Quiet Morning direction remains intact. This pass uses Motion 13.2.0 for responsive interaction, with native HTML controls and locally served real app screenshots.

## Concept and implementation proof

- [Before](refinement/before.png): actual local homepage.
- [Imagegen refinement](refinement/concept.png): generated direction, not a working interface.
- [Implemented](refinement/implemented.png): actual local homepage at 1440px.

| Element | Implemented result | Intentional difference from concept |
| --- | --- | --- |
| Hero | Open studio lighting and a shallow base plane | Generic device bodies retain real screenshots; no simulated Apple hardware controls |
| Device depth | Perspective entrance, fine-pointer response and bounded scroll drift | Live movement cannot be proven by a still image |
| Walkthrough | Three compact columns with one shared worker selector | Native radios preserve keyboard and no-JavaScript operation |
| Privacy | Lock mark and compact on-device explanation | Claims remain limited to verified processing and sharing behaviour |
| Typography | Forest serif headings, clear product headline | Browser text wraps responsively rather than matching generated pixels |
| Controls | Spring press feedback, brief disclosure and modal transitions | Reduced motion bypasses animation |

The concept is directional, not a pixel-match target. It was generated in built-in imagegen mode from `/tmp/rosterease-refinement-before.png`; the retained output is `refinement/concept.png`. The brief asked for a final ten-percent refinement of the current site, preserving the exact headline, brand, real UI, one worker selector and factual claims; improving narrow frame depth, studio lighting, compact cards and the privacy panel; and avoiding fabricated features, statistics, badges, neon and excessive decoration. The initial brief proposed lightweight transforms; the subsequent user instruction led to Motion as the animation engine.

## Motion coverage

`src/scripts/site-motion.ts` owns page introductions, guide-card feedback, CTA presses, appearance/mobile disclosures, worker preview transitions, hero entrance, pointer depth and scroll drift. `ScreenshotViewer.astro` uses the same mini animation engine for spring opening and brief closing. Legal copy remains calm; motion applies to its introduction rather than every paragraph.

[Motion mini](https://motion.dev/docs/animate), [scroll](https://motion.dev/docs/scroll), [hover](https://motion.dev/docs/hover) and [press](https://motion.dev/docs/press) were checked before adoption. Mini uses browser animation primitives. Scroll can use native ScrollTimeline where available. No continuously running idle animation loop is added. Pointer updates are frame-throttled and limited to fine pointers. Reduced-motion preference changes stop site animations; initially reduced motion bypasses setup. Reload to re-enable after changing the preference back.

Official Apple artwork on the product page stays stationary, following [Apple marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/#section-products). The moving homepage frames are generic.

## Validation

- Production build: 11 routes; static accessibility, local-link, asset, sitemap and theme contrast checks passed.
- TypeScript `tsc --noEmit`: passed.
- Emitted JavaScript: **13,634 bytes gzip** across shared bundles, excluding inline scripts. Automated ceiling: 20,480 bytes. This is an asset-size check, not a measured loading-speed or frame-rate result.
- Browser: all three worker panels selected Field together; modal reached opacity 1; Escape closed it and restored focus to the triggering screenshot link.
- Browser: iPad Today and Calendar resolved to light assets in light appearance and dark assets in dark appearance.
- Browser: homepage document width matched viewport at 320px and 390px; no horizontal overflow. Desktop proof retained above.
- Hero entrance produced changing 3D transform matrices in the rendered browser. Reduced-motion guards were inspected; OS-level reduced-motion emulation and production performance profiling were not performed.

npm audit reports seven pre-existing dependency advisories, including six high severity. All affected package versions match the baseline lockfile; none belongs to Motion. No unrelated dependency upgrade was applied. These remain release maintenance work.

## Screenshot limits

The two iPad Field pairs are actual development captures with fictional data. Phone screenshots remain dark-only pending matching captures. New iPad import captures and corrected Shift captures are being reviewed by the app task; they have not been stretched into phone frames or represented as the TestFlight release.

## Files touched in this refinement

- `package.json`, `package-lock.json`: pinned Motion dependency.
- `src/scripts/site-motion.ts`, `src/layouts/RosterEaseLayout.astro`, `src/components/ScreenshotViewer.astro`: shared motion and modal behaviour.
- `src/styles/rosterease.css`, `src/pages/index.astro`: hero material, compact privacy composition and removal of obsolete keyframes.
- `src/pages/app.astro`, `src/lib/screenshots.ts`, screenshot assets: actual iPad appearance pairs.
- `scripts/check-accessibility.mjs`: emitted JavaScript budget.
- `README.md`, design documentation and retained proof images: implementation and evidence.

The broader uncommitted redesign also includes the new help, on-device, terms and product pages, screenshot components, sitemap and source audits. Pre-existing `.live-classes.txt`, `AGENTS.md` and `rosterease.css.original` remain untouched. No commit or deployment was made.

## Follow-up: depth and transition correction

The user rejected the first refinement as too flat and the navigation as abrupt. The earlier proof above is historical, not final acceptance.

- [Updated desktop](refinement/depth-desktop.png)
- [At the concept's 954px width](refinement/depth-concept-width.png)
- [320px mobile](refinement/depth-mobile.png)

The hero now has two stepped platforms with separate top and front surfaces. A shared DeviceBody component gives the hero and all six worker previews sixteen enclosure cross-sections, a front rim and visible side depth. These are layered DOM geometry animated with Motion, not a WebGL model or official Apple hardware rendering. The real app images remain unchanged.

Screenshot opening now travels from the selected image to the dialog, fading the backdrop over 440ms. Closing travels back over 300ms and can interrupt an opening without first snapping to the final size. Worker selection retains the outgoing image during a 320ms crossfade. Browser inspection observed all three temporary outgoing layers during transition and zero afterward; Escape during opening closed the dialog and restored trigger focus.

Same-origin pages opt into native cross-document view transitions over 320ms. Removed separate heading entrances to avoid stacked arrival effects. Browsers without this API use normal navigation. Reduced motion disables the page transition and bypasses Motion. See [MDN cross-document transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using). Navigation between home and the import guide was exercised locally; browser tooling did not expose the native animation timeline, so frame pacing is not claimed.

Mobile inspection found platform overflow and the bounds were corrected. Final document widths equal the viewport at both 390px and 320px. Production checks pass for 11 pages; emitted JS is 13,923 bytes gzip. No additional dependencies were introduced in this correction. Visual motion is verified through local interaction and transient DOM state; static checks alone cannot prove perceived smoothness.

Files changed in this follow-up: src/components/DeviceBody.astro (new), src/components/ScreenshotViewer.astro, src/scripts/site-motion.ts, src/pages/index.astro, src/styles/rosterease.css, this evidence document, README.md and the three depth proof images. No product or legal copy changed.
