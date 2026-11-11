"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

export type ButtonVariant = "primary" | "whatsapp" | "secondary" | "gold" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  isExternal?: boolean;
  withWhatsAppIcon?: boolean;
  trackSource?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  isExternal = false,
  withWhatsAppIcon = false,
  trackSource,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold min-h-[48px] min-w-[48px] transition-colors duration-150 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-accent text-white hover:bg-accent-strong focus-visible:ring-accent rounded-full",
    whatsapp:
      "bg-whatsapp text-white hover:bg-[#188346] focus-visible:ring-whatsapp rounded-full",
    secondary:
      "bg-paper text-ink border border-line hover:border-ink hover:text-ink focus-visible:ring-ink rounded-card",
    gold:
      "bg-gold-text text-white hover:bg-[#725725] focus-visible:ring-gold-text rounded-card",
    outline:
      "bg-transparent text-ink border border-line hover:border-ink focus-visible:ring-ink rounded-card",
  };

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {withWhatsAppIcon && (
        <MessageCircle className="w-5 h-5 shrink-0 stroke-[2]" aria-hidden="true" />
      )}
      <span>{children}</span>
    </>
  );

  const isWhatsAppLink =
    variant === "whatsapp" || Boolean(href && href.startsWith("https://wa.me"));

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isWhatsAppLink) {
      trackWhatsAppClick(trackSource || "whatsapp-button");
    }
    if (onClick) {
      (onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
    }
  };

  if (href) {
    if (isExternal || href.startsWith("http") || href.startsWith("https://wa.me")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          className={finalClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} onClick={handleLinkClick} className={finalClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={finalClasses}
      onClick={(e) => {
        if (isWhatsAppLink) {
          trackWhatsAppClick(trackSource || "whatsapp-button");
        }
        onClick?.(e);
      }}
      {...props}
    >
      {content}
    </button>
  );
};
