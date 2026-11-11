import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "white" | "surface-2" | "gold-border" | "ink";
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "white",
  onClick,
}) => {
  const variantStyles = {
    white: "bg-paper border border-line text-ink",
    "surface-2": "bg-paper-2 border border-line text-ink",
    "gold-border": "bg-paper border-gold-hairline text-ink",
    ink: "bg-ink border border-line/20 text-on-ink",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-card p-6 sm:p-8 transition-colors duration-150 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
};
