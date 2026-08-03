import { PageHero } from "@/components/ui/PageHero";
import { useCasesHero } from "@/content/use-cases";

export function UseCasesHero() {
  return (
    <PageHero
      eyebrow={useCasesHero.eyebrow}
      headline={useCasesHero.headline}
      headlineAccent={useCasesHero.headlineAccent}
      sub={useCasesHero.sub}
      primaryCta={useCasesHero.primaryCta}
      secondaryCta={useCasesHero.secondaryCta}
      proofRow={useCasesHero.proofRow}
    />
  );
}
