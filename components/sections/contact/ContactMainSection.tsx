"use client";

import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ContactInquiryForm } from "./ContactInquiryForm";
import { contactMain } from "@/content/contact";
import type { IconName } from "@/lib/types";

export function ContactMainSection() {
  const { channels, whatsapp, address } = contactMain;

  return (
    <section className="py-12 md:py-20">
      <Container>
        <Reveal>
          <div className="mb-12 text-center lg:text-left">
            <h1 className="text-[2.25rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.75rem] md:text-[3.25rem]">
              Talk to the team <span className="text-accent">behind ASTA</span>.
            </h1>
            <p className="mt-3 max-w-[540px] text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
              Whether you need technical details, hospital deployment scheduling, or hardware integration guidance, reach out directly.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          {/* Left — Direct Contact & Address Cards */}
          <div className="space-y-4">
            <Reveal delay={0.08}>
              <div className="space-y-3">
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    className="flex items-start gap-3.5 rounded-xl border border-border bg-white p-5 transition-all hover:border-accent/40 dark:border-night-edge dark:bg-night-panel"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon name={ch.icon as IconName} className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[0.875rem] font-semibold text-fg dark:text-frost">{ch.label}</span>
                      <p className="mt-0.5 text-[0.8125rem] text-fg-muted dark:text-frost-muted">{ch.value}</p>
                      {ch.note && <p className="mt-0.5 text-[0.72rem] text-fg-subtle dark:text-frost-muted">{ch.note}</p>}
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* WhatsApp Quick Chat */}
            <Reveal delay={0.12}>
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-accent/40 dark:border-night-edge dark:bg-night-panel"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white">
                    <Icon name="message-circle" className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[0.875rem] font-semibold text-fg dark:text-frost">{whatsapp.title}</span>
                    <p className="text-[0.8125rem] text-fg-muted dark:text-frost-muted">{whatsapp.body}</p>
                  </div>
                </div>
                <span className="text-[0.8125rem] font-semibold text-accent">Chat now →</span>
              </a>
            </Reveal>

            {/* Address Card */}
            <Reveal delay={0.16}>
              <div className="rounded-xl border border-border bg-white p-5 dark:border-night-edge dark:bg-night-panel">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon name="map-pin" className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[0.875rem] font-semibold text-fg dark:text-frost">{address.company}</span>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-fg-muted dark:text-frost-muted">{address.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — Interactive Form Bento Card */}
          <Reveal delay={0.12}>
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-8">
              <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-fg dark:text-frost">
                Send us a message
              </h3>
              <p className="mt-1 mb-6 text-[0.84rem] text-fg-muted dark:text-frost-muted">
                Our clinical deployment team responds within 24 hours.
              </p>
              <ContactInquiryForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
