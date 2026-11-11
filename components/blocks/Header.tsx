"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { storeUrlAttribution, isAdLandingSession } from "@/lib/lid";
import { initAnalytics, trackEvent, trackWhatsAppClick } from "@/lib/tracking";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdLanding, setIsAdLanding] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState("");

  useEffect(() => {
    storeUrlAttribution();
    initAnalytics();
    setIsAdLanding(isAdLandingSession());
    setWhatsappHref(getWhatsAppUrl("general"));
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("header");
    trackEvent("cta_click", { label: "whatsapp", location: "header" });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-paper/98 border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-18 py-2 sm:py-3">
        {/* Wordmark Logo */}
        <Link
          href="/"
          className="group inline-flex flex-col justify-center h-[48px] min-w-[44px] py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-card"
        >
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors leading-tight">
            {siteConfig.brand}
          </span>
          <span className="text-xs uppercase font-sans font-semibold tracking-[0.18em] text-gold-text -mt-0.5">
            ACADEMY
          </span>
        </Link>

        {/* Ad Landing Mode: Hide nav links, show only WhatsApp */}
        {isAdLanding ? (
          <div>
            <a
              href={whatsappHref || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 h-[44px] min-w-[44px] px-4 text-sm font-semibold rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp"
            >
              <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              <span>WhatsApp karein</span>
            </a>
          </div>
        ) : (
          <>
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 font-sans" aria-label="Main Navigation">
              <Link
                href="/#courses"
                className="inline-flex items-center h-[44px] px-2 text-sm font-medium text-ink hover:text-accent transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/offline-academy"
                className="inline-flex items-center h-[44px] px-2 text-sm font-medium text-ink hover:text-accent transition-colors"
              >
                Offline Academy
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center h-[44px] px-2 text-sm font-medium text-ink hover:text-accent transition-colors"
              >
                About Sunita
              </Link>
              <a
                href={whatsappHref || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 h-[44px] px-4 text-sm font-semibold rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp"
              >
                <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                <span>WhatsApp karein</span>
              </a>
            </nav>

            {/* Mobile Header Buttons */}
            <div className="flex md:hidden items-center gap-2.5 font-sans">
              <a
                href={whatsappHref || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                aria-label="WhatsApp"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp"
              >
                <MessageCircle className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-card"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[2]" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[2]" aria-hidden="true" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer (Only when not ad landing) */}
      {!isAdLanding && mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-paper px-4 pt-3 pb-6 space-y-3 font-sans">
          <Link
            href="/#courses"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[44px] text-base font-medium text-ink hover:text-accent px-2"
          >
            Courses
          </Link>
          <Link
            href="/offline-academy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[44px] text-base font-medium text-ink hover:text-accent px-2"
          >
            Offline Academy (Bahadurgarh)
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[44px] text-base font-medium text-ink hover:text-accent px-2"
          >
            About Sunita
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[44px] text-base font-medium text-ink hover:text-accent px-2"
          >
            Contact & Address
          </Link>
          <div className="pt-2">
            <a
              href={whatsappHref || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 min-h-[48px] w-full px-4 py-3 text-base font-semibold rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-colors"
            >
              <MessageCircle className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              <span>WhatsApp pe baat karein</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
