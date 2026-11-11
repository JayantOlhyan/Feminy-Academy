import React from "react";
import { Container } from "@/components/ui/Container";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { homeContent } from "@/content/home";

export const ProblemSection: React.FC = () => {
  const { problem } = homeContent;

  return (
    <section className="py-18 lg:py-28 bg-paper-2 border-b border-line">
      <Container size="default">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            {problem.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-2xl sm:text-4xl lg:text-[40px] font-semibold text-ink leading-[1.15]">
            {problem.heading}
          </h2>
          <div className="mt-4 w-12 h-px bg-gold-line" />

          {/* Numbered List with Hairline Dividers - NO icon cards */}
          <div className="mt-10 sm:mt-14 divide-y divide-line border-y border-line">
            {problem.pains.map((pain, idx) => (
              <div
                key={idx}
                className="py-6 sm:py-8 flex items-baseline gap-4 sm:gap-8"
              >
                <span className="font-serif text-2xl sm:text-3xl font-medium text-gold-line select-none shrink-0 w-8">
                  0{idx + 1}
                </span>
                <p className="text-lg sm:text-xl text-ink leading-relaxed font-sans">
                  <PlaceholderNotice
                    label="VALIDATE WITH SUNITA: real student pains"
                    fallbackText={pain}
                  />
                </p>
              </div>
            ))}
          </div>

          {/* Empathic Closing Line */}
          <div className="mt-8 sm:mt-10 pl-4 sm:pl-6 border-l-2 border-accent">
            <p className="text-lg sm:text-xl font-semibold text-ink font-sans">
              {problem.closing}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
