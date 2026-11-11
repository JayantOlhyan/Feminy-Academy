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
    <header className="sticky top-0 z-40 w-full bg-bg/95 backdrop-blur-md border-b border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18 py-3">
        {/* Wordmark Logo */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
        >
          <span className="font-serif text-2xl font-semibold tracking-tight text-ink group-hover:text-brand transition-colors">
            {siteConfig.brand}
          </span>
          <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.2em] text-gold -mt-1">
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
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp"
            >
              <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
              <span>WhatsApp karein</span>
            </a>
          </div>
        ) : (
          <>
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              <Link
                href="/#courses"
                className="text-sm font-medium text-ink hover:text-brand transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/offline-academy"
                className="text-sm font-medium text-ink hover:text-brand transition-colors"
              >
                Offline Academy
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-ink hover:text-brand transition-colors"
              >
                About Sunita
              </Link>
              <a
                href={whatsappHref || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp"
              >
                <MessageCircle className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                <span>WhatsApp karein</span>
              </a>
            </nav>

            {/* Mobile Header Buttons */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href={whatsappHref || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                aria-label="WhatsApp"
                className="p-2.5 rounded-full bg-whatsapp text-white hover:bg-[#188346] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp"
              >
                <MessageCircle className="w-5 h-5 stroke-[2]" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2.5 rounded-lg text-ink hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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

      {/* Mobile Menu Dropdown (when not in ad-landing mode) */}
      {!isAdLanding && mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-surface px-6 py-6 space-y-4 shadow-lg">
          <Link
            href="/#courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-brand"
          >
            Courses
          </Link>
          <Link
            href="/courses/hydra-facial"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-brand pl-3 border-l-2 border-line"
          >
            Hydra Facial Online
          </Link>
          <Link
            href="/offline-academy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-brand"
          >
            Offline Academy
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-ink hover:text-brand"
          >
            About Sunita
          </Link>
          <div className="pt-2">
            <a
              href={whatsappHref || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold rounded-full bg-whatsapp text-white"
            >
              <MessageCircle className="w-5 h-5 stroke-[2]" />
              <span>WhatsApp karein</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
