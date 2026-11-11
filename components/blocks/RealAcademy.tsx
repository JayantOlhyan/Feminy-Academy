import React from "react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, Navigation } from "lucide-react";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";

interface RealAcademyProps {
  compact?: boolean;
  className?: string;
}

export const RealAcademy: React.FC<RealAcademyProps> = ({
  compact = false,
  className = "",
}) => {
  const whatsappOffline = getWhatsAppUrl("offline");

  return (
    <div className={`w-full ${className}`}>
      <div className={`grid grid-cols-1 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-12"} gap-8 items-center`}>
        {/* Photo Mosaic */}
        <div className={`${compact ? "" : "lg:col-span-7"} grid grid-cols-2 gap-3 sm:gap-4`}>
          <div className="rounded-card overflow-hidden bg-paper-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Entrance & Signage</span>
            <span className="text-xs text-ink-muted font-sans mt-1">PHOTO: Bahadurgarh Studio</span>
          </div>
          <div className="rounded-card overflow-hidden bg-paper-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Workstations</span>
            <span className="text-xs text-ink-muted font-sans mt-1">PHOTO: Professional Setup</span>
          </div>
          <div className="rounded-card overflow-hidden bg-paper-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Class in Progress</span>
            <span className="text-xs text-ink-muted font-sans mt-1">PHOTO: Students Practice</span>
          </div>
          <div className="rounded-card overflow-hidden bg-paper-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Sunita Teaching</span>
            <span className="text-xs text-ink-muted font-sans mt-1">PHOTO: 1-on-1 Guidance</span>
          </div>
        </div>

        {/* Address Card */}
        <div className={`${compact ? "" : "lg:col-span-5"} rounded-card bg-paper border border-line p-6 sm:p-8 space-y-6`}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
              Visit our academy
            </span>
            <h3 className="font-serif text-2xl font-semibold text-ink mt-1">
              Bahadurgarh Academy
            </h3>
            <p className="text-sm text-ink-muted mt-2 leading-relaxed font-sans">
              Kewal video course nahi, balki ek real physical centre jahan roz real clients ka treatment aur student training hoti hai.
            </p>
          </div>

          <div className="space-y-4 text-sm text-ink border-y border-line py-4 font-sans">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-gold-line mt-0.5" />
              <div>
                <p className="font-medium text-ink">{siteConfig.address}</p>
                <p className="text-xs text-ink-muted">Main commercial market, easily reachable by metro & bus</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 shrink-0 text-gold-line mt-0.5" />
              <div>
                <PlaceholderNotice
                  label="ACADEMY VISITING HOURS"
                  fallbackText="Somvaar se Shanivaar: 10:00 AM - 6:00 PM (Prior appointment recommended)"
                  className="font-medium text-ink text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-line hover:border-ink text-xs font-semibold text-ink min-h-[44px] transition-colors"
            >
              <Navigation className="w-4 h-4 text-accent" />
              <span>Google Maps pe dekhein</span>
            </a>

            <Button
              variant="whatsapp"
              href={whatsappOffline}
              isExternal
              withWhatsAppIcon
              trackSource="real-academy"
              className="text-xs py-2.5 px-4"
            >
              Visit time book karein
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
