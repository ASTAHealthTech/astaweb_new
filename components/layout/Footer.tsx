import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { BRAND, ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const QUICK_LINKS = [
  { label: "Solutions",  href: ROUTES.solutions },
  { label: "Platform",   href: ROUTES.platform },
  { label: "Use Cases",  href: ROUTES.useCases },
  { label: "Blog",       href: "/blog" },
  { label: "About",      href: ROUTES.about },
  { label: "Careers",    href: "/careers" },
  { label: "Press",      href: "/press" },
  { label: "Contact",    href: ROUTES.contact },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/[0.10] bg-[#040810] text-white dark:border-white/[0.06]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right,transparent,rgba(79,107,255,0.28),rgba(40,215,181,0.18),transparent)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 bottom-0 h-[260px] w-[260px] rounded-full bg-brand-500/[0.05] blur-[100px]" />
        <div className="absolute -right-10 top-0 h-[200px] w-[200px] rounded-full bg-cyan-400/[0.04] blur-[90px]" />
      </div>

      <Container className="relative py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[200px_1fr_280px] md:gap-12">

          {/* Brand */}
          <div className="flex flex-col">
            <Link href={ROUTES.home} aria-label="ASTA home">
              <Image
                src="/logo/logo-asta.png"
                alt={BRAND.name}
                width={1280}
                height={723}
                sizes="108px"
                className="h-auto w-[108px] brightness-0 invert"
              />
            </Link>
            <p className="mt-3 max-w-[178px] text-[0.74rem] leading-relaxed text-white/80">
              Smart wards on the hospital you already have.
            </p>
            <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 font-mono text-[0.59rem] uppercase tracking-[0.14em] text-emerald-400/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Platform live · 24/7
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="mb-3.5 font-mono text-[0.58rem] uppercase tracking-[0.20em] text-white/62">
              Navigate
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-4">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[0.78rem] text-white/70 transition-colors duration-150 hover:text-white/92"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="mb-3.5 font-mono text-[0.58rem] uppercase tracking-[0.20em] text-white/62">
              Stay updated
            </p>
            <p className="mb-3 text-[0.74rem] leading-snug text-white/80">
              Clinical AI insights and ASTA deployment updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-5">
          <p className="text-[0.67rem] text-white/68">
            © {new Date().getFullYear()} ASTA Healthtech Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-[0.67rem] text-white/72 transition-colors hover:text-white/92"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[0.67rem] text-white/72 transition-colors hover:text-white/92"
            >
              Terms
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/astahealthtech"
                target="_blank"
                rel="noreferrer"
                aria-label="ASTA on LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.18] bg-white/[0.08] text-white/75 transition-all hover:border-white/[0.28] hover:bg-white/[0.12] hover:text-white"
              >
                <Icon name="linkedin" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://twitter.com/astahealthtech"
                target="_blank"
                rel="noreferrer"
                aria-label="ASTA on X"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.18] bg-white/[0.08] text-white/75 transition-all hover:border-white/[0.28] hover:bg-white/[0.12] hover:text-white"
              >
                <Icon name="twitter" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
