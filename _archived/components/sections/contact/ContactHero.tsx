import { PageHero } from "@/components/ui/PageHero";
import { contactHero } from "@/content/contact";

export function ContactHero() {
  return (
    <PageHero
      eyebrow={contactHero.eyebrow}
      headline={contactHero.headline}
      sub={contactHero.sub}
    />
  );
}
