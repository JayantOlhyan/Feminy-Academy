"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/home";

export const PlanSection: React.FC = () => {
  const { plan } = homeContent;
  const sectionRef = useRef<HTMLElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plan"
      className="py-18 lg:py-28 bg-paper border-b border-line"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            {plan.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            {plan.heading}
          </h2>
          <div className="mt-4 w-12 h-px bg-gold-line" />
        </div>

        {/* 3 Steps connected by hairline */}
        <div className="relative">
          {/* Desktop Horizontal Hairline */}
          <div
            className={`hidden md:block absolute top-7 left-12 right-12 h-px bg-gold-line transition-all duration-1000 ease-out origin-left ${
              lineVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
            aria-hidden="true"
          />

          {/* Mobile Vertical Hairline */}
          <div
            className={`md:hidden absolute top-8 bottom-8 left-5 w-px bg-gold-line transition-all duration-1000 ease-out origin-top ${
              lineVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
            {plan.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex md:flex-col items-start gap-5 sm:gap-6 relative"
              >
                {/* Large Numeral in Bodoni Moda */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full bg-paper border-2 border-gold-line flex items-center justify-center text-ink z-10 shadow-sm">
                  <span className="font-serif text-lg sm:text-2xl font-semibold">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2 pt-1 md:pt-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="text-base text-ink-muted leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action under Plan */}
        <div className="mt-12 sm:mt-16 text-center sm:text-left">
          <Button
            variant="primary"
            href="#hero-lead-form"
            className="text-base py-3.5 px-8"
          >
            {plan.ctaLabel} →
          </Button>
        </div>
      </Container>
    </section>
  );
};
