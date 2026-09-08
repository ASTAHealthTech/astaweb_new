"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp01 } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE } from "@/lib/scene/look";
import { buildMonitor, SCREEN_H, SCREEN_W, SCREEN_Y, SCREEN_Z } from "@/lib/scene/monitor";
import { DEFAULT_READINGS, drawScreen, SCREEN_PX_H, SCREEN_PX_W, type ScreenReadings } from "@/lib/scene/screen";
import { Solid } from "./Solid";

/**
 * The bedside monitor, solid, with one lit surface: the glass.
 *
 * The glass is a canvas redrawn at 15 fps, and only while the stage is
 * actually visible — it was the single most expensive thing on the page
 * when it ran blurred at 24 fps whether or not anyone could see it.
 */
const FROM: Record<string, [number, number, number]> = {
  bezel: [0, 0, 0],
  handle: [0, 1.4, 0],
  keys: [0, -1.2, 0.6],
  module: [1.4, 0, 0],
  arm: [0, 0, -2.2],
};
const ORDER = ["arm", "bezel", "handle", "module", "keys"];

export function Monitor({
  drawn,
  visible,
  readings = DEFAULT_READINGS,
  glow = 1,
  explodeRef,
  layout,
}: {
  drawn: React.RefObject<number>;
  /** Stage fade — the glass stops redrawing when nobody can see it. */
  visible: React.RefObject<number>;
  readings?: ScreenReadings;
  glow?: number;
  explodeRef?: React.RefObject<number>;
  /** screen layout, read every frame — a ref so a selector can change it live */
  layout?: React.RefObject<number>;
}) {
  const parts = useMemo(() => buildMonitor(), []);

  const { canvas, tex } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = SCREEN_PX_W;
    c.height = SCREEN_PX_H;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    return { canvas: c, tex: t };
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);

  const glass = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, toneMapped: false });
    m.userData.baseOpacity = 0;
    return m;
  }, [tex]);
  const last = useRef(0);
  const glassMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const d = drawn.current ?? 1;
    glass.userData.baseOpacity = clamp01((d - 0.55) / 0.3) * glow;
    glass.userData.glass = true;
    // the glass rides with the bezel when exploded (bezel stays home; the
    // glass only needs to keep its place)
    if (glassMesh.current) glassMesh.current.position.z = SCREEN_Z;
    if ((visible.current ?? 1) < 0.02) return;
    if (t - last.current > 1 / 15) {
      last.current = t;
      drawScreen(canvas, t, readings, 0, layout?.current ?? 0);
      tex.needsUpdate = true;
    }
  });

  return (
    <group>
      {parts.map((p) => (
        <Solid
          key={p.id}
          geometry={p.geometry}
          drawn={drawn}
          color={p.id === "arm" ? BODY_LIGHT : BODY}
          edge={EDGE}
          edgeOpacity={p.id === "arm" ? 0.55 : 0.9}
          from={FROM[p.id]}
          explode={FROM[p.id].map((v) => v * 0.7) as [number, number, number]}
          explodeRef={explodeRef}
          delay={(ORDER.indexOf(p.id) / ORDER.length) * 0.4}
          span={0.6}
        />
      ))}
      <mesh ref={glassMesh} position={[0, SCREEN_Y, SCREEN_Z]} material={glass}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
      </mesh>
    </group>
  );
}
