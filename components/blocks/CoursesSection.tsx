import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

export const CoursesSection: React.FC = () => {
  return (
    <section id="courses" className="py-18 lg:py-28 bg-paper border-b border-line">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            HAMARE COURSES
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            Aapke liye kaunsa course?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
            Shuruaat online se kijiye, ya seedha professional baniye.
          </p>
          <div className="mt-4 w-12 h-px bg-gold-line" />
        </div>

        {/* Mobile: Horizontal Snap Scroll with next card peeking | Desktop: 3-column grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 md:pb-0">
          {/* Card 1: HydraFacial */}
          <div className="min-w-[85%] sm:min-w-[340px] md:min-w-0 snap-center rounded-card bg-paper border border-gold-line/40 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="brand">ONLINE</Badge>
                <span className="font-serif text-2xl font-semibold text-accent">
                  ₹3,000
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                HydraFacial Course
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Machine setup se client ke glow tak — poora process, Hindi mein.
              </p>
              <div className="p-3 bg-paper-2 rounded-card text-[13px] text-ink-muted font-medium space-y-1 font-sans">
                <p>• Recorded + live doubt sessions</p>
                <p>• Certificate</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-line">
              <Button
                variant="primary"
                href="/courses/hydra-facial"
                className="w-full text-sm py-3"
              >
                <span>Course dekhein →</span>
              </Button>
            </div>
          </div>

          {/* Card 2: 1-Day Masterclass */}
          <div className="min-w-[85%] sm:min-w-[340px] md:min-w-0 snap-center rounded-card bg-paper border border-line p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="brand">ONLINE</Badge>
                <span className="font-serif text-2xl font-semibold text-ink">
                  ₹1,000
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                1-Day Masterclass
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Ek din mein specific practical technique seekhiye real model demo ke saath.
              </p>
              <div className="p-3 bg-paper-2 rounded-card text-[13px] text-ink-muted font-medium space-y-1 font-sans">
                <p>• 1 din · Recorded + live doubt session</p>
                <p>• Certificate</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-line">
              <Button
                variant="secondary"
                href="/courses/one-day"
                className="w-full text-sm py-3"
              >
                <span>Course dekhein →</span>
              </Button>
            </div>
          </div>

          {/* Card 3: 3-Month Professional Offline */}
          <div className="min-w-[85%] sm:min-w-[340px] md:min-w-0 snap-center rounded-card bg-paper border border-line p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="gold">OFFLINE · BAHADURGARH</Badge>
                <span className="text-[13px] font-semibold text-gold-text font-sans uppercase">
                  Career Ready
                </span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-ink">
                3-Month Professional Course
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed font-sans">
                Makeup, hair aur skin — real models pe practice karke professional baniye.
              </p>
              <div className="p-3 bg-paper-2 rounded-card text-[13px] text-ink-muted font-medium space-y-1 font-sans">
                <p>• 3 mahine · Academy mein</p>
                <p>• Certificate</p>
                <p className="font-semibold text-ink pt-1">
                  Fee counselling mein bataayi jaayegi
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-line">
              <Button
                variant="secondary"
                href="/offline-academy"
                className="w-full text-sm py-3"
              >
                <span>Free demo class book karein →</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
