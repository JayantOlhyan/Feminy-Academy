import { z } from "zod";
import { getOfferPricing, type PricedCourseSlug } from "@/lib/offer-pricing";

// Published slugs in builtbykabir/course differ from the marketing page slugs.
export const platformCourseSlugs = {
  "hydra-facial": "hydra-facial",
  "one-day": "one-day-masterclass",
} as const;
const courseResponse = z.object({ course: z.object({ slug: z.string(), pricePaise: z.number().int().positive(), currency: z.literal("INR") }) });
export type CourseHandoff = { status: "ready"; url: string } | { status: "not-configured" | "unavailable" | "price-mismatch" };

export function platformOrigin(value: string, development = process.env.NODE_ENV !== "production") {
  const url = new URL(value);
  const local = development && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(url.protocol === "http:" && local)) || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("Course platform must be an HTTPS origin without a path, credentials, query or fragment.");
  }
  return url.origin;
}

/** Read-only preflight. Payment and student identities remain in the course platform. */
export async function getCourseHandoff(slug: PricedCourseSlug, now = Date.now()): Promise<CourseHandoff> {
  const configuredUrl = process.env.COURSE_PLATFORM_URL?.trim();
  if (process.env.COURSE_PLATFORM_HANDOFF_ENABLED !== "true" || !configuredUrl) return { status: "not-configured" };
  try {
    const origin = platformOrigin(configuredUrl);
    const platformSlug = platformCourseSlugs[slug];
    const response = await fetch(`${origin}/api/courses/${platformSlug}`, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(5000) });
    if (!response.ok) return { status: "unavailable" };
    const data = courseResponse.safeParse(await response.json());
    if (!data.success || data.data.course.slug !== platformSlug) return { status: "unavailable" };
    if (data.data.course.pricePaise !== Math.round(getOfferPricing(now).courses[slug].price * 100)) return { status: "price-mismatch" };
    return { status: "ready", url: `${origin}/courses/${platformSlug}` };
  } catch { return { status: "unavailable" }; }
}
