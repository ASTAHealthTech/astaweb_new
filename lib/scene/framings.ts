import type { Framing } from "./state";

/**
 * Where the camera stands for each shot.
 *
 * The subject is the model: a lobed structure roughly 6.6 wide, 5.5 tall
 * including the stem, and 5 deep, centred on the origin. Shots run from far
 * outside the scattered field, through assembly, into the structure and out
 * the back of it.
 *
 * World scale is metres. The ward runs along X: six beds, 2.4 m apart, headed
 * against the wall at z = -1. The aisle — and therefore the camera — is at
 * positive z. Bed 04 (index 3, x = +1.2) is the one that drifts, so every
 * close shot is framed on it.
 *
 * `drift` is added across the shot as `progress` runs 0 → 1, so the camera is
 * never completely still even when it is holding a single framing. That is the
 * whole "never blinks" idea, expressed in the camera rig.
 */

export type Shot = {
  /** phone framing: the object high in a tall frame, copy below it */
  phone?: { position: [number, number, number]; target: [number, number, number]; fov: number; yaw?: number };
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  drift: [number, number, number];
  /** Added to the target across the shot, so a pan can track along a row. */
  targetDrift?: [number, number, number];
  /** How fast the camera catches up to this shot. Lower = heavier, slower. */
  ease: number;
  /**
   * Yaw applied AFTER lookAt, in radians. Positive pushes the subject to the
   * right of frame. This is how the ward gets composed into the right half of
   * the hero while the headline holds the left — moving the camera sideways
   * instead would change which beds you can see.
   */
  yaw?: number;
};

export const BED_COUNT = 6;
export const BED_SPACING = 2.4;
export const BED_Z = -1;
/** Monitor glass sits above the head of each bed. */
export const MONITOR_Y = 1.62;
export const MONITOR_Z = -1.95;

/** Bed 04 is the one that deteriorates. One-indexed for the UI, 0-indexed here. */
export const ALERT_BED = 3;

export function bedX(index: number): number {
  return (index - (BED_COUNT - 1) / 2) * BED_SPACING;
}

const AX = bedX(ALERT_BED);

export const SHOTS: Record<Framing, Shot> = {
  /* ── the signal ────────────────────────────────────────────────────────── */

  // The opening frame: over the unit's shoulder, looking at the glass it is
  // reading. Subject held right of frame, headline left.
  hero: {
    phone: { position: [2.2, 1.0, 9.0], target: [2.2, -1.0, 0.5], fov: 50, yaw: 0 },
    position: [1.9, 0.9, 7.2],
    target: [1.55, 0.15, 0.3],
    fov: 38,
    drift: [-0.35, 0.25, 0.4],
    ease: 0.8,
    yaw: 0.14,
  },

  // Pushed in until the glass is the frame. The DOM takes over from here.
  capture: {
    phone: { position: [1.7, 0.4, 5.2], target: [1.7, -0.7, 0], fov: 50, yaw: 0 },
    position: [1.55, 0.35, 2.9],
    target: [1.6, 0.3, 0],
    fov: 36,
    drift: [0, 0, -0.9],
    ease: 0.7,
    yaw: 0,
  },

  // The model, centred and pinned. Pulled back enough for the council ring.
  model: {
    phone: { position: [0.3, 1.4, 13], target: [0.3, -1.7, 0], fov: 50, yaw: 0 },
    position: [2.4, 1.3, 10.8],
    target: [0.3, 0.45, 0],
    fov: 40,
    drift: [-1.6, 0.3, -0.5],
    ease: 0.55,
    yaw: 0.17,
  },

  // The lab: a straight-on pan along the plinths, left to right.
  lab: {
    phone: { position: [-6.3, 1.0, 12.5], target: [-6.3, -2.4, 0], fov: 50, yaw: 0 },
    position: [-6.3, 1.0, 9.4],
    target: [-6.3, -0.05, 0],
    fov: 38,
    drift: [12.6, 0, 0],
    targetDrift: [12.6, 0, 0],
    ease: 0.7,
    yaw: 0.16,
  },

  assistant: {
    position: [0, 1.2, 11],
    target: [0, 0, 0],
    fov: 40,
    drift: [0, 0, 0],
    ease: 0.6,
    yaw: 0.1,
  },

  // Above the ward, tilted down, then rising as the graph takes over.
  ward2: {
    phone: { position: [0.5, 8.5, 7.5], target: [0.3, -1.9, -0.3], fov: 50, yaw: 0 },
    position: [1.4, 9.4, 8.8],
    target: [0.4, 0.2, -0.2],
    fov: 42,
    drift: [-0.4, 1.4, 2.6],
    targetDrift: [0, 2.4, 0],
    ease: 0.6,
    yaw: 0.26,
  },

  // The lower page: a fixed camera; GroundStage places objects in front of it.
  ground: {
    position: [0, 0, 12],
    target: [0, 0, 0],
    fov: 38,
    drift: [0, 0, 0],
    ease: 0.8,
    yaw: 0,
  },

  idle: {
    position: [4.4, 1.2, 12.0],
    target: [0, 0.1, 0],
    fov: 44,
    drift: [0.6, 0.1, -0.8],
    ease: 0.7,
    yaw: 0.14,
  },
};

/** How much pointer parallax each shot allows. Interior shots get none — a
 *  close camera that swings with the mouse is nauseating. */
export const PARALLAX: Record<Framing, number> = {
  hero: 0.3,
  capture: 0.04,
  model: 0.2,
  lab: 0.12,
  assistant: 0.1,
  ward2: 0.16,
  ground: 0,
  idle: 0.3,
};
