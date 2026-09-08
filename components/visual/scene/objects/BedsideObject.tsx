"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { pedestal } from "@/lib/scene/pedestal";
import { Monitor } from "../Monitor";
import { Unit } from "../Unit";

/**
 * The bedside as one operable object: the monitor on its arm and the unit on
 * its pole, looking at it. Explode takes the unit into its twelve parts and
 * the monitor into its five. The screen layout follows the controls.
 */
export function BedsideObject({ build, explode, fade }: { build: React.RefObject<number>; explode?: React.RefObject<number>; fade: React.RefObject<number> }) {
  const unit = useRef<THREE.Group>(null);
  const monitorDrawn = useRef(0);
  const unitDrawn = useRef(0);
  const layout = useRef(0);
  const aim = useMemo(() => {
    const from = new THREE.Vector3(-1.05, 0.85, 2.05);
    const to = new THREE.Vector3(1.6, 0.25, 0.17);
    const dir = to.clone().sub(from);
    return { from, yaw: Math.atan2(dir.x, dir.z), pitch: -Math.atan2(dir.y, Math.hypot(dir.x, dir.z)) };
  }, []);

  useFrame(() => {
    const d = build.current ?? 1;
    monitorDrawn.current = Math.min(1, d / 0.7);
    unitDrawn.current = Math.max(0, (d - 0.3) / 0.7);
    layout.current = pedestal.controls.layout;
    if (unit.current) {
      const settleIn = 1 - Math.pow(1 - unitDrawn.current, 3);
      unit.current.position.set(aim.from.x, aim.from.y + (1 - settleIn) * 0.4, aim.from.z);
      unit.current.rotation.set(aim.pitch, aim.yaw, 0);
    }
  });

  void fade;
  return (
    <group position={[-0.3, 0.3, -0.6]}>
      <group position={[1.6, 0.25, 0]} rotation={[0, -0.42, 0]}>
        <Monitor drawn={monitorDrawn} visible={fade} explodeRef={explode} layout={layout} />
      </group>
      <group ref={unit} scale={0.62}>
        <Unit drawn={unitDrawn} explodeRef={explode} />
      </group>
    </group>
  );
}
