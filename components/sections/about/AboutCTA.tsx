import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { aboutCta } from "@/content/about";

/** — 06 Connect with ASTA. Pure type + whitespace; no cards, no imagery. */
export function AboutCTA() {
  return (
    <section className="border-t border-hairline py-section">
      <Container>
        <div className="mx-auto max-w-[52rem] text-center">
          <SectionHeader
            number="06"
            label={aboutCta.eyebrow}
            headline={aboutCta.heading}
            lede={aboutCta.sub}
            center
            headlineMax="max-w-[24ch]"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={aboutCta.primaryCta.href}>{aboutCta.primaryCta.label}</Button>
            <Button href={aboutCta.secondaryCta.href} variant="secondary">
              {aboutCta.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
