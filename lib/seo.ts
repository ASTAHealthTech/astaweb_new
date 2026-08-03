import type { Metadata } from "next";

export const SITE_URL = "https://astahealthtech.com";
export const SITE_NAME = "ASTA Health Tech";
export const SITE_TITLE = "ASTA Health Tech | Continuous AI Healthcare Solutions for Hospitals";
export const SITE_DESCRIPTION =
  "ASTA Health Tech delivers continuous AI healthcare solutions. Our computer vision and physiological AI stack reads existing displays and powers real-time clinical intelligence across hospital care systems.";
export const DEFAULT_OG_IMAGE = "/logo/logo-asta.png";

const DEFAULT_KEYWORDS = [
  "ASTA Health Tech",
  "AI healthcare solutions",
  "clinical AI platform",
  "physiological AI reasoning",
  "hospital AI solutions",
  "clinical intelligence",
  "computer vision healthcare",
  "device-agnostic AI",
  "hospital operations",
  "healthcare technology",
  "predictive analytics in healthcare",
  "patient deterioration early warning",
  "ICU monitoring software",
  "interoperability in healthcare",
  "automated vital signs monitoring",
  "smart ward technology",
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
    template: "%s | ASTA Health Tech",
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
  "@type": ["Organization", "MedicalOrganization"],
  "@id": `${SITE_URL}/#organization`,
  name: "ASTA Health Tech Corporation",
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
      "1st Floor, JK Nirmala Arcade, Plot no. 780, 80 Feet Rd, 4th Block, Koramangala",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560034",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.9344",
    longitude: "77.6262",
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

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ASTA Clinical Intelligence Platform",
  operatingSystem: "Cloud-based, Web-based, Cross-platform",
  applicationCategory: "HealthApplication",
  url: `${SITE_URL}/product`,
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  description: SITE_DESCRIPTION,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-IN",
};

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export const sitemapRoutes = [
  "/",
  "/about",
  "/blog",
  "/careers",
  "/contact",
  "/product",
  "/press",
  "/privacy",
  "/solutions",
  "/terms",
  "/deployments",
] as const;
