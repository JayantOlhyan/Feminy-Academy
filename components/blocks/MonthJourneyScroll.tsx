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
    if (typeof window === "undefined" || window.innerWidth < 768) return;

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
            end: "+=1000",
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
    <div ref={containerRef} className="w-full">
      {/* Desktop Pinned Interactive Transition */}
      <div className="hidden md:grid md:grid-cols-12 gap-10 items-center py-8 min-h-[500px]">
        {/* Navigation Tabs */}
        <div className="md:col-span-5 space-y-4">
          {months.map((m, idx) => {
            const isActive = activeMonthIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveMonthIdx(idx)}
                className={`w-full text-left p-6 rounded-card border transition-all duration-300 ${
                  isActive
                    ? "bg-surface border-gold shadow-warm scale-[1.02]"
                    : "bg-surface-2 border-line hover:border-gold/50 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-gold text-sm font-semibold">
                    {m.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
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
        <div className="md:col-span-7">
          <div className="rounded-card bg-surface border border-line p-8 shadow-subtle space-y-6">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                  Curriculum Breakdown
                </span>
                <h3 className="font-serif text-2xl font-semibold text-ink mt-1">
                  {months[activeMonthIdx].month}: {months[activeMonthIdx].title}
                </h3>
              </div>
              <span className="font-serif text-3xl font-bold text-gold/30">
                {months[activeMonthIdx].number}
              </span>
            </div>

            <div className="space-y-3">
              {months[activeMonthIdx].topics.map((topic, tIdx) => (
                <div key={tIdx} className="flex items-start gap-3 text-sm text-ink">
                  <div className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* Mobile Stacked Layout (< 768px) */}
      <div className="md:hidden space-y-6 py-4">
        {months.map((m, idx) => (
          <div
            key={idx}
            className="p-6 rounded-card bg-surface border border-line space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                {m.month}
              </span>
              <span className="font-serif text-xl font-bold text-gold">
                {m.number}
              </span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">
              {m.title}
            </h3>
            <ul className="space-y-2 text-sm text-muted">
              {m.topics.map((topic, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            {m.placeholderConfirm && (
              <div className="pt-2">
                <PlaceholderNotice
                  label="CONFIRM MONTH SYLLABUS"
                  fallbackText=""
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
