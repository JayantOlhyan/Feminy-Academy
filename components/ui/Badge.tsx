import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "gold" | "surface" | "whatsapp" | "neutral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "brand",
  className = "",
}) => {
  const variantStyles = {
    brand: "bg-accent/10 text-accent border border-accent/20",
    gold: "bg-paper-2 text-gold-text border border-gold-line/40",
    surface: "bg-paper-2 text-ink-muted border border-line",
    whatsapp: "bg-whatsapp/10 text-whatsapp border border-whatsapp/25",
    neutral: "bg-paper-2 text-ink-muted border border-line",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-card ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
