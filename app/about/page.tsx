import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice, isPlaceholder } from "@/components/ui/PlaceholderNotice";
import { legalContent } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Sparkles, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Sunita Rathee & Feminy Academy | Bahadurgarh",
  description:
    "Sunita Rathee ki kahani aur Feminy Academy ka vision — practical cosmetology aur honest guidance.",
};

export default function AboutPage() {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <div className="w-full">
      <section className="pt-12 pb-14 border-b border-line bg-paper font-sans">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Our Story & Founder
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-2 leading-tight">
            {legalContent.about.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-ink-muted max-w-xl mx-auto font-sans">
            {legalContent.about.subtitle}
          </p>
        </Container>
      </section>

      <Section containerSize="narrow">
        <div className="space-y-8 font-sans">
          <div className="rounded-card bg-paper border border-line p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Sunita Rathee ki Journey
            </h2>
            {legalContent.about.bio.map((paragraph, idx) => {
              if (isPlaceholder(paragraph) && process.env.NODE_ENV === "production") {
                return null;
              }
              return (
                <p key={idx} className="text-base text-ink-muted leading-relaxed">
                  <PlaceholderNotice label={paragraph} fallbackText={paragraph} />
                </p>
              );
            })}
            {(!isPlaceholder("[YEAR]") || process.env.NODE_ENV !== "production") && (
              <div className="pt-2 text-xs text-ink-muted">
                Established:{" "}
                <PlaceholderNotice label="YEAR" fallbackText="[YEAR]" /> in{" "}
                {siteConfig.address}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-ink mb-6">
              Academy mein hum kya sikhate hain
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {legalContent.about.offerings.map((offering, idx) => (
                <Card key={idx} variant="white" className="space-y-3">
                  <span className="font-serif text-xl font-medium text-gold-line block">
                    0{idx + 1}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-ink">
                    {offering.title}
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {offering.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-card bg-paper-2 border border-line text-center space-y-4">
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
