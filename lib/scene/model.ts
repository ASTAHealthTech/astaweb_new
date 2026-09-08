import * as THREE from "three";
import { shapeValue } from "./brain";

/**
 * The model, as an instrument you can watch being built.
 *
 * Not a particle cloud. Three tiers, each drawn from parts:
 *
 *   intake   — the readings, a helix of ticks streaming into the input face
 *   core     — the network: nodes as small drawn octahedra in a lobed volume,
 *              wired by nearest-neighbour synapses; the signal runs through it
 *              back to front
 *   council  — five named reviewers on a ring above it, and three forecast
 *              paths leaving the output face
 *
 * All geometry is deterministic: the structure is identical on every load.
 */

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export type Seg = [THREE.Vector3, THREE.Vector3];

const SCALE = 0.62;
/** flow axis: input at the back, output toward the viewer */
const FLOW = new THREE.Vector3(-0.2, 0.14, 0.96).normalize();

export type ModelCore = {
  /** node centres, their fly-in offsets, and their depth 0→1 along the flow */
  points: THREE.Vector3[];
  scatter: THREE.Vector3[];
  depth: number[];
  nodeSegs: Seg[];
  nodeOffsets: THREE.Vector3[];
  nodeOrder: number[];
  synSegs: Seg[];
  synOffsets: THREE.Vector3[];
  synOrder: number[];
  /** the input and output faces, for the tiers on either side */
  inlet: THREE.Vector3;
  outlet: THREE.Vector3;
  top: THREE.Vector3;
};

const OCT = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
].map(([x, y, z]) => new THREE.Vector3(x, y, z));
const OCT_EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5],
];

export function buildModelCore(n = 460, seed = 20260907): ModelCore {
  const rand = rng(seed);
  const pts: THREE.Vector3[] = [];
  let guard = 0;
  while (pts.length < n && guard < n * 400) {
    guard += 1;
    const x = (rand() * 2 - 1) * 3.6;
    const y = (rand() * 2 - 1) * 3.2;
    const z = (rand() * 2 - 1) * 2.9;
    const v = shapeValue(x, y, z);
    if (v > 1) continue;
    const keep = 0.14 + 0.86 * Math.pow(v, 2.6);
    if (rand() > keep) continue;
    pts.push(new THREE.Vector3(x * SCALE, y * SCALE, z * SCALE));
  }

  // depth along the flow axis, 0 → 1
  const depths = pts.map((p) => p.dot(FLOW));
  const dMin = Math.min(...depths), dMax = Math.max(...depths);
  const depth = depths.map((d) => (d - dMin) / (dMax - dMin || 1));

  // scatter: a wide slow ring behind and below, where the readings come from
  const scatter = pts.map((p, i) => {
    const a = rand() * Math.PI * 2;
    const r = 5 + rand() * 7;
    return new THREE.Vector3(Math.cos(a) * r, -2.2 + (rand() * 2 - 1) * 2.4, Math.sin(a) * r * 0.6 - 5).sub(p);
    void i;
  });

  // nodes: tiny octahedra, drawn in depth order
  const nodeSegs: Seg[] = [];
  const nodeOffsets: THREE.Vector3[] = [];
  const nodeOrder: number[] = [];
  const R = 0.038;
  const idx = pts.map((_, i) => i).sort((a, b) => depth[a] - depth[b]);
  idx.forEach((i, rank) => {
    const c = pts[i];
    for (const [a, b] of OCT_EDGES) {
      nodeSegs.push([c.clone().addScaledVector(OCT[a], R), c.clone().addScaledVector(OCT[b], R)]);
      nodeOffsets.push(scatter[i]);
      nodeOrder.push(rank / (idx.length - 1));
    }
  });

  // synapses: 3 nearest neighbours, deduplicated, drawn in depth order
  const pairs = new Set<number>();
  const list: [number, number][] = [];
  for (let i = 0; i < pts.length; i += 1) {
    const near: { j: number; d: number }[] = [];
    for (let j = 0; j < pts.length; j += 1) {
      if (i === j) continue;
      const d = pts[i].distanceToSquared(pts[j]);
      if (d < 1.25) near.push({ j, d });
    }
    near.sort((a, b) => a.d - b.d);
    for (let k = 0; k < Math.min(4, near.length); k += 1) {
      const j = near[k].j;
      const key = Math.min(i, j) * pts.length + Math.max(i, j);
      if (pairs.has(key)) continue;
      pairs.add(key);
      list.push([i, j]);
    }
  }
  list.sort((p, q) => (depth[p[0]] + depth[p[1]]) - (depth[q[0]] + depth[q[1]]));
  const synSegs: Seg[] = [];
  const synOffsets: THREE.Vector3[] = [];
  const synOrder: number[] = [];
  list.forEach(([i, j], k) => {
    // always from the shallower node to the deeper one, so pulses run one way
    const [a, b] = depth[i] <= depth[j] ? [i, j] : [j, i];
    synSegs.push([pts[a].clone(), pts[b].clone()]);
    synOffsets.push(scatter[a].clone().add(scatter[b]).multiplyScalar(0.5));
    synOrder.push(k / (list.length - 1));
  });

  const inlet = FLOW.clone().multiplyScalar(dMin - 0.3);
  // the output face, for the forecast: the brain's right flank, so the paths
  // leave across the screen rather than into the camera
  const outlet = new THREE.Vector3(3.3 * SCALE, 0.15, 0.5);
  const top = new THREE.Vector3(0, 3.2 * SCALE + 0.15, 0);

  return { points: pts, scatter, depth, nodeSegs, nodeOffsets, nodeOrder, synSegs, synOffsets, synOrder, inlet, outlet, top };
}

