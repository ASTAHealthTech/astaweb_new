import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader, SectionEnd } from "@/components/ui/SectionHeader";
import { ROUTES } from "@/lib/constants";

/**
 * Single template for thin pages (blog, careers, press, security,
 * compliance, 404) so no route ever breaks the clinical-document illusion.
 */
export function StubPage({
  label,
  headline,
  body,
  ctaLabel = "Talk to the ASTA team",
  ctaHref = ROUTES.contact,
}: {
  label: string;
  headline: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-section pt-40">
      <Container>
        <SectionHeader number="01" label={label} headline={headline} lede={body} />
        <div className="mt-12">
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
        <SectionEnd label="End of document" />
      </Container>
    </section>
  );
}
