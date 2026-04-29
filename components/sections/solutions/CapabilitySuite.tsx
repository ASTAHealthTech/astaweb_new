import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { capabilitySuite } from "@/content/solutions";

/* ─── Monitor reading visual for featured card right side ─────────────────── */
function MonitorReadingVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden bg-[#040810] px-8 py-10 text-white lg:px-12">
      {/* Glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 -top-8 h-48 w-48 rounded-full bg-brand-500/[0.13] blur-[70px]" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-cyan-400/[0.07] blur-[80px]" />
        <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-violet-500/[0.06] blur-[60px]" />
      </div>

      {/* Panel label */}
      <div className="relative flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4F6BFF]"
          style={{ boxShadow: "0 0 6px #4F6BFF" }} />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/30">
          CV · Reading display
        </span>
      </div>

      {/* Monitor SVG */}
      <div className="relative w-full" style={{ maxWidth: 340 }}>
        <svg viewBox="0 0 148 100" className="h-auto w-full" fill="none" aria-hidden>
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
          {/* BP readout */}
          <text x="32"  y="21" fontSize="8"   fontFamily="monospace" fill="#49C6FF" fillOpacity="0.70" textAnchor="start">124/78</text>
          <text x="32"  y="30" fontSize="5.5" fontFamily="monospace" fill="#49C6FF" fillOpacity="0.40" textAnchor="start">mmHg</text>
          {/* HR readout */}
          <text x="124" y="21" fontSize="9"   fontFamily="monospace" fill="#4F8CFF" fillOpacity="0.80" textAnchor="end">78</text>
          <text x="139" y="21" fontSize="7"   fontFamily="monospace" fill="#4F8CFF" fillOpacity="0.48" textAnchor="end">bpm</text>
          {/* SpO2 readout */}
          <text x="124" y="33" fontSize="9"   fontFamily="monospace" fill="#28D7B5" fillOpacity="0.75" textAnchor="end">97%</text>
          <text x="139" y="33" fontSize="7"   fontFamily="monospace" fill="#28D7B5" fillOpacity="0.42" textAnchor="end">SpO₂</text>
          {/* Stand */}
          <line x1="74" y1="79" x2="74" y2="89" stroke="rgba(79,140,255,0.22)" strokeWidth="1.5" />
          <line x1="52" y1="89" x2="96" y2="89" stroke="rgba(79,140,255,0.22)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Label */}
          <text x="74" y="98" fontSize="5.5" fontFamily="monospace" fill="rgba(79,140,255,0.25)"
            textAnchor="middle" letterSpacing="1">PATIENT MONITOR</text>
        </svg>
        {/* Subtle glow under monitor */}
        <div className="pointer-events-none absolute inset-0 rounded-xl blur-2xl opacity-10"
          style={{ background: "rgba(79,140,255,0.5)" }} />
      </div>

      {/* Extracted vitals row */}
      <div className="relative grid w-full grid-cols-4 divide-x divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.07]" style={{ maxWidth: 340 }}>
        {[
          { label: "HR",   value: "78",     unit: "bpm",  color: "#4F8CFF" },
          { label: "SpO₂", value: "97",     unit: "%",    color: "#28D7B5" },
          { label: "BP",   value: "124",    unit: "mmHg", color: "#49C6FF" },
          { label: "RR",   value: "16",     unit: "/min", color: "#7C5CFF" },
        ].map((v) => (
          <div key={v.label} className="flex flex-col items-center gap-0.5 px-2 py-2.5">
            <span className="font-mono text-[0.7rem] font-bold leading-none" style={{ color: v.color }}>
              {v.value}
            </span>
            <span className="font-mono text-[0.52rem] text-white/30">{v.label}</span>
          </div>
        ))}
      </div>

      {/* Accuracy status */}
      <div className="relative flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] text-emerald-400">
          98% accuracy · 100M+ frames
        </span>
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
export function CapabilitySuite() {
  const [mod0, mod1, mod2] = capabilitySuite.modules;

  return (
    <section
      id="capability-suite"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]"
    >
      {/* ── BG ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-60 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-cyan-400/10" />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[150px] dark:bg-brand-500/[0.06]" />
        <div className="absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[120px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {capabilitySuite.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {capabilitySuite.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {capabilitySuite.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ MODULE 01 — FEATURED SPLIT ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-brand-400/[0.14]">
            {/* Top gradient rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 z-10 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.65),rgba(124,92,255,0.45),transparent)",
              }}
            />

            <div className="grid lg:grid-cols-[2fr_3fr]">
              {/* Left — module info */}
              <div className="flex flex-col justify-center gap-7 bg-white p-8 dark:bg-white/[0.02] lg:p-12">
                {/* Icon + tag + live */}
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{
                      background: "linear-gradient(135deg,#4F6BFF,#7C5CFF)",
                      boxShadow: "0 6px 20px rgba(79,107,255,0.32)",
                    }}
                  >
                    <Icon name={mod0.icon} className="h-5 w-5" />
                  </div>
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em]"
                    style={{ background: "#4F6BFF14", color: "#4F6BFF" }}
                  >
                    {mod0.tag}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-0.5 font-mono text-[0.6rem] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                {/* Title + body */}
                <div>
                  <h3 className="text-[1.4rem] font-semibold leading-snug tracking-[-0.03em] text-ink dark:text-frost">
                    {mod0.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-muted dark:text-frost-muted">
                    {mod0.body}
                  </p>
                </div>

                {/* Proof chips */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: "98% extraction accuracy", color: "#4F6BFF" },
                    { label: "15+ OEM brands",          color: "#28D7B5" },
                    { label: "No IT integration",       color: "#49C6FF" },
                  ].map((chip) => (
                    <span
                      key={chip.label}
                      className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.72rem] font-medium"
                      style={{
                        borderColor: chip.color + "30",
                        color: chip.color,
                        background: chip.color + "08",
                      }}
                    >
                      <span className="h-1 w-1 rounded-full" style={{ background: chip.color }} />
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — monitor visual */}
              <MonitorReadingVisual />
            </div>
          </div>
        </Reveal>

        {/* ══ MODULES 02 + 03 ══ */}
        <Reveal delay={0.19}>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[mod1, mod2].map((mod) => (
              <div
                key={mod.tag}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] p-8 text-white lg:p-10"
              >
                {/* Top accent */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(to right,transparent,${mod.color}55,${mod.colorTo}40,transparent)`,
                  }}
                />
                {/* Internal glow */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -left-10 -top-10 h-36 w-36 rounded-full blur-[80px]"
                    style={{ background: mod.color + "18" }}
                  />
                  <div
                    className="absolute right-0 bottom-0 h-28 w-28 rounded-full blur-[70px]"
                    style={{ background: mod.colorTo + "0e" }}
                  />
                </div>

                {/* Icon + tag + live */}
                <div className="relative mb-7 flex flex-wrap items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                    style={{
                      background: `linear-gradient(135deg,${mod.color},${mod.colorTo})`,
                      boxShadow: `0 4px 18px ${mod.color}35`,
                    }}
                  >
                    <Icon name={mod.icon} className="h-5 w-5" />
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em]"
                    style={{ background: mod.color + "14", color: mod.color }}
                  >
                    {mod.tag}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-2 py-0.5 font-mono text-[0.58rem] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                {/* Title + body */}
                <div className="relative">
                  <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.03em] text-frost">
                    {mod.title}
                  </h3>
                  <p className="mt-3 text-[0.84rem] leading-relaxed text-white/52">
                    {mod.body}
                  </p>
                </div>

                {/* Bottom hover accent */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to right,transparent,${mod.color}50,${mod.colorTo}35,transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* ══ COMING SOON BANNER ══ */}
        <Reveal delay={0.23}>
          <div className="relative mt-4 overflow-hidden rounded-xl border border-dashed border-slate-200 px-6 py-4 dark:border-white/[0.08]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="flex-none rounded-full border border-amber-500/25 bg-amber-500/[0.10] px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-amber-400">
                Regulatory
              </span>
              <span className="text-[0.82rem] text-ink-muted dark:text-frost-subtle">
                {capabilitySuite.comingSoon.label}
              </span>
              <span className="hidden text-[0.72rem] text-ink-muted/60 dark:text-white/25 sm:ml-auto sm:block">
                {capabilitySuite.comingSoon.note}
              </span>
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
