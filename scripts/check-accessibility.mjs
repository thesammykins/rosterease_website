import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? htmlFiles(join(directory, entry.name))
        : entry.name.endsWith(".html")
          ? [join(directory, entry.name)]
          : [],
    ),
  );
  return nested.flat();
}
const pages = await htmlFiles("dist");
const cssPath = "src/styles/rosterease.css";

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function count(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function block(source, selector) {
  const start = source.indexOf(selector);
  check(start >= 0, `Missing CSS block: ${selector}`);
  const openingBrace = source.indexOf("{", start);
  let depth = 0;

  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] !== "}") continue;
    depth -= 1;
    if (depth === 0) return source.slice(openingBrace + 1, index);
  }

  throw new Error(`Unclosed CSS block: ${selector}`);
}

function token(source, name) {
  const match = source.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  check(match, `Missing hexadecimal token: ${name}`);
  return match[1];
}

function luminance(hex) {
  const channels = [1, 3, 5].map(
    (index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255,
  );
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

for (const page of pages) {
  const html = await readFile(page, "utf8");
  check(
    /<html\b[^>]*\blang="en-AU"/.test(html),
    `${page}: missing page language`,
  );
  check(count(html, /<h1\b/g) === 1, `${page}: expected exactly one h1`);
  check(
    /href="#content"/.test(html) && /id="content"/.test(html),
    `${page}: missing skip-link target`,
  );
  check(!/href="#"/.test(html), `${page}: contains an empty link target`);
  check(
    count(html, /<input\b[^>]*name="theme"/g) === 3,
    `${page}: expected Light, Dark and System controls`,
  );
  check(
    /<details class="re-appearance">\s*<summary[^>]*aria-label="Choose appearance"/.test(
      html,
    ),
    `${page}: missing labelled appearance disclosure`,
  );

  for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
    check(/\balt(?:=|\s|>)/.test(image), `${page}: image is missing alt text`);
  }
}

const home = await readFile("dist/index.html", "utf8");
check(
  !/<video\b|<canvas\b/.test(home),
  "Homepage should not download a video or WebGL runtime",
);
check(
  !/Download on the App Store/.test(home),
  "Do not advertise App Store availability before launch",
);
check(
  /Plan your shifts/.test(home) && /Organise your visits/.test(home),
  "Missing product-specific headline",
);

check(
  count(home, /<input\b[^>]*name="worker"/g) === 2,
  "The showcase needs two shared worker choices",
);
check(
  count(home, /data-worker-panel=/g) === 6,
  "Each worker choice needs a screenshot panel",
);
check(
  /<dialog[^>]*aria-label="App screenshot"/.test(home),
  "Missing labelled screenshot dialog",
);
check(!/re-screen-detail__hint/.test(home), "Remove the screenshot banner");
check(
  !/<a[^>]*class="re-hero-screen/.test(home),
  "Hero phones must stay in place, not open the screenshot viewer",
);

const routes = new Map();
for (const page of pages) {
  const route =
    "/" +
    page
      .replace(/^dist\//, "")
      .replace(/index\.html$/, "")
      .replace(/\/$/, "");
  routes.set(route, await readFile(page, "utf8"));
}
const sitemap = await readFile("public/sitemap.xml", "utf8");
for (const [route, html] of routes) {
  check(
    sitemap.includes(`https://rosterease.app${route}</loc>`),
    `Sitemap missing ${route}`,
  );
  check(
    html.includes(`rel="canonical" href="https://rosterease.app${route}"`),
    `Wrong canonical for ${route}`,
  );
  for (const match of html.matchAll(/(?:href|src)="([^" ]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    if (!value.startsWith("/") && !value.startsWith("#")) continue;
    const url = new URL(value, `https://rosterease.app${route}`);
    const targetRoute = url.pathname.replace(/\/$/, "") || "/";
    if (routes.has(targetRoute)) {
      if (url.hash)
        check(
          routes
            .get(targetRoute)
            .includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${route}: broken anchor ${value}`,
        );
    } else {
      const file = resolve("dist", "." + url.pathname);
      check(
        file.startsWith(resolve("dist") + "/"),
        "Asset escaped output directory",
      );
      check(
        (await stat(file).catch(() => null))?.isFile(),
        `${route}: missing asset ${value}`,
      );
    }
  }
}

const css = await readFile(cssPath, "utf8");
check(
  block(css, ".re-phone .re-phone-frame").includes("pointer-events: none"),
  "Device artwork must not block interaction",
);
for (const feature of [
  ":focus-visible",
  "prefers-reduced-motion: reduce",
  "prefers-color-scheme: dark",
  "prefers-contrast: more",
  "forced-colors: active",
]) {
  check(css.includes(feature), `${cssPath}: missing ${feature}`);
}

const themes = [
  ["light", block(css, ":root")],
  ["dark", block(css, ':root[data-theme="dark"]')],
];

for (const [name, source] of themes) {
  for (const background of ["--re-bg", "--re-bg-soft", "--re-surface"]) {
    for (const foreground of [
      "--re-text",
      "--re-muted",
      "--re-soft",
      "--re-accent",
      "--re-shift",
    ]) {
      const ratio = contrast(
        token(source, foreground),
        token(source, background),
      );
      check(
        ratio >= 4.5,
        `${name} ${foreground} on ${background}: ${ratio.toFixed(2)}:1`,
      );
    }
  }
  check(
    contrast(
      token(source, "--re-on-accent"),
      token(source, "--re-accent-soft"),
    ) >= 4.5,
    `${name} button text contrast`,
  );
  check(
    contrast(token(source, "--re-focus-ring"), token(source, "--re-bg")) >= 3,
    `${name} focus contrast`,
  );
}
const light = themes[0][1];
for (const foreground of ["--re-footer-text", "--re-footer-muted"]) {
  check(
    contrast(token(light, foreground), token(light, "--re-footer")) >= 4.5,
    `${foreground}: footer contrast`,
  );
}
check(!/animation:[^;]*infinite/.test(css), "Motion must not loop");
check(
  block(css, "@media (prefers-reduced-motion: reduce)").includes(
    "animation: none",
  ),
  "Reduced motion must disable animations",
);
console.log(
  `Static accessibility, local links, assets and sitemap checks passed for ${pages.length} pages. Light/dark text and control contrast passed.`,
);

const scripts = (await readdir("dist/_astro")).filter((name) =>
  name.endsWith(".js"),
);
const sizes = await Promise.all(
  scripts.map(async (name) => ({
    name,
    bytes: gzipSync(await readFile(join("dist/_astro", name))).length,
  })),
);
const coreBytes = sizes
  .filter(({ name }) => !name.startsWith("hero-scene."))
  .reduce((sum, { bytes }) => sum + bytes, 0);
const sceneBytes = sizes
  .filter(({ name }) => name.startsWith("hero-scene."))
  .reduce((sum, { bytes }) => sum + bytes, 0);
check(coreBytes <= 20 * 1024, "Core JavaScript exceeds the 20 KiB gzip budget");
check(
  sceneBytes <= 180 * 1024,
  "Deferred 3D hero exceeds the 180 KiB gzip budget",
);
console.log(
  "JavaScript gzip: core " +
    coreBytes +
    " bytes; deferred homepage 3D " +
    sceneBytes +
    " bytes (excludes inline scripts).",
);
