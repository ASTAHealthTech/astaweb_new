"use client";

import Image from "next/image";
import { Bezel } from "@/components/ui/Bezel";
import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { sentenceCase } from "@/lib/motion";
import { platformStack } from "@/content/platform";
import { LivingStack } from "@/components/visual/LivingStack";
import { FooterLine } from "./FooterLine";

/**
 * §2 — "— 02 Clinical intelligence stack". The animated living stack
 * (isometric glass planes + flowing beams) as the showpiece, with the three
 * layer cards stacked in a column beside it.
 */
export function PlatformIntelligenceStack() {
  const c = platformStack;
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader
          number="02"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-6">
            <LivingStack />
          </Reveal>
          <Reveal stagger className="grid gap-6 lg:col-span-6">
            {c.layers.map((layer) => {
              const num = layer.tag.replace(/\D/g, "");
              return (
                <RevealItem key={layer.title}>
                  <Card>
                    <CardMeta number={num} label="Layer" className="justify-start" />
                    <CardTitle>{layer.title}</CardTitle>
                    <CardBody>{layer.body}</CardBody>
                    <CardFooter>
                      <ul className="space-y-3">
                        {layer.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 font-body text-body text-ink-2"
                          >
                            <span
                              aria-hidden
                              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </CardFooter>
                  </Card>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>

        {/* Fig. 1 — real council-brain screen: independent model review */}
        <Reveal className="mt-16">
          <Bezel
            label="asta workspace — council brain"
            timestamp="independent model reviews"
            caption="Fig. 1 — Independent model review: five specialist models sit around the ASTA council; the active node returns its finding, confidence, and suggested check before a result is surfaced · recorded from the ASTA clinical workspace"
          >
            <Image
              src="/product/plat-council.webp"
              alt="ASTA council brain view: a pentagon of five model nodes named Lumen, Pulse, Aegis, Nyra and Atlas around a central ASTA council node, with the selected node Lumen showing 65 percent confidence, a review finding of elevated heart rate with waveform evidence, and a suggested ECG check."
              width={1920}
              height={1444}
              className="w-full h-auto"
            />
          </Bezel>
        </Reveal>

        <FooterLine className="mt-12">{c.footer}</FooterLine>
        <SectionEnd number="02" />
      </Container>
    </section>
  );
}
