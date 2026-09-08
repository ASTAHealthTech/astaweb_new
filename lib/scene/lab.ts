import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * The lab: four trained specialists, each an instrument on a lit plinth.
 *
 *   heart      — rhythm, rate, perfusion (beats on the ECG)
 *   lungs      — oxygen and breath (breathes on the respiratory rate)
 *   neuron     — the deterioration screens: early sepsis, shock-perfusion
 *   trajectory — where the vitals are going, and the line they must not cross
 *
 * Everything is low-poly on purpose: EdgesGeometry only draws an edge where
 * two faces meet at an angle, so a smooth sphere draws nothing and a faceted
 * one draws a wireframe. Faceted is the drawing.
 */

function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const flat = list.map((g) => (g.index ? g.toNonIndexed() : g));
  return mergeGeometries(flat) ?? flat[0];
}
const at = (g: THREE.BufferGeometry, x: number, y: number, z: number) => { g.translate(x, y, z); return g; };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function tube(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1 = r0, seg = 7) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const g = new THREE.CylinderGeometry(r1, r0, dir.length(), seg, 1, false);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir.clone().normalize()));
  g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  return g;
}

export const PLINTH_X = [-6.3, -2.1, 2.1, 6.3];
export const PLINTH_Y = -1.35;

export function plinth(): THREE.BufferGeometry {
  const top = new THREE.CylinderGeometry(1.35, 1.35, 0.1, 40);
  const inner = new THREE.CylinderGeometry(1.0, 1.0, 0.1, 40);
  inner.translate(0, 0.002, 0);
  return merge([top, inner]);
}

/** A heart: a 2D heart profile extruded, two great vessels on top. */
export function heart(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  // classic heart curve, ~1.6 tall
  s.moveTo(0, -0.85);
  s.bezierCurveTo(-0.95, -0.25, -0.98, 0.45, -0.5, 0.62);
  s.bezierCurveTo(-0.2, 0.74, 0, 0.5, 0, 0.36);
  s.bezierCurveTo(0, 0.5, 0.2, 0.74, 0.5, 0.62);
  s.bezierCurveTo(0.98, 0.45, 0.95, -0.25, 0, -0.85);
  const body = new THREE.ExtrudeGeometry(s, { depth: 0.6, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.12, bevelSegments: 2, curveSegments: 7 });
  body.translate(0, 0, -0.3);
  body.rotateZ(-0.22);
  const aorta = tube(V(0.12, 0.55, 0.05), V(0.05, 1.2, -0.1), 0.13, 0.15, 8);
  const arch = tube(V(0.05, 1.2, -0.1), V(-0.45, 1.05, -0.2), 0.14, 0.11, 8);
  const pulm = tube(V(-0.32, 0.6, 0.12), V(-0.6, 1.05, 0.25), 0.1, 0.09, 7);
  return merge([body, aorta, arch, pulm]);
}

/** Lungs: two faceted lobes, a trachea and bronchi. */
export function lungs(): THREE.BufferGeometry {
  const lobe = (x: number, mirror: number) => {
    const g = new THREE.SphereGeometry(0.62, 9, 7);
    g.scale(1, 1.45, 0.8);
    // the inner face is flatter and the lower lobe wider
    g.translate(x, -0.15, 0);
    void mirror;
    return g;
  };
  const trachea = tube(V(0, 1.55, 0), V(0, 0.75, 0), 0.11, 0.11, 8);
  const bL = tube(V(0, 0.75, 0), V(-0.55, 0.35, 0.05), 0.08, 0.07, 7);
  const bR = tube(V(0, 0.75, 0), V(0.55, 0.35, 0.05), 0.08, 0.07, 7);
  const bL2 = tube(V(-0.55, 0.35, 0.05), V(-0.8, -0.2, 0.1), 0.06, 0.04, 6);
  const bR2 = tube(V(0.55, 0.35, 0.05), V(0.8, -0.2, 0.1), 0.06, 0.04, 6);
  return merge([lobe(-0.78, -1), lobe(0.78, 1), trachea, bL, bR, bL2, bR2]);
}

