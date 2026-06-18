import type { NavItem } from "@/lib/types";
import { ROUTES } from "@/lib/constants";

export const primaryNav: NavItem[] = [
  { label: "Home",      href: ROUTES.home },
  { label: "Solutions", href: ROUTES.solutions },
  { label: "Platform",  href: ROUTES.platform },
  { label: "Use Cases", href: ROUTES.useCases },
  { label: "About",     href: ROUTES.about },
  { label: "Blog",      href: "/blog" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Solutions",   href: ROUTES.solutions },
      { label: "Platform",    href: ROUTES.platform },
      { label: "Use Cases",   href: ROUTES.useCases },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About",   href: ROUTES.about },
      { label: "Careers", href: "/careers" },
      { label: "Press",   href: "/press" },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Trust",
    items: [
      { label: "Security",   href: "/security" },
      { label: "Compliance", href: "/compliance" },
      { label: "Privacy",    href: "/privacy" },
      { label: "Terms",      href: "/terms" },
    ],
  },
];
