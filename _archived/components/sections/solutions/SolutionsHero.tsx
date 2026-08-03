import { PageHero } from "@/components/ui/PageHero";
import { solutionsHero } from "@/content/solutions";

export function SolutionsHero() {
  return (
    <PageHero
      eyebrow={solutionsHero.eyebrow}
      headline={solutionsHero.headline}
      headlineAccent={solutionsHero.headlineAccent}
      sub={solutionsHero.sub}
      primaryCta={solutionsHero.primaryCta}
      secondaryCta={solutionsHero.secondaryCta}
      proofRow={solutionsHero.proofRow}
    />
  );
}
