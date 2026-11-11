"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  number?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "surface-2" | "white" | "dark";
  className?: string;
  containerSize?: "narrow" | "default" | "wide";
  headerCentered?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  number,
  title,
  subtitle,
  children,
  variant = "default",
  className = "",
  containerSize = "default",
  headerCentered = false,
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgClasses = {
    default: "bg-paper text-ink",
    "surface-2": "bg-paper-2 text-ink",
    white: "bg-paper text-ink",
    dark: "bg-ink text-on-ink",
  };

  const isDark = variant === "dark";

  return (
    <section id={id} className={`py-8 sm:py-12 lg:py-24 ${bgClasses[variant]} ${className}`}>
      <Container size={containerSize}>
        {(title || number) && (
          <div
            ref={headerRef}
            className={`mb-5 sm:mb-8 lg:mb-12 transition-all duration-500 ease-out ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            } ${headerCentered ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}
          >
            <div className={`flex items-baseline gap-3 ${headerCentered ? "justify-center" : ""}`}>
              {number && (
                <span className="font-serif text-gold-line text-xl sm:text-2xl font-semibold tracking-wide select-none">
                  {number}
                </span>
              )}
              {title && (
                <h2 className={`font-serif text-2xl sm:text-4xl font-semibold leading-tight ${isDark ? "text-on-ink" : "text-ink"}`}>
                  {title}
                </h2>
              )}
            </div>
            {subtitle && (
              <p className={`mt-3 text-base sm:text-lg leading-relaxed font-sans ${isDark ? "text-on-ink-muted" : "text-ink-muted"}`}>
                {subtitle}
              </p>
            )}
            <div className={`mt-4 divider-gold ${headerCentered ? "mx-auto w-24" : "w-16"}`} />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};
