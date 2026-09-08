"use client";

import { useMemo } from "react";
import { buildDevice } from "@/lib/scene/device";
import { BODY_LIGHT, EDGE, GLOW, SIGNAL } from "@/lib/scene/look";
import { Solid } from "./Solid";

/**
 * The ASTA unit, solid. Twelve parts that fly together from their exploded
 * positions as the stage draws in — the rover's assembly, on our device.
 */
const COLOR: Record<string, string> = {
  enclosure: "#2a1b3a",
  faceplate: "#2a1b3a",
  vents: "#1c1128",
  board: "#1a2a22",
  clamp: BODY_LIGHT,
  arm: BODY_LIGHT,
  knuckle: BODY_LIGHT,
  cable: "#0f0a16",
  screws: "#3b2a4d",
};

const MOUNT = new Set(["clamp", "arm", "knuckle", "cable"]);

export function Unit({ drawn, spread = 1.4, compact = false, explodeRef }: { drawn: React.RefObject<number>; spread?: number; /** just the head — no arm, clamp or pole */ compact?: boolean; /** 0 → 1 exploded, parts along their explode directions */ explodeRef?: React.RefObject<number> }) {
  const parts = useMemo(() => buildDevice().filter((p) => !compact || !MOUNT.has(p.id)), [compact]);
  const n = parts.length;
  return (
    <group>
      {parts.map((p) => {
        const led = p.id === "leds";
        const optic = p.id === "optic" || p.id === "iris";
        return (
          <Solid
            key={p.id}
            geometry={p.geometry}
            drawn={drawn}
            color={led ? GLOW : optic ? "#1a1024" : COLOR[p.id] ?? BODY_LIGHT}
            edge={led ? GLOW : optic ? SIGNAL : EDGE}
            edgeOpacity={p.id === "clamp" || p.id === "arm" ? 0.6 : 0.9}
            emissive={led ? GLOW : optic ? SIGNAL : undefined}
            emissiveIntensity={led ? 1.8 : optic ? 0.35 : 0}
            from={[p.explode[0] * spread, p.explode[1] * spread, p.explode[2] * spread]}
            explode={[p.explode[0] * 1.1, p.explode[1] * 1.1, p.explode[2] * 1.1]}
            explodeRef={explodeRef}
            delay={(p.order / n) * 0.35}
            span={0.65}
          />
        );
      })}
    </group>
  );
}
