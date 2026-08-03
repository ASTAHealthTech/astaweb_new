import { SectionCTA } from "@/components/ui/SectionCTA";
import { useCasesCta } from "@/content/use-cases";

export function UseCasesCTA() {
  return (
    <SectionCTA
      eyebrow={useCasesCta.eyebrow}
      heading={useCasesCta.heading}
      sub={useCasesCta.sub}
      primaryCta={useCasesCta.primaryCta}
      secondaryCta={useCasesCta.secondaryCta}
    />
  );
}
