import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useCaseClusters } from "@/content/use-cases";

export function UseCaseClusters() {
  return (
    <section
      id="use-case-clusters"
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.05]" />
        <div className="absolute left-1/2 top-1/4 h-[540px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[160px] dark:bg-brand-500/[0.06]" />
      </div>

      <Container className="relative">

        {/* ══ HEADER ══ */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-cyan-400" />
              {useCaseClusters.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-h2 font-semibold tracking-[-0.04em] text-ink dark:text-frost md:text-h2-lg">
              {useCaseClusters.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-pretty text-body-lg text-ink-muted dark:text-frost-muted">
              {useCaseClusters.sub}
            </p>
          </Reveal>
        </div>

        {/* ══ 2×2 CLUSTER GRID ══ */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {useCaseClusters.clusters.map((cluster, i) => (
            <Reveal key={cluster.title} delay={0.08 + i * 0.04}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] text-white">

                {/* Glow */}
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -left-10 top-0 h-44 w-44 rounded-full blur-[80px]"
                    style={{ background: cluster.color + "18" }}
                  />
                </div>

                {/* Top accent */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[1.5px]"
                  style={{
                    background: `linear-gradient(to right,${cluster.color}70,${cluster.colorTo}45,transparent)`,
                  }}
                />

                <div className="relative flex h-full flex-col gap-5 p-7 lg:p-8">

                  {/* Cluster header */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-white"
                      style={{
                        background: `linear-gradient(135deg,${cluster.color},${cluster.colorTo})`,
                        boxShadow: `0 4px 16px ${cluster.color}28`,
                      }}
                    >
                      <Icon name={cluster.icon} className="h-5 w-5" />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em]"
                      style={{ background: cluster.color + "14", color: cluster.color }}
                    >
                      {cluster.label}
                    </span>
                  </div>

                  {/* Title + sub */}
                  <div>
                    <h3 className="text-[1.08rem] font-semibold leading-tight tracking-[-0.03em] text-frost">
                      {cluster.title}
                    </h3>
                    <p className="mt-2 text-[0.79rem] leading-relaxed text-white/50">
                      {cluster.sub}
                    </p>
                  </div>

                  {/* Use cases — compact bullet list */}
                  <div className="space-y-3 border-t border-white/[0.05] pt-4">
                    {cluster.cases.map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <span
                          className="mt-[5px] h-1.5 w-1.5 flex-none rounded-full"
                          style={{ background: cluster.color }}
                        />
                        <div>
                          <div className="text-[0.84rem] font-semibold leading-snug text-white/82">
                            {item.title}
                          </div>
                          <p className="mt-0.5 text-[0.73rem] leading-relaxed text-white/42">
                            {item.outcome}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operational value footer */}
                  <div className="mt-auto rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                    <div className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/25">
                      Operational value
                    </div>
                    <p className="mt-1.5 text-[0.73rem] leading-relaxed text-white/38">
                      {cluster.footer}
                    </p>
                  </div>

                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
