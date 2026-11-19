"use client";

import { BookOpen, MessageCircle, Wallet } from "lucide-react";
import { formatCourseFee } from "@/lib/offer-pricing";
import { useOfferPricing } from "./OfferPricing";

export function ComparisonStrengths() {
  const pricing = useOfferPricing();
  const fee = pricing?.courses["hydra-facial"].price;
  const difference = fee === undefined ? null : 10000 - fee;
  return <div className="comparison-strengths">
    <article><Wallet size={23} aria-hidden="true"/><strong>{difference !== null && difference > 0 ? `${formatCourseFee(difference)} lower listed fee` : "A clear course fee"}</strong><p>{difference !== null && difference > 0 ? "Compared with the cited ₹10,000 programme, before tax and format differences." : "See your current fee and the next scheduled increase before you enquire."}</p></article>
    <article><BookOpen size={23} aria-hidden="true"/><strong>Focused Hindi / Hinglish learning</strong><p>Explore the Hydra Facial outline without committing to a broader beauty-therapy programme.</p></article>
    <article><MessageCircle size={23} aria-hidden="true"/><strong>Speak to the academy directly</strong><p>Discuss your machine, starting level and batch details before deciding to enrol.</p></article>
  </div>;
}
