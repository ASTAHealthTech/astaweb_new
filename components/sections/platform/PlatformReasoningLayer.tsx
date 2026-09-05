"use client";

import Image from "next/image";
import { Bezel } from "@/components/ui/Bezel";
import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { sentenceCase } from "@/lib/motion";
import { platformReasoningLayer } from "@/content/platform";
import { DrawnRule } from "./DrawnRule";
import { FooterLine } from "./FooterLine";

/**
 * §5 — "— 05 PPLM reasoning layer". Four pillar cards, then the decisive
 * comparison ledger. Rows 1–3 quietly diminished (ink-3 label); row 4
 * "ASTA PPLM" is the page's ONE featured element — a 2px brand-gradient
 * top rule drawn last. No fill, no glow, nothing else.
 */
export function PlatformReasoningLayer() {
  const c = platformReasoningLayer;
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader
          number="05"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        {/* 5a — pillars */}
        <Reveal
          stagger
          className="mt-14 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {c.pillars.map((p, i) => (
            <RevealItem key={p.title} className="h-full">
              <Card>
                <CardMeta number={`0${i + 1}`} />
                <CardTitle small>{p.title}</CardTitle>
                <CardBody>{p.body}</CardBody>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* 5b — real model output: the generated assessment (the forecast now
            lives in the hero's product glass, so it is not repeated here) */}
        <Reveal className="mt-16">
          <Bezel
            label="asta workspace — command"
            timestamp="risk: moderate · demo ward"
            caption="Fig. 5 — Generated assessment: 74% assessment confidence with its checkable support (data, specialists, council), the recommended investigation with model reasoning, and observed movement in the recorded window · recorded from the ASTA clinical workspace"
            className="mx-auto max-w-3xl"
          >
            <Image
              src="/product/plat-command.webp"
              alt="ASTA command view: a generated assessment reading elevated heart rate with waveform evidence suggests potential arrhythmia, a 74 percent assessment-confidence ring with data, specialists and council scores, a recommended ECG investigation with model reasoning, and observed vital movement tiles."
              width={1920}
              height={2180}
              className="w-full h-auto"
            />
          </Bezel>
        </Reveal>

        {/* 5c — comparison ledger */}
        <Reveal className="mt-16">
          <div className="overflow-hidden rounded-card border border-hairline bg-surface">
            {c.comparisons.map((row, i) => (
              <div key={row.label} className="relative">
                {i > 0 && !row.highlight && (
                  <DrawnRule
                    delay={i * 0.08}
                    className="absolute inset-x-0 top-0 h-px bg-hairline"
                  />
                )}
                {row.highlight && (
                  <DrawnRule
                    delay={0.32}
                    className="absolute inset-x-0 top-0 z-10 h-0.5 bg-brand-gradient"
                  />
                )}
                <div className="grid gap-2 p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-8">
                  <h3
                    className={cn(
                      "font-display text-title-sm",
                      row.highlight ? "text-ink" : "text-ink-3"
                    )}
                  >
                    {row.label}
                  </h3>
                  <p
                    className={cn(
                      "max-w-measure font-body text-body text-ink-2",
                      row.highlight && "font-medium"
                    )}
                  >
                    {row.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <FooterLine className="mt-12">{c.footer}</FooterLine>
        <SectionEnd number="05" />
      </Container>
    </section>
  );
}
