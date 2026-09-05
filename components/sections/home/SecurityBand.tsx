"use client";

import { motion } from "framer-motion";
import { security } from "@/content/home";
import { ruleEase, sentenceCase, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardBody, CardMeta, CardTitle } from "@/components/ui/Card";
import { Bezel, MachineLine } from "@/components/ui/Bezel";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

/**
 * §09 — Security, the page's ONE dark panel. Legacy per-row color fields
 * in the content are ignored wholesale: scorecard bars render in one
 * neutral style; only the single in-progress row (CDSCO) fills in accent.
 * Audit log is simulated → neutral Bezel dot, static timestamp.
 */
export function SecurityBand() {
  const s = security;

  return (
    <section className="bg-panel py-section text-panel-ink">
      <Container>
        <SectionHeader
          number="09"
          label={sentenceCase(s.eyebrow)}
          headline={s.heading}
          lede={s.sub}
          dark
        />

        {/* TIER 1 — quick metrics */}
        <Reveal className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {s.quickMetrics.map((m) => (
              <div key={m.val}>
                <div className="font-display text-stat-lg tnum text-panel-ink">
                  {m.val}
                </div>
                <div className="mt-2 font-body text-body text-panel-ink-2">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <motion.div
          aria-hidden
          className="my-16 h-px w-full origin-left bg-panel-hairline"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: ruleEase }}
        />

        {/* TIER 2 — scorecard + audit log */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-panel-hairline-strong pb-3">
              <span className="font-body text-label text-panel-ink-3">
                Compliance scorecard
              </span>
              <span className="font-body text-label text-panel-ink-3">Status</span>
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {s.scorecard.map((row) => {
                const inProgress = row.statusLabel === "In progress";
                return (
                  <motion.div
                    key={row.label}
                    className="flex items-center gap-3 border-b border-panel-hairline py-4"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { duration: 0.3 } },
                    }}
                  >
                    <span className="shrink-0 font-body text-body text-panel-ink">
                      {row.label}
                    </span>
                    <span
                      aria-hidden
                      className="min-w-6 flex-1 border-b border-dotted border-panel-hairline-strong"
                    />
                    <span
                      aria-hidden
                      className="relative h-0.5 w-24 shrink-0 bg-panel-hairline max-md:w-16"
                    >
                      <motion.span
                        className={cn(
                          "absolute inset-0 origin-left",
                          inProgress ? "bg-accent" : "bg-panel-ink-2"
                        )}
                        variants={{
                          hidden: { scaleX: 0 },
                          show: {
                            scaleX: row.score / 100,
                            transition: { duration: 0.8, ease: ruleEase },
                          },
                        }}
                      />
                    </span>
                    <span className="w-[4ch] shrink-0 text-right font-display text-label tnum text-panel-ink-2">
                      <LedgerTick value={String(row.score)} />
                    </span>
                    <span className="min-w-[9ch] shrink-0 text-right font-body text-label text-panel-ink-2">
                      {row.statusLabel}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <Bezel label="audit-trail — simulated" timestamp="09:42:17 ist">
              <motion.div
                className="p-5"
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {s.auditEvents.map((e) => (
                  <motion.div
                    key={e.time}
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { duration: 0.3 } },
                    }}
                  >
                    <MachineLine className="block whitespace-pre-wrap">
                      {e.time}{" "}
                      <span className={e.type === "ok" ? "text-ok" : "text-panel-ink-3"}>
                        [{e.type}]
                      </span>{" "}
                      {e.msg}
                    </MachineLine>
                  </motion.div>
                ))}
              </motion.div>
            </Bezel>
            <p className="pt-3 font-body text-label text-panel-ink-3">
              Fig. 3 — Governance event log (simulated)
            </p>
          </div>
        </div>

        {/* TIER 3 — proof items */}
        <Reveal
          stagger
          className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {s.proofItems.map((item, i) => (
            <RevealItem key={item.title} className="h-full">
              <Card dark className="h-full">
                <CardMeta dark number={String(i + 1).padStart(2, "0")} />
                <CardTitle dark>{item.title}</CardTitle>
                <CardBody dark>{item.body}</CardBody>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
