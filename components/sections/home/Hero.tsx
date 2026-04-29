import { Icon } from "@/components/ui/Icon";
import { hero } from "@/content/home";
import { cn } from "@/lib/cn";

// ─── Data ─────────────────────────────────────────────────────────────────────
const VITALS = [
  { label: "Heart Rate",  value: "78",     unit: "bpm",  color: "#4F8CFF", spark: "ecg"  },
  { label: "SpO\u2082",   value: "97",     unit: "%",    color: "#28D7B5", spark: "sine" },
  { label: "Blood Press", value: "124/78", unit: "mmHg", color: "#49C6FF", spark: "bp"   },
];

const SPARK: Record<string, string> = {
  ecg:  "M0,8 L4,8 L5,6 L6,8 L9,8 L10,11 L11,1 L12,15 L13,8 L18,8 L28,8 L32,8 L33,6 L34,8 L37,8 L38,11 L39,1 L40,15 L41,8 L46,8 L56,8",
  sine: "M0,8 C7,3 14,13 21,8 C28,3 35,13 42,8 C49,3 56,13 56,8",
  bp:   "M0,11 L3,11 L4,4 L5,11 L10,11 L11,7 L12,11 L21,11 L22,4 L23,11 L32,11 L33,7 L34,11 L43,11 L44,4 L45,11 L54,11 L55,7 L56,11",
};

const ECG_PATH =
  "M0,15 L50,15 L57,12 L61,15 L69,15 L71,20 L73,2 L74.5,28 L76,15 L90,15" +
  " L168,15 L215,15 L222,12 L226,15 L234,15 L236,20 L238,2 L239.5,28 L241,15 L255,15" +
  " L333,15 L380,15 L387,12 L391,15 L399,15 L401,20 L403,2 L404.5,28 L406,15 L420,15" +
  " L498,15 L545,15 L552,12 L556,15 L564,15 L566,20 L568,2 L569.5,28 L571,15 L585,15" +
  " L663,15 L710,15 L717,12 L721,15 L729,15 L731,20 L733,2 L734.5,28 L736,15 L750,15 L800,15";

