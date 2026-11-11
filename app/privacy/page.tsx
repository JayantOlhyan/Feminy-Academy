import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { legalContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Feminy Academy",
  description:
    "Privacy and data protection guidelines for Feminy Academy students and visitors.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <section className="pt-12 pb-14 border-b border-line bg-surface">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
            Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-3 leading-tight">
            {legalContent.privacy.title}
          </h1>
          <p className="mt-2 text-xs text-muted">
            Last Updated: {legalContent.privacy.lastUpdated}
          </p>
        </Container>
      </section>

      <Section containerSize="narrow">
        <div className="space-y-6">
          {legalContent.privacy.sections.map((sec, idx) => (
            <Card key={idx} variant="white" className="space-y-3">
              <h2 className="font-serif text-xl font-semibold text-ink">
                {sec.heading}
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {sec.content.includes("[GRIEVANCE OFFICER NAME, EMAIL]") ? (
                  <>
                    {process.env.NODE_ENV !== "production" && (
                      <PlaceholderNotice
                        label="GRIEVANCE OFFICER NAME, EMAIL"
                        fallbackText="[GRIEVANCE OFFICER NAME, EMAIL]"
                      />
                    )}
                    {" "}
                    {sec.content.replace("[GRIEVANCE OFFICER NAME, EMAIL]", "").trim()}
                  </>
                ) : (
                  <PlaceholderNotice label={sec.content} fallbackText={sec.content} />
                )}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
