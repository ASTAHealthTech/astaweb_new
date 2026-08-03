import { SectionCTA } from "@/components/ui/SectionCTA";
import { solutionsCta } from "@/content/solutions";

export function SolutionsCTA() {
  return (
    <SectionCTA
      eyebrow={solutionsCta.eyebrow}
      heading={solutionsCta.heading}
      sub={solutionsCta.sub}
      primaryCta={solutionsCta.primaryCta}
      secondaryCta={solutionsCta.secondaryCta}
    />
  );
}
