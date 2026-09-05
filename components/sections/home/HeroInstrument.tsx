"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  spring,
  springSettle,
  usePrefersReducedMotion,
  useSharedCadence,
} from "@/lib/motion";
import { EvidenceChip } from "@/components/ui/Pill";

/**
 * §01 right — THE INSTRUMENT. Three stages on a hairline spine:
 * Monitor → Structured → Interpreted, driven by the shared 5s cadence.
 * Every 5th cycle the desaturation alert fires, holds ~6s, resolves.
 * The ONLY looping ECG trace on the site lives here.
 *
 * Values come from seeded index-cycling tables (SSR-stable, never
 * Math.random at module scope); co-prime periods keep the loop from
 * reading canned.
 */

const HR_SEQ = [82, 84, 83, 81, 84, 86, 83];
const SPO2_SEQ = [97, 96, 95, 93, 95]; // alert approach 97→96→95→93, recover 93→95→(97)
const SYS_SEQ = [118, 120, 117, 121, 118, 116];
const DIA_SEQ = [76, 77, 75, 78, 76, 74];
const RR_SEQ = [16, 17, 16, 15, 16, 18, 17, 16];

type Vitals = { hr: number; spo2: number; sys: number; dia: number; rr: number };

function vitalsAt(cycle: number): Vitals {
  const spo2 = SPO2_SEQ[cycle % SPO2_SEQ.length];
  const desat = spo2 <= 93;
  return {
    hr: HR_SEQ[cycle % HR_SEQ.length] + (desat ? 4 : 0),
    spo2,
    sys: SYS_SEQ[cycle % SYS_SEQ.length],
    dia: DIA_SEQ[cycle % DIA_SEQ.length],
    rr: RR_SEQ[cycle % RR_SEQ.length] + (desat ? 3 : 0),
  };
}

const ALERT_VITALS: Vitals = { hr: 86, spo2: 93, sys: 121, dia: 78, rr: 19 };

