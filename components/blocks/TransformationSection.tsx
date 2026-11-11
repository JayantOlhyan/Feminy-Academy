import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { WorkGallery } from "@/components/blocks/WorkGallery";
import { homeContent } from "@/content/home";

export const TransformationSection: React.FC = () => {
  const { transformation } = homeContent;

  return (
    <section id="students" className="py-18 lg:py-28 bg-paper-2 border-b border-line">
      <Container size="wide">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            {transformation.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            {transformation.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
            {transformation.subtitle}
          </p>
          <div className="mt-4 w-12 h-px bg-gold-line" />
        </div>

        {/* 3 Student Transformation Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {transformation.studentStories.map((story) => (
            <div
              key={story.id}
              className="rounded-card bg-paper border border-line p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Photo Slot */}
                <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-paper-2 border border-line flex items-center justify-center text-center p-3">
                  <PlaceholderNotice
                    label={`REAL PHOTO: ${story.name} work / studio`}
                    fallbackText="[Student Practice Photo Pending]"
                    className="text-xs text-ink-muted font-sans"
                  />
                </div>

                {/* Pehle / Ab Framing */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted block font-sans">
                      Pehle:
                    </span>
                    <p className="text-sm text-ink leading-relaxed font-sans">
                      <PlaceholderNotice
                        label={`STUDENT BEFORE STORY: ${story.name}`}
                        fallbackText={story.before}
                      />
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-line">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent block font-sans">
                      Ab:
                    </span>
                    <p className="text-sm font-medium text-ink leading-relaxed font-sans">
                      <PlaceholderNotice
                        label={`STUDENT AFTER STORY: ${story.name}`}
                        fallbackText={story.after}
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Metadata */}
              <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-ink-muted font-sans">
                <span className="font-semibold text-ink">
                  {story.name}, {story.city}
                </span>
                <span className="text-gold-text font-medium">
                  {story.course}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Real Student Work Gallery Below */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-6 sm:mb-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              Hamare students ki real practice photos
            </h3>
            <p className="mt-1 text-sm text-ink-muted font-sans">
              Ye photos hamare students ki practical training ki hain — koi stock photo nahi.
            </p>
          </div>
          <WorkGallery />
        </div>
      </Container>
    </section>
  );
};
