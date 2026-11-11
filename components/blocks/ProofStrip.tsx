import React from "react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export const ProofStrip: React.FC = () => {
  // Only verified stats render; hide grid entirely if fewer than 2 are verified
  const stats = siteConfig.stats.filter((s) => s.verified);

  if (stats.length < 2) {
    return null;
  }

  const googleStat = stats.find(
    (s) => s.id === "rating" || s.value.includes("4.9") || s.label.toLowerCase().includes("google")
  );

  return (
    <aside
      aria-label="Verified academy statistics"
      className="w-full bg-paper py-8 sm:py-10 border-y border-line font-sans"
    >
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-line">
          {stats.map((stat, idx) => {
            const isGoogle =
              stat.id === "rating" ||
              stat.value.includes("4.9") ||
              stat.label.toLowerCase().includes("google");
            const displayLabel =
              isGoogle && stat.reviewCount
                ? `${stat.reviewCount} Google reviews (studio)`
                : stat.label;

            return (
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
                  {displayLabel}
                </div>
              </div>
            );
          })}
        </div>
        {googleStat && (
          <div className="mt-5 text-center text-[13px] text-ink-muted font-sans">
            {googleStat.note || "Bahadurgarh studio ki verified rating hai."}
          </div>
        )}
      </Container>
    </aside>
  );
};
