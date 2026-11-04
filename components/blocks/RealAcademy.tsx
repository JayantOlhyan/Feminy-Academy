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
          <div className="rounded-card overflow-hidden bg-surface-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Entrance & Signage</span>
            <span className="text-[10px] text-muted font-mono mt-1">PHOTO: Bahadurgarh Studio</span>
          </div>
          <div className="rounded-card overflow-hidden bg-surface-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Workstations</span>
            <span className="text-[10px] text-muted font-mono mt-1">PHOTO: Professional Setup</span>
          </div>
          <div className="rounded-card overflow-hidden bg-surface-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Class in Progress</span>
            <span className="text-[10px] text-muted font-mono mt-1">PHOTO: Students Practice</span>
          </div>
          <div className="rounded-card overflow-hidden bg-surface-2 border border-line aspect-[4/3] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-xs font-serif font-semibold text-ink">Sunita Teaching</span>
            <span className="text-[10px] text-muted font-mono mt-1">PHOTO: 1-on-1 Guidance</span>
          </div>
        </div>

        {/* Address Card */}
        <div className={`${compact ? "" : "lg:col-span-5"} rounded-card bg-surface border-gold-hairline p-6 sm:p-8 shadow-warm space-y-6`}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              Visit our academy
            </span>
            <h3 className="font-serif text-2xl font-semibold text-ink mt-1">
              Bahadurgarh Academy
            </h3>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Kewal video course nahi, balki ek real physical centre jahan roz real clients ka treatment aur student training hoti hai.
            </p>
          </div>

          <div className="space-y-4 text-sm text-ink border-y border-line py-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-gold mt-0.5" />
              <div>
                <p className="font-medium text-ink">{siteConfig.address}</p>
                <p className="text-xs text-muted mt-0.5">Near Delhi-Haryana Border, Metro connectivity</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 shrink-0 text-gold" />
              <div>
                <PlaceholderNotice
                  label="ACADEMY HOURS"
                  fallbackText="Mon – Sat: 10:00 AM – 6:00 PM"
                  className="font-medium text-ink"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="secondary"
              href={siteConfig.mapsUrl}
              isExternal
              className="flex-1 text-sm py-3"
            >
              <Navigation className="w-4 h-4 text-gold" />
              <span>Directions →</span>
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappOffline}
              isExternal
              withWhatsAppIcon
              className="flex-1 text-sm py-3"
            >
              <span>Visit book karein</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
