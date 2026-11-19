import { introductoryOffer } from "@/content/offer";

export function OfferNote() {
  return <p className="sales-offer-note"><strong>{introductoryOffer.label}</strong><span>Limited to the first {introductoryOffer.allocation} enrolments across course offers. Ask the team about current availability.</span></p>;
}
