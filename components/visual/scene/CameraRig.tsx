"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { PARALLAX, SHOTS } from "@/lib/scene/framings";
import { sceneState } from "@/lib/scene/state";

/**
 * Motion primitive D — the camera.
 *
 * Reads `sceneState` every frame and never through React, so scrolling costs
 * one matrix update rather than a re-render of the tree.
 *
 * Damping is exponential (`1 - e^(-k·dt)`) rather than a fixed lerp factor, so
 * the move feels identical at 60 Hz and 144 Hz. A plain `lerp(a, b, 0.1)` is
 * twice as fast on a 120 Hz display, which is why scroll scenes so often feel
 * different on a good laptop.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera);

  const v = useMemo(
    () => ({
      desired: new THREE.Vector3(),
      look: new THREE.Vector3(0, 1.1, -1),
      target: new THREE.Vector3(),
      yaw: SHOTS.hero.yaw ?? 0,
    }),
    []
  );

  useFrame((_, delta) => {
    const base = SHOTS[sceneState.framing];
    // On a phone the same shot is framed tall: object above, copy below.
    const shot = sceneState.phone && base.phone ? { ...base, ...base.phone, yaw: base.phone.yaw ?? 0 } : base;
    const p = sceneState.progress;
    const parallax = PARALLAX[sceneState.framing];

    // Clamp delta so an alt-tab return does not teleport the camera.
    const dt = Math.min(delta, 0.2);
    const k = 1 - Math.exp(-shot.ease * 3.2 * dt);

    v.desired.set(
      shot.position[0] + shot.drift[0] * p + sceneState.pointerX * parallax,
      shot.position[1] + shot.drift[1] * p + sceneState.pointerY * parallax * 0.45,
      shot.position[2] + shot.drift[2] * p
    );
    const td = shot.targetDrift ?? [0, 0, 0];
    v.target.set(shot.target[0] + td[0] * p, shot.target[1] + td[1] * p, shot.target[2] + td[2] * p);

    camera.position.lerp(v.desired, k);
    v.look.lerp(v.target, k);
    camera.lookAt(v.look);

    // Compose the subject off-centre without moving the camera sideways, which
    // would change which beds are visible.
    v.yaw += ((shot.yaw ?? 0) - v.yaw) * k;
    if (v.yaw !== 0) camera.rotateY(v.yaw);

    const cam = camera as THREE.PerspectiveCamera;
    if (cam.isPerspectiveCamera && Math.abs(cam.fov - shot.fov) > 0.01) {
      cam.fov += (shot.fov - cam.fov) * k;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
