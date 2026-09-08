"use client";

import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { clamp01, fromPolyline } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE, EDGE_SOFT, GLOW, GLOW_SOFT, SIGNAL, VIOLET, WHITE } from "@/lib/scene/look";
import { pedestal } from "@/lib/scene/pedestal";
import { Drawn, type DrawnMaterial } from "../Drawn";
import { Led, Plinth, Solid } from "../Solid";

/**
 * Hub and spokes — one operational model from the central hospital to the
 * care edge. The hub is the hospital; each spoke is a place ASTA runs:
 * general ward, ICU/HCU, a peripheral centre, a home, a teaching hospital.
 * Data pulses flow inward along the spokes. Click a spoke to select it; the
 * page's readout follows.
 */
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
function merge(list: THREE.BufferGeometry[]) { const flat = list.map((g) => (g.index ? g.toNonIndexed() : g)); return mergeGeometries(flat) ?? flat[0]; }
const at = (g: THREE.BufferGeometry, x: number, y: number, z: number) => { g.translate(x, y, z); return g; };

export const SPOKES = [
  { id: "ward", label: "General ward" },
  { id: "icu", label: "ICU / HCU" },
  { id: "peripheral", label: "Peripheral centre" },
  { id: "home", label: "Hospital-at-home" },
  { id: "teaching", label: "Teaching hospital" },
];
const R = 3.1;
const spokePos = (i: number) => { const a = -Math.PI / 2 + (i / SPOKES.length) * Math.PI * 2; return V(Math.cos(a) * R, 0, Math.sin(a) * R * 0.75); };

function building(kind: string): THREE.BufferGeometry {
  switch (kind) {
    case "ward": return merge([new THREE.BoxGeometry(1.1, 0.5, 0.7), at(new THREE.BoxGeometry(0.3, 0.14, 0.72), -0.3, 0.32, 0), at(new THREE.BoxGeometry(0.3, 0.14, 0.72), 0.3, 0.32, 0)]);
    case "icu": return merge([new THREE.BoxGeometry(0.9, 0.7, 0.7), at(new THREE.BoxGeometry(0.5, 0.2, 0.5), 0, 0.45, 0), at(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), 0.3, 0.75, 0.2)]);
    case "peripheral": return merge([new THREE.BoxGeometry(0.7, 0.45, 0.6), at(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8), 0.25, 0.65, -0.2), at(new THREE.BoxGeometry(0.22, 0.14, 0.04), 0.25, 1.05, -0.2)]);
    case "home": { const roof = new THREE.ConeGeometry(0.55, 0.4, 4); roof.rotateY(Math.PI / 4); return merge([new THREE.BoxGeometry(0.7, 0.5, 0.7), at(roof, 0, 0.45, 0), at(new THREE.BoxGeometry(0.12, 0.25, 0.12), 0.2, 0.7, -0.15)]); }
    default: return merge([new THREE.BoxGeometry(1.3, 0.45, 0.8), at(new THREE.BoxGeometry(0.5, 0.5, 0.5), 0, 0.45, 0), at(new THREE.CylinderGeometry(0.3, 0.3, 0.16, 16), 0, 0.78, 0)]);
  }
}

export function HubObject({ build, explode, fade }: { build: React.RefObject<number>; explode?: React.RefObject<number>; fade: React.RefObject<number> }) {
  const geo = useMemo(() => ({
    hub: merge([new THREE.BoxGeometry(1.6, 1.1, 1.2), at(new THREE.BoxGeometry(0.9, 0.5, 0.8), 0, 0.8, 0), at(new THREE.BoxGeometry(0.5, 0.14, 0.08), 0, 1.15, 0.42), at(new THREE.BoxGeometry(0.14, 0.5, 0.08), 0, 1.15, 0.42)]),
    sites: SPOKES.map((s) => building(s.id)),
    spokes: SPOKES.map((_, i) => { const p = spokePos(i); return fromPolyline([p.clone().multiplyScalar(0.82), V(p.x * 0.5, 0.35, p.z * 0.5), V(0.9 * Math.sign(p.x || 1) * Math.min(0.8, Math.abs(p.x)), 0.2, p.z * 0.25)]); }),
    hit: new THREE.BoxGeometry(1.6, 1.6, 1.4),
  }), []);
  const spokeMats = useRef<(DrawnMaterial | null)[]>([]);
  const hits = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const sel = useRef<number[]>(SPOKES.map(() => 0));
  const camera = useThree((s) => s.camera);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.2);
    const t = s.clock.elapsedTime;
    const b = build.current ?? 1;
    const c = pedestal.controls;
    SPOKES.forEach((_, i) => {
      const on = c.spoke === i ? 1 : 0;
      sel.current[i] += (on - sel.current[i]) * (1 - Math.exp(-5 * dt));
      const L = sel.current[i];
      const m = spokeMats.current[i];
      if (m) {
        m.uniforms.uDraw.value = clamp01((b - 0.35 - i * 0.06) / 0.4);
        m.uniforms.uOpacity.value = 0.35 + 0.6 * L;
        m.uniforms.uPulse.value = ((t * 0.5 + i * 0.2) % 1.5) - 0.25;
        m.uniforms.uPulseWidth.value = 0.05 + 0.05 * L;
      }
      const el = labels.current[i];
      if (el) { el.style.opacity = String(clamp01((b - 0.7) / 0.3) * (0.45 + 0.55 * L) * fade.current); el.style.color = L > 0.5 ? "#F6F2F8" : "#ABA1B8"; }
    });
    const click = pedestal.click;
    if (click) {
      pedestal.click = null;
      ndc.set((click.x / s.size.width) * 2 - 1, -(click.y / s.size.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const meshes = hits.current.filter((m): m is THREE.Mesh => !!m);
      const found = raycaster.intersectObjects(meshes, false)[0];
      if (found) { c.spoke = hits.current.indexOf(found.object as THREE.Mesh); pedestal.version += 1; }
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      <Plinth radius={4.2} position={[0, -0.02, 0]} drawn={build} />
      <Solid geometry={geo.hub} drawn={build} color={BODY_LIGHT} edge={EDGE} threshold={20} position={[0, 0.55, 0]} from={[0, 1.5, 0]} explode={[0, 1.0, 0]} explodeRef={explode}>
        <Led color={GLOW_SOFT} size={0.07} intensity={2} position={[0, 1.42, 0]} />
      </Solid>
      {SPOKES.map((sp, i) => {
        const p = spokePos(i);
        return (
          <group key={sp.id}>
            <Drawn ref={(m) => { spokeMats.current[i] = m; }} geometry={geo.spokes[i]} color={EDGE_SOFT} colorB={GLOW} opacity={0.4} window={0.5} pulseColor={WHITE} />
            <group position={[p.x, 0.25, p.z]}>
              <mesh ref={(m) => { hits.current[i] = m; }} geometry={geo.hit} position={[0, 0.4, 0]} visible={false} />
              <Solid geometry={geo.sites[i]} drawn={build} color={BODY} edge={EDGE} threshold={20} delay={0.3 + i * 0.06} span={0.5} from={[p.x * 0.4, 0.8, p.z * 0.4]} explode={[p.x * 0.35, 0.5, p.z * 0.35]} explodeRef={explode}>
                <Led color={i === 1 ? GLOW_SOFT : SIGNAL} size={0.05} intensity={1.6} position={[0.25, 0.45, 0.3]} />
              </Solid>
              <Html position={[0, -0.35, 0.5]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
                <div ref={(el) => { labels.current[i] = el; }} className="machine select-none whitespace-nowrap" style={{ opacity: 0 }}>{sp.label}</div>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
}
