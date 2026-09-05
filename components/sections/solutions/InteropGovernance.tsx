"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { interopGovernance } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";

export function InteropGovernance() {
  const c = interopGovernance;

  return (
    <section className="pt-section-sm">
      <Container>
        <SectionHeader
          number="04"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <Reveal stagger className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3">
          {c.items.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <Card>
                <CardMeta
                  number={String(i + 1).padStart(2, "0")}
                  label={<Pill small>{item.badge}</Pill>}
                />
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
