"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal } from "@/components/ui/Reveal";
import { useCasesHero } from "@/content/use-cases";
import { sentenceCase } from "@/lib/motion";
import { ProductGlass } from "@/components/visual/ProductGlass";

export function UseCasesHero() {
  const c = useCasesHero;

  return (
    <section className="relative overflow-x-clip pt-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
              <span className="font-display text-label tnum text-ink-3">01</span>
              <span className="font-body text-label text-ink-2">{sentenceCase(c.eyebrow)}</span>
            </div>
            <h1 className="mt-5 max-w-[16ch] font-display text-display-1 text-balance text-ink">
              {c.headline}{" "}
              <span className="text-gradient-brand animate-gradient-pan">{c.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-measure font-body text-body-lg text-pretty text-ink-2">
              {c.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
              <Button href={c.secondaryCta.href} variant="secondary">
                {c.secondaryCta.label}
              </Button>
            </div>
            {/* microProof — sentence rows, no values */}
            <div className="mt-10 max-w-measure border-t border-hairline">
              {c.microProof.map((line) => (
                <div key={line} className="flex items-center gap-3 border-b border-hairline py-3">
                  <span aria-hidden className="h-px w-1 shrink-0 bg-ink" />
                  <span className="font-body text-body text-ink-2">{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[520px]">
              <ProductGlass
                priority
                chip="Live · 7 hospitals"
                front={{
                  src: "/product/uc-hospital-graph.webp",
                  width: 1920,
                  height: 1663,
                  alt: "ASTA hospital brain graph: ward nodes orbiting a central hospital node with connection lines to active patients, and tiles reading 2 wards, 25 beds, 16 active patients",
                  label: "asta workspace — hospital graph",
                  timestamp: "2 wards · 25 beds",
                }}
                back={{
                  src: "/product/uc-council-brain.webp",
                  width: 1920,
                  height: 1708,
                  label: "council brain",
                  timestamp: "5 model nodes",
                }}
              />
            </div>
          </div>
        </div>

        {/* proof row — hairline-topped ledger band */}
        <Reveal className="mt-16">
          <div className="grid grid-cols-2 border-t border-hairline md:grid-cols-4 md:divide-x md:divide-hairline">
            {c.proofRow.map((item, i) => (
              <div
                key={item.label}
                className={
                  "py-6 md:px-8 md:first:pl-0 md:last:pr-0 " +
                  (i < 2 ? "max-md:border-b max-md:border-hairline " : "") +
                  (i % 2 === 1 ? "max-md:pl-6" : "max-md:pr-6")
                }
              >
                <LedgerRow
                  size="lg"
                  label={item.label}
                  value={item.value}
                  tick={item.value !== "0"}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
