import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { platformValidation } from "@/content/platform";

export function PlatformValidation() {
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
        <div className="absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-violet-500/[0.03] blur-[130px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {platformValidation.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {platformValidation.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {platformValidation.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ STATS PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-12 top-0 h-52 w-52 rounded-full bg-brand-500/[0.09] blur-[80px]" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-violet-500/[0.06] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(124,92,255,0.35),rgba(40,215,181,0.25),transparent)",
              }}
            />

            {/* Panel label */}
            <div className="relative flex items-center justify-between border-b border-white/[0.05] px-7 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Validation benchmarks
                </span>
              </div>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-0.5 font-mono text-[8px] font-bold text-emerald-400">
                Field validated
              </span>
            </div>

            {/* 6 metric cells — unified grid, no individual card boxes */}
            <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.05] sm:grid-cols-3">
              {platformValidation.metrics.map((metric) => (
                <div key={metric.label} className="group relative flex flex-col gap-3 p-7 lg:p-8">
                  {/* Per-cell top color hint */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right,${metric.color}60,transparent)`,
                    }}
                  />
                  <div
                    className="font-mono text-[2.8rem] font-bold leading-none tracking-[-0.04em]"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <div>
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.10em] text-white/55">
                      {metric.label}
                    </div>
                    <p className="mt-1 text-[0.71rem] leading-relaxed text-white/32">
                      {metric.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="relative border-t border-white/[0.05] px-7 py-4">
              <p className="text-[0.73rem] leading-relaxed text-white/30">
                {platformValidation.footer}
              </p>
            </div>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}
