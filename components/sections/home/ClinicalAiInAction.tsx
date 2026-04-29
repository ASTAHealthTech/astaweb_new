import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { clinicalAiInAction } from "@/content/home";

/* ─── Static data ─────────────────────────────────────────── */
const VITALS = [
  {
    ch: "HR",
    val: "78",
    unit: "bpm",
    status: "NORMAL",
    color: "#4F6BFF",
    range: "60–100",
    spark: "M0 18 L8 14 L16 10 L24 12 L32 8 L40 10 L48 10",
  },
  {
    ch: "SpO₂",
    val: "97",
    unit: "%",
    status: "NORMAL",
    color: "#28D7B5",
    range: "95–100",
    spark: "M0 8 L8 8 L16 6 L24 8 L32 6 L40 6 L48 6",
  },
  {
    ch: "RR",
    val: "18",
    unit: "/min",
    status: "NORMAL",
    color: "#7C5CFF",
    range: "12–20",
    spark: "M0 14 L8 12 L16 14 L24 10 L32 12 L40 12 L48 12",
  },
  {
    ch: "BP",
    val: "124",
    unit: "/78 mmHg",
    status: "NORMAL",
    color: "#49C6FF",
    range: "Sys 90–140",
    spark: "M0 10 L8 8 L16 10 L24 8 L32 8 L40 10 L48 10",
  },
  {
    ch: "Temp",
    val: "37.1",
    unit: "°C",
    status: "NORMAL",
    color: "#28D7B5",
    range: "36.5–37.5",
    spark: "M0 14 L8 12 L16 10 L24 12 L32 12 L40 12 L48 12",
  },
] as const;

const ALERTS = [
  { sev: "INFO", bed: "ICU-04", msg: "Vitals stable · trend nominal", color: "#4F6BFF", ts: "09:42" },
  { sev: "WARN", bed: "WARD-12", msg: "SpO₂ dip · nurse alerted", color: "#F59E0B", ts: "09:41" },
  { sev: "OK",   bed: "ICU-02", msg: "Escalation acknowledged", color: "#28D7B5", ts: "09:39" },
] as const;

const AUDIT = [
  { t: "09:42:31", msg: "trend window · risk=0.04 · stable" },
  { t: "09:42:26", msg: "audit logged · role=nurse · ok" },
  { t: "09:42:19", msg: "alert routed · dest=nurse_stn" },
  { t: "09:42:17", msg: "vitals ingested · latency=340ms" },
] as const;

const AI_STATS = [
  { label: "Risk score", val: "0.04", note: "Low", color: "#28D7B5" },
  { label: "Trend", val: "Stable", note: "30 min window", color: "#4F6BFF" },
  { label: "Rhythm", val: "NSR", note: "Normal sinus", color: "#7C5CFF" },
] as const;

// 5-beat ECG path — viewBox "0 0 900 80", baseline y=50
const ECG_PATH =
  "M 0 50 H 10 C 13 50 14 42 18 50 H 32 L 34 56 L 37 6 L 40 56 C 40 56 46 50 52 50 C 52 50 58 36 65 36 C 72 36 78 36 84 50 H 170 C 173 50 174 42 178 50 H 192 L 194 56 L 197 6 L 200 56 C 200 56 206 50 212 50 C 212 50 218 36 225 36 C 232 36 238 36 244 50 H 330 C 333 50 334 42 338 50 H 352 L 354 56 L 357 6 L 360 56 C 360 56 366 50 372 50 C 372 50 378 36 385 36 C 392 36 398 36 404 50 H 490 C 493 50 494 42 498 50 H 512 L 514 56 L 517 6 L 520 56 C 520 56 526 50 532 50 C 532 50 538 36 545 36 C 552 36 558 36 564 50 H 650 C 653 50 654 42 658 50 H 672 L 674 56 L 677 6 L 680 56 C 680 56 686 50 692 50 C 692 50 698 36 705 36 C 712 36 718 36 724 50 H 900";

const BULLET_COLORS = [
  ["#4F6BFF", "#7C5CFF"],
  ["#7C5CFF", "#49C6FF"],
  ["#49C6FF", "#28D7B5"],
  ["#28D7B5", "#4F6BFF"],
] as const;

