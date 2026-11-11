"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ArrowRight } from "lucide-react";

interface StoryBeat {
  tag: string;
  title: string;
  desc: React.ReactNode;
  photoLabel: string;
}

const beats: StoryBeat[] = [
  {
    tag: "PEHLE",
    title: "Software Engineer.",
    desc: (
      <span>
        <PlaceholderNotice
          label="SUNITA'S WORDS: 1–2 lines on engineering years"
          fallbackText="College ke baad IT aur software engineering mein kaam kiya, code aur systems seekhe — par hamesha dil creativity aur beauty transformations mein tha."
        />
      </span>
    ),
    photoLabel: "Sunita early engineering days",
  },
  {
    tag: "PHIR",
    title: "Ek faisla.",
    desc: (
      <span>
        <PlaceholderNotice
          label="SUNITA'S WORDS: why she switched to beauty"
          fallbackText="Ek courageous decision liya apna career switch karne ka. Cosmetology aur aesthetics ki proper professional training li, aur hands-on mastery shuru ki."
        />
      </span>
    ),
    photoLabel: "Sunita during cosmetology training",
  },
  {
    tag: "15+ SAAL",
    title: "Skin, hair, makeup — har din clients ke saath.",
    desc: "Hazaaron services, ek hi standard: hygiene aur perfection.",
    photoLabel: "Sunita doing client makeovers at studio",
  },
  {
    tag: "AAJ",
    title: "150+ students. Apni academy. Ab aapki baari.",
    desc: "Bahadurgarh mein apni full-fledged academy aur online courses. Jo humne 15 saal mein seekha, wahi simple Hindi mein aap tak pohchana.",
    photoLabel: "Sunita teaching batch at academy",
  },
];

export const StoryScroll: React.FC = () => {
  const [activeBeat, setActiveBeat] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize GSAP ScrollTrigger on client and desktop screens, respecting reduced motion
    if (
      typeof window === "undefined" ||
      window.innerWidth < 768 ||
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
            start: "top top+=80",
            end: "+=1200",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const beatIndex = Math.min(
                Math.floor(progress * beats.length),
                beats.length - 1
              );
              setActiveBeat(beatIndex);
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
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Desktop Pinned Layout (Hidden on Mobile) */}
      <div className="hidden md:grid md:grid-cols-12 gap-12 items-center py-10 min-h-[520px]">
        {/* Left Column: Story Beats */}
        <div className="md:col-span-7 space-y-6 relative pl-6 border-l-2 border-line">
          {/* Gold progress line overlay */}
          <div
            className="absolute left-[-2px] top-0 w-[2px] bg-gold transition-all duration-300"
            style={{
              height: `${((activeBeat + 1) / beats.length) * 100}%`,
            }}
          />

          {beats.map((beat, idx) => {
            const isActive = activeBeat === idx;
            return (
              <div
                key={idx}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "opacity-40 hover:opacity-70 [@media(hover:none)]:opacity-100 scale-98"
                }`}
                onClick={() => setActiveBeat(idx)}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold tracking-widest uppercase text-gold">
                    {beat.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-ink mb-2">
                  {beat.title}
                </h3>
                <div className="text-base text-muted leading-relaxed max-w-lg">
                  {beat.desc}
                </div>
              </div>
            );
          })}

          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 min-h-[44px] py-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              <span>Sunita ma&apos;am ke baare mein aur padhiye</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Frame */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] rounded-card overflow-hidden border border-line bg-surface-2 p-2 shadow-subtle flex flex-col justify-between">
            <div className="w-full h-full rounded-[12px] bg-gradient-to-br from-[#F6EEE8] to-[#E8DDD5] flex flex-col items-center justify-center p-6 text-center border border-line">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-3 px-3 py-1 rounded-full bg-white/60">
                {beats[activeBeat].tag}
              </span>
              <p className="font-serif text-lg font-semibold text-ink mb-4 max-w-xs">
                {beats[activeBeat].title}
              </p>
              <span className="text-xs text-muted font-mono bg-white/80 px-3 py-1.5 rounded border border-line">
                {beats[activeBeat].photoLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout (Clean vertical timeline without pinning) */}
      <div className="md:hidden space-y-6 py-4">
        {beats.map((beat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-card bg-surface border border-line space-y-3 opacity-100"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                {beat.tag}
              </span>
              <span className="text-xs text-muted font-serif">0{idx + 1}</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">
              {beat.title}
            </h3>
            <div className="text-sm text-muted leading-relaxed">
              {beat.desc}
            </div>
            <div className="pt-2 text-xs text-muted font-mono bg-surface-2 p-2 rounded border border-line text-center">
              {beat.photoLabel}
            </div>
          </div>
        ))}

        <div className="pt-2 text-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            <span>Sunita ma&apos;am ke baare mein aur padhiye</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
