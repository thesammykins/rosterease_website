import test from "node:test";
import assert from "node:assert/strict";
import { flickRotation, REST_ROTATION } from "../src/scripts/hero-rotation.ts";

test("small movement and slow drags do not trigger a spin", () => {
  assert.equal(flickRotation(10, 0.1), null);
  assert.equal(flickRotation(2, 0.8), null);
  assert.equal(flickRotation(0, 0), null);
});
test("deliberate flicks make one complete turn in the release direction", () => {
  assert.equal(flickRotation(5, 0.4), REST_ROTATION + Math.PI * 2);
  assert.equal(flickRotation(-5, -0.4), REST_ROTATION - Math.PI * 2);
});
test("invalid pointer measurements cannot trigger a spin", () => {
  assert.equal(flickRotation(Infinity, 0.5), null);
  assert.equal(flickRotation(5, NaN), null);
});
