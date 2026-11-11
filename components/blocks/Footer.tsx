import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Instagram, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-line pt-14 pb-10 text-ink">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-line">
          {/* Brand & Byline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex flex-col justify-center min-h-[44px] min-w-[44px] py-1">
              <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
                {siteConfig.brand}
              </span>
              <span className="block text-xs uppercase font-sans font-semibold tracking-[0.18em] text-gold -mt-0.5">
                ACADEMY
              </span>
            </Link>
            <p className="font-serif text-base text-ink font-medium max-w-sm">
              Sunita Rathee ki academy — Bahadurgarh se, poore India ke liye.
            </p>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Real cosmetology skills, hygiene standards aur practical knowledge — simple Hindi mein.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-surface-2 text-ink hover:text-brand transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-surface-2 text-ink hover:text-brand transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gold">
              Courses
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/courses/hydra-facial" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  Hydra Facial Online
                </Link>
              </li>
              <li>
                <Link href="/courses/one-day" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  <PlaceholderNotice label="1-DAY COURSE NAME" fallbackText="1-Day Masterclass" />
                </Link>
              </li>
              <li>
                <Link href="/offline-academy" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  Offline 3-Month Course
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gold">
              Academy
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/about" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  About Sunita
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/offline-academy#visit" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  Visit Academy
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-brand transition-colors">
                  Fee Structure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-sm text-muted">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gold">
              Contact
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-gold mt-1" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center min-h-[44px] py-1 font-medium text-ink hover:text-brand transition-colors"
                >
                  <PlaceholderNotice label="ACADEMY PHONE" fallbackText={siteConfig.phone} />
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <span>
                  <PlaceholderNotice label="ACADEMY EMAIL" fallbackText="feminyacademy@gmail.com" />
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-gold mt-0.5" />
                <span>
                  <PlaceholderNotice label="ACADEMY HOURS" fallbackText="Mon - Sat: 10:00 AM - 6:00 PM" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Policies and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © 2026{" "}
            <PlaceholderNotice label="LEGAL BUSINESS NAME" fallbackText="Feminy Academy" />
            . All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <Link href="/terms" className="inline-flex items-center min-h-[44px] px-1 hover:text-brand transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="inline-flex items-center min-h-[44px] px-1 hover:text-brand transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="inline-flex items-center min-h-[44px] px-1 hover:text-brand transition-colors">
              Refund Policy
            </Link>
            <Link href="/pricing" className="inline-flex items-center min-h-[44px] px-1 hover:text-brand transition-colors">
              Pricing Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
