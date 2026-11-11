import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PlaceholderNotice, isPlaceholder } from "@/components/ui/PlaceholderNotice";
import { ProofStrip } from "@/components/blocks/ProofStrip";
import { MonthJourneyScroll } from "@/components/blocks/MonthJourneyScroll";
import { WorkGallery } from "@/components/blocks/WorkGallery";
import { Testimonials } from "@/components/blocks/Testimonials";
import { MeetSunita } from "@/components/blocks/MeetSunita";
import { RealAcademy } from "@/components/blocks/RealAcademy";
import { LeadForm } from "@/components/blocks/LeadForm";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { offlineAcademyData } from "@/content/offline";
import { siteConfig } from "@/content/site";
import { hasRealStudentWork, hasRealTestimonials } from "@/content/testimonials";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  Users,
  Clock,
  Calendar,
  CreditCard,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: "3-Month Professional Beauty Course in Bahadurgarh | Feminy Academy",
  description:
    "Makeup, hair aur skin ka 3 mahine ka professional course. Real models pe practice, kit, certificate. Free demo class book kijiye.",
  openGraph: {
    title: "3-Month Professional Beauty Course in Bahadurgarh",
    description:
      "Makeup, hair aur skin — Sunita ma'am ki academy mein, real models pe practice ke saath. Free demo class available.",
  },
};

