"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clamp01, drawableEdges } from "@/lib/scene/draw";
import { BODY, BODY_LIGHT, EDGE, GLOW, GLOW_SOFT, GRID_A, GRID_B, VIOLET, bodyMaterial } from "@/lib/scene/look";
import { Drawn, type DrawnMaterial } from "./Drawn";

/**
 * A solid part: a lit body with its edges drawn on top.
 *
 * Builds itself in three overlapping moves, all driven by one `drawn` ref
 * (0 → 1) the stage owns:
 *   1. the edges draw themselves in, in order
 *   2. the part flies home from `from` (if given), the way the club site's
 *      rover fragments fly together
 *   3. the body fades in under the edges
 * The stage's fade (useStage) multiplies everything, through userData.
 */
export function Solid({
  geometry,
  drawn,
  color = BODY,
  edge = EDGE,
  edgeOpacity = 0.9,
  threshold = 20,
  from,
  explode,
  explodeRef,
  delay = 0,
  span = 1,
  position,
  rotation,
  scale,
  pulseColor,
  emissive,
  emissiveIntensity = 0,
  bodyOpacity = 1,
  children,
}: {
  geometry: THREE.BufferGeometry;
  drawn: React.RefObject<number>;
  color?: string;
  edge?: string;
  edgeOpacity?: number;
  threshold?: number;
  /** Where the part starts before it flies home (local offset). */
  from?: [number, number, number];
  /** Where the part sits when the object is exploded (local offset)… */
  explode?: [number, number, number];
  /** …driven by this 0 → 1 ref. */
  explodeRef?: React.RefObject<number>;
  /** Fraction of the parent's drawn ramp at which this part starts. */
  delay?: number;
  /** How much of the ramp this part takes. */
  span?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  pulseColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  /** a see-through body — a cage, a glass — keeps its edges and loses its fill */
  bodyOpacity?: number;
  children?: React.ReactNode;
}) {
  const edges = useMemo(() => drawableEdges(geometry, { threshold, sort: "-y" }), [geometry, threshold]);
  const material = useMemo(() => {
    const m = bodyMaterial(color);
    if (emissive) { m.emissive = new THREE.Color(emissive); m.emissiveIntensity = emissiveIntensity; }
    m.userData.baseOpacity = 1;
    return m;
  }, [color, emissive, emissiveIntensity]);
  const edgeMat = useRef<DrawnMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const home = useMemo(() => new THREE.Vector3(...(position ?? [0, 0, 0])), [position]);
  const start = useMemo(() => (from ? home.clone().add(new THREE.Vector3(...from)) : null), [from, home]);
  const out = useMemo(() => (explode ? new THREE.Vector3(...explode) : null), [explode]);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const raw = clamp01(((drawn.current ?? 1) - delay) / span);
    if (edgeMat.current) edgeMat.current.uniforms.uDraw.value = clamp01(raw / 0.7);
    // body: fades in under the edges
    material.userData.baseOpacity = clamp01((raw - 0.3) / 0.5) * bodyOpacity;
    if (group.current && (start || out)) {
      // expo in-out, like the rover's fragments
      const a = clamp01(raw / 0.75);
      const e = a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2;
      if (start) tmp.lerpVectors(start, home, e); else tmp.copy(home);
      if (out && explodeRef) {
        const x = clamp01(explodeRef.current ?? 0);
        const ex = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        tmp.addScaledVector(out, ex);
      }
      group.current.position.copy(tmp);
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry} material={material} />
      <Drawn ref={edgeMat} geometry={edges} color={edge} opacity={edgeOpacity} window={0.55} pulseColor={pulseColor} />
      {children}
    </group>
  );
}

/** An emissive light dot — an LED, a node, a status light. Bloom picks it up. */
export function Led({
  color = GLOW,
  size = 0.04,
  intensity = 1.6,
  position,
}: {
  color?: string;
  size?: number;
  intensity?: number;
  position?: [number, number, number];
}) {
  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, toneMapped: false, transparent: true });
    m.userData.baseOpacity = 1;
    return m;
  }, [color, intensity]);
  return (
    <mesh position={position} material={mat}>
      <sphereGeometry args={[size, 10, 10]} />
    </mesh>
  );
}

