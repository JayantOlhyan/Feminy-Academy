"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = "",
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string, title: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter((item) => item !== id);
      }
      trackEvent("faq_open", { question: title });
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-2 sm:py-3">
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id, item.title)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                id={`accordion-btn-${item.id}`}
                className="flex w-full items-center justify-between text-left min-h-[48px] py-3 font-medium text-ink hover:text-brand transition-colors duration-150 text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-card"
              >
                <span className="pr-4">{item.title}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 stroke-[1.5] text-gold transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100 mt-2 mb-2" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="text-muted text-sm sm:text-base leading-relaxed pr-6">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
