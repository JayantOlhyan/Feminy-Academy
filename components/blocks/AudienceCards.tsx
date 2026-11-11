import React from "react";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface AudienceCardsProps {
  items: { title: string; desc: string }[];
  notFor: string[];
  className?: string;
}

export const AudienceCards: React.FC<AudienceCardsProps> = ({
  items,
  notFor,
  className = "",
}) => {
  return (
    <div className={`space-y-8 font-sans ${className}`}>
      {/* "For" Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => (
          <Card key={idx} variant="white" className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-whatsapp shrink-0" />
              <h3 className="font-serif text-lg font-semibold text-ink">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>

      {/* "Not For" Muted Box */}
      <div className="rounded-card bg-paper-2 border border-line p-6 sm:p-7">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-ink-muted shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Important: Ye course kiske liye NAHI hai
            </h4>
            <ul className="space-y-1.5 text-sm text-ink-muted leading-relaxed">
              {notFor.map((nf, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-ink-muted/60">•</span>
                  <span>{nf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
