import React from "react";
import { StatItem } from "@/content/site";

interface StatChipProps {
  stat: StatItem;
  className?: string;
}

export const StatChip: React.FC<StatChipProps> = ({ stat, className = "" }) => {
  // In production, unverified stats must not render
  if (process.env.NODE_ENV === "production" && !stat.verified) {
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-4 rounded-xl bg-surface/70 border border-line ${className}`}
    >
      <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand">
        {stat.value}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-muted font-medium">
        {stat.label}
      </div>
      {!stat.verified && process.env.NODE_ENV !== "production" && (
        <span className="mt-1 text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
          Unverified
        </span>
      )}
    </div>
  );
};
