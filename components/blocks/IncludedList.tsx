import React from "react";
import { Check } from "lucide-react";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

interface IncludedListProps {
  items: string[];
  highlightNote: string;
  className?: string;
}

export const IncludedList: React.FC<IncludedListProps> = ({
  items,
  highlightNote,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${className}`}>
      {/* Left 6 items */}
      <div className="md:col-span-7 space-y-3.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-line"
          >
            <div className="w-5 h-5 rounded-full bg-whatsapp/15 text-whatsapp flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-sm sm:text-base font-medium text-ink">
              <PlaceholderNotice label={item} fallbackText={item} />
            </span>
          </div>
        ))}
      </div>

      {/* Right Gold Differentiator Box */}
      <div className="md:col-span-5">
        <div className="rounded-card bg-surface border-gold-hairline p-6 sm:p-8 shadow-warm relative">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
            The Feminy Difference
          </span>
          <p className="font-serif text-lg sm:text-xl font-semibold text-ink leading-snug">
            {highlightNote}
          </p>
          <div className="mt-4 pt-4 border-t border-line text-xs text-muted">
            Direct access to Sunita Rathee during scheduled live doubt batches.
          </div>
        </div>
      </div>
    </div>
  );
};
