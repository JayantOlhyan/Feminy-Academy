"use client";

import React, { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

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

  const stats = siteConfig.stats.filter((s) => {
    if (process.env.NODE_ENV === "production") {
      return s.verified;
    }
    return true;
  });

  return (
    <div ref={stripRef} className="w-full bg-surface py-8 border-y border-line">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-line">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center text-center px-4 ${
                idx > 1 ? "pt-6 md:pt-0" : ""
              }`}
            >
              <div
                className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-ink">
                {stat.label}
              </div>
              {!stat.verified && process.env.NODE_ENV !== "production" && (
                <span className="mt-1 text-[10px] text-amber-700 bg-amber-100 px-1 rounded">
                  Unverified
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-xs text-muted">
          Google rating hamare Bahadurgarh studio ki hai.
        </div>
      </Container>
    </div>
  );
};
