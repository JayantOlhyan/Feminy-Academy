import React from "react";
import { testimonialsData, googleReviewsLink } from "@/content/testimonials";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { VideoFacade } from "@/components/blocks/VideoFacade";
import { ExternalLink, MessageCircle, Quote } from "lucide-react";

interface TestimonialsProps {
  filterCategory?: "all" | "hydra-facial" | "one-day" | "offline";
  title?: string;
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  filterCategory = "all",
  className = "",
}) => {
  const items =
    filterCategory === "all"
      ? testimonialsData
      : testimonialsData.filter(
          (t) => t.courseCategory === filterCategory || t.courseCategory === "all"
        );

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-card bg-surface border border-line p-5 shadow-subtle"
          >
            {item.type === "video" ? (
              <div className="space-y-3">
                <VideoFacade
                  posterUrl={item.posterUrl || "/images/placeholder-video.jpg"}
                  aspectRatio="9/16"
                  badgeText="▶ Student Review"
                  altText="Real student video review"
                />
                <div className="pt-2">
                  <PlaceholderNotice
                    label="STUDENT TESTIMONIAL TEXT"
                    fallbackText={item.outcomeOneLiner}
                    className="text-xs text-muted font-medium"
                  />
                </div>
              </div>
            ) : item.type === "whatsapp" ? (
              <div className="space-y-3">
                <div className="aspect-[9/16] rounded-xl bg-surface-2 border border-line p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-whatsapp text-xs font-semibold">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Feedback</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm text-xs text-muted border border-line">
                    <PlaceholderNotice
                      label="WHATSAPP SCREENSHOT FEEDBACK"
                      fallbackText="Sunita ma'am, thank you so much! HydraFacial ke steps itne ache se samajh aaye ki aaj pehla client successfully attend kiya."
                    />
                  </div>
                  <span className="text-xs text-muted text-center font-mono">
                    PHOTO: WhatsApp Chat Screenshot
                  </span>
                </div>
                <div className="pt-2">
                  <PlaceholderNotice
                    label="STUDENT TESTIMONIAL OUTCOME"
                    fallbackText={item.outcomeOneLiner}
                    className="text-xs text-muted font-medium"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-gold/50" />
                  <p className="text-sm text-ink italic leading-relaxed">
                    <PlaceholderNotice
                      label="REAL STUDENT TESTIMONIAL QUOTE"
                      fallbackText="Maine bohot online courses dekhe the, par Sunita ma'am ne personally doubt solve kiye aur machine ki ek-ek setting live sikhayi. Truly practical!"
                    />
                  </p>
                </div>
                <div className="pt-3 border-t border-line">
                  <p className="text-xs font-semibold text-brand">
                    {item.outcomeOneLiner}
                  </p>
                </div>
              </div>
            )}

            {/* Author info */}
            <div className="pt-4 mt-3 border-t border-line">
              <p className="text-sm font-semibold text-ink">
                {item.name}, <span className="text-muted font-normal">{item.city}</span>
              </p>
              <p className="text-xs text-muted">{item.course}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={googleReviewsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
        >
          <span>Google pe saare reviews dekhein</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
