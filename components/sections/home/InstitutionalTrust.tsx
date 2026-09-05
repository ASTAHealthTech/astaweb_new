"use client";

import { institutionalTrust } from "@/content/home";
import { sentenceCase } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * §03 — Institutional trust. Four pixel-identical logo cards
 * (uniformity is the point). Fixed 96px logo well, grayscale at rest.
 */

const LOGOS: Record<string, string> = {
  "AIC-SEED": "/partners/AIC-SEED.jpg",
  "MeitY Startup Hub": "/partners/MeitY.png",
  "IISER Pune": "/partners/IISER.png",
  "NIT Andhra Pradesh": "/partners/NIT.png",
};

export function InstitutionalTrust() {
  const t = institutionalTrust;

  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="03"
          label={sentenceCase(t.eyebrow)}
          headline={t.heading}
          lede={t.sub}
        />

        <Reveal
          stagger
          className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.items.map((p, i) => {
            const logo = LOGOS[p.name];
            return (
              <RevealItem key={p.name} className="h-full">
                <Card className="group h-full">
                  <div className="mb-6 flex h-24 items-center justify-start border-b border-hairline pb-6">
                    {logo ? (
                      <span className="inline-flex h-16 items-center rounded-card bg-panel-ink px-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logo}
                          alt={`${p.name} logo`}
                          className="max-h-10 w-auto opacity-90 grayscale transition-[filter] duration-200 group-hover:grayscale-0"
                        />
                      </span>
                    ) : (
                      <span className="font-display text-title-sm text-ink">
                        {p.name}
                      </span>
                    )}
                  </div>
                  <CardMeta number={String(i + 1).padStart(2, "0")} />
                  <CardTitle>{p.name}</CardTitle>
                  <div className="mt-1 font-body text-label text-ink-3">
                    {p.descriptor}
                  </div>
                  <CardBody>{p.note}</CardBody>
                </Card>
              </RevealItem>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
