"use client";

import { deployments } from "@/content/home";
import { sentenceCase } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Card,
  CardBody,
  CardFooter,
  CardMeta,
  CardTitle,
  LiveDot,
} from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * §07 — Deployments. Seven cards, rows of 3-3-1 (the empty space stays
 * empty). ONE section-level live indicator beside the header — never
 * per-card; cards carry "Since {liveSince}" as plain text.
 */
export function Deployments() {
  const d = deployments;

  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="07"
          label={sentenceCase(d.eyebrow)}
          headline={d.heading}
          lede={d.sub}
        />

        <div className="mt-6">
          <LiveDot label={`Live · ${d.items.length} sites`} />
        </div>

        <Reveal
          stagger
          className="mt-12 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {d.items.map((site, i) => (
            <RevealItem key={site.name} className="h-full">
              <Card className="h-full">
                <CardMeta
                  number={String(i + 1).padStart(2, "0")}
                  label={`Since ${site.liveSince}`}
                />
                <CardTitle>{site.name}</CardTitle>
                <div className="mt-1 font-body text-label text-ink-3">
                  {site.city}, {site.state}
                </div>
                <CardBody>{site.note}</CardBody>
                <CardFooter>
                  <a
                    href={site.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-body text-label text-ink-2 decoration-accent decoration-2 underline-offset-4 hover:underline"
                  >
                    <span>Visit site</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </CardFooter>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        <p className="mt-10 max-w-[70ch] border-t border-hairline pt-5 font-body text-label text-ink-3">
          {d.publicNote}
        </p>
      </Container>
    </section>
  );
}
