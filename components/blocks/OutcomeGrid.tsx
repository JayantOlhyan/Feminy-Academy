import React from "react";
import { Card } from "@/components/ui/Card";

interface OutcomeGridProps {
  outcomes: { title: string; desc: string }[];
  className?: string;
}

export const OutcomeGrid: React.FC<OutcomeGridProps> = ({
  outcomes,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans ${className}`}>
      {outcomes.map((item, idx) => (
        <Card
          key={idx}
          variant="white"
          className="p-5 flex flex-col justify-start space-y-2 border border-line hover:border-ink transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl font-medium text-gold-line">0{idx + 1}</span>
          </div>
          <h3 className="font-serif text-base font-semibold text-ink pt-1">
            {item.title}
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed font-sans">{item.desc}</p>
        </Card>
      ))}
    </div>
  );
};
