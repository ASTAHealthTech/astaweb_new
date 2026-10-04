import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEnd } from "@/components/ui/SectionHeader";
import { CONTACT_EMAIL } from "@/content/contact";
import { ROUTES } from "@/lib/constants";

/** — 05 For journalists: one address, one ask. */
export function PressContact() {
  return (
    <section className="pb-section pt-section-sm">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-hairline bg-surface p-8 md:p-12">
            <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient" />
            <span className="machine text-ink-3">05 · Press contact</span>
            <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(1.7rem,3vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.025em] text-ink">
              Writing about clinical AI or smart wards?
            </h2>
            <p className="mt-4 max-w-[56ch] font-body text-body text-pretty text-ink-2">
              For interviews, a product briefing, or the media kit, write to the team. We reply to press enquiries directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 lg:gap-4">
              <Button href={`mailto:${CONTACT_EMAIL}?subject=Press%20enquiry%20%7C%20ASTA`}>Email the press team</Button>
              <Button href={ROUTES.demo} variant="secondary">Request a demo</Button>
            </div>
          </div>
        </Reveal>
        <SectionEnd label="End of document" />
      </Container>
    </section>
  );
}
