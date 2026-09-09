"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { clinicalAiInAction, howItWorks, trust } from "@/content/home";
import { animate, stagger } from "animejs";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";
import { DEFAULT_READINGS, DESIGN_W, drawScreen, SCREEN_PX_H, SCREEN_PX_W } from "@/lib/scene/screen";
import { clamp01 } from "@/lib/scene/draw";
import { sceneState } from "@/lib/scene/state";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * §01–02 — capture and extract. What the unit sees, and what it makes of it.
 *
 * Pinned for three screens. On the right, the frame the unit just took: it
 * arrives as a photograph at an angle, squares itself up (the product's
 * "aligned" step), boxes draw around every numeral and around the ECG strip
 * with its R-peaks marked — exactly what the vision layer does — and then the
 * values lift off the glass into time-stamped rows. anime.js does the
 * lift-off; scroll does everything before it.
 */

const capture = howItWorks.steps.find((s) => s.step === "01")!;
const extract = howItWorks.steps.find((s) => s.step === "02")!;

const BEATS = [
  {
    at: 0,
    eyebrow: "01 · Capture",
    head: "A camera on the monitor. Not the patient.",
    body: capture.body,
    foot: trust.postures[0],
  },
  {
    at: 0.36,
    eyebrow: "02 · Extract",
    head: "Every numeral. Every waveform. Every two seconds.",
    body: extract.body,
    foot: clinicalAiInAction.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(" · "),
  },
  {
    at: 0.68,
    eyebrow: "Ground truth",
    head: "Read off certified glass. Not estimated on a wrist.",
    body: "Every other physiological model learns from wearables and add-on sensors, which approximate. ASTA's training data is what the hospital's own certified monitor displayed — the same number the clinician trusted at the bedside.",
    foot: "structured · time-stamped · 1,000 samples per vital per window",
  },
];

/** Boxes the vision layer draws, in % of the frame. Matches screen.ts. */
const BOXES = [
  { id: "ecg", x: 2.0, y: 15.0, w: 67.5, h: 19.5, color: "#F09030", label: "ECG · lead II" },
  { id: "hr", x: 72.6, y: 11.2, w: 22.5, h: 18.5, color: "#F09030", label: "HR" },
  { id: "spo2", x: 72.6, y: 35.6, w: 22.5, h: 18.5, color: "#DE2588", label: "SpO₂" },
  { id: "nibp", x: 72.6, y: 60.2, w: 25.5, h: 15.5, color: "#8A4FE0", label: "NIBP" },
  { id: "rr", x: 72.6, y: 82.6, w: 12.5, h: 12.5, color: "#8A4FE0", label: "RR" },
];

const ROWS = [
  ["21:03:40", "92", "100", "160/76", "18"],
  ["21:03:42", "92", "100", "160/76", "18"],
  ["21:03:44", "93", "100", "160/76", "18"],
  ["21:03:46", "93", "99", "160/76", "17"],
  ["21:03:48", "92", "100", "160/76", "18"],
];

