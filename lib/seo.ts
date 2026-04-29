import type { Metadata } from "next";

export const SITE_URL = "https://astahealthtech.com";
export const SITE_NAME = "ASTA Healthtech";
export const SITE_TITLE = "ASTA Healthtech | Smart wards, built on the hospital you already have.";
export const SITE_DESCRIPTION =
  "ASTA turns existing hospital wards into smart wards with device-agnostic AI, real-time vitals, intelligent alerts, and clinical visibility without new monitors.";
export const DEFAULT_OG_IMAGE = "/logo/logo-asta.png";

const DEFAULT_KEYWORDS = [
  "ASTA Healthtech",
  "smart wards",
  "hospital AI",
  "device-agnostic AI",
  "clinical intelligence",
  "patient monitoring",
  "vital sign monitoring",
  "ward monitoring",
  "hospital operations",
  "healthcare technology",
] as const;

function buildRobots(index = true): NonNullable<Metadata["robots"]> {
  return index
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          "max-image-preview": "none",
          "max-snippet": 0,
          "max-video-preview": 0,
        },
      };
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  index?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    category: "Healthcare technology",
    robots: buildRobots(index),
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: "%s | ASTA Healthtech",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Healthcare technology",
  keywords: [...DEFAULT_KEYWORDS],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/logo/logo-asta.png", type: "image/png" }],
    shortcut: ["/logo/logo-asta.png"],
    apple: [{ url: "/logo/logo-asta.png", type: "image/png" }],
  },
  robots: buildRobots(true),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ASTA Healthtech Private Limited",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  email: "info@astahealthtech.com",
  sameAs: [
    "https://www.linkedin.com/company/astahealthtech",
    "https://twitter.com/astahealthtech",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Kaveri Regent Coronet, Aurbis Prime, 11, 80 Feet Rd, 3rd Block, Koramangala",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560034",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@astahealthtech.com",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: "ASTA Healthtech Private Limited",
  },
  inLanguage: "en-IN",
};

export const sitemapRoutes = [
  "/",
  "/about",
  "/blog",
  "/careers",
  "/contact",
  "/platform",
  "/press",
  "/privacy",
  "/solutions",
  "/terms",
  "/use-cases",
] as const;
