import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * The ASTA unit, as an engineering drawing.
 *
 * Built from the deployment footage: a white chamfered enclosure with corner
 * screws and a passive vent stack, a fixed-focus optic behind a face plate,
 * three status LEDs, a compute module inside, a ball joint onto a black
 * articulated arm, and a clamp onto the bed's own pole.
 *
 * Every part is composed from primitives in code — no model file, nothing to
 * download. Each carries the transform it rests at and the transform it flies
 * out to, so the whole explode is a per-part interpolation and costs nothing.
 *
 * The device faces +Z, toward the monitor it is reading.
 */

export type Part = {
  id: string;
  label: string;
  sub: string;
  geometry: THREE.BufferGeometry;
  /** Assembled transform. */
  position: [number, number, number];
  rotation: [number, number, number];
  /** Where it flies to when the drawing opens up. */
  explode: [number, number, number];
  explodeRotation: [number, number, number];
  /** Order it draws itself in, and order it flies out. */
  order: number;
  /** Where the leader line pins, relative to the part. */
  anchor: [number, number, number];
};

/* ── profile helpers ─────────────────────────────────────────────────────── */

/** A rectangle with its corners cut off — the enclosure's actual silhouette. */
function chamferedRect(w: number, h: number, c: number): THREE.Shape {
  const x = w / 2;
  const y = h / 2;
  const s = new THREE.Shape();
  s.moveTo(-x + c, -y);
  s.lineTo(x - c, -y);
  s.lineTo(x, -y + c);
  s.lineTo(x, y - c);
  s.lineTo(x - c, y);
  s.lineTo(-x + c, y);
  s.lineTo(-x, y - c);
  s.lineTo(-x, -y + c);
  s.closePath();
  return s;
}

function extruded(shape: THREE.Shape, depth: number): THREE.BufferGeometry {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  g.translate(0, 0, -depth / 2);
  return g;
}

function at(g: THREE.BufferGeometry, x: number, y: number, z: number) {
  g.translate(x, y, z);
  return g;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/**
 * A cylinder that actually runs from a to b.
 *
 * Building an arm out of `rotateZ(Math.PI / 2.45)` guesses is how you end up
 * with segments that float near each other instead of joining. Points in,
 * geometry out, joints land where the joints are.
 */
function tube(a: THREE.Vector3, b: THREE.Vector3, r0: number, r1 = r0, seg = 10) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const g = new THREE.CylinderGeometry(r1, r0, len, seg, 1, false);
  g.applyQuaternion(
    new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir.clone().normalize())
  );
  g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  return g;
}

/* ── where the mount lives, so every piece of it agrees ──────────────────── */

const BACK = -0.31;                       // the enclosure's rear face
const MOUNT = V(0, -0.16, BACK - 0.02);   // collar into the back
const BALL = V(0, -0.2, BACK - 0.32);     // the ball joint
const ELBOW = V(-1.55, -0.95, BACK - 0.46);
const GRIP = V(-2.95, -1.95, BACK - 0.56); // where the clamp bites the pole

/**
 * Merge, safely. ExtrudeGeometry comes out non-indexed while the primitives
 * come out indexed, and mergeGeometries refuses to mix the two — so flatten
 * everything first. Silent failure here shows up as missing parts.
 */
function merge(list: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const flat = list.map((g) => (g.index ? g.toNonIndexed() : g));
  return mergeGeometries(flat) ?? flat[0];
}

/* ── the parts ───────────────────────────────────────────────────────────── */

const W = 1.32;
const H = 1.16;
const D = 0.62;
const CH = 0.22;

function enclosure(): THREE.BufferGeometry {
  return extruded(chamferedRect(W, H, CH), D);
}

function facePlate(): THREE.BufferGeometry {
  return at(extruded(chamferedRect(W - 0.1, H - 0.1, CH - 0.03), 0.07), 0, 0, D / 2 + 0.035);
}

function screws(): THREE.BufferGeometry {
  const g: THREE.BufferGeometry[] = [];
  const dx = W / 2 - 0.2;
  const dy = H / 2 - 0.19;
  for (const [x, y] of [
    [-dx, -dy],
    [dx, -dy],
    [-dx, dy],
    [dx, dy],
  ]) {
    const head = new THREE.CylinderGeometry(0.055, 0.055, 0.05, 6);
    head.rotateX(Math.PI / 2);
    g.push(at(head, x, y, D / 2 + 0.09));
  }
  return merge(g);
}