/* ─── Main section ───────────────────────────────────────── */
export function ClinicalAiInAction() {
  return (
    <section className="relative overflow-hidden bg-canvas py-20 md:py-28 dark:bg-night-deep">
      {/* BG layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Light mode subtle grid */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.04) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Dark mode grid */}
        <div className="absolute inset-0 hidden dark:block bg-grid-fine bg-[length:44px_44px] opacity-60" />
        {/* Glows */}
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-brand-500/[0.06] blur-[130px] dark:bg-brand-500/[0.09]" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/[0.04] blur-[120px] dark:bg-violet-500/[0.07]" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-400/[0.04] blur-[100px] dark:bg-cyan-400/[0.06]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/30" />
      </div>

      <Container className="relative">
        {/* ── TOP: Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500 dark:bg-cyan-400" />
              {clinicalAiInAction.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold leading-[1.08] tracking-[-0.04em] text-balance text-ink dark:text-frost">
              {clinicalAiInAction.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {clinicalAiInAction.sub}
            </p>
          </Reveal>
        </div>

        {/* ── MIDDLE: Monitor panel ── */}
        <Reveal delay={0.14}>
          <div className="relative mt-14">
            {/* Outer glow — visible in both modes */}
            <div
              aria-hidden
              className="absolute inset-[-24px] rounded-[36px] blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(79,107,255,0.22) 0%, rgba(73,198,255,0.10) 50%, transparent 70%)",
                opacity: 0.7,
              }}
            />
            <MonitorPanel />
          </div>
        </Reveal>

        {/* ── BOTTOM: Feature bullets + CTA ── */}
        <div className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {clinicalAiInAction.bullets.map((bullet, i) => (
              <Reveal key={bullet.title} delay={0.22 + i * 0.05}>
                <div className="group flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_-12px_rgba(79,107,255,0.20)] dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-none dark:hover:border-brand-500/25 dark:hover:bg-brand-500/[0.04]">
                  <span
                    className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-xl text-[10px] font-bold text-white shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${BULLET_COLORS[i][0]}, ${BULLET_COLORS[i][1]})`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.88rem] font-semibold text-ink dark:text-frost">
                      {bullet.title}
                    </div>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-ink-muted dark:text-frost-muted">
                      {bullet.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.42}>
            <div className="mt-9 flex justify-center">
              <Button
                href={clinicalAiInAction.primaryCta.href}
                variant="glow"
                size="lg"
                trailingIcon
              >
                {clinicalAiInAction.primaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ─── Monitor Panel ─────────────────────────────────────── */
function MonitorPanel() {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/[0.10] bg-[#050810] text-white shadow-[0_60px_200px_-60px_rgba(4,8,24,0.95),0_0_0_1px_rgba(255,255,255,0.04)]">
      {/* Internal ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-brand-500/[0.12] blur-[80px]" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[90px]" />
        <div className="absolute bottom-0 left-1/3 h-52 w-72 rounded-full bg-violet-500/[0.08] blur-[80px]" />
      </div>

      {/* Top shine */}
      <div
        aria-hidden
        className="absolute inset-x-[6%] top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.28), transparent)" }}
      />

      {/* ── Title bar ── */}
      <div className="relative flex items-center justify-between border-b border-white/[0.07] bg-white/[0.015] px-6 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <div className="mx-3 h-4 w-px bg-white/[0.10]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            ASTA · Clinical Intelligence · Ward 4 · ICU-04
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] text-white/25 sm:block">
            09:42:31
          </span>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.10] px-2.5 py-1 font-mono text-[9.5px] font-bold text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            LIVE
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative space-y-4 p-5 md:p-7">
        {/* ECG Waveform — large, prominent */}
        <ECGPanel />

        {/* Vitals grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {VITALS.map((v, i) => (
            <VitalCard key={v.ch} vital={v} idx={i} />
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid gap-3 lg:grid-cols-3">
          <AIAnalysisPanel />
          <AlertQueuePanel />
          <SystemStatusPanel />
        </div>
      </div>
    </div>
  );
}

/* ─── ECG single wave (used twice for seamless loop) ──── */
function ECGWave({ suffix }: { suffix: string }) {
  const gId = `ecg-g-${suffix}`;
  const glowId = `ecg-glow-${suffix}`;
  const trailId = `ecg-trail-${suffix}`;
  return (
    <svg
      viewBox="0 0 900 80"
      preserveAspectRatio="none"
      style={{ width: "50%", height: 90, flex: "none" }}
    >
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4F6BFF" />
          <stop offset="30%" stopColor="#7C5CFF" />
          <stop offset="60%" stopColor="#49C6FF" />
          <stop offset="100%" stopColor="#28D7B5" />
        </linearGradient>
        <filter id={glowId} x="-5%" y="-40%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={trailId} x="-5%" y="-40%" width="110%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
        </filter>
      </defs>
      <line x1="0" y1="50" x2="900" y2="50" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      <path
        d={ECG_PATH}
        fill="none"
        stroke={`url(#${gId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${trailId})`}
        opacity="0.22"
      />
      <path
        d={ECG_PATH}
        fill="none"
        stroke={`url(#${gId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}

/* ─── ECG Panel ─────────────────────────────────────────── */
function ECGPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#020408]">
      {/* Clinical graph paper grid — fine */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Clinical graph paper grid — major */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.055) 1px,transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      {/* Header row */}
      <div className="relative flex items-center justify-between px-5 pt-3.5 pb-1">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/25">
            LEAD II — ECG
          </span>
          <span className="h-3 w-px bg-white/[0.10]" />
          <span className="text-[9px] text-white/18">25 mm/s · 10 mm/mV · 0.5–40 Hz</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-400/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            CONTINUOUS
          </span>
          <span className="text-[9px] text-white/20">HR: 78 bpm</span>
        </div>
      </div>

      {/* Scrolling waveform */}
      <div className="relative overflow-hidden pb-4 pt-1">
        {/* Left fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
          style={{ background: "linear-gradient(to right,#020408,transparent)" }}
        />
        {/* Right fade + cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16"
          style={{ background: "linear-gradient(to left,#020408 30%,transparent)" }}
        />
        {/* Pulsing write cursor */}
        <div
          aria-hidden
          className="absolute right-5 top-1/2 z-20 -translate-y-1/2"
          style={{ animation: "vitals-tick 0.9s ease-in-out infinite" }}
        >
          <div className="h-[52px] w-0.5 rounded-full bg-brand-400/70" />
          <div
            className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-400"
            style={{ boxShadow: "0 0 8px #4F6BFF,0 0 16px #4F6BFF80" }}
          />
        </div>
        {/* Dual-wave scroll container (seamless loop) */}
        <div
          style={{
            display: "flex",
            width: "200%",
            animation: "ecg-scroll 6s linear infinite",
          }}
        >
          <ECGWave suffix="a" />
          <ECGWave suffix="b" />
        </div>
      </div>
    </div>
  );
}

/* ─── Vital Card ─────────────────────────────────────────── */
function VitalCard({ vital, idx }: { vital: (typeof VITALS)[number]; idx: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5 transition-colors hover:border-white/[0.10]"
    >
      {/* Color accent top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${vital.color}00, ${vital.color}, ${vital.color}00)` }}
      />

      {/* Status badge */}
      <div className="mb-2.5 flex items-center justify-between">
        <span
          className="text-[8.5px] font-bold uppercase tracking-[0.18em]"
          style={{ color: vital.color }}
        >
          {vital.ch}
        </span>
        <span
          className="rounded-sm px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.1em]"
          style={{ background: `${vital.color}18`, color: vital.color }}
        >
          {vital.status}
        </span>
      </div>

      {/* Big number */}
      <div className="flex items-baseline gap-1">
        <span
          className="font-mono text-[1.65rem] font-bold leading-none tracking-[-0.03em] text-white"
          style={{ animation: `vitals-tick ${1.4 + idx * 0.35}s ease-in-out infinite` }}
        >
          {vital.val}
        </span>
        <span className="text-[0.65rem] text-white/60">{vital.unit}</span>
      </div>

      {/* Sparkline */}
      <svg
        viewBox="0 0 48 24"
        className="mt-2 w-full"
        style={{ height: 20 }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`spark-${vital.ch}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={vital.color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={vital.color} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={vital.spark}
          fill="none"
          stroke={`url(#spark-${vital.ch})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Range label */}
      <div className="mt-1 text-[8px] text-white/48">{vital.range}</div>
    </div>
  );
}

/* ─── AI Analysis Panel ─────────────────────────────────── */
function AIAnalysisPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025]">
      <div className="border-b border-white/[0.05] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
            AI Clinical Analysis
          </span>
        </div>
      </div>
      <div className="space-y-3 p-4">
        {AI_STATS.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div>
              <div className="text-[8.5px] uppercase tracking-[0.14em] text-white/28">{s.label}</div>
              <div className="mt-0.5 font-mono text-[0.92rem] font-bold" style={{ color: s.color }}>
                {s.val}
              </div>
            </div>
            <span
              className="rounded-full px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em]"
              style={{ background: `${s.color}14`, color: s.color }}
            >
              {s.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Alert Queue Panel ─────────────────────────────────── */
function AlertQueuePanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025]">
      <div className="border-b border-white/[0.05] px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
              Alert Queue
            </span>
          </div>
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[8.5px] text-white/35">
            {ALERTS.length} active
          </span>
        </div>
      </div>
      <div className="space-y-2 p-3">
        {ALERTS.map((a) => (
          <div
            key={a.bed}
            className="flex items-start gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.03] px-3 py-2.5"
          >
            <span
              className="mt-0.5 flex-none rounded px-1.5 py-0.5 font-mono text-[8px] font-bold"
              style={{ background: `${a.color}20`, color: a.color }}
            >
              {a.sev}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono text-[9.5px] font-semibold text-white/70">{a.bed}</span>
                <span className="font-mono text-[8px] text-white/25">{a.ts}</span>
              </div>
              <div className="mt-0.5 text-[9px] text-white/40">{a.msg}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── System Status Panel ───────────────────────────────── */
function SystemStatusPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025]">
      <div className="border-b border-white/[0.05] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
            System Status
          </span>
        </div>
      </div>
      <div className="space-y-2.5 p-4">
        {/* Audit log */}
        <div className="space-y-1.5 font-mono">
          {AUDIT.map((l) => (
            <div key={l.t} className="flex items-start gap-2">
              <span className="w-14 flex-none text-right text-[8.5px] text-white/45">{l.t}</span>
              <span className="text-[8.5px] text-white/40">{l.msg}</span>
            </div>
          ))}
        </div>
        {/* Status footer */}
        <div
          className="mt-1 rounded-lg border border-emerald-500/15 px-3 py-2"
          style={{ background: "rgba(18,185,129,0.05)" }}
        >
          <div className="font-mono text-[8.5px] text-white/35">
            uptime=99.97% · latency=&lt;800ms · beds=active
          </div>
        </div>
      </div>
    </div>
  );
}