const STATUS_ITEMS = [
  { label: "24 patients monitored", color: "#28D7B5" },
  { label: "0 active escalations",  color: "#12B981" },
  { label: "Inference < 2s",        color: "#4F8CFF" },
  { label: "Active",                color: "#4F8CFF" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      data-hero-root
      className="relative min-h-dvh overflow-hidden bg-night-deep text-white"
      aria-label="Hero"
    >
      {/* ── BG glows ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[20vw] -top-[10vh] h-[80vw] w-[80vw] max-h-[1000px] max-w-[1000px] rounded-full bg-brand-500/[0.10] blur-[200px]" />
        <div className="absolute -right-[10vw] top-[5vh] h-[65vw] w-[65vw] max-h-[900px] max-w-[900px] rounded-full bg-violet-600/[0.08] blur-[190px]" />
        <div className="absolute left-[15vw] bottom-0 h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full bg-cyan-400/[0.05] blur-[190px]" />
        <div className="absolute left-1/2 top-[46%] h-[40vw] w-[40vw] max-h-[600px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.05] blur-[160px]" />
        <div className="absolute inset-0 bg-grid-fine bg-[length:52px_52px] opacity-100" />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,rgba(255,255,255,0.9) 0px,rgba(255,255,255,0.9) 1px,transparent 1px,transparent 4px)",
          }}
        />
      </div>

      {/* ── Directional flow lines ── */}
      <FlowLines />

      {/* ════ DESKTOP — 3-column flex fills full viewport ════ */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:flex items-center"
        style={{
          paddingTop:    "clamp(64px, 7vh, 96px)",
          paddingBottom: "clamp(88px, 10vh, 120px)",
          paddingLeft:   "clamp(16px, 2.5vw, 48px)",
          paddingRight:  "clamp(16px, 2.5vw, 48px)",
        }}
      >

        {/* ── LEFT COLUMN: 3 items, justify-between ── */}
        <div
          className="flex h-full flex-col items-start justify-between"
          style={{
            width:         "clamp(200px, 26vw, 340px)",
            paddingTop:    "clamp(8px, 3vh, 40px)",
            paddingBottom: "clamp(8px, 3vh, 40px)",
          }}
        >
          <DataChannel {...VITALS[0]} idx={0} align="right" />
          <SignalSource />
          <DataChannel {...VITALS[2]} idx={2} align="right" />
        </div>

        {/* ── CENTER COLUMN: stage flow strip + AI pill + orb ── */}
        <div className="flex flex-1 flex-col items-center justify-center" style={{ gap: "clamp(10px, 1.6vh, 20px)" }}>

          {/* Stage transformation path */}
          <div className="flex items-center gap-2.5">
            <span className="text-[0.52rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#4F8CFF70" }}>
              01 · Capture
            </span>
            <svg width="18" height="6" viewBox="0 0 18 6" fill="none" aria-hidden>
              <path d="M0 3 L12 3 M9 1 L14 3 L9 5" stroke="rgba(73,198,255,0.28)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.52rem] font-bold uppercase tracking-[0.16em] text-frost/30">
              02 · Interpret
            </span>
            <svg width="18" height="6" viewBox="0 0 18 6" fill="none" aria-hidden>
              <path d="M0 3 L12 3 M9 1 L14 3 L9 5" stroke="rgba(73,198,255,0.28)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.52rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#FBBF2470" }}>
              03 · Escalate
            </span>
          </div>

          {/* AI active pill */}
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="whitespace-nowrap text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-frost/45">
              ASTA · AI active
            </span>
          </div>

          {/* Orb */}
          <div
            className="relative"
            style={{ width: "min(38vw, 58vh, 560px)", aspectRatio: "1 / 1" }}
          >
            <IntelligenceCore />
          </div>
        </div>

        {/* ── RIGHT COLUMN: 3 items, justify-between ── */}
        <div
          className="flex h-full flex-col items-end justify-between"
          style={{
            width:         "clamp(200px, 26vw, 340px)",
            paddingTop:    "clamp(8px, 3vh, 40px)",
            paddingBottom: "clamp(8px, 3vh, 40px)",
          }}
        >
          <DataChannel {...VITALS[1]} idx={1} align="left" />
          <AlertOutput />
          <WardCoverage />
        </div>

      </div>

      {/* ════ MOBILE ════ */}
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 pb-36 pt-20 lg:hidden">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-frost/45">
            ASTA · AI active
          </span>
        </div>
        <div className="relative" style={{ width: "min(80vw, 72vh, 300px)", aspectRatio: "1" }}>
          <div className="absolute inset-0 rounded-full bg-brand-500/[0.15] blur-[80px]" />
          <div className="relative h-full w-full">
            <IntelligenceCore />
          </div>
        </div>
        <div className="flex w-full max-w-[320px] items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F8CFF]" style={{ boxShadow: "0 0 5px #4F8CFF" }} />
            <span className="font-mono text-[0.56rem] text-[#4F8CFF99]">BED-04 · Existing monitor</span>
          </div>
          <svg width="24" height="8" viewBox="0 0 24 8" fill="none" aria-hidden>
            <path d="M0 4 L18 4 M14 1.5 L21 4 L14 6.5" stroke="rgba(73,198,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/[0.22] bg-amber-500/[0.07] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span className="font-mono text-[0.56rem] text-amber-400/80">Alert · Ward 3</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-7 gap-y-5">
          {VITALS.map((v, i) => (
            <DataChannel key={v.label} {...v} idx={i} align="left" />
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div aria-hidden className="pointer-events-none absolute bottom-[110px] left-1/2 -translate-x-1/2">
        <svg className="h-5 w-5 animate-bounce text-frost/20" viewBox="0 0 20 20" fill="none">
          <path d="M10 5 L10 13 M6.5 9.5 L10 13 L13.5 9.5"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ── ECG strip ── */}
      <div className="pointer-events-none absolute bottom-[68px] left-0 right-0 h-[32px] overflow-hidden opacity-[0.28]">
        <ECGScrollStrip />
      </div>

      {/* ── Status chips ── */}
      <div className="pointer-events-none absolute bottom-[18px] left-1/2 z-10 -translate-x-1/2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
        {STATUS_ITEMS.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-frost/55">
            <span className="block h-1.5 w-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 5px ${item.color}` }} />
            {item.label}
          </span>
        ))}
      </div>

      {/* ── Icon CTAs ── */}
      <div className="absolute bottom-[18px] right-8 z-20 flex items-center gap-2">
        <a
          href={hero.primaryCta.href}
          aria-label={hero.primaryCta.label}
          className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.06] backdrop-blur-sm transition-all duration-200 hover:border-brand-400/40 hover:bg-brand-500/[0.14]"
        >
          <Icon name="spark" className="h-4 w-4 text-frost/55 transition-colors group-hover:text-brand-300" />
          <span className="pointer-events-none absolute bottom-10 right-0 whitespace-nowrap rounded-lg border border-white/[0.10] bg-[#060816]/95 px-2.5 py-1.5 text-[0.65rem] font-medium text-frost/80 opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
            {hero.primaryCta.label}
          </span>
        </a>
        <a
          href={hero.secondaryCta.href}
          aria-label={hero.secondaryCta.label}
          className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] bg-white/[0.06] backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/[0.08]"
        >
          <Icon name="arrow-right" className="h-4 w-4 text-frost/55 transition-colors group-hover:text-cyan-300" />
          <span className="pointer-events-none absolute bottom-10 right-0 whitespace-nowrap rounded-lg border border-white/[0.10] bg-[#060816]/95 px-2.5 py-1.5 text-[0.65rem] font-medium text-frost/80 opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
            {hero.secondaryCta.label}
          </span>
        </a>
      </div>

      {/* ── Fade to next section ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{ background: "linear-gradient(to bottom, transparent, #060816)" }}
      />
    </section>
  );
}

// ─── Directional flow lines ────────────────────────────────────────────────────
// Lines stop at x=33 / start at x=67 — well clear of the orb left/right edges
// (~31–36 SVG units depending on screen ratio). No overlap with signal nodes.
function FlowLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="fl-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4F8CFF" stopOpacity="0.58" />
          <stop offset="70%"  stopColor="#4F8CFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="fl-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#FBBF24" stopOpacity="0.06" />
          <stop offset="30%"  stopColor="#FBBF24" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.58" />
        </linearGradient>
      </defs>

      {/* Left: signal source column → orb left edge */}
      <line x1="22" y1="50" x2="33" y2="50"
        stroke="url(#fl-l)" strokeWidth="0.60" strokeDasharray="1.8 1.2"
        style={{ animation: "conn-flow 2.6s linear infinite" }} />

      {/* Right: orb right edge → alert output column */}
      <line x1="67" y1="50" x2="78" y2="50"
        stroke="url(#fl-r)" strokeWidth="0.60" strokeDasharray="1.8 1.2"
        style={{ animation: "conn-flow 2.6s 0.5s linear infinite" }} />
  
    </svg>
  );
}