export default function OfflineAcademyPage() {
  const isDev = process.env.NODE_ENV !== "production";
  const whatsappOffline = getWhatsAppUrl("offline");

  const offlineJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "3-Month Professional Beauty Course",
    description: offlineAcademyData.subheadline,
    provider: {
      "@type": "Organization",
      name: "Feminy Academy",
      sameAs: "https://feminyacademy.com",
    },
    educationalCredentialAwarded: "Feminy Academy Professional Diploma",
    courseMode: "Onsite",
    location: {
      "@type": "Place",
      name: "Feminy Academy Studio",
      address: siteConfig.address,
    },
  };

  return (
    <div className="w-full font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offlineJsonLd) }}
      />

      {/* 8.1 Hero */}
      <section className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 bg-paper overflow-hidden">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="gold">{offlineAcademyData.eyebrow}</Badge>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-[1.1] tracking-tight">
                {offlineAcademyData.headline}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl font-sans">
                {offlineAcademyData.subheadline}
              </p>

              {/* Facts Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-card bg-paper-2 border border-line text-[13px] font-sans">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-line shrink-0" />
                  <span>
                    <strong>Duration:</strong> {offlineAcademyData.facts.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-line shrink-0" />
                  <span>
                    <strong>Batch:</strong> {offlineAcademyData.facts.batchSize}
                  </span>
                </div>
                {offlineAcademyData.facts.nextBatch && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gold-line shrink-0" />
                    <span>
                      <strong>Next batch:</strong> {offlineAcademyData.facts.nextBatch}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-line shrink-0" />
                  <span>
                    <strong>Timings:</strong> {offlineAcademyData.facts.timings}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-accent shrink-0" />
                  <span>
                    <strong>Fee:</strong> {offlineAcademyData.facts.feeDisplay}
                    {offlineAcademyData.facts.emiAvailable && (
                      <span className="text-ink-muted ml-1 font-normal">
                        (EMI / instalments available)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button variant="primary" href="#demo" className="text-base">
                  Free demo class book karein
                </Button>
                <Button
                  variant="whatsapp"
                  href={whatsappOffline}
                  isExternal
                  withWhatsAppIcon
                  className="text-base"
                >
                  WhatsApp pe poochein
                </Button>
              </div>
            </div>

            {/* Right Media */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md aspect-[4/3] rounded-card overflow-hidden bg-paper border border-line p-2">
                <div className="relative w-full h-full rounded-card overflow-hidden">
                  <Image
                    src="/images/sunita-hero.jpg"
                    alt="Sunita Rathee — Master Educator at Bahadurgarh Studio"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 448px"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink via-ink/60 to-transparent text-white">
                    <span className="text-xs uppercase tracking-[0.12em] text-gold-line font-semibold block">
                      Bahadurgarh Studio
                    </span>
                    <span className="text-sm font-serif font-medium text-on-ink">
                      Direct practical training under Sunita Rathee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8.2 Proof Strip */}
      <ProofStrip />

      {/* 8.3 Who it's for */}
      <Section
        title="Ye course un ladies ke liye hai jo…"
        subtitle="Serious practical skills seekh kar professional career build karna chahti hain."
        variant="surface-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offlineAcademyData.whoFor.map((item, idx) => (
            <Card key={idx} variant="white" className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8.4 Your 3 Months */}
      <Section
        title="Aapke 3 mahine."
        subtitle="Skin, Makeup aur Hair ka step-by-step complete journey."
      >
        <MonthJourneyScroll />
      </Section>

      {/* 8.5 How you learn (Clean Bodoni numerals, NO icon cards) */}
      <Section
        title="Seekhne ka tareeka"
        subtitle="Theory kam, real practice zyada."
        variant="surface-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offlineAcademyData.howYouLearn.map((card, idx) => (
            <Card key={idx} variant="white" className="space-y-3">
              <span className="font-serif text-2xl font-medium text-gold-line block">
                0{idx + 1}
              </span>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {card.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                {card.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8.6 Career outcomes */}
      <Section
        title="Course ke baad aap kya kar sakti hain"
        subtitle="Honest career pathways bina kisi exaggerated claims ke."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offlineAcademyData.careerOutcomes.items.map((outcome, idx) => (
            <Card key={idx} variant="white" className="flex items-start gap-3 p-5">
              <Briefcase className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-ink font-sans">{outcome}</span>
            </Card>
          ))}
        </div>
        {offlineAcademyData.careerOutcomes.placementNote && (
          <div className="mt-6 text-center text-[13px] text-ink-muted">
            {offlineAcademyData.careerOutcomes.placementNote}
          </div>
        )}
      </Section>

      {/* 8.7 Student work + testimonials (only rendered when real verified assets arrive) */}
      {hasRealStudentWork && (
        <Section
          title="Hamare offline students ka kaam"
          subtitle="Studio mein real models par ki gayi live transformations."
          variant="surface-2"
        >
          <WorkGallery filterCourse="Professional" />
        </Section>
      )}

      {hasRealTestimonials("offline") && (
        <Section
          title="Students kya kehti hain"
          subtitle="Academy batch ke real experiences."
        >
          <Testimonials filterCategory="offline" />
        </Section>
      )}

      {/* 8.8 Meet Sunita */}
      <Section
        title="Aapki teacher: Sunita Rathee"
        subtitle="Direct 1-on-1 supervision in Bahadurgarh."
        variant="surface-2"
      >
        <MeetSunita />
      </Section>

      {/* 8.9 Visit the Academy */}
      <Section
        id="visit"
        title="Pehle aakar dekhiye."
        subtitle="Free demo class mein academy dekhiye, Sunita ma'am se miliye aur apne sawaal poochiye. Koi commitment nahi."
      >
        <RealAcademy />
      </Section>

      {/* 8.10 Lead Form (anchor #demo) */}
      <Section
        id="demo"
        title="Free demo class book karein"
        subtitle="Apni seat reserve kijiye aur Sunita ma'am se demo class mein miliye."
        variant="surface-2"
        headerCentered
      >
        <LeadForm id="demo" />
      </Section>

      {/* 8.11 FAQ */}
      <Section
        title="Aksar pooche jaane wale sawaal"
        subtitle="Offline admission aur class schedules ke baare mein."
      >
        <FAQBlock faqs={offlineAcademyData.faqs} />
      </Section>

      {/* 8.12 Final CTA */}
      <section className="py-18 lg:py-28 bg-paper border-t border-line text-center">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
            {offlineAcademyData.facts.nextBatch && !offlineAcademyData.facts.nextBatch.startsWith("[") ? (
              `Agla batch ${offlineAcademyData.facts.nextBatch} se.`
            ) : !isPlaceholder(offlineAcademyData.facts.duration) ? (
              `${offlineAcademyData.facts.duration} mein apna professional beauty career shuru kijiye.`
            ) : isDev ? (
              <>
                <PlaceholderNotice
                  label="OFFLINE DURATION"
                  fallbackText={offlineAcademyData.facts.duration}
                />{" "}
                mein apna professional beauty career shuru kijiye.
              </>
            ) : (
              "Apna professional beauty career shuru kijiye."
            )}
          </h2>
          <p className="mt-4 text-base sm:text-xl text-ink-muted max-w-lg mx-auto font-sans">
            Sunita ma&apos;am ke direct batch mein shamil hoiye.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" href="#demo" className="w-full sm:w-auto">
              Free demo class book karein
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappOffline}
              isExternal
              withWhatsAppIcon
              className="w-full sm:w-auto"
            >
              WhatsApp karein
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
