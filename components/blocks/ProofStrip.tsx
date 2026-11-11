import React from "react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export const ProofStrip: React.FC = () => {
  // Strict verification filter: Only verified stats render
  const stats = siteConfig.stats.filter((s) => s.verified);

  return (
    <aside
      aria-label="Verified academy statistics"
      className="w-full bg-paper py-8 sm:py-10 border-y border-line font-sans"
    >
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-line">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center text-center px-3 sm:px-4 ${
                idx > 1 ? "pt-4 md:pt-0" : ""
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-ink tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[13px] sm:text-sm font-sans text-ink-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center text-[13px] text-ink-muted font-sans">
          Google rating hamare Bahadurgarh studio ki verified rating hai.
        </div>
      </Container>
    </aside>
  );
};
