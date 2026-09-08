"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/scene/state";
import { ModelObject } from "./objects/ModelObject";
import { Plinth } from "./Solid";
import { useStage } from "./useStage";

/**
 * §03 — the model, built in front of you. Scroll progress through the pinned
 * section is the build timeline; see ModelObject for the beats.
 */
export function ModelStage() {
  const { group, drawn, fade } = useStage(["model"], 1.6);
  const root = useRef<THREE.Group>(null);
  const pDamped = useRef(0);
  const build = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.2);
    const t = state.clock.elapsedTime;
    if (sceneState.framing === "model") {
      pDamped.current += (sceneState.progress - pDamped.current) * (1 - Math.exp(-4.5 * dt));
    }
    build.current = Math.min(pDamped.current, drawn.current * 1.2);
    if (root.current) root.current.rotation.y = Math.sin(t * 0.1) * 0.14 + sceneState.pointerX * 0.08;
  });

  return (
    <group ref={group}>
      <Plinth radius={3.1} position={[0, -2.5, 0]} drawn={drawn} />
      <group ref={root}>
        <ModelObject build={build} fade={fade} />
      </group>
    </group>
  );
}
