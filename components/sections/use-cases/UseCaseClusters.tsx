import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { useCaseClusters } from "@/content/use-cases";

export function UseCaseClusters() {
  const { clusters } = useCaseClusters;

  const getClusterId = (index: number) => {
    switch (index) {
      case 0:
        return "acute-care";
      case 1:
        return "remote-coverage";
      case 2:
        return "academic-intelligence";
      case 3:
        return "specialized-monitored";
      default:
        return `cluster-${index}`;
    }
  };

  return (
    <section id="deployment-clusters" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Sticky Left Heading */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.5rem]">
                Ward environments <span className="text-accent">built for deployment</span>.
              </h1>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                From continuous general wards and step-down units to peripheral centers and teaching hospitals.
              </p>
            </Reveal>
          </div>

          {/* Right Column Bento Cards */}
          <div className="space-y-6">
            {clusters.map((cluster, ci) => (
              <Reveal key={cluster.label} delay={0.08 * ci}>
                <div
                  id={getClusterId(ci)}
                  className="relative overflow-hidden rounded-2xl border border-border/50 bg-white p-6 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-8 scroll-mt-24"
                >
                  {/* Typographic Anchoring Number */}
                  <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3.5rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                    0{ci + 1}
                  </span>

                  <div className="relative">
                    <h3 className="text-[1.2rem] font-semibold text-fg dark:text-frost">
                      {cluster.title}
                    </h3>
                    <p className="mt-1 text-[0.85rem] text-fg-muted dark:text-frost-muted">
                      {cluster.sub}
                    </p>

                    {/* Bento Box Layout */}
                    <div className="mt-6 grid overflow-hidden rounded-xl border border-border/30 dark:border-night-edge sm:grid-cols-2">
                      {cluster.cases.map((c, idx) => {
                        const isThreeItemHero = cluster.cases.length === 3 && idx === 0;
                        return (
                          <div
                            key={c.title}
                            className={`relative flex flex-col justify-between bg-[#FFFAFC] p-6 dark:bg-night-panel ${
                              isThreeItemHero ? "sm:col-span-2" : ""
                            }`}
                          >
                            <div>
                              <h4 className="text-[0.95rem] font-semibold text-fg dark:text-frost">{c.title}</h4>
                              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">{c.fit}</p>
                            </div>
                            <div className="relative mt-4 pt-3">
                              <DrawLines horizontal className="top-0" />
                              <span className="text-[0.78rem] font-semibold text-accent">→ {c.outcome}</span>
                            </div>

                            {/* Outer animated grid lines */}
                            {!isThreeItemHero && idx % 2 !== (cluster.cases.length === 3 ? 0 : 1) && (
                              <DrawLines className="right-0 hidden sm:block" delay={idx * 100} />
                            )}
                            <DrawLines horizontal className="bottom-0" delay={idx * 100} />
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-4 text-[0.78rem] text-fg-subtle dark:text-frost-muted">{cluster.footer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
