import type { ImageMetadata } from "astro";
import iphone17 from "../assets/rosterease/devices/iphone-17-black.png";
import ipad from "../assets/rosterease/devices/ipad-pro-m5-13-space-black.png";
import duoOuter from "../assets/rosterease/devices/iphone-duo-night-sky-outer.png";
import duoInner from "../assets/rosterease/devices/iphone-duo-night-sky-inner-landscape.png";
import iphone17Mask from "../assets/rosterease/devices/iphone-17-screen-mask.png";
import ipadMask from "../assets/rosterease/devices/ipad-pro-m5-13-screen-mask.png";
import duoOuterMask from "../assets/rosterease/devices/iphone-duo-outer-screen-mask.png";
import duoInnerMask from "../assets/rosterease/devices/iphone-duo-inner-screen-mask.png";

export interface Device {
  frame: ImageMetadata;
  // The transparent screen opening in the official artwork, in frame pixels.
  screen: { x: number; y: number; width: number; height: number };
  // Apple's screen shape, so the screenshot never shows past the bezel
  // (scripts/build-screen-masks.mjs derives the iPhone and iPad masks).
  mask?: ImageMetadata;
}

// Official Apple product bezels, unmodified (docs/design/quiet-morning.md).
// Captures match each opening pixel for pixel.
export const devices = {
  iphone17: { frame: iphone17, screen: { x: 72, y: 69, width: 1206, height: 2622 }, mask: iphone17Mask },
  ipad: { frame: ipad, screen: { x: 118, y: 124, width: 2064, height: 2752 }, mask: ipadMask },
  duoOuter: {
    frame: duoOuter,
    screen: { x: 88, y: 80, width: 1398, height: 2034 },
    mask: duoOuterMask,
  },
  duoInner: {
    frame: duoInner,
    screen: { x: 120, y: 120, width: 2853, height: 2007 },
    mask: duoInnerMask,
  },
} satisfies Record<string, Device>;

export type DeviceName = keyof typeof devices;
