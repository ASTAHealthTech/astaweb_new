/**
 * The model, as geometry.
 *
 * Everything here is generated in code from a seeded RNG: no model files, no
 * textures, nothing to download or decode. The whole structure is about 40 KB
 * of Float32Array built in ~40 ms on first mount.
 *
 * Shape: two lobes split by a fissure, a cerebellum bump low at the back, and
 * a stem descending toward the wards. Points are biased hard toward the shell
 * — a solid blob of points reads as a blob, a shell with a sparse interior
 * reads as a brain, and the silhouette is the only part that has to be
 * recognisable.
 *
 * Every neuron carries a `depth` along the flow axis, front to back. That one
 * number drives everything downstream: its colour (amber → magenta → violet,
 * the three platform layers), and when it fires as an activation wave crosses
 * the structure. Signal propagates in a direction; it does not twinkle.
 */

export type BrainData = {
  count: number;
  /** Final resting position, xyz. */
  position: Float32Array;
  /** Where each neuron starts before assembly, xyz. */
  scatter: Float32Array;
  /** 0 → 1 along the flow axis. Colour and firing order. */
  depth: Float32Array;
  /** Stable per-neuron randomness, 0 → 1. */
  seed: Float32Array;

  edgeCount: number;
  edgePosition: Float32Array; // 2 verts per edge
  edgeScatter: Float32Array;
  edgeDepth: Float32Array;
  edgeSeed: Float32Array;

  pulseCount: number;
  pulseStart: Float32Array;
  pulseEnd: Float32Array;
  pulseDepth: Float32Array;
  pulseSeed: Float32Array;
};

/** Deterministic RNG — the structure must be identical on every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ── the implicit shape ──────────────────────────────────────────────────── */

const LOBE_X = 1.0;
const LOBE = { a: 2.32, b: 1.9, c: 2.52 };
const FISSURE = 0.24;

/**
 * Returns how far through the shape a point sits: 0 at the centre, 1 at the
 * surface, > 1 outside. Used both to reject points and to bias toward the shell.
 */
export function shapeValue(x: number, y: number, z: number): number {
  // Frontal taper — the front of a brain is narrower than the back.
  const taper = 1 - 0.17 * Math.max(0, Math.min(1, (z + 0.4) / 2.6));
  const ax = LOBE.a * taper;

  const dxL = (x + LOBE_X) / ax;
  const dxR = (x - LOBE_X) / ax;
  const dy = y / LOBE.b;
  const dz = z / LOBE.c;

  const left = dxL * dxL + dy * dy + dz * dz;
  const right = dxR * dxR + dy * dy + dz * dz;
  let v = Math.min(left, right);

  // The longitudinal fissure only splits the upper half; the hemispheres join
  // underneath, which is what stops it reading as two separate balls.
  if (Math.abs(x) < FISSURE && y > -0.35) {
    const t = 1 - Math.abs(x) / FISSURE;
    v += t * 1.8;
  }

  // Cerebellum, low and to the back.
  const cx = x / 1.52;
  const cy = (y + 1.42) / 0.82;
  const cz = (z + 1.55) / 1.12;
  v = Math.min(v, cx * cx + cy * cy + cz * cz);

  // Brain stem, descending toward the wards.
  if (y < -1.1 && y > -3.0) {
    const t = (-1.1 - y) / 1.9;
    const r = 0.44 - t * 0.2;
    const sx = x / r;
    const sz = (z + 0.35) / r;
    v = Math.min(v, sx * sx + sz * sz);
  }

  return v;
}

/* ── neighbour search over a coarse spatial hash ─────────────────────────── */

const CELL = 0.5;

function hashKey(x: number, y: number, z: number): string {
  return `${Math.floor(x / CELL)},${Math.floor(y / CELL)},${Math.floor(z / CELL)}`;
}

