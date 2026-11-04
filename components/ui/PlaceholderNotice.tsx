import React from "react";

interface PlaceholderNoticeProps {
  label: string;
  fallbackText?: string;
  className?: string;
}

export const PlaceholderNotice: React.FC<PlaceholderNoticeProps> = ({
  label,
  fallbackText,
  className = "",
}) => {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    return (
      <span
        title={`Pending confirmation: ${label}`}
        className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-medium rounded bg-amber-100 text-amber-900 border border-amber-300 ${className}`}
      >
        TODO: {label}
      </span>
    );
  }

  // In production, render the neutral fallback without breaking layout
  return fallbackText ? <span className={className}>{fallbackText}</span> : null;
};
