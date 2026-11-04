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
    <div className="w-full">
      <section className="pt-12 pb-14 border-b border-line bg-surface">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
            Get in touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-3 leading-tight">
            {legalContent.contact.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted max-w-xl mx-auto">
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
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Academy Address</p>
                  <p className="text-muted mt-0.5">{siteConfig.address}</p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted mt-0.5">
                    <PlaceholderNotice label="ACADEMY PHONE" fallbackText={siteConfig.phone} />
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-muted mt-0.5">+{siteConfig.whatsappNumber}</p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted mt-0.5">
                    <PlaceholderNotice label="ACADEMY EMAIL" fallbackText="feminyacademy@gmail.com" />
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Visiting Hours</p>
                  <p className="text-muted mt-0.5">
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

          {/* Map Facade */}
          <Card variant="surface-2" className="space-y-4">
            <h3 className="font-serif text-xl font-semibold text-ink">
              Location Map
            </h3>
            <p className="text-xs text-muted">
              Tap the card below to open exact location in Google Maps:
            </p>

            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-video rounded-xl overflow-hidden border border-line bg-surface p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-gold transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Navigation className="w-6 h-6" />
              </div>
              <p className="font-serif text-sm font-semibold text-ink">
                Sector 9, Bahadurgarh, Haryana
              </p>
              <span className="text-xs text-brand font-medium mt-1">
                Open in Google Maps →
              </span>
            </a>

            <div className="text-[11px] text-muted">
              Registered Entity:{" "}
              <PlaceholderNotice label="LEGAL BUSINESS NAME" fallbackText="Feminy Academy" />
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
