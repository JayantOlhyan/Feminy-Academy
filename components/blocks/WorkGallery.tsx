"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items = filterCourse
    ? studentWorkConfig.items.filter((item) =>
        item.course.toLowerCase().includes(filterCourse.toLowerCase())
      )
    : studentWorkConfig.items;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeItem) {
      if (!dialog.open) dialog.showModal();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const close = () => setActiveItem(null);
      window.addEventListener("popstate", close);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("popstate", close);
      };
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activeItem]);

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveItem(item)}
            aria-label={`View before and after work by ${item.studentName}, ${item.city}`}
            className="group w-full text-left cursor-pointer rounded-card overflow-hidden bg-surface border border-line shadow-subtle hover:shadow-warm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {/* Before / After Container */}
            <div className="relative grid grid-cols-2 gap-1 p-2 bg-surface-2 aspect-[4/3]">
              <div className="relative rounded-lg overflow-hidden bg-[#2D2327] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/90 bg-black/60 px-2 py-0.5 rounded-full mb-1">
                  Before
                </span>
                <span className="text-xs font-mono text-white/75">
                  {item.studentName} Practice
                </span>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-[#3F1A28] flex flex-col items-center justify-center p-2 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/90 bg-brand/80 px-2 py-0.5 rounded-full mb-1">
                  After
                </span>
                <span className="text-xs font-mono text-white/75">
                  Finished Glow
                </span>
              </div>

              {/* Touch-visible + Desktop Hover Zoom Affordance */}
              <div className="absolute bottom-3 right-3 md:inset-0 md:bg-brand/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="p-2 rounded-full bg-white/90 text-brand shadow-sm">
                  <ZoomIn className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
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
          </button>
        ))}
      </div>

      {/* Enlarged Dialog Modal */}
      <dialog
        ref={dialogRef}
        {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby="work-gallery-modal-title"
        onClose={() => setActiveItem(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            setActiveItem(null);
          }
        }}
        className="fixed inset-0 z-50 m-0 max-w-none max-h-none w-full h-full bg-black/80 backdrop-blur-sm p-4 open:flex items-center justify-center border-0"
      >
        {activeItem && (
          <div
            className="relative max-w-2xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto bg-surface rounded-card p-5 sm:p-6 border border-line shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close image modal"
              className="absolute top-3 right-3 inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 text-ink hover:text-brand bg-surface-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h3
              id="work-gallery-modal-title"
              className="font-serif text-xl font-semibold text-ink mb-1 pr-12"
            >
              {activeItem.studentName}, {activeItem.city}
            </h3>
            <p className="text-sm text-muted mb-4">{activeItem.course}</p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 aspect-[4/3] max-h-[55dvh] bg-surface-2 p-3 sm:p-4 rounded-xl border border-line">
              <div className="rounded-lg bg-[#2D2327] flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                <span className="text-xs font-semibold text-white bg-black/70 px-3 py-1 rounded-full mb-2">
                  BEFORE
                </span>
                <p className="text-xs text-white/80 font-mono">
                  Initial Skin / Makeup Condition
                </p>
              </div>
              <div className="rounded-lg bg-[#3F1A28] flex flex-col items-center justify-center p-3 sm:p-4 text-center">
                <span className="text-xs font-semibold text-white bg-brand px-3 py-1 rounded-full mb-2">
                  AFTER
                </span>
                <p className="text-xs text-white/80 font-mono">
                  Post-Treatment Student Result
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-center text-muted italic">
              {studentWorkConfig.subtitle}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
};
