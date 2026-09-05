"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from "@/components/ui/Card";
import { EvidenceChip } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilitySuite } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";

const MODULE_CHIPS: Record<string, string[]> = {
  "Module 01": ["98% CV", "15+ OEM"],
  "Module 02": ["10–20B params"],
  "Module 03": ["<2s routing"],
};

export function CapabilitySuite() {
  const c = capabilitySuite;

  return (
    <section className="pt-section-sm">
      <Container>
        <SectionHeader
          number="02"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <Reveal stagger className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {c.modules.map((mod) => (
            <RevealItem key={mod.tag} className="h-full">
              <Card featured={mod.featured}>
                {mod.featured && (
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient" />
                )}
                <CardMeta number={mod.tag} />
                <CardTitle>{mod.title}</CardTitle>
                <CardBody>
                  <p>{mod.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {mod.bullets.map((b) => (
                      <li key={b} className="flex items-baseline gap-3">
                        <span aria-hidden className="h-px w-1 shrink-0 -translate-y-1 bg-ink" />
                        <span className="font-body text-body text-ink-2">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {(MODULE_CHIPS[mod.tag] ?? []).map((chip) => (
                      <EvidenceChip key={chip}>{chip}</EvidenceChip>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* coming soon — a ledger line, not a card */}
        <Reveal className="mt-8">
          <div className="flex flex-col gap-2 border-t border-hairline pt-4 md:flex-row md:items-baseline md:gap-3">
            <span className="flex shrink-0 items-center gap-2.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink-3" />
              <span className="font-body text-body text-ink">{c.comingSoon.label}</span>
            </span>
            <span
              aria-hidden
              className="hidden min-w-6 flex-1 -translate-y-1 border-b border-dotted border-hairline-strong md:block"
            />
            <span className="font-body text-label text-ink-3 md:max-w-[48ch] md:text-right">
              {c.comingSoon.note}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
