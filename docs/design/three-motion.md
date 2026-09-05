# Three.js hero and motion review — 5 September 2026

Current implementation supersedes the CSS depth experiments in refinement.md. No deployment or commit was made.

## Model and delivery

The desktop hero uses the **iPhone 17 Pro Max by MajdyModels**, a third-party fan-made model under CC BY 4.0, obtained from [Phone Mockup Studio](https://github.com/quentin-pla/phone-mockup-studio/blob/main/CREDITS.md). Original [Sketchfab source](https://sketchfab.com/3d-models/iphone-17-pro-max-87fc1df741384124a8ce0226d2b2058d). Public attribution and modifications are disclosed at `/credits`, linked from every footer. This is not official Apple artwork.

Original GLB: 4,140,064 bytes. Optimised GLB: 677,624 bytes. One asset is loaded and cloned for two phones. Actual app captures replace the screen material; the hardware includes rear cameras, side controls and casing. Silver material treatment coordinates with the site. Quantisation uses built-in glTF support, with no remote decoder or texture CDN.

Reproduce optimisation with glTF Transform 4.5.0:

```sh
gltf-transform optimize iphone-17-pro-max-original.glb public/models/iphone-17-pro-max.glb --compress quantize --flatten false --join false --palette false --texture-size 512
```

Three.js was selected for one controlled scene containing two phones, stands, shadows and pointer interaction. A full model-viewer widget per phone would add independent cameras and controls we do not need. See [Three.js demand rendering](https://threejs.org/manual/en/rendering-on-demand.html) and [model-viewer loading options](https://modelviewer.dev/examples/loading/).

Desktop starts loading the scene during idle time. Walkthrough canvases load near the viewport. Below 1121px the static presentation avoids the Three.js import and model request. Rendering stops after settling and while outside the viewport; pixel ratio is capped at 1.5. Reduced motion disables rotation and full turns. There is no continuously running idle animation.

Hero phones never open the screenshot viewer. Small pointer movements tilt them; a deliberate quick drag triggers one turn in that direction. Native image dragging is disabled in markup, CSS and the hero drag handler. Stand colours use the site's background token, with rounded geometry and restrained contact shadows.

## Frame analysis

Evidence is from the running local site at 1440 × 1000. These are real sequential browser screenshots with host elapsed-time labels, not generated concepts. Sampling intervals vary; this is visual continuity evidence, **not a frame-rate benchmark**. JPEG frames, manifest and contact sheets are in `motion/`. Rebuild sheets with `python3 scripts/build-motion-contact-sheets.py docs/design/motion` (Pillow required).

| Sequence | Observation and action |
| --- | --- |
| [iPhone spin](motion/iphone-spin-contact.png) | Front, side controls, rear cameras, opposite edge and return remain on the stand without viewport clipping. The second phone remains planted. The first render exposed a single-sided display material; corrected to match the model's double-sided mesh before capture. |
| [Worker switch before correction](motion/worker-crossfade-contact.png) | Existing DOM ghost covered the new 3D crossfade, briefly washing out the phones. |
| [Worker switch after correction](motion/worker-crossfade-fixed-contact.png) | DOM ghost is skipped once a 3D scene is ready; only screen textures blend. Caption minimum height was unified to prevent uneven preview alignment. |
| [Viewer opening](motion/screenshot-open-contact.png) / [closing](motion/screenshot-close-contact.png) | Expansion, backdrop and return are sampled; no blank full-screen flash. The transition origin is the underlying DOM image rectangle, an approximation of the projected 3D display. |
| [Page navigation](motion/page-navigation-contact.png) | The capture API's navigation wait missed the short cross-document transition, so this does not prove its intermediate frames. It did expose late loading of the first `/app` image; that image now loads eagerly. |
| [Mobile](motion/mobile.png) | 390px viewport: simple static phones, no horizontal overflow, zero canvases; both hero images have `draggable="false"`. |

## Verification and limits

`npm run check:a11y`, `npm run check:motion`, and TypeScript no-emit checking pass. Static checks cover 12 routes, links, assets, sitemap, and token contrast. The three flick tests cover slow/small drags, both full-turn directions and invalid measurements. Browser capture proves the deliberate flick actually exposes the rear hardware.

Measured final gzip: core JS 9,058 bytes, deferred 3D JS 167,837 bytes; build guard budgets are 20 KiB and 180 KiB respectively. Inline scripts and images are excluded from those figures. No claim is made about low-end physical-device FPS or every browser's native page transition support.

## Files touched in this slice

- `src/scripts/hero-scene.ts`, `hero-rotation.ts`, `site-motion.ts`: scenes, demand rendering, flick behaviour and transition coordination.
- `src/pages/index.astro`, `src/components/AppScreenshot.astro`, `DeviceBody.astro`: desktop enhancement, static fallback and hero drag protection.
- `src/styles/rosterease.css`: canvas integration, simpler narrow presentation, stand cleanup and caption alignment.
- `public/models/iphone-17-pro-max.glb`, `src/pages/credits.astro`, `src/layouts/RosterEaseLayout.astro`, `public/sitemap.xml`: licensed model and public attribution.
- `src/pages/app.astro`: eagerly load the first product screenshot.
- `package.json`, `package-lock.json`, `scripts/check-accessibility.mjs`, `scripts/hero-rotation.test.mjs`: dependencies, budgets and regression checks.
- `README.md`, this report, `motion/`, `scripts/build-motion-contact-sheets.py`: current implementation notes and reproducible evidence.

Earlier redesign changes remain uncommitted. Existing `.live-classes.txt`, `AGENTS.md` and `src/styles/rosterease.css.original` were preserved.

Final audit: `hunk diff --exclude-untracked --pager` and `git diff --check` ran. New source files and model metadata were also inspected directly.
