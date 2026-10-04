import { GroundObject } from "@/components/visual/scene/GroundObject";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { HeroEyebrow } from "@/components/sections/platform/HeroEyebrow";
import { featuredOutlets, pressRelease, pressStats } from "@/content/press";

const fmt = (n: number) => (n >= 1_000_000 ? `${(Math.floor(n / 100_000) / 10).toFixed(1)}M+` : `${Math.round(n / 1000)}k`);

/**
 * — 01 Press. The release's own headline, the count of outlets that ran it,
 * and the wire: one mast, a pulse, and a dot for every outlet.
 */
export function PressHero() {
  const lead = featuredOutlets[0];
  const stats = [
    { value: String(pressStats.outlets), label: "outlets published it", note: pressRelease.date },
    { value: String(pressStats.over100k), label: "above 100k monthly visits", note: `${pressStats.over10k} above 10k` },
    { value: fmt(pressStats.combinedVisits), label: "combined monthly visits", note: "to these outlets, estimated" },
  ];
  return (
    <section className="relative pb-16 pt-32 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container className="relative">
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <HeroEyebrow number="01" label="Press coverage" />
            <h1 className="mt-5 font-display text-[clamp(2.3rem,4.4vw,3.9rem)] font-medium leading-[1.03] tracking-[-0.03em] text-balance text-ink">
              {pressRelease.headline}{" "}
              <span className="block text-gradient-brand animate-gradient-pan">{pressRelease.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-[50ch] font-body text-body-lg text-pretty text-ink-2">{pressRelease.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3 lg:gap-4">
              <Button href={lead.url} target="_blank" rel="noopener noreferrer">
                Read it in {lead.name}
              </Button>
              <Button href="#all-coverage" variant="secondary" arrow={false}>
                See all coverage
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <GroundObject kind="wire" className="mx-auto w-full max-w-[17rem] lg:max-w-[26rem]" label={`one release · ${pressStats.outlets} outlets`} />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 border-t border-hairline sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className={["py-6 pr-6", i > 0 ? "border-t border-hairline sm:border-l sm:border-t-0 sm:pl-7" : ""].join(" ")}>
              <dt className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                <LedgerTick value={s.value} />
              </dt>
              <dd className="mt-3">
                <span className="machine block text-ink-2">{s.label}</span>
                <span className="mt-1 block text-[12.5px] leading-snug text-ink-3">{s.note}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-[78ch] text-[12.5px] leading-relaxed text-ink-3">
          Published as a press release. Monthly visits are each outlet&apos;s estimated total traffic, as reported by the distribution partner. They are not readership of this article.
        </p>
      </Container>
    </section>
  );
}
