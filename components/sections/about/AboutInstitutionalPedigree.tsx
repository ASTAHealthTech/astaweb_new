import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SectionEnd } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { aboutInstitutionalPedigree } from "@/content/about";

/** Partners whose source art is a photo-style file that cannot be cleanly
 * grayscaled on the light chip — typeset as an ink wordmark instead. */
const WORDMARK_PARTNERS = new Set(["AIC-SEED"]);

type Partner = (typeof aboutInstitutionalPedigree.partners)[number];

/**
 * PartnerCard — one rigid template, mechanically equal heights via three
 * redundant locks: auto-rows-fr grid, the fixed 96px logo well, and the
 * mt-auto footer ledger line.
 */
function PartnerCard({ partner, number, total }: { partner: Partner; number: string; total: string }) {
  const wordmark = WORDMARK_PARTNERS.has(partner.name);

  return (
    <Card padded={false} className="group p-6">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-label tnum text-ink-3">{number}</span>
        <span className="text-right font-body text-label text-ink-2">{partner.badge}</span>
      </div>

      {wordmark ? (
        <div className="mt-4 flex h-24 items-center justify-center rounded-[2px] border border-hairline px-6">
          <span className="font-display text-title-sm text-ink">{partner.name}</span>
        </div>
      ) : (
        <div className="mt-4 flex h-24 items-center justify-center rounded-card bg-panel-ink px-6">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            width={200}
            height={48}
            className="h-auto max-h-12 w-auto max-w-[70%] object-contain opacity-90 grayscale transition-opacity duration-200 group-hover:opacity-100"
          />
        </div>
      )}

      <h3 className="mt-5 font-display text-title-sm text-ink">{partner.name}</h3>
      <div className="mt-1 font-body text-label text-ink-3 sm:min-h-[2.6em]">{partner.descriptor}</div>
      <p className="mb-5 mt-3 font-body text-body text-ink-2">{partner.note}</p>

      <div className="mt-auto border-t border-hairline pt-4">
        <LedgerRow label="Anchor" value={`${number} / ${total}`} tick={false} className="py-0" />
      </div>
    </Card>
  );
}

/** — 05 Institutional pedigree. On paper (dark-panel skip is sanctioned). */
export function AboutInstitutionalPedigree() {
  const total = String(aboutInstitutionalPedigree.partners.length).padStart(2, "0");

  return (
    <section id="institutional-pedigree" className="scroll-mt-28 py-section">
      <Container>
        <SectionHeader
          number="05"
          label={aboutInstitutionalPedigree.eyebrow}
          headline={aboutInstitutionalPedigree.heading}
          lede={aboutInstitutionalPedigree.sub}
        />

        <Reveal stagger className="mt-14 grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {aboutInstitutionalPedigree.partners.map((partner, i) => (
            <RevealItem key={partner.name} className="h-full">
              <PartnerCard partner={partner} number={String(i + 1).padStart(2, "0")} total={total} />
            </RevealItem>
          ))}
        </Reveal>

        <SectionEnd />
        <p className="mt-6 max-w-measure font-body text-body text-pretty text-ink-2">
          {aboutInstitutionalPedigree.footer}
        </p>
      </Container>
    </section>
  );
}
