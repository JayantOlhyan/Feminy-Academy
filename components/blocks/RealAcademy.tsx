import React from "react";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { MapPin, Clock, Navigation } from "lucide-react";

interface RealAcademyProps {
  compact?: boolean;
  className?: string;
}

export const RealAcademy: React.FC<RealAcademyProps> = ({
  className = "",
}) => {
  const whatsappOffline = getWhatsAppUrl("offline");

  return (
    <div className={`w-full max-w-3xl mx-auto font-sans ${className}`}>
      {/* Authoritative Address & Location Card */}
      <div className="rounded-card bg-paper border border-line p-6 sm:p-10 space-y-6 shadow-sm">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            Visit our academy
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1.5">
            Bahadurgarh Academy & Studio
          </h3>
          <p className="text-sm sm:text-base text-ink-muted mt-2 leading-relaxed font-sans">
            Kewal video course nahi, balki ek real physical centre jahan roz real clients ka treatment aur student practical training hoti hai.
          </p>
        </div>

        <div className="space-y-4 text-sm text-ink border-y border-line py-5 font-sans">
          <div className="flex items-start gap-3.5">
            <MapPin className="w-5 h-5 shrink-0 text-gold-line mt-0.5" />
            <div>
              <p className="font-semibold text-ink text-base">{siteConfig.address}</p>
              <p className="text-[13px] text-ink-muted mt-0.5">Bahadurgarh, Haryana</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Clock className="w-5 h-5 shrink-0 text-gold-line mt-0.5" />
            <div>
              <p className="font-semibold text-ink text-base">Visiting Hours</p>
              <p className="text-[13px] text-ink-muted mt-0.5">
                Somvaar se Shanivaar: 10:00 AM - 6:00 PM (Prior appointment recommended)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-line hover:border-ink text-sm font-semibold text-ink min-h-[44px] transition-colors"
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
            className="text-sm py-3 px-5 min-h-[44px]"
          >
            Visit time book karein
          </Button>
        </div>
      </div>
    </div>
  );
};
