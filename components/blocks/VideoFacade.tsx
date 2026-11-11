"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

interface VideoFacadeProps {
  posterUrl: string;
  videoUrl?: string; // YouTube or Bunny stream embed URL
  badgeText?: string;
  caption?: string;
  aspectRatio?: "16/9" | "9/16" | "4/3";
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
  className?: string;
  altText?: string;
}

const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAD0lEQVR42mNgYGBgYGAEAACkAAH8oF0pAAAAAElFTkSuQmCC";

export const VideoFacade: React.FC<VideoFacadeProps> = ({
  posterUrl,
  videoUrl,
  badgeText = "▶ Sunita ma'am se milein · 1 min",
  caption,
  aspectRatio = "16/9",
  priority = false,
  sizes = "(max-width: 640px) 380px, 448px",
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  className = "",
  altText = "Video preview of Sunita Rathee",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent("video_play", { video: caption || badgeText });
  };

  const aspectClasses = {
    "16/9": "aspect-video",
    "9/16": "aspect-[9/16]",
    "4/3": "aspect-[4/3]",
  };

  // Never render the tiny 48x36 placeholder (`sunita-hero.png`) or placeholder paths as an upscaled blurry image.
  // Only render `next/image` when a real high-res photo is provided and loads cleanly; otherwise show the neutral placeholder treatment.
  const isPlaceholderAsset =
    !posterUrl ||
    posterUrl.includes("placeholder") ||
    posterUrl === "/images/sunita-hero.png";
  const showRealPoster = !isPlaceholderAsset && !imageError;

  return (
    <div className={`relative overflow-hidden rounded-card border border-line bg-paper-2 font-sans ${className}`}>
      {isPlaying && videoUrl ? (
        <iframe
          src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
          title={caption || "Video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={`w-full h-full ${aspectClasses[aspectRatio]} border-0`}
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={handlePlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePlay();
            }
          }}
          aria-label={`Play video: ${badgeText}`}
          className={`group relative flex items-center justify-center cursor-pointer w-full ${aspectClasses[aspectRatio]} bg-[#2A2326]`}
        >
          {showRealPoster ? (
            <Image
              src={posterUrl}
              alt={altText}
              fill
              priority={priority}
              fetchPriority={priority ? "high" : undefined}
              quality={65}
              sizes={sizes}
              onError={() => setImageError(true)}
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
          ) : (
            /* Neutral warm blush placeholder backdrop */
            <div className="absolute inset-0 bg-gradient-to-br from-[#45202D] via-[#2D1B22] to-[#1C1216] opacity-90 transition-opacity group-hover:opacity-100" />
          )}

          {/* Label indicator for dev / pending asset */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-xs font-medium tracking-wide uppercase px-2.5 py-1 rounded bg-black/40 text-white/90 backdrop-blur-sm border border-white/10">
              {altText}
            </span>
          </div>

          {/* Central Play Button */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/90 text-white flex items-center justify-center border border-gold-line group-hover:scale-105 group-hover:bg-accent transition-all duration-200">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5 text-white" />
            </div>
            {badgeText && (
              <span className="px-4 py-1.5 rounded-full bg-black/60 text-white text-xs sm:text-sm font-medium border border-white/15">
                {badgeText}
              </span>
            )}
          </div>
        </div>
      )}

      {caption && (
        <div className="p-3 bg-paper border-t border-line text-xs sm:text-sm text-ink-muted text-center font-medium">
          {caption}
        </div>
      )}
    </div>
  );
};