// ─── Left: bedside signal source ─────────────────────────────────────────────
function SignalSource() {
  return (
    <div className="pointer-events-none select-none flex flex-col items-start gap-3 w-full">

      {/* Section header */}
      <div className="flex items-center gap-2">
        <span className="h-px w-7 bg-gradient-to-r from-[#4F8CFF] to-transparent" />
        <span className="text-[0.52rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#4F8CFF88" }}>
          Capture · Signal input
        </span>
      </div>

      {/* Monitor — fills most of the column width */}
      <div className="relative w-full" style={{ maxWidth: "clamp(200px, 22vw, 300px)" }}>
        <svg viewBox="0 0 148 100" className="w-full h-auto" fill="none" aria-hidden>
          {/* Body */}
          <rect x="1" y="1" width="146" height="78" rx="7"
            stroke="rgba(79,140,255,0.32)" strokeWidth="1" fill="rgba(79,140,255,0.03)" />
          {/* Screen */}
          <rect x="8" y="8" width="132" height="64" rx="4" fill="rgba(4,8,22,0.90)" />
          {/* Grid lines */}
          <line x1="8"  y1="40" x2="140" y2="40" stroke="rgba(79,140,255,0.07)" strokeWidth="0.5" />
          <line x1="74" y1="8"  x2="74"  y2="72" stroke="rgba(79,140,255,0.07)" strokeWidth="0.5" />
          {/* ECG waveform */}
          <path
            d="M8,40 L24,40 L28,31 L32,40 L38,40 L41,49 L43,25 L45,55 L47,40 L70,40 L86,40 L90,31 L94,40 L100,40 L103,49 L105,25 L107,55 L109,40 L140,40"
            stroke="#4F8CFF" strokeWidth="1.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.82" />
          {/* SpO2 sine */}
          <path
            d="M8,58 C22,53 36,63 50,58 C64,53 78,63 92,58 C106,53 120,63 140,58"
            stroke="#28D7B5" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.42" />
          {/* Live dot */}
          <circle cx="16" cy="17" r="3"   fill="#28D7B5" fillOpacity="0.85" />
          <circle cx="16" cy="17" r="5.5" fill="#28D7B5" fillOpacity="0.12" />
          {/* HR readout */}
          <text x="124" y="21" fontSize="9" fontFamily="monospace" fill="#4F8CFF" fillOpacity="0.80" textAnchor="end">78</text>
          <text x="139" y="21" fontSize="7" fontFamily="monospace" fill="#4F8CFF" fillOpacity="0.48" textAnchor="end">bpm</text>
          {/* SpO2 readout */}
          <text x="124" y="33" fontSize="9" fontFamily="monospace" fill="#28D7B5" fillOpacity="0.75" textAnchor="end">97%</text>
          <text x="139" y="33" fontSize="7" fontFamily="monospace" fill="#28D7B5" fillOpacity="0.42" textAnchor="end">SpO₂</text>
          {/* Stand */}
          <line x1="74" y1="79" x2="74" y2="89" stroke="rgba(79,140,255,0.22)" strokeWidth="1.5" />
          <line x1="52" y1="89" x2="96" y2="89" stroke="rgba(79,140,255,0.22)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Monitor label */}
          <text x="74" y="98" fontSize="5.5" fontFamily="monospace" fill="rgba(79,140,255,0.25)"
            textAnchor="middle" letterSpacing="1">PATIENT MONITOR</text>
        </svg>
        <div className="pointer-events-none absolute inset-0 rounded-xl blur-2xl opacity-10"
          style={{ background: "rgba(79,140,255,0.5)" }} />
      </div>

      {/* BED-04 chip */}
      <div
        className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 backdrop-blur-sm"
        style={{ boxShadow: "0 0 18px rgba(79,140,255,0.06)" }}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full flex-none bg-[#4F8CFF]"
          style={{ boxShadow: "0 0 5px #4F8CFF" }} />
        <span className="font-mono text-[0.60rem] tracking-[0.10em]" style={{ color: "#4F8CFF88" }}>BED-04</span>
        <span className="h-3 w-px bg-white/10" />
        <span className="font-mono text-[0.65rem] font-bold" style={{ color: "#4F8CFF" }}>HR · 78 bpm</span>
      </div>

      {/* Source label */}
      <div className="rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/55">
        Existing bedside monitor · Device-agnostic
      </div>

    </div>
  );
}

