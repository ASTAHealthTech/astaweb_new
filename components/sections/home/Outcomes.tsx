"use client";

import { outcomes } from "@/content/home";
import { sentenceCase } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Card,
  CardBody,
  CardFooter,
  CardMeta,
  CardTitle,
} from "@/components/ui/Card";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * §08 — Outcomes. 2×2 cards; meta label carries the audience; footers
 * hold the metric as a ledger line plus its proof. Qualitative claims
 * never tick (Ledger tick is reserved for measured stats).
 */
export function Outcomes() {
  const o = outcomes;

  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="08"
          label={sentenceCase(o.eyebrow)}
          headline={o.heading}
          lede={o.sub}
        />

        <Reveal
          stagger
          className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {o.items.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <Card className="h-full">
                <CardMeta
                  number={String(i + 1).padStart(2, "0")}
                  label={item.audience}
                />
                <CardTitle>{item.title}</CardTitle>
                <CardBody>{item.body}</CardBody>
                <CardFooter>
                  {item.metric && (
                    <LedgerRow label={item.metric} tick={false} className="py-0" />
                  )}
                  {item.proof && (
                    <p className="mt-2 font-body text-label text-ink-3">
                      Proof — {item.proof}
                    </p>
                  )}
                </CardFooter>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
