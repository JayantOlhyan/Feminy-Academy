import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feminy.academy";
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV || "staging";
  const isStaging = siteEnv !== "production";

  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you", "/checkout/", "/payment-result"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
