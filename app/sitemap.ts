import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://feminyacademy.com";

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
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/courses") ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/courses") ? 0.9 : 0.7,
  }));
}
