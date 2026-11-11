"use client";

import React, { useState } from "react";
import { SyllabusModule } from "@/content/courses/hydra-facial";
import { ChevronDown, PlayCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface SyllabusAccordionProps {
  modules: SyllabusModule[];
  onPreviewClick?: (lessonTitle: string) => void;
  className?: string;
}

export const SyllabusAccordion: React.FC<SyllabusAccordionProps> = ({
  modules,
  onPreviewClick,
  className = "",
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First module open by default

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className={`space-y-4 max-w-3xl mx-auto font-sans ${className}`}>
      {modules.map((mod, mIdx) => {
        const isOpen = openIdx === mIdx;
        return (
          <div
            key={mIdx}
            className="rounded-card bg-paper border border-line overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(mIdx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between p-5 text-left font-serif text-lg font-semibold text-ink hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium text-gold-text bg-paper-2 px-2 py-0.5 rounded-card border border-line">
                  Module 0{mIdx + 1}
                </span>
                <span>{mod.title}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-gold-line transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-line bg-paper divide-y divide-line/60">
                {mod.lessons.map((lesson, lIdx) => (
                  <div
                    key={lIdx}
                    className="py-3 flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-medium text-ink">{lesson.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {lesson.preview && (
                        <button
                          type="button"
                          onClick={() => onPreviewClick?.(lesson.title)}
                          className="min-h-[44px] min-w-[44px] px-2 py-1 text-xs font-semibold text-accent hover:text-accent-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-card inline-flex items-center"
                        >
                          Preview
                        </button>
                      )}
                      <div className="flex items-center gap-1 text-xs text-ink-muted">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
