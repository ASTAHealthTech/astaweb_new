"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/scene/state";
import { Monitor } from "./Monitor";
import { Plinth } from "./Solid";
import { Unit } from "./Unit";
import { useStage } from "./useStage";

/**
 * §00 — what the unit sees.
 *
 * A bedside monitor and the ASTA unit on its pole, solid, on one plinth. The
 * plinth appears first, the monitor's parts fly together and its glass lights,
 * then the unit assembles and settles into place looking at the screen.
 */
export function HeroStage() {
  const handoff = useRef(1);
  const { group, drawn, fade } = useStage(["hero", "capture"], 2.6, handoff);
  const unitDrawn = useRef(0);
  const monitorDrawn = useRef(0);
  const unit = useRef<THREE.Group>(null);
  const whole = useRef<THREE.Group>(null);

  // The unit aims at the centre of the glass.
  const aim = useMemo(() => {
    const from = new THREE.Vector3(-1.05, 0.85, 2.05);
    const to = new THREE.Vector3(1.6, 0.25, 0.17);
    const dir = to.clone().sub(from);
    return { from, yaw: Math.atan2(dir.x, dir.z), pitch: -Math.atan2(dir.y, Math.hypot(dir.x, dir.z)) };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const d = drawn.current;
    handoff.current = 1 - sceneState.capture;
    monitorDrawn.current = Math.min(1, d / 0.7);
    unitDrawn.current = Math.max(0, (d - 0.3) / 0.7);

    if (whole.current) {
      whole.current.rotation.y = Math.sin(t * 0.09) * 0.05 + sceneState.pointerX * 0.06;
    }
    if (unit.current) {
      const settleIn = 1 - Math.pow(1 - unitDrawn.current, 3);
      unit.current.position.set(aim.from.x, aim.from.y + (1 - settleIn) * 0.4, aim.from.z);
      unit.current.rotation.set(aim.pitch, aim.yaw, 0);
    }
  });

  return (
    <group ref={group}>
      <group ref={whole} position={[1.95, 0.05, 0]} scale={0.66}>
        <Plinth radius={2.7} position={[0.55, -1.35, 1.9]} drawn={drawn} />
        <group position={[1.6, 0.25, 0]} rotation={[0, -0.42, 0]}>
          <Monitor drawn={monitorDrawn} visible={fade} />
        </group>
        <group ref={unit} scale={0.62}>
          <Unit drawn={unitDrawn} />
        </group>
      </group>
    </group>
  );
}
