import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, LiveDot } from "@/components/ui/Card";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { contactProofStrip } from "@/content/contact";

/**
 * — 04 Public proof points. Contact's single dark section: ONE
 * panel-surface card holding five ledger rows. Row 1 carries the page's
 * single LiveDot (section-level, genuinely live); everything else neutral.
 */
export function ContactProofStrip() {
  return (
    <section className="bg-panel py-section-sm">
      <Container>
        <SectionHeader
          number="04"
          label={contactProofStrip.eyebrow}
          headline={contactProofStrip.title}
          lede={contactProofStrip.note}
          dark
        />

        <div className="mt-12">
          <Card dark interactive={false}>
            <Reveal stagger className="divide-y divide-panel-hairline">
              {contactProofStrip.items.map((item, i) => (
                <RevealItem key={item.label} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    {i === 0 ? (
                      <LiveDot dark label={item.label} className="shrink-0" />
                    ) : (
                      <span className="shrink-0 font-body text-body text-panel-ink-2">{item.label}</span>
                    )}
                    <span
                      aria-hidden
                      className="-translate-y-1 min-w-6 flex-1 border-b border-dotted border-panel-hairline-strong"
                    />
                    <span className="text-right font-display text-stat-lg tnum text-panel-ink">
                      <LedgerTick value={item.value} />
                    </span>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </Card>
        </div>
      </Container>
    </section>
  );
}
