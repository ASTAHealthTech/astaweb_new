"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { clamp01, fromPolyline } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE, EDGE_SOFT, GLOW, GLOW_SOFT, SIGNAL, VIOLET, WHITE } from "@/lib/scene/look";
import { pedestal } from "@/lib/scene/pedestal";
import { Drawn, type DrawnMaterial } from "../Drawn";
import { Led, Solid } from "../Solid";

/**
 * The escalation switchboard.
 *
 * A signal leaves the bed at the bottom and is routed up through pipes to
 * the right person: the nurse station, the ward doctor, the rapid-response
 * team — and at night, the on-call doctor. Severity and shift are the live
 * controls; the lit pipe is the route ASTA would take, with the context
 * packet riding along it.
 */
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
function merge(list: THREE.BufferGeometry[]) { const flat = list.map((g) => (g.index ? g.toNonIndexed() : g)); return mergeGeometries(flat) ?? flat[0]; }
const at = (g: THREE.BufferGeometry, x: number, y: number, z: number) => { g.translate(x, y, z); return g; };

export const DESTS = [
  { id: "nurse", label: "Nurse station", pos: V(-2.4, 2.2, 0) },
  { id: "doctor", label: "Ward doctor", pos: V(-0.8, 2.2, 0) },
  { id: "oncall", label: "On-call doctor", pos: V(0.8, 2.2, 0) },
  { id: "rrt", label: "Rapid response", pos: V(2.4, 2.2, 0) },
];
const SOURCE = V(0, -1.6, 0);
const JUNCTION = V(0, 0.2, 0);

/** which destinations light for a severity / shift — the routing rule */
export function route(severity: number, night: boolean): number[] {
  if (severity >= 2) return night ? [0, 2, 3] : [0, 1, 3];
  if (severity === 1) return night ? [0, 2] : [0, 1];
  return [0];
}

