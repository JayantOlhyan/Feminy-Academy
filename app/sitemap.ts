import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feminy-academy.netlify.app";
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV || "staging";
  const isStaging = siteEnv !== "production";

  if (isStaging) {
    return [];
  }

  const routes = [
    "",
    "/courses/hydra-facial",
    "/courses/one-day",
    "/offline-academy",
    "/about",
    "/contact",
    "/pricing",
    "/terms",
    "/privacy",
    "/refund-policy",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/courses") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/courses") ? 0.9 : 0.7,
  }));
}
