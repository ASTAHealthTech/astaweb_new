"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { clamp01, fromPolyline, fromSegments } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE, EDGE_SOFT, GLOW, GLOW_SOFT, SIGNAL, VIOLET, WHITE } from "@/lib/scene/look";
import { Drawn, type DrawnMaterial } from "../Drawn";
import { Led, Solid } from "../Solid";

/**
 * The section objects — one distinct form per idea, none of them a repeat
 * of the hero's. Each takes the same two refs: `drawn` (0 → 1 build-in) and
 * `fade` (stage visibility, for DOM labels). All live inside a unit-ish box;
 * GroundStage scales them to their anchor.
 */

type P = { drawn: React.RefObject<number>; fade: React.RefObject<number> };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const ALARM = "#f0564a";

function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const flat = list.map((g) => (g.index ? g.toNonIndexed() : g));
  return mergeGeometries(flat) ?? flat[0];
}
const at = (g: THREE.BufferGeometry, x: number, y: number, z: number) => { g.translate(x, y, z); return g; };
/** an emissive material the stage can fade */
function glowMat(color: string, intensity = 1.4) {
  const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, toneMapped: false, transparent: true });
  m.userData.baseOpacity = 1;
  return m;
}

/* ── 1 · The Eye — pixels become numbers ─────────────────────────────────── */
export function Eye({ drawn }: P) {
  const geo = useMemo(() => {
    const lens = merge([at(new THREE.CylinderGeometry(0.22, 0.26, 0.5, 14).rotateZ(Math.PI / 2), -1.5, 0.3, 0)]);
    const cone = new THREE.ConeGeometry(0.95, 2.4, 24, 1, true);
    cone.rotateZ(-Math.PI / 2);
    cone.translate(-0.05, 0.3, 0);
    const plane = at(new THREE.BoxGeometry(0.06, 1.7, 2.3), 1.25, 0.3, 0);
    return { lens, cone, plane };
  }, []);
  const coneMat = useMemo(() => { const m = new THREE.MeshStandardMaterial({ color: VIOLET, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }); m.userData.baseOpacity = 0.12; return m; }, []);
  const pix = useRef<THREE.InstancedMesh>(null);
  const rows = useRef<(THREE.Mesh | null)[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pixMat = useMemo(() => glowMat(SIGNAL, 0.6), []);
  const rowMats = useMemo(() => [SIGNAL, GLOW, VIOLET].map((c) => glowMat(c, 0.9)), []);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const d = drawn.current ?? 1;
    coneMat.userData.baseOpacity = 0.12 * clamp01((d - 0.4) / 0.4) * (0.8 + 0.2 * Math.sin(t * 2));
    if (pix.current) {
      // a 6×4 grid of pixels on the plane; a scan lights them column by column
      let i = 0;
      for (let c = 0; c < 6; c += 1) for (let r = 0; r < 4; r += 1) {
        dummy.position.set(1.19, 0.9 - r * 0.4, -0.9 + c * 0.36);
        const lit = ((t * 1.6) % 6) > c ? 1 : 0.25;
        dummy.scale.set(1, 0.24 * lit + 0.06, 0.24 * lit + 0.06);
        dummy.updateMatrix();
        pix.current.setMatrixAt(i++, dummy.matrix);
      }
      pix.current.instanceMatrix.needsUpdate = true;
      pixMat.userData.baseOpacity = clamp01((d - 0.5) / 0.4);
    }
    // three rows drop out of the plane and stack below, on a loop
    rows.current.forEach((m, k) => {
      if (!m) return;
      const ph = ((t * 0.5 + k * 0.33) % 1);
      m.position.set(1.25, -0.75 - k * 0.22 + (1 - ph) * 0.9, 0);
      (m.material as THREE.MeshStandardMaterial).userData.baseOpacity = clamp01((d - 0.7) / 0.3) * Math.min(1, ph * 3) * (1 - Math.pow(ph, 6));
    });
  });
  return (
    <group position={[0.1, 0.3, 0]}>
      <Solid geometry={geo.lens} drawn={drawn} color="#1a1024" edge={SIGNAL} threshold={20}>
        <Led color={SIGNAL} size={0.12} intensity={1.2} position={[-1.26, 0.3, 0]} />
      </Solid>
      <mesh geometry={geo.cone} material={coneMat} />
      <Solid geometry={geo.plane} drawn={drawn} color={BODY} edge={EDGE} threshold={20} delay={0.2} span={0.6} />
      <instancedMesh ref={pix} args={[undefined, undefined, 24]} material={pixMat} frustumCulled={false}>
        <boxGeometry args={[0.04, 1, 1]} />
      </instancedMesh>
      {[0, 1, 2].map((k) => (
        <mesh key={k} ref={(m) => { rows.current[k] = m; }} material={rowMats[k]}>
          <boxGeometry args={[0.05, 0.08, 1.6 - k * 0.2]} />
        </mesh>
      ))}
    </group>
  );
}

