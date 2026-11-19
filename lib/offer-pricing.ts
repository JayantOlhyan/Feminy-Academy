/** Business-approved recurring ₹100 increases, shared by every visitor and surface. */
export const priceSchedule = {
  startsAt: "2026-11-19T10:30:00+05:30",
  intervalMs: 3 * 24 * 60 * 60 * 1000,
  increase: 100,
  courses: {
    "hydra-facial": { name: "Hydra Facial Masterclass", basePrice: 3000 },
    "one-day": { name: "1-Day Beauty Masterclass", basePrice: 1000 },
  },
} as const;
export type PricedCourseSlug = keyof typeof priceSchedule.courses;

export function getOfferPricing(now: number) {
  if (!Number.isFinite(now)) throw new Error("Invalid pricing timestamp");
  const startsAt = Date.parse(priceSchedule.startsAt);
  const cycle = Math.max(0, Math.floor((now - startsAt) / priceSchedule.intervalMs));
  const nextIncreaseAt = startsAt + (cycle + 1) * priceSchedule.intervalMs;
  const courses = Object.fromEntries(Object.entries(priceSchedule.courses).map(([slug, course]) => [slug, {
    name: course.name,
    price: course.basePrice + cycle * priceSchedule.increase,
    nextPrice: course.basePrice + (cycle + 1) * priceSchedule.increase,
  }])) as Record<PricedCourseSlug, { name: string; price: number; nextPrice: number }>;
  return { serverNow: now, cycle, nextIncreaseAt, courses };
}
export type OfferPricing = ReturnType<typeof getOfferPricing>;
export function formatCourseFee(price: number) { return `₹${price.toLocaleString("en-IN")}`; }
export function formatPriceDeadline(timestamp: number) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(timestamp) + " IST";
}
