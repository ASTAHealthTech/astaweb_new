import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * A bedside patient monitor, the thing every other product in this space
 * tries to replace and ASTA simply reads.
 *
 * Proportions from a mid-size ward monitor: a wide rounded bezel, a handle
 * across the top, a row of soft keys under the glass, a parameter module and
 * connector block down the right flank, on an articulated wall arm.
 */

export const MW = 2.2;   // bezel width
export const MH = 1.55;  // bezel height
export const MD = 0.34;  // bezel depth
export const SCREEN_W = 1.86;
export const SCREEN_H = 1.12;
export const SCREEN_Y = 0.1;   // screen centre above bezel centre
export const SCREEN_Z = MD / 2 + 0.014; // just proud of the recess, which is solid now

function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const flat = list.map((g) => (g.index ? g.toNonIndexed() : g));
  return mergeGeometries(flat) ?? flat[0];
}
function at(g: THREE.BufferGeometry, x: number, y: number, z: number) {
  g.translate(x, y, z);
  return g;
}

function rounded(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = w / 2, y = h / 2;
  s.moveTo(-x + r, -y);
  s.lineTo(x - r, -y); s.quadraticCurveTo(x, -y, x, -y + r);
  s.lineTo(x, y - r); s.quadraticCurveTo(x, y, x - r, y);
  s.lineTo(-x + r, y); s.quadraticCurveTo(-x, y, -x, y - r);
  s.lineTo(-x, -y + r); s.quadraticCurveTo(-x, -y, -x + r, -y);
  return s;
}

export type MonitorPart = { id: string; geometry: THREE.BufferGeometry };

export function buildMonitor(): MonitorPart[] {
  // bezel — a rounded slab
  const bezel = new THREE.ExtrudeGeometry(rounded(MW, MH, 0.12), { depth: MD, bevelEnabled: false, curveSegments: 6 });
  bezel.translate(0, 0, -MD / 2);

  // screen recess — a thin inset frame so the glass reads as glass
  const glass = new THREE.ExtrudeGeometry(rounded(SCREEN_W, SCREEN_H, 0.04), { depth: 0.02, bevelEnabled: false, curveSegments: 4 });
  glass.translate(0, SCREEN_Y, MD / 2 - 0.01);

  // handle across the top
  const handle: THREE.BufferGeometry[] = [];
  handle.push(at(new THREE.BoxGeometry(1.1, 0.07, 0.16), 0, MH / 2 + 0.2, -0.02));
  handle.push(at(new THREE.BoxGeometry(0.07, 0.24, 0.16), -0.52, MH / 2 + 0.1, -0.02));
  handle.push(at(new THREE.BoxGeometry(0.07, 0.24, 0.16), 0.52, MH / 2 + 0.1, -0.02));

  // soft keys under the glass, and the one round alarm-silence knob
  const keys: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 6; i += 1) {
    keys.push(at(new THREE.BoxGeometry(0.15, 0.07, 0.03), -0.72 + i * 0.22, -MH / 2 + 0.17, MD / 2 + 0.015));
  }
  const knob = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 12);
  knob.rotateX(Math.PI / 2);
  keys.push(at(knob, 0.82, -MH / 2 + 0.17, MD / 2 + 0.02));

  // parameter module on the right flank — the connector block
  const module: THREE.BufferGeometry[] = [];
  module.push(at(new THREE.BoxGeometry(0.16, 1.0, 0.3), MW / 2 + 0.08, 0.0, 0));
  for (let i = 0; i < 4; i += 1) {
    const port = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 8);
    port.rotateZ(Math.PI / 2);
    module.push(at(port, MW / 2 + 0.18, 0.36 - i * 0.24, 0.02));
  }

  // wall arm: a bracket off the back, one elbow, out to the left and away
  const arm: THREE.BufferGeometry[] = [];
  const plate = new THREE.BoxGeometry(0.42, 0.42, 0.06);
  arm.push(at(plate, 0, -0.1, -MD / 2 - 0.03));
  const seg1 = new THREE.CylinderGeometry(0.06, 0.06, 1.15, 10);
  seg1.rotateX(Math.PI / 2);
  arm.push(at(seg1, 0, -0.1, -MD / 2 - 0.62));
  const elbow = new THREE.SphereGeometry(0.1, 10, 7);
  arm.push(at(elbow, 0, -0.1, -MD / 2 - 1.2));
  const seg2 = new THREE.CylinderGeometry(0.06, 0.06, 1.6, 10);
  seg2.rotateZ(Math.PI / 2);
  arm.push(at(seg2, -0.8, -0.1, -MD / 2 - 1.2));

  return [
    { id: "bezel", geometry: merge([bezel, glass]) },
    { id: "handle", geometry: merge(handle) },
    { id: "keys", geometry: merge(keys) },
    { id: "module", geometry: merge(module) },
    { id: "arm", geometry: merge(arm) },
  ];
}
