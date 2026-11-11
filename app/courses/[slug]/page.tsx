import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ProofStrip } from "@/components/blocks/ProofStrip";
import { VideoFacade } from "@/components/blocks/VideoFacade";
import { AudienceCards } from "@/components/blocks/AudienceCards";
import { OutcomeGrid } from "@/components/blocks/OutcomeGrid";
import { SyllabusAccordion } from "@/components/blocks/SyllabusAccordion";
import { IncludedList } from "@/components/blocks/IncludedList";
import { MeetSunita } from "@/components/blocks/MeetSunita";
import { CertificatePreview } from "@/components/blocks/CertificatePreview";
import { PricingCard } from "@/components/blocks/PricingCard";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { StickyCTA } from "@/components/blocks/StickyCTA";
import { oneDayCourse } from "@/content/courses/one-day";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Sparkles } from "lucide-react";

export function generateStaticParams() {
  return [{ slug: "one-day" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "one-day") {
    return { title: "Course Not Found" };
  }

  return {
    title: "1-Day Masterclass | Feminy Academy by Sunita Rathee",
    description:
      "Sunita ma'am ke saath ek din mein seekhiye hands-on practical skill. Recorded lessons + live doubt session + certificate. ₹1,000.",
  };
}

export default async function OneDayCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== "one-day") {
    notFound();
  }

  const isPaymentEnabled = siteConfig.flags.PAYMENT_ENABLED;
  const whatsappEnrol = getWhatsAppUrl("oneday_enrol", undefined, oneDayCourse.name);
  const whatsappQuestion = getWhatsAppUrl(
    "question",
    "1-Day Course ke baare mein sawaal hai: "
  );

  return (
    <div className="w-full">
      {/* 7.1 Hero */}
      <section
        id="course-hero"
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 overflow-hidden"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="brand">{oneDayCourse.eyebrow}</Badge>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-[1.15] tracking-tight">
                <PlaceholderNotice
                  label="1-DAY COURSE NAME"
                  fallbackText="1-Day Masterclass"
                />{" "}
                — sirf ek din mein{" "}
                <PlaceholderNotice
                  label="CORE OUTCOME"
                  fallbackText="apni specific skill master kijiye"
                />
                .
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                {oneDayCourse.subheadline}
              </p>

              {/* Price Block */}
              <div className="p-4 rounded-card bg-paper-2 border border-line flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-accent">
                  {oneDayCourse.priceDisplay}
                </span>
                <span className="text-xs text-ink-muted">
                  <PlaceholderNotice
                    label="GST NOTE"
                    fallbackText={oneDayCourse.gstNote}
                  />
                </span>
                <span className="text-xs text-ink-muted font-medium ml-auto">
                  Ek baar ki fees ·{" "}
                  <PlaceholderNotice
                    label="ACCESS DURATION"
                    fallbackText="1 Year"
                  />{" "}
                  access
                </span>
              </div>

              {/* Meta Chips */}
              <div className="flex flex-wrap gap-2 text-xs text-ink font-medium">
                {oneDayCourse.chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-card bg-paper border border-line"
                  >
                    <PlaceholderNotice label={chip} fallbackText={chip} />
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                {isPaymentEnabled ? (
                  <Button variant="primary" href="#enrol" className="text-base">
                    Enrol karein — {oneDayCourse.priceDisplay}
                  </Button>
                ) : (
                  <Button
                    variant="whatsapp"
                    href={whatsappEnrol}
                    isExternal
                    withWhatsAppIcon
                    className="text-base"
                  >
                    WhatsApp pe enrol karein — {oneDayCourse.priceDisplay}
                  </Button>
                )}

                <Button
                  variant="outline"
                  href={whatsappQuestion}
                  isExternal
                  className="text-base"
                >
                  Pehle sawaal poochein
                </Button>
              </div>

              <p className="text-xs text-muted font-medium">
                ✓ {oneDayCourse.trustLine}
              </p>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <VideoFacade
                  posterUrl={oneDayCourse.videoIntro.posterUrl}
                  aspectRatio="4/3"
                  badgeText="▶ Course Preview · 1 min"
                  caption={oneDayCourse.videoIntro.caption}
                  altText="PHOTO: Sunita 1-Day course preview"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof Strip */}
      <ProofStrip />

      {/* Who it's for */}
      <Section
        title="Ye course aapke liye hai agar…"
        subtitle="Kam samay mein concentrated practical learning."
        variant="surface-2"
      >
        <AudienceCards
          items={oneDayCourse.whoFor.items}
          notFor={oneDayCourse.whoFor.notFor}
        />
      </Section>

      {/* What you'll learn */}
      <Section
        title="Course ke baad aap kar paayengi:"
        subtitle="Core transformation points."
      >
        <OutcomeGrid outcomes={oneDayCourse.outcomes} />
      </Section>

      {/* Syllabus */}
      <Section
        title="Poora syllabus"
        subtitle="1-Day intensive structured modules."
        variant="surface-2"
        headerCentered
      >
        <SyllabusAccordion modules={oneDayCourse.modules} />
      </Section>

      {/* What's included */}
      <Section
        title="Course mein kya-kya milega"
        subtitle="Har cheez jo aapko ek din mein seekhne aur implement karne ke liye chahiye."
      >
        <IncludedList
          items={oneDayCourse.included.items}
          highlightNote={oneDayCourse.included.highlightNote}
        />
      </Section>

      {/* Meet Sunita */}
      <Section
        title="Aapki teacher: Sunita Rathee"
        subtitle="15+ saal ka hands-on salon & cosmetology experience."
        variant="surface-2"
      >
        <MeetSunita />
      </Section>

      {/* Certificate */}
      <Section
        title="Course poora kijiye, certificate paaiye."
        subtitle="Feminy Academy verified participation credential."
      >
        <CertificatePreview
          courseName="1-Day Intensive Masterclass"
          qrVerification={false}
        />
      </Section>

      {/* Pricing Card (anchor #enrol) */}
      <Section
        id="enrol"
        title="1-Day Masterclass Enrolment"
        subtitle="Immediate access to lessons and upcoming live doubt session."
        variant="surface-2"
        headerCentered
      >
        <PricingCard
          courseTitle={oneDayCourse.name}
          priceDisplay={oneDayCourse.priceDisplay}
          priceNumber={oneDayCourse.price}
          gstNote={oneDayCourse.gstNote}
          includedItems={oneDayCourse.included.items}
          refundOneLiner={oneDayCourse.refundOneLiner}
          actionType="oneday_enrol"
          checkoutUrl={oneDayCourse.checkoutUrl}
        />
      </Section>

      {/* Cross-Sell Upsell Band (Points to HydraFacial and Offline Course) */}
      <div className="py-10 bg-bg">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-card bg-surface border border-line flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-semibold text-brand uppercase">
                  Online Specialized
                </span>
                <h4 className="font-serif text-lg font-semibold text-ink mt-1">
                  Online Hydra Facial Course (₹3,000)
                </h4>
                <p className="text-xs text-muted mt-1">
                  Machine setup se glowing client tak — complete step-by-step masterclass.
                </p>
              </div>
              <Button
                variant="secondary"
                href="/courses/hydra-facial"
                className="w-full text-xs py-2.5"
              >
                Hydra Facial Course dekhein →
              </Button>
            </div>

            <div className="p-6 rounded-card bg-surface border border-gold-hairline shadow-warm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-semibold text-gold uppercase">
                  Offline Academy
                </span>
                <h4 className="font-serif text-lg font-semibold text-ink mt-1">
                  3-Month Professional Offline Diploma
                </h4>
                <p className="text-xs text-muted mt-1">
                  Makeup, hair aur skin — Bahadurgarh academy mein real models pe practice.
                </p>
              </div>
              <Button
                variant="gold"
                href="/offline-academy"
                className="w-full text-xs py-2.5"
              >
                Offline Course & Demo class →
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ */}
      <Section
        title="Sawaal-jawab"
        subtitle="1-Day course ke baare mein zaroori jankari."
        variant="surface-2"
      >
        <FAQBlock faqs={oneDayCourse.faqs} />
      </Section>

      {/* Final CTA Band */}
      <section className="py-18 lg:py-28 bg-paper border-t border-line text-center font-sans">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
            Ek din. Ek nayi skill.
          </h2>
          <p className="mt-3 text-2xl font-serif font-bold text-accent">
            {oneDayCourse.priceDisplay}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isPaymentEnabled ? (
              <Button variant="primary" href="#enrol" className="w-full sm:w-auto">
                Enrol karein — {oneDayCourse.priceDisplay}
              </Button>
            ) : (
              <Button
                variant="whatsapp"
                href={whatsappEnrol}
                isExternal
                withWhatsAppIcon
                className="w-full sm:w-auto"
              >
                WhatsApp pe enrol karein — {oneDayCourse.priceDisplay}
              </Button>
            )}

            <Button
              variant="outline"
              href={whatsappQuestion}
              isExternal
              className="w-full sm:w-auto"
            >
              Koi sawaal hai? WhatsApp kijiye
            </Button>
          </div>
        </Container>
      </section>

      {/* Sticky Bottom Bar */}
      <StickyCTA
        courseTitle={oneDayCourse.name}
        priceDisplay={oneDayCourse.priceDisplay}
        priceNumber={oneDayCourse.price}
        actionType="oneday_enrol"
        checkoutUrl={oneDayCourse.checkoutUrl}
      />
    </div>
  );
}
