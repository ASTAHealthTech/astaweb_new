import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { PersonCard } from "./PersonCard";
import { aboutLeadership } from "@/content/about";

/** — 03 Leadership team. Four identical PersonCards, no accent, no icons. */
export function AboutLeadership() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="03"
          label={aboutLeadership.eyebrow}
          headline={aboutLeadership.heading}
          lede={aboutLeadership.sub}
          headlineMax="max-w-[26ch]"
        />

        <div className="mt-8 flex flex-wrap gap-3">
          {aboutLeadership.pillars.map((pillar) => (
            <Pill key={pillar}>{pillar}</Pill>
          ))}
        </div>

        <p className="mt-6 max-w-measure font-body text-body text-pretty text-ink-2">
          {aboutLeadership.framing}
        </p>

        <Reveal stagger className="mt-14 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {aboutLeadership.members.map((member, i) => (
            <RevealItem key={member.name} className="h-full">
              <PersonCard person={member} number={String(i + 1).padStart(2, "0")} />
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
