"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/cn";

const LOGIN_URL = "https://web.astahealthtech.co.in/";

/* ── Product Dropdown Data ── */
const PRODUCT_MEGA = {
  cols: [
    {
      heading: "MONITOR READING",
      items: [
        {
          title: "Computer Vision Engine",
          desc: "Screen-reading vital extraction without API hardware dependency",
          href: `${ROUTES.platform}#computer-vision`,
        },
        {
          title: "15+ OEM Brand Matrix",
          desc: "Support for Mindray, Philips, GE, Dräger & more",
          href: `${ROUTES.platform}#oem-matrix`,
        },
      ],
    },
    {
      heading: "PHYSIOLOGICAL REASONING",
      items: [
        {
          title: "Signal Flow Pipeline",
          desc: "5-step continuous signal flow from screen to alert",
          href: `${ROUTES.platform}#signal-flow`,
        },
        {
          title: "Pattern Learning Model",
          desc: "Trajectory-aware vital deterioration detection",
          href: `${ROUTES.platform}#reasoning-layer`,
        },
      ],
    },
    {
      heading: "CLINICAL OUTPUT & SURFACE",
      items: [
        {
          title: "Evidence & Validation",
          desc: "Auditable clinical evidence & validation proof",
          href: `${ROUTES.platform}#evidence-differential`,
        },
        {
          title: "Ward Oversight Dashboard",
          desc: "Real-time continuous bed oversight surface",
          href: `${ROUTES.platform}#dashboard`,
        },
      ],
    },
  ],
};

