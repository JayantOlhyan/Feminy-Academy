"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";

interface FinalCTABandProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  className?: string;
}

export const FinalCTABand: React.FC<FinalCTABandProps> = ({
  title = "Shuruaat aaj se kijiye.",
  subtitle = "Ek course, ek teacher, aur aapka naya skill.",
  primaryButtonText = "Courses dekhein",
  primaryButtonHref = "#courses",
  className = "",
}) => {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <section className={`py-16 sm:py-20 surface-texture border-t border-line ${className}`}>
      <Container size="narrow" className="text-center">
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-xl text-muted max-w-xl mx-auto">
          {subtitle}
        </p>

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
            className="w-full sm:w-auto"
            onClick={() => {
              trackEvent("Contact", { label: "final_cta_whatsapp" });
              trackEvent("cta_click", { label: "whatsapp", location: "final_cta" });
            }}
          >
            WhatsApp pe baat karein
          </Button>
        </div>
      </Container>
    </section>
  );
};
