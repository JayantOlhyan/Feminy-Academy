import React from "react";
import { siteConfig } from "@/content/site";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ExternalLink, Youtube, Instagram, CheckCircle2 } from "lucide-react";

interface MeetSunitaProps {
  className?: string;
}

export const MeetSunita: React.FC<MeetSunitaProps> = ({ className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${className}`}>
      {/* Portrait photo frame */}
      <div className="md:col-span-5">
        <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-surface-2 border border-line p-2 shadow-subtle flex flex-col justify-between">
          <div className="w-full h-full rounded-[12px] bg-gradient-to-br from-[#381622] via-[#2A151D] to-[#180E12] flex flex-col items-center justify-center p-6 text-center text-white">
            <span className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">
              Teacher & Mentor
            </span>
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Sunita Rathee
            </h3>
            <span className="text-xs font-mono text-white/80 bg-black/40 px-3 py-1.5 rounded border border-white/10">
              PHOTO: Sunita warm portrait at academy
            </span>
          </div>
        </div>
      </div>

      {/* Bio points */}
      <div className="md:col-span-7 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            Founder & Master Educator
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
            Sunita Rathee
          </h3>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-ink">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">Software Engineer se Cosmetologist</p>
              <p className="text-muted text-sm mt-0.5">
                <PlaceholderNotice
                  label="YEARS IN ENGINEERING"
                  fallbackText="Multiple"
                />{" "}
                saal tech mein, phir beauty ko apna career banaya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">15+ saal ka experience</p>
              <p className="text-muted text-sm mt-0.5">
                Skin, hair aur makeup mein hazaaron real clients ke saath daily practical expertise.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">4+ saal se teaching</p>
              <p className="text-muted text-sm mt-0.5">
                Online aur offline, 150+ students ko successfully self-dependent banaya hai.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-2 text-ink border border-line">
            Certified Cosmetologist
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-surface-2 text-ink border border-line">
            Aesthetic Skin Practitioner
          </span>
          <PlaceholderNotice
            label="CERTIFICATIONS"
            fallbackText=""
            className="text-xs"
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-line">
          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            <Youtube className="w-4 h-4 text-red-600" />
            <span>YouTube pe free videos dekhein →</span>
          </a>
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Instagram →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
