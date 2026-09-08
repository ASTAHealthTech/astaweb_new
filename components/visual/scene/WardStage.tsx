"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp01, fromSegments } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE, EDGE_SOFT, GLOW, GLOW_SOFT, SIGNAL, VIOLET, WHITE } from "@/lib/scene/look";
import { sceneState } from "@/lib/scene/state";
import { BEDS, bedPosition, buildGraph, buildWard } from "@/lib/scene/ward";
import { Drawn, type DrawnMaterial } from "./Drawn";
import { Led, Plinth, Solid } from "./Solid";
import { useStage } from "./useStage";

/**
 * §06 — the ward, then the graph.
 *
 *   0.00–0.45  the floor and its six beds build; each bed's readout appears
 *   0.40–0.85  the graph rises: patients → ward → hospital, tied to the beds
 */
export function WardStage() {
  const { group, drawn, fade } = useStage(["ward2"], 1.6);
  const mats = useRef<Record<string, DrawnMaterial | null>>({});
  const set = (k: string) => (m: DrawnMaterial | null) => { mats.current[k] = m; };
  const tags = useRef<(HTMLDivElement | null)[]>([]);
  const nodeTags = useRef<(HTMLDivElement | null)[]>([]);
  const pD = useRef(0);
  const bedDrawn = useMemo(() => BEDS.map(() => ({ current: 0 })), []);
  const nodeDrawn = useRef({ current: 0 });

  const geo = useMemo(() => {
    const w = buildWard();
    const g = buildGraph();
    return {
      beds: w.beds,
      room: fromSegments(w.room),
      graphEdges: fromSegments(g.edges),
      nodes: g.nodes,
      ico: new THREE.IcosahedronGeometry(0.16, 0),
    };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.2);
    const t = state.clock.elapsedTime;
    if (sceneState.framing === "ward2") pD.current += (sceneState.progress - pD.current) * (1 - Math.exp(-4 * dt));
    const p = Math.min(pD.current, drawn.current * 1.3);
    const u = mats.current;

    if (u.room) u.room.uniforms.uDraw.value = clamp01(p / 0.18);
    BEDS.forEach((b, i) => {
      const d = clamp01((p - 0.08 - i * 0.045) / 0.22);
      bedDrawn[i].current = d;
      const el = tags.current[i];
      if (el) el.style.opacity = String(clamp01((d - 0.7) / 0.3) * fade.current);
    });
    const gp = clamp01((p - 0.42) / 0.4);
    if (u.gEdges) { u.gEdges.uniforms.uDraw.value = gp; u.gEdges.uniforms.uPulse.value = gp > 0.9 ? ((t * 0.4) % 1.4) - 0.2 : -1; }
    nodeDrawn.current.current = clamp01((p - 0.5) / 0.35);
    nodeTags.current.forEach((el, i) => {
      if (el) el.style.opacity = String(clamp01((p - 0.62 - (geo.nodes[i].level === 2 ? 0 : 0.1)) / 0.15) * fade.current);
    });
  });

  return (
    <group ref={group}>
      <Plinth radius={5.2} position={[0, -0.36, 0]} drawn={drawn} />
      <Drawn ref={set("room")} geometry={geo.room} color={EDGE_SOFT} opacity={0.7} window={0.6} />
      {geo.beds.map((g, i) => {
        const b = BEDS[i];
        const pos = bedPosition(i);
        return (
          <group key={b.id}>
            <Solid geometry={g} drawn={bedDrawn[i]} color={BODY} edge={b.crit ? GLOW : EDGE} edgeOpacity={0.75} threshold={20} from={[0, 1.6, 0]}>
              {/* the monitor's glass and the unit's LED, per bed */}
              <Led color={b.crit ? GLOW_SOFT : SIGNAL} size={0.05} intensity={b.crit ? 2.2 : 1.2} position={[pos.x + 0.68, pos.y + 0.95, pos.z - 0.84]} />
              <Led color={GLOW} size={0.03} intensity={1.6} position={[pos.x + 0.62, pos.y + 1.32, pos.z - 0.56]} />
            </Solid>
            <Html position={[pos.x - 0.55, 0.9, pos.z + 0.9]} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
              <div ref={(el) => { tags.current[i] = el; }} className="select-none whitespace-nowrap rounded-card border border-hairline bg-paper/90 px-2 py-1" style={{ opacity: 0 }}>
                <div className="flex items-baseline gap-2">
                  <span className="machine text-ink">Bed {b.id}</span>
                  <span className="machine" style={{ color: b.crit ? GLOW : "#34D399" }}>{b.crit ? "CRIT" : "OK"}</span>
                </div>
                <div className="font-machine text-[11px] tabular-nums text-ink-2">
                  <span style={{ color: SIGNAL }}>{b.hr}</span> · <span style={{ color: GLOW }}>{b.spo2}</span> · <span style={{ color: VIOLET }}>{b.bp}</span>
                  <span className="ml-2 text-ink-3">NEWS2 {b.news}</span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}

      {/* the graph */}
      <Drawn ref={set("gEdges")} geometry={geo.graphEdges} color={VIOLET} colorB={GLOW} opacity={0.6} window={0.5} pulseColor={WHITE} />
      {geo.nodes.map((n) => {
        const s = n.level === 0 ? 1.6 : n.level === 1 ? 1.25 : 0.85;
        return (
          <Solid key={n.id} geometry={geo.ico} drawn={nodeDrawn.current} color={BODY_LIGHT} edge={EDGE} position={[n.pos.x, n.pos.y, n.pos.z]} scale={s} threshold={1}>
            <Led color={GLOW_SOFT} size={0.06} intensity={2} />
          </Solid>
        );
      })}
      {geo.nodes.filter((n) => n.level < 2).map((n, i) => (
        <Html key={n.id} position={[n.pos.x + 0.35, n.pos.y, n.pos.z]} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div ref={(el) => { nodeTags.current[i] = el; }} className="machine select-none whitespace-nowrap pl-1 text-ink" style={{ opacity: 0 }}>
            {n.label}
          </div>
        </Html>
      ))}
    </group>
  );
}
