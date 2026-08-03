import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section className="relative bg-white dark:bg-night" aria-label="Hero">
      <Container className="flex min-h-[80vh] flex-col items-center justify-center pb-16 pt-32 text-center md:pb-20 md:pt-36">
        {/* Eyebrow */}
        <Reveal>
          <p className="mb-4 text-[0.8125rem] font-medium text-brand-600 dark:text-brand-400">
            {hero.eyebrow}
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h1 className="mx-auto max-w-[720px] text-[2.5rem] font-semibold leading-[1.12] tracking-[-0.025em] text-fg sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] dark:text-frost">
            {hero.headline}{" "}
            <span className="text-brand-600 dark:text-brand-400">{hero.headlineAccent}</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-[480px] text-[1rem] leading-relaxed text-fg-muted dark:text-frost/55 md:text-[1.0625rem]">
            {hero.sub}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex items-center gap-3">
            <Button href={hero.primaryCta.href} variant="glow" size="lg" trailingIcon>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        {/* Micro proof */}
        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {hero.microProof.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[0.8125rem] text-fg-subtle dark:text-frost/40">
                <svg className="h-3.5 w-3.5 text-brand-500" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3.5 7.5L6 10L10.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Divider */}
      <div className="h-px bg-line dark:bg-line-dark" />
    </section>
  );
}
