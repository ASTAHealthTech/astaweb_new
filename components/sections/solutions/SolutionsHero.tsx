"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal } from "@/components/ui/Reveal";
import { solutionsHero } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";
import { ProductGlass } from "@/components/visual/ProductGlass";

export function SolutionsHero() {
  const c = solutionsHero;

  return (
    <section className="relative pt-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
              <span className="font-display text-label tnum text-ink-3">01</span>
              <span className="font-body text-label text-ink-2">{sentenceCase(c.eyebrow)}</span>
            </div>
            <h1 className="mt-5 max-w-[14ch] font-display text-display-1 text-balance text-ink">
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
          </div>
          <div className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[520px]">
              <ProductGlass
                priority
                chip="Live · 15 beds"
                front={{
                  src: "/product/sol-ward-live.webp",
                  width: 1920,
                  height: 1175,
                  alt: "ASTA live ward view: floor, capacity, occupied, and available tiles above a critical-patients panel flagging beds with vitals-threshold breaches",
                  label: "asta workspace — ward monitoring",
                  timestamp: "demo ward · 15 beds",
                  live: true,
                }}
                back={{
                  src: "/product/sol-bed-cards.webp",
                  width: 1920,
                  height: 1120,
                  label: "bed cards",
                  timestamp: "recording on",
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
                <LedgerRow size="lg" label={item.label} value={item.value} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
