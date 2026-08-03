import { SectionCTA } from "@/components/ui/SectionCTA";
import { aboutCta } from "@/content/about";

export function AboutCTA() {
  return (
    <SectionCTA
      eyebrow={aboutCta.eyebrow}
      heading={aboutCta.heading}
      sub={aboutCta.sub}
      primaryCta={aboutCta.primaryCta}
      secondaryCta={aboutCta.secondaryCta}
    />
  );
}
