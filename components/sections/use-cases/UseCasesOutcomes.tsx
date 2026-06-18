import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useCasesOutcomes } from "@/content/use-cases";

export function UseCasesOutcomes() {
  return (
    <section
      id="use-case-outcomes"
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.04]" />
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[160px] dark:bg-brand-500/[0.07]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {useCasesOutcomes.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {useCasesOutcomes.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {useCasesOutcomes.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE DARK PANEL — 2×3 GRID ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-12 top-0 h-48 w-48 rounded-full bg-brand-500/[0.09] blur-[80px]" />
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
            <div className="relative flex items-center justify-between border-b border-white/[0.05] px-7 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Outcome themes
                </span>
              </div>
              <span className="rounded-full border border-brand-400/20 bg-brand-500/[0.07] px-2.5 py-0.5 font-mono text-[8px] font-bold text-brand-300">
                6 deployment outcomes
              </span>
            </div>

            {/* 6-cell 2×3 grid */}
            <div className="relative grid grid-cols-2 divide-x divide-y divide-white/[0.05] lg:grid-cols-3">
              {useCasesOutcomes.items.map((item) => (
                <div
                  key={item.title}
                  className="group relative flex flex-col gap-4 p-6 lg:p-7"
                >
                  {/* Per-cell color hint */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right,${item.color}55,transparent)`,
                    }}
                  />

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                    style={{
                      background: `linear-gradient(135deg,${item.color},${item.color}cc)`,
                      boxShadow: `0 4px 14px ${item.color}28`,
                    }}
                  >
                    <Icon name={item.icon} className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-[0.88rem] font-semibold tracking-[-0.02em] text-frost">
                      {item.title}
                    </div>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-white/42">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}
