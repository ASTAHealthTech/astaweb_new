"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import { clamp01 } from "@/lib/scene/draw";
import { getAnchors, subscribeAnchors, type GroundAnchor, type GroundKind } from "@/lib/scene/anchors";
import { BODY, BODY_LIGHT, EDGE, GLOW, GLOW_SOFT, SIGNAL } from "@/lib/scene/look";
import { heart, lungs, neuron } from "@/lib/scene/lab";
import { buildWard } from "@/lib/scene/ward";
import { sceneState } from "@/lib/scene/state";
import { pedestal } from "@/lib/scene/pedestal";
import { ModelObject } from "./objects/ModelObject";
import { WardObject } from "./objects/WardObject";
import { BedsideObject } from "./objects/BedsideObject";
import { SwitchboardObject } from "./objects/SwitchboardObject";
import { HubObject } from "./objects/HubObject";
import { Alarms, Attention, Balance, Cage, Comb, Eye, Landscape, Monitors5, Radar, Rail, Ribbon, Sirens, Tape } from "./objects/fresh";
import { Monitor } from "./Monitor";
import { Led, Plinth, Solid } from "./Solid";
import { Unit } from "./Unit";
import { useStage } from "./useStage";

/**
 * The lower page's 3D: one small solid object per section, each placed where
 * its DOM anchor is, slowly turning on a tiny plinth. Only anchors that are on
 * screen render; each draws itself in the first time it appears.
 */

const DEPTH = 10;
/** how big each kind is, so it fills a unit box */
const FIT: Record<GroundKind, number> = {
  unit: 0.6, monitor: 0.42, heart: 0.5, lungs: 0.42, neuron: 0.5, bed: 0.8, graph: 0.7, node: 1.4,
  eye: 0.36, rail: 0.34, ribbon: 0.36, alarms: 0.3, cage: 0.42, attention: 0.24, landscape: 0.3, balance: 0.28,
  sirens: 0.5, monitors5: 0.26, comb: 0.24, radar: 0.36, tape: 0.3,
  "pedestal-model": 0.15, "pedestal-ward": 0.12, "pedestal-bedside": 0.23, "pedestal-switchboard": 0.19, "pedestal-hub": 0.17,
};
const LIFT: Partial<Record<GroundKind, number>> = { unit: 0.1, monitor: 0.15, heart: 0.05, lungs: 0.1, neuron: 0.05, bed: 0.1 };
/** the fresh objects keep their own framing: no tilt, no plinth, slow turn */
const FRESH = new Set<GroundKind>(["eye", "rail", "ribbon", "alarms", "cage", "attention", "landscape", "balance", "sirens", "monitors5", "comb", "radar", "tape"]);
const isPedestal = (k: GroundKind) => k.startsWith("pedestal-");

function snapshot() {
  return getAnchors().map((a) => a.id).join(",");
}

export function GroundStage() {
  const { group } = useStage(["ground"], 1.2);
  useSyncExternalStore(subscribeAnchors, snapshot, () => "");
  const anchors = getAnchors();
  return (
    <group ref={group}>
      {anchors.map((a) => (
        <GroundItem key={a.id} anchor={a} />
      ))}
    </group>
  );
}

