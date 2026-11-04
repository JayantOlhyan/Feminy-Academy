import React from "react";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Award, Check, QrCode } from "lucide-react";

interface CertificatePreviewProps {
  courseName?: string;
  qrVerification?: boolean;
  className?: string;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  courseName = "Hydra Facial Course",
  qrVerification = false,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${className}`}>
      {/* Blurred Sample Certificate Preview */}
      <div className="md:col-span-6">
        <div className="relative aspect-[1.414/1] rounded-card overflow-hidden bg-surface-2 border-2 border-gold/40 p-6 shadow-warm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gold/30 pb-3">
            <span className="font-serif text-sm font-semibold tracking-wide text-brand">
              FEMINY ACADEMY
            </span>
            <span className="text-[10px] uppercase font-sans tracking-widest text-gold">
              Certificate of Completion
            </span>
          </div>

          <div className="text-center py-4 space-y-2">
            <p className="text-xs text-muted">This is proudly presented to</p>
            <div className="filter blur-[3px] select-none font-serif text-xl font-bold text-ink tracking-wide">
              Anjali Sharma
            </div>
            <p className="text-xs text-muted">
              for successfully completing the professional masterclass in
            </p>
            <p className="font-serif text-sm font-semibold text-brand">
              {courseName}
            </p>
          </div>

          <div className="flex items-end justify-between border-t border-gold/30 pt-3">
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-muted block">
                Instructor
              </span>
              <span className="text-xs font-serif font-semibold text-ink">
                Sunita Rathee
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold">
              <Award className="w-5 h-5 stroke-[1.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Details List */}
      <div className="md:col-span-6 space-y-5">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <p className="text-sm sm:text-base text-ink">
              Certificate pe aapka naam, course ka naam aur date hogi.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <p className="text-sm sm:text-base text-ink">
              <strong>Kaise milega:</strong>{" "}
              <PlaceholderNotice
                label="COMPLETION RULE"
                fallbackText="Saare video lessons complete karne aur verification ke baad."
              />
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <p className="text-sm sm:text-base text-ink">
              <strong>Issued by:</strong>{" "}
              <PlaceholderNotice
                label="ISSUER"
                fallbackText="Feminy Academy by Sunita Rathee, Bahadurgarh"
              />
            </p>
          </div>
        </div>

        {qrVerification && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-2 text-xs text-muted border border-line">
            <QrCode className="w-4 h-4 text-gold shrink-0" />
            <span>Jald hi har certificate QR code se verify ho sakega.</span>
          </div>
        )}
      </div>
    </div>
  );
};
