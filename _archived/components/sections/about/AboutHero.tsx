import { PageHero } from "@/components/ui/PageHero";
import { aboutHero } from "@/content/about";

export function AboutHero() {
  return (
    <PageHero
      eyebrow={aboutHero.eyebrow}
      headline={aboutHero.headline}
      headlineAccent={aboutHero.headlineAccent}
      sub={aboutHero.sub}
      primaryCta={aboutHero.primaryCta}
      secondaryCta={aboutHero.secondaryCta}
      proofRow={aboutHero.proofRow}
    />
  );
}