/* ── 2 · The Rail — one packet, five stations, five shapes ───────────────── */
const STATIONS = ["capture", "extract", "reason", "alert", "review"];
export function Rail({ drawn, fade }: P) {
  const geo = useMemo(() => {
    const rail = at(new THREE.BoxGeometry(4.6, 0.06, 0.16), 0, -0.4, 0);
    const posts: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 5; i += 1) posts.push(at(new THREE.BoxGeometry(0.08, 0.5, 0.08), -2 + i, -0.68, 0));
    return { rail: merge([rail, ...posts]) };
  }, []);
  const shapes = useRef<(THREE.Group | null)[]>([]);
  const packet = useRef<THREE.Group>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const d = drawn.current ?? 1;
    // dwell 1.2 s at each station, glide 0.6 s between
    const cycle = (t * 0.9) % 5;
    const i = Math.floor(cycle), f = cycle - i;
    const glide = clamp01((f - 0.6) / 0.4);
    const e = glide < 0.5 ? 4 * glide ** 3 : 1 - Math.pow(-2 * glide + 2, 3) / 2;
    if (packet.current) {
      packet.current.position.set(-2 + i + e, -0.05 + Math.sin(e * Math.PI) * 0.25, 0);
      packet.current.rotation.y = t * 0.8;
    }
    shapes.current.forEach((g, k) => {
      if (!g) return;
      const cur = glide < 0.5 ? i : (i + 1) % 5;
      const on = k === cur ? 1 : 0;
      const sc = on * (1 - Math.abs(glide - 0.5) * 0.6);
      g.scale.setScalar(Math.max(0.001, sc));
      g.visible = sc > 0.01;
    });
    labels.current.forEach((el, k) => { if (el) el.style.opacity = String((k === i ? 1 : 0.35) * clamp01((d - 0.6) / 0.3) * fade.current); });
  });
  return (
    <group position={[0, 0.15, 0]}>
      <Solid geometry={geo.rail} drawn={drawn} color={BODY_LIGHT} edge={EDGE_SOFT} threshold={20} />
      <group ref={packet}>
        <group ref={(g) => { shapes.current[0] = g; }}><mesh material={glowMat(SIGNAL, 0.5)}><boxGeometry args={[0.36, 0.26, 0.02]} /></mesh></group>
        <group ref={(g) => { shapes.current[1] = g; }}>{[0, 1, 2].map((r) => <mesh key={r} position={[0, 0.12 - r * 0.12, 0]} material={glowMat(SIGNAL, 0.7)}><boxGeometry args={[0.4, 0.05, 0.05]} /></mesh>)}</group>
        <group ref={(g) => { shapes.current[2] = g; }}>{[[0, 0.12, 0], [-0.12, -0.08, 0.06], [0.12, -0.08, -0.06], [0, -0.02, 0.14]].map((p, r) => <mesh key={r} position={p as [number, number, number]} material={glowMat(GLOW, 1.2)}><sphereGeometry args={[0.06, 8, 6]} /></mesh>)}</group>
        <group ref={(g) => { shapes.current[3] = g; }}><mesh material={glowMat(GLOW_SOFT, 1.6)}><octahedronGeometry args={[0.2, 0]} /></mesh></group>
        <group ref={(g) => { shapes.current[4] = g; }}><mesh material={glowMat(VIOLET, 0.9)}><boxGeometry args={[0.42, 0.3, 0.06]} /></mesh></group>
      </group>
      {STATIONS.map((name, k) => (
        <Html key={name} position={[-2 + k, -1.05, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
          <div ref={(el) => { labels.current[k] = el; }} className="machine select-none text-ink-2" style={{ opacity: 0 }}>{name}</div>
        </Html>
      ))}
    </group>
  );
}

/* ── 4 · The Heartbeat Ribbon — a day of ECG as a spiral ─────────────────── */
export function Ribbon({ drawn }: P) {
  const { geo, edges } = useMemo(() => {
    const N = 1400, turns = 3.2, R = 1.15, W = 0.09;
    const pos: number[] = [], col: number[] = [], idx: number[] = [];
    const violet = new THREE.Color(VIOLET), pink = new THREE.Color(GLOW_SOFT), base = new THREE.Color("#3a2450");
    const beat = (u: number) => { const ph = (u * 220) % 1; return ph < 0.06 ? Math.sin((ph / 0.06) * Math.PI) * 0.22 : ph < 0.1 ? -Math.sin(((ph - 0.06) / 0.04) * Math.PI) * 0.08 : ph > 0.3 && ph < 0.42 ? Math.sin(((ph - 0.3) / 0.12) * Math.PI) * 0.05 : 0; };
    const alert = (u: number) => (u > 0.36 && u < 0.41) || (u > 0.72 && u < 0.75);
    for (let i = 0; i <= N; i += 1) {
      const u = i / N, a = u * turns * Math.PI * 2, y = -1.1 + u * 2.2;
      const r = R + beat(u);
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      pos.push(x, y - W, z, x, y + W, z);
      const c = alert(u) ? pink : Math.abs(beat(u)) > 0.1 ? violet : base;
      col.push(c.r, c.g, c.b, c.r, c.g, c.b);
      if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    // the outer edge as a drawn line, so it draws itself in
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= N; i += 7) pts.push(V(pos[i * 6 + 3], pos[i * 6 + 4], pos[i * 6 + 5]));
    return { geo: g, edges: fromPolyline(pts) };
  }, []);
  const mat = useMemo(() => { const m = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.5, metalness: 0.3, emissive: new THREE.Color(VIOLET), emissiveIntensity: 0.15, transparent: true }); m.userData.baseOpacity = 0; return m; }, []);
  const line = useRef<DrawnMaterial>(null);
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    const d = drawn.current ?? 1;
    if (line.current) { line.current.uniforms.uDraw.value = clamp01(d / 0.7); line.current.uniforms.uPulse.value = ((s.clock.elapsedTime * 0.25) % 1.3) - 0.15; }
    mat.userData.baseOpacity = clamp01((d - 0.35) / 0.5);
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.25;
  });
  return (
    <group ref={g} position={[0, 0.2, 0]}>
      <mesh geometry={geo} material={mat} />
      <Drawn ref={line} geometry={edges} color={EDGE} colorB={GLOW_SOFT} opacity={0.7} window={0.4} pulseColor={WHITE} />
    </group>
  );
}