// ─── Right: clinical action output ────────────────────────────────────────────
function AlertOutput() {
  return (
    <div className="pointer-events-none select-none flex flex-col items-end gap-3 w-full">

      {/* Section header */}
      <div className="flex items-center gap-2">
        <span className="text-[0.52rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#FBBF2488" }}>
          Escalate · Clinical action
        </span>
        <span className="h-px w-7 bg-gradient-to-l from-[#FBBF24] to-transparent" />
      </div>

      {/* Unified alert card */}
      <div
        className="w-full overflow-hidden rounded-xl border border-amber-500/[0.30] bg-[#0a0a0f]/70 backdrop-blur-sm"
        style={{
          maxWidth: "clamp(210px, 23vw, 310px)",
          boxShadow: "0 0 32px rgba(251,191,36,0.10), inset 0 1px 0 rgba(251,191,36,0.10)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-amber-500/[0.15] px-3.5 py-2.5">
          <span className="h-2 w-2 flex-none animate-pulse rounded-full bg-amber-400"
            style={{ boxShadow: "0 0 8px rgba(251,191,36,0.85)" }} />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-amber-400">Escalation active</span>
        </div>

        {/* Threshold */}
        <div className="border-b border-white/[0.05] px-3.5 py-2.5">
          <div className="text-[0.62rem] font-semibold text-frost/55">SpO₂ below threshold</div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-mono text-[0.95rem] font-bold text-amber-300">89%</span>
            <div className="flex items-center gap-1">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                <path d="M4 1 L4 7 M1.5 4.5 L4 7 L6.5 4.5" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[0.58rem] text-red-400/70">−8% · Bed 04</span>
            </div>
          </div>
        </div>

        {/* Routing */}
        <div className="border-b border-white/[0.05] px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
              <path d="M0 4 L7 4 M5 1.5 L8.5 4 L5 6.5" stroke="#28D7B5" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[0.63rem] font-semibold" style={{ color: "#28D7B5CC" }}>Routed to Nurse on duty</span>
          </div>
          <div className="mt-1 font-mono text-[0.55rem]" style={{ color: "#28D7B544" }}>
            Ward 3 · Role-aware · Context attached
          </div>
        </div>

        {/* Ward footer */}
        <div className="px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFF]"
              style={{ boxShadow: "0 0 4px #7C5CFF" }} />
            <span className="font-mono text-[0.58rem] font-semibold" style={{ color: "#7C5CFF99" }}>
              Bed 04 · Zone A · 1 active escalation
            </span>
          </div>
          <div className="mt-0.5 font-mono text-[0.52rem]" style={{ color: "#7C5CFF55" }}>
            24 beds monitored · Role-aware routing active
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── Right bottom: ward coverage summary (mirrors Blood Press on left) ─────────
function WardCoverage() {
  return (
    <div className="pointer-events-none select-none text-right">
      <div className="h-[2px] w-[44px] rounded-full ml-auto"
        style={{ background: "linear-gradient(to left, #7C5CFF, transparent)" }} />
      <div className="mt-3">
        <div className="flex items-center gap-1.5 flex-row-reverse justify-start">
          <span className="block h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: "#7C5CFF", boxShadow: "0 0 6px #7C5CFF" }} />
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "#7C5CFFcc" }}>
            Ward Coverage
          </span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5 justify-end">
          <span
            className="font-semibold leading-none tracking-[-0.04em]"
            style={{ color: "#7C5CFF", fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)" }}
          >
            24
          </span>
          <span className="text-[0.68rem] font-medium" style={{ color: "rgba(240,244,255,0.48)" }}>
            beds
          </span>
        </div>
        <div className="mt-2 h-[14px] w-[68px] ml-auto">
          <svg viewBox="0 0 56 16" className="h-full w-full" aria-hidden preserveAspectRatio="none">
            <defs>
              <linearGradient id="dc-ward" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#7C5CFF" stopOpacity="0.05" />
                <stop offset="30%"  stopColor="#7C5CFF" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#7C5CFF" stopOpacity="1.00" />
              </linearGradient>
            </defs>
            <path d="M0,8 C7,3 14,13 21,8 C28,3 35,13 42,8 C49,3 56,13 56,8"
              stroke="url(#dc-ward)" strokeWidth="1.6" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="mt-1 font-mono text-[0.56rem]" style={{ color: "#7C5CFF55" }}>
          Zone A · Active
        </div>
      </div>
    </div>
  );
}

// ─── Intelligence core ────────────────────────────────────────────────────────
function IntelligenceCore() {
  return (
    <div className="relative h-full w-full">

      <div className="absolute inset-[6%]  rounded-full bg-brand-500/[0.22] blur-[55px]" />
      <div className="absolute inset-[20%] rounded-full bg-violet-500/[0.18] blur-[40px]" />
      <div className="absolute inset-[36%] rounded-full bg-cyan-400/[0.20] blur-[28px]" />

      {/* Glass sphere */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 33% 28%, rgba(255,255,255,0.26) 0%, rgba(79,107,255,0.08) 28%, rgba(5,9,22,0.94) 70%)",
          boxShadow:
            "0 0 80px rgba(79,107,255,0.28), inset 0 1px 0 rgba(255,255,255,0.24), inset 0 0 70px rgba(79,107,255,0.07)",
          border: "1px solid rgba(255,255,255,0.13)",
        }}
      >
        {/* Hex grid */}
        <div
          className="absolute inset-[18%] rounded-full overflow-hidden"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='20' viewBox='0 0 24 20'%3E%3Cpath d='M12 0 L24 7 L24 13 L12 20 L0 13 L0 7 Z' fill='none' stroke='%2349C6FF' stroke-width='0.4' stroke-opacity='0.18'/%3E%3C/svg%3E\")",
            backgroundSize: "24px 20px",
          }}
        />

        {/* Radar scan sweep */}
        <div
          className="absolute inset-[8px] animate-scan-sweep rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(73,198,255,0.09) 22deg, transparent 44deg)",
          }}
        />

        {/* Signal nodes: blue left = signal in, amber right = alert out */}
        <span className="absolute left-[36px] top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-[#4F8CFF]"
          style={{ boxShadow: "0 0 8px #4F8CFF, 0 0 16px #4F8CFF44" }} />
        <span className="absolute right-[36px] top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse rounded-full bg-[#FBBF24]"
          style={{ boxShadow: "0 0 8px #FBBF24, 0 0 16px #FBBF2444", animationDelay: "0.4s" }} />

        {/* ECG trace through center */}
        <div className="absolute inset-x-[13%] top-1/2 h-[22px] -translate-y-1/2 overflow-hidden" style={{ opacity: 0.55 }}>
          <div className="flex h-full" style={{ width: "200%", animation: "ecg-scroll 4.5s linear infinite" }}>
            {[0, 1].map((k) => (
              <svg key={k} viewBox="0 0 240 24" preserveAspectRatio="none"
                style={{ width: "50%", height: "100%", flexShrink: 0 }} aria-hidden>
                <defs>
                  <linearGradient id={`ic-ecg-${k}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#49C6FF" stopOpacity="0" />
                    <stop offset="12%"  stopColor="#49C6FF" stopOpacity="1" />
                    <stop offset="88%"  stopColor="#4F8CFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,12 L38,12 L44,9 L48,12 L56,12 L59,17 L61,3 L63,21 L65,12 L78,12 L118,12 L124,9 L128,12 L136,12 L139,17 L141,3 L143,21 L145,12 L158,12 L198,12 L204,9 L208,12 L216,12 L219,17 L221,3 L223,21 L225,12 L240,12"
                  stroke={`url(#ic-ecg-${k})`} strokeWidth="1.5" fill="none"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
        </div>

        {/* Medical cross */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg className="h-[16px] w-[16px]" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="6"   y="0.5" width="6" height="17" rx="2.5" fill="white" fillOpacity="0.88" />
            <rect x="0.5" y="6"   width="17" height="6"  rx="2.5" fill="white" fillOpacity="0.88" />
          </svg>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "0 0 20px rgba(255,255,255,0.85), 0 0 36px rgba(79,107,255,0.35)",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

    </div>
  );
}

// ─── Data channel ─────────────────────────────────────────────────────────────
interface DataChannelProps {
  label: string; value: string; unit: string;
  color: string; spark: string; idx: number;
  align?: "left" | "right"; className?: string;
}

function DataChannel({ label, value, unit, color, spark, idx, align = "left", className }: DataChannelProps) {
  const gid     = `dc-${idx}`;
  const isRight = align === "right";
  return (
    <div className={cn("pointer-events-none select-none", className)}>
      <div
        className="h-[2px] w-[44px] rounded-full"
        style={{
          background: `linear-gradient(${isRight ? "to left" : "to right"}, ${color}, transparent)`,
          marginLeft: isRight ? "auto" : 0,
        }}
      />
      <div className={cn("mt-3", isRight && "text-right")}>
        <div className={cn("flex items-center gap-1.5", isRight && "flex-row-reverse justify-start")}>
          <span className="block h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: `${color}CC` }}>
            {label}
          </span>
        </div>
        <div className={cn("mt-1.5 flex items-baseline gap-1.5", isRight && "justify-end")}>
          <span
            className="font-semibold leading-none tracking-[-0.04em]"
            style={{ color, fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)" }}
          >
            {value}
          </span>
          {unit && (
            <span className="text-[0.68rem] font-medium" style={{ color: "rgba(240,244,255,0.48)" }}>
              {unit}
            </span>
          )}
        </div>
        <div className={cn("mt-2 h-[14px] w-[68px]", isRight && "ml-auto")}>
          <svg viewBox="0 0 56 16" className="h-full w-full" aria-hidden preserveAspectRatio="none">
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor={color} stopOpacity="0.05" />
                <stop offset="30%"  stopColor={color} stopOpacity="0.65" />
                <stop offset="100%" stopColor={color} stopOpacity="1.00" />
              </linearGradient>
            </defs>
            <path d={SPARK[spark] ?? SPARK.sine} stroke={`url(#${gid})`}
              strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── ECG scroll strip ─────────────────────────────────────────────────────────
function ECGScrollStrip() {
  return (
    <div className="flex h-full" style={{ width: "200%", animation: "waveform-scroll 5s linear infinite" }}>
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 800 30" preserveAspectRatio="none"
          style={{ width: "50%", height: "100%", flexShrink: 0 }} aria-hidden>
          <defs>
            <linearGradient id={`ecg-sg-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#4F6BFF" stopOpacity="0.0" />
              <stop offset="12%"  stopColor="#4F6BFF" stopOpacity="0.9" />
              <stop offset="45%"  stopColor="#28D7B5" stopOpacity="0.9" />
              <stop offset="82%"  stopColor="#49C6FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#49C6FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={ECG_PATH} stroke={`url(#ecg-sg-${i})`} strokeWidth="1.4"
            fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}
