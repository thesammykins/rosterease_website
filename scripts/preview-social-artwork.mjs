import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

// Serve only the artwork's inputs; repository files are not exposed by this preview.
const files = new Map([
  ["/", ["docs/design/social-preview.html", "text/html"]],
  ["/styles.css", ["src/styles/rosterease.css", "text/css"]],
  ["/icon.svg", ["src/assets/rosterease/rosterease-app-icon.svg", "image/svg+xml"]],
  ...["shift-today-dark", "field-today-dark"].map((name) => [
    `/screens/${name}.png`,
    [`src/assets/rosterease/screenshots/capture-2026-10-01/${name}.png`, "image/png"],
  ]),
]);

createServer(async (request, response) => {
  const file = files.get(new URL(request.url, "http://127.0.0.1:4323").pathname);
  if (!file) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const bytes = await readFile(file[0]);
    response.writeHead(200, { "Content-Type": file[1], "Cache-Control": "no-store" }).end(bytes);
  } catch (error) {
    console.error(error);
    response.writeHead(500).end("Artwork input could not be read");
  }
}).listen(4323, "127.0.0.1", () => {
  console.log("Social artwork preview: http://127.0.0.1:4323/");
});
