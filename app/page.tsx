import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ProofStrip } from "@/components/blocks/ProofStrip";
import { VideoFacade } from "@/components/blocks/VideoFacade";
import { StoryScroll } from "@/components/blocks/StoryScroll";
import { WorkGallery } from "@/components/blocks/WorkGallery";
import { Testimonials } from "@/components/blocks/Testimonials";
import { RealAcademy } from "@/components/blocks/RealAcademy";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { FinalCTABand } from "@/components/blocks/FinalCTABand";
import { homeFAQs } from "@/content/faqs";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <div className="w-full">
      {/* 5.1 Hero */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  FEMINY ACADEMY · BAHADURGARH
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.15] tracking-tight">
                Beauty seekhiye 15 saal ki expert se — ghar baithe, ya academy mein.
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                Software Engineer se Cosmetologist bani Sunita Rathee ab tak 150+ students ko sikha chuki hain. Simple Hindi mein, step-by-step, live doubt sessions ke saath.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button variant="primary" href="#courses" className="text-base">
                  Courses dekhein
                </Button>
                <Button
                  variant="whatsapp"
                  href={whatsappUrl}
                  isExternal
                  withWhatsAppIcon
                  className="text-base"
                >
                  WhatsApp pe baat karein
                </Button>
              </div>

              {/* Trust Micro-line */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-medium pt-1">
                <span>Hindi / Hinglish</span>
                <span>•</span>
                <span>Live doubt sessions</span>
                <span>•</span>
                <span>Certificate</span>
              </div>
            </div>

            {/* Right Media Frame: Sunita Portrait + Video Facade */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <VideoFacade
                  posterUrl="/images/sunita-hero.jpg"
                  aspectRatio="4/3"
                  badgeText="▶ Sunita ma'am se milein · 1 min"
                  caption="Sunita Rathee — Founder & Cosmetologist"
                  altText="PHOTO: Sunita, warm portrait at the academy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5.2 Proof Strip */}
      <ProofStrip />

      {/* 5.3 Courses: 01 */}
      <Section
        id="courses"
        number="01"
        title="Aapke liye kaunsa course?"
        subtitle="Shuruaat online se kijiye, ya seedha professional baniye."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: HydraFacial */}
          <Card variant="gold-border" className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="brand">ONLINE</Badge>
                <span className="font-serif text-2xl font-semibold text-brand">
                  ₹3,000
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                HydraFacial Course
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Machine setup se client ke glow tak — poora process, Hindi mein.
              </p>
              <div className="p-3 bg-surface-2 rounded-xl text-xs text-muted font-medium space-y-1">
                <p>• Recorded + live doubt sessions</p>
                <p>• Certificate</p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-line">
              <Button
                variant="primary"
                href="/courses/hydra-facial"
                className="w-full text-sm py-3"
              >
                <span>Course dekhein →</span>
              </Button>
            </div>
          </Card>

          {/* Card 2: 1-Day Course */}
          <Card variant="white" className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="brand">ONLINE</Badge>
                <span className="font-serif text-2xl font-semibold text-ink">
                  ₹1,000
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                <PlaceholderNotice
                  label="1-DAY COURSE NAME"
                  fallbackText="1-Day Masterclass"
                />
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                <PlaceholderNotice
                  label="ONE-LINE OUTCOME OF 1-DAY COURSE"
                  fallbackText="Ek din mein specific practical technique seekhiye real model demo ke saath."
                />
              </p>
              <div className="p-3 bg-surface-2 rounded-xl text-xs text-muted font-medium space-y-1">
                <p>• 1 din · Recorded + live doubt session</p>
                <p>• Certificate</p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-line">
              <Button
                variant="secondary"
                href="/courses/one-day"
                className="w-full text-sm py-3"
              >
                <span>Course dekhein →</span>
              </Button>
            </div>
          </Card>

          {/* Card 3: Offline 3-Month Course */}
          <Card variant="white" className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="gold">OFFLINE · BAHADURGARH</Badge>
                <span className="text-xs font-semibold text-gold font-sans uppercase">
                  Career Ready
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                3-Month Professional Course
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Makeup, hair aur skin — real models pe practice karke professional baniye.
              </p>
              <div className="p-3 bg-surface-2 rounded-xl text-xs text-muted font-medium space-y-1">
                <p>• 3 mahine · Academy mein</p>
                <p>• Certificate</p>
                <p className="font-semibold text-ink pt-1">
                  <PlaceholderNotice
                    label="OFFLINE FEE DISPLAY"
                    fallbackText="Fee counselling mein bataayi jaayegi"
                  />
                </p>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-line">
              <Button
                variant="secondary"
                href="/offline-academy"
                className="w-full text-sm py-3"
              >
                <span>Free demo class book karein →</span>
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* 5.4 Why Feminy: 02 */}
      <Section
        number="02"
        title="Sirf videos nahi — ek teacher jo sach mein sikhaati hai."
        variant="surface-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Point 1 */}
          <Card variant="white" className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <Sparkles className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-ink">
              Real expert, real academy
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Sunita ma&apos;am 15+ saal se skin, hair aur makeup kar rahi hain. Bahadurgarh mein apni academy aur studio hai.
            </p>
          </Card>

          {/* Point 2 */}
          <Card variant="white" className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center">
              <BookOpen className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-ink">
              Simple Hindi mein
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Mushkil terms bhi aasaan bhasha mein. Har step dikhaya jaata hai, sirf bataya nahi.
            </p>
          </Card>

          {/* Point 3 */}
          <Card variant="white" className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <HelpCircle className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-ink">
              Live doubt sessions
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Recorded lessons ke saath live session mein apne sawaal seedha Sunita ma&apos;am se poochiye.
            </p>
          </Card>

          {/* Point 4 */}
          <Card variant="white" className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 text-gold flex items-center justify-center">
              <Award className="w-5 h-5 stroke-[1.75]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-ink">
              Certificate
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Course poora karne par Feminy Academy ka certificate.{" "}
              <PlaceholderNotice label="CONFIRM CERTIFICATE ISSUER" fallbackText="" />
            </p>
          </Card>
        </div>
      </Section>

      {/* 5.5 Founder story: 03 */}
      <Section
        number="03"
        title="Engineer se Cosmetologist tak."
        subtitle="Ek genuine teacher ki real journey."
      >
        <StoryScroll />
      </Section>

      {/* 5.6 Student work: 04 */}
      <Section
        number="04"
        title="Hamare students ka kaam."
        subtitle="Ye photos hamare students ki practice ki hain — koi filter, koi editing nahi."
        variant="surface-2"
      >
        <WorkGallery />
      </Section>

      {/* 5.7 Testimonials: 05 */}
      <Section
        number="05"
        title="Students kya kehti hain."
        subtitle="Real reviews aur feedback from our learners."
      >
        <Testimonials filterCategory="all" />
      </Section>

      {/* 5.8 Real academy: 06 */}
      <Section
        number="06"
        title="Online hai, par asli hai."
        subtitle="Hamari academy Bahadurgarh mein hai. Aap kabhi bhi aakar mil sakti hain."
        variant="surface-2"
      >
        <RealAcademy />
      </Section>

      {/* 5.9 FAQ: 07 */}
      <Section
        number="07"
        title="Aksar pooche jaane wale sawaal"
        subtitle="Aapke zaroori sawaalon ke aasaan jawab."
      >
        <FAQBlock faqs={homeFAQs} />
      </Section>

      {/* 5.10 Final CTA Band */}
      <FinalCTABand />
    </div>
  );
}
