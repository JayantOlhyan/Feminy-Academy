import React from "react";

export interface LogoProps {
  variant?: "full" | "mark" | "wordmark";
  theme?: "light" | "dark" | "gold";
  className?: string;
  markClassName?: string;
}

/**
 * Razor-sharp brand mark emblem for Feminy Academy.
 * Features an editorial serif "F" with the signature antique gold Bindu dot.
 */
export const LogoMark: React.FC<{
  className?: string;
  theme?: "light" | "dark" | "gold";
}> = ({ className = "w-9 h-9", theme = "light" }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      role="img"
    >
      {/* Background container */}
      <rect
        width="48"
        height="48"
        rx="10"
        fill={theme === "gold" ? "#8A6A2F" : "#7A1F3D"}
      />
      {/* Inner hairline frame */}
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="8"
        stroke="#B8915A"
        strokeWidth="1"
        strokeOpacity={theme === "dark" ? "0.6" : "0.45"}
      />
      {/* Editorial serif F letterform */}
      <g fill={theme === "gold" ? "#F2EFEC" : "#FFFFFF"}>
        <path d="M 12 36 L 24 36 L 24 34.5 L 20 34.5 L 20 15 L 23 15 L 23 13.5 L 13 13.5 L 13 15 L 16 15 L 16 34.5 L 12 34.5 Z" />
        <path d="M 20 13.5 L 34.5 13.5 L 34.5 18 L 33 18 L 32.2 15.5 L 20 15.5 Z" />
        <path d="M 20 23 L 29.5 23 L 30 25.5 L 28.5 25.5 L 28 24.5 L 20 24.5 Z" />
      </g>
      {/* Signature antique gold Bindu */}
      <circle cx="34.5" cy="23.75" r="2.25" fill="#B8915A" />
    </svg>
  );
};

/**
 * Official Feminy Academy brand logo lockup.
 * Scales cleanly across headers, footers, certificates, and auth views.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  theme = "light",
  className = "",
  markClassName = "w-9 h-9 sm:w-10 sm:h-10",
}) => {
  if (variant === "mark") {
    return <LogoMark className={markClassName} theme={theme} />;
  }

  const textColor = theme === "dark" ? "text-on-ink" : "text-ink";
  const subColor = theme === "dark" ? "text-gold-line" : "text-gold-text";

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {variant !== "wordmark" && <LogoMark className={markClassName} theme={theme} />}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${textColor} transition-colors`}
        >
          Feminy
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] uppercase ${subColor} mt-0.5`}
        >
          ACADEMY
        </span>
      </div>
    </div>
  );
};
