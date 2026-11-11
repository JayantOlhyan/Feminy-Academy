import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProofStrip } from "@/components/blocks/ProofStrip";
import { VideoFacade } from "@/components/blocks/VideoFacade";
import { ProblemSection } from "@/components/blocks/ProblemSection";
import { GuideSection } from "@/components/blocks/GuideSection";
import { PlanSection } from "@/components/blocks/PlanSection";
import { TransformationSection } from "@/components/blocks/TransformationSection";
import { CoursesSection } from "@/components/blocks/CoursesSection";
import { RealAcademy } from "@/components/blocks/RealAcademy";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { FinalCTABand } from "@/components/blocks/FinalCTABand";
import { LeadForm } from "@/components/blocks/LeadForm";
import { StickyCTA } from "@/components/blocks/StickyCTA";
import { homeContent } from "@/content/home";
import { homeFAQs } from "@/content/faqs";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const whatsappUrl = getWhatsAppUrl("general");
  const { hero } = homeContent;

  return (
    <div className="w-full">
      {/* 1. HERO — The Student's Desire + Form */}
      <section
        id="home-hero"
        className="relative pt-2 sm:pt-10 pb-10 sm:pb-16 bg-paper overflow-hidden"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content + Form (order-1 on mobile so submit bottom <= 640px) */}
            <div className="order-1 lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              <div className="inline-flex items-center">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
                  {hero.eyebrow}
                </span>
              </div>

              {/* H1 Option A active; Option B in content for A/B testing */}
              <h1 className="font-serif text-[26px] sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.05] tracking-tight">
                {hero.h1}
              </h1>

              <p className="text-[14px] sm:text-lg text-ink-muted max-w-xl leading-relaxed font-sans">
                {hero.sub}
              </p>

              {/* Compact Hero Lead Form */}
              <div className="max-w-lg pt-0.5 space-y-2">
                <LeadForm
                  id="hero-lead-form"
                  variant="compact"
                  source="home-hero"
                  fields={["name", "phone"]}
                  submitLabel={hero.formSubmitLabel}
                />

                {/* Trust Micro-line under form */}
                <p className="text-xs text-ink-muted font-normal text-center sm:text-left font-sans">
                  {hero.trustMicroline}
                </p>

                {/* Secondary WhatsApp CTA + Courses Link */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                  <Button
                    variant="whatsapp"
                    href={whatsappUrl}
                    isExternal
                    withWhatsAppIcon
                    trackSource="home-hero"
                    className="text-sm sm:text-base py-2.5 px-5"
                  >
                    Ya WhatsApp pe baat karein
                  </Button>

                  <Link
                    href="#courses"
                    className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 text-sm font-semibold text-accent hover:text-accent-strong transition-colors font-sans"
                  >
                    {hero.coursesLinkLabel}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Media Frame: Portrait / Video Facade (order-2 on mobile, below the form) */}
            <div className="order-2 lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <VideoFacade
                  posterUrl="/images/sunita-hero.jpg"
                  aspectRatio="4/3"
                  priority
                  sizes="(max-width: 640px) 340px, 448px"
                  badgeText="▶ Sunita ma'am se milein · 1 min"
                  caption="Sunita Rathee — Founder & Cosmetologist"
                  altText="PHOTO: Sunita, warm portrait at the academy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. PROOF STRIP — Plain numbers in Bodoni Moda with Mukta labels */}
      <ProofStrip />

      {/* 3. PROBLEM — "Kya aapke saath bhi aisa hota hai?" */}
      <ProblemSection />

      {/* 4. GUIDE — Sunita (DARK section, --ink background; replaces and condenses StoryScroll) */}
      <GuideSection />

      {/* 5. PLAN — "3 aasaan steps" */}
      <PlanSection />

      {/* 6. TRANSFORMATION — Students' Stories & Real Work Gallery */}
      <TransformationSection />

      {/* 7. COURSES — The Offer (Snap-scroll on mobile, 3-card grid on desktop) */}
      <CoursesSection />

      {/* 8. REAL ACADEMY — Physical Verification & Objection Handling */}
      <section className="py-18 lg:py-28 bg-paper-2 border-b border-line">
        <Container size="wide">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
              ASLI ACADEMY
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
              Online hai, par asli hai.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
              Hamari academy Bahadurgarh mein hai. Aap kabhi bhi aakar mil sakti hain.
            </p>
            <div className="mt-4 w-12 h-px bg-gold-line" />
          </div>
          <RealAcademy />
        </Container>
      </section>

      {/* 8. FAQ — Objection Handling */}
      <Section
        id="faq"
        title="Aksar pooche jaane wale sawaal"
        subtitle="Aapke zaroori sawaalon ke aasaan jawab."
        variant="default"
      >
        <FAQBlock faqs={homeFAQs} />
      </Section>

      {/* 9. FINAL CTA — The Success Picture with Compact LeadForm */}
      <FinalCTABand
        showCompactForm
        formSource="home-final-cta"
      />

      {/* Sticky Mobile CTA (<768px) */}
      <StickyCTA mode="home" targetFormId="hero-lead-form" />
    </div>
  );
}
