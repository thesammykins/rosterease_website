export const REST_ROTATION = -0.08;

// Deliberate travel and release speed are both required; ordinary hover cannot trigger it.
export function flickRotation(velocity: number, travel: number): number | null {
  if (!Number.isFinite(velocity) || !Number.isFinite(travel)) return null;
  if (Math.abs(velocity) < 4.2 || Math.abs(travel) < 0.22) return null;
  return REST_ROTATION + Math.sign(velocity) * Math.PI * 2;
}