/* ── Solutions Simple Dropdown Sections ── */
const SOLUTIONS_SECTIONS = [
  {
    title: "Ward Contexts",
    desc: "How ASTA adapts across ICUs, Step-down units, and general inpatient wards.",
    href: `${ROUTES.solutions}#ward-contexts`,
  },
  {
    title: "Capability Suite",
    desc: "CV monitor reading, pattern learning model, and clinical escalation engine.",
    href: `${ROUTES.solutions}#capability-suite`,
  },
  {
    title: "Governance & Security",
    desc: "HL7/FHIR interoperability, DPDP 2023 posture, and time-stamped legal audit trails.",
    href: `${ROUTES.solutions}#governance`,
  },
];

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setActiveMenu(null);
    setOpenMobile(false);
    setActiveMobileMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === ROUTES.home) return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-bg/95 backdrop-blur-md dark:border-night-edge/80 dark:bg-night/95 transition-all">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Link href={ROUTES.home} className="flex items-center gap-2" aria-label="ASTA home">
          <Image
            src="/logo/logo-asta.png"
            alt="ASTA Health Tech"
            width={1280}
            height={723}
            priority
            sizes="120px"
            className="h-auto w-[112px] transition-all"
          />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
          onMouseLeave={() => setActiveMenu(null)}
        >
          {/* Product Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("product")}
          >
            <Link
              href={ROUTES.platform}
              className={cn(
                "flex items-center gap-1 px-3.5 py-1.5 text-[0.875rem] font-medium transition-all rounded-full",
                activeMenu === "product" || isActive(ROUTES.platform)
                  ? "bg-border/60 text-fg dark:bg-night-edge dark:text-frost"
                  : "text-fg-muted hover:text-fg dark:text-frost-muted dark:hover:text-frost"
              )}
            >
              Product
              <ChevronIcon open={activeMenu === "product"} />
            </Link>

            {activeMenu === "product" && (
              <div className="absolute left-1/2 top-full pt-3 -translate-x-1/2 w-[740px]">
                <div className="overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-2xl dark:border-night-edge dark:bg-night-panel">
                  <div className="grid grid-cols-3 divide-x divide-border dark:divide-night-edge">
                    {PRODUCT_MEGA.cols.map((col, idx) => (
                      <div key={col.heading} className={cn("flex flex-col gap-4", idx > 0 ? "pl-6" : "pr-4")}>
                        <p className="text-[0.68rem] font-bold tracking-wider text-fg-subtle dark:text-frost-muted uppercase">
                          {col.heading}
                        </p>
                        <div className="flex flex-col gap-3">
                          {col.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="group block rounded-lg p-1.5 transition-colors hover:bg-bg dark:hover:bg-night"
                            >
                              <p className="text-[0.84rem] font-semibold text-fg transition-colors group-hover:text-accent dark:text-frost">
                                {item.title}
                              </p>
                              <p className="text-[0.74rem] leading-snug text-fg-subtle dark:text-frost-muted">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown Menu (Section-Level Only) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("solutions")}
          >
            <Link
              href={ROUTES.solutions}
              className={cn(
                "flex items-center gap-1 px-3.5 py-1.5 text-[0.875rem] font-medium transition-all rounded-full",
                activeMenu === "solutions" || isActive(ROUTES.solutions)
                  ? "bg-border/60 text-fg dark:bg-night-edge dark:text-frost"
                  : "text-fg-muted hover:text-fg dark:text-frost-muted dark:hover:text-frost"
              )}
            >
              Solutions
              <ChevronIcon open={activeMenu === "solutions"} />
            </Link>

            {activeMenu === "solutions" && (
              <div className="absolute left-1/2 top-full pt-3 -translate-x-1/2 w-[360px]">
                <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-2xl dark:border-night-edge dark:bg-night-panel">
                  <div className="flex flex-col gap-1.5">
                    {SOLUTIONS_SECTIONS.map((sec) => (
                      <Link
                        key={sec.title}
                        href={sec.href}
                        className="group block rounded-xl p-3 transition-colors hover:bg-bg dark:hover:bg-night"
                      >
                        <p className="text-[0.875rem] font-semibold text-fg transition-colors group-hover:text-accent dark:text-frost">
                          {sec.title}
                        </p>
                        <p className="mt-1 text-[0.76rem] leading-snug text-fg-subtle dark:text-frost-muted">
                          {sec.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Deployments Direct Link (No Dropdown) */}
          <Link
            href={ROUTES.useCases}
            onMouseEnter={() => setActiveMenu(null)}
            className={cn(
              "px-3.5 py-1.5 text-[0.875rem] font-medium transition-all rounded-full",
              isActive(ROUTES.useCases)
                ? "bg-border/60 text-fg dark:bg-night-edge dark:text-frost"
                : "text-fg-muted hover:text-fg dark:text-frost-muted dark:hover:text-frost"
            )}
          >
            Deployments
          </Link>

          {/* Blog Direct Link */}
          <Link
            href="/blog"
            onMouseEnter={() => setActiveMenu(null)}
            className={cn(
              "px-3.5 py-1.5 text-[0.875rem] font-medium transition-all rounded-full",
              isActive("/blog")
                ? "bg-border/60 text-fg dark:bg-night-edge dark:text-frost"
                : "text-fg-muted hover:text-fg dark:text-frost-muted dark:hover:text-frost"
            )}
          >
            Blog
          </Link>

          {/* About Direct Link */}
          <Link
            href={ROUTES.about}
            onMouseEnter={() => setActiveMenu(null)}
            className={cn(
              "px-3.5 py-1.5 text-[0.875rem] font-medium transition-all rounded-full",
              isActive(ROUTES.about)
                ? "bg-border/60 text-fg dark:bg-night-edge dark:text-frost"
                : "text-fg-muted hover:text-fg dark:text-frost-muted dark:hover:text-frost"
            )}
          >
            About
          </Link>
        </nav>

        {/* Right: Log In & Book a Demo CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[0.875rem] font-medium text-fg-muted hover:text-fg dark:text-frost-muted dark:hover:text-frost transition-colors"
          >
            Log In
          </a>
          <Link
            href={ROUTES.demo}
            className="rounded-full bg-accent px-4 py-2 text-[0.875rem] font-medium text-white shadow-sm transition-all hover:bg-accent/90"
          >
            Book a demo
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setOpenMobile(!openMobile)}
            className="p-2 text-fg dark:text-frost"
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={openMobile} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {openMobile && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-border bg-bg p-4 pb-12 dark:border-night-edge dark:bg-night md:hidden">
          <div className="flex flex-col gap-4 px-2">
            <div>
              <button
                onClick={() => setActiveMobileMenu(activeMobileMenu === "product" ? null : "product")}
                className="flex w-full items-center justify-between text-[0.9375rem] font-medium text-fg dark:text-frost"
              >
                Product
                <ChevronIcon open={activeMobileMenu === "product"} />
              </button>
              {activeMobileMenu === "product" && (
                <div className="mt-3 flex flex-col gap-3 pl-3">
                  {PRODUCT_MEGA.cols.map(col => col.items.map(item => (
                    <Link key={item.title} href={item.href} className="text-[0.85rem] text-fg-muted dark:text-frost-muted">
                      {item.title}
                    </Link>
                  )))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setActiveMobileMenu(activeMobileMenu === "solutions" ? null : "solutions")}
                className="flex w-full items-center justify-between text-[0.9375rem] font-medium text-fg dark:text-frost"
              >
                Solutions
                <ChevronIcon open={activeMobileMenu === "solutions"} />
              </button>
              {activeMobileMenu === "solutions" && (
                <div className="mt-3 flex flex-col gap-3 pl-3">
                  {SOLUTIONS_SECTIONS.map((sec) => (
                    <Link key={sec.title} href={sec.href} className="text-[0.85rem] text-fg-muted dark:text-frost-muted">
                      {sec.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href={ROUTES.useCases} className="text-[0.9375rem] font-medium text-fg dark:text-frost">
              Deployments
            </Link>
            <Link href="/blog" className="text-[0.9375rem] font-medium text-fg dark:text-frost">
              Blog
            </Link>
            <Link href={ROUTES.about} className="text-[0.9375rem] font-medium text-fg dark:text-frost">
              About
            </Link>

            <div className="my-2 h-px bg-border dark:bg-night-edge" />
            <a href={LOGIN_URL} target="_blank" rel="noreferrer" className="text-[0.9375rem] font-medium text-fg-muted">
              Log In
            </a>
            <Link
              href={ROUTES.demo}
              className="mt-1 block rounded-full bg-accent py-2.5 text-center text-[0.875rem] font-medium text-white"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn("h-3.5 w-3.5 text-fg-subtle transition-transform duration-200", open && "rotate-180")}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {open ? <path d="M4 4l12 12M4 16L16 4" /> : <path d="M2.5 6.5h15M2.5 10h15M2.5 13.5h15" />}
    </svg>
  );
}
