import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { platformVisionLayer } from "@/content/platform";

function MonitorPanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#040810] p-7 text-white">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-8 top-0 h-48 w-48 rounded-full bg-brand-500/[0.10] blur-[70px]" />
        <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-teal-400/[0.06] blur-[60px]" />
      </div>

      {/* Label */}
      <div className="relative mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/28">
            ASTA · CV Monitor Reading
          </span>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2 py-0.5 font-mono text-[0.48rem] font-bold text-emerald-400">
          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </div>

      {/* Vitals card */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#030712]">
        {/* macOS bar */}
        <div className="flex items-center gap-1.5 border-b border-white/[0.05] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/20">
            PATIENT MONITOR · WARD 3 · BED 7
          </span>
        </div>

        <div className="p-4">
          {/* HR + SpO₂ — waveform cards */}
          <div className="mb-3 grid grid-cols-2 gap-3">
            {/* HR */}
            <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-[#04102a] p-3">
              <div className="mb-2 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/28">HR bpm</div>
              <svg viewBox="0 0 110 36" width="100%" className="mb-2 block">
                <polyline
                  points="0,18 10,18 13,6 17,28 21,18 32,18 35,6 39,28 43,18 58,18 61,6 65,28 69,18 90,18 93,6 97,28 101,18 110,18"
                  fill="none" stroke="#4F6BFF" strokeWidth="1.4" strokeOpacity="0.9"
                />
              </svg>
              <div className="font-mono text-[1.7rem] font-bold leading-none" style={{ color: "#4F6BFF" }}>72</div>
            </div>

            {/* SpO₂ */}
            <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-[#04102a] p-3">
              <div className="mb-2 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/28">SpO₂ %</div>
              <svg viewBox="0 0 110 36" width="100%" className="mb-2 block">
                <path
                  d="M0,18 C14,10 28,26 42,18 C56,10 70,26 84,18 C98,10 105,24 110,18"
                  fill="none" stroke="#28D7B5" strokeWidth="1.4" strokeOpacity="0.88"
                />
              </svg>
              <div className="font-mono text-[1.7rem] font-bold leading-none" style={{ color: "#28D7B5" }}>98</div>
            </div>
          </div>

          {/* BP + RR — compact strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-0.5 rounded-xl border border-white/[0.05] bg-[#04102a] px-3 py-2.5">
              <div className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/28">BP mmHg</div>
              <div className="font-mono text-[1.1rem] font-bold leading-none" style={{ color: "#49C6FF" }}>120/80</div>
            </div>
            <div className="flex flex-col gap-0.5 rounded-xl border border-white/[0.05] bg-[#04102a] px-3 py-2.5">
              <div className="font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/28">RR /min</div>
              <div className="font-mono text-[1.1rem] font-bold leading-none" style={{ color: "#7C5CFF" }}>16</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="relative mt-4 grid grid-cols-2 gap-2.5">
        {platformVisionLayer.metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5"
          >
            <span className="font-mono text-[1rem] font-bold leading-none" style={{ color: m.color }}>
              {m.value}
            </span>
            <span className="text-[0.62rem] font-medium leading-tight text-white/40">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlatformComputerVision() {
  return (
    <section className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]">
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.04]" />
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.03] blur-[130px] dark:bg-cyan-400/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {platformVisionLayer.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {platformVisionLayer.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {platformVisionLayer.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SPLIT ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-brand-400/[0.14]">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 z-10 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.65),rgba(73,198,255,0.45),transparent)",
              }}
            />
            <div className="grid lg:grid-cols-2">

              {/* Left — 4 compact numbered points */}
              <div className="flex flex-col justify-center bg-white p-8 dark:bg-white/[0.02] lg:p-10">
                <div className="space-y-6">
                  {platformVisionLayer.points.map((point, i) => (
                    <div key={point.title} className="flex gap-4">
                      <span
                        className="flex h-7 w-7 flex-none items-center justify-center rounded-lg font-mono text-[0.65rem] font-bold"
                        style={{ background: "#4F6BFF14", color: "#4F6BFF" }}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <div className="text-[0.94rem] font-semibold tracking-[-0.02em] text-ink dark:text-frost">
                          {point.title}
                        </div>
                        <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-7 border-t border-slate-100/80 pt-6 text-[0.74rem] leading-relaxed text-ink-muted dark:border-white/[0.05] dark:text-frost-subtle">
                  {platformVisionLayer.footer}
                </p>
              </div>

              {/* Right — monitor visual */}
              <MonitorPanel />
            </div>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