/**
 * The plinth every object stands on: a lit ring, a slowly turning arc, a dark
 * disc, a grid — the club site's floor, in violet and magenta.
 */
export function Plinth({
  radius = 1.6,
  grid = true,
  position,
  drawn,
}: {
  radius?: number;
  grid?: boolean;
  position?: [number, number, number];
  drawn?: React.RefObject<number>;
}) {
  const arc = useRef<THREE.Mesh>(null);
  const ringMat = useMemo(() => { const m = new THREE.MeshBasicMaterial({ color: VIOLET, transparent: true, opacity: 0.55, toneMapped: false }); m.userData.baseOpacity = 0.55; return m; }, []);
  const arcMat = useMemo(() => { const m = new THREE.MeshBasicMaterial({ color: GLOW_SOFT, transparent: true, opacity: 0.35, toneMapped: false }); m.userData.baseOpacity = 0.35; return m; }, []);
  const discMat = useMemo(() => { const m = new THREE.MeshBasicMaterial({ color: BODY_LIGHT, transparent: true, opacity: 0.55, depthWrite: false }); m.userData.baseOpacity = 0.55; return m; }, []);
  const gridObj = useMemo(() => {
    const g = new THREE.GridHelper(radius * 3.8, 18, GRID_A, GRID_B);
    (g.material as THREE.Material).transparent = true;
    (g.material as THREE.Material).opacity = 0.9;
    (g.material as THREE.Material).userData.baseOpacity = 0.9;
    return g;
  }, [radius]);

  useFrame((s) => {
    if (arc.current) arc.current.rotation.z = s.clock.elapsedTime * 0.15;
    const d = drawn?.current ?? 1;
    // the plinth is the first thing that appears
    const k = clamp01(d / 0.25);
    ringMat.userData.baseOpacity = 0.55 * k;
    arcMat.userData.baseOpacity = 0.35 * k;
    discMat.userData.baseOpacity = 0.55 * k;
    (gridObj.material as THREE.Material).userData.baseOpacity = 0.9 * k;
  });

  return (
    <group position={position}>
      <group rotation-x={-Math.PI / 2} position={[0, -0.005, 0]}>
        <mesh material={ringMat}>
          <ringGeometry args={[radius - 0.05, radius, 96]} />
        </mesh>
        <mesh ref={arc} material={arcMat}>
          <ringGeometry args={[radius + 0.25, radius + 0.27, 96, 1, 0, Math.PI * 1.4]} />
        </mesh>
        <mesh material={discMat}>
          <circleGeometry args={[radius * 1.6, 64]} />
        </mesh>
      </group>
      {grid ? <primitive object={gridObj} position={[0, -0.01, 0]} /> : null}
    </group>
  );
}

/** The lights every stage shares. Same rig as the club site, recoloured. */
export function StageLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 6, 4]} intensity={45} color="#d48cff" />
      <pointLight position={[-5, 3, -3]} intensity={18} color="#ffffff" />
      <spotLight position={[0, 8, 0]} intensity={30} angle={0.5} penumbra={1} color={VIOLET} />
    </>
  );
}

/** A drifting field of points behind everything, a few brighter ones twinkling. */
export function Stars({ count = 1200 }: { count?: number }) {
  const dim = useRef<THREE.Points>(null);
  const bright = useRef<THREE.Points>(null);
  const [dimPos, brightPos] = useMemo(() => {
    let s = 20260908;
    const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    const make = (n: number, r: number) => {
      const arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i += 1) {
        const v = new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize().multiplyScalar(16 + rand() * r);
        arr.set([v.x, v.y, v.z], i * 3);
      }
      return arr;
    };
    return [make(count, 30), make(Math.floor(count / 12), 20)];
  }, [count]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (dim.current) dim.current.rotation.y += dt * 0.012;
    if (bright.current) {
      bright.current.rotation.y -= dt * 0.02;
      (bright.current.material as THREE.PointsMaterial).size = 0.09 + Math.sin(t * 2.2) * 0.03;
    }
  });

  return (
    <>
      <points ref={dim}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dimPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#c9b6f0" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={bright}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[brightPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} color={GLOW} transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}
