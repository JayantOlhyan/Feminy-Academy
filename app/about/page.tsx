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
import { Sparkles, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Sunita Rathee & Feminy Academy | Bahadurgarh",
  description:
    "Software Engineer se Cosmetologist bani Sunita Rathee ki kahani aur Feminy Academy ka vision. 15+ saal ka beauty experience.",
};

export default function AboutPage() {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <div className="w-full">
      <section className="pt-12 pb-14 border-b border-line bg-surface">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
            Our Story & Founder
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-3 leading-tight">
            {legalContent.about.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted max-w-xl mx-auto">
            {legalContent.about.subtitle}
          </p>
        </Container>
      </section>

      <Section containerSize="narrow">
        <div className="space-y-8">
          <div className="rounded-card bg-surface border border-line p-6 sm:p-8 space-y-4 shadow-subtle">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Sunita Rathee ki Journey
            </h2>
            {legalContent.about.bio.map((paragraph, idx) => (
              <p key={idx} className="text-base text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="pt-2 text-xs text-muted">
              Established:{" "}
              <PlaceholderNotice label="YEAR" fallbackText="2010" /> in{" "}
              {siteConfig.address}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-ink mb-6">
              Academy mein hum kya sikhate hain
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {legalContent.about.offerings.map((offering, idx) => (
                <Card key={idx} variant="white" className="space-y-3">
                  <div className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-ink">
                    {offering.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {offering.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-card bg-surface-2 border border-line text-center space-y-4">
            <h3 className="font-serif text-xl font-semibold text-ink">
              Koi bhi sawaal ho, Sunita ma&apos;am se poochiye
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="whatsapp" href={whatsappUrl} isExternal withWhatsAppIcon>
                WhatsApp pe baat karein
              </Button>
              <Button variant="outline" href="/#courses">
                Courses dekhein
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
