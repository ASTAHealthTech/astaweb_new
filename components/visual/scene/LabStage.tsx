"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp01, fromPolyline, fromSegments } from "@/lib/scene/draw";
import { EDGE, EDGE_SOFT, GLOW, SIGNAL, VIOLET, WHITE } from "@/lib/scene/look";
import { heart, lungs, neuron, PLINTH_X, PLINTH_Y, trajectory } from "@/lib/scene/lab";
import { beatPhase } from "@/lib/scene/screen";
import { sceneState } from "@/lib/scene/state";
import { Drawn, type DrawnMaterial } from "./Drawn";
import { Led, Plinth, Solid } from "./Solid";
import { useStage } from "./useStage";

/**
 * §04 — the lab. Four trained specialists on plinths; the camera pans along
 * them. Each is a solid, lit object that moves the way its subject moves.
 */
const SPECIALISTS = [
  { id: "heart", name: "Heart", role: "rate · rhythm · perfusion" },
  { id: "lungs", name: "Lungs", role: "oxygen · breath" },
  { id: "neuron", name: "Deterioration", role: "early sepsis · shock-perfusion screen" },
  { id: "trajectory", name: "Trajectory", role: "forecast · threshold · time-to-threshold" },
] as const;

export function LabStage() {
  const { group, drawn, fade } = useStage(["lab"], 1.4);
  const mats = useRef<Record<string, DrawnMaterial | null>>({});
  const set = (k: string) => (m: DrawnMaterial | null) => { mats.current[k] = m; };
  const heartG = useRef<THREE.Group>(null);
  const lungsG = useRef<THREE.Group>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const pD = useRef(0);
  // one draw ref per plinth, so each object builds as the camera arrives
  const near = useMemo(() => SPECIALISTS.map(() => ({ current: 0 })), []);

  const geo = useMemo(() => {
    const nz = neuron();
    const tr = trajectory();
    return {
      heart: heart(),
      lungs: lungs(),
      neuron: nz.body,
      axon: fromPolyline(nz.axon),
      axonEnd: nz.axon[nz.axon.length - 1],
      axes: fromSegments(tr.axes),
      recorded: fromPolyline(tr.recorded),
      threshold: fromSegments(tr.threshold),
      paths: tr.paths.map((p) => fromPolyline(p)),
    };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.2);
    const t = state.clock.elapsedTime;
    if (sceneState.framing === "lab") pD.current += (sceneState.progress - pD.current) * (1 - Math.exp(-4 * dt));
    const p = pD.current;
    const u = mats.current;

    const camX = PLINTH_X[0] + (PLINTH_X[3] - PLINTH_X[0]) * p;
    SPECIALISTS.forEach((s, i) => {
      const k = clamp01(1 - Math.abs(camX - PLINTH_X[i]) / 5.2);
      const d = Math.min(drawn.current * 1.3, clamp01((k - 0.05) / 0.6));
      near[i].current = d;
      const el = labels.current[i];
      if (el) el.style.opacity = String(clamp01((d - 0.5) / 0.4) * fade.current);
    });

    if (heartG.current) {
      const ph = beatPhase(t, 72);
      const beat = Math.exp(-Math.pow((ph - 0.08) / 0.07, 2)) * 0.07 + Math.exp(-Math.pow((ph - 0.3) / 0.1, 2)) * 0.03;
      heartG.current.scale.setScalar(1 + beat);
      heartG.current.rotation.y = Math.sin(t * 0.3) * 0.25;
    }
    if (lungsG.current) {
      const br = (Math.sin(t * (18 / 60) * Math.PI * 2) + 1) / 2;
      lungsG.current.scale.set(1 + br * 0.05, 1 + br * 0.08, 1 + br * 0.05);
      lungsG.current.rotation.y = Math.sin(t * 0.27 + 1) * 0.25;
    }
    if (u.axon) { u.axon.uniforms.uDraw.value = near[2].current; u.axon.uniforms.uPulse.value = ((t * 0.7) % 1.6) - 0.2; }
    const trD = near[3].current;
    for (const k of ["axes", "recorded", "threshold", "f0", "f1", "f2"]) if (u[k]) u[k]!.uniforms.uDraw.value = trD;
    geo.paths.forEach((_, i) => { const f = u[`f${i}`]; if (f) f.uniforms.uPulse.value = ((t * 0.5 + i * 0.25) % 1.5) - 0.2; });
    if (u.recorded) u.recorded.uniforms.uPulse.value = ((t * 0.35) % 1.6) - 0.2;
  });

  return (
    <group ref={group}>
      {SPECIALISTS.map((s, i) => (
        <group key={s.id} position={[PLINTH_X[i], 0, 0]}>
          <Plinth radius={1.45} position={[0, PLINTH_Y, 0]} drawn={near[i]} />
          <Html position={[0, PLINTH_Y - 0.55, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <div ref={(el) => { labels.current[i] = el; }} className="select-none text-center" style={{ opacity: 0 }}>
              <div className="font-display text-[15px] text-ink">{s.name}</div>
              <div className="machine mt-0.5 whitespace-nowrap text-ink-3">{s.role}</div>
            </div>
          </Html>

          {s.id === "heart" ? (
            <group ref={heartG} position={[0, 0.05, 0]}>
              <Solid geometry={geo.heart} drawn={near[i]} color="#3a1626" edge={SIGNAL} edgeOpacity={0.8} threshold={18} from={[0, 1.2, 0]} />
            </group>
          ) : null}
          {s.id === "lungs" ? (
            <group ref={lungsG} position={[0, -0.1, 0]}>
              <Solid geometry={geo.lungs} drawn={near[i]} color="#2a1836" edge={GLOW} edgeOpacity={0.7} threshold={14} from={[0, 1.2, 0]} />
            </group>
          ) : null}
          {s.id === "neuron" ? (
            <group position={[-0.35, -0.1, 0]} rotation={[0, 0.2, 0]}>
              <Solid geometry={geo.neuron} drawn={near[i]} color="#26163a" edge={EDGE} edgeOpacity={0.8} threshold={14} from={[0, 1.2, 0]}>
                <Drawn ref={set("axon")} geometry={geo.axon} color={GLOW} opacity={0.9} window={0.6} pulseColor={WHITE} />
                <Led color={GLOW} size={0.06} intensity={2} position={[geo.axonEnd.x + 0.4, geo.axonEnd.y, geo.axonEnd.z]} />
              </Solid>
            </group>
          ) : null}
          {s.id === "trajectory" ? (
            <group position={[0, 0.1, 0]} rotation={[0, -0.25, 0]}>
              <Drawn ref={set("axes")} geometry={geo.axes} color={EDGE_SOFT} opacity={0.8} window={0.5} />
              <Drawn ref={set("recorded")} geometry={geo.recorded} color={SIGNAL} colorB={GLOW} opacity={0.95} window={0.4} pulseColor={WHITE} />
              <Drawn ref={set("threshold")} geometry={geo.threshold} color={EDGE_SOFT} opacity={0.9} window={0.7} />
              {geo.paths.map((g, i) => (
                <Drawn key={i} ref={set(`f${i}`)} geometry={g} color={VIOLET} colorB={WHITE} opacity={0.85} window={0.4} pulseColor={WHITE} />
              ))}
            </group>
          ) : null}
        </group>
      ))}
    </group>
  );
}
