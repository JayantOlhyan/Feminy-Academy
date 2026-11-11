import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { legalContent } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Phone, Mail, MapPin, Clock, Navigation, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Feminy Academy | Bahadurgarh Studio & Offline Centre",
  description:
    "Feminy Academy Bahadurgarh contact details, address, phone number, WhatsApp and visiting hours.",
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <div className="w-full font-sans">
      <section className="pt-12 pb-14 border-b border-line bg-paper">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            Get in touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-2 leading-tight">
            {legalContent.contact.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-ink-muted max-w-xl mx-auto font-sans">
            {legalContent.contact.subtitle}
          </p>
        </Container>
      </section>

      <Section containerSize="narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Details Card */}
          <Card variant="white" className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Official Academy Details
            </h2>

            <div className="space-y-4 text-sm text-ink divide-y divide-line">
              <div className="pt-2 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-line shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">Academy Address</p>
                  <p className="text-ink-muted mt-0.5">{siteConfig.address}</p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-line shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <p className="text-ink-muted mt-0.5">
                    <PlaceholderNotice label="ACADEMY PHONE" fallbackText={siteConfig.phone} />
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">WhatsApp</p>
                  <p className="text-ink-muted mt-0.5">+{siteConfig.whatsappNumber}</p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-line shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <p className="text-ink-muted mt-0.5">
                    <PlaceholderNotice label="ACADEMY EMAIL" fallbackText="feminyacademy@gmail.com" />
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-line shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-ink">Visiting Hours</p>
                  <p className="text-ink-muted mt-0.5">
                    <PlaceholderNotice label="ACADEMY HOURS" fallbackText="Mon - Sat: 10:00 AM - 6:00 PM" />
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant="whatsapp"
                href={whatsappUrl}
                isExternal
                withWhatsAppIcon
                className="w-full text-sm"
              >
                WhatsApp karein
              </Button>
            </div>
          </Card>

          {/* Map Location Card */}
          <Card variant="surface-2" className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-ink">
              Location & Directions
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Tap the card below to open exact location in Google Maps:
            </p>

            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open location in Google Maps"
              className="block group rounded-card overflow-hidden border border-line bg-paper p-4 hover:border-ink transition-colors"
            >
              <div className="aspect-[4/3] rounded-card bg-paper-2 flex flex-col items-center justify-center p-4 text-center">
                <Navigation className="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-ink">Open Google Maps</p>
                <p className="text-xs text-ink-muted mt-1">{siteConfig.address}</p>
              </div>
            </a>
          </Card>
        </div>
      </Section>
    </div>
  );
}
