"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp01, fromPolyline, fromSegments } from "@/lib/scene/draw";
import { EDGE, GLOW, GLOW_SOFT, SIGNAL, VIOLET, WHITE } from "@/lib/scene/look";
import { buildCouncil, buildForecast, buildIntake, buildModelCore } from "@/lib/scene/model";
import { pedestal } from "@/lib/scene/pedestal";
import { Drawn, type DrawnMaterial } from "../Drawn";
import { Led, Solid } from "../Solid";

/**
 * The PPLM as one object.
 *
 *   build    0 → 1: readings stream in, the network flies together and wires,
 *            the council draws in, the forecast leaves (the landing page
 *            scrubs this with scroll; the pedestal runs it once)
 *   explode  0 → 1: the four tiers separate and label themselves
 *   live     read the pedestal's controls: heart rate drives the intake and
 *            pulse speed and tilts the forecast; Deep lights all reviewers
 */
const NODE_COLOR = "#5a2a66";
const TIERS = {
  intake: new THREE.Vector3(0, -1.1, 0),
  network: new THREE.Vector3(0, 0, 0),
  council: new THREE.Vector3(0, 0.9, 0),
  forecast: new THREE.Vector3(0.9, 0.5, 0),
};
const TIER_LABELS: [keyof typeof TIERS, string, [number, number, number]][] = [
  ["intake", "Readings · 1,000 samples / vital", [-2.6, -2.9, 0]],
  ["network", "Network · 10–20B parameters", [-3.2, -0.2, 0]],
  ["council", "Council · 5 independent reviewers", [-2.6, 3.4, 0]],
  ["forecast", "Forecast · +15 · +30 min", [3.4, 1.4, 0]],
];

