import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { institutionalTrust } from "@/content/home";

export function InstitutionalTrust() {
  const { eyebrow, heading, items } = institutionalTrust;

  return (
    <section className="bg-white py-16 dark:bg-night md:py-20">
      <Container>
        <Reveal>
          <p className="text-center text-[0.8125rem] font-medium text-fg-subtle dark:text-frost/40">
            {eyebrow}
          </p>
        </Reveal>

        {/* Logo bar — clean horizontal scroll like Converge */}
        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden mask-fade-edges">
            <div className="flex animate-ticker-slide gap-14 items-center" style={{ width: "max-content" }}>
              {[...items, ...items].map((partner, i) => (
                <span
                  key={`${partner.name}-${i}`}
                  className="whitespace-nowrap text-[0.9375rem] font-semibold text-fg/30 dark:text-frost/20"
                >
                  {partner.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
