"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCasesOutcomes } from "@/content/use-cases";
import { sentenceCase } from "@/lib/motion";

export function UseCasesOutcomes() {
  const c = useCasesOutcomes;

  return (
    <section className="pt-section-sm">
      <Container>
        <SectionHeader
          number="05"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <Reveal stagger className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3">
          {c.items.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <Card>
                <CardMeta number={String(i + 1).padStart(2, "0")}>
                  <span className="min-w-0 truncate text-right font-body text-label text-ink-3">
                    {item.context}
                  </span>
                </CardMeta>
                <CardTitle>{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