/** Tabular numeral that ticks prev→next when its value changes. */
function TickNumber({
  value,
  delay = 0,
  duration = 0.4,
}: {
  value: number;
  delay?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = value;
    if (prev === value) {
      setDisplay(value);
      return;
    }
    const controls = animate(prev, value, {
      duration,
      delay,
      ease: "linear",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, delay, duration]);
  return <span className="tnum">{display}</span>;
}

const ECG_PATH =
  "M0 20 H28 L34 16 L38 20 H48 L54 4 L60 34 L66 20 H108 L114 16 L118 20 H128 L134 4 L140 34 L146 20 H188 L194 16 L198 20 H208 L214 6 L220 30 L226 20 H240";

const STABLE_GROUPS = ["Trajectory stable", "· no escalation"];
const ROUTED_GROUPS = [
  "Early desaturation pattern",
  "→ routed to duty clinician",
  "· evidence attached",
];

function AssembledSentence({ groups }: { groups: string[] }) {
  return (
    <motion.p
      className="font-body text-body text-ink"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
    >
      {groups.map((g, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 2 },
            show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
          }}
        >
          {g}
          {i < groups.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function HeroInstrument() {
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cycleRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [monitorVitals, setMonitorVitals] = useState<Vitals>(vitalsAt(0));
  const [structVitals, setStructVitals] = useState<Vitals>(vitalsAt(0));
  const [sweepKey, setSweepKey] = useState(0);
  const [stage, setStage] = useState(2);
  const [alert, setAlert] = useState(false);
  const [anchors, setAnchors] = useState<number[]>([0, 0, 0]);

  const later = useCallback((ms: number, fn: () => void) => {
    timeoutsRef.current.push(setTimeout(fn, ms));
  }, []);

  const runCycle = useCallback(() => {
    const c = cycleRef.current + 1;
    cycleRef.current = c;
    const next = vitalsAt(c);
    setStage(0);
    setSweepKey((k) => k + 1);
    later(800, () => setMonitorVitals(next));
    later(1100, () => {
      setStage(1);
      setStructVitals(next);
    });
    later(1400, () => {
      setStage(2);
      if (next.spo2 <= 93) {
        setAlert(true);
        later(6000, () => setAlert(false));
      }
    });
  }, [later]);

  // First sweep at 1.2s after mount; then the shared cadence takes over.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(runCycle, 1200);
    return () => clearTimeout(t);
  }, [reduce, runCycle]);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useSharedCadence(rootRef, runCycle, !reduce);

  // Measure cursor anchors (node offsets) — re-measure on resize + alert reflow.
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAnchors(
      stageRefs.current.map((el) => (el ? el.offsetTop + 3 : 0))
    );
  }, []);

  useEffect(() => {
    measure();
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, [measure, alert]);

  const showAlert = reduce ? true : alert;
  const mv = reduce ? ALERT_VITALS : monitorVitals;
  const sv = reduce ? ALERT_VITALS : structVitals;
  const cursorStage = reduce ? 2 : stage;

  const monitorValues: {
    key: string;
    label: string;
    delay: number;
    node: React.ReactNode;
  }[] = [
    { key: "hr", label: "HR", delay: 0, node: <TickNumber value={mv.hr} /> },
    {
      key: "spo2",
      label: "SpO₂",
      delay: 0.06,
      node: <TickNumber value={mv.spo2} delay={0.06} />,
    },
    {
      key: "nibp",
      label: "NIBP",
      delay: 0.12,
      node: (
        <>
          <TickNumber value={mv.sys} delay={0.12} />
          /
          <TickNumber value={mv.dia} delay={0.12} />
        </>
      ),
    },
    { key: "rr", label: "RR", delay: 0.18, node: <TickNumber value={mv.rr} delay={0.18} /> },
  ];

  const structRows: {
    key: string;
    label: string;
    unit: string;
    alertRow?: boolean;
    node: React.ReactNode;
  }[] = [
    { key: "hr", label: "Heart rate", unit: "bpm", node: <TickNumber value={sv.hr} duration={0.15} /> },
    {
      key: "spo2",
      label: "SpO₂",
      unit: "%",
      alertRow: true,
      node: <TickNumber value={sv.spo2} delay={0.06} duration={0.15} />,
    },
    {
      key: "nibp",
      label: "NIBP",
      unit: "mmHg",
      node: (
        <>
          <TickNumber value={sv.sys} delay={0.12} duration={0.15} />
          /
          <TickNumber value={sv.dia} delay={0.12} duration={0.15} />
        </>
      ),
    },
    { key: "rr", label: "Resp rate", unit: "/min", node: <TickNumber value={sv.rr} delay={0.18} duration={0.15} /> },
  ];

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-card border border-hairline bg-surface p-8 max-md:p-5 lg:min-h-[560px]"
    >
      <div aria-hidden className="chart-paper pointer-events-none absolute inset-0" />

      <div ref={railRef} className="relative pl-10 max-md:pl-8">
        {/* Spine */}
        <motion.span
          aria-hidden
          className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-hairline-strong"
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Position cursor — the hero's magenta pulse dot */}
        <motion.span
          aria-hidden
          className="absolute left-[0.5px] top-0 inline-flex h-1.5 w-1.5"
          initial={false}
          animate={{ y: anchors[cursorStage] ?? 0 }}
          transition={spring}
        >
          {!reduce && (
            <span className="absolute inline-flex h-full w-full animate-live-ping rounded-full bg-accent" />
          )}
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
        </motion.span>

        {/* ── STAGE 1 — Monitor ─────────────────────────────────────── */}
        <motion.div
          ref={(el) => {
            stageRefs.current[0] = el;
          }}
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSettle, delay: 0.15 }}
        >
          <StageNode />
          <div className="font-body text-label text-ink-2">Monitor</div>

          <div className="relative mt-3">
            <svg
              viewBox="0 0 400 300"
              className="h-auto w-full"
              fill="none"
              aria-hidden
            >
              {/* engineering-drawing monitor: single-weight ink strokes */}
              <g className="stroke-ink" strokeWidth="1.5">
                <rect x="8" y="8" width="384" height="248" rx="2" />
                <rect x="28" y="26" width="344" height="212" rx="2" />
                <path d="M186 256 L176 284 M214 256 L224 284" />
                <path d="M156 286 H244" />
              </g>
            </svg>

            {/* readout overlay — aligned to the inset rect (7%/8.7%) */}
            <div className="absolute left-[7%] right-[7%] top-[8.7%] bottom-[20.7%] overflow-hidden">
              <div className="flex h-full flex-col justify-between p-4 max-md:p-2.5">
                <div className="grid grid-cols-4 gap-2">
                  {monitorValues.map((v) => (
                    <div key={v.key} className="min-w-0">
                      <div className="font-body text-label text-ink-3">{v.label}</div>
                      <div className="mt-0.5 font-display text-title tnum text-ink max-md:text-title-sm">
                        {v.node}
                      </div>
                    </div>
                  ))}
                </div>
                <svg viewBox="0 0 240 40" className="h-10 w-full" fill="none" aria-hidden>
                  <path
                    d={ECG_PATH}
                    pathLength={64}
                    strokeDasharray={64}
                    className={cn("stroke-ink", !reduce && "animate-ecg-draw")}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* capture sweep */}
              {!reduce && sweepKey > 0 && (
                <motion.div
                  key={sweepKey}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  initial={{ x: "0%", opacity: 1 }}
                  animate={{ x: "100%", opacity: [1, 1, 0] }}
                  transition={{
                    x: { duration: 0.8, ease: "linear" },
                    opacity: { duration: 0.85, times: [0, 0.94, 1] },
                  }}
                >
                  <span className="absolute left-0 top-0 h-full w-px bg-ink">
                    <span className="absolute left-0 top-0 h-2 w-px bg-accent" />
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          <p className="mt-2 font-body text-label text-ink-3">
            5s capture · camera-on-monitor, never on the patient
          </p>
        </motion.div>

        {/* ── STAGE 2 — Structured ──────────────────────────────────── */}
        <motion.div
          ref={(el) => {
            stageRefs.current[1] = el;
          }}
          className="relative mt-8"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSettle, delay: 0.23 }}
        >
          <StageNode />
          <div className="font-body text-label text-ink-2">Structured</div>

          <div className="mt-2">
            {structRows.map((row) => {
              const rowAlert = showAlert && row.alertRow;
              return (
                <div key={row.key} className="relative">
                  <div className="flex items-baseline gap-3 py-1.5">
                    <span className="flex shrink-0 items-center gap-2 font-body text-label text-ink-2">
                      {rowAlert && (
                        <motion.span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          initial={reduce ? false : { scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={spring}
                        />
                      )}
                      {row.label}
                    </span>
                    <span
                      aria-hidden
                      className="-translate-y-1 min-w-6 flex-1 border-b border-dotted border-hairline-strong"
                    />
                    <span className="font-display text-stat tnum text-ink">
                      {row.node}
                      <span className="ml-1.5 font-body text-label text-ink-3">
                        {row.unit}
                      </span>
                    </span>
                  </div>
                  {rowAlert && (
                    <motion.span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent"
                      initial={reduce ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <EvidenceChip>98% CV</EvidenceChip>
            <EvidenceChip>15+ OEM</EvidenceChip>
          </div>
        </motion.div>

        {/* ── STAGE 3 — Interpreted ─────────────────────────────────── */}
        <motion.div
          ref={(el) => {
            stageRefs.current[2] = el;
          }}
          className="relative mt-8"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSettle, delay: 0.31 }}
        >
          <StageNode />
          <div className="font-body text-label text-ink-2">Interpreted</div>

          <div className="mt-2 min-h-[3.5rem]">
            {reduce ? (
              <p className="font-body text-body text-ink">
                {ROUTED_GROUPS.join(" ")}
              </p>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <AssembledSentence
                  key={showAlert ? "routed" : "stable"}
                  groups={showAlert ? ROUTED_GROUPS : STABLE_GROUPS}
                />
              </AnimatePresence>
            )}

            {showAlert && (
              <div className="mt-3 flex gap-2">
                <EvidenceChip>
                  SpO₂{" "}
                  <span className="ml-1 underline decoration-accent decoration-2 underline-offset-2">
                    93
                  </span>
                </EvidenceChip>
                <EvidenceChip>trend 12m</EvidenceChip>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** 7px hairline-ringed node on the spine. */
function StageNode() {
  return (
    <span
      aria-hidden
      className="absolute -left-10 top-[3px] h-[7px] w-[7px] rounded-full border border-hairline-strong bg-paper max-md:-left-8"
    />
  );
}
