"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/blocks/LeadForm";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";

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
  title = "Shuruaat aaj se kijiye.",
  subtitle = "Ek course, ek teacher, aur aapka naya skill.",
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
      className={`py-16 sm:py-20 surface-texture border-t border-line ${className}`}
    >
      <Container size="narrow" className="text-center">
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-xl text-muted max-w-xl mx-auto">
          {subtitle}
        </p>

        {showCompactForm ? (
          <div className="mt-8 max-w-lg mx-auto space-y-4">
            <LeadForm
              id="final-lead-form"
              variant="compact"
              source={formSource}
              fields={["name", "phone"]}
            />
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
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
            <p className="text-xs text-muted">
              Call karein:{" "}
              <a
                href="tel:+919955331142"
                className="inline-flex items-center min-h-[44px] px-1 font-semibold text-ink underline hover:text-brand"
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
