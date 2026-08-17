"use client";

import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PartnerForm } from "./PartnerForm";
import { partnerMain } from "@/content/channel-partner";
import type { IconName } from "@/lib/types";

export function PartnerMainSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[640px] text-center">
            <h1 className="text-[2.25rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.75rem] md:text-[3.25rem]">
              Partner with <span className="text-accent">ASTA</span>.
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
              {partnerMain.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 w-full rounded-2xl border border-border bg-white p-6 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-10">
            <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-fg dark:text-frost">
              Partnership Inquiry
            </h3>
            <p className="mt-1 mb-6 text-[0.84rem] text-fg-muted dark:text-frost-muted">
              Submit your proposal below. Our team reviews inquiries and will respond within 48 hours.
            </p>
            <PartnerForm />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
