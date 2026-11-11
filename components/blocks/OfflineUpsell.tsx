import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface OfflineUpsellProps {
  className?: string;
}

export const OfflineUpsell: React.FC<OfflineUpsellProps> = ({ className = "" }) => {
  return (
    <div className={`rounded-card bg-paper border border-line p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans ${className}`}>
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Next Level Mastery
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink">
          Professional banna hai? 3-month offline course — Bahadurgarh academy mein real models pe practice.
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          Skin, makeup aur hair ki live hands-on training with Sunita Rathee.
        </p>
      </div>

      <div className="w-full md:w-auto shrink-0">
        <Button variant="primary" href="/offline-academy" className="w-full md:w-auto text-sm py-3 px-6">
          <span>Free demo class book karein →</span>
        </Button>
      </div>
    </div>
  );
};