/** The readings: a helix of ticks winding in from below and behind. */
export function buildIntake(inlet: THREE.Vector3, ticks = 220): Seg[] {
  const segs: Seg[] = [];
  const start = new THREE.Vector3(-4.6, -3.4, -4.2);
  for (let i = 0; i < ticks; i += 1) {
    const u = i / (ticks - 1);
    // a helix that tightens as it approaches the inlet
    const p = start.clone().lerp(inlet, u);
    const r = 1.1 * (1 - u) + 0.08;
    const a = u * Math.PI * 7;
    p.x += Math.cos(a) * r;
    p.y += Math.sin(a) * r * 0.7;
    // each tick is a short dash tangent to the helix
    const t = new THREE.Vector3(-Math.sin(a), Math.cos(a) * 0.7, 0).multiplyScalar(0.07).add(inlet.clone().sub(start).normalize().multiplyScalar(0.05));
    segs.push([p.clone().sub(t), p.clone().add(t)]);
  }
  return segs;
}

export const COUNCIL = ["Pulse", "Aegis", "Atlas", "Nyra", "Lumen"] as const;

export type CouncilNode = { name: string; center: THREE.Vector3; segs: Seg[]; leader: Seg[] };

/** Five reviewers on a ring above the core, each tied back to its crown. */
export function buildCouncil(top: THREE.Vector3): CouncilNode[] {
  const ico = new THREE.IcosahedronGeometry(0.2, 0);
  const edges = new THREE.EdgesGeometry(ico, 1);
  const arr = edges.getAttribute("position").array as Float32Array;
  const base: Seg[] = [];
  for (let i = 0; i < arr.length; i += 6) {
    base.push([new THREE.Vector3(arr[i], arr[i + 1], arr[i + 2]), new THREE.Vector3(arr[i + 3], arr[i + 4], arr[i + 5])]);
  }
  return COUNCIL.map((name, i) => {
    const a = -Math.PI / 2 + (i / COUNCIL.length) * Math.PI * 2 + Math.PI / 5;
    const center = new THREE.Vector3(Math.cos(a) * 2.3, top.y + 0.28 + Math.sin(a * 2) * 0.08, Math.sin(a) * 1.2);
    const segs = base.map(([p, q]) => [p.clone().add(center), q.clone().add(center)] as Seg);
    // a dog-leg leader down to the crown of the core
    const knee = new THREE.Vector3(center.x * 0.5, top.y + 0.05, center.z * 0.5);
    const leader: Seg[] = [[center.clone(), knee], [knee.clone(), top.clone()]];
    return { name, center, segs, leader };
  });
}

/** Three transformer paths leaving the output face: the forecast. */
export function buildForecast(outlet: THREE.Vector3): { paths: THREE.Vector3[][]; ticks: Seg[] } {
  const paths: THREE.Vector3[][] = [];
  const ticks: Seg[] = [];
  const dir = new THREE.Vector3(0.9, -0.08, 0.42).normalize();
  const side = new THREE.Vector3(0, 0, 1);
  const up = new THREE.Vector3(0, 1, 0);
  const spread = [-1, 0, 1];
  for (const s of spread) {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i += 1) {
      const u = i / 40;
      const p = outlet.clone().addScaledVector(dir, u * 3.6);
      // fan out, then a slow drift: the uncertainty widening with time
      p.addScaledVector(side, s * (0.1 + u * u * 0.5));
      p.addScaledVector(up, s * (0.12 + u * u * 0.75) + Math.sin(u * 5.0 + s) * 0.06 * u);
      pts.push(p);
    }
    paths.push(pts);
  }
  // +15 and +30 minute ticks across the fan
  for (const u of [0.5, 1.0]) {
    const a = paths[0][Math.round(u * 40)], b = paths[2][Math.round(u * 40)];
    const ext = b.clone().sub(a).normalize().multiplyScalar(0.25);
    ticks.push([a.clone().sub(ext), b.clone().add(ext)]);
  }
  return { paths, ticks };
}
