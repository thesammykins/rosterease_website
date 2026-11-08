// Derives each device's screen shape from Apple's bezel artwork: the
// transparent opening connected to the frame's centre, cropped to the
// opening in src/lib/devices.ts and grown 2px so the screenshot reaches
// under the bezel's anti-aliased inner edge.
// Usage: node scripts/build-screen-masks.mjs
import sharp from "sharp";

const dir = new URL("../src/assets/rosterease/devices/", import.meta.url);
const jobs = [
  { frame: "iphone-17-black.png", out: "iphone-17-screen-mask.png", screen: { x: 72, y: 69, width: 1206, height: 2622 } },
  { frame: "ipad-pro-m5-13-space-black.png", out: "ipad-pro-m5-13-screen-mask.png", screen: { x: 118, y: 124, width: 2064, height: 2752 } },
];
const GROW = 2;

for (const { frame, out, screen } of jobs) {
  const { data, info } = await sharp(new URL(frame, dir).pathname)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const open = new Uint8Array(width * height);
  const stack = [(height >> 1) * width + (width >> 1)];
  while (stack.length) {
    const i = stack.pop();
    if (open[i] || data[i * 4 + 3] >= 128) continue;
    open[i] = 1;
    const x = i % width;
    if (x > 0) stack.push(i - 1);
    if (x < width - 1) stack.push(i + 1);
    if (i >= width) stack.push(i - width);
    if (i < width * (height - 1)) stack.push(i + width);
  }
  const mask = Buffer.alloc(screen.width * screen.height * 2);
  for (let y = 0; y < screen.height; y++) {
    for (let x = 0; x < screen.width; x++) {
      let inside = 0;
      for (let dy = -GROW; dy <= GROW && !inside; dy++) {
        for (let dx = -GROW; dx <= GROW && !inside; dx++) {
          const fx = screen.x + x + dx;
          const fy = screen.y + y + dy;
          if (fx >= 0 && fy >= 0 && fx < width && fy < height && open[fy * width + fx]) inside = 1;
        }
      }
      const o = (y * screen.width + x) * 2;
      mask[o] = 255;
      mask[o + 1] = inside ? 255 : 0;
    }
  }
  await sharp(mask, { raw: { width: screen.width, height: screen.height, channels: 2 } })
    .png({ compressionLevel: 9 })
    .toFile(new URL(out, dir).pathname);
  console.log(`${out}: ${screen.width}x${screen.height}`);
}
