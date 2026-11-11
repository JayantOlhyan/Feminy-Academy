"use client";

import React, { useState, useEffect, useRef } from "react";
import { offlineAcademyData, OfflineCurriculumMonth } from "@/content/offline";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Check } from "lucide-react";

export const MonthJourneyScroll: React.FC = () => {
  const [activeMonthIdx, setActiveMonthIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const months = offlineAcademyData.months;

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.innerWidth < 1024 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let ctx: { revert: () => void } | null = null;

    const initGsap = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top+=90",
            end: "+=800",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.min(
                Math.floor(progress * months.length),
                months.length - 1
              );
              setActiveMonthIdx(idx);
            },
          });
        }, containerRef);
      } catch (err) {
        console.warn("GSAP load failed or skipped:", err);
      }
    };

    initGsap();

    return () => {
      ctx?.revert();
    };
  }, [months.length]);

  return (
    <div ref={containerRef} className="w-full font-sans">
      {/* Desktop Pinned Interactive Transition */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-10 items-center py-8 min-h-[500px]">
        {/* Navigation Tabs */}
        <div className="lg:col-span-5 space-y-4">
          {months.map((m, idx) => {
            const isActive = activeMonthIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveMonthIdx(idx)}
                className={`w-full text-left p-6 rounded-card border transition-all duration-200 ${
                  isActive
                    ? "bg-paper border-accent shadow-sm"
                    : "bg-paper-2 border-line hover:border-ink opacity-70"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-gold-line text-sm font-semibold">
                    {m.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    {m.month}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {m.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detailed Curriculum Content for Active Month */}
        <div className="lg:col-span-7">
          <div className="rounded-card bg-paper border border-line p-8 space-y-6">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.12em] text-accent font-semibold">
                  Curriculum Breakdown
                </span>
                <h3 className="font-serif text-2xl font-semibold text-ink mt-1">
                  {months[activeMonthIdx].month}: {months[activeMonthIdx].title}
                </h3>
              </div>
              <span className="font-serif text-3xl font-bold text-gold-line/40">
                {months[activeMonthIdx].number}
              </span>
            </div>

            <div className="space-y-3">
              {months[activeMonthIdx].topics.map((topic, tIdx) => (
                <div key={tIdx} className="flex items-start gap-3 text-sm text-ink">
                  <div className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            {months[activeMonthIdx].placeholderConfirm && (
              <div className="pt-2">
                <PlaceholderNotice
                  label="CONFIRM MONTH DETAILS AGAINST SUNITA'S FINAL SYLLABUS"
                  fallbackText="Course syllabus covers hands-on model practice every week."
                  className="text-xs"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Stacked Layout (< 1024px) */}
      <div className="lg:hidden space-y-6 py-4">
        {months.map((m, idx) => (
          <div
            key={idx}
            className="p-6 rounded-card bg-paper border border-line space-y-4"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {m.month}
              </span>
              <span className="font-serif text-xl font-bold text-gold-line">
                {m.number}
              </span>
            </div>

            <h3 className="font-serif text-xl font-semibold text-ink">
              {m.title}
            </h3>

            <div className="space-y-2.5 pt-2">
              {m.topics.map((topic, tIdx) => (
                <div key={tIdx} className="flex items-start gap-2.5 text-sm text-ink">
                  <Check className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
