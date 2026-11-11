import React from "react";

interface PlaceholderNoticeProps {
  label: string;
  fallbackText?: string;
  className?: string;
}

const PLACEHOLDER_REGEX = /\[[A-Z ]{3,}.*\]|PHOTO:|Pending\]|\[.*Pending.*\]/i;

export const PlaceholderNotice: React.FC<PlaceholderNoticeProps> = ({
  label,
  fallbackText,
  className = "",
}) => {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const hasPlaceholder = fallbackText && PLACEHOLDER_REGEX.test(fallbackText);
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
  if (PLACEHOLDER_REGEX.test(fallbackText) || fallbackText.trim().startsWith("[")) {
    return null;
  }

  return <span className={className}>{fallbackText}</span>;
};
