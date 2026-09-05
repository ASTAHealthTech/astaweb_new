"use client";

import { motion } from "framer-motion";
import { trust } from "@/content/home";
import { ruleEase, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";

/**
 * §04 — Trust postures. Compact interstitial (half rhythm, coda to §03):
 * compressed numbered header + a wrapped row of inert pills.
 */
export function TrustPostures() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex items-center gap-3">
          <motion.span
            aria-hidden
            className="block h-px w-6 origin-left bg-hairline-strong"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: ruleEase }}
          />
          <span className="font-display text-label tnum text-ink-3">04</span>
        </div>

        <Reveal>
          <h2 className="mt-5 font-display text-title text-ink">{trust.heading}</h2>
          <p className="mt-3 max-w-measure font-body text-body text-pretty text-ink-2">
            {trust.sub}
          </p>
        </Reveal>

        <motion.ul
          className="mt-8 flex flex-wrap gap-3"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {trust.postures.map((p) => (
            <motion.li
              key={p}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
            >
              <Pill>{p}</Pill>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
