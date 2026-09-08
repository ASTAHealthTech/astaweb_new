import { GroundObject } from "@/components/visual/scene/GroundObject";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { PersonCard } from "./PersonCard";
import { aboutAdvisoryBoard } from "@/content/about";

/** — 04 Advisory board. Deliberately indistinguishable in structure from §03. */
export function AboutAdvisoryBoard() {
  return (
    <section className="py-section">
      <Container>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeader
            number="04"
            label={aboutAdvisoryBoard.eyebrow}
            headline={aboutAdvisoryBoard.heading}
            lede={aboutAdvisoryBoard.sub}
          />
          <GroundObject kind="node" className="order-first w-40 shrink-0 lg:order-none lg:w-48" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {aboutAdvisoryBoard.lenses.map((lens) => (
            <Pill key={lens}>{lens}</Pill>
          ))}
        </div>

        <p className="mt-6 max-w-measure font-body text-body text-pretty text-ink-2">
          {aboutAdvisoryBoard.supportNote}
        </p>

        {/* Per-card Reveal (not one stagger wrapper): on mobile the whole
            grid is far taller than the viewport, so a single whileInView
            wrapper with amount 0.3 would never fire and the cards would
            stay invisible. */}
        <div className="mt-14 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {aboutAdvisoryBoard.members.map((member, i) => (
            <Reveal key={member.name} className="h-full" delay={(i % 4) * 0.06}>
              <PersonCard person={member} number={String(i + 1).padStart(2, "0")} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
