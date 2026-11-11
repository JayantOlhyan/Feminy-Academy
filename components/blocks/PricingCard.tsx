"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice, isPlaceholder } from "@/components/ui/PlaceholderNotice";
import { trackEvent } from "@/lib/tracking";
import { Check, ShieldCheck, HelpCircle } from "lucide-react";

interface PricingCardProps {
  id?: string;
  courseTitle: string;
  priceDisplay: string;
  priceNumber: number;
  gstNote: string;
  accessDuration?: string;
  includedItems: string[];
  refundOneLiner: string;
  actionType?: "hydrafacial_enrol" | "oneday_enrol";
  checkoutUrl?: string;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  id = "enrol",
  courseTitle,
  priceDisplay,
  priceNumber,
  gstNote,
  accessDuration,
  includedItems,
  refundOneLiner,
  actionType = "hydrafacial_enrol",
  checkoutUrl = "#",
  className = "",
}) => {
  const isDev = process.env.NODE_ENV !== "production";
  const isPaymentEnabled = siteConfig.flags.PAYMENT_ENABLED;
  const whatsappUrl = getWhatsAppUrl(actionType);
  const questionUrl = getWhatsAppUrl("question", `${courseTitle} ke fees ke baare mein`);

  const handleEnrolClick = () => {
    trackEvent("cta_click", {
      label: isPaymentEnabled ? "checkout" : "whatsapp_enrol",
      course: courseTitle,
      value: priceNumber,
    });
  };

  return (
    <div
      id={id}
      className={`max-w-xl mx-auto rounded-card bg-paper border border-line p-6 sm:p-10 shadow-form relative font-sans ${className}`}
    >
      <div className="text-center space-y-2 pb-6 border-b border-line">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
          Instant Online Enrolment
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink pt-2">
          {courseTitle}
        </h3>
        <div className="flex items-baseline justify-center gap-2 pt-2">
          <span className="font-serif text-4xl sm:text-5xl font-bold text-accent">
            {priceDisplay}
          </span>
          {(!isPlaceholder(gstNote) || isDev) && (
            <span className="text-xs text-ink-muted">
              <PlaceholderNotice label="GST NOTE" fallbackText={gstNote} />
            </span>
          )}
        </div>
        {accessDuration && !isPlaceholder(accessDuration) ? (
          <p className="text-xs text-ink-muted font-medium">
            Ek baar ki fees · {accessDuration}
          </p>
        ) : isDev ? (
          <p className="text-xs text-ink-muted font-medium">
            <PlaceholderNotice label="ACCESS DURATION" fallbackText={accessDuration || "[ACCESS DURATION]"} />
          </p>
        ) : null}
      </div>

      {/* Included items summary */}
      <div className="py-6 space-y-3">
        {includedItems.slice(0, 6).map((item, idx) => {
          if (isPlaceholder(item) && !isDev) return null;
          return (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
              <Check className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
              <span>
                <PlaceholderNotice label={item} fallbackText={item} />
              </span>
            </div>
          );
        })}
      </div>

      {/* Primary CTA button */}
      <div className="space-y-4 pt-2">
        {isPaymentEnabled ? (
          <Button
            variant="primary"
            href={checkoutUrl}
            onClick={handleEnrolClick}
            className="w-full py-4 text-base font-semibold"
          >
            Enrol karein — {priceDisplay}
          </Button>
        ) : (
          <Button
            variant="whatsapp"
            href={whatsappUrl}
            isExternal
            withWhatsAppIcon
            onClick={handleEnrolClick}
            className="w-full py-4 text-base font-semibold"
          >
            WhatsApp pe enrol karein — {priceDisplay}
          </Button>
        )}

        {/* Security / payment badges */}
        <div className="text-center space-y-2">
          {isPaymentEnabled && (
            <div className="flex items-center justify-center gap-3 text-xs text-ink-muted">
              <span>UPI</span>
              <span>•</span>
              <span>Cards</span>
              <span>•</span>
              <span>Net Banking</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
            <span>
              <Link
                href="/refund-policy"
                className="inline-flex items-center min-h-[44px] py-2 hover:underline text-ink-muted hover:text-ink transition-colors"
              >
                <PlaceholderNotice label="REFUND ONE-LINER" fallbackText={refundOneLiner} />
              </Link>
            </span>
          </div>
        </div>

        {/* Secondary link */}
        <div className="text-center pt-1">
          <a
            href={questionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 text-xs font-medium text-ink-muted hover:text-accent transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Koi sawaal? WhatsApp kijiye →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
