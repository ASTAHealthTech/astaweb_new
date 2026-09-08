/**
 * The monitor's glass, drawn on a 2D canvas and used as a texture.
 *
 * This is the one lit surface on the site. Everything else is a line drawing;
 * the screen is where the light comes from, and its waveforms are the signal
 * the rest of the page follows. Laid out like a real ward monitor — traces on
 * the left, a column of large numerals on the right — and coloured in the
 * brand's three: amber for the heart, magenta for oxygen, violet for breath.
 */

/** Layout coordinates below are in a 744×448 design space; the canvas is
 *  smaller and the context is scaled, which is far cheaper than blurring. */
export const DESIGN_W = 744;
export const DESIGN_H = 448;
export const SCREEN_PX_W = 560;
export const SCREEN_PX_H = 337;

const AMBER = "#F09030";
const MAGENTA = "#DE2588";
const VIOLET = "#8A4FE0";
const INK = "rgba(246,242,248,0.72)";
const INK_DIM = "rgba(246,242,248,0.38)";

export type ScreenReadings = {
  hr: number;
  spo2: number;
  sys: number;
  dia: number;
  rr: number;
  temp: number;
};

export const DEFAULT_READINGS: ScreenReadings = { hr: 92, spo2: 100, sys: 160, dia: 76, rr: 18, temp: 37.4 };

/** One PQRST complex. Deliberately not a sine wave. */
function pqrst(ctx: CanvasRenderingContext2D, x: number, mid: number, s: number) {
  ctx.lineTo(x + 8 * s, mid - 3 * s);
  ctx.lineTo(x + 14 * s, mid);
  ctx.lineTo(x + 20 * s, mid + 4 * s);
  ctx.lineTo(x + 24 * s, mid - 26 * s);
  ctx.lineTo(x + 28 * s, mid + 11 * s);
  ctx.lineTo(x + 34 * s, mid);
  ctx.lineTo(x + 48 * s, mid - 6 * s);
  ctx.lineTo(x + 58 * s, mid);
}

/** Beat phase 0→1 for a heart rate at time t (seconds). */
export function beatPhase(t: number, hr: number): number {
  const period = 60 / hr;
  return (t % period) / period;
}

function trace(
  ctx: CanvasRenderingContext2D,
  color: string,
  y: number,
  h: number,
  x0: number,
  x1: number,
  head: number,
  tNow: number,
  window: number,
  shape: (tAbs: number) => number
) {
  // Time at a given x: the head is "now", everything left of it is older.
  const tAt = (u: number) => tNow - (((head - u) % 1) + 1) % 1 * window;
  // A sweep trace: the newest point is at `head`, the strip ahead of it is
  // blanked, as on every real monitor.
  const w = x1 - x0;
  ctx.lineJoin = "round";
  ctx.beginPath();
  let started = false;
  for (let i = 0; i <= w; i += 3) {
    const u = i / w;
    // hide the 8% ahead of the sweep head
    const ahead = (u - head + 1) % 1;
    if (ahead < 0.08) { started = false; continue; }
    const yy = y - shape(tAt(u)) * h;
    if (!started) { ctx.moveTo(x0 + i, yy); started = true; } else ctx.lineTo(x0 + i, yy);
  }
  // glow without shadowBlur: a wide faint pass under a thin bright one
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 2.2;
  ctx.stroke();
  // the sweep head dot
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x0 + head * w, y - shape(tNow) * h, 3, 0, Math.PI * 2);
  ctx.fill();
}

export type ScreenMarks = { rPeaks: number[]; sweepX: number };

/**
 * Three generic monitor layouts, so the bedside pedestal can show that the
 * reading does not depend on any one make:
 *   0  traces left, numerals right (the default)
 *   1  numerals grid — four big numbers, one strip along the top
 *   2  single trace — one wide ECG and one very large heart rate
 */
