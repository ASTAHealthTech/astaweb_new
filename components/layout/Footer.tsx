import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { BRAND, ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";

const PRODUCT_LINKS = [
  { label: "Solutions",  href: ROUTES.solutions },
  { label: "Product",   href: ROUTES.platform },
  { label: "Deployments", href: ROUTES.useCases },
];

const COMPANY_LINKS = [
  { label: "About",    href: ROUTES.about },
  { label: "Blog",     href: "/blog" },
  { label: "Careers",  href: "/careers" },
  { label: "Contact",  href: ROUTES.contact },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms",   href: "/terms" },
];

export function Footer() {
  return (
    <StripeGridWrapper>
      <GridRow striped={false}>
        <CrossLine />
        <footer className="bg-bg dark:bg-night">
          <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12">
          <div className="flex flex-col">
            <Link href={ROUTES.home} aria-label="ASTA home">
              <Image
                src="/logo/logo-asta.png"
                alt={BRAND.name}
                width={1280}
                height={723}
                priority
                sizes="100px"
                className="h-auto w-[92px] dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="mt-3 max-w-[240px] text-[0.8125rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              Continuous clinical intelligence, built on the hospital equipment you already have.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider text-fg-subtle dark:text-frost-muted">
              Product
            </p>
            <ul className="flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.8125rem] text-fg-muted transition-colors hover:text-fg dark:text-frost-muted dark:hover:text-frost">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider text-fg-subtle dark:text-frost-muted">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[0.8125rem] text-fg-muted transition-colors hover:text-fg dark:text-frost-muted dark:hover:text-frost">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-wider text-fg-subtle dark:text-frost-muted">
              Connect
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/astahealthtech"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-fg-subtle transition-colors hover:text-accent dark:border-night-edge dark:bg-night-panel dark:text-frost-muted"
              >
                <Icon name="linkedin" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://twitter.com/astahealthtech"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-fg-subtle transition-colors hover:text-accent dark:border-night-edge dark:bg-night-panel dark:text-frost-muted"
              >
                <Icon name="twitter" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 dark:border-night-edge">
          <div className="flex flex-col gap-1">
            <p className="text-[0.75rem] text-fg-subtle dark:text-frost-muted">
              © {new Date().getFullYear()} ASTA Health Tech Corporation. All rights reserved.
            </p>
            <p className="text-[0.75rem] text-fg-subtle dark:text-frost-muted">
              Site by{" "}
              <a
                href="https://www.linkedin.com/company/bafflinglabs"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-fg dark:hover:text-frost transition-colors underline underline-offset-2"
              >
                Baffling Labs
              </a>
            </p>
          </div>
          <div className="flex items-center gap-5">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-[0.75rem] text-fg-subtle transition-colors hover:text-fg-muted dark:text-frost-muted">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  </GridRow>
</StripeGridWrapper>
  );
}
