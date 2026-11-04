import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "white" | "surface-2" | "gold-border";
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "white",
  onClick,
}) => {
  const variantStyles = {
    white: "bg-surface border border-line",
    "surface-2": "bg-surface-2 border border-line",
    "gold-border": "bg-surface border-gold-hairline shadow-warm",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-card p-6 sm:p-8 transition-shadow duration-200 shadow-subtle ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
