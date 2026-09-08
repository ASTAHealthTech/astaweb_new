"use client";

import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { sceneState, setFraming, type Framing } from "./state";

type Range = [number, number];

export type SceneShotOptions = {
  /** How deep into the night this section runs. 0 = 21:40, 1 = 04:00. */
  night?: Range;
  /** How far Bed 04 has drifted across this section. */
  alert?: Range;
  /** How far the model has assembled across this section. 0 = raw field. */
  assembly?: Range;
  /** How far the drawing opens up across this section. */
  explode?: Range;
  start?: string;
  end?: string;
};

function lerp(range: Range | undefined, t: number, fallback: number): number {
  if (!range) return fallback;
  return range[0] + (range[1] - range[0]) * t;
}

/**
 * A section claims the camera for as long as it is on screen.
 *
 * This is the only way a page is allowed to talk to the scene — no component
 * reaches into `sceneState` directly. Attach it to the section's wrapper and
 * the camera does the rest:
 *
 *   const ref = useRef<HTMLDivElement>(null);
 *   useSceneShot(ref, "ward", { night: [0.35, 0.7], alert: [0, 0.6] });
 *
 * Reduced-motion visitors never reach here — the scene is not mounted at all
 * on tier "static", and the section still reads perfectly as plain layout.
 */
export function useSceneShot(
  ref: RefObject<HTMLElement | null>,
  framing: Framing,
  options: SceneShotOptions = {}
): void {
  const { night, alert, assembly, explode, start = "top bottom", end = "bottom top" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onUpdate: (self) => {
        const t = self.progress;
        sceneState.progress = t;
        sceneState.night = lerp(night, t, sceneState.night);
        sceneState.alert = lerp(alert, t, sceneState.alert);
        sceneState.assembly = lerp(assembly, t, sceneState.assembly);
        sceneState.explode = lerp(explode, t, sceneState.explode);
      },
      onToggle: (self) => {
        if (self.isActive) setFraming(framing);
      },
    });

    return () => trigger.kill();
    // Ranges are literal tuples in call sites; spread them so a new array
    // identity each render does not rebuild the trigger every frame.
  }, [ref, framing, start, end, night?.[0], night?.[1], alert?.[0], alert?.[1], assembly?.[0], assembly?.[1], explode?.[0], explode?.[1]]);
}
