import * as THREE from "three";

/**
 * The one drawing technique the whole site is built on.
 *
 * Take any geometry, reduce it to its edges, and give every edge its own start
 * point, end point and place in the drawing order. A single uniform then draws
 * the object the way a plotter would: each line grows from its start to its
 * end, in order. Colour runs along the same order, so one object can carry the
 * brand gradient from where the signal enters to where it leaves, and a
 * travelling highlight (`uPulse`) can show the signal moving through it.
 *
 * It costs one attribute set and four uniforms. Everything drawn on the site —
 * the monitor, the unit, the model, the heart, the ward — goes through here.
 */

export const DRAW_VERT = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aT;
  attribute float aSeg;
  attribute vec3 aOffset;

  uniform float uDraw;
  uniform float uWindow;
  uniform float uAssembly;

  varying float vOn;
  varying float vSeg;

  void main() {
    float delay = aSeg * (1.0 - uWindow);
    float local = clamp((uDraw - delay) / uWindow, 0.0, 1.0);
    local = local * local * (3.0 - 2.0 * local);

    vec3 p = mix(aStart, mix(aStart, aEnd, local), aT);
    // Fly-in: at uAssembly 0 every vertex sits at its scattered offset, at 1
    // it is home. Eased here so the parent can feed it a straight ramp.
    float a = uAssembly * uAssembly * (3.0 - 2.0 * uAssembly);
    p += aOffset * (1.0 - a);
    vOn = smoothstep(0.0, 0.1, local);
    vSeg = aSeg;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const DRAW_FRAG = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uFade;
  uniform float uPulse;
  uniform float uPulseWidth;
  uniform vec3 uPulseColor;

  varying float vOn;
  varying float vSeg;

  void main() {
    vec3 c = mix(uColor, uColorB, vSeg);
    // A travelling highlight along the draw order. Gaussian, so it has a
    // centre and soft shoulders rather than a hard band.
    float d = (vSeg - uPulse) / max(uPulseWidth, 0.001);
    float glow = exp(-d * d * 4.0);
    c = mix(c, uPulseColor, glow * 0.9);
    gl_FragColor = vec4(c, uOpacity * uFade * vOn * (1.0 + glow * 0.9));
  }
`;

export type DrawUniforms = {
  uDraw: { value: number };
  uWindow: { value: number };
  uAssembly: { value: number };
  uColor: { value: THREE.Color };
  uColorB: { value: THREE.Color };
  uOpacity: { value: number };
  /** Stage-level fade, written by useStage. Leave it alone elsewhere. */
  uFade: { value: number };
  uPulse: { value: number };
  uPulseWidth: { value: number };
  uPulseColor: { value: THREE.Color };
};

export function drawUniforms(opts: {
  color: string;
  colorB?: string;
  opacity?: number;
  window?: number;
  pulseColor?: string;
}): DrawUniforms {
  return {
    uDraw: { value: 0 },
    uWindow: { value: opts.window ?? 0.5 },
    uAssembly: { value: 1 },
    uColor: { value: new THREE.Color(opts.color) },
    uColorB: { value: new THREE.Color(opts.colorB ?? opts.color) },
    uOpacity: { value: opts.opacity ?? 0.8 },
    uFade: { value: 1 },
    uPulse: { value: -1 },
    uPulseWidth: { value: 0.06 },
    uPulseColor: { value: new THREE.Color(opts.pulseColor ?? "#FFFFFF") },
  };
}

export type SortAxis = "y" | "-y" | "x" | "-x" | "z" | "-z" | "radial";

/**
 * Edges, rebuilt so every segment knows its own endpoints and its place in the
 * draw order. `sort` decides which way the drawing sweeps.
 */
export function drawableEdges(
  src: THREE.BufferGeometry,
  { threshold = 24, sort = "-y" as SortAxis } = {}
): THREE.BufferGeometry {
  const edges = new THREE.EdgesGeometry(src, threshold);
  const pos = edges.getAttribute("position").array as Float32Array;
  const segCount = pos.length / 6;

  const segs: { a: THREE.Vector3; b: THREE.Vector3; key: number }[] = [];
  const keyOf = (m: THREE.Vector3) => {
    switch (sort) {
      case "y": return m.y;
      case "-y": return -m.y;
      case "x": return m.x;
      case "-x": return -m.x;
      case "z": return m.z;
      case "-z": return -m.z;
      case "radial": return m.length();
    }
  };
  const mid = new THREE.Vector3();
  for (let i = 0; i < segCount; i += 1) {
    const a = new THREE.Vector3(pos[i * 6], pos[i * 6 + 1], pos[i * 6 + 2]);
    const b = new THREE.Vector3(pos[i * 6 + 3], pos[i * 6 + 4], pos[i * 6 + 5]);
    mid.addVectors(a, b).multiplyScalar(0.5);
    segs.push({ a, b, key: keyOf(mid) });
  }
  segs.sort((x, y) => x.key - y.key);
  edges.dispose();
  return fromSegments(segs.map((s) => [s.a, s.b]));
}

/**
 * Build a drawable line set straight from segments, already in draw order.
 * `offsets`, if given, is where each segment sits before it flies home
 * (one vector per segment; both ends share it, so segments fly rigid).
 * `order`, if given, overrides the draw position (0–1) per segment.
 */
export function fromSegments(
  segs: [THREE.Vector3, THREE.Vector3][],
  offsets?: THREE.Vector3[],
  order?: number[]
): THREE.BufferGeometry {
  const segCount = segs.length;
  const n = segCount * 2;
  const position = new Float32Array(n * 3);
  const aStart = new Float32Array(n * 3);
  const aEnd = new Float32Array(n * 3);
  const aOffset = new Float32Array(n * 3);
  const aT = new Float32Array(n);
  const aSeg = new Float32Array(n);

  segs.forEach(([a, b], i) => {
    const off = offsets?.[i];
    for (let k = 0; k < 2; k += 1) {
      const v = k === 0 ? a : b;
      const o = (i * 2 + k) * 3;
      position[o] = v.x; position[o + 1] = v.y; position[o + 2] = v.z;
      aStart[o] = a.x; aStart[o + 1] = a.y; aStart[o + 2] = a.z;
      aEnd[o] = b.x; aEnd[o + 1] = b.y; aEnd[o + 2] = b.z;
      if (off) { aOffset[o] = off.x; aOffset[o + 1] = off.y; aOffset[o + 2] = off.z; }
      aT[i * 2 + k] = k;
      aSeg[i * 2 + k] = order ? order[i] : segCount > 1 ? i / (segCount - 1) : 0;
    }
  });

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(position, 3));
  g.setAttribute("aStart", new THREE.BufferAttribute(aStart, 3));
  g.setAttribute("aEnd", new THREE.BufferAttribute(aEnd, 3));
  g.setAttribute("aOffset", new THREE.BufferAttribute(aOffset, 3));
  g.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
  g.setAttribute("aSeg", new THREE.BufferAttribute(aSeg, 1));
  return g;
}

/** A polyline (open curve) as drawable segments, in path order. */
export function fromPolyline(points: THREE.Vector3[], closed = false): THREE.BufferGeometry {
  const segs: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < points.length - 1; i += 1) segs.push([points[i], points[i + 1]]);
  if (closed && points.length > 2) segs.push([points[points.length - 1], points[0]]);
  return fromSegments(segs);
}

/** Fast departure, long settle. Symmetric easing has no weight. */
export function settle(t: number): number {
  return 1 - Math.pow(1 - t, 3.4);
}

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/* ── the palette, as the drawing sees it ─────────────────────────────────── */

/** Structure: a pale tint of the page ink. Never a colour of its own. */
export const INK = "#CFC3DC";
export const INK_DIM = "#6E6280";
/** Signal, by stage: acquisition → model → clinical output. */
export const AMBER = "#F09030";
export const MAGENTA = "#DE2588";
export const VIOLET = "#8A4FE0";
export const WHITE = "#F6F2F8";
