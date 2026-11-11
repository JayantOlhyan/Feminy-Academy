"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig, StatItem } from "@/content/site";
import { Container } from "@/components/ui/Container";

interface StatDisplayProps {
  stat: StatItem;
  inView: boolean;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ stat, inView }) => {
  const [displayValue, setDisplayValue] = useState(stat.value);

  useEffect(() => {
    if (!inView) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplayValue(stat.value);
      return;
    }

    // Match leading digits/decimal
    const match = stat.value.match(/^([\d.]+)(.*)$/);
    if (!match) return;

    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const isDecimal = match[1].includes(".");
    const duration = 800; // ms
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo / power2.out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * ease;

      const formatted = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
      setDisplayValue(`${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayValue(stat.value);
      }
    };

    const handle = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(handle);
  }, [inView, stat.value]);

  return (
    <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ink tracking-tight">
      {displayValue}
    </div>
  );
};

export const ProofStrip: React.FC = () => {
  const [inView, setInView] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Strict verification filter: Only verified stats render
  const stats = siteConfig.stats.filter((s) => s.verified);

  return (
    <aside
      ref={stripRef}
      aria-label="Verified academy statistics"
      className="w-full bg-paper py-8 sm:py-10 border-y border-line"
    >
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-line">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center text-center px-3 sm:px-4 ${
                idx > 1 ? "pt-4 md:pt-0" : ""
              }`}
            >
              <StatDisplay stat={stat} inView={inView} />
              <div className="mt-1.5 text-xs sm:text-sm font-sans text-ink-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center text-xs text-ink-muted font-sans">
          Google rating hamare Bahadurgarh studio ki verified rating hai.
        </div>
      </Container>
    </aside>
  );
};
