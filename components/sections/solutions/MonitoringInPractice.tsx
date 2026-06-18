import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { monitoringInPractice } from "@/content/solutions";

export function MonitoringInPractice() {
  return (
    <section
      id="monitoring-in-practice"
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
        <div className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[130px] dark:bg-violet-500/[0.05]" />
        <div className="absolute right-0 bottom-1/4 h-[350px] w-[350px] rounded-full bg-cyan-400/[0.02] blur-[110px] dark:bg-cyan-400/[0.04]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {monitoringInPractice.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {monitoringInPractice.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {monitoringInPractice.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SCENARIO STRIP ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07]">
            {/* Top rule */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.45),rgba(40,215,181,0.35),rgba(124,92,255,0.30),transparent)",
              }}
            />

            <div className="grid grid-cols-1 divide-y divide-slate-100/80 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 dark:divide-white/[0.06]">
              {monitoringInPractice.scenarios.map((s) => (
                <div
                  key={s.label}
                  className="group relative flex flex-col gap-5 overflow-hidden px-8 py-8 transition-colors duration-200 hover:bg-slate-50/60 dark:hover:bg-white/[0.025]"
                >
                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: s.color + "20" }}
                  />

                  {/* Top color accent line */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] rounded-t-[inherit]"
                    style={{ background: `linear-gradient(to right,${s.color},${s.color}44,transparent)` }}
                  />

                  {/* Ward type label */}
                  <span
                    className="inline-flex w-fit rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                    style={{ background: s.color + "14", color: s.color }}
                  >
                    {s.label}
                  </span>

                  {/* Title */}
                  <h3 className="text-[0.95rem] font-semibold leading-snug tracking-[-0.02em] text-ink dark:text-frost">
                    {s.title}
                  </h3>

                  {/* Key metric — just the first one */}
                  <div className="mt-auto flex flex-col gap-1 border-t border-slate-100/80 pt-5 dark:border-white/[0.06]">
                    <span
                      className="font-mono text-[1.1rem] font-bold leading-none tracking-[-0.02em]"
                      style={{ color: s.color }}
                    >
                      {s.metrics[0].value}
                    </span>
                    <span className="text-[0.72rem] text-ink-muted dark:text-frost-subtle">
                      {s.metrics[0].label}
                    </span>
                  </div>

                  {/* Bottom hover accent */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to right,transparent,${s.color}45,transparent)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ DETAIL CARDS ══ */}
        <Reveal delay={0.20}>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {monitoringInPractice.scenarios.map((s) => (
              <div
                key={s.label + "-card"}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-shadow duration-300 hover:shadow-md dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:bg-white/[0.035]"
              >
                {/* Left color bar */}
                <div
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px] rounded-l-2xl"
                  style={{ background: `linear-gradient(to bottom,${s.color},${s.color}44,transparent)` }}
                />
                {/* Corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: s.color + "18" }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Label + title */}
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em]"
                      style={{ background: s.color + "14", color: s.color }}
                    >
                      {s.label}
                    </span>
                    <h3 className="mt-3 text-[1rem] font-semibold leading-snug tracking-[-0.02em] text-ink dark:text-frost">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-[0.82rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                      {s.body}
                    </p>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 overflow-hidden rounded-xl border border-slate-100 dark:divide-white/[0.06] dark:border-white/[0.06]">
                  {s.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1 px-3 py-3 text-center">
                      <span
                        className="font-mono text-[0.8rem] font-bold leading-none"
                        style={{ color: s.color }}
                      >
                        {m.value}
                      </span>
                      <span className="text-[0.65rem] leading-tight text-ink-muted dark:text-frost-subtle">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </Container>
    </section>
  );
}
