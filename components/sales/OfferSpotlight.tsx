"use client";

import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { introductoryOffer } from "@/content/offer";
import { formatCourseFee, priceSchedule, type PricedCourseSlug } from "@/lib/offer-pricing";
import { PriceCountdown, useOfferPricing } from "./OfferPricing";

export function OfferSpotlight() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2] as PricedCourseSlug;
  const isCourse = pathname.startsWith("/courses/") && Object.hasOwn(priceSchedule.courses, slug);
  const pricing = useOfferPricing();
  const course = isCourse ? pricing?.courses[slug] : null;
  const lowestFee = pricing ? Math.min(...Object.values(pricing.courses).map(item => item.price)) : null;
  return <aside className="sales-offer-bar offer-spotlight" aria-label="Introductory course offer"><div className="sales-container offer-spotlight-inner">
    <div className="offer-spotlight-copy"><span className="offer-spotlight-badge"><Sparkles size={13} aria-hidden="true"/> First {introductoryOffer.allocation} enrolments</span>
      <p>{isCourse ? <><span>{priceSchedule.courses[slug].name}</span><strong>{course ? formatCourseFee(course.price) : "Introductory fee"}</strong></> : <><span>Your next skill starts here.</span><strong>{lowestFee ? `Courses from ${formatCourseFee(lowestFee)}` : "Explore introductory fees"}</strong></>}</p>
    </div>
    <div className="offer-spotlight-timer"><PriceCountdown slug={isCourse ? slug : undefined} compact featured/></div>

  </div></aside>;
}
