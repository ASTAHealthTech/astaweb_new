/**
 * The scene's shared state.
 *
 * Deliberately NOT React state. Scroll updates this object 60 times a second;
 * routing it through React would re-render the tree on every frame. The canvas
 * reads it inside useFrame, which is exactly where per-frame reads belong.
 *
 * Only `framing` — which changes a handful of times per page — has a
 * subscription, because a few DOM overlays (the clock, the bed labels) do need
 * to re-render when it flips.
 */

export type Framing =
  // ── the signal, followed from the glass to the decision ──
  | "hero" // the monitor and the unit watching it, held right of frame
  | "capture" // pushed in on the glass: what the unit sees
  | "model" // the model building itself, centred, pinned
  | "lab" // the lab: trained specialists on plinths, panned by scroll
  | "assistant" // quiet: the cards carry this section
  | "ward2" // the ward from above, then the hospital graph
  | "ground" // the lower page: small objects placed by DOM anchors
  | "idle"; // no section has claimed the camera

export type SceneState = {
  /** Which shot the camera is holding. */
  framing: Framing;
  /** 0 → 1 through the current page's camera timeline. */
  progress: number;
  /** 0 (21:40, lights on) → 1 (04:00, deep night). Drives light level and hue. */
  night: number;
  /** 0 → 1 how far Bed 4 has drifted. Drives the one amber monitor. */
  alert: number;
  /**
   * 0 → 1 the model coming into existence: a scattered field of readings at 0,
   * fully wired and firing at 1. Damped inside the scene, never read raw —
   * trackpad scroll is jittery, and a structure that stutters as it grows is
   * worse than one that does not grow at all.
   */
  assembly: number;
  /**
   * 0 → 1 the drawing opening up: 0 is the assembled instrument, 1 is every
   * part flown out to its exploded position with its label on a leader line.
   */
  explode: number;
  /** 0 → 1 the capture section handing the glass over to its DOM frame. */
  capture: number;
  /** Pointer position in clip space, -1 → 1. Parallax only, never navigation. */
  pointerX: number;
  pointerY: number;
  /** narrow viewport: shots use their phone framing and copy sits at the bottom */
  phone: boolean;
};

export const sceneState: SceneState = {
  framing: "hero",
  progress: 0,
  night: 0,
  alert: 0,
  assembly: 1,
  explode: 0,
  capture: 0,
  pointerX: 0,
  pointerY: 0,
  phone: false,
};

type Listener = (framing: Framing) => void;
const listeners = new Set<Listener>();

/** Set the shot. No-ops when the framing is unchanged, so it is safe to spam. */
export function setFraming(framing: Framing): void {
  if (sceneState.framing === framing) return;
  sceneState.framing = framing;
  listeners.forEach((fn) => fn(framing));
}

export function subscribeFraming(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function getFraming(): Framing {
  return sceneState.framing;
}

/** Reset when a route unmounts, so the next page starts from a known shot. */
export function releaseScene(): void {
  sceneState.progress = 0;
  sceneState.alert = 0;
  sceneState.assembly = 1;
  sceneState.explode = 0;
  sceneState.capture = 0;
  setFraming("hero");
}
