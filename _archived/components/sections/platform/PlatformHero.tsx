import { PageHero } from "@/components/ui/PageHero";
import { platformHero } from "@/content/platform";

export function PlatformHero() {
  return (
    <PageHero
      eyebrow={platformHero.eyebrow}
      headline={platformHero.headline}
      headlineAccent={platformHero.headlineAccent}
      sub={platformHero.sub}
      primaryCta={platformHero.primaryCta}
      secondaryCta={platformHero.secondaryCta}
      proofRow={platformHero.proofRow}
    />
  );
}
