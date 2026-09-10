import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { EvidenceChip } from "@/components/ui/Pill";
import { footerNav } from "@/content/nav";
import { CONTACT_EMAIL, offices } from "@/content/contact";
import { ROUTES } from "@/lib/constants";

const LINKEDIN = "https://www.linkedin.com/company/astahealthtech";

/**
 * The closing plate of every page. Four bands:
 *   1. brand + one-line thesis + direct contact
 *   2. site map
 *   3. offices — HQ and branches, on one hairline rail
 *   4. legal line
 * Sits on the shared canvas; the scene's stars still show through the top edge.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      {/* ground: transparent at the seam so the scene bleeds in, solid below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,8,18,0.72) 0%, rgba(12,8,18,0.98) 18%, #0C0812 100%)",
        }}
      />
      {/* one brand hairline across the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{ background: "linear-gradient(90deg, transparent 0%, #F09030 30%, #DE2588 55%, #8A4FE0 80%, transparent 100%)" }}
      />

      <Container className="relative pb-10 pt-16 md:pt-20">
        {/* ── 1 · brand, thesis, contact ── */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <Link href={ROUTES.home} aria-label="ASTA Health Tech home" className="inline-flex items-center gap-2.5">
              <Image src="/logo/cross.png" alt="" width={172} height={212} sizes="26px" className="h-7 w-auto" />
              <span className="flex flex-col justify-center leading-none">
                <span className="font-display text-[17px] font-medium tracking-[-0.01em] text-ink">ASTA</span>
                <span className="mt-0.5 font-body text-[7.5px] font-medium tracking-[0.3em] text-ink-2">HEALTH TECH</span>
              </span>
            </Link>

            <p className="mt-6 max-w-[30ch] font-display text-[1.35rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
              Any monitor. Any ward. One intelligence layer.
            </p>
            <p className="mt-3 max-w-[44ch] font-body text-body text-ink-2">
              ASTA reads the certified bedside monitor, learns the patient&apos;s physiology, and reaches the right clinician before the threshold does.
            </p>

            <EcgBlip />

            <dl className="mt-6 grid gap-2 font-body text-[14px]">
              <div className="flex items-baseline gap-4">
                <dt className="machine w-14 shrink-0 text-ink-3">Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink-2 decoration-accent decoration-2 underline-offset-4 hover:text-ink hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-4">
                <dt className="machine w-14 shrink-0 text-ink-3">Social</dt>
                <dd>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-ink-2 decoration-accent decoration-2 underline-offset-4 hover:text-ink hover:underline">
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* ── 2 · site map ── */}
          <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7">
            {footerNav.map((group) => (
              <div key={group.title}>
                <div className="machine mb-4 text-ink-3">{group.title}</div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-1 font-body text-[14px] text-ink-2 decoration-accent decoration-2 underline-offset-4 hover:text-ink hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <div className="machine mb-4 text-ink-3">Assurance</div>
              <div className="flex flex-col items-start gap-2">
                <EvidenceChip>ISO 13485</EvidenceChip>
                <EvidenceChip>DPDP-aligned</EvidenceChip>
                <EvidenceChip>HL7 / FHIR</EvidenceChip>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3 · offices ── */}
        <div className="mt-14 border-t border-hairline pt-8">
          <div className="machine mb-6 text-ink-3">Offices</div>
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
            {offices.map((o) => (
              <li key={o.region} className="relative pl-4">
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.45rem] h-1.5 w-1.5 rounded-full"
                  style={{
                    background: o.hq ? "#DE2588" : "#8A4FE0",
                    boxShadow: o.hq ? "0 0 8px rgba(222,37,136,0.7)" : "none",
                  }}
                />
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-[15px] font-medium text-ink">{o.region}</span>
                  {o.hq ? (
                    <span className="machine text-accent">HQ</span>
                  ) : o.note ? (
                    <span className="machine text-ink-3">{o.note}</span>
                  ) : null}
                </div>
                <div className="machine mt-0.5 text-ink-3">{o.city}</div>

                {o.lines.length ? (
                  <address className="mt-2 font-body text-[13.5px] not-italic leading-[1.55] text-ink-2">
                    {o.lines.map((l) => (
                      <div key={l}>{l}</div>
                    ))}
                  </address>
                ) : null}

                {o.phone && o.phoneHref ? (
                  <a
                    href={o.phoneHref}
                    className="mt-2 inline-block font-machine text-[13px] tabular-nums text-ink-2 decoration-accent decoration-2 underline-offset-4 hover:text-ink hover:underline"
                  >
                    {o.phone}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* ── 4 · legal ── */}
        <div className="mt-10 flex flex-col gap-3 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-label text-ink-3">
            © 2026 ASTA Health Tech Corporation. Clinical decision support — not a diagnostic device.
          </p>
          <p className="font-display text-label tnum text-ink-3">— End of document</p>
        </div>
      </Container>
    </footer>
  );
}

/** Single-path ECG blip, drawn then paused — static under reduced motion. */
function EcgBlip() {
  return (
    <svg viewBox="0 0 48 16" className="mt-6 h-4 w-12" fill="none" aria-hidden>
      <path
        d="M0 10 H14 L17 7 L19 10 H24 L26 13 L28 2 L30 14 L32 10 H48"
        stroke="#DE2588"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={64}
        strokeDasharray={64}
        className="animate-ecg-draw"
      />
    </svg>
  );
}