export const SCREEN_LAYOUTS = ["Traces left · numerals right", "Numerals grid", "Single trace"] as const;

export function drawScreen(canvas: HTMLCanvasElement, t: number, r: ScreenReadings, alarm = 0, layout = 0): ScreenMarks {
  if (layout === 1) return drawGrid(canvas, t, r);
  if (layout === 2) return drawSingle(canvas, t, r);
  return drawDefault(canvas, t, r, alarm);
}

function chrome(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, W: number, H: number) {
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  ctx.fillStyle = "#0A0710";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(246,242,248,0.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 31) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 31) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }
  ctx.textBaseline = "top";
}

function vignette(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const g = ctx.createRadialGradient(W * 0.5, H * 0.45, H * 0.3, W * 0.5, H * 0.5, W * 0.72);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

const ecgShape = (period: number) => (tt: number) => {
  const ph = (((tt % period) + period) % period) / period;
  const x = ph * 60;
  if (x < 8) return -0.05 - 0.06 * (x / 8);
  if (x < 14) return -0.05;
  if (x < 20) return -0.06 - 0.06 * ((x - 14) / 6);
  if (x < 24) return -0.12 + 0.95 * ((x - 20) / 4);
  if (x < 28) return 0.83 - 1.2 * ((x - 24) / 4);
  if (x < 34) return -0.37 + 0.32 * ((x - 28) / 6);
  if (x < 48) return -0.05 + 0.16 * Math.sin(((x - 34) / 14) * Math.PI);
  return -0.05;
};

function drawGrid(canvas: HTMLCanvasElement, t: number, r: ScreenReadings): ScreenMarks {
  const marks: ScreenMarks = { rPeaks: [], sweepX: 0 };
  const ctx = canvas.getContext("2d");
  if (!ctx) return marks;
  const W = DESIGN_W, H = DESIGN_H;
  chrome(ctx, canvas, W, H);
  const period = 60 / r.hr;
  const sweep = (t * 0.19) % 1;
  trace(ctx, AMBER, 84, 30, 18, W - 18, sweep, t, 6, ecgShape(period));
  ctx.fillStyle = AMBER; ctx.font = "500 13px ui-monospace, monospace"; ctx.fillText("ECG II", 18, 30);
  const cell = (x: number, y: number, label: string, value: string, unit: string, color: string) => {
    ctx.fillStyle = INK_DIM; ctx.font = "500 14px ui-monospace, monospace"; ctx.fillText(label, x, y);
    ctx.fillStyle = color; ctx.font = "600 92px ui-monospace, monospace"; ctx.fillText(value, x - 4, y + 18);
    ctx.fillStyle = INK_DIM; ctx.font = "500 13px ui-monospace, monospace"; ctx.fillText(unit, x, y + 118);
  };
  cell(40, 150, "HR", String(r.hr), "bpm", AMBER);
  cell(300, 150, "SpO₂", String(r.spo2), "%", MAGENTA);
  cell(560, 150, "RR", String(r.rr), "/min", VIOLET);
  ctx.fillStyle = INK_DIM; ctx.font = "500 14px ui-monospace, monospace"; ctx.fillText("NIBP", 40, 310);
  ctx.fillStyle = VIOLET; ctx.font = "600 56px ui-monospace, monospace"; ctx.fillText(`${r.sys}/${r.dia}`, 36, 330);
  ctx.fillStyle = INK_DIM; ctx.font = "500 14px ui-monospace, monospace"; ctx.fillText("TEMP", 420, 310);
  ctx.fillStyle = INK; ctx.font = "600 56px ui-monospace, monospace"; ctx.fillText(r.temp.toFixed(1), 416, 330);
  vignette(ctx, W, H);
  return marks;
}

function drawSingle(canvas: HTMLCanvasElement, t: number, r: ScreenReadings): ScreenMarks {
  const marks: ScreenMarks = { rPeaks: [], sweepX: 0 };
  const ctx = canvas.getContext("2d");
  if (!ctx) return marks;
  const W = DESIGN_W, H = DESIGN_H;
  chrome(ctx, canvas, W, H);
  const period = 60 / r.hr;
  const sweep = (t * 0.16) % 1;
  trace(ctx, AMBER, 200, 80, 18, W - 250, sweep, t, 8, ecgShape(period));
  ctx.fillStyle = AMBER; ctx.font = "500 13px ui-monospace, monospace"; ctx.fillText("II  1 mV  25 mm/s", 18, 40);
  ctx.fillStyle = INK_DIM; ctx.font = "500 14px ui-monospace, monospace"; ctx.fillText("HR", W - 220, 60);
  ctx.fillStyle = AMBER; ctx.font = "600 150px ui-monospace, monospace"; ctx.fillText(String(r.hr), W - 228, 80);
  ctx.fillStyle = INK_DIM; ctx.font = "500 14px ui-monospace, monospace"; ctx.fillText("bpm", W - 220, 240);
  ctx.fillStyle = MAGENTA; ctx.font = "600 44px ui-monospace, monospace"; ctx.fillText(`SpO₂ ${r.spo2}`, 18, 330);
  ctx.fillStyle = VIOLET; ctx.fillText(`${r.sys}/${r.dia}`, 330, 330);
  ctx.fillStyle = INK; ctx.fillText(`${r.rr}`, 600, 330);
  vignette(ctx, W, H);
  return marks;
}

function drawDefault(canvas: HTMLCanvasElement, t: number, r: ScreenReadings, alarm = 0): ScreenMarks {
  const marks: ScreenMarks = { rPeaks: [], sweepX: 0 };
  const ctx = canvas.getContext("2d");
  if (!ctx) return marks;
  const W = DESIGN_W, H = DESIGN_H;
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);

  ctx.fillStyle = "#0A0710";
  ctx.fillRect(0, 0, W, H);

  // graticule
  ctx.strokeStyle = "rgba(246,242,248,0.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 31) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 31) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }

  // header strip
  ctx.fillStyle = INK_DIM;
  ctx.font = "500 15px ui-monospace, monospace";
  ctx.textBaseline = "top";
  ctx.fillText("BED 04", 18, 12);
  ctx.fillText("ADULT", 110, 12);
  const hh = String(Math.floor((t / 60) % 24)).padStart(2, "0");
  const mm = String(Math.floor(t % 60)).padStart(2, "0");
  ctx.fillText(`21:${mm}:${hh}`, W - 130, 12);

  const X0 = 18, X1 = 512;
  const period = 60 / r.hr;
  const sweep = ((t * 0.19) % 1);            // sweep speed, screens per second
  const window = 6.0;                          // seconds of trace visible

  // ECG — the sweep is the time axis: u=0 is `window` seconds ago
  const ecg = (tt: number) => {
    const ph = (((tt % period) + period) % period) / period;
    const x = ph * 60 / 1.0;                   // map phase to complex x
    // piecewise complex in "units", scaled to ±1
    if (x < 8) return -0.05 - 0.06 * (x / 8);
    if (x < 14) return -0.05 + 0.06 * ((x - 8) / 6) * 0;
    if (x < 20) return -0.06 - 0.06 * ((x - 14) / 6);
    if (x < 24) return -0.12 + 0.95 * ((x - 20) / 4);
    if (x < 28) return 0.83 - 1.2 * ((x - 24) / 4);
    if (x < 34) return -0.37 + 0.32 * ((x - 28) / 6);
    if (x < 48) return -0.05 + 0.16 * Math.sin(((x - 34) / 14) * Math.PI);
    return -0.05;
  };
  trace(ctx, AMBER, 118, 44, X0, X1, sweep, t, window, ecg);
  // where the R waves are on this frame, for anything that wants to mark them
  {
    const rPhase = (22 / 60) * period;
    const first = Math.floor((t - window) / period) * period + rPhase;
    for (let tb = first; tb <= t; tb += period) {
      if (tb < t - window) continue;
      const u = (((sweep - (t - tb) / window) % 1) + 1) % 1;
      const ahead = ((u - sweep) % 1 + 1) % 1;
      if (ahead < 0.08) continue;
      marks.rPeaks.push(X0 + u * (X1 - X0));
    }
    marks.sweepX = X0 + sweep * (X1 - X0);
  }

  // pleth — a rounded pulse with a dicrotic notch, same period
  const pleth = (tt: number) => {
    const ph = ((((tt - 0.12) % period) + period) % period) / period;
    const a = Math.exp(-Math.pow((ph - 0.18) / 0.09, 2));
    const b = 0.45 * Math.exp(-Math.pow((ph - 0.42) / 0.12, 2));
    return (a + b) * 0.9 - 0.4;
  };
  trace(ctx, MAGENTA, 222, 40, X0, X1, sweep, t, window, pleth);

  // respiration — slow
  const resp = (tt: number) => Math.sin(tt * (r.rr / 60) * Math.PI * 2) * 0.55;
  trace(ctx, VIOLET, 322, 36, X0, X1, sweep, t, window, resp);

  // trace labels
  ctx.font = "500 13px ui-monospace, monospace";
  ctx.fillStyle = AMBER; ctx.fillText("II  1 mV", X0, 62);
  ctx.fillStyle = MAGENTA; ctx.fillText("PLETH", X0, 170);
  ctx.fillStyle = VIOLET; ctx.fillText("RESP", X0, 272);

  // numerals column
  const col = (y: number, label: string, value: string, unit: string, color: string, size = 64) => {
    ctx.fillStyle = INK_DIM;
    ctx.font = "500 13px ui-monospace, monospace";
    ctx.fillText(label, 548, y);
    ctx.fillStyle = color;
    ctx.font = `600 ${size}px ui-monospace, monospace`;
    ctx.fillText(value, 546, y + 16);
    ctx.fillStyle = INK_DIM;
    ctx.font = "500 12px ui-monospace, monospace";
    ctx.fillText(unit, 548 + ctx.measureText(value).width * (size / 12) * 0.98 + 6, y + 16 + size * 0.62);
  };
  const hrFlash = alarm > 0.5 && Math.floor(t * 2) % 2 === 0;
  col(52, "HR", String(r.hr), "bpm", hrFlash ? "#F6F2F8" : AMBER);
  col(162, "SpO₂", String(r.spo2), "%", MAGENTA);
  col(272, "NIBP", `${r.sys}/${r.dia}`, "mmHg", VIOLET, 46);
  ctx.fillStyle = INK_DIM;
  ctx.font = "500 13px ui-monospace, monospace";
  ctx.fillText(`(${Math.round((r.sys + 2 * r.dia) / 3)})`, 548, 332);

  // bottom row: RR and temp, small
  ctx.fillStyle = INK_DIM; ctx.font = "500 13px ui-monospace, monospace";
  ctx.fillText("RR", 548, 372); ctx.fillText("TEMP", 660, 372);
  ctx.fillStyle = VIOLET; ctx.font = "600 30px ui-monospace, monospace";
  ctx.fillText(String(r.rr), 546, 388);
  ctx.fillStyle = INK; ctx.fillText(r.temp.toFixed(1), 658, 388);

  // the soft-key labels along the bottom edge
  ctx.fillStyle = INK_DIM; ctx.font = "500 11px ui-monospace, monospace";
  ["ALARMS", "NIBP", "TRENDS", "FREEZE", "MENU"].forEach((k, i) => ctx.fillText(k, 22 + i * 100, H - 18));

  // a soft vignette so the glass reads as glass
  const g = ctx.createRadialGradient(W * 0.5, H * 0.45, H * 0.3, W * 0.5, H * 0.5, W * 0.72);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  return marks;
}
