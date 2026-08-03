import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/content/home";

export function FinalCTA() {
  const { eyebrow, heading, sub, primaryCta, secondaryCta } = finalCta;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[0.8125rem] font-medium text-brand-600 dark:text-brand-400">{eyebrow}</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.02em] text-fg dark:text-frost md:text-[2.25rem]">
              {heading}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost/55">
              {sub}
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <Button href={primaryCta.href} variant="glow" size="lg" trailingIcon>
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
