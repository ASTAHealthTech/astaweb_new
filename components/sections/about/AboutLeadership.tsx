import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
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

        {/* Per-card Reveal (not one stagger wrapper): on mobile the whole
            grid is far taller than the viewport, so a single whileInView
            wrapper with amount 0.3 would never fire and the cards would
            stay invisible. */}
        <div className="mt-14 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {aboutLeadership.members.map((member, i) => (
            <Reveal key={member.name} className="h-full" delay={(i % 4) * 0.06}>
              <PersonCard person={member} number={String(i + 1).padStart(2, "0")} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
