"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { homeContent } from "@/content/home";

export const GuideSection: React.FC = () => {
  const { guide } = homeContent;
  const [activeBeat, setActiveBeat] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm: any = null;

    const initGsap = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!pinContainerRef.current) return;

        mm = gsap.matchMedia();
        mm.add(
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            ScrollTrigger.create({
              trigger: pinContainerRef.current,
              start: "top top+=70",
              end: "+=900",
              pin: true,
              scrub: 0.5,
              onUpdate: (self) => {
                const progress = self.progress;
                const beatIndex = Math.min(
                  Math.floor(progress * guide.storyBeats.length),
                  guide.storyBeats.length - 1
                );
                setActiveBeat(beatIndex);
              },
            });
          }
        );
      } catch (err) {
        console.warn("GSAP load failed or skipped:", err);
      }
    };

    initGsap();

    return () => {
      mm?.revert();
    };
  }, [guide.storyBeats.length]);

  return (
    <section
      ref={sectionRef}
      id="guide"
      className="py-18 lg:py-28 bg-ink text-on-ink border-y border-line/20 relative"
    >
      <Container size="wide">
        {/* Top Header: Empathy & Authority */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-line font-sans">
            {guide.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-on-ink leading-[1.1]">
            {guide.heading}
          </h2>
          <div className="mt-4 w-12 h-px bg-gold-line" />

          {/* Empathy Text with Placeholder */}
          <div className="mt-6 text-base sm:text-lg text-on-ink-muted leading-relaxed font-sans">
            <PlaceholderNotice
              label="SUNITA'S WORDS: why she left engineering, first struggle"
              fallbackText={guide.empathyFallback}
            />
          </div>

          {/* Authority Row (Verified only) */}
          <div className="mt-8 pt-6 border-t border-line/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {guide.authority.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-gold-line">
                  {item.value}
                </span>
                <p className="text-xs sm:text-sm text-on-ink-muted font-sans">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Sequence & Portrait */}
        <div ref={pinContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Portrait Slot (Real photo, no AI person) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-card overflow-hidden border border-line/30 bg-ink">
              <Image
                src="/images/sunita-hero.jpg"
                alt="Sunita Rathee — Founder & Cosmetologist"
                fill
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink via-ink/80 to-transparent">
                <p className="text-sm font-medium text-on-ink">Sunita Rathee</p>
                <p className="text-xs text-on-ink-muted">Founder & Cosmetologist · Bahadurgarh</p>
              </div>
            </div>
          </div>

          {/* Right: Story Beats */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            {/* Desktop View: Pinned active beat indicator */}
            <div className="hidden lg:block space-y-4">
              <div className="flex items-center gap-3 mb-6">
                {guide.storyBeats.map((b, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveBeat(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeBeat === idx ? "w-10 bg-gold-line" : "w-3 bg-line/30"
                    }`}
                    aria-label={`Go to story beat ${idx + 1}`}
                  />
                ))}
              </div>

              {guide.storyBeats.map((beat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-card border transition-all duration-300 ${
                    activeBeat === idx
                      ? "bg-ink border-gold-line/40 text-on-ink shadow-sm"
                      : "bg-transparent border-transparent text-on-ink-muted opacity-40 hover:opacity-75"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-lg font-medium text-gold-line">
                      {beat.step} · {beat.period}
                    </span>
                    <h3 className="text-xl font-semibold text-on-ink">
                      {beat.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-base text-on-ink-muted leading-relaxed">
                    {beat.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile View (<1024px): Static stacked beats */}
            <div className="block lg:hidden space-y-4">
              {guide.storyBeats.map((beat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-card border border-line/20 bg-ink"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-base font-medium text-gold-line">
                      {beat.step} · {beat.period}
                    </span>
                    <h3 className="text-lg font-semibold text-on-ink">
                      {beat.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-on-ink-muted leading-relaxed">
                    {beat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
