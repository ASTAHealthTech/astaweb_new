import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * The ward from above, then the hospital graph rising out of it.
 *
 * Six beds in two rows, each with its monitor at the head and its ASTA unit on
 * the pole. Above them, the graph the product actually shows: hospital →
 * ward → patient nodes, each patient tied to its bed.
 */

function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const flat = list.map((g) => (g.index ? g.toNonIndexed() : g));
  return mergeGeometries(flat) ?? flat[0];
}
const at = (g: THREE.BufferGeometry, x: number, y: number, z: number) => { g.translate(x, y, z); return g; };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

export const BED_COLS = 3;
export const BED_DX = 2.6;
export const BED_DZ = 3.6;

export const BEDS = [
  { id: "01", hr: 97, spo2: 100, bp: "159/73", news: 2, crit: true, cat: "Post-operative" },
  { id: "02", hr: 87, spo2: 99, bp: "161/73", news: 2, crit: false, cat: "Respiratory · sepsis" },
  { id: "03", hr: 114, spo2: 98, bp: "172/80", news: 3, crit: true, cat: "Post-operative" },
  { id: "04", hr: 94, spo2: 98, bp: "149/71", news: 1, crit: false, cat: "Metabolic" },
  { id: "05", hr: 89, spo2: 99, bp: "160/75", news: 2, crit: true, cat: "Cardiac" },
  { id: "06", hr: 92, spo2: 99, bp: "200/89", news: 3, crit: true, cat: "Observation" },
];

export function bedPosition(i: number): THREE.Vector3 {
  const col = i % BED_COLS, row = Math.floor(i / BED_COLS);
  return V((col - 1) * BED_DX, 0, (row - 0.5) * BED_DZ);
}

function bed(): THREE.BufferGeometry {
  const frame = new THREE.BoxGeometry(1.05, 0.12, 2.05);
  const mattress = at(new THREE.BoxGeometry(0.95, 0.14, 1.9), 0, 0.13, 0.02);
  const head = at(new THREE.BoxGeometry(1.05, 0.5, 0.06), 0, 0.3, -1.02);
  const foot = at(new THREE.BoxGeometry(1.05, 0.34, 0.06), 0, 0.22, 1.02);
  const legs: THREE.BufferGeometry[] = [];
  for (const [x, z] of [[-0.45, -0.9], [0.45, -0.9], [-0.45, 0.9], [0.45, 0.9]]) {
    legs.push(at(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 6), x, -0.2, z));
  }
  // the pole at the head, the monitor on it, the unit above looking down at it
  const pole = at(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8), 0.68, 0.6, -0.95);
  const monitor = at(new THREE.BoxGeometry(0.42, 0.3, 0.1), 0.68, 0.95, -0.9);
  const unit = at(new THREE.BoxGeometry(0.16, 0.14, 0.1), 0.62, 1.32, -0.62);
  const arm = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6);
  arm.rotateX(0.6);
  return merge([frame, mattress, head, foot, ...legs, pole, monitor, unit, at(arm, 0.68, 1.2, -0.8)]);
}

/** One bed in four parts, untranslated, so the pedestal can take it apart. */
export function bedParts(): { frame: THREE.BufferGeometry; pole: THREE.BufferGeometry; monitor: THREE.BufferGeometry; unit: THREE.BufferGeometry } {
  const frame = new THREE.BoxGeometry(1.05, 0.12, 2.05);
  const mattress = at(new THREE.BoxGeometry(0.95, 0.14, 1.9), 0, 0.13, 0.02);
  const head = at(new THREE.BoxGeometry(1.05, 0.5, 0.06), 0, 0.3, -1.02);
  const foot = at(new THREE.BoxGeometry(1.05, 0.34, 0.06), 0, 0.22, 1.02);
  const legs: THREE.BufferGeometry[] = [];
  for (const [x, z] of [[-0.45, -0.9], [0.45, -0.9], [-0.45, 0.9], [0.45, 0.9]]) {
    legs.push(at(new THREE.CylinderGeometry(0.03, 0.03, 0.3, 6), x, -0.2, z));
  }
  const pole = at(new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8), 0.68, 0.6, -0.95);
  const monitor = at(new THREE.BoxGeometry(0.42, 0.3, 0.1), 0.68, 0.95, -0.9);
  const arm = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6);
  arm.rotateX(0.6);
  const unit = merge([at(new THREE.BoxGeometry(0.16, 0.14, 0.1), 0.62, 1.32, -0.62), at(arm, 0.68, 1.2, -0.8)]);
  return { frame: merge([frame, mattress, head, foot, ...legs]), pole, monitor, unit };
}

/** Bed i of n, three to a row, rows centred on the origin. */
export function bedPositionOf(i: number, n: number): THREE.Vector3 {
  const rows = Math.ceil(n / BED_COLS);
  const col = i % BED_COLS, row = Math.floor(i / BED_COLS);
  return V((col - 1) * BED_DX, 0, (row - (rows - 1) / 2) * BED_DZ);
}

export function buildWard(): { beds: THREE.BufferGeometry[]; room: [THREE.Vector3, THREE.Vector3][] } {
  const beds = BEDS.map((_, i) => {
    const g = bed();
    const p = bedPosition(i);
    g.translate(p.x, p.y, p.z);
    return g;
  });
  // the room outline and the aisle
  const W = BED_DX * BED_COLS + 1.4, D = BED_DZ * 2 + 1.6;
  const y = -0.36;
  const c = [V(-W / 2, y, -D / 2), V(W / 2, y, -D / 2), V(W / 2, y, D / 2), V(-W / 2, y, D / 2)];
  const room: [THREE.Vector3, THREE.Vector3][] = [[c[0], c[1]], [c[1], c[2]], [c[2], c[3]], [c[3], c[0]]];
  // a door gap on the near wall, and the aisle line
  room.push([V(-W / 2 + 0.6, y, 0), V(W / 2 - 0.6, y, 0)]);
  return { beds, room };
}

export type GraphNode = { id: string; label: string; pos: THREE.Vector3; level: 0 | 1 | 2 };

export function buildGraph(): { nodes: GraphNode[]; edges: [THREE.Vector3, THREE.Vector3][]; nodeGeo: THREE.BufferGeometry } {
  const hospital: GraphNode = { id: "h", label: "Hospital", pos: V(0, 5.2, 0), level: 0 };
  const ward: GraphNode = { id: "w", label: "Medical Ward 1", pos: V(0, 3.6, 0), level: 1 };
  const patients: GraphNode[] = BEDS.map((b, i) => {
    const p = bedPosition(i);
    return { id: `p${b.id}`, label: `Bed ${b.id}`, pos: V(p.x * 0.85, 2.1, p.z * 0.75), level: 2 };
  });
  const nodes = [hospital, ward, ...patients];
  const edges: [THREE.Vector3, THREE.Vector3][] = [[hospital.pos, ward.pos]];
  patients.forEach((p, i) => {
    edges.push([ward.pos, p.pos]);
    // down to the bed's monitor
    const b = bedPosition(i);
    edges.push([p.pos, V(b.x + 0.68, 0.95, b.z - 0.9)]);
  });
  const ico = new THREE.IcosahedronGeometry(0.16, 0);
  const geos = nodes.map((n) => {
    const g = ico.clone();
    const s = n.level === 0 ? 1.6 : n.level === 1 ? 1.25 : 0.85;
    g.scale(s, s, s);
    g.translate(n.pos.x, n.pos.y, n.pos.z);
    return g;
  });
  return { nodes, edges, nodeGeo: merge(geos) };
}
