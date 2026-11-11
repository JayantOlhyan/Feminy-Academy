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
  subsets: ["latin", "devanagari"],
  weight: ["400", "600"],
  variable: "--font-mukta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#8A2346",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://feminyacademy.com"),
  title: {
    default: "Feminy Academy by Sunita Rathee | Beauty Courses — Online & Bahadurgarh",
    template: "%s | Feminy Academy",
  },
  description:
    "HydraFacial, makeup aur beauty courses Hindi mein. 15+ saal ki expert Sunita Rathee se online seekhiye ya Bahadurgarh academy mein. Live doubt sessions + certificate.",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://feminyacademy.com",
    title: "Feminy Academy by Sunita Rathee | Beauty Courses — Online & Bahadurgarh",
    description:
      "Beauty seekhiye 15 saal ki expert Sunita Rathee se — ghar baithe, ya Bahadurgarh academy mein. Simple Hindi mein, live doubt sessions ke saath.",
    siteName: "Feminy Academy",
  },
  alternates: {
    canonical: "https://feminyacademy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://feminyacademy.com/#organization",
        name: siteConfig.brand,
        alternateName: "Feminy Academy by Sunita Rathee",
        url: "https://feminyacademy.com",
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
        "@id": "https://feminyacademy.com/#localbusiness",
        name: `${siteConfig.brand} Studio & Academy`,
        image: "https://feminyacademy.com/images/sunita-portrait.jpg",
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: "Bahadurgarh",
          addressRegion: "Haryana",
          postalCode: "124507",
          addressCountry: "IN",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "120",
        },
      },
    ],
  };

  return (
    <html lang="en-IN" className={`${bodoniModa.variable} ${mukta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen min-h-dvh flex flex-col font-sans bg-paper text-ink antialiased">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
