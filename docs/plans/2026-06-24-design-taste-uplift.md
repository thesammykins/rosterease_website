# RosterEase Design Taste Uplift Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make the RosterEase landing page more visually appealing and more effective as marketing while preserving clear explanation of the app across desktop, tablet, and mobile.

**Architecture:** Keep the Astro one-page structure, but replace weak decorative animation with an intentional product story: messy source → shaped plan → private day. Use existing app screenshots, lightweight CSS/SVG motion, and current theme tokens. Do not add new heavy dependencies or invent unsupported product claims.

**Tech Stack:** Astro 6, `astro:assets`, CSS in `src/styles/rosterease.css`, existing `lottie-web` lazy loader, static GitHub Pages deployment.

---

## Design Direction

The page should feel like **Apple-like product clarity + calm productivity software + privacy-first trust**. Avoid generic SaaS sludge: no fake metrics, no loud gradients, no ornamental blobs, no extra icon grids unless they clarify the product.

Core visual story:

```text
messy roster source → RosterEase shapes it → clear day plan + calendar/widgets/privacy
```

Responsive rule: every redesigned section must work intentionally at desktop, tablet, and mobile. Tablet is not just squeezed desktop.

---

## Task 1: Replace the weak Workday Journey animation with a composed transformation scene

**Objective:** Replace the current Lottie/callout-heavy journey stage with a tasteful product-story module that shows source inputs becoming a clear plan.

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/rosterease.css`

**Implementation notes:**
- In the `re-journey-stage` markup, remove or visually retire the current `re-workday-journey-lottie` and floating `re-journey-callouts` treatment.
- Build a new semantic/decorative stage using existing screenshot assets:
  - left: source stack cards labelled visually as Screenshot, PDF, Pasted roster, Client list
  - center: processing spine with Import, Shape, Protect
  - right: final outcome card anchored by the existing `shiftTodayShot` screenshot and small output chips: Today, Calendar, Widget, Privacy lock
- Decorative pieces should be `aria-hidden="true"`; informative text remains in the adjacent copy block.
- Motion should be CSS-only, short, and scroll-triggered by existing `.is-in-view`; no new dependency.
- Respect `prefers-reduced-motion`.

**Acceptance criteria:**
- The section no longer looks like random floating Lottie art.
- It visually communicates transformation at a glance.
- Desktop: balanced two-column composition.
- Tablet: scene stacks or compresses without overlap.
- Mobile: stage becomes a readable vertical before/after scene, no horizontal overflow.
- `npm run build` succeeds.

---

## Task 2: Simplify the hero into a stronger product-led marketing moment

**Objective:** Make the hero less dense and more visually compelling by moving mode-detail weight lower and making the product visual express input → app output.

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/rosterease.css`

**Implementation notes:**
- Keep the current H1 and primary CTA.
- Reduce hero mode cards so they do not compete with the headline. Options:
  - convert `re-mode-tabs` into smaller concise audience chips/cards, or
  - move detailed bullet content into the product/mode showcase area and leave hero with compact “For shift workers / For field workers” proof chips.
- Improve `re-launch-hero__media` with tasteful source/output supporting cards using existing screenshots:
  - input mini cards near the phone: “Roster screenshot”, “PDF”, “Pasted shift list”
  - output chip: “Today plan ready” / “Calendar + widgets optional”
- Keep the visual conservative and premium.

**Acceptance criteria:**
- Hero communicates promise within 5 seconds.
- Header, hero CTA, and theme switch still fit desktop/tablet/mobile.
- No content is lost; detailed audience/function explanation remains elsewhere on page.
- `npm run build` succeeds.

---

## Task 3: Redesign the mode/showcase area into a guided product demo

**Objective:** Make “Choose your way of working” feel like a premium guided demo rather than a generic carousel with too many controls.

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/rosterease.css`
- Modify script in `src/pages/index.astro` only if needed.

**Implementation notes:**
- Keep existing accessible tab model and carousel state logic if possible.
- Improve visual hierarchy:
  - Tabs: “Shift Worker” and “Field Worker” should look like meaningful product modes.
  - Step controls should read as a guided list/timeline, not decorative dots.
  - Main screenshot should dominate; copy panel should support it.
- Consider reducing visual prominence of arrow/dot controls while keeping accessible buttons.
- Strengthen the narrative per step: Today, Calendar, Workplaces/Clients, Privacy/Defaults.
- Ensure hidden duplicated controls do not create Playwright selector pitfalls in testing; scoped selectors are acceptable.

**Acceptance criteria:**
- User can understand the product surfaces quickly.
- Controls are obvious and touch-friendly.
- Works on desktop/tablet/mobile.
- Existing keyboard interaction still works.
- `npm run build` succeeds.

---

## Task 4: Consolidate copy rhythm and add a calm privacy/CTA polish pass

**Objective:** Reduce repetition and improve marketing rhythm without removing useful product information.

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/rosterease.css`

**Implementation notes:**
- Review these sections for repetition: capability strip, motion section, product section, beta, support.
- Do not delete major sections blindly, but make the flow feel intentional:
  1. Hero
  2. How it works / transformation
  3. Guided mode demo
  4. Privacy/local-first reassurance
  5. TestFlight CTA
  6. Support/feedback
- Add a small privacy reassurance band or improve existing privacy/product section with concrete bullets:
  - Local notes by default
  - Calendar notes generic unless chosen
  - Maps estimates opt-in
  - Redacted examples for feedback
- Refresh TestFlight card copy to feel like an invitation: “Help shape RosterEase before 1.0.”
- No fake stats or unsupported App Store claims.

**Acceptance criteria:**
- Page feels less repetitive and more confident.
- Privacy value is clearer without legal heaviness.
- TestFlight CTA is stronger.
- `npm run build` succeeds.

---

## Task 5: Final integration and dogfood gate

**Objective:** Verify the integrated design across desktop, tablet, and mobile before commit/push.

**Files:**
- No intended edits unless fixing integration issues.

**Verification commands:**
- `npm run build`
- Start local preview: `npm run preview -- --host 127.0.0.1 --port 4321`
- Capture Playwright screenshots at:
  - desktop: 1440x1200
  - tablet: 820x1180
  - mobile: 390x844
- Check console errors.
- Exercise:
  - theme toggle
  - Shift/Field tab switch
  - showcase next/step controls scoped to active panel
  - header TestFlight CTA presence
- Run Lighthouse local preview.

**Acceptance criteria:**
- No build failure.
- No console errors.
- No horizontal overflow.
- Lighthouse accessibility remains 100 or no material regressions.
- Visual review finds no launch blockers.

---

## Task 6: Commit, push, monitor deploy, verify live

**Objective:** Deliver changes to GitHub Pages and verify live rendered DOM.

**Commands:**
- `git diff --stat`
- `git diff --check`
- `git add src/pages/index.astro src/styles/rosterease.css docs/plans/2026-06-24-design-taste-uplift.md`
- `git commit -m "Polish RosterEase product story"`
- `git push origin main`
- `gh run list --workflow "Deploy to GitHub Pages" --branch main --limit 5`
- `gh run watch <run-id> --exit-status`
- Live verification with cache-busting query tied to commit SHA.

**Acceptance criteria:**
- GitHub Actions deploy succeeds.
- `https://rosterease.app` shows the new product-story design.
- Live console is clean.
