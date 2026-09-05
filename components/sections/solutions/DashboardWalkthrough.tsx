"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Bezel } from "@/components/ui/Bezel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { dashboardWalkthrough } from "@/content/solutions";
import { sentenceCase } from "@/lib/motion";

/**
 * Solutions §03 — the one dark instrument panel. The bezels hold real
 * screens recorded from the ASTA clinical workspace (demo ward, anonymized
 * Asta IDs): the generated AI assessment with its checkable support, and a
 * row of bed cards with vitals and quick actions. (The live ward view now
 * leads the page inside the hero's product glass, so it doesn't repeat here.)
 */
export function DashboardWalkthrough() {
  const c = dashboardWalkthrough;

  return (
    <section className="mt-section-sm bg-panel py-24 md:py-32">
      <Container>
        <SectionHeader
          dark
          number="03"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <Reveal className="mt-16">
          <Bezel
            live
            label="asta ai — assessment"
            timestamp="risk: moderate"
            caption="Fig. 1 — Generated assessment: 74% assessment confidence with its checkable support (data, specialists, council), the recommended investigation with model reasoning, and observed movement in the recorded window · recorded from the ASTA clinical workspace"
            className="mx-auto md:max-w-4xl"
          >
            <Image
              src="/product/plat-command.webp"
              alt="ASTA command view: a generated assessment reading elevated heart rate with waveform evidence suggests potential arrhythmia, a 74 percent assessment-confidence ring with data, specialists and council scores, a recommended ECG investigation with model reasoning, and observed vital movement tiles"
              width={1920}
              height={2180}
              className="w-full h-auto"
              sizes="(min-width: 896px) 896px, 100vw"
            />
          </Bezel>
        </Reveal>

        <Reveal className="mt-10">
          <Bezel
            label="asta workspace — bed cards"
            timestamp="beds 4–6"
            caption="Fig. 2 — Bed cards: live vitals, admission context, per-bed ASTA AI, and one-tap quick actions from report to discharge · recorded from the ASTA clinical workspace"
            className="mx-auto md:max-w-4xl"
          >
            <Image
              src="/product/sol-bed-cards.webp"
              alt="Three ASTA bed cards showing live heart rate, SpO2, blood pressure and respiration, admission context such as sepsis and post-operative, and quick actions including report, case sheet, and discharge"
              width={1920}
              height={1120}
              className="w-full h-auto"
              sizes="(min-width: 896px) 896px, 100vw"
            />
          </Bezel>
        </Reveal>

        <SectionEnd dark number="03" />
      </Container>
    </section>
  );
}
