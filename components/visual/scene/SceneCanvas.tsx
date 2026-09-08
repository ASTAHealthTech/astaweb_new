"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { SHOTS } from "@/lib/scene/framings";
import { TIER_BUDGET, type Tier } from "@/lib/tier";
import { CameraRig } from "./CameraRig";
import { Room } from "./Room";
import { StageLights, Stars } from "./Solid";

/**
 * The one canvas. Mounted once in the marketing layout and kept alive across
 * route changes. The rig is the club site's: one light setup, a star field,
 * bloom on machines that can afford it.
 */
export default function SceneCanvas({ tier }: { tier: Tier }) {
  const budget = TIER_BUDGET[tier];
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const onVisibility = () => setRunning(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={[budget.dpr[0], Math.min(budget.dpr[1], 1.5)]}
      camera={{ fov: SHOTS.hero.fov, near: 0.1, far: 220, position: SHOTS.hero.position }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <CameraRig />
      <StageLights />
      <Stars count={tier === "full" ? 1200 : 500} />
      <Room tier={tier} />
      {tier === "full" ? (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.35} luminanceSmoothing={0.4} intensity={0.9} mipmapBlur />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
