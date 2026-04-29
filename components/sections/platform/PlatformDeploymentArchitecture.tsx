import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { platformDeploymentArchitecture } from "@/content/platform";

export function PlatformDeploymentArchitecture() {
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
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[680px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[150px] dark:bg-brand-500/[0.05]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {platformDeploymentArchitecture.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {platformDeploymentArchitecture.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {platformDeploymentArchitecture.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ SINGLE PANEL ══ */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-brand-500/[0.09] blur-[80px]" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-teal-400/[0.05] blur-[70px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.45),rgba(40,215,181,0.28),transparent)",
              }}
            />

            <div className="relative grid lg:grid-cols-[1fr_1px_1fr]">

              {/* Left — deployment pipeline (stages as vertical flow) */}
              <div className="flex flex-col justify-center gap-0 p-8 lg:p-10">
                <div className="mb-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/28">
                    Deployment stages
                  </span>
                </div>

                {platformDeploymentArchitecture.stages.map((stage, i) => {
                  const next = platformDeploymentArchitecture.stages[i + 1];
                  return (
                    <div key={stage.title} className="flex gap-4">
                      {/* Icon + connector */}
                      <div className="flex flex-col items-center">
                         <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                      style={{
                        background: `linear-gradient(135deg,${stage.color},${stage.colorTo})`,
                        boxShadow: `0 4px 20px ${stage.color}32`,
                      }}
                    >
                      <Icon name={stage.icon} className="h-5 w-5" />
                    </div>
                        {next && (
                          <div
                            className="my-1.5 w-px"
                            style={{
                              height: 28,
                              background: `linear-gradient(to bottom,${stage.color}40,${next.color}20)`,
                            }}
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className={next ? "pb-5" : ""}>
                        <h3 className="text-[0.96rem] font-semibold tracking-[-0.02em] text-frost">
                          {stage.title}
                        </h3>
                        <p className="mt-1 text-[0.78rem] leading-relaxed text-white/42">
                          {stage.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="hidden bg-white/[0.05] lg:block" />

              {/* Right — 4 governance principles 2×2 */}
              <div className="border-t border-white/[0.05] p-8 lg:border-t-0 lg:p-10">
                <div className="mb-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/28">
                    Governance principles
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {platformDeploymentArchitecture.principles.map((principle) => (
                    <div
                      key={principle.title}
                      className="flex flex-col gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-frost">
                        <Icon name={principle.icon} className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-[0.84rem] font-semibold leading-snug tracking-[-0.01em] text-frost">
                          {principle.title}
                        </h3>
                        <p className="mt-1.5 text-[0.72rem] leading-relaxed text-white/38">
                          {principle.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer note */}
            <div className="relative border-t border-white/[0.05] px-8 py-4 lg:px-10">
              <p className="text-[0.74rem] leading-relaxed text-white/35">
                {platformDeploymentArchitecture.footer}
              </p>
            </div>

          </div>
        </Reveal>

      </Container>
    </section>
  );
}
