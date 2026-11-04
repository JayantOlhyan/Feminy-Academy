import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { legalContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions | Feminy Academy",
  description:
    "Terms of service, course enrolment rules, anti-piracy policies and governing laws for Feminy Academy.",
};

export default function TermsPage() {
  return (
    <div className="w-full">
      <section className="pt-12 pb-14 border-b border-line bg-surface">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
            Legal Agreement
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-3 leading-tight">
            {legalContent.terms.title}
          </h1>
          <p className="mt-2 text-xs text-muted">
            Last Updated: {legalContent.terms.lastUpdated}
          </p>
        </Container>
      </section>

      <Section containerSize="narrow">
        <div className="space-y-6">
          {legalContent.terms.sections.map((sec, idx) => (
            <Card key={idx} variant="white" className="space-y-3">
              <h2 className="font-serif text-xl font-semibold text-ink">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                <PlaceholderNotice label={sec.content} fallbackText={sec.content} />
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
