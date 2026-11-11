import React from "react";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { ExternalLink, Youtube, Instagram, CheckCircle2 } from "lucide-react";

interface MeetSunitaProps {
  className?: string;
}

export const MeetSunita: React.FC<MeetSunitaProps> = ({ className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-sans ${className}`}>
      {/* Portrait photo frame */}
      <div className="md:col-span-5">
        <div className="relative aspect-[4/5] rounded-card overflow-hidden bg-paper border border-line p-2 flex flex-col justify-between">
          <div className="relative w-full h-full rounded-card overflow-hidden bg-paper-2 flex flex-col items-center justify-center p-6 text-center">
            <Image
              src="/images/sunita-hero.jpg"
              alt="Sunita Rathee — Founder & Cosmetologist"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink via-ink/70 to-transparent text-white text-left">
              <span className="text-xs uppercase tracking-[0.12em] text-gold-line font-semibold block mb-0.5">
                Teacher & Mentor
              </span>
              <h3 className="font-serif text-xl font-semibold">
                Sunita Rathee
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bio points */}
      <div className="md:col-span-7 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans">
            Founder & Master Educator
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
            Sunita Rathee
          </h3>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-ink">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">Software Engineer se Cosmetologist</p>
              <p className="text-ink-muted text-sm mt-0.5">
                <PlaceholderNotice
                  label="YEARS IN ENGINEERING"
                  fallbackText="Multiple"
                />{" "}
                saal tech mein, phir beauty ko apna career banaya.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">15+ saal ka experience</p>
              <p className="text-ink-muted text-sm mt-0.5">
                Skin, hair aur makeup mein hazaaron real clients handle kiye hain.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">150+ students trained</p>
              <p className="text-ink-muted text-sm mt-0.5">
                Aise students jo aaj apna salon chala rahi hain ya freelance clients le rahi hain.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-ink">Bahadurgarh mein physical academy</p>
              <p className="text-ink-muted text-sm mt-0.5">
                Sirf internet pe nahi — zameen par apna studio aur academy hai.
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-line bg-paper text-ink hover:text-accent hover:border-accent text-xs font-semibold transition-colors"
          >
            <Instagram className="w-4 h-4 text-accent" />
            <span>17K+ Instagram Family</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full border border-line bg-paper text-ink hover:text-accent hover:border-accent text-xs font-semibold transition-colors"
          >
            <Youtube className="w-4 h-4 text-accent" />
            <span>@SRMvibe YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
};
