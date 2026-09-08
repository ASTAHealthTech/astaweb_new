import { GroundObject } from "@/components/visual/scene/GroundObject";
import type { GroundKind } from "@/lib/scene/anchors";
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
  object,
}: {
  label: string;
  headline: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** a section object beside the header — see GroundObject */
  object?: GroundKind;
}) {
  return (
    <section className="py-section pt-40">
      <Container>
        <div className="flex items-end justify-between gap-10">
          <SectionHeader number="01" label={label} headline={headline} lede={body} />
          {object ? <GroundObject kind={object} className="hidden w-64 shrink-0 lg:block" /> : null}
        </div>
        <div className="mt-12">
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
        <SectionEnd label="End of document" />
      </Container>
    </section>
  );
}
