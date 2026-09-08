"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One registration point for GSAP. Every scroll-driven scene imports gsap and
 * ScrollTrigger from HERE, never from the package directly — that guarantees
 * the plugin is registered exactly once and keeps the timing constants in one
 * file rather than scattered through 45 components.
 */

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** Motion primitive D — camera. How hard a scrubbed timeline lags the scroll. */
export const SCRUB = 1.2;

/** Shared ScrollTrigger defaults, so no two sections trigger on different lines. */
export const TRIGGER_DEFAULTS = {
  start: "top 78%",
  end: "bottom 22%",
} as const;

export { gsap, ScrollTrigger };
