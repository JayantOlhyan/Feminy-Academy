"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { formatCourseFee, formatPriceDeadline, getOfferPricing, type OfferPricing, type PricedCourseSlug } from "@/lib/offer-pricing";

const PricingContext = createContext<OfferPricing | null>(null);

/** Server time plus monotonic elapsed time avoids a reset or dependence on the device clock. */
export function OfferPricingProvider({ children }: { children: ReactNode }) {
  const [pricing, setPricing] = useState<OfferPricing | null>(null);
  useEffect(() => {
    let disposed = false;
    let anchor: { time: number; monotonic: number } | null = null;
    let controller: AbortController | null = null;
    const sync = async () => {
      controller?.abort();
      const request = new AbortController();
      controller = request;
      const timeout = window.setTimeout(() => request.abort(), 8000);
      try {
        const response = await fetch("/api/course-pricing", { cache: "no-store", signal: request.signal });
        if (!response.ok) throw new Error("Pricing unavailable");
        const data: OfferPricing = await response.json();
        if (!Number.isFinite(data.serverNow)) throw new Error("Invalid server time");
        if (disposed) return;
        anchor = { time: data.serverNow, monotonic: performance.now() };
        setPricing(getOfferPricing(anchor.time));
      } catch {
        if (!disposed && controller === request) { anchor = null; setPricing(null); }
      } finally { window.clearTimeout(timeout); }
    };
    const tick = () => {
      if (!anchor || document.hidden) return;
      setPricing(getOfferPricing(anchor.time + performance.now() - anchor.monotonic));
    };
    const visibility = () => { if (!document.hidden) void sync(); };
    void sync();
    const seconds = window.setInterval(tick, 1000);
    const refresh = window.setInterval(() => { if (!document.hidden) void sync(); }, 60000);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("online", visibility);
    return () => { disposed = true; controller?.abort(); window.clearInterval(seconds); window.clearInterval(refresh); document.removeEventListener("visibilitychange", visibility); window.removeEventListener("online", visibility); };
  }, []);
  return <PricingContext.Provider value={pricing}>{children}</PricingContext.Provider>;
}
export function useOfferPricing() { return useContext(PricingContext); }

export function CourseFee({ slug, next = false }: { slug: string; next?: boolean }) {
  const pricing = useOfferPricing();
  const course = pricing?.courses[slug as PricedCourseSlug];
  return <span className="scheduled-fee">{course ? formatCourseFee(next ? course.nextPrice : course.price) : "Confirm fee"}</span>;
}
export function PriceCountdown({ compact = false, slug }: { compact?: boolean; slug?: string }) {
  const pricing = useOfferPricing();
  if (!pricing) return <span className="price-countdown-loading">Fees rise ₹100 every 3 days. Confirm the current fee with our team.</span>;
  const seconds = Math.max(0, Math.ceil((pricing.nextIncreaseAt - pricing.serverNow) / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds % 86400 / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const countdown = `${days}d ${String(hours).padStart(2,"0")}h ${String(minutes).padStart(2,"0")}m ${String(seconds % 60).padStart(2,"0")}s`;
  const course = pricing.courses[slug as PricedCourseSlug];
  return <span className={`price-countdown ${compact ? "price-countdown-compact" : ""}`}>
    <span>{course ? `Next fee: ${formatCourseFee(course.nextPrice)}` : "Course fees rise ₹100"} · <time dateTime={new Date(pricing.nextIncreaseAt).toISOString()}>{formatPriceDeadline(pricing.nextIncreaseAt)}</time></span>
    <span className="price-clock" role="timer" aria-live="off" aria-label={`Until the next ₹100 price increase: ${countdown}`}>{countdown}</span>
    {!compact && <span className="price-schedule-note">The fee increases by ₹100 every 3 days on this shared schedule.</span>}
  </span>;
}