function optic(): THREE.BufferGeometry {
  const barrel = new THREE.CylinderGeometry(0.19, 0.19, 0.26, 20);
  barrel.rotateX(Math.PI / 2);
  const ring = new THREE.TorusGeometry(0.2, 0.028, 6, 24);
  const hood = new THREE.CylinderGeometry(0.235, 0.19, 0.07, 20);
  hood.rotateX(Math.PI / 2);
  return (
    merge([
      at(barrel, 0, 0, D / 2 + 0.2),
      at(ring, 0, 0, D / 2 + 0.32),
      at(hood, 0, 0, D / 2 + 0.34),
    ])
  );
}

/** The iris, drawn as blades. It is the one part that opens. */
function iris(): THREE.BufferGeometry {
  const blades: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 6; i += 1) {
    const b = new THREE.BoxGeometry(0.17, 0.02, 0.012);
    b.translate(0.085, 0, 0);
    b.rotateZ((i / 6) * Math.PI * 2);
    blades.push(b);
  }
  const g = merge(blades);
  return at(g, 0, 0, D / 2 + 0.3);
}

function leds(): THREE.BufferGeometry {
  const g: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 3; i += 1) {
    g.push(at(new THREE.BoxGeometry(0.1, 0.045, 0.03), -0.18 + i * 0.18, H / 2 - 0.14, D / 2 + 0.075));
  }
  return merge(g);
}

/** The vent stack down one flank — no fan, which matters on a ward. */
function vents(): THREE.BufferGeometry {
  const g: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 8; i += 1) {
    g.push(at(new THREE.BoxGeometry(0.03, 0.5, 0.05), W / 2 - 0.03, 0, -0.22 + i * 0.062));
  }
  return merge(g);
}

/** The compute module, with a few components stood off it. */
function board(): THREE.BufferGeometry {
  const g: THREE.BufferGeometry[] = [new THREE.BoxGeometry(0.98, 0.68, 0.035)];
  g.push(at(new THREE.BoxGeometry(0.3, 0.3, 0.06), -0.16, 0.06, 0.05));
  g.push(at(new THREE.BoxGeometry(0.2, 0.1, 0.05), 0.26, -0.18, 0.045));
  g.push(at(new THREE.BoxGeometry(0.14, 0.28, 0.045), 0.3, 0.16, 0.04));
  const merged = merge(g);
  return at(merged, 0, 0, -0.06);
}

function knuckle(): THREE.BufferGeometry {
  const ball = new THREE.SphereGeometry(0.145, 10, 7);
  const cap = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 10);
  cap.rotateX(Math.PI / 2);
  return merge([
    tube(MOUNT, BALL, 0.085, 0.105, 10),
    at(ball, BALL.x, BALL.y, BALL.z),
    at(cap, MOUNT.x, MOUNT.y, MOUNT.z + 0.03),
  ]);
}

/** Two segments and an elbow, from the ball joint down to the clamp. */
function arm(): THREE.BufferGeometry {
  const elbow = new THREE.SphereGeometry(0.125, 10, 7);
  return merge([
    tube(BALL, ELBOW, 0.072, 0.082, 10),
    at(elbow, ELBOW.x, ELBOW.y, ELBOW.z),
    tube(ELBOW, GRIP, 0.082, 0.095, 10),
  ]);
}

/** The C-section that grips the bed's own pole — plus the pole, because the
 *  point of the whole product is that the pole is already there. */
function clamp(): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.absarc(0, 0, 0.31, Math.PI * 0.2, Math.PI * 1.8, false);
  s.absarc(0, 0, 0.16, Math.PI * 1.8, Math.PI * 0.2, true);
  const c = extruded(s, 0.34);
  c.rotateX(Math.PI / 2);
  const screw = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8);
  screw.rotateZ(Math.PI / 2);
  const head = new THREE.CylinderGeometry(0.09, 0.09, 0.06, 8);
  head.rotateZ(Math.PI / 2);
  const pole = new THREE.CylinderGeometry(0.088, 0.088, 3.5, 12);
  return merge([
    at(c, GRIP.x, GRIP.y, GRIP.z),
    at(screw, GRIP.x + 0.26, GRIP.y, GRIP.z),
    at(head, GRIP.x + 0.47, GRIP.y, GRIP.z),
    at(pole, GRIP.x, GRIP.y + 0.2, GRIP.z),
  ]);
}

