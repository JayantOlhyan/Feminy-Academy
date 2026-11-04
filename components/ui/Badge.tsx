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
    brand: "bg-brand/10 text-brand border border-brand/20",
    gold: "bg-gold/15 text-[#8C6B37] border border-gold/30",
    surface: "bg-surface-2 text-muted border border-line",
    whatsapp: "bg-whatsapp/10 text-whatsapp border border-whatsapp/25",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
