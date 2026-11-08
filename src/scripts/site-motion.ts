import { animate } from "motion/mini";
import { hover, press, spring } from "motion";

export function initSiteMotion() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) return;
  const listeners = new AbortController();
  const animations = new Map<
    Parameters<typeof animate>[0],
    ReturnType<typeof animate>
  >();
  const touched = new Set<Element>();
  const cleanups: (() => void)[] = [];
  const play: typeof animate = (...args) => {
    const animation = animate(...args);
    animations.set(args[0], animation);
    if (args[0] instanceof Element) touched.add(args[0]);
    animation.then(() => {
      if (animations.get(args[0]) === animation) animations.delete(args[0]);
    });
    return animation;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        target.classList.add("is-in-view");
        target
          .querySelectorAll<HTMLElement>(
            ".re-privacy-symbol, .re-guide-link, .re-action-panel",
          )
          .forEach((element, index) => {
            play(
              element,
              {
                transform: ["translateY(16px)", "translateY(0)"],
                opacity: [0.65, 1],
              },
              { duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] },
            );
          });
      });
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll(
      "[data-motion-sequence], .re-page-intro, .re-subpage-hero, .re-guide-list, .re-contact-grid, .re-feature, .re-feature-pair",
    )
    .forEach((element) => observer.observe(element));

  cleanups.push(
    hover(".re-guide-link, .re-ipad-previews a", (element) => {
      play(
        element,
        { transform: "translateY(-3px)" },
        { type: spring, duration: 0.35, bounce: 0 },
      );
      return () => {
        play(
          element,
          { transform: "translateY(0)" },
          { type: spring, duration: 0.4, bounce: 0 },
        );
      };
    }),
  );
  cleanups.push(
    press(".re-button, .re-dialog-close", (element) => {
      play(element, { transform: "scale(.97)" }, { duration: 0.12 });
      return () => {
        play(
          element,
          { transform: "scale(1)" },
          { type: spring, duration: 0.3, bounce: 0.05 },
        );
      };
    }),
  );
  document
    .querySelectorAll<HTMLDetailsElement>(".re-appearance, .re-mobile-menu")
    .forEach((details) => {
      details.addEventListener(
        "toggle",
        () => {
          const panel = details.querySelector("fieldset, nav");
          if (details.open && panel)
            play(
              panel,
              {
                opacity: [0, 1],
                transform: ["translateY(5px)", "translateY(0)"],
              },
              { duration: 0.18, ease: "easeOut" },
            );
        },
        { signal: listeners.signal },
      );
    });

  reduced.addEventListener(
    "change",
    (event) => {
      if (!event.matches) return;
      observer.disconnect();
      listeners.abort();
      animations.forEach((animation) => animation.complete());
      cleanups.forEach((cleanup) => cleanup());
      touched.forEach((element) => {
        if (element instanceof HTMLElement || element instanceof SVGElement) {
          element.style.removeProperty("transform");
          element.style.removeProperty("opacity");
        }
      });
    },
    { once: true },
  );
}
