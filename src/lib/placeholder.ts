import type { ImageMetadata } from "astro";
import sharp from "sharp";

const cache = new Map<string, Promise<string>>();

// A ~20px blurred copy of a screenshot, inlined as the image's background so a
// frame never shows an empty screen while the real image loads.
export function placeholder(image: ImageMetadata): Promise<string> {
  const path = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!path) return Promise.resolve("none");
  let result = cache.get(path);
  if (!result) {
    result = sharp(path)
      .resize(20)
      .webp({ quality: 50 })
      .toBuffer()
      .then((data) => `url(data:image/webp;base64,${data.toString("base64")})`);
    cache.set(path, result);
  }
  return result;
}
