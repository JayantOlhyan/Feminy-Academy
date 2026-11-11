import React from "react";
import type { Metadata } from "next";
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
import { WorkGallery } from "@/components/blocks/WorkGallery";
import { Testimonials } from "@/components/blocks/Testimonials";
import { MeetSunita } from "@/components/blocks/MeetSunita";
import { RealAcademy } from "@/components/blocks/RealAcademy";
import { CertificatePreview } from "@/components/blocks/CertificatePreview";
import { PricingCard } from "@/components/blocks/PricingCard";
import { OfflineUpsell } from "@/components/blocks/OfflineUpsell";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { StickyCTA } from "@/components/blocks/StickyCTA";
import { hydraFacialCourse } from "@/content/courses/hydra-facial";
import { hasRealStudentWork, hasRealTestimonials } from "@/content/testimonials";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Sparkles, MessageCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Hydra Facial Course in Hindi | Feminy Academy by Sunita Rathee",
  description:
    "Hydra Facial machine setup, step-by-step protocol, hygiene aur troubleshooting — Hindi mein seekhiye. Live doubt sessions + certificate. ₹3,000.",
  openGraph: {
    title: "Online Hydra Facial Course in Hindi | Feminy Academy",
    description:
      "Machine setup se client ke glow tak — poora process seekhiye Sunita Rathee se. Recorded lessons + live doubt sessions.",
  },
};

