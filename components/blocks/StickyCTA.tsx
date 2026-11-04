"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface StickyCTAProps {
  courseTitle: string;
  priceDisplay: string;
  priceNumber: number;
  actionType?: "hydrafacial_enrol" | "oneday_enrol";
  checkoutUrl?: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  courseTitle,
  priceDisplay,
  priceNumber,
  actionType = "hydrafacial_enrol",
  checkoutUrl = "#",
}) => {
  const [visible, setVisible] = useState(false);
  const isPaymentEnabled = siteConfig.flags.PAYMENT_ENABLED;
  const whatsappUrl = getWhatsAppUrl(actionType);

  useEffect(() => {
    const heroEl = document.getElementById("course-hero");
    const pricingEl = document.getElementById("enrol");

    if (!heroEl) return;

    let heroPassed = false;
    let pricingVisible = false;

    const checkVisibility = () => {
      setVisible(heroPassed && !pricingVisible);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry.isIntersecting;
        checkVisibility();
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroEl);

    let pricingObserver: IntersectionObserver | null = null;
    if (pricingEl) {
      pricingObserver = new IntersectionObserver(
        ([entry]) => {
          pricingVisible = entry.isIntersecting;
          checkVisibility();
        },
        { threshold: 0.1 }
      );
      pricingObserver.observe(pricingEl);
    }

    return () => {
      heroObserver.disconnect();
      pricingObserver?.disconnect();
    };
  }, []);

  const handleClick = () => {
    trackEvent("cta_click", {
      label: "sticky_bar",
      course: courseTitle,
      value: priceNumber,
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-md border-t border-line px-4 py-3 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-serif text-lg font-bold text-brand leading-none">
            {priceDisplay}
          </div>
          <div className="text-[11px] text-muted truncate max-w-[150px]">
            {courseTitle}
          </div>
        </div>

        {isPaymentEnabled ? (
          <a
            href={checkoutUrl}
            onClick={handleClick}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
          >
            <span>Enrol karein</span>
          </a>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-whatsapp text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
            <span>Enrol karein</span>
          </a>
        )}
      </div>
    </div>
  );
};
