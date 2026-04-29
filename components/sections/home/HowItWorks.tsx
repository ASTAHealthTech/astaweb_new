import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { howItWorks } from "@/content/home";

const STEP_META = [
  { from: "#4F6BFF", to: "#7C5CFF", glow: "rgba(79,107,255,0.28)",  tag: "INPUT"  },
  { from: "#7C5CFF", to: "#49C6FF", glow: "rgba(124,92,255,0.24)",  tag: "VISION" },
  { from: "#49C6FF", to: "#28D7B5", glow: "rgba(73,198,255,0.22)",  tag: "AI"     },
  { from: "#28D7B5", to: "#4F6BFF", glow: "rgba(40,215,181,0.22)",  tag: "ROUTE"  },
  { from: "#4F6BFF", to: "#28D7B5", glow: "rgba(79,107,255,0.22)",  tag: "OUTPUT" },
] as const;

const DOT_DELAYS = ["0s", "0.36s", "0.72s", "1.08s"];

/* width of each connector element (line + arrowhead) in px */
const CONNECTOR_W = 48;

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-canvas py-20 md:py-28 dark:bg-[#060816]"
    >
      {/* ── BG ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Light grid */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {/* Dark grid */}
        <div className="absolute inset-0 hidden dark:block bg-grid-fine bg-[length:44px_44px] opacity-55" />

        {/* Top / bottom rules */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-cyan-400/15" />

        {/* Glows */}
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-500/[0.04] blur-[140px] dark:bg-brand-500/[0.06]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/[0.03] blur-[120px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-px w-4 bg-brand-400/60 dark:bg-cyan-400/50" />
              {howItWorks.eyebrow}
              <span className="h-px w-4 bg-brand-400/60 dark:bg-cyan-400/50" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 text-h2 md:text-h2-lg font-semibold tracking-[-0.04em] text-balance text-ink dark:text-frost">
              {howItWorks.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-body-lg text-pretty text-ink-muted dark:text-frost-muted">
              {howItWorks.sub}
            </p>
          </Reveal>
        </div>

        {/* ── Pipeline panel ── */}
        <Reveal delay={0.14}>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[8%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.30),rgba(73,198,255,0.25),transparent)",
              }}
            />

            {/* Panel title bar */}
            <div className="flex items-center justify-between border-b border-slate-100/80 px-6 py-3 dark:border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-subtle dark:text-white/30">
                  Signal Pipeline
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[9px] font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/[0.08] dark:text-emerald-400">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
                CONTINUOUS
              </div>
            </div>

            {/* ════ DESKTOP: two-row layout (icons | connectors) then (text) ════ */}
            <div className="hidden lg:block px-8 pt-8 pb-6">
              <div className="grid grid-cols-5 gap-0">
                {howItWorks.steps.map((step, i) => {
                  const meta = STEP_META[i];
                  return (
                    <div
                      key={step.step}
                      className="relative flex min-w-0 flex-col items-center gap-1.5 px-3 text-center"
                    >
                      <div className="relative flex h-16 w-full items-center justify-center">
                        <div className="relative z-10 flex-none">
                          <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-black/[0.06] dark:ring-white/[0.12]"
                            style={{
                              background: `linear-gradient(135deg,${meta.from},${meta.to})`,
                              boxShadow: `0 0 24px ${meta.glow}, 0 4px 12px rgba(0,0,0,0.12)`,
                            }}
                          >
                            <Icon name={step.icon} className="h-5 w-5 text-white" />
                          </div>
                          <div
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white dark:ring-[#060816]"
                            style={{
                              background: `linear-gradient(135deg,${meta.from},${meta.to})`,
                            }}
                          >
                            {i + 1}
                          </div>
                        </div>

                        {i < howItWorks.steps.length - 1 && (
                          <div
                            className="pointer-events-none absolute top-1/2 z-0 flex h-4 -translate-y-1/2 items-center"
                            style={{
                              width: CONNECTOR_W,
                              right: -(CONNECTOR_W / 2),
                            }}
                          >
                            <div
                              className="relative h-px flex-1"
                              style={{
                                background: `linear-gradient(to right,${meta.to}50,${STEP_META[i + 1].from}50)`,
                              }}
                            >
                              <div
                                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                                style={{
                                  background: meta.to,
                                  boxShadow: `0 0 5px ${meta.to}`,
                                  animation: `dot-travel 1.8s ${DOT_DELAYS[i]} linear infinite`,
                                }}
                              />
                              <div
                                className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full opacity-50"
                                style={{
                                  background: meta.to,
                                  animation: `dot-travel 1.8s calc(${DOT_DELAYS[i]} + 0.9s) linear infinite`,
                                }}
                              />
                            </div>
                            <svg
                              width="5"
                              height="8"
                              viewBox="0 0 5 8"
                              aria-hidden
                              style={{ marginLeft: -1, flexShrink: 0 }}
                            >
                              <path
                                d="M0 0 L5 4 L0 8"
                                fill="none"
                                stroke={STEP_META[i + 1].from}
                                strokeWidth="1.2"
                                strokeOpacity="0.5"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Tag pill */}
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.14em]"
                        style={{ background: `${meta.from}14`, color: meta.from }}
                      >
                        {meta.tag}
                      </span>
                      {/* Title */}
                      <div className="text-center text-[0.88rem] font-semibold tracking-[-0.015em] text-ink dark:text-frost">
                        {step.title}
                      </div>
                      {/* Body */}
                      <p className="max-w-[15rem] text-center text-[0.73rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                        {step.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ════ MOBILE / TABLET: compact vertical list ════ */}
            <div className="flex flex-col divide-y divide-slate-100/80 lg:hidden dark:divide-white/[0.04]">
              {howItWorks.steps.map((step, i) => {
                const meta = STEP_META[i];
                return (
                  <div key={step.step} className="flex items-start gap-4 px-5 py-4">
                    {/* Icon */}
                    <div className="relative flex-none">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-black/[0.05] dark:ring-white/[0.10]"
                        style={{
                          background: `linear-gradient(135deg,${meta.from},${meta.to})`,
                          boxShadow: `0 0 14px ${meta.glow}`,
                        }}
                      >
                        <Icon name={step.icon} className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div
                        className="absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-white dark:ring-[#060816]"
                        style={{ background: `linear-gradient(135deg,${meta.from},${meta.to})` }}
                      >
                        {i + 1}
                      </div>
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.88rem] font-semibold text-ink dark:text-frost">
                          {step.title}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                          style={{ background: `${meta.from}14`, color: meta.from }}
                        >
                          {meta.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-muted dark:text-frost-subtle">
                        {step.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom glow */}
            <div
              aria-hidden
              className="absolute inset-x-[8%] bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(40,215,181,0.20),transparent)",
              }}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
