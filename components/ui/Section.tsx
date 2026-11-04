import React from "react";
import { Container } from "./Container";

interface SectionProps {
  id?: string;
  number?: string; // e.g. "01", "02"
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "surface-2" | "white";
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
  const bgClasses = {
    default: "bg-bg",
    "surface-2": "surface-texture",
    white: "bg-surface",
  };

  return (
    <section id={id} className={`py-14 sm:py-20 ${bgClasses[variant]} ${className}`}>
      <Container size={containerSize}>
        {(title || number) && (
          <div className={`mb-10 sm:mb-14 ${headerCentered ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
            <div className={`flex items-baseline gap-3 ${headerCentered ? "justify-center" : ""}`}>
              {number && (
                <span className="font-serif text-gold text-xl sm:text-2xl font-semibold tracking-wide select-none">
                  {number}
                </span>
              )}
              {title && (
                <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-ink leading-tight">
                  {title}
                </h2>
              )}
            </div>
            {subtitle && (
              <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
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
