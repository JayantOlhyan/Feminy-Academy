import React from "react";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Check, QrCode } from "lucide-react";
import { Logo, LogoMark } from "@/components/ui/Logo";

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
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-sans ${className}`}>
      {/* Sample Certificate Preview */}
      <div className="md:col-span-6">
        <div className="relative aspect-[1.414/1] rounded-card overflow-hidden bg-paper border border-line p-6 flex flex-col justify-between shadow-subtle">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <Logo variant="full" markClassName="w-6 h-6" className="scale-90 origin-left" />
            <span className="text-[11px] uppercase font-sans tracking-wider text-gold-text font-semibold">
              Certificate of Completion
            </span>
          </div>

          <div className="text-center py-4 space-y-2">
            <p className="text-xs text-ink-muted">This is proudly presented to</p>
            <div className="filter blur-[3px] select-none font-serif text-xl font-bold text-ink tracking-wide">
              Anjali Sharma
            </div>
            <p className="text-xs text-ink-muted">
              for successfully completing the professional masterclass in
            </p>
            <p className="font-serif text-sm font-semibold text-accent">
              {courseName}
            </p>
          </div>

          <div className="flex items-end justify-between border-t border-line pt-3">
            <div className="text-left">
              <span className="text-xs uppercase tracking-wider text-ink-muted block">
                Instructor
              </span>
              <span className="text-xs font-serif font-semibold text-ink">
                Sunita Rathee
              </span>
            </div>
            {/* Official Academy Certificate Seal */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-gold-line/60 p-0.5 flex items-center justify-center bg-paper-2/60">
                <LogoMark className="w-7 h-7" theme="gold" />
              </div>
              <span className="text-[9px] font-sans font-semibold tracking-wider text-gold-text uppercase mt-0.5">
                VERIFIED SEAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details List */}
      <div className="md:col-span-6 space-y-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent block mb-1">
            Certification & Validity
          </span>
          <h3 className="font-serif text-2xl font-semibold text-ink">
            Feminy Academy ka completion certificate
          </h3>
          <p className="text-sm text-ink-muted mt-2 leading-relaxed">
            Course poora karne par aapko soft copy turant milti hai. Is certificate ko aap apne salon ya studio mein display kar sakti hain.
          </p>
        </div>

        <div className="space-y-3 pt-2 text-sm text-ink">
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
            <span>Aapke poore naam ke saath officially verified certificate</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Check className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
            <span>Digital high-resolution printable PDF directly downloadable</span>
          </div>
          {qrVerification ? (
            <div className="flex items-start gap-2.5">
              <QrCode className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Unique QR code verification — authenticity check ke liye</span>
            </div>
          ) : (
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
              <span>
                <PlaceholderNotice
                  label="CONFIRM CERTIFICATE ISSUER"
                  fallbackText="Course complete hone par directly issued by Feminy Academy"
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
