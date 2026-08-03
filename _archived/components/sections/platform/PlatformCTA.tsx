import { SectionCTA } from "@/components/ui/SectionCTA";
import { platformCta } from "@/content/platform";

export function PlatformCTA() {
  return (
    <SectionCTA
      eyebrow={platformCta.eyebrow}
      heading={platformCta.heading}
      sub={platformCta.sub}
      primaryCta={platformCta.primaryCta}
      secondaryCta={platformCta.secondaryCta}
    />
  );
}
