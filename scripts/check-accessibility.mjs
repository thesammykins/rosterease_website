import { readFile } from "node:fs/promises";

const pages = ["dist/index.html", "dist/contact/index.html", "dist/privacy/index.html"];
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
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
}

for (const page of pages) {
  const html = await readFile(page, "utf8");
  check(/<html\b[^>]*\blang="en-AU"/.test(html), `${page}: missing page language`);
  check(count(html, /<h1\b/g) === 1, `${page}: expected exactly one h1`);
  check(/href="#content"/.test(html) && /id="content"/.test(html), `${page}: missing skip-link target`);
  check(!/href="#"/.test(html), `${page}: contains an empty link target`);
  check(count(html, /<button\b[^>]*\bdata-theme-toggle(?:\s|>)/g) === 1, `${page}: expected one light/dark theme toggle`);
  check(!/data-theme-select/.test(html), `${page}: legacy theme dropdown is still present`);

  for (const image of html.match(/<img\b[^>]*>/g) ?? []) {
    check(/\balt(?:=|\s|>)/.test(image), `${page}: image is missing alt text`);
  }
}

const home = await readFile("dist/index.html", "utf8");
const layout = await readFile("src/layouts/RosterEaseLayout.astro", "utf8");
check(count(home, /<[^>]+\bdata-screenshot-group(?:\s|>)/g) === 4, "Homepage: expected four screenshot groups");
check(count(home, /<button\b[^>]*\bdata-screenshot-toggle(?:\s|>)/g) === 4, "Homepage: expected one appearance toggle per screenshot group");
check(count(home, /data-screenshot-variant="light"/g) === 7, "Homepage: expected seven light screenshots");
check(count(home, /data-screenshot-variant="dark"/g) === 7, "Homepage: expected seven dark screenshots");
check(count(home, /<video\b[^>]*\bdata-hero-video=(?:"ipad"|"iphone")/g) === 2, "Homepage: expected iPad and iPhone hero demos");
check(count(home, /<video\b[^>]*\bpreload="none"/g) === 2, "Homepage: hero demos must not preload on constrained connections");
check(count(home, /<source\b[^>]*\bdata-src="\/media\/rosterease-(?:ipad|iphone)-demo\.(?:webm|mp4)"/g) === 4, "Homepage: expected deferred WebM and MP4 sources for both demos");
check(/data-demo-toggle/.test(home), "Homepage: moving demo needs a pause control");
check(/prefers-reduced-motion: reduce/.test(layout) && /saveData/.test(layout) && /effectiveType/.test(layout), "Homepage: demo must preserve reduced-motion and constrained-network fallbacks");
check(/Nothing in this notice excludes rights that cannot be excluded/.test(home), "Homepage: beta notice must preserve non-excludable rights");
check(!/re-toggle-track/.test(home), "Homepage: appearance controls should be plain buttons");

const css = await readFile(cssPath, "utf8");
for (const feature of [":focus-visible", "prefers-reduced-motion: reduce", "prefers-color-scheme: dark", "prefers-contrast: more", "forced-colors: active"]) {
  check(css.includes(feature), `${cssPath}: missing ${feature}`);
}

const themes = [
  ["light", block(css, ":root")],
  ["dark", block(css, ':root[data-theme="dark"]')],
];

for (const [name, source] of themes) {
  const paper = token(source, "--paper");
  for (const textToken of ["--ink", "--muted", "--faint", "--blue"]) {
    const ratio = contrast(token(source, textToken), paper);
    check(ratio >= 4.5, `${name} ${textToken} contrast is ${ratio.toFixed(2)}:1`);
  }

  const buttonRatio = contrast("#ffffff", token(source, "--blue-fill"));
  check(buttonRatio >= 4.5, `${name} primary button contrast is ${buttonRatio.toFixed(2)}:1`);
  check(contrast(token(source, "--control-line"), paper) >= 3, `${name} control boundary contrast is below 3:1`);
  check(contrast(token(source, "--focus"), paper) >= 3, `${name} focus contrast is below 3:1`);
}

console.log("Accessibility static checks passed for light and dark themes.");
