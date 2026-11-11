import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Mukta } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/blocks/Header";
import { Footer } from "@/components/blocks/Footer";
import { siteConfig } from "@/content/site";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-bodoni",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mukta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#7A1F3D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// TODO(domain): decide myfeminy.com vs feminyacademy.com
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feminy-academy.netlify.app";
const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV || "staging";
const isStaging = siteEnv !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Feminy Academy by Sunita Rathee | Beauty Courses — Online & Bahadurgarh",
    template: "%s | Feminy Academy",
  },
  description:
    "HydraFacial, makeup aur beauty courses Hindi mein. Expert cosmetologist Sunita Rathee se online seekhiye ya Bahadurgarh academy mein. Live doubt sessions + certificate.",
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
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Feminy Academy by Sunita Rathee | Beauty Courses — Online & Bahadurgarh",
    description:
      "Beauty seekhiye expert cosmetologist Sunita Rathee se — ghar baithe, ya Bahadurgarh academy mein. Simple Hindi mein, live doubt sessions ke saath.",
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
        logo: `${siteUrl}/icon-512.png`,
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
      className={`${bodoniModa.variable} ${mukta.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen min-h-dvh flex flex-col font-sans bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
