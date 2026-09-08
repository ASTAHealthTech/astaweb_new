"use client";

import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp01 } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE, GLOW, GLOW_SOFT, SIGNAL } from "@/lib/scene/look";
import { pedestal } from "@/lib/scene/pedestal";
import { bedParts, bedPositionOf } from "@/lib/scene/ward";
import { Led, Solid } from "../Solid";

/**
 * The ward as one operable object.
 *
 *   beds     6 → 24 from the controls; rows of three
 *   click    a bed flips critical ↔ stable (the DOM pedestal forwards the
 *            pointer; we raycast against invisible hit boxes)
 *   explode  each bed lifts its monitor and unit off the pole
 *   without  ASTA: the critical LEDs run a slower, later alarm cadence
 */
const MAX = 24;

export function WardObject({ build, explode, fade }: { build: React.RefObject<number>; explode?: React.RefObject<number>; fade: React.RefObject<number> }) {
  const parts = useMemo(() => bedParts(), []);
  const hit = useMemo(() => new THREE.BoxGeometry(1.2, 1.8, 2.2), []);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const hits = useRef<(THREE.Mesh | null)[]>([]);
  const leds = useRef<(THREE.Mesh | null)[]>([]);
  const tags = useRef<(HTMLDivElement | null)[]>([]);
  const camera = useThree((s) => s.camera);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const bedDrawn = useMemo(() => Array.from({ length: MAX }, () => ({ current: 0 })), []);
  const shown = useRef(0);

  // the click: from window coordinates to a bed
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.2);
    const c = pedestal.controls;
    const n = Math.max(1, Math.min(MAX, Math.round(c.beds)));
    shown.current += (n - shown.current) * (1 - Math.exp(-6 * dt));
    const t = state.clock.elapsedTime;
    const scale = Math.sqrt(6 / n);

    for (let i = 0; i < MAX; i += 1) {
      const g = groups.current[i];
      const visible = i < n;
      bedDrawn[i].current = visible ? Math.min(1, bedDrawn[i].current + dt / 1.2) * clamp01((build.current ?? 1) * 1.3) : Math.max(0, bedDrawn[i].current - dt / 0.5);
      if (!g) continue;
      g.visible = bedDrawn[i].current > 0.01;
      const p = bedPositionOf(i, n);
      g.position.set(p.x * scale, 0, p.z * scale);
      g.scale.setScalar(scale);
      const crit = c.crit.has(i);
      const led = leds.current[i];
      if (led) {
        const m = led.material as THREE.MeshStandardMaterial;
        // with ASTA the critical bed pulses early and steadily; without, it
        // waits, then blares
        const cadence = c.withAsta ? 1.4 : 0.5;
        const pulse = crit ? 0.6 + 0.4 * Math.max(0, Math.sin(t * cadence * 2 + i)) : 0.35;
        m.emissiveIntensity = (crit ? 2.4 : 1.1) * pulse;
        m.color.set(crit ? GLOW_SOFT : SIGNAL);
        m.emissive.set(crit ? GLOW_SOFT : SIGNAL);
      }
      const el = tags.current[i];
      if (el) {
        el.style.opacity = String(clamp01((bedDrawn[i].current - 0.7) / 0.3) * fade.current * (n > 12 ? 0 : 1));
        const state = el.lastElementChild as HTMLElement | null;
        if (state && state.dataset.crit !== (crit ? "1" : "0")) {
          state.dataset.crit = crit ? "1" : "0";
          state.textContent = crit ? "CRIT" : "OK";
          state.style.color = crit ? "#ff5fb0" : "#34D399";
        }
      }
    }
    // pointer → ray → bed, when the pedestal reports a click
    const click = pedestal.click;
    if (click) {
      pedestal.click = null;
      ndc.set((click.x / state.size.width) * 2 - 1, -(click.y / state.size.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const meshes = hits.current.filter((m, i): m is THREE.Mesh => !!m && i < n);
      const found = raycaster.intersectObjects(meshes, false)[0];
      if (found) {
        const idx = hits.current.indexOf(found.object as THREE.Mesh);
        if (c.crit.has(idx)) c.crit.delete(idx); else c.crit.add(idx);
        pedestal.version += 1;
      }
    }
  });

  return (
    <group>
      {Array.from({ length: MAX }, (_, i) => (
        <group key={i} ref={(g) => { groups.current[i] = g; }}>
          <mesh ref={(m) => { hits.current[i] = m; }} geometry={hit} position={[0.1, 0.6, 0]} visible={false} />
          <Solid geometry={parts.frame} drawn={bedDrawn[i]} color={BODY} edge={EDGE} threshold={20} from={[0, 1.2, 0]} />
          <Solid geometry={parts.pole} drawn={bedDrawn[i]} color={BODY_LIGHT} edge={EDGE} threshold={20} delay={0.1} span={0.9} explode={[0, 0.5, 0]} explodeRef={explode} />
          <Solid geometry={parts.monitor} drawn={bedDrawn[i]} color={BODY} edge={EDGE} threshold={20} delay={0.2} span={0.8} explode={[0.5, 1.2, 0]} explodeRef={explode}>
            <Led color={SIGNAL} size={0.05} intensity={1.2} position={[0.68, 0.95, -0.84]} />
          </Solid>
          <Solid geometry={parts.unit} drawn={bedDrawn[i]} color="#2a1b3a" edge={EDGE} threshold={20} delay={0.3} span={0.7} explode={[0.2, 2.0, 0.5]} explodeRef={explode}>
            <mesh ref={(m) => { leds.current[i] = m; }} position={[0.62, 1.4, -0.57]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color={GLOW} emissive={GLOW} emissiveIntensity={1.6} toneMapped={false} transparent />
            </mesh>
          </Solid>
          <Html position={[-0.55, 0.9, 0.9]} zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
            <div ref={(el) => { tags.current[i] = el; }} className="select-none whitespace-nowrap rounded-card border border-hairline bg-paper/90 px-2 py-1" style={{ opacity: 0 }}>
              <span className="machine text-ink">Bed {String(i + 1).padStart(2, "0")}</span>
              <span className="machine ml-2" style={{ color: "#34D399" }}>OK</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