/** A neuron: soma, branching dendrites, one long axon with terminals. */
export function neuron(): { body: THREE.BufferGeometry; axon: THREE.Vector3[] } {
  const soma = new THREE.IcosahedronGeometry(0.34, 1);
  soma.translate(-0.7, 0.35, 0);
  const parts: THREE.BufferGeometry[] = [soma];
  const seed = [0.3, 1.9, 2.8, 4.1, 5.0];
  // dendrites: two levels of branching off the soma
  seed.forEach((a, i) => {
    const d1 = V(-0.7 + Math.cos(a) * 0.75, 0.35 + Math.sin(a) * 0.75, Math.sin(a * 2.3) * 0.25);
    parts.push(tube(V(-0.7, 0.35, 0), d1, 0.06, 0.035, 6));
    for (const k of [-0.45, 0.4]) {
      const d2 = d1.clone().add(V(Math.cos(a + k) * 0.45, Math.sin(a + k) * 0.45, Math.cos(a * 1.7 + i) * 0.2));
      parts.push(tube(d1, d2, 0.035, 0.018, 5));
    }
  });
  // axon: soma → right, with a myelin bead every so often, ending in terminals
  const axon = [V(-0.38, 0.28, 0), V(0.1, 0.1, 0.05), V(0.7, 0.02, -0.05), V(1.3, -0.1, 0.05), V(1.75, -0.2, 0)];
  for (let i = 0; i < axon.length - 1; i += 1) parts.push(tube(axon[i], axon[i + 1], 0.05, 0.05, 6));
  for (let i = 1; i < axon.length - 1; i += 1) {
    const bead = new THREE.CylinderGeometry(0.09, 0.09, 0.32, 7);
    bead.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), axon[i + 1].clone().sub(axon[i - 1]).normalize()));
    parts.push(at(bead, axon[i].x, axon[i].y, axon[i].z));
  }
  const end = axon[axon.length - 1];
  for (const k of [-0.5, 0, 0.5]) {
    const t = end.clone().add(V(0.4, k * 0.5, k * 0.2));
    parts.push(tube(end, t, 0.03, 0.02, 5));
    parts.push(at(new THREE.SphereGeometry(0.06, 6, 4), t.x, t.y, t.z));
  }
  return { body: merge(parts), axon };
}

/**
 * The trajectory: a small chart in space. Axes, the recorded heart rate, the
 * threshold a legacy alarm would wait for, and three forecast paths crossing
 * it early — the argument for trajectory-aware alerts, drawn.
 */
export function trajectory(): {
  axes: [THREE.Vector3, THREE.Vector3][];
  recorded: THREE.Vector3[];
  threshold: [THREE.Vector3, THREE.Vector3][];
  paths: THREE.Vector3[][];
} {
  const W = 2.6, H = 1.5;
  const x0 = -W / 2, y0 = -0.55;
  const axes: [THREE.Vector3, THREE.Vector3][] = [
    [V(x0, y0, 0), V(x0 + W, y0, 0)],
    [V(x0, y0, 0), V(x0, y0 + H, 0)],
  ];
  // gridlines
  for (let i = 1; i <= 3; i += 1) axes.push([V(x0, y0 + (H / 4) * i, 0), V(x0 + W, y0 + (H / 4) * i, 0)]);
  const recorded: THREE.Vector3[] = [];
  const n = 36;
  for (let i = 0; i <= n; i += 1) {
    const u = i / n;
    const hr = 0.32 + Math.sin(u * 7) * 0.03 + Math.pow(u, 2.2) * 0.42;
    recorded.push(V(x0 + u * W * 0.62, y0 + hr * H, 0));
  }
  const thY = y0 + 0.86 * H;
  const threshold: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < 12; i += 1) {
    const a = x0 + (i / 12) * W, b = x0 + ((i + 0.55) / 12) * W;
    threshold.push([V(a, thY, 0), V(b, thY, 0)]);
  }
  const last = recorded[recorded.length - 1];
  const paths: THREE.Vector3[][] = [-1, 0, 1].map((s) => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i += 1) {
      const u = i / 20;
      pts.push(V(last.x + u * W * 0.36, last.y + u * 0.55 + s * u * u * 0.28, 0));
    }
    return pts;
  });
  return { axes, recorded, threshold, paths };
}
