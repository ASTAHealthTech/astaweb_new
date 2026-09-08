"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sceneState, type Framing } from "@/lib/scene/state";

/**
 * A stage is a drawn object that owns one or more framings.
 *
 * When one of its framings is current, the stage draws itself in (drawn 0 → 1
 * over ~2 s, which is the signature move of the whole site); when it is not,
 * it fades and stops rendering. Both values are refs, read inside useFrame —
 * never React state, which would re-render the tree on scroll.
 */
export function useStage(framings: Framing[], drawSeconds = 2.2, extraFade?: React.RefObject<number>) {
  const group = useRef<THREE.Group>(null);
  const active = useRef(0);
  const drawn = useRef(0);
  const wasActive = useRef(false);
  const faded = useRef(false);
  const fadeOut = useRef(1);

  useFrame((_, delta) => {
    // The activation damping wants a tight clamp (an alt-tab return must not
    // snap). The drawing does not: on a slow machine it should still finish in
    // wall-clock time rather than in frames, so it gets a generous one.
    const dt = Math.min(delta, 0.2);
    const dtDraw = Math.min(delta, 0.5);
    const on = framings.includes(sceneState.framing);

    // opacity-like activation, damped
    active.current += ((on ? 1 : 0) - active.current) * (1 - Math.exp(-(on ? 4 : 6) * dt));

    // the drawing: restarts from zero each time the stage comes back
    if (on && !wasActive.current) drawn.current = 0;
    wasActive.current = on;
    if (on) drawn.current = Math.min(1, drawn.current + dtDraw / drawSeconds);

    const fade = active.current * (extraFade?.current ?? 1);
    fadeOut.current = fade;
    if (group.current) {
      group.current.visible = fade > 0.012;
      // Fade every drawn material in the stage together. Cheap: a few dozen
      // objects, one uniform each.
      // Every material in the stage fades together: drawn edges through the
      // shader's uFade, solids and plinths through opacity. Solids animate their
      // own base opacity (build-in), so the fade multiplies it every frame.
      group.current.traverse((o) => {
        const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (!mat) return;
        if ((mat as THREE.ShaderMaterial).isShaderMaterial) {
          const sm = mat as THREE.ShaderMaterial;
          if (sm.uniforms?.uFade) sm.uniforms.uFade.value = fade;
        } else if (mat.userData && typeof mat.userData.baseOpacity === "number") {
          mat.opacity = mat.userData.baseOpacity * fade;
        }
      });
      faded.current = fade >= 0.999;
    }
  });

  return { group, active, drawn, fade: fadeOut };
}