export function ModelObject({
  build,
  explode,
  fade,
  live = false,
}: {
  build: React.RefObject<number>;
  explode?: React.RefObject<number>;
  /** stage fade for the DOM labels */
  fade: React.RefObject<number>;
  live?: boolean;
}) {
  const core = useMemo(() => buildModelCore(320), []);
  const geo = useMemo(() => {
    const fc = buildForecast(core.outlet);
    return {
      syn: fromSegments(core.synSegs, core.synOffsets, core.synOrder),
      intake: fromSegments(buildIntake(core.inlet)),
      ico: new THREE.IcosahedronGeometry(0.2, 0),
      council: buildCouncil(core.top).map((c) => ({ ...c, lead: fromSegments(c.leader) })),
      paths: fc.paths.map((p) => fromPolyline(p)),
      ticks: fromSegments(fc.ticks),
      tickPos: fc.ticks.map(([a, b]) => b.clone().add(b.clone().sub(a).normalize().multiplyScalar(0.18))),
    };
  }, [core]);

  const nodeMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ color: NODE_COLOR, emissive: GLOW, emissiveIntensity: 0.14, roughness: 0.45, metalness: 0.35, transparent: true });
    m.userData.baseOpacity = 1;
    return m;
  }, []);
  const inst = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const m = useRef<Record<string, DrawnMaterial | null>>({});
  const set = (k: string) => (mat: DrawnMaterial | null) => { m.current[k] = mat; };
  const councilRefs = useMemo(() => geo.council.map(() => ({ current: 0 })), [geo.council]);
  const tiers = useRef<Record<string, THREE.Group | null>>({});
  const forecastG = useRef<THREE.Group>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tierLabelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ex = useRef(0);
  const clock = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.2);
    const p = build.current ?? 1;
    const u = m.current;
    const c = pedestal.controls;
    // live: the heart rate is the tempo of everything
    const tempo = live ? 0.6 + ((c.hr - 60) / 80) * 1.2 : 1;
    clock.current += dt * tempo;
    const t = clock.current;

    ex.current += ((explode?.current ?? 0) - ex.current) * (1 - Math.exp(-6 * dt));
    const e = ex.current;
    const ease = e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
    for (const k of Object.keys(TIERS) as (keyof typeof TIERS)[]) {
      const g = tiers.current[k];
      if (g) g.position.copy(TIERS[k]).multiplyScalar(ease);
    }
    tierLabelRefs.current.forEach((el) => { if (el) el.style.opacity = String(clamp01((e - 0.4) / 0.3) * fade.current); });

    if (u.intake) {
      u.intake.uniforms.uDraw.value = clamp01(p / 0.25);
      u.intake.uniforms.uPulse.value = ((t * 0.55) % 1.3) - 0.15;
    }
    const asm = clamp01((p - 0.15) / 0.4);
    if (inst.current) {
      const n = core.points.length;
      for (let i = 0; i < n; i += 1) {
        const a = clamp01((asm - core.depth[i] * 0.5) / 0.5);
        const ee = a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2;
        const pt = core.points[i], sc = core.scatter[i];
        dummy.position.set(pt.x + sc.x * (1 - ee), pt.y + sc.y * (1 - ee), pt.z + sc.z * (1 - ee));
        dummy.scale.setScalar((0.25 + 0.75 * ee) * (0.85 + 0.3 * Math.sin(t * 1.3 + i)));
        dummy.updateMatrix();
        inst.current.setMatrixAt(i, dummy.matrix);
      }
      inst.current.instanceMatrix.needsUpdate = true;
      nodeMat.userData.baseOpacity = clamp01(asm / 0.2);
      nodeMat.emissiveIntensity = 0.12 + 0.3 * clamp01((p - 0.5) / 0.15) * (0.6 + 0.4 * Math.sin(t * 2.0));
    }
    if (u.syn) {
      u.syn.uniforms.uAssembly.value = asm;
      u.syn.uniforms.uDraw.value = clamp01((p - 0.3) / 0.35);
      const wired = clamp01((p - 0.5) / 0.15);
      u.syn.uniforms.uPulse.value = wired > 0 ? ((t * 0.42) % 1.35) - 0.2 : -1;
      u.syn.uniforms.uPulseWidth.value = 0.09;
    }
    // council: Rapid lights one reviewer (Lumen); Deep lights all five in turn
    const deep = live ? c.deep : true;
    geo.council.forEach((cn, i) => {
      const d = clamp01((p - 0.5 - i * 0.035) / 0.14);
      councilRefs[i].current = d;
      const active = deep || i === geo.council.length - 1;
      const lit = active ? 0.55 + 0.45 * Math.max(0, Math.sin(t * 1.1 - i * 1.25)) : 0.18;
      const lead = u[`l${i}`];
      if (lead) { lead.uniforms.uDraw.value = d; lead.uniforms.uOpacity.value = 0.25 + 0.45 * lit; }
      const el = labelRefs.current[i];
      if (el) el.style.opacity = String(clamp01((d - 0.6) / 0.4) * (0.5 + 0.5 * lit) * fade.current);
    });
    // forecast: with a high heart rate the paths climb and fan wider
    if (forecastG.current) {
      const k = live ? (c.hr - 92) / 60 : 0;
      forecastG.current.rotation.z = k * 0.35;
      forecastG.current.scale.set(1, 1 + Math.abs(k) * 0.4, 1);
    }
    geo.paths.forEach((_, i) => {
      const f = u[`f${i}`];
      if (f) {
        f.uniforms.uDraw.value = clamp01((p - 0.68 - i * 0.03) / 0.22);
        f.uniforms.uPulse.value = ((t * 0.5 + i * 0.3) % 1.4) - 0.2;
      }
    });
    if (u.ticks) u.ticks.uniforms.uDraw.value = clamp01((p - 0.86) / 0.1);
    tickRefs.current.forEach((el) => { if (el) el.style.opacity = String(clamp01((p - 0.9) / 0.08) * fade.current); });
  });

  return (
    <group>
      <group ref={(g) => { tiers.current.intake = g; }}>
        <Drawn ref={set("intake")} geometry={geo.intake} color={SIGNAL} colorB={GLOW} opacity={0.9} window={0.35} pulseColor={WHITE} />
      </group>
      <group ref={(g) => { tiers.current.network = g; }}>
        <instancedMesh ref={inst} args={[undefined, undefined, core.points.length]} material={nodeMat} frustumCulled={false}>
          <sphereGeometry args={[0.062, 8, 6]} />
        </instancedMesh>
        <Drawn ref={set("syn")} geometry={geo.syn} color={GLOW} colorB={VIOLET} opacity={0.75} window={0.6} pulseColor={WHITE} />
      </group>
      <group ref={(g) => { tiers.current.council = g; }}>
        {geo.council.map((c, i) => (
          <group key={c.name}>
            <Solid geometry={geo.ico} drawn={councilRefs[i]} color="#2a1b3a" edge={EDGE} position={[c.center.x, c.center.y, c.center.z]} threshold={1}>
              <Led color={GLOW_SOFT} size={0.07} intensity={2} />
            </Solid>
            <Drawn ref={set(`l${i}`)} geometry={c.lead} color={VIOLET} colorB={GLOW} opacity={0.5} window={0.6} />
            <Html position={[c.center.x, c.center.y + 0.42, c.center.z]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
              <div ref={(el) => { labelRefs.current[i] = el; }} className="machine select-none whitespace-nowrap text-ink" style={{ opacity: 0 }}>{c.name}</div>
            </Html>
          </group>
        ))}
      </group>
      <group ref={(g) => { tiers.current.forecast = g; }}>
        <group ref={forecastG} position={[core.outlet.x, core.outlet.y, core.outlet.z]}>
          <group position={[-core.outlet.x, -core.outlet.y, -core.outlet.z]}>
            {geo.paths.map((g, i) => (
              <Drawn key={i} ref={set(`f${i}`)} geometry={g} color={VIOLET} colorB={WHITE} opacity={0.85} window={0.45} pulseColor={WHITE} />
            ))}
            <Drawn ref={set("ticks")} geometry={geo.ticks} color={EDGE} opacity={0.6} window={0.8} />
            {geo.tickPos.map((pos, i) => (
              <Html key={i} position={[pos.x, pos.y, pos.z]} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
                <div ref={(el) => { tickRefs.current[i] = el; }} className="machine select-none whitespace-nowrap pl-2 text-ink-2" style={{ opacity: 0 }}>{i === 0 ? "+15 min" : "+30 min"}</div>
              </Html>
            ))}
          </group>
        </group>
      </group>
      {/* tier labels, only when exploded */}
      {TIER_LABELS.map(([, text, pos], i) => (
        <Html key={text} position={pos} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div ref={(el) => { tierLabelRefs.current[i] = el; }} className="machine select-none whitespace-nowrap rounded-card border border-hairline bg-paper/90 px-2 py-1 text-ink" style={{ opacity: 0 }}>
            {text}
          </div>
        </Html>
      ))}
    </group>
  );
}
