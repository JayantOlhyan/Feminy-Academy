import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ProofStrip } from "@/components/blocks/ProofStrip";
import { MonthJourneyScroll } from "@/components/blocks/MonthJourneyScroll";
import { WorkGallery } from "@/components/blocks/WorkGallery";
import { Testimonials } from "@/components/blocks/Testimonials";
import { MeetSunita } from "@/components/blocks/MeetSunita";
import { RealAcademy } from "@/components/blocks/RealAcademy";
import { LeadForm } from "@/components/blocks/LeadForm";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { offlineAcademyData } from "@/content/offline";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  Sparkles,
  Users,
  Clock,
  Calendar,
  CreditCard,
  CheckCircle2,
  Briefcase,
  Layers,
  Camera,
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
      address: "135, Sector 9 Road, Sector 9, Bahadurgarh, Haryana 124507",
    },
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offlineJsonLd) }}
      />

      {/* 8.1 Hero */}
      <section className="relative pt-10 sm:pt-14 pb-14 sm:pb-20 overflow-hidden">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="gold">{offlineAcademyData.eyebrow}</Badge>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-[1.15] tracking-tight">
                {offlineAcademyData.headline}
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                {offlineAcademyData.subheadline}
              </p>

              {/* Facts Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface border border-line text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>
                    <strong>Duration:</strong> {offlineAcademyData.facts.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold shrink-0" />
                  <span>
                    <strong>Batch:</strong>{" "}
                    <PlaceholderNotice
                      label="BATCH SIZE"
                      fallbackText={offlineAcademyData.facts.batchSize}
                    />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  <span>
                    <strong>Next batch:</strong>{" "}
                    <PlaceholderNotice
                      label="DATE"
                      fallbackText={offlineAcademyData.facts.nextBatch}
                    />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold shrink-0" />
                  <span>
                    <strong>Timings:</strong>{" "}
                    <PlaceholderNotice
                      label="TIMINGS"
                      fallbackText={offlineAcademyData.facts.timings}
                    />
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand shrink-0" />
                  <span>
                    <strong>Fee:</strong>{" "}
                    <PlaceholderNotice
                      label="OFFLINE FEE DISPLAY"
                      fallbackText={offlineAcademyData.facts.feeDisplay}
                    />
                    {offlineAcademyData.facts.emiAvailable && (
                      <span className="text-muted ml-1 font-normal">
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
              <div className="relative mx-auto max-w-md aspect-[4/3] rounded-card overflow-hidden bg-surface-2 border border-line p-3 shadow-subtle flex flex-col justify-between">
                <div className="w-full h-full rounded-[12px] bg-gradient-to-br from-[#2D1F24] via-[#21161A] to-[#140D10] flex flex-col items-center justify-center p-6 text-center text-white">
                  <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">
                    Bahadurgarh Studio
                  </span>
                  <h3 className="font-serif text-xl font-semibold mb-3">
                    Hands-on Practical Training
                  </h3>
                  <span className="text-xs font-mono text-white/80 bg-black/40 px-3 py-1.5 rounded border border-white/10">
                    PHOTO: Class in progress at the academy
                  </span>
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
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0" />
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
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

      {/* 8.5 How you learn */}
      <Section
        title="Seekhne ka tareeka"
        subtitle="Theory kam, real practice zyada."
        variant="surface-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offlineAcademyData.howYouLearn.map((card, idx) => (
            <Card key={idx} variant="white" className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                {idx === 0 && <Users className="w-5 h-5" />}
                {idx === 1 && <Sparkles className="w-5 h-5" />}
                {idx === 2 && <Layers className="w-5 h-5" />}
                {idx === 3 && <Camera className="w-5 h-5" />}
              </div>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {card.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                <PlaceholderNotice label={card.desc} fallbackText={card.desc} />
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
              <Briefcase className="w-5 h-5 text-brand shrink-0 mt-0.5" />
              <span className="text-sm font-semibold text-ink">{outcome}</span>
            </Card>
          ))}
        </div>
        {offlineAcademyData.careerOutcomes.placementNote && (
          <div className="mt-6 text-center">
            <PlaceholderNotice
              label={offlineAcademyData.careerOutcomes.placementNote}
              fallbackText=""
              className="text-xs text-muted"
            />
          </div>
        )}
      </Section>

      {/* 8.7 Student work + testimonials */}
      <Section
        title="Hamare offline students ka kaam"
        subtitle="Studio mein real models par ki gayi live transformations."
        variant="surface-2"
      >
        <WorkGallery filterCourse="Professional" />
      </Section>

      <Section
        title="Students kya kehti hain"
        subtitle="Academy batch ke real experiences."
      >
        <Testimonials filterCategory="offline" />
      </Section>

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
      <section className="py-16 sm:py-20 surface-texture border-t border-line text-center">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
            Agla batch{" "}
            <PlaceholderNotice
              label="DATE"
              fallbackText={offlineAcademyData.facts.nextBatch}
            />{" "}
            se.
            {offlineAcademyData.facts.seatsLeft !== undefined && (
              <span> Seats limited hain.</span>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-xl text-muted max-w-lg mx-auto">
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
