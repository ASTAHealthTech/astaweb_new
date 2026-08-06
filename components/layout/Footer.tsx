import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { BRAND, ROUTES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";

const PRODUCT_LINKS = [
  { label: "Clinical Intelligence", href: ROUTES.platform },
  { label: "Ward Solutions", href: ROUTES.solutions },
  { label: "Hospital Deployments", href: ROUTES.useCases },
];

const RESOURCES_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Contact Sales", href: ROUTES.contact },
];

const COMPANY_LINKS = [
  { label: "About Us", href: ROUTES.about },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
];

export function Footer() {
  return (
    <StripeGridWrapper>
      <GridRow striped={false} showGrid={true}>
        <CrossLine dashed={false} showGrid={true} />
        <footer className="bg-bg dark:bg-night pt-10 pb-10 md:pt-14 md:pb-12">
          <Container>
            <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
              <div className="flex flex-col pr-8">
                <Link href={ROUTES.home} aria-label="ASTA home" className="inline-block -ml-5 md:-ml-8 -mt-3">
                  <Image
                    src="/logo/logo-asta.png"
                    alt={BRAND.name}
                    width={1280}
                    height={723}
                    priority
                    sizes="150px"
                    className="h-auto w-[120px] md:w-[140px] dark:brightness-0 dark:invert"
                  />
                </Link>
                <p className="mt-2 max-w-[280px] text-[0.8125rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                  Continuous clinical intelligence, built on the hospital equipment you already have.
                </p>
              </div>

              <div>
                <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-fg dark:text-frost">
                  Product
                </p>
                <ul className="flex flex-col gap-3.5">
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
                <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-fg dark:text-frost">
                  Resources
                </p>
                <ul className="flex flex-col gap-3.5">
                  {RESOURCES_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.8125rem] text-fg-muted transition-colors hover:text-fg dark:text-frost-muted dark:hover:text-frost">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-fg dark:text-frost">
                  Company
                </p>
                <ul className="flex flex-col gap-3.5">
                  {COMPANY_LINKS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.8125rem] text-fg-muted transition-colors hover:text-fg dark:text-frost-muted dark:hover:text-frost">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-1 border-t border-border/70 pt-8 dark:border-night-edge/70">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <p className="text-[0.68rem] font-medium tracking-wider text-fg-subtle dark:text-frost-muted">
                  © {new Date().getFullYear()} ASTA Health Tech Corporation. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                  <Link href="/terms" className="text-[0.75rem] text-fg-subtle transition-colors hover:text-fg-muted dark:text-frost-muted">
                    Terms of Service
                  </Link>
                  <Link href="/privacy" className="text-[0.75rem] text-fg-subtle transition-colors hover:text-fg-muted dark:text-frost-muted">
                    Privacy Policy
                  </Link>
                  <div className="flex items-center pl-2">
                    <a
                      href="https://www.linkedin.com/company/astahealthtech"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="text-fg-subtle transition-colors hover:text-fg dark:text-frost-muted dark:hover:text-frost"
                    >
                      <Icon name="linkedin" className="h-[1.1rem] w-[1.1rem]" />
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-[0.65rem] text-fg-subtle/70 dark:text-frost-muted/70">
                Designed by{" "}
                <a
                  href="https://www.linkedin.com/company/bafflinglabs"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline hover:text-fg dark:hover:text-frost transition-colors"
                >
                  Baffling Labs
                </a>
                {" "}in association with ASTA Health Tech
              </p>
            </div>
          </Container>
        </footer>
      </GridRow>
    </StripeGridWrapper>
  );
}
