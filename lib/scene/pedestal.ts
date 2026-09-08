/**
 * The pedestal — one operable object per inner page.
 *
 * A plain mutable record the DOM writes to (drag, wheel, buttons, sliders)
 * and the 3D reads every frame. No React state crosses this boundary, so a
 * slider at 120 Hz costs nothing but the frame it changes.
 */
export type PedestalControls = {
  /** patient state, bpm — the model's live control */
  hr: number;
  /** Rapid (false) or Deep (true) review */
  deep: boolean;
  /** monitor screen layout index — the bedside's live control */
  layout: number;
  /** ward light, 0 night → 1 day */
  light: number;
  /** beds in the ward */
  beds: number;
  /** critical beds, by index */
  crit: Set<number>;
  /** with ASTA (true) or without */
  withAsta: boolean;
  /** switchboard: 0 low · 1 moderate · 2 high */
  severity: number;
  /** switchboard: night shift routes to on-call */
  night: boolean;
  /** hub: selected spoke */
  spoke: number;
};

export const pedestal = {
  /** yaw the user has applied, radians; auto-spin adds to it while idle */
  rotY: 0,
  /** wheel zoom, 0.75 → 1.35 */
  zoom: 1,
  /** 0 assembled → 1 exploded; the button and the scrubbing section both write it */
  explodeTarget: 0,
  /** last pointer interaction, ms — auto-spin resumes 3 s after */
  lastInput: 0,
  dragging: false,
  /** a click on the pedestal (window px), for objects that pick parts */
  click: null as { x: number; y: number } | null,
  /** bumped whenever a control changes something React should redraw */
  version: 0,
  controls: {
    hr: 92,
    deep: false,
    layout: 0,
    light: 1,
    beds: 6,
    crit: new Set<number>([0, 2, 4, 5]),
    withAsta: true,
    severity: 1,
    night: false,
    spoke: 0,
  } as PedestalControls,
};

export function resetPedestal() {
  pedestal.rotY = 0;
  pedestal.zoom = 1;
  pedestal.explodeTarget = 0;
  pedestal.lastInput = 0;
  pedestal.dragging = false;
}
