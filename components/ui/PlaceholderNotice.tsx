import React from "react";

interface PlaceholderNoticeProps {
  label: string;
  fallbackText?: string;
  className?: string;
}

export const PLACEHOLDER_REGEX = /\[[A-Z0-9_:/, '’—\-]+\]|PHOTO:|Pending\]|\[.*Pending.*\]/i;

export function isPlaceholder(val?: string | null): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  return trimmed.startsWith("[") || PLACEHOLDER_REGEX.test(trimmed);
}

export const PlaceholderNotice: React.FC<PlaceholderNoticeProps> = ({
  label,
  fallbackText,
  className = "",
}) => {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const hasPlaceholder = fallbackText && isPlaceholder(fallbackText);
    return (
      <span
        title={`Pending confirmation: ${label}`}
        className={`inline items-baseline gap-1.5 ${className}`}
      >
        {fallbackText && !hasPlaceholder && <span>{fallbackText} </span>}
        <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-amber-100 text-amber-900 border border-amber-300 select-none align-middle">
          TODO: {label}
        </span>
      </span>
    );
  }

  // In production: NEVER render bracketed placeholder text or unverified notices
  if (!fallbackText) return null;
  if (isPlaceholder(fallbackText)) {
    return null;
  }

  return <span className={className}>{fallbackText}</span>;
};
