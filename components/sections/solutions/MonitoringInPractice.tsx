"use client";

import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from "@/components/ui/Card";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { monitoringInPractice } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";

export function MonitoringInPractice() {
  const c = monitoringInPractice;

  return (
    <section className="pt-section-sm">
      <Container>
        <SectionHeader
          number="05"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <Reveal stagger className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {c.scenarios.map((scenario, i) => (
            <RevealItem key={scenario.label} className="h-full">
              <Card>
                <CardMeta
                  number={String(i + 1).padStart(2, "0")}
                  label={<Pill small>{scenario.label}</Pill>}
                />
                <CardTitle small>{scenario.title}</CardTitle>
                <CardBody>{scenario.body}</CardBody>
                <CardFooter>
                  {scenario.metrics.map((metric) => (
                    <LedgerRow
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      className="py-1.5"
                    />
                  ))}
                </CardFooter>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        <SectionEnd number="05" />
      </Container>
    </section>
  );
}
