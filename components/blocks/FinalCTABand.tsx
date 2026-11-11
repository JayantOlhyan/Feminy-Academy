"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/blocks/LeadForm";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";
import { offlineAcademyData } from "@/content/offline";

interface FinalCTABandProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  showCompactForm?: boolean;
  formSource?: string;
  className?: string;
}

export const FinalCTABand: React.FC<FinalCTABandProps> = ({
  title = "Apne clients. Apni pehchaan. Shuruaat ek free demo class se.",
  subtitle = "Koi advance payment nahi. Pehle demo lijiye, padhaane ka tareeka samajhiye.",
  primaryButtonText = "Courses dekhein",
  primaryButtonHref = "#courses",
  showCompactForm = false,
  formSource = "home-final-cta",
  className = "",
}) => {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <section
      id={showCompactForm ? "home-final-cta" : undefined}
      className={`py-18 lg:py-28 bg-paper border-t border-line ${className}`}
    >
      <Container size="narrow" className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-xl mx-auto font-sans leading-relaxed">
          {subtitle}
        </p>

        {showCompactForm ? (
          <div className="mt-8 max-w-lg mx-auto space-y-4">
            <LeadForm
              id="final-lead-form"
              variant="compact"
              source={formSource}
              fields={["name", "phone"]}
              submitLabel="Free demo class book karein"
            />

            {/* Only show batch info if a real date is confirmed */}
            {offlineAcademyData.facts.nextBatch && !offlineAcademyData.facts.nextBatch.startsWith("[") && (
              <div className="text-[13px] font-sans text-ink-muted">
                Agla batch: {offlineAcademyData.facts.nextBatch}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="whatsapp"
                href={whatsappUrl}
                isExternal
                withWhatsAppIcon
                trackSource={formSource}
                className="w-full sm:w-auto text-sm py-3"
                onClick={() => {
                  trackEvent("cta_click", { label: "whatsapp", location: "final_cta" });
                }}
              >
                Ya WhatsApp pe baat karein
              </Button>
            </div>

            <p className="text-[13px] text-ink-muted font-sans">
              Direct call:{" "}
              <a
                href="tel:+919955331142"
                className="inline-flex items-center justify-center min-h-[44px] px-2 py-2 font-semibold text-ink underline hover:text-accent"
              >
                +91 99553 31142
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              href={primaryButtonHref}
              className="w-full sm:w-auto"
              onClick={() => trackEvent("cta_click", { label: "final_courses_cta" })}
            >
              {primaryButtonText}
            </Button>

            <Button
              variant="whatsapp"
              href={whatsappUrl}
              isExternal
              withWhatsAppIcon
              trackSource="home-final-cta"
              className="w-full sm:w-auto"
              onClick={() => {
                trackEvent("cta_click", { label: "whatsapp", location: "final_cta" });
              }}
            >
              WhatsApp pe baat karein
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};