/* ── 5 · Alarm rain vs one alert ─────────────────────────────────────────── */
export function Alarms({ drawn, fade }: P) {
  const rain = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => Array.from({ length: 36 }, (_, i) => ({ x: -1.6 + ((i * 0.37) % 1.3), z: ((i * 0.61) % 0.8) - 0.4, o: (i * 0.173) % 1, s: 0.6 + ((i * 0.29) % 0.6) })), []);
  const rainMat = useMemo(() => glowMat(ALARM, 0.9), []);
  const alertMat = useMemo(() => glowMat(GLOW_SOFT, 1.8), []);
  const label = useRef<HTMLDivElement>(null);
  const label2 = useRef<HTMLDivElement>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    if (rain.current) {
      seeds.forEach((sd, i) => {
        const ph = (t * sd.s * 0.35 + sd.o) % 1;
        dummy.position.set(sd.x, 1.3 - ph * 2.5, sd.z);
        dummy.scale.setScalar(0.7 + 0.3 * Math.sin(i));
        dummy.updateMatrix();
        rain.current!.setMatrixAt(i, dummy.matrix);
      });
      rain.current.instanceMatrix.needsUpdate = true;
      rainMat.userData.baseOpacity = clamp01((d - 0.3) / 0.4) * 0.9;
    }
    alertMat.emissiveIntensity = 1.4 + 0.6 * Math.max(0, Math.sin(t * 1.2));
    const o = clamp01((d - 0.6) / 0.3) * fade.current;
    if (label.current) label.current.style.opacity = String(o);
    if (label2.current) label2.current.style.opacity = String(o);
  });
  const divider = useMemo(() => fromSegments([[V(0, -1.4, 0), V(0, 1.5, 0)]]), []);
  const div = useRef<DrawnMaterial>(null);
  useFrame(() => { if (div.current) div.current.uniforms.uDraw.value = clamp01((drawn.current ?? 1) / 0.5); });
  return (
    <group position={[0, 0.1, 0]}>
      <instancedMesh ref={rain} args={[undefined, undefined, 36]} material={rainMat} frustumCulled={false}>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
      </instancedMesh>
      <Drawn ref={div} geometry={divider} color={EDGE_SOFT} opacity={0.6} window={0.8} />
      <group position={[1.05, 0.2, 0]}>
        <mesh material={alertMat}><octahedronGeometry args={[0.28, 0]} /></mesh>
        {[0, 1, 2].map((k) => (
          <mesh key={k} position={[0, -0.55 - k * 0.2, 0]} material={glowMat([SIGNAL, VIOLET, EDGE][k], 0.6)}>
            <boxGeometry args={[0.9 - k * 0.15, 0.06, 0.06]} />
          </mesh>
        ))}
      </group>
      <Html position={[-1, -1.7, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={label} className="machine select-none whitespace-nowrap text-ink-3" style={{ opacity: 0 }}>threshold alarms</div>
      </Html>
      <Html position={[1.05, -1.7, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={label2} className="machine select-none whitespace-nowrap text-ink" style={{ opacity: 0 }}>one alert · with context</div>
      </Html>
    </group>
  );
}

/* ── 6 · The Cage — numbers leave, faces do not ──────────────────────────── */
export function Cage({ drawn }: P) {
  const geo = useMemo(() => ({
    block: merge([new THREE.BoxGeometry(0.8, 0.8, 0.8), at(new THREE.BoxGeometry(0.5, 0.14, 0.1), 0, 0.15, 0.42), at(new THREE.BoxGeometry(0.14, 0.5, 0.1), 0, 0.15, 0.42)]),
    cage: new THREE.BoxGeometry(2.2, 2.2, 2.2, 4, 4, 4),
  }), []);
  const digits = useRef<THREE.InstancedMesh>(null);
  const face = useRef<THREE.Mesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const digMat = useMemo(() => glowMat(SIGNAL, 1.1), []);
  const faceMat = useMemo(() => glowMat(GLOW, 1.2), []);
  const dirs = useMemo(() => Array.from({ length: 14 }, (_, i) => V(Math.cos(i * 2.4), Math.sin(i * 1.7) * 0.6, Math.sin(i * 2.4)).normalize()), []);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    if (digits.current) {
      dirs.forEach((dir, i) => {
        const ph = (t * 0.35 + i * 0.071) % 1;
        dummy.position.copy(dir).multiplyScalar(0.5 + ph * 1.9);
        dummy.scale.setScalar(1 - ph * 0.6);
        dummy.updateMatrix();
        digits.current!.setMatrixAt(i, dummy.matrix);
      });
      digits.current.instanceMatrix.needsUpdate = true;
      digMat.userData.baseOpacity = clamp01((d - 0.5) / 0.4);
    }
    if (face.current) {
      // toward the bars, bounce back: never leaves
      const ph = (t * 0.6) % 1;
      const r = 0.55 + Math.sin(ph * Math.PI) * 0.5;
      face.current.position.set(r * 0.7, 0.2 + r * 0.3, r * 0.7);
      faceMat.userData.baseOpacity = clamp01((d - 0.5) / 0.4);
    }
  });
  return (
    <group position={[0, 0.3, 0]} rotation={[0.2, 0.6, 0]}>
      <Solid geometry={geo.block} drawn={drawn} color="#2a1b3a" edge={GLOW} threshold={20} emissive={GLOW} emissiveIntensity={0.15} />
      <Solid geometry={geo.cage} drawn={drawn} color={VIOLET} bodyOpacity={0.06} edge={EDGE} edgeOpacity={0.85} threshold={1} delay={0.15} span={0.7}>
        {/* the bars are the edges; the body must not hide what is inside */}
      </Solid>
      <instancedMesh ref={digits} args={[undefined, undefined, 14]} material={digMat} frustumCulled={false}>
        <boxGeometry args={[0.07, 0.1, 0.03]} />
      </instancedMesh>
      <mesh ref={face} material={faceMat}>
        <sphereGeometry args={[0.13, 10, 8]} />
      </mesh>
    </group>
  );
}

/* ── 8 · Attention grid — which readings the model looks at ──────────────── */
export function Attention({ drawn, fade }: P) {
  const N = 8;
  const tokens = useMemo(() => new THREE.BoxGeometry(0.22, 0.22, 0.22), []);
  const topMat = useMemo(() => glowMat(SIGNAL, 0.5), []);
  const botMat = useMemo(() => glowMat(VIOLET, 0.7), []);
  const { lines, colors } = useMemo(() => {
    const pos = new Float32Array(N * N * 6), col = new Float32Array(N * N * 6);
    let k = 0;
    for (let i = 0; i < N; i += 1) for (let j = 0; j < N; j += 1) {
      pos.set([-1.75 + i * 0.5, 0.75, 0, -1.75 + j * 0.5, -0.75, 0], k * 6);
      k += 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return { lines: g, colors: col };
  }, []);
  const lineMat = useMemo(() => { const m = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }); m.userData.baseOpacity = 0.9; return m; }, []);
  const pink = useMemo(() => new THREE.Color(GLOW_SOFT), []);
  const label = useRef<HTMLDivElement>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    // each top token attends to a moving neighbourhood on the bottom row
    const focus = (i: number) => (i + 2 * Math.sin(t * 0.7 + i) + N) % N;
    let k = 0;
    for (let i = 0; i < N; i += 1) for (let j = 0; j < N; j += 1) {
      const dist = Math.min(Math.abs(j - focus(i)), N - Math.abs(j - focus(i)));
      const w = Math.exp(-dist * dist * 0.8) * clamp01((d - 0.4) / 0.4);
      colors[k * 6] = pink.r * w; colors[k * 6 + 1] = pink.g * w; colors[k * 6 + 2] = pink.b * w;
      colors[k * 6 + 3] = pink.r * w * 0.6; colors[k * 6 + 4] = pink.g * w * 0.6; colors[k * 6 + 5] = pink.b * w * 0.6;
      k += 1;
    }
    lines.attributes.color.needsUpdate = true;
    if (label.current) label.current.style.opacity = String(clamp01((d - 0.7) / 0.3) * fade.current);
  });
  return (
    <group position={[0, 0.25, 0]}>
      {Array.from({ length: N }, (_, i) => (
        <group key={i}>
          <mesh geometry={tokens} material={topMat} position={[-1.75 + i * 0.5, 0.75, 0]} />
          <mesh geometry={tokens} material={botMat} position={[-1.75 + i * 0.5, -0.75, 0]} />
        </group>
      ))}
      <lineSegments geometry={lines} material={lineMat} frustumCulled={false} />
      <Html position={[0, -1.35, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={label} className="machine select-none whitespace-nowrap text-ink-3" style={{ opacity: 0 }}>readings · t−15 → now &nbsp;·&nbsp; attention → what the model weighs</div>
      </Html>
    </group>
  );
}

/* ── 9 · The Landscape — a patient's path across the embedding ───────────── */
export function Landscape({ drawn }: P) {
  const height = (x: number, z: number) => -0.9 * Math.exp(-((x - 0.6) ** 2 + (z + 0.3) ** 2) * 0.9) + 0.25 * Math.sin(x * 1.7) * Math.cos(z * 1.3) + 0.15 * Math.exp(-((x + 1.2) ** 2 + (z - 1) ** 2));
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(4.2, 3.4, 42, 34);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i += 1) p.setY(i, height(p.getX(i), p.getZ(i)));
    g.computeVertexNormals();
    // contour-ish lines: every 4th row and column
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let r = 0; r <= 34; r += 4) for (let c = 0; c < 42; c += 1) {
      const i = r * 43 + c;
      segs.push([V(p.getX(i), p.getY(i) + 0.005, p.getZ(i)), V(p.getX(i + 1), p.getY(i + 1) + 0.005, p.getZ(i + 1))]);
    }
    for (let c = 0; c <= 42; c += 6) for (let r = 0; r < 34; r += 1) {
      const i = r * 43 + c;
      segs.push([V(p.getX(i), p.getY(i) + 0.005, p.getZ(i)), V(p.getX(i + 43), p.getY(i + 43) + 0.005, p.getZ(i + 43))]);
    }
    // the path: gradient descent from the far corner into the basin
    const pts: THREE.Vector3[] = [];
    let x = -1.7, z = 1.3;
    for (let i = 0; i < 60; i += 1) {
      pts.push(V(x, height(x, z) + 0.04, z));
      const gx = (height(x + 0.01, z) - height(x - 0.01, z)) / 0.02, gz = (height(x, z + 0.01) - height(x, z - 0.01)) / 0.02;
      const n = Math.hypot(gx, gz) || 1;
      x -= (gx / n) * 0.06; z -= (gz / n) * 0.06;
    }
    return { surface: g, grid: fromSegments(segs), path: fromPolyline(pts), end: pts[pts.length - 1] };
  }, []);
  const mat = useMemo(() => { const m = new THREE.MeshStandardMaterial({ color: "#221533", roughness: 0.6, metalness: 0.25, emissive: new THREE.Color(VIOLET), emissiveIntensity: 0.08, transparent: true, polygonOffset: true, polygonOffsetFactor: 1 }); m.userData.baseOpacity = 0; return m; }, []);
  const grid = useRef<DrawnMaterial>(null);
  const path = useRef<DrawnMaterial>(null);
  useFrame((s) => {
    const d = drawn.current ?? 1;
    mat.userData.baseOpacity = clamp01(d / 0.5);
    if (grid.current) grid.current.uniforms.uDraw.value = clamp01(d / 0.7);
    if (path.current) { path.current.uniforms.uDraw.value = clamp01((d - 0.4) / 0.5); path.current.uniforms.uPulse.value = ((s.clock.elapsedTime * 0.3) % 1.4) - 0.2; }
  });
  return (
    <group position={[0, -0.1, 0]} rotation={[0.15, 0.4, 0]}>
      <mesh geometry={geo.surface} material={mat} />
      <Drawn ref={grid} geometry={geo.grid} color={EDGE} opacity={0.7} window={0.5} />
      <Drawn ref={path} geometry={geo.path} color={SIGNAL} colorB={GLOW_SOFT} opacity={1} window={0.4} pulseColor={WHITE} />
      <Led color={GLOW_SOFT} size={0.07} intensity={2} position={[geo.end.x, geo.end.y + 0.05, geo.end.z]} />
    </group>
  );
}

