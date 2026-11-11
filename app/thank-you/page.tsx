"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { VideoFacade } from "@/components/blocks/VideoFacade";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "offline";
  const whatsappUrl = getWhatsAppUrl(
    "general",
    type === "offline"
      ? "Namaste Sunita ma'am, maine demo class ke liye request submit ki hai."
      : "Namaste ma'am, maine course enrol kiya hai aur login details chahiye."
  );

  useEffect(() => {
    if (type === "enrol") {
      // Future purchase tracking stub
      trackEvent("PageView", { type: "thank_you_enrol" });
    }
  }, [type]);

  if (type === "enrol") {
    return (
      <div className="py-16 sm:py-24 text-center">
        <Container size="narrow">
          <div className="w-16 h-16 rounded-full bg-whatsapp/15 text-whatsapp flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 stroke-[2]" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
            Welcome to Feminy Academy!
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed">
            Aapka enrolment ho gaya hai. Login details{" "}
            <PlaceholderNotice label="X MINUTE" fallbackText="kuch hi samay" />{" "}
            mein WhatsApp pe aa jaayengi.
          </p>

          <div className="mt-8">
            <Button
              variant="whatsapp"
              href={whatsappUrl}
              isExternal
              withWhatsAppIcon
              className="text-base"
            >
              WhatsApp support
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24 text-center">
      <Container size="narrow">
        <div className="w-16 h-16 rounded-full bg-whatsapp/15 text-whatsapp flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9 stroke-[2]" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-ink leading-tight">
          Shukriya! Aapki demo class request mil gayi hai.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed">
          Hamari team{" "}
          <PlaceholderNotice label="X GHANTE" fallbackText="24 ghante" /> ke andar
          aapko call ya WhatsApp karegi.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="whatsapp"
            href={whatsappUrl}
            isExternal
            withWhatsAppIcon
            className="w-full sm:w-auto text-base"
          >
            Abhi WhatsApp karein
          </Button>

          <Button
            variant="outline"
            href="/#courses"
            className="w-full sm:w-auto text-base"
          >
            <span>Online courses dekhein →</span>
          </Button>
        </div>

        {/* Video preview while waiting */}
        <div className="mt-14 pt-10 border-t border-line max-w-md mx-auto text-left">
          <h3 className="font-serif text-lg font-semibold text-ink text-center mb-4">
            Tab tak, Sunita ma&apos;am ka ye video dekhiye:
          </h3>
          <VideoFacade
            posterUrl="/images/sunita-welcome.jpg"
            aspectRatio="16/9"
            badgeText="▶ Welcome Message · 1 min"
            caption="Sunita Rathee introducing Feminy Academy"
            altText="VIDEO: Sunita welcome video for demo applicants"
          />
        </div>
      </Container>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-muted">
          Loading confirmation...
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
