import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

interface OfflineUpsellProps {
  className?: string;
}

export const OfflineUpsell: React.FC<OfflineUpsellProps> = ({ className = "" }) => {
  return (
    <div className={`rounded-card bg-surface border border-gold-hairline p-6 sm:p-8 shadow-warm flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 stroke-[1.75]" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            Next Level Mastery
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink mt-0.5">
            Professional banna hai? 3-month offline course — Bahadurgarh academy mein real models pe practice.
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Skin, makeup aur hair ki live hands-on training with Sunita Rathee.
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto shrink-0">
        <Button variant="gold" href="/offline-academy" className="w-full md:w-auto text-sm py-3">
          <span>Free demo class book karein →</span>
        </Button>
      </div>
    </div>
  );
};