/* ── 11 · The Balance — certified glass vs a wrist estimate ──────────────── */
export function Balance({ drawn, fade }: P) {
  const geo = useMemo(() => ({
    post: merge([at(new THREE.BoxGeometry(0.9, 0.08, 0.5), 0, -1.2, 0), at(new THREE.CylinderGeometry(0.05, 0.07, 1.6, 10), 0, -0.4, 0)]),
    beam: merge([new THREE.BoxGeometry(3.0, 0.07, 0.1), at(new THREE.SphereGeometry(0.09, 10, 8), 0, 0, 0)]),
    pan: new THREE.CylinderGeometry(0.5, 0.42, 0.06, 20),
    monitor: merge([new THREE.BoxGeometry(0.7, 0.5, 0.12), at(new THREE.BoxGeometry(0.3, 0.03, 0.06), 0, 0.3, 0)]),
    watch: merge([new THREE.BoxGeometry(0.28, 0.32, 0.1), at(new THREE.TorusGeometry(0.24, 0.03, 8, 20).rotateY(Math.PI / 2), 0, 0, 0)]),
  }), []);
  const beam = useRef<THREE.Group>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const l1 = useRef<HTMLDivElement>(null), l2 = useRef<HTMLDivElement>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    // tips toward the monitor, settling from level as it builds
    const tilt = -0.16 * clamp01((d - 0.5) / 0.5) + Math.sin(t * 0.9) * 0.015;
    if (beam.current) beam.current.rotation.z = tilt;
    const dy = Math.sin(tilt) * 1.4;
    if (left.current) left.current.position.set(-1.4, 0.4 - 0.9 + dy, 0);
    if (right.current) right.current.position.set(1.4, 0.4 - 0.9 - dy, 0);
    const o = clamp01((d - 0.7) / 0.3) * fade.current;
    if (l1.current) l1.current.style.opacity = String(o);
    if (l2.current) l2.current.style.opacity = String(o);
  });
  return (
    <group position={[0, 0.35, 0]}>
      <Solid geometry={geo.post} drawn={drawn} color={BODY_LIGHT} edge={EDGE} threshold={20} />
      <group ref={beam} position={[0, 0.4, 0]}>
        <Solid geometry={geo.beam} drawn={drawn} color={BODY} edge={EDGE} threshold={20} delay={0.2} span={0.6} />
      </group>
      <group ref={left}>
        <Solid geometry={geo.pan} drawn={drawn} color={BODY} edge={EDGE} threshold={20} delay={0.4} span={0.6}>
          <group position={[0, 0.3, 0]}>
            <Solid geometry={geo.monitor} drawn={drawn} color="#1a1024" edge={SIGNAL} threshold={20} delay={0.55} span={0.45}>
              <mesh position={[0, 0, 0.065]} material={glowMat(SIGNAL, 0.35)}><planeGeometry args={[0.56, 0.36]} /></mesh>
            </Solid>
          </group>
        </Solid>
      </group>
      <group ref={right}>
        <Solid geometry={geo.pan} drawn={drawn} color={BODY} edge={EDGE} threshold={20} delay={0.4} span={0.6}>
          <group position={[0, 0.25, 0]}>
            <Solid geometry={geo.watch} drawn={drawn} color="#1a1024" edge={EDGE_SOFT} threshold={20} delay={0.55} span={0.45} />
          </group>
        </Solid>
      </group>
      <Html position={[-1.4, -1.55, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={l1} className="machine select-none whitespace-nowrap text-ink" style={{ opacity: 0 }}>certified monitor · read</div>
      </Html>
      <Html position={[1.4, -1.55, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={l2} className="machine select-none whitespace-nowrap text-ink-3" style={{ opacity: 0 }}>wearable · estimated</div>
      </Html>
    </group>
  );
}

/* ── About · Siren cluster — alarm fatigue ───────────────────────────────── */
export function Sirens({ drawn }: P) {
  const base = useMemo(() => merge([new THREE.CylinderGeometry(0.16, 0.2, 0.22, 12)]), []);
  const dome = useMemo(() => new THREE.SphereGeometry(0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), []);
  const mats = useMemo(() => Array.from({ length: 5 }, () => glowMat(ALARM, 0.6)), []);
  const pos: [number, number, number][] = useMemo(() => [[-1.1, -0.5, 0.2], [-0.4, -0.5, -0.5], [0.3, -0.5, 0.4], [1.0, -0.5, -0.2], [0, 0.3, -0.1]], []);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    mats.forEach((m, i) => {
      const on = Math.sin(t * (2.3 + i * 0.7) + i * 1.9) > 0.2 ? 2.4 : 0.25;
      m.emissiveIntensity = on;
      m.userData.baseOpacity = clamp01((d - 0.3 - i * 0.08) / 0.4);
    });
  });
  return (
    <group position={[0, 0.2, 0]}>
      {pos.map((p, i) => (
        <group key={i} position={p}>
          <Solid geometry={base} drawn={drawn} color={BODY_LIGHT} edge={EDGE_SOFT} threshold={20} delay={i * 0.08} span={0.6} />
          <mesh geometry={dome} material={mats[i]} position={[0, 0.11, 0]} />
        </group>
      ))}
    </group>
  );
}

/* ── About · Five mismatched monitors → one readout ──────────────────────── */
export function Monitors5({ drawn }: P) {
  const shapes = useMemo(() => [
    [0.7, 0.5], [0.5, 0.62], [0.82, 0.42], [0.55, 0.5], [0.66, 0.58],
  ].map(([w, h]) => merge([new THREE.BoxGeometry(w, h, 0.12), at(new THREE.BoxGeometry(w * 0.4, 0.04, 0.06), 0, h / 2 + 0.03, 0)])), []);
  const tints = [SIGNAL, "#4fd1c5", "#7fb6e8", "#f0b429", GLOW];
  const readout = useMemo(() => glowMat(VIOLET, 1.0), []);
  const beams = useMemo(() => fromSegments(shapes.map((_, i) => [V(-1.6 + i * 0.8, -0.05, 0), V(0, -0.95, 0)] as [THREE.Vector3, THREE.Vector3])), [shapes]);
  const bm = useRef<DrawnMaterial>(null);
  useFrame((s) => {
    const d = drawn.current ?? 1;
    if (bm.current) { bm.current.uniforms.uDraw.value = clamp01((d - 0.5) / 0.4); bm.current.uniforms.uPulse.value = ((s.clock.elapsedTime * 0.5) % 1.3) - 0.15; }
    readout.userData.baseOpacity = clamp01((d - 0.75) / 0.25);
  });
  return (
    <group position={[0, 0.35, 0]}>
      {shapes.map((g, i) => (
        <group key={i} position={[-1.6 + i * 0.8, 0.3, 0]}>
          <Solid geometry={g} drawn={drawn} color="#1a1024" edge={EDGE_SOFT} threshold={20} delay={i * 0.06} span={0.6}>
            <mesh position={[0, 0, 0.065]} material={glowMat(tints[i], 0.35)}><planeGeometry args={[0.4, 0.28]} /></mesh>
          </Solid>
        </group>
      ))}
      <Drawn ref={bm} geometry={beams} color={EDGE_SOFT} colorB={VIOLET} opacity={0.7} window={0.5} pulseColor={WHITE} />
      <mesh position={[0, -1.1, 0]} material={readout}><boxGeometry args={[1.6, 0.22, 0.1]} /></mesh>
    </group>
  );
}

/* ── About · The comb over the curve — the dip nobody was there for ──────── */
export function Comb({ drawn, fade }: P) {
  const geo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i += 1) {
      const u = i / 80, x = -2 + u * 4;
      const dip = -0.9 * Math.exp(-(((u - 0.62) / 0.06) ** 2));
      pts.push(V(x, 0.1 + Math.sin(u * 9) * 0.06 + dip, 0));
    }
    const teeth: [THREE.Vector3, THREE.Vector3][] = [];
    for (let k = 0; k <= 5; k += 1) { const x = -2 + k * 0.8; teeth.push([V(x, 1.0, 0), V(x, -0.6, 0)]); }
    teeth.push([V(-2, 1.0, 0), V(2, 1.0, 0)]);
    return { curve: fromPolyline(pts), teeth: fromSegments(teeth), dip: pts[50] };
  }, []);
  const c = useRef<DrawnMaterial>(null), th = useRef<DrawnMaterial>(null);
  const dipMat = useMemo(() => glowMat(GLOW_SOFT, 1.8), []);
  const label = useRef<HTMLDivElement>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    if (c.current) { c.current.uniforms.uDraw.value = clamp01(d / 0.6); c.current.uniforms.uPulse.value = ((t * 0.3) % 1.3) - 0.15; }
    if (th.current) th.current.uniforms.uDraw.value = clamp01((d - 0.3) / 0.5);
    dipMat.emissiveIntensity = 1 + Math.max(0, Math.sin(t * 2)) * 1.5;
    dipMat.userData.baseOpacity = clamp01((d - 0.7) / 0.3);
    if (label.current) label.current.style.opacity = String(clamp01((d - 0.8) / 0.2) * fade.current);
  });
  return (
    <group position={[0, 0.1, 0]}>
      <Drawn ref={th} geometry={geo.teeth} color={EDGE_SOFT} opacity={0.7} window={0.6} />
      <Drawn ref={c} geometry={geo.curve} color={SIGNAL} colorB={SIGNAL} opacity={1} window={0.4} pulseColor={WHITE} />
      <mesh position={[geo.dip.x, geo.dip.y, 0]} material={dipMat}><sphereGeometry args={[0.07, 8, 8]} /></mesh>
      <Html position={[geo.dip.x, geo.dip.y - 0.35, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
        <div ref={label} className="machine select-none whitespace-nowrap text-ink" style={{ opacity: 0 }}>between two checks</div>
      </Html>
    </group>
  );
}

/* ── Contact · Radar sweep on a pin ──────────────────────────────────────── */
export function Radar({ drawn }: P) {
  const geo = useMemo(() => ({
    pin: merge([at(new THREE.ConeGeometry(0.16, 0.5, 12).rotateX(Math.PI), 0, -0.55, 0), at(new THREE.SphereGeometry(0.22, 14, 10), 0, -0.1, 0)]),
    ring: new THREE.TorusGeometry(1.2, 0.02, 8, 64),
  }), []);
  const wedge = useMemo(() => { const g = new THREE.CircleGeometry(1.2, 24, 0, Math.PI / 5); g.rotateX(-Math.PI / 2); return g; }, []);
  const wedgeMat = useMemo(() => { const m = new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false }); m.userData.baseOpacity = 0.25; return m; }, []);
  const w = useRef<THREE.Mesh>(null);
  const blips = useMemo(() => [[0.7, 0.4], [-0.5, -0.8], [0.2, -0.95]], []);
  const blipMats = useMemo(() => blips.map(() => glowMat(GLOW_SOFT, 1.5)), [blips]);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    if (w.current) w.current.rotation.y = -t * 0.9;
    wedgeMat.userData.baseOpacity = 0.25 * clamp01((d - 0.5) / 0.4);
    blips.forEach(([x, z], i) => {
      const a = Math.atan2(z, x), sweep = ((t * 0.9) % (Math.PI * 2));
      const diff = ((a + Math.PI * 2 - sweep) % (Math.PI * 2));
      blipMats[i].emissiveIntensity = 0.2 + 2.2 * Math.exp(-diff * 1.5);
      blipMats[i].userData.baseOpacity = clamp01((d - 0.6) / 0.3);
    });
  });
  return (
    <group position={[0, 0.2, 0]} rotation={[0.35, 0, 0]}>
      <Solid geometry={geo.pin} drawn={drawn} color="#2a1b3a" edge={GLOW} threshold={20} position={[0, 0.3, 0]}>
        <Led color={GLOW_SOFT} size={0.06} intensity={2} position={[0, -0.1, 0.22]} />
      </Solid>
      <Solid geometry={geo.ring} drawn={drawn} color={BODY_LIGHT} edge={EDGE} threshold={1} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.85, 0]} delay={0.2} span={0.6} />
      <mesh ref={w} geometry={wedge} material={wedgeMat} position={[0, -0.84, 0]} />
      {blips.map(([x, z], i) => (
        <mesh key={i} position={[x, -0.8, z]} material={blipMats[i]}><sphereGeometry args={[0.05, 8, 6]} /></mesh>
      ))}
    </group>
  );
}

