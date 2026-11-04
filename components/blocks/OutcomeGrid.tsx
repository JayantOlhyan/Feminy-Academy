import React from "react";
import { Card } from "@/components/ui/Card";
import { Check } from "lucide-react";

interface OutcomeGridProps {
  outcomes: { title: string; desc: string }[];
  className?: string;
}

export const OutcomeGrid: React.FC<OutcomeGridProps> = ({
  outcomes,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}>
      {outcomes.map((item, idx) => (
        <Card
          key={idx}
          variant="white"
          className="p-5 flex flex-col justify-start space-y-2 border border-line hover:border-gold transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-mono font-medium text-gold">0{idx + 1}</span>
          </div>
          <h3 className="font-serif text-base font-semibold text-ink pt-1">
            {item.title}
          </h3>
          <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
        </Card>
      ))}
    </div>
  );
};