function cable(): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.35, 0.2, -D / 2 - 0.02),
    new THREE.Vector3(0.85, 0.34, -0.7),
    new THREE.Vector3(1.15, -0.25, -1.15),
    new THREE.Vector3(0.95, -1.25, -1.35),
    new THREE.Vector3(0.4, -2.1, -1.2),
  ]);
  return new THREE.TubeGeometry(curve, 26, 0.038, 6, false);
}

/* ── assembly ────────────────────────────────────────────────────────────── */

export function buildDevice(): Part[] {
  const parts: Omit<Part, "geometry">[] = [
    {
      id: "clamp",
      label: "Clamp",
      sub: "onto the pole that is already there",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0.12, -1.5, -0.8],
      explodeRotation: [0, 0, 0],
      order: 0,
      anchor: [-2.95, -1.35, -0.87],
    },
    {
      id: "arm",
      label: "Articulated arm",
      sub: "positioned once, then left alone",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [-0.05, -1.05, -1.15],
      explodeRotation: [0, 0.18, -0.12],
      order: 1,
      anchor: [-1.55, -0.95, -0.77],
    },
    {
      id: "knuckle",
      label: "Ball joint",
      sub: "aims the optic at the glass",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [-0.25, -1.15, -1.25],
      explodeRotation: [0.3, 0, 0],
      order: 2,
      anchor: [0, -0.2, -0.63],
    },
    {
      id: "enclosure",
      label: "Enclosure",
      sub: "wipe-clean, no moving parts",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0, 0, 0],
      explodeRotation: [0, 0, 0],
      order: 3,
      anchor: [-W / 2, H / 2, 0],
    },
    {
      id: "vents",
      label: "Passive cooling",
      sub: "no fan — a ward at night is quiet",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0.62, 0.25, -0.15],
      explodeRotation: [0, 0.35, 0],
      order: 4,
      anchor: [W / 2, 0, 0],
    },
    {
      id: "board",
      label: "Compute module",
      sub: "inference on the ward — nothing leaves it",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [-0.15, -1.5, -0.55],
      explodeRotation: [-0.5, 0.15, 0],
      order: 5,
      anchor: [0, 0, -0.06],
    },
    {
      id: "faceplate",
      label: "Face plate",
      sub: "four screws, field-serviceable",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0.05, 0.8, 1.1],
      explodeRotation: [0.42, -0.2, 0],
      order: 6,
      anchor: [0, -H / 2 + 0.1, D / 2],
    },
    {
      id: "screws",
      label: "M3 fixings",
      sub: "",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0.3, 1.15, 1.35],
      explodeRotation: [0.4, -0.2, 0],
      order: 7,
      anchor: [W / 2 - 0.2, H / 2 - 0.19, D / 2],
    },
    {
      id: "leds",
      label: "Status",
      sub: "capture · link · power",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0.55, 0.9, 0.9],
      explodeRotation: [0, 0, 0],
      order: 8,
      anchor: [0, H / 2 - 0.14, D / 2],
    },
    {
      id: "cable",
      label: "Power",
      sub: "one lead to the wall",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0.6, -0.5, -0.3],
      explodeRotation: [0, 0, 0],
      order: 9,
      anchor: [1.0, -0.6, -1.2],
    },
    {
      id: "iris",
      label: "Aperture",
      sub: "",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0, 0, 1.9],
      explodeRotation: [0, 0, 0.5],
      order: 10,
      anchor: [0, 0, D / 2 + 0.3],
    },
    {
      id: "optic",
      label: "Fixed-focus optic",
      sub: "reads the screen, never the patient",
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      explode: [0, 0.15, 2.5],
      explodeRotation: [0, 0, 0],
      order: 11,
      anchor: [0, 0, D / 2 + 0.35],
    },
  ];

  const geo: Record<string, () => THREE.BufferGeometry> = {
    clamp,
    arm,
    knuckle,
    enclosure,
    vents,
    board,
    faceplate: facePlate,
    screws,
    leds,
    cable,
    iris,
    optic,
  };

  return parts.map((p) => ({ ...p, geometry: geo[p.id]() }));
}
