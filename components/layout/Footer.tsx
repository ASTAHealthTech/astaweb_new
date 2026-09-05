import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { EvidenceChip } from "@/components/ui/Pill";
import { footerNav } from "@/content/nav";
import { ROUTES } from "@/lib/constants";

/**
 * Light footer — the dark budget is spent inside pages. Carries the micro
 * ECG blip (the one perpetual motion in the shared chrome) and the protocol
 * document's closing note.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <Container className="py-20 md:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <Link href={ROUTES.home} aria-label="ASTA Health Tech home" className="inline-block">
              <Image
                src="/logo/logo-asta.png"
                alt="ASTA Health Tech"
                width={1280}
                height={723}
                sizes="120px"
                className="h-auto w-[120px] brightness-0 invert"
              />
            </Link>
            <EcgBlip />
            <p className="mt-4 font-body text-label text-ink-3">
              Clinical intelligence for active wards.
            </p>
            <p className="mt-1 font-body text-label text-ink-3">
              © 2026 ASTA Health Tech Corporation
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.title} className="col-span-6 md:col-span-2">
              <div className="mb-4 font-body text-label text-ink-3">{group.title}</div>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-1 font-body text-body text-ink-2 decoration-accent decoration-2 underline-offset-4 hover:text-ink hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-6 md:col-span-2">
            <div className="mb-4 font-body text-label text-ink-3">Assurance</div>
            <div className="flex flex-col items-start gap-2">
              <EvidenceChip>ISO 13485</EvidenceChip>
              <EvidenceChip>DPDP-aligned</EvidenceChip>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-label text-ink-3">
            info@astahealthtech.com · +91 87794 04951 · Koramangala, Bengaluru
          </p>
          <p className="font-display text-label tnum text-ink-3">— End of document</p>
        </div>
      </Container>
    </footer>
  );
}

/** 24×12 single-path ECG blip, drawn then paused — static under reduced motion. */
function EcgBlip() {
  return (
    <svg
      viewBox="0 0 48 16"
      className="mt-4 h-4 w-12"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 10 H14 L17 7 L19 10 H24 L26 13 L28 2 L30 14 L32 10 H48"
        stroke="#8B8894"
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
