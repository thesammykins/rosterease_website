# Quiet Morning — website design

Approved direction: Concept B, 5 September 2026. The source concept is `/Users/samanthamyers/.codex/generated_images/01a06f0e-49c3-7df1-9567-f96394ef6bc6/exec-7d570202-3896-4e9e-a94f-29472d124b5c.png` (a local design reference, not a runtime dependency).

## Visual system

Warm off-white, forest text, mint actions, a sage product stage, editorial serif headings and restrained rules. System serif/sans stacks avoid a font download. The existing app icon replaces the generated placeholder mark. A compact three-column walkthrough uses one shared Shift/Field selector after the owner rejected the space used by repeated full-width rows. Detailed workflows and help live on separate pages.

Both themes use the `--re-*` tokens. General radii follow the established scale. `--re-device-radius` is a geometry exception for the measured screenshot aperture, not a component-design radius.

Intentional changes from the concept: real screenshot content; existing branding; generic dimensional frames in the hero and straight-on official phones on the product page; more precise product copy; a dedicated on-device explanation; support and legal navigation; responsive and appearance controls. No generated app UI, fake reviews or performance promises are used.

## Device frames: research and decision

- [Apple marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/#section-products) direct marketing to official bezels, unmodified, and prohibit tilting, animating, obscuring or simulating Apple product images.
- [Apple Design Resources](https://developer.apple.com/design/resources/#product-bezels) supplies the iPhone 17 PNG. Download: `https://devimages-cdn.apple.com/design/resources/download/Bezel-iPhone-17.dmg`. The user explicitly authorised acceptance of the included licence on 5 September 2026. Its text is retained beside this document.
- [Marvel devices.css](https://github.com/marvelapp/devices.css) and [Devices.css](https://github.com/picturepan2/devices.css) demonstrate lightweight CSS framing. They were considered but not adopted: official artwork is a better fit for this marketing use.
- A WebGL model adds downloads and rendering work while recreating hardware unnecessarily. The site uses a responsive transparent bezel overlay with a real image beneath, no device library.

The source frame is retained byte-for-byte. Astro encodes proportionally resized WebP delivery variants. The screen aperture is 1206 × 2622 at (72, 69) within a 1350 × 2760 image. Both source captures have matching dimensions. Device images remain upright, complete and stationary, with no added shadow or reflection. Unframed app screenshot excerpts in editorial rows are separate from Apple hardware artwork.

## HIG and web accessibility

[Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion) supports brief, purposeful, optional movement. [HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) and [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) inform hierarchy, legibility and familiar controls; this is a website, so semantic HTML and browser conventions remain primary.

The generic CSS-framed hero screens and editorial panels settle once as each section enters view. The generic frame has depth but no physical controls or logo; it is not an Apple product rendering. Screenshot dialogs also transition opacity and scale on entry and exit. Motion now provides bounded scroll-linked hero drift, pointer response and shared interaction feedback. There are no idle animation loops. See [MDN animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance). Reduced motion turns animations and smooth scrolling off. Content never waits for animation to become readable.

Navigation and primary actions have 44px targets. A single labelled appearance icon opens native radio choices, with visible focus and selected states. Escape and outside clicks dismiss the disclosure. The native mobile disclosure works without JavaScript, with Escape dismissal added. Text and focus contrast are measured by the static checker. Browser review must still cover touch/reflow and keyboard behaviour.

## Claim boundaries

Verified against current app sources and the authorised app-review handoff:

- `Sources/Services/RosterImportService.swift`: Apple Vision text recognition and local extraction/parsing; no cloud AI processing in the import flow.
- `Sources/Services/FeatureAccessPolicy.swift`: one full Shift workplace free; Plus increases workplace capacity. Existing access and restoration have separate policy decisions.
- `Sources/Services/BackupService.swift` and Settings export call: passphrase-protected encrypted user-initiated exports; restore replaces local data after review/confirmation.
- Release TECH and review README: optional Maps/address estimates, Calendar/private-note choices, development screenshots and unshipped-source boundaries.

Do not generalise on-device import into “no third-party services” or “nothing ever leaves the device.” Optional Maps, Calendar providers, backup destinations, support, StoreKit and TestFlight need explicit treatment. Do not promise arbitrary-format imports, automatic route optimisation, team management or a clinical record system.

The [OAIC security guide](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/handling-personal-information/guide-to-securing-personal-information) and [health privacy guidance](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/health-service-providers/guide-to-health-privacy/chapter-3-using-or-disclosing-health-information) cover responsibilities broader than local storage. The website makes no HIPAA, healthcare, Privacy Act or workplace-approval certification claim. It explains local processing, optional sharing and organisational-policy considerations instead.

## Screenshot interaction review

One shared native Shift/Field radio group controls the three previews through CSS. Previews open a native modal dialog instead of navigating to an image. Escape, the close button and the backdrop dismiss it; focus returns to the triggering link. The modal retains the preview until a larger WebP has decoded. A failed full-image request logs the error and keeps the preview. The image remains present during the closing transition.

`AppScreenshot.astro` uses a native picture source for system appearance and adjusts its media condition for explicit Light or Dark choices. Source captures must be matched pairs with documented provenance; do not recolour screenshots or claim unmatched states are a pair.