export function TheCapture() {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const peaks = useRef<HTMLDivElement>(null);
  const boxes = useRef<HTMLDivElement>(null);
  const rows = useRef<HTMLDivElement>(null);
  const truth = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const lifted = useRef(false);
  const prog = useRef(0);
  const reduced = usePrefersReducedMotion();

  useSceneShot(ref, "capture", { start: "top top", end: "bottom bottom" });

  // the frame: the same renderer the 3D glass uses, on a DOM canvas — running
  // only while this section is on screen, at 15 fps
  useEffect(() => {
    let raf = 0;
    let last = 0;
    let inView = false;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !raf) raf = requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    const tick = (now: number) => {
      raf = inView ? requestAnimationFrame(tick) : 0;
      if (!inView) return;
      if (now - last < 1000 / 15) return;
      last = now;
      const c = canvas.current;
      if (!c) return;
      const t = (now - t0) / 1000;
      const marks = drawScreen(c, t, DEFAULT_READINGS);
      // R-peak marks — pink lines, as in the product
      const host = peaks.current;
      if (host) {
        const p = prog.current;
        const on = clamp01((p - 0.5) / 0.1);
        const kids = host.children;
        for (let i = 0; i < kids.length; i += 1) {
          const el = kids[i] as HTMLElement;
          const x = marks.rPeaks[i];
          if (x === undefined) { el.style.opacity = "0"; continue; }
          el.style.left = `${(x / DESIGN_W) * 100}%`;
          el.style.opacity = String(on);
        }
      }
    };
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        prog.current = p;
        // The 3D glass hands over to the DOM frame in the first tenth.
        sceneState.capture = clamp01(p / 0.12);

        let next = 0;
        for (let i = BEATS.length - 1; i >= 0; i -= 1) if (p >= BEATS[i].at) { next = i; break; }
        setBeat((b) => (b === next ? b : next));

        // 1 — the photograph squares itself up
        const align = clamp01((p - 0.04) / 0.22);
        const e = 1 - Math.pow(1 - align, 3);
        if (frame.current) {
          frame.current.style.transform = `perspective(1100px) rotateY(${-22 * (1 - e)}deg) rotateX(${7 * (1 - e)}deg) scale(${0.88 + 0.12 * e})`;
          frame.current.style.opacity = String(clamp01(p / 0.06));
        }
        // 2 — the boxes draw, one after another
        if (boxes.current) {
          const kids = boxes.current.children;
          for (let i = 0; i < kids.length; i += 1) {
            const d = clamp01((p - 0.3 - i * 0.035) / 0.12);
            (kids[i] as HTMLElement).style.setProperty("--d", String(d));
          }
        }
        // 3 — the values lift off, once
        if (p > 0.66 && !lifted.current && rows.current) {
          lifted.current = true;
          if (!reduced) {
            animate(rows.current.querySelectorAll("[data-row]"), {
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 700,
              delay: stagger(110),
              ease: "outCubic",
            });
          } else {
            rows.current.querySelectorAll<HTMLElement>("[data-row]").forEach((r) => { r.style.opacity = "1"; });
          }
        }
        if (truth.current) truth.current.style.opacity = String(clamp01((p - 0.7) / 0.12));
      },
    });
    return () => trigger.kill();
  }, [reduced]);

  return (
    <section ref={ref} className="relative h-[340svh]">
      <div className="sticky top-0 flex h-[100svh] items-start overflow-hidden pt-16 lg:items-center lg:pt-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-paper/80" />

        <Container wide>
          <div className="relative grid items-start gap-5 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center lg:gap-10">
            {/* ── the argument ── */}
            <div className="order-last lg:order-none">
              <div className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-7 bg-hairline-strong" />
                <span className="machine text-ink-2">{BEATS[beat].eyebrow}</span>
              </div>
              <div className="relative mt-4 min-h-[11rem] lg:mt-6 lg:min-h-[17rem]">
                {BEATS.map((b, i) => (
                  <div
                    key={b.head}
                    aria-hidden={i !== beat}
                    className="absolute inset-0 transition-[opacity,transform] duration-500 ease-rule"
                    style={{
                      opacity: i === beat ? 1 : 0,
                      transform: `translateY(${i === beat ? 0 : i < beat ? -14 : 14}px)`,
                      pointerEvents: i === beat ? "auto" : "none",
                    }}
                  >
                    <h2 className="max-w-[18ch] font-display text-[1.5rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink lg:text-[clamp(1.7rem,2.6vw,2.35rem)]">
                      {b.head}
                    </h2>
                    <p className="mt-3 max-w-[42ch] font-body text-body text-pretty text-ink-2 lg:mt-4">{b.body}</p>
                    <p className="machine mt-4 hidden text-ink-3 sm:block lg:mt-5">{b.foot}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── the frame ── */}
            <div className="relative">
              <div
                ref={frame}
                className="relative mx-auto aspect-[744/448] w-full max-w-[40rem] rounded-card border border-hairline bg-paper shadow-card will-change-transform"
                style={{ opacity: 0 }}
              >
                <canvas ref={canvas} width={SCREEN_PX_W} height={SCREEN_PX_H} className="absolute inset-0 h-full w-full rounded-card" />

                {/* corner brackets — the aligned frame */}
                {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "left-2 bottom-2 border-l border-b", "right-2 bottom-2 border-r border-b"].map((c) => (
                  <span key={c} aria-hidden className={`absolute h-4 w-4 border-ink/60 ${c}`} />
                ))}

                {/* R-peaks — pink lines */}
                <div ref={peaks} aria-hidden className="pointer-events-none absolute inset-0">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="absolute top-[14%] h-[21%] w-px bg-accent" style={{ opacity: 0, left: 0, boxShadow: "0 0 6px #DE2588" }} />
                  ))}
                </div>

                {/* the vision layer's boxes */}
                <div ref={boxes} aria-hidden className="pointer-events-none absolute inset-0">
                  {BOXES.map((b) => (
                    <div
                      key={b.id}
                      className="absolute"
                      style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`, ["--d" as string]: 0 }}
                    >
                      {/* four edges, each drawing along its own length */}
                      <span className="absolute left-0 top-0 h-px w-full origin-left" style={{ background: b.color, transform: "scaleX(var(--d))" }} />
                      <span className="absolute right-0 top-0 h-full w-px origin-top" style={{ background: b.color, transform: "scaleY(var(--d))" }} />
                      <span className="absolute bottom-0 right-0 h-px w-full origin-right" style={{ background: b.color, transform: "scaleX(var(--d))" }} />
                      <span className="absolute bottom-0 left-0 h-full w-px origin-bottom" style={{ background: b.color, transform: "scaleY(var(--d))" }} />
                      <span className="machine absolute -top-4 left-0 whitespace-nowrap text-[10px]" style={{ color: b.color, opacity: "calc(var(--d) * var(--d))" }}>
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── under the frame: the values off the glass, and what they are worth ── */}
              <div className="mx-auto mt-3 grid w-full max-w-[40rem] gap-4 lg:mt-4 lg:grid-cols-[1.4fr_1fr]">
                <div ref={rows}>
                  <div className="grid grid-cols-[4.6rem_1fr_1fr_1.3fr_0.8fr] gap-x-2 border-b border-hairline pb-1">
                    {["time", "HR", "SpO₂", "NIBP", "RR"].map((h) => (
                      <span key={h} className="machine text-ink-3">{h}</span>
                    ))}
                  </div>
                  {ROWS.map((r, i) => (
                    <div key={r[0]} data-row className={"grid grid-cols-[4.6rem_1fr_1fr_1.3fr_0.8fr] gap-x-2 border-b border-hairline/60 py-[5px] font-machine text-[12px] tabular-nums text-ink" + (i >= 3 ? " max-lg:hidden" : "")} style={{ opacity: 0 }}>
                      <span className="text-ink-3">{r[0]}</span>
                      <span className="text-amber">{r[1]}</span>
                      <span className="text-accent">{r[2]}</span>
                      <span className="text-violet">{r[3]}</span>
                      <span className="text-violet">{r[4]}</span>
                    </div>
                  ))}
                </div>
                <div ref={truth} className="hidden gap-2 lg:grid" style={{ opacity: 0, transition: "opacity 300ms" }}>
                  <TruthTrace label="Monitor glass · read" tone="#F09030" jitter={0} note="what the clinician saw" />
                  <TruthTrace label="Wearable · estimated" tone="#7C7189" jitter={1} note="what others train on" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/** Two small traces of the same heart rate: exact vs approximated. */
function TruthTrace({ label, tone, jitter, note }: { label: string; tone: string; jitter: number; note: string }) {
  const W = 300, H = 40;
  const pts: string[] = [];
  for (let i = 0; i <= 60; i += 1) {
    const u = i / 60;
    const base = 92 + Math.sin(u * 6.2) * 3 + (u > 0.62 ? (u - 0.62) * 22 : 0);
    // the wearable lags, smooths, and wanders
    const v = jitter ? 92 + Math.sin((u - 0.09) * 6.2) * 1.6 + (u > 0.72 ? (u - 0.72) * 9 : 0) + Math.sin(u * 31) * 1.7 : base;
    const y = H - ((v - 84) / 20) * (H - 8) - 4;
    pts.push(`${(u * W).toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <div className="rounded-card border border-hairline bg-well/50 px-3 py-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="machine whitespace-nowrap" style={{ color: tone }}>{label}</span>
        <span className="truncate text-[10.5px] text-ink-3">{note}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 h-9 w-full" aria-hidden preserveAspectRatio="none">
        <polyline points={pts.join(" ")} fill="none" stroke={tone} strokeWidth={jitter ? 1.2 : 1.6} strokeDasharray={jitter ? "3 3" : undefined} />
      </svg>
    </div>
  );
}
