"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";
import { trackEvent, trackWhatsAppClick } from "@/lib/tracking";

interface StickyCTAProps {
  mode?: "course" | "home";
  courseTitle?: string;
  priceDisplay?: string;
  priceNumber?: number;
  actionType?: "hydrafacial_enrol" | "oneday_enrol" | "general";
  checkoutUrl?: string;
  targetFormId?: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  mode = "course",
  courseTitle = "",
  priceDisplay = "",
  priceNumber = 0,
  actionType = "hydrafacial_enrol",
  checkoutUrl = "#",
  targetFormId = "hero-lead-form",
}) => {
  const [visible, setVisible] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const isPaymentEnabled = siteConfig.flags.PAYMENT_ENABLED;

  useEffect(() => {
    setWhatsappUrl(getWhatsAppUrl(mode === "home" ? "general" : actionType));
  }, [mode, actionType]);

  useEffect(() => {
    const heroEl =
      mode === "home"
        ? document.getElementById(targetFormId) || document.getElementById("home-hero")
        : document.getElementById("course-hero");
    const hideEl =
      mode === "home"
        ? document.getElementById("home-final-cta")
        : document.getElementById("enrol");
    const footerEl = document.querySelector("footer");

    if (!heroEl) return;

    let heroInView = true;
    let hideElInView = false;
    let footerInView = false;

    const checkVisibility = () => {
      setVisible(!heroInView && !hideElInView && !footerInView);
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry.isIntersecting;
        checkVisibility();
      },
      { threshold: 0.05 }
    );

    heroObserver.observe(heroEl);

    let hideObserver: IntersectionObserver | null = null;
    if (hideEl) {
      hideObserver = new IntersectionObserver(
        ([entry]) => {
          hideElInView = entry.isIntersecting;
          checkVisibility();
        },
        { threshold: 0.1 }
      );
      hideObserver.observe(hideEl);
    }

    let footerObserver: IntersectionObserver | null = null;
    if (footerEl) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          footerInView = entry.isIntersecting;
          checkVisibility();
        },
        { threshold: 0.05 }
      );
      footerObserver.observe(footerEl);
    }

    return () => {
      heroObserver.disconnect();
      hideObserver?.disconnect();
      footerObserver?.disconnect();
    };
  }, [mode, targetFormId]);

  const handleCourseClick = () => {
    trackEvent("cta_click", {
      label: "sticky_bar",
      course: courseTitle,
      value: priceNumber,
    });
    if (!isPaymentEnabled) {
      trackWhatsAppClick("sticky");
    }
  };

  const handleHomeDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackEvent("cta_click", {
      label: "sticky_demo_book",
      source: "sticky",
    });
    const formEl = document.getElementById(targetFormId);
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstInput = formEl.querySelector("input:not([type='hidden'])") as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 400);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleHomeWhatsAppClick = () => {
    trackWhatsAppClick("sticky");
    trackEvent("cta_click", { label: "whatsapp", location: "sticky" });
  };

  if (!visible) return null;

  if (mode === "home") {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-md border-t border-line px-4 pt-2.5 shadow-2xl transition-all duration-300"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="flex items-center gap-3">
          <a
            href={`#${targetFormId}`}
            onClick={handleHomeDemoClick}
            className="flex-1 inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 rounded-full bg-brand text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
          >
            <span>Demo book karein</span>
          </a>

          <a
            href={whatsappUrl || getWhatsAppUrl("general")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleHomeWhatsAppClick}
            aria-label="WhatsApp pe baat karein"
            className="inline-flex items-center justify-center min-h-[48px] min-w-[48px] px-4 py-2.5 rounded-full bg-whatsapp text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 stroke-[2]" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-md border-t border-line px-4 pt-3 shadow-2xl transition-all duration-300"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
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
            onClick={handleCourseClick}
            className="inline-flex items-center justify-center min-h-[48px] px-5 py-2.5 rounded-full bg-brand text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
          >
            <span>Enrol karein</span>
          </a>
        ) : (
          <a
            href={whatsappUrl || getWhatsAppUrl(actionType)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCourseClick}
            className="inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-full bg-whatsapp text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
            <span>Enrol karein</span>
          </a>
        )}
      </div>
    </div>
  );
};
