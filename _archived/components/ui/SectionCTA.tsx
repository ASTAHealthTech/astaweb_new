import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  heading: string;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function SectionCTA({ eyebrow, heading, sub, primaryCta, secondaryCta }: Props) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.02em] text-fg dark:text-frost md:text-[2.25rem]">{heading}</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">{sub}</p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <Button href={primaryCta.href} variant="primary" size="lg" trailingIcon>{primaryCta.label}</Button>
              {secondaryCta && <Button href={secondaryCta.href} variant="outline" size="lg">{secondaryCta.label}</Button>}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