function GroundItem({ anchor }: { anchor: GroundAnchor }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const holder = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const drawn = useRef(0);
  const on = useRef(0);
  const explode = useRef(0);
  const yaw = useRef(0);
  const zoom = useRef(1);
  const v = useMemo(() => ({ ndc: new THREE.Vector3(), dir: new THREE.Vector3() }), []);
  const ped = isPedestal(anchor.kind);
  const kind = anchor.kind;

  const geo = useMemo(() => {
    switch (anchor.kind) {
      case "heart": return heart();
      case "lungs": return lungs();
      case "neuron": return neuron().body;
      case "bed": return buildWard().beds[0];
      case "node":
      case "graph": return new THREE.IcosahedronGeometry(0.35, 0);
      default: return null;
    }
  }, [anchor.kind]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.2);
    const r = anchor.el.getBoundingClientRect();
    const visible = r.bottom > 0 && r.top < size.height && r.width > 0;
    on.current += ((visible ? 1 : 0) - on.current) * (1 - Math.exp(-6 * dt));
    if (visible) drawn.current = Math.min(1, drawn.current + dt / 1.6);
    if (!holder.current) return;
    holder.current.visible = on.current > 0.01 && sceneState.framing === "ground";
    if (!holder.current.visible) return;

    // the box's centre, as a ray from the camera, DEPTH units out
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    v.ndc.set((cx / size.width) * 2 - 1, -(cy / size.height) * 2 + 1, 0.5).unproject(camera);
    v.dir.copy(v.ndc).sub(camera.position).normalize();
    holder.current.position.copy(camera.position).addScaledVector(v.dir, DEPTH);
    holder.current.quaternion.copy(camera.quaternion);
    // world height of the box at that depth
    const cam = camera as THREE.PerspectiveCamera;
    const worldH = 2 * DEPTH * Math.tan((cam.fov * Math.PI) / 360) * (r.height / size.height);
    // phones: the pedestal box is narrow, so the wide objects sit a touch smaller
    const phoneFit = sceneState.phone && kind.startsWith("pedestal-") ? 0.82 : 1;
    holder.current.scale.setScalar(worldH * FIT[anchor.kind] * phoneFit);
    // every material in this item follows its own on/off, on top of the stage fade
    // ward light (bedside pedestal only): the room dims, the glass does not
    const light = kind === "pedestal-bedside" ? 0.35 + 0.65 * pedestal.controls.light : 1;
    holder.current.traverse((o) => {
      const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (!mat) return;
      if ((mat as THREE.ShaderMaterial).isShaderMaterial) {
        const sm = mat as THREE.ShaderMaterial;
        if (sm.uniforms?.uFade) sm.uniforms.uFade.value = on.current * light;
      } else if (mat.userData && typeof mat.userData.baseOpacity === "number") {
        mat.opacity = mat.userData.baseOpacity * on.current * (mat.userData.glass ? 1 : light);
      }
    });
    if (spin.current && !ped) {
      spin.current.rotation.y = state.clock.elapsedTime * 0.35 + anchor.id;
      spin.current.rotation.x = -0.35;
      spin.current.position.y = -0.55 + Math.sin(state.clock.elapsedTime * 0.8 + anchor.id) * 0.03 + (LIFT[anchor.kind] ?? 0);
      if (FRESH.has(kind)) {
        // these are compositions, not turntable pieces: a gentle sway, facing the reader
        spin.current.rotation.set(-0.12, Math.sin(state.clock.elapsedTime * 0.35 + anchor.id) * 0.3, 0);
        spin.current.position.y = -0.1;
      }
    }
    if (spin.current && ped) {
      // the operable object: the user's drag, auto-spin after 3 s idle, wheel
      // zoom, and the explode amount — all from the pedestal store
      const idle = performance.now() - pedestal.lastInput > 3000 && !pedestal.dragging;
      if (idle) pedestal.rotY += dt * 0.25;
      yaw.current += (pedestal.rotY - yaw.current) * (1 - Math.exp(-8 * dt));
      zoom.current += (pedestal.zoom - zoom.current) * (1 - Math.exp(-6 * dt));
      explode.current += (pedestal.explodeTarget - explode.current) * (1 - Math.exp(-5 * dt));
      spin.current.rotation.set(kind === "pedestal-ward" ? -0.75 : kind === "pedestal-hub" ? -0.55 : -0.22, yaw.current, 0);
      // step back a little while exploded so the parts stay in the box
      spin.current.scale.setScalar(zoom.current * (1 - explode.current * 0.18));
      spin.current.position.y = -0.4;
    }
  });

  if (ped) {
    return (
      <group ref={holder}>
        <group ref={spin}>
          {kind === "pedestal-model" ? (
            <>
              <Plinth radius={3.4} position={[0, -2.6, 0]} drawn={drawn} />
              <ModelObject build={drawn} explode={explode} fade={on} live />
            </>
          ) : null}
          {kind === "pedestal-ward" ? (
            <>
              <Plinth radius={5.4} position={[0, -0.36, 0]} drawn={drawn} />
              <WardObject build={drawn} explode={explode} fade={on} />
            </>
          ) : null}
          {kind === "pedestal-switchboard" ? (
            <>
              <Plinth radius={3.6} position={[0, -2.3, 0]} drawn={drawn} />
              <SwitchboardObject build={drawn} explode={explode} fade={on} />
            </>
          ) : null}
          {kind === "pedestal-hub" ? <HubObject build={drawn} explode={explode} fade={on} /> : null}
          {kind === "pedestal-bedside" ? (
            <>
              <Plinth radius={2.9} position={[0, -1.3, 0]} drawn={drawn} />
              <BedsideObject build={drawn} explode={explode} fade={on} />
            </>
          ) : null}
        </group>
      </group>
    );
  }
  if (FRESH.has(kind)) {
    const F = { eye: Eye, rail: Rail, ribbon: Ribbon, alarms: Alarms, cage: Cage, attention: Attention, landscape: Landscape, balance: Balance, sirens: Sirens, monitors5: Monitors5, comb: Comb, radar: Radar, tape: Tape } as const;
    const Obj = F[kind as keyof typeof F];
    return (
      <group ref={holder}>
        <group ref={spin}>
          <Obj drawn={drawn} fade={on} />
        </group>
      </group>
    );
  }
  return (
    <group ref={holder}>
      <group ref={spin}>
        <Plinth radius={1.05} grid={false} position={[0, -0.02, 0]} drawn={drawn} />
        {kind === "unit" ? <group scale={0.62} position={[0, 0.95, 0]} rotation={[0.15, -0.7, 0]}><Unit drawn={drawn} spread={0.8} compact /></group> : null}
        {kind === "monitor" ? <group scale={0.9} position={[0, 0.85, 0]}><Monitor drawn={drawn} visible={on} /></group> : null}
        {geo && kind === "heart" ? <group position={[0, 1.0, 0]}><Solid geometry={geo} drawn={drawn} color="#3a1626" edge={SIGNAL} threshold={18} /></group> : null}
        {geo && kind === "lungs" ? <group position={[0, 1.05, 0]}><Solid geometry={geo} drawn={drawn} color="#2a1836" edge={GLOW} threshold={14} /></group> : null}
        {geo && kind === "neuron" ? <group position={[-0.3, 0.9, 0]}><Solid geometry={geo} drawn={drawn} color="#26163a" edge={EDGE} threshold={14} /></group> : null}
        {geo && kind === "bed" ? <group position={[0, 0.4, 0]} scale={0.9}><Solid geometry={geo} drawn={drawn} color={BODY} edge={EDGE} threshold={20}><Led color={GLOW_SOFT} size={0.05} intensity={2} position={[0.68, 0.95, -0.84]} /></Solid></group> : null}
        {geo && (kind === "node" || kind === "graph") ? (
          <group position={[0, 0.9, 0]}>
            <Solid geometry={geo} drawn={drawn} color={BODY_LIGHT} edge={EDGE} threshold={1}><Led color={GLOW_SOFT} size={0.1} intensity={2} /></Solid>
            {kind === "graph" ? [[-0.9, -0.5, 0.2], [0.9, -0.5, -0.2], [0, -0.7, 0.8]].map((p, i) => (
              <group key={i} position={p as [number, number, number]} scale={0.55}>
                <Solid geometry={geo} drawn={drawn} color={BODY_LIGHT} edge={EDGE} threshold={1}><Led color={GLOW} size={0.1} intensity={1.6} /></Solid>
              </group>
            )) : null}
          </group>
        ) : null}
      </group>
    </group>
  );
}
