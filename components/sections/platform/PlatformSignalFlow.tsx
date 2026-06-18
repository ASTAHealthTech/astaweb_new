import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { platformSignalFlow } from "@/content/platform";

export function PlatformSignalFlow() {
  return (
    <section className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-55 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-cyan-400/15" />
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/[0.04] blur-[140px] dark:bg-brand-500/[0.06]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[120px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-px w-4 bg-brand-400/60 dark:bg-cyan-400/50" />
              {platformSignalFlow.eyebrow}
              <span className="h-px w-4 bg-brand-400/60 dark:bg-cyan-400/50" />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {platformSignalFlow.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {platformSignalFlow.sub}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
            <div
              aria-hidden
              className="absolute inset-x-[8%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.30),rgba(73,198,255,0.25),transparent)",
              }}
            />

            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-slate-100/80 px-6 py-3 dark:border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-subtle dark:text-white/30">
                  Monitor to Action Flow
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[9px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/[0.08] dark:text-emerald-400">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                5 STAGES
              </div>
            </div>

            {/* Desktop: 9-col grid (5 steps + 4 connectors) — no crossing center line */}
            <div className="hidden px-8 pb-8 pt-10 lg:grid lg:grid-cols-[1fr_44px_1fr_44px_1fr_44px_1fr_44px_1fr]">
              {platformSignalFlow.steps.flatMap((step, index) => {
                const next = platformSignalFlow.steps[index + 1];
                return [
                  /* ── Step column ── */
                  <div
                    key={`step-${step.step}`}
                    className="flex min-w-0 flex-col items-center px-2 text-center"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-white ring-1 ring-black/[0.06] dark:ring-white/[0.12]"
                      style={{
                        background: `linear-gradient(135deg,${step.color},${step.colorTo})`,
                        boxShadow: `0 0 30px ${step.color}35`,
                      }}
                    >
                      <Icon name={step.icon} className="h-6 w-6" />
                    </div>
                    <div
                      className="mt-4 rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em]"
                      style={{ background: step.color + "14", color: step.color }}
                    >
                      Step {step.step}
                    </div>
                    <h3 className="mt-3 text-[0.92rem] font-semibold tracking-[-0.02em] text-ink dark:text-frost">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.74rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                      {step.body}
                    </p>
                  </div>,

                  /* ── Connector column (skip after last step) ── */
                  ...(next
                    ? [
                        <div
                          key={`conn-${index}`}
                          className="flex flex-col items-center"
                        >
                          {/* h-16 spacer aligns connector with icon center */}
                          <div className="flex h-16 items-center justify-center">
                            <div className="flex items-center gap-1">
                              <div
                                className="h-[1.5px] w-5"
                                style={{
                                  background: `linear-gradient(to right,${step.color}55,${next.color}55)`,
                                }}
                              />
                              <svg width="7" height="11" viewBox="0 0 7 11" fill="none" aria-hidden>
                                <path
                                  d="M1 1 L6 5.5 L1 10"
                                  stroke={next.color}
                                  strokeWidth="1.5"
                                  strokeOpacity="0.65"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>,
                      ]
                    : []),
                ];
              })}
            </div>

            {/* Mobile: vertical list */}
            <div className="flex flex-col divide-y divide-slate-100/80 lg:hidden dark:divide-white/[0.04]">
              {platformSignalFlow.steps.map((step) => (
                <div key={step.step} className="flex items-start gap-4 px-5 py-4">
                  <div
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-xl text-white ring-1 ring-black/[0.05] dark:ring-white/[0.10]"
                    style={{
                      background: `linear-gradient(135deg,${step.color},${step.colorTo})`,
                      boxShadow: `0 0 14px ${step.color}28`,
                    }}
                  >
                    <Icon name={step.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.88rem] font-semibold text-ink dark:text-frost">
                        {step.title}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                        style={{ background: step.color + "14", color: step.color }}
                      >
                        Step {step.step}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                      {step.body}
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
