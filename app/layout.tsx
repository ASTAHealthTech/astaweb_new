import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import "./site.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "ASTA Health Tech | Source-Grounded Clinical Intelligence for Hospital Wards",
  description:
    "ASTA reads live monitor context, builds patient packets, ranks clinical lanes, attaches source evidence, and gives clinicians reviewable handoffs.",
  keywords:
    "ASTA Health Tech, source-grounded clinical intelligence, hospital wards, patient monitoring, AI clinical reasoning, monitor vision, clinician review, health tech India",
  authors: [{ name: "ASTA Health Tech" }],
  openGraph: {
    title: "ASTA Health Tech | Source-Grounded Clinical Intelligence for Hospital Wards",
    description:
      "Clinical intelligence from monitor noise: ranked lanes, source cards, missing checks, and audit-ready reasoning.",
    url: "https://astahealthtech.com",
    siteName: "ASTA Health Tech",
    images: [{ url: "/logo-asta.png", width: 1200, height: 630, alt: "ASTA Health Tech" }],
    locale: "en_US",
    type: "website"
  },
  robots: { index: true, follow: true }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
