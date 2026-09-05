"use client";

import { capabilities } from "@/content/home";
import { sentenceCase } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * §06 — Capabilities. Six identical cards, 2×3. No icons, no footers,
 * no featured card — equal visual weight throughout.
 */
export function Capabilities() {
  const c = capabilities;

  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="06"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <Reveal
          stagger
          className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {c.items.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <Card className="h-full">
                <CardMeta number={String(i + 1).padStart(2, "0")} />
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
