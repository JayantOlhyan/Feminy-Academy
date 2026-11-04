import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { legalContent } from "@/content/legal";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Course Fees & Pricing Matrix | Feminy Academy",
  description:
    "Transparent pricing for Feminy Academy online Hydra Facial, masterclasses and 3-month offline academy courses.",
};

export default function PricingPage() {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <div className="w-full">
      <section className="pt-12 pb-14 border-b border-line bg-surface">
        <Container size="narrow" className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
            Transparent Fees
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink mt-3 leading-tight">
            {legalContent.pricing.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted max-w-xl mx-auto">
            {legalContent.pricing.subtitle}
          </p>
        </Container>
      </section>

      <Section containerSize="wide">
        <div className="space-y-6">
          <div className="overflow-x-auto rounded-card border border-line bg-surface shadow-subtle">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-surface-2 border-b border-line font-serif text-ink text-base">
                  <th className="p-4 sm:p-5">Course</th>
                  <th className="p-4 sm:p-5">Mode</th>
                  <th className="p-4 sm:p-5">Duration</th>
                  <th className="p-4 sm:p-5">Access</th>
                  <th className="p-4 sm:p-5">Fees</th>
                  <th className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-muted font-medium">
                {legalContent.pricing.courses.map((c, idx) => (
                  <tr key={idx} className="hover:bg-surface-2/40 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-ink">
                      <div className="flex flex-col items-start gap-1">
                        <span>
                          <PlaceholderNotice label={c.name} fallbackText={c.name} />
                        </span>
                        <Badge variant="surface" className="text-[10px]">
                          {c.badge}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5">{c.mode}</td>
                    <td className="p-4 sm:p-5">
                      <PlaceholderNotice label={c.duration} fallbackText={c.duration} />
                    </td>
                    <td className="p-4 sm:p-5">
                      <PlaceholderNotice label={c.access} fallbackText={c.access} />
                    </td>
                    <td className="p-4 sm:p-5 font-serif text-lg font-bold text-brand">
                      <PlaceholderNotice label={c.price} fallbackText={c.price} />
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      {idx === 0 ? (
                        <Button variant="primary" href="/courses/hydra-facial" className="text-xs py-2 px-4">
                          View Course
                        </Button>
                      ) : idx === 1 ? (
                        <Button variant="secondary" href="/courses/one-day" className="text-xs py-2 px-4">
                          View Course
                        </Button>
                      ) : (
                        <Button variant="gold" href="/offline-academy" className="text-xs py-2 px-4">
                          Demo Class
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-surface-2 border border-line text-xs text-muted">
            <PlaceholderNotice
              label="GST NOTE"
              fallbackText={legalContent.pricing.gstNote}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