export function buildBrain({
  neurons = 3600,
  maxEdgesPerNeuron = 3,
  pulses = 1400,
  seed = 20260907,
}: {
  neurons?: number;
  maxEdgesPerNeuron?: number;
  pulses?: number;
  seed?: number;
} = {}): BrainData {
  const rand = rng(seed);

  const px: number[] = [];
  const py: number[] = [];
  const pz: number[] = [];

  // Rejection-sample inside the shape, weighted toward the shell.
  let guard = 0;
  while (px.length < neurons && guard < neurons * 320) {
    guard += 1;
    const x = (rand() * 2 - 1) * 3.6;
    const y = (rand() * 2 - 1) * 3.2;
    const z = (rand() * 2 - 1) * 2.9;

    const v = shapeValue(x, y, z);
    if (v > 1) continue;

    // v near 1 = near the surface. Keep almost all of those, few from inside.
    const keep = 0.1 + 0.9 * Math.pow(v, 3.0);
    if (rand() > keep) continue;

    px.push(x);
    py.push(y);
    pz.push(z);
  }

  const count = px.length;

  const position = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const depth = new Float32Array(count);
  const seedArr = new Float32Array(count);

  // The flow axis runs back to front, tilted slightly, so the input face is on
  // the far side of the structure and output resolves toward the viewer. That
  // also keeps the incoming stream from flying through the camera.
  const FX = -0.2;
  const FY = 0.14;
  const FZ = 0.96;
  const norm = Math.hypot(FX, FY, FZ);

  let dMin = Infinity;
  let dMax = -Infinity;
  const raw = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const d = (px[i] * FX + py[i] * FY + pz[i] * FZ) / norm;
    raw[i] = d;
    if (d < dMin) dMin = d;
    if (d > dMax) dMax = d;
  }

  for (let i = 0; i < count; i += 1) {
    position[i * 3] = px[i];
    position[i * 3 + 1] = py[i];
    position[i * 3 + 2] = pz[i];

    // Before assembly the neurons sit in a wide, flat, slowly drifting field —
    // the raw stream of readings, before anything has organised it.
    const a = rand() * Math.PI * 2;
    const r = 9 + rand() * 16;
    scatter[i * 3] = Math.cos(a) * r;
    scatter[i * 3 + 1] = (rand() * 2 - 1) * 4.5;
    scatter[i * 3 + 2] = Math.sin(a) * r * 0.75 - 6;

    depth[i] = (raw[i] - dMin) / (dMax - dMin || 1);
    seedArr[i] = rand();
  }

  /* ── edges: nearest neighbours, deduplicated ───────────────────────────── */

  const buckets = new Map<string, number[]>();
  for (let i = 0; i < count; i += 1) {
    const k = hashKey(px[i], py[i], pz[i]);
    const b = buckets.get(k);
    if (b) b.push(i);
    else buckets.set(k, [i]);
  }

  const pairs: [number, number][] = [];
  const seen = new Set<number>();

  for (let i = 0; i < count; i += 1) {
    const cx = Math.floor(px[i] / CELL);
    const cy = Math.floor(py[i] / CELL);
    const cz = Math.floor(pz[i] / CELL);

    const near: { j: number; d: number }[] = [];
    for (let ox = -1; ox <= 1; ox += 1) {
      for (let oy = -1; oy <= 1; oy += 1) {
        for (let oz = -1; oz <= 1; oz += 1) {
          const b = buckets.get(`${cx + ox},${cy + oy},${cz + oz}`);
          if (!b) continue;
          for (const j of b) {
            if (j === i) continue;
            const dx = px[i] - px[j];
            const dy = py[i] - py[j];
            const dz = pz[i] - pz[j];
            const d = dx * dx + dy * dy + dz * dz;
            if (d < 0.62) near.push({ j, d });
          }
        }
      }
    }

    near.sort((a, b) => a.d - b.d);
    for (let n = 0; n < Math.min(maxEdgesPerNeuron, near.length); n += 1) {
      const j = near[n].j;
      const lo = Math.min(i, j);
      const hi = Math.max(i, j);
      const key = lo * count + hi;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([lo, hi]);
    }
  }

  const edgeCount = pairs.length;
  const edgePosition = new Float32Array(edgeCount * 6);
  const edgeScatter = new Float32Array(edgeCount * 6);
  const edgeDepth = new Float32Array(edgeCount * 2);
  const edgeSeed = new Float32Array(edgeCount * 2);

  for (let e = 0; e < edgeCount; e += 1) {
    const [a, b] = pairs[e];
    for (let k = 0; k < 2; k += 1) {
      const idx = k === 0 ? a : b;
      const o = e * 6 + k * 3;
      edgePosition[o] = position[idx * 3];
      edgePosition[o + 1] = position[idx * 3 + 1];
      edgePosition[o + 2] = position[idx * 3 + 2];
      edgeScatter[o] = scatter[idx * 3];
      edgeScatter[o + 1] = scatter[idx * 3 + 1];
      edgeScatter[o + 2] = scatter[idx * 3 + 2];
      edgeDepth[e * 2 + k] = depth[idx];
      edgeSeed[e * 2 + k] = seedArr[idx];
    }
  }

  /* ── pulses: signal travelling the edges, animated entirely on the GPU ─── */

  const n = Math.min(pulses, edgeCount);
  const pulseStart = new Float32Array(n * 3);
  const pulseEnd = new Float32Array(n * 3);
  const pulseDepth = new Float32Array(n);
  const pulseSeed = new Float32Array(n);

  for (let i = 0; i < n; i += 1) {
    const e = Math.floor(rand() * edgeCount);
    const [a, b] = pairs[e];
    // Always fire from the shallower neuron to the deeper one, so every pulse
    // in the structure travels the same way: input face to output face.
    const from = depth[a] <= depth[b] ? a : b;
    const to = from === a ? b : a;

    pulseStart[i * 3] = position[from * 3];
    pulseStart[i * 3 + 1] = position[from * 3 + 1];
    pulseStart[i * 3 + 2] = position[from * 3 + 2];
    pulseEnd[i * 3] = position[to * 3];
    pulseEnd[i * 3 + 1] = position[to * 3 + 1];
    pulseEnd[i * 3 + 2] = position[to * 3 + 2];
    pulseDepth[i] = depth[from];
    pulseSeed[i] = rand();
  }

  return {
    count,
    position,
    scatter,
    depth,
    seed: seedArr,
    edgeCount,
    edgePosition,
    edgeScatter,
    edgeDepth,
    edgeSeed,
    pulseCount: n,
    pulseStart,
    pulseEnd,
    pulseDepth,
    pulseSeed,
  };
}
