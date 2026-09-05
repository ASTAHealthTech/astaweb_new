"use client";

import Image from "next/image";
import { Bezel } from "@/components/ui/Bezel";
import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sentenceCase } from "@/lib/motion";
import { platformVisionLayer } from "@/content/platform";
import { FooterLine } from "./FooterLine";
import { PipelinePlate } from "./PipelinePlate";

/**
 * §4 — "— 04 Computer vision layer". Fig. 3 — the flagship real screenshot
 * (ECG waveform workbench: bedside camera photo of a Mindray monitor with
 * ASTA's detection box) → points grid → metrics ledger panel → Fig. 4
 * pipeline plate. All ink — every content `color` field ignored.
 */
export function PlatformComputerVision() {
  const c = platformVisionLayer;
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader
          number="04"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        {/* 4a — Fig. 3: the flagship — camera reads the monitor */}
        <Reveal className="mt-14">
          <Bezel
            label="asta workspace — ecg waveform workbench"
            timestamp="live pi frame · confidence 65%"
            caption="Fig. 3 — The camera reads the monitor: a bedside frame of a Mindray display with ASTA's detection box around the ECG strip and six likely R-peaks marked for clinician confirmation · recorded from the ASTA clinical workspace"
          >
            <Image
              src="/product/plat-ecg-workbench.webp"
              alt="ASTA ECG waveform workbench: a bedside camera photo of a Mindray patient monitor with a yellow detection box drawn around the ECG strip, R-peak markers, and a result strip reading one region found, six likely R-peaks marked, clinician confirms or corrects."
              width={1499}
              height={1448}
              className="w-full h-auto"
            />
          </Bezel>
        </Reveal>

        {/* 4b — points grid */}
        <Reveal stagger className="mt-16 grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
          {c.points.map((p, i) => (
            <RevealItem key={p.title} className="h-full">
              <Card>
                <CardMeta number={`0${i + 1}`} />
                <CardTitle>{p.title}</CardTitle>
                <CardBody>{p.body}</CardBody>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* 4c — metrics ledger */}
        <Reveal className="mt-16">
          <div className="overflow-hidden rounded-card border border-hairline">
            <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {c.metrics.map((m) => (
                <div key={m.label} className="bg-surface p-8">
                  <div className="font-display text-stat-lg tnum text-ink">
                    <LedgerTick value={m.value} />
                  </div>
                  <div className="mt-2 font-body text-label text-ink-2">{m.label}</div>
                  <div className="mt-1 font-body text-label font-normal text-ink-3">{m.note}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 4d — extraction pipeline plate */}
        <PipelinePlate className="mt-16" />

        <FooterLine className="mt-12">{c.footer}</FooterLine>
      </Container>
    </section>
  );
}
