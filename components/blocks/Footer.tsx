import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PlaceholderNotice, isPlaceholder } from "@/components/ui/PlaceholderNotice";
import { Instagram, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const Footer: React.FC = () => {
  const isDev = process.env.NODE_ENV !== "production";
  return (
    <footer className="bg-paper border-t border-line pt-14 pb-10 text-ink font-sans">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-line">
          {/* Brand & Byline */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              aria-label="Feminy Academy Home"
              className="inline-flex items-center min-h-[44px] min-w-[44px] py-1"
            >
              <Logo variant="full" theme="light" />
            </Link>
            <p className="font-serif text-base text-ink font-medium max-w-sm">
              Sunita Rathee ki academy — Bahadurgarh se, poore India ke liye.
            </p>
            <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
              Real cosmetology skills, hygiene standards aur practical knowledge — simple Hindi mein.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-paper-2 text-ink hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-paper-2 text-ink hover:text-accent transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-semibold tracking-[0.12em] uppercase text-accent font-sans">
              Courses
            </h3>
            <ul className="space-y-1 text-sm text-ink-muted">
              <li>
                <Link href="/courses/hydra-facial" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  Hydra Facial Online
                </Link>
              </li>
              <li>
                <Link href="/courses/one-day" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  1-Day Masterclass
                </Link>
              </li>
              <li>
                <Link href="/offline-academy" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  Offline 3-Month Course
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-semibold tracking-[0.12em] uppercase text-accent font-sans">
              Academy
            </h3>
            <ul className="space-y-1 text-sm text-ink-muted">
              <li>
                <Link href="/about" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  About Sunita
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/offline-academy#visit" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  Visit Academy
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="inline-flex items-center min-h-[44px] py-1.5 hover:text-accent transition-colors">
                  Fee Structure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-semibold tracking-[0.12em] uppercase text-accent font-sans">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-gold-line mt-1" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-gold-line" />
                <a href="tel:+919955331142" className="inline-flex items-center min-h-[44px] hover:text-accent transition-colors">
                  +91 99553 31142
                </a>
              </li>
              {(!isPlaceholder(siteConfig.hours) || isDev) && (
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 text-gold-line mt-1" />
                  <span>
                    {isPlaceholder(siteConfig.hours) ? (
                      <PlaceholderNotice label="ACADEMY HOURS" fallbackText={siteConfig.hours} />
                    ) : (
                      siteConfig.hours
                    )}
                  </span>
                </li>
              )}
              {(!isPlaceholder(siteConfig.email) || isDev) && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-gold-line" />
                  {isPlaceholder(siteConfig.email) ? (
                    <PlaceholderNotice label="ACADEMY EMAIL" fallbackText={siteConfig.email} />
                  ) : (
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors">
                      {siteConfig.email}
                    </a>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-muted font-sans">
          <p>© 2026 Feminy Academy by Sunita Rathee. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="inline-flex items-center min-h-[44px] hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="inline-flex items-center min-h-[44px] hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="inline-flex items-center min-h-[44px] hover:text-accent transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
