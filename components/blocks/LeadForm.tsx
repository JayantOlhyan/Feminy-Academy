"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getStoredLid, getUtmParams } from "@/lib/lid";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";
import { MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  id?: string;
  className?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ id = "demo", className = "" }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    interest: "Sab kuch" as "Makeup" | "Hair" | "Skin" | "Sab kuch",
    preferredDate: "",
    website: "", // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const whatsappFallback = getWhatsAppUrl(
    "offline",
    "Mujhe demo class book karni hai par form mein dikkat aayi."
  );

  const validatePhone = (num: string) => {
    const cleaned = num.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setPhoneError("Kripya 10-digit ka valid Indian mobile number dalein (shuruat 6-9)");
      return false;
    }
    setPhoneError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validatePhone(formData.phone)) {
      return;
    }

    if (formData.name.trim().length < 2) {
      setErrorMsg("Kripya apna poora naam likhein");
      return;
    }

    if (formData.city.trim().length < 2) {
      setErrorMsg("Kripya apna shehar likhein");
      return;
    }

    setLoading(true);

    try {
      const lid = getStoredLid();
      const utms = getUtmParams();

      const payload = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ""),
        lid,
        ...utms,
        page: typeof window !== "undefined" ? window.location.pathname : "/offline-academy",
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      trackEvent("Lead", {
        type: "offline_demo",
        interest: formData.interest,
        city: formData.city,
      });

      router.push("/thank-you?type=offline");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Kuch gadbad ho gayi. Kripya WhatsApp pe message kijiye.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={id}
      className={`max-w-xl mx-auto rounded-card bg-surface border-2 border-gold/40 p-6 sm:p-10 shadow-warm ${className}`}
    >
      <div className="text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
          No Commitment · 100% Free
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-3">
          Free demo class book karein
        </h3>
        <p className="text-sm text-muted mt-2">
          Academy aakar Sunita ma&apos;am se miliye aur khud seekhne ka mahol dekhiye.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot field (hidden from human visitors) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        {/* Naam */}
        <div>
          <label htmlFor="lead-name" className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Aapka Naam <span className="text-brand">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            required
            placeholder="e.g. Priya Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink placeholder:text-muted/60 text-base focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Mobile Number (WhatsApp) <span className="text-brand">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-muted font-medium text-base">
              +91
            </span>
            <input
              id="lead-phone"
              type="tel"
              required
              maxLength={10}
              placeholder="98765 43210"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setFormData({ ...formData, phone: val });
                if (val.length === 10) validatePhone(val);
              }}
              onBlur={() => validatePhone(formData.phone)}
              className="w-full pl-14 pr-4 py-3 rounded-xl border border-line bg-surface text-ink placeholder:text-muted/60 text-base focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            />
          </div>
          {phoneError && (
            <p className="mt-1.5 text-xs text-brand font-medium">{phoneError}</p>
          )}
        </div>

        {/* Shehar */}
        <div>
          <label htmlFor="lead-city" className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Aapka Shehar <span className="text-brand">*</span>
          </label>
          <input
            id="lead-city"
            type="text"
            required
            placeholder="e.g. Bahadurgarh, Rohtak, Delhi..."
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink placeholder:text-muted/60 text-base focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Interest Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-2">
            Aap kya seekhna chahti hain?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["Sab kuch", "Makeup", "Hair", "Skin"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData({ ...formData, interest: opt })}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all ${
                  formData.interest === opt
                    ? "bg-brand text-white border-brand shadow-sm"
                    : "bg-surface-2 text-ink border-line hover:border-gold"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Date (Optional) */}
        <div>
          <label htmlFor="lead-date" className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Demo ke liye kaunsa din theek rahega? (Optional)
          </label>
          <input
            id="lead-date"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-line bg-surface text-ink text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-brand shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <p className="text-xs">
              Kripya WhatsApp pe message karke seedha connect karein:
            </p>
            <Button
              variant="whatsapp"
              href={whatsappFallback}
              isExternal
              withWhatsAppIcon
              className="w-full text-xs py-2 mt-1"
            >
              WhatsApp pe message bhejein
            </Button>
          </div>
        )}

        {/* Consent line */}
        <p className="text-xs text-muted leading-relaxed">
          Submit karke aap Feminy Academy ko call/WhatsApp karne ki permission deti hain. Details hamari{" "}
          <Link href="/privacy" className="text-brand underline hover:text-brand-dark">
            Privacy Policy
          </Link>{" "}
          ke hisaab se surakshit hain.
        </p>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full py-4 text-base font-semibold shadow-md"
        >
          {loading ? "Submit ho raha hai..." : "Demo class book karein"}
        </Button>
      </form>
    </div>
  );
};
