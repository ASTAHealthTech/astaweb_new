"use client";

import { animate, cubicBezier, stagger, svg } from "animejs";
import { LIFT_MS, LIFT_STAGGER_MS, RULE_MS, ruleEase } from "./motion";

/**
 * anime.js helpers — motion primitives A (drawn rule) and E (lift-off).
 *
 * Kept out of lib/motion.ts on purpose: motion.ts is imported by nearly every
 * component, and anything imported there ends up in the shared client bundle.
 * Only the handful of components that actually draw an SVG line or lift a value
 * off the glass should pay for anime.js.
 */

const RULE_EASE = cubicBezier(ruleEase[0], ruleEase[1], ruleEase[2], ruleEase[3]);

export type AnimTarget = string | Element | Element[] | NodeListOf<Element>;

/**
 * E — lift-off. Values detach from the monitor glass, travel, and land as
 * structured rows. Staggered so they read as a sequence of readings rather
 * than one block appearing.
 */
export function liftOff(targets: AnimTarget, delay = 0) {
  return animate(targets, {
    opacity: [0, 1],
    translateY: [8, 0],
    scale: [0.96, 1],
    duration: LIFT_MS,
    delay: stagger(LIFT_STAGGER_MS, { start: delay }),
    ease: RULE_EASE,
  });
}

/**
 * A — the drawn rule, for real SVG paths. The Framer Motion version in
 * ui/Reveal handles simple hairlines; this one handles the signal-flow and
 * architecture diagrams, where the line has an actual shape.
 */
export function drawLine(targets: AnimTarget, duration = RULE_MS * 2) {
  return animate(svg.createDrawable(targets), {
    draw: ["0 0", "0 1"],
    duration,
    ease: RULE_EASE,
  });
}

/** Counts a numeral up to its value. Tabular figures only, or it will jitter. */
export function countTo(
  el: HTMLElement,
  to: number,
  { duration = 1100, decimals = 0 }: { duration?: number; decimals?: number } = {}
) {
  const state = { value: 0 };
  return animate(state, {
    value: to,
    duration,
    ease: RULE_EASE,
    onUpdate: () => {
      el.textContent = state.value.toFixed(decimals);
    },
  });
}

/**
 * Word-by-word entrance for a headline. Each word needs a `data-word` wrapper
 * with `display:inline-block`, or the transform has nothing to act on.
 *
 * Words, not letters: letter-by-letter reveals read as a gimmick and destroy
 * the shape of the line while it plays.
 */
export function revealWords(root: HTMLElement, delay = 0) {
  const words = root.querySelectorAll("[data-word]");
  if (!words.length) return null;
  return animate(words, {
    opacity: [0, 1],
    translateY: ["0.42em", "0em"],
    duration: 820,
    delay: stagger(52, { start: delay }),
    ease: RULE_EASE,
  });
}

/** Draws a hairline out from its left edge. */
export function drawRule(el: HTMLElement, delay = 0) {
  return animate(el, {
    scaleX: [0, 1],
    duration: RULE_MS,
    delay,
    ease: RULE_EASE,
  });
}
