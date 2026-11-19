import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import "./sales.css";
import "./soft.css";
import "./brand.css";
import "./funnel.css";
import "./offer.css";
import { LandingMotion } from "@/components/sales/LandingMotion";
import { OfferPricingProvider } from "@/components/sales/OfferPricing";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { siteConfig } from "@/content/site";


export const viewport: Viewport = {
  themeColor: "#fffefb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feminy.academy";
const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV || "staging";
const isStaging = siteEnv !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Feminy Academy by Sunita Rathee | Beauty Courses — Online & Bahadurgarh",
    template: "%s | Feminy Academy",
  },
  description:
    "Explore beauty courses with Sunita Rathee. Compare learning plans, meet your teacher, and discuss online or Bahadurgarh academy training.",
  keywords: [
    "Hydra Facial course Hindi",
    "beauty academy Bahadurgarh",
    "makeup course Haryana",
    "Sunita Rathee cosmetologist",
    "cosmetology classes Delhi NCR",
    "skin and hair diploma",
  ],
  authors: [{ name: "Sunita Rathee" }],
  creator: "Feminy Academy",
  publisher: "Feminy Academy",
  icons: {
    icon: "/icon-32.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Feminy Academy by Sunita Rathee | Beauty Courses — Online & Bahadurgarh",
    description:
      "Explore beauty courses with Sunita Rathee. Compare online learning and Bahadurgarh academy training, see her work and discuss enrolment.",
    siteName: "Feminy Academy",
  },
  ...(isStaging
    ? {
        robots: {
          index: false,
          follow: false,
        },
      }
    : {
        alternates: {
          canonical: siteUrl,
        },
      }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ratingStat = siteConfig.stats.find((s) => s.id === "rating");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.brand,
        alternateName: "Feminy Academy by Sunita Rathee",
        url: siteUrl,
        logo: `${siteUrl}/brand/feminy-crest-transparent.png`,
        image: `${siteUrl}/icon-512.png`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Bahadurgarh",
          addressRegion: "Haryana",
          postalCode: "124507",
          addressCountry: "IN",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: `${siteConfig.brand} Studio & Academy`,
        image: `${siteUrl}/images/sunita-portrait.jpg`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Bahadurgarh",
          addressRegion: "Haryana",
          postalCode: "124507",
          addressCountry: "IN",
        },
        ...(ratingStat?.verified
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: ratingStat.value.replace("★", ""),
                reviewCount: String(ratingStat.reviewCount || 37),
              },
            }
          : {}),
      },
    ],
  };

  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
    >
      <body className="min-h-screen min-h-dvh flex flex-col font-sans bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <OfferPricingProvider>
        <Header />
        <LandingMotion />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        </OfferPricingProvider>
      </body>
    </html>
  );
}
