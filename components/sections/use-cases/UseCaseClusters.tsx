"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardMeta, CardTitle } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { useCaseClusters } from "@/content/use-cases";
import { sentenceCase } from "@/lib/motion";
import { cn } from "@/lib/cn";

type UseCase = (typeof useCaseClusters.clusters)[number]["cases"][number];

function MicroRow({
  label,
  value,
  strong = false,
  ruled = true,
}: {
  label: string;
  value: string;
  strong?: boolean;
  ruled?: boolean;
}) {
  return (
    <div className={cn(ruled && "mt-3 border-t border-hairline pt-3")}>
      <div className="font-body text-label text-ink-3">{label}</div>
      <div className={cn("mt-1 font-body text-body", strong ? "text-ink" : "text-ink-2")}>
        {value}
      </div>
    </div>
  );
}

function UseCaseCard({ useCase, number }: { useCase: UseCase; number: string }) {
  return (
    <Card>
      <CardMeta
        number={number}
        label={useCase.priority === "secondary" ? <Pill small>Expansion path</Pill> : undefined}
      />
      <CardTitle>{useCase.title}</CardTitle>
      <p className="mt-2 font-body text-label text-ink-3">{useCase.context}</p>
      <div className="mt-5 flex flex-1 flex-col">
        <MicroRow label="Pressure" value={useCase.pressure} ruled={false} />
        <MicroRow label="Fit" value={useCase.fit} />
        <div className="mt-auto">
          <MicroRow label="Outcome" value={useCase.outcome} strong />
        </div>
      </div>
    </Card>
  );
}

function ClusterFooterBlock({ children }: { children: string }) {
  return (
    <div className="flex h-full items-center border-t border-hairline pt-4 font-body text-body text-ink-2 md:border-l md:border-t-0 md:pl-6 md:pt-0">
      <p>{children}</p>
    </div>
  );
}

export function UseCaseClusters() {
  const c = useCaseClusters;

  return (
    <section className="pt-section-sm">
      <Container>
        <SectionHeader
          number="02"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <div className="mt-16 space-y-24">
          {c.clusters.map((cluster, ci) => {
            const clusterNumber = `2.${ci + 1}`;
            const isWide = cluster.layout === "wide";
            const threeCards = cluster.cases.length === 3;

            return (
              <Reveal key={cluster.label} className="border-t border-hairline pt-6">
                {/* band header */}
                <div className="grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-label tnum text-ink-3">
                        {clusterNumber}
                      </span>
                      <Pill small>{cluster.label}</Pill>
                    </div>
                    <h3 className="mt-4 max-w-[22ch] font-display text-title text-balance text-ink">
                      {cluster.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    <p className="max-w-[48ch] font-body text-body text-pretty text-ink-2">
                      {cluster.sub}
                    </p>
                  </div>
                </div>

                {/* card row — layout follows the content's declared layout field */}
                {isWide ? (
                  <>
                    <div className="mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                      {cluster.cases.map((useCase, i) => (
                        <UseCaseCard
                          key={useCase.title}
                          useCase={useCase}
                          number={String(i + 1).padStart(2, "0")}
                        />
                      ))}
                      {!threeCards && <ClusterFooterBlock>{cluster.footer}</ClusterFooterBlock>}
                    </div>
                    {threeCards && (
                      <p className="mt-6 border-t border-hairline pt-4 font-body text-label text-ink-3">
                        {cluster.footer}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="mt-8 grid gap-6 md:grid-cols-12">
                    <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:col-span-8">
                      {cluster.cases.map((useCase, i) => (
                        <UseCaseCard
                          key={useCase.title}
                          useCase={useCase}
                          number={String(i + 1).padStart(2, "0")}
                        />
                      ))}
                    </div>
                    <div className="md:col-span-4">
                      <ClusterFooterBlock>{cluster.footer}</ClusterFooterBlock>
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        <SectionEnd number="02" />
      </Container>
    </section>
  );
}