export function SwitchboardObject({ build, explode, fade }: { build: React.RefObject<number>; explode?: React.RefObject<number>; fade: React.RefObject<number> }) {
  const geo = useMemo(() => {
    const bed = merge([new THREE.BoxGeometry(1.0, 0.12, 0.6), at(new THREE.BoxGeometry(1.0, 0.36, 0.06), 0, 0.2, -0.3), at(new THREE.BoxGeometry(0.06, 1.0, 0.06), 0.42, 0.5, -0.28), at(new THREE.BoxGeometry(0.34, 0.24, 0.08), 0.42, 0.85, -0.25)]);
    const console_ = merge([new THREE.BoxGeometry(1.6, 0.9, 0.5), at(new THREE.BoxGeometry(1.3, 0.5, 0.06), 0, 0.1, 0.27)]);
    const station = merge([new THREE.BoxGeometry(0.9, 0.55, 0.45), at(new THREE.BoxGeometry(0.7, 0.35, 0.04), 0, 0.05, 0.24)]);
    // the pipes: source → junction, junction → each destination, as polylines with a bend
    const pipes = DESTS.map((d) => fromPolyline([JUNCTION.clone(), V(d.pos.x * 0.55, 1.1, 0), V(d.pos.x, 1.75, 0)]));
    const trunk = fromPolyline([V(SOURCE.x, SOURCE.y + 0.5, 0), V(0, -0.4, 0), JUNCTION.clone()]);
    return { bed, console_, station, pipes, trunk };
  }, []);
  const pipeMats = useRef<(DrawnMaterial | null)[]>([]);
  const trunkMat = useRef<DrawnMaterial>(null);
  const stationLeds = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const packet = useRef<THREE.Mesh>(null);
  const lit = useRef<number[]>(DESTS.map(() => 0));

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.2);
    const t = s.clock.elapsedTime;
    const b = build.current ?? 1;
    const c = pedestal.controls;
    const active = route(Math.round(c.severity), c.night);
    if (trunkMat.current) { trunkMat.current.uniforms.uDraw.value = clamp01((b - 0.3) / 0.4); trunkMat.current.uniforms.uPulse.value = ((t * 0.7) % 1.6) - 0.3; }
    DESTS.forEach((d, i) => {
      const on = active.includes(i) ? 1 : 0;
      lit.current[i] += (on - lit.current[i]) * (1 - Math.exp(-5 * dt));
      const L = lit.current[i];
      const m = pipeMats.current[i];
      if (m) {
        m.uniforms.uDraw.value = clamp01((b - 0.45 - i * 0.05) / 0.4);
        m.uniforms.uOpacity.value = 0.25 + 0.7 * L;
        m.uniforms.uPulse.value = L > 0.5 ? (((t * 0.7 - 0.5) % 1.6) - 0.3) : -1;
      }
      const led = stationLeds.current[i];
      if (led) {
        const mat = led.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.25 + L * (1.6 + 0.8 * Math.max(0, Math.sin(t * 2.2 + i)));
        mat.color.set(i === 3 ? GLOW_SOFT : i === 2 ? SIGNAL : VIOLET);
        mat.emissive.set(i === 3 ? GLOW_SOFT : i === 2 ? SIGNAL : VIOLET);
      }
      const el = labels.current[i];
      if (el) { el.style.opacity = String(clamp01((b - 0.7) / 0.3) * (0.4 + 0.6 * L) * fade.current); el.style.color = L > 0.5 ? "#F6F2F8" : "#7C7189"; }
    });
    // the context packet: rides the trunk then the highest-priority lit pipe
    if (packet.current) {
      const ph = (t * 0.45) % 1;
      const target = active[active.length - 1] ?? 0;
      const d = DESTS[target];
      if (ph < 0.4) {
        const u = ph / 0.4;
        packet.current.position.lerpVectors(V(SOURCE.x, SOURCE.y + 0.5, 0), JUNCTION, u);
      } else {
        const u = (ph - 0.4) / 0.6;
        const mid = V(d.pos.x * 0.55, 1.1, 0);
        if (u < 0.5) packet.current.position.lerpVectors(JUNCTION, mid, u * 2); else packet.current.position.lerpVectors(mid, V(d.pos.x, 1.75, 0), (u - 0.5) * 2);
      }
      (packet.current.material as THREE.MeshStandardMaterial).userData.baseOpacity = clamp01((b - 0.8) / 0.2);
    }
  });

  const ex = explode;
  return (
    <group position={[0, -0.3, 0]}>
      {/* the bed — where the signal starts */}
      <Solid geometry={geo.bed} drawn={build} color={BODY} edge={EDGE} threshold={20} position={[SOURCE.x, SOURCE.y, SOURCE.z]} from={[0, -1, 0]} explode={[0, -0.8, 0]} explodeRef={ex}>
        <Led color={SIGNAL} size={0.06} intensity={1.6} position={[0.42, 0.85, -0.2]} />
      </Solid>
      {/* the switchboard console at the junction */}
      <Solid geometry={geo.console_} drawn={build} color={BODY_LIGHT} edge={EDGE} threshold={20} position={[JUNCTION.x, JUNCTION.y, JUNCTION.z]} delay={0.2} span={0.6} explode={[0, 0, 1.2]} explodeRef={ex} />
      <Drawn ref={trunkMat} geometry={geo.trunk} color={SIGNAL} colorB={GLOW} opacity={0.9} window={0.5} pulseColor={WHITE} />
      {DESTS.map((d, i) => (
        <group key={d.id}>
          <Drawn ref={(m) => { pipeMats.current[i] = m; }} geometry={geo.pipes[i]} color={EDGE_SOFT} colorB={i === 3 ? GLOW_SOFT : VIOLET} opacity={0.3} window={0.5} pulseColor={WHITE} />
          <Solid geometry={geo.station} drawn={build} color={BODY} edge={EDGE} threshold={20} position={[d.pos.x, d.pos.y, d.pos.z]} delay={0.5 + i * 0.05} span={0.45} explode={[d.pos.x * 0.3, 0.8, 0]} explodeRef={ex}>
            <mesh ref={(m) => { stationLeds.current[i] = m; }} position={[0, 0.05, 0.27]}>
              <planeGeometry args={[0.6, 0.28]} />
              <meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={0.3} toneMapped={false} transparent />
            </mesh>
          </Solid>
          <Html position={[d.pos.x, d.pos.y + 0.6, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <div ref={(el) => { labels.current[i] = el; }} className="machine select-none whitespace-nowrap" style={{ opacity: 0 }}>{d.label}</div>
          </Html>
        </group>
      ))}
      <mesh ref={packet}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color={WHITE} emissive={GLOW_SOFT} emissiveIntensity={2} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}