/* ── Security · The audit tape ───────────────────────────────────────────── */
export function Tape({ drawn }: P) {
  const reel = useMemo(() => merge([new THREE.CylinderGeometry(0.5, 0.5, 0.3, 24).rotateX(Math.PI / 2), new THREE.CylinderGeometry(0.12, 0.12, 0.34, 12).rotateX(Math.PI / 2)]), []);
  const tapeMat = useMemo(() => { const m = new THREE.MeshStandardMaterial({ color: "#1c1128", roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide, transparent: true }); m.userData.baseOpacity = 0; return m; }, []);
  const rows = useRef<THREE.InstancedMesh>(null);
  const rowMat = useMemo(() => glowMat(VIOLET, 0.8), []);
  const reelG = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((s) => {
    const t = s.clock.elapsedTime, d = drawn.current ?? 1;
    if (reelG.current) reelG.current.rotation.z = -t * 0.8;
    tapeMat.userData.baseOpacity = clamp01((d - 0.3) / 0.4);
    if (rows.current) {
      for (let i = 0; i < 10; i += 1) {
        const ph = (t * 0.25 + i * 0.1) % 1;
        dummy.position.set(-0.9 + ph * 2.6, -0.62, 0.01);
        dummy.scale.set(0.5 + ((i * 0.37) % 0.5), 1, 1);
        dummy.updateMatrix();
        rows.current.setMatrixAt(i, dummy.matrix);
      }
      rows.current.instanceMatrix.needsUpdate = true;
      rowMat.userData.baseOpacity = clamp01((d - 0.6) / 0.3);
    }
  });
  return (
    <group position={[0, 0.2, 0]}>
      <group ref={reelG} position={[-1.2, 0, 0]}>
        <Solid geometry={reel} drawn={drawn} color={BODY} edge={EDGE} threshold={20} />
      </group>
      <mesh position={[0.4, -0.62, 0]} material={tapeMat}><planeGeometry args={[3.2, 0.34]} /></mesh>
      <instancedMesh ref={rows} args={[undefined, undefined, 10]} material={rowMat} frustumCulled={false}>
        <boxGeometry args={[0.5, 0.05, 0.02]} />
      </instancedMesh>
    </group>
  );
}