export default function HydraFacialCoursePage() {
  const isPaymentEnabled = siteConfig.flags.PAYMENT_ENABLED;
  const whatsappEnrol = getWhatsAppUrl("hydrafacial_enrol");
  const whatsappQuestion = getWhatsAppUrl(
    "question",
    "Online Hydra Facial course ke baare mein sawaal hai: "
  );

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Online Hydra Facial Course in Hindi",
    description: hydraFacialCourse.subheadline,
    provider: {
      "@type": "Organization",
      name: siteConfig.brand,
      sameAs: "https://feminyacademy.com",
    },
    offers: {
      "@type": "Offer",
      price: "3000",
      priceCurrency: "INR",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
    educationalCredentialAwarded: "Feminy Academy Certificate of Completion",
    inLanguage: "hi",
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* 6.1 Hero */}
      <section
        id="course-hero"
        className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 overflow-hidden"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="brand">{hydraFacialCourse.eyebrow}</Badge>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-[1.15] tracking-tight">
                {hydraFacialCourse.headline}
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                {hydraFacialCourse.subheadline}
              </p>

              {/* Price Block */}
              <div className="p-4 rounded-card bg-paper-2 border border-line flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-accent">
                  {hydraFacialCourse.priceDisplay}
                </span>
                <span className="text-xs text-ink-muted">
                  <PlaceholderNotice
                    label="GST NOTE"
                    fallbackText={hydraFacialCourse.gstNote}
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
                {hydraFacialCourse.chips.map((chip, idx) => (
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
                  <Button
                    variant="primary"
                    href="#enrol"
                    className="text-base"
                  >
                    Enrol karein — {hydraFacialCourse.priceDisplay}
                  </Button>
                ) : (
                  <Button
                    variant="whatsapp"
                    href={whatsappEnrol}
                    isExternal
                    withWhatsAppIcon
                    className="text-base"
                  >
                    WhatsApp pe enrol karein — {hydraFacialCourse.priceDisplay}
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

              {/* Trust Micro-line */}
              <p className="text-xs text-muted font-medium">
                ✓ {hydraFacialCourse.trustLine}
              </p>
            </div>

            {/* Right Media: Video Facade */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <VideoFacade
                  posterUrl={hydraFacialCourse.videoIntro.posterUrl}
                  aspectRatio="4/3"
                  caption="Sunita doing a Hydra Facial on a client"
                  altText="Sunita Rathee — Hydra Facial Practical Demonstration"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6.2 Proof Strip */}
      <ProofStrip />

      {/* 6.3 Video Section */}
      <Section
        title={hydraFacialCourse.videoIntro.title}
        subtitle="Dekhiye Sunita ma'am is course ke baare mein kya batati hain."
        variant="surface-2"
        headerCentered
      >
        <div className="max-w-3xl mx-auto">
          <VideoFacade
            posterUrl={hydraFacialCourse.videoIntro.posterUrl}
            aspectRatio="16/9"
            badgeText="▶ Play Course Preview (1 min)"
            caption={hydraFacialCourse.videoIntro.caption}
            altText="VIDEO: Sunita 60–90s intro for this course"
          />
        </div>
      </Section>

      {/* 6.4 Who it's for */}
      <Section
        title="Ye course aapke liye hai agar…"
        subtitle="Chahe parlour owner ho ya beginner, practical steps sabke liye."
      >
        <AudienceCards
          items={hydraFacialCourse.whoFor.items}
          notFor={hydraFacialCourse.whoFor.notFor}
        />
      </Section>

      {/* 6.5 What you'll learn */}
      <Section
        title="Course ke baad aap kar paayengi:"
        subtitle="8 practical outcomes jo aapke clients aur parlour ko alag banate hain."
        variant="surface-2"
      >
        <OutcomeGrid outcomes={hydraFacialCourse.outcomes} />
      </Section>

      {/* 6.6 Syllabus */}
      <Section
        title="Poora syllabus"
        subtitle={`${hydraFacialCourse.syllabusMeta.modulesCount} modules · ${hydraFacialCourse.syllabusMeta.lessonsCount} lessons · ${hydraFacialCourse.syllabusMeta.totalHours} ghante`}
        headerCentered
      >
        <SyllabusAccordion modules={hydraFacialCourse.modules} />
      </Section>

      {/* 6.7 What's included + value */}
      <Section
        title="Course mein kya-kya milega"
        subtitle="Poora comprehensive package taaki seekhne mein koi kami na rahe."
        variant="surface-2"
      >
        <IncludedList
          items={hydraFacialCourse.included.items}
          highlightNote={hydraFacialCourse.included.highlightNote}
        />
      </Section>

      {/* 6.8 Student work (hidden until real student work photos arrive) */}
      {hasRealStudentWork && (
        <Section
          title="Students ka kaam"
          subtitle="Hamare students ki real Hydra Facial practice results."
        >
          <WorkGallery filterCourse="Hydra Facial" />
        </Section>
      )}

      {/* 6.9 Testimonials (hidden until real verified testimonials arrive) */}
      {hasRealTestimonials("hydra-facial") && (
        <Section
          title="Jinhone ye course kiya, unki baat."
          subtitle="Real reviews from verified learners."
          variant="surface-2"
        >
          <Testimonials filterCategory="hydra-facial" />
        </Section>
      )}

      {/* 6.10 Meet Sunita */}
      <Section
        title="Aapki teacher: Sunita Rathee"
        subtitle="15+ saal ka hands-on salon & cosmetology experience."
      >
        <MeetSunita />
      </Section>

      {/* 6.11 Real Academy (compact) */}
      <Section
        title="Online hai, par asli hai."
        subtitle="Hamari academy Bahadurgarh mein hai. Aap kabhi bhi aakar mil sakti hain."
        variant="surface-2"
      >
        <RealAcademy compact />
      </Section>

      {/* 6.12 Certificate */}
      <Section
        title="Course poora kijiye, certificate paaiye."
        subtitle="Apne salon mein lagane ke liye authorized completion credential."
      >
        <CertificatePreview
          courseName="Online Hydra Facial Course"
          qrVerification={hydraFacialCourse.certificate.qrVerification}
        />
      </Section>

      {/* 6.13 Pricing Card (anchor #enrol) */}
      <Section
        id="enrol"
        title="Online Hydra Facial Course"
        subtitle="Aaj hi shuru kijiye aur client glow master kijiye."
        variant="surface-2"
        headerCentered
      >
        <PricingCard
          courseTitle="Online Hydra Facial Course"
          priceDisplay={hydraFacialCourse.priceDisplay}
          priceNumber={hydraFacialCourse.price}
          gstNote={hydraFacialCourse.gstNote}
          includedItems={hydraFacialCourse.included.items}
          refundOneLiner={hydraFacialCourse.refundOneLiner}
          actionType="hydrafacial_enrol"
          checkoutUrl={hydraFacialCourse.checkoutUrl}
        />
      </Section>

      {/* 6.14 Offline Upsell Band */}
      <div className="py-8 bg-bg">
        <Container size="default">
          <OfflineUpsell />
        </Container>
      </div>

      {/* 6.15 FAQ */}
      <Section
        title="Sawaal-jawab"
        subtitle="Course lene se pehle aapke dimaag mein aane wale saare sawaal."
        variant="surface-2"
      >
        <FAQBlock faqs={hydraFacialCourse.faqs} />
      </Section>

      {/* 6.16 Final CTA Band */}
      <section className="py-18 lg:py-28 bg-paper border-t border-line text-center font-sans">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
            Apni pehli Hydra Facial client ke liye taiyaar ho jaiye.
          </h2>
          <p className="mt-3 text-2xl font-serif font-bold text-accent">
            {hydraFacialCourse.priceDisplay}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isPaymentEnabled ? (
              <Button variant="primary" href="#enrol" className="w-full sm:w-auto">
                Enrol karein — {hydraFacialCourse.priceDisplay}
              </Button>
            ) : (
              <Button
                variant="whatsapp"
                href={whatsappEnrol}
                isExternal
                withWhatsAppIcon
                className="w-full sm:w-auto"
              >
                WhatsApp pe enrol karein — {hydraFacialCourse.priceDisplay}
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

      {/* 6.16 Sticky Bottom Bar on Mobile */}
      <StickyCTA
        courseTitle="Hydra Facial Course"
        priceDisplay={hydraFacialCourse.priceDisplay}
        priceNumber={hydraFacialCourse.price}
        actionType="hydrafacial_enrol"
        checkoutUrl={hydraFacialCourse.checkoutUrl}
      />
    </div>
  );
}
