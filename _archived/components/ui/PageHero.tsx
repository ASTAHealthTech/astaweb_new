import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  sub: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  proofRow?: { value: string; label: string }[];
};

export function PageHero({ headline, headlineAccent, sub, primaryCta, secondaryCta, proofRow }: Props) {
  return (
    <section className="pb-8 pt-24 md:pb-10 md:pt-28">
      <Container className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-[700px] text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.03em] text-fg sm:text-[2.75rem] md:text-[3.25rem] dark:text-frost">
            {headline}
            {headlineAccent && <> <span className="text-accent">{headlineAccent}</span></>}
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-3.5 max-w-[480px] text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
            {sub}
          </p>
        </Reveal>
        {(primaryCta || secondaryCta) && (
          <Reveal delay={0.1}>
            <div className="mt-5 flex items-center justify-center gap-3">
              {primaryCta && <Button href={primaryCta.href} variant="primary" size="md" trailingIcon>{primaryCta.label}</Button>}
              {secondaryCta && <Button href={secondaryCta.href} variant="outline" size="md">{secondaryCta.label}</Button>}
            </div>
          </Reveal>
        )}
        {proofRow && proofRow.length > 0 && (
          <Reveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
              {proofRow.map((p) => (
                <div key={p.label} className="text-center">
                  <div className="text-[1.375rem] font-semibold text-fg dark:text-frost">{p.value}</div>
                  <div className="text-[0.72rem] text-fg-subtle dark:text-frost-muted">{p.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
      <div className="mt-8 h-px bg-border dark:bg-night-edge" />
    </section>
  );
}
