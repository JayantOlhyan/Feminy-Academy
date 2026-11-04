"use client";

import React, { useState } from "react";
import { studentWorkConfig, StudentWorkItem } from "@/content/testimonials";
import { X, ZoomIn } from "lucide-react";

interface WorkGalleryProps {
  filterCourse?: string; // Optional filter for course pages
  className?: string;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({
  filterCourse,
  className = "",
}) => {
  const [activeItem, setActiveItem] = useState<StudentWorkItem | null>(null);

  const items = filterCourse
    ? studentWorkConfig.items.filter((item) =>
        item.course.toLowerCase().includes(filterCourse.toLowerCase())
      )
    : studentWorkConfig.items;

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group cursor-pointer rounded-card overflow-hidden bg-surface border border-line shadow-subtle hover:shadow-warm transition-all duration-200"
          >
            {/* Before / After Container */}
            <div className="relative grid grid-cols-2 gap-1 p-2 bg-surface-2 aspect-[4/3]">
              <div className="relative rounded-lg overflow-hidden bg-[#2D2327] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-black/60 px-2 py-0.5 rounded-full mb-1">
                  Before
                </span>
                <span className="text-[10px] font-mono text-white/70">
                  {item.studentName} Practice
                </span>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-[#3F1A28] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-brand/80 px-2 py-0.5 rounded-full mb-1">
                  After
                </span>
                <span className="text-[10px] font-mono text-white/70">
                  Finished Glow
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-2 rounded-full bg-white/90 text-brand shadow-sm">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 border-t border-line">
              <p className="text-sm font-semibold text-ink">
                {item.studentName}, {item.city}
              </p>
              <p className="text-xs text-muted mt-0.5">{item.course}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Enlarged Dialog Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-surface rounded-card p-6 border border-line shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close image modal"
              className="absolute top-4 right-4 p-2 text-ink hover:text-brand bg-surface-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-semibold text-ink mb-1">
              {activeItem.studentName}, {activeItem.city}
            </h3>
            <p className="text-sm text-muted mb-4">{activeItem.course}</p>

            <div className="grid grid-cols-2 gap-4 aspect-[4/3] bg-surface-2 p-4 rounded-xl border border-line">
              <div className="rounded-lg bg-[#2D2327] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-semibold text-white bg-black/70 px-3 py-1 rounded-full mb-2">
                  BEFORE
                </span>
                <p className="text-xs text-white/75 font-mono">
                  Initial Skin / Makeup Condition
                </p>
              </div>
              <div className="rounded-lg bg-[#3F1A28] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-semibold text-white bg-brand px-3 py-1 rounded-full mb-2">
                  AFTER
                </span>
                <p className="text-xs text-white/75 font-mono">
                  Post-Treatment Student Result
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-center text-muted italic">
              {studentWorkConfig.subtitle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
