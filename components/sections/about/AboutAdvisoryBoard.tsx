import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { PersonCard } from "./PersonCard";
import { aboutAdvisoryBoard } from "@/content/about";

/** — 04 Advisory board. Deliberately indistinguishable in structure from §03. */
export function AboutAdvisoryBoard() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="04"
          label={aboutAdvisoryBoard.eyebrow}
          headline={aboutAdvisoryBoard.heading}
          lede={aboutAdvisoryBoard.sub}
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {aboutAdvisoryBoard.lenses.map((lens) => (
            <Pill key={lens}>{lens}</Pill>
          ))}
        </div>

        <p className="mt-6 max-w-measure font-body text-body text-pretty text-ink-2">
          {aboutAdvisoryBoard.supportNote}
        </p>

        <Reveal stagger className="mt-14 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {aboutAdvisoryBoard.members.map((member, i) => (
            <RevealItem key={member.name} className="h-full">
              <PersonCard person={member} number={String(i + 1).padStart(2, "0")} />
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
