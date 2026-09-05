import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { platformHero } from "@/content/platform";
import { ProductGlass } from "@/components/visual/ProductGlass";
import { HeroEyebrow } from "./HeroEyebrow";

/**
 * §1 — "— 01 Platform". Headline/sub/CTAs are server-rendered plain HTML
 * (LCP); the eyebrow, product glass, and proof-row counters hydrate after.
 */
export function PlatformHero() {
  const c = platformHero;
  return (
    <section className="relative overflow-x-clip pb-section-sm pt-28 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <HeroEyebrow number="01" label={c.eyebrow} />
            <h1 className="mt-6 font-display text-display-1 text-ink">
              {c.headline}
              <br />
              <span className="text-gradient-brand animate-gradient-pan">
                {c.headlineAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-[58ch] font-body text-body-lg text-pretty text-ink-2">
              {c.sub}
            </p>
            <div className="mt-10 flex flex-wrap gap-4 max-md:flex-col">
              <Button href={c.primaryCta.href}>{c.primaryCta.label}</Button>
              <Button href={c.secondaryCta.href} variant="secondary">
                {c.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ProductGlass
              priority
              front={{
                src: "/product/plat-forecast.webp",
                width: 1456,
                height: 1646,
                alt: "ASTA heart-rate forecast for bed 5: the recorded trace hands off to the trained transformer's forecast line with its dotted interval band — last recorded 94 bpm, model direction falling, next model point 91.7 bpm at plus fifteen minutes.",
                label: "asta — hr forecast · bed 5",
                timestamp: "next 30 min",
                live: true,
              }}
              back={{
                src: "/product/plat-ecg-workbench.webp",
                width: 1499,
                height: 1448,
                label: "cv layer — ecg",
                timestamp: "pi frame",
              }}
            />
          </div>
        </div>

        <div className="mt-16 border-t border-hairline pt-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {c.proofRow.map((r) => (
              <LedgerRow key={r.label} size="lg" label={r.label} value={r.value} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
