export interface StatItem {
  value: string;
  label: string;
  verified: boolean;
  note?: string;
}

export interface SiteConfig {
  brand: string;
  byline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  hours: string;
  mapsUrl: string;
  legalBusinessName: string;
  socials: {
    instagram: string;
    youtube: string;
  };
  stats: StatItem[];
  flags: {
    PAYMENT_ENABLED: boolean;
  };
}

export const siteConfig: SiteConfig = {
  brand: "Feminy Academy",
  byline: "by Sunita Rathee",
  phone: "[ACADEMY PHONE]", // fallback: "+91 99553 31142"
  whatsappNumber: "919955331142", // [ACADEMY WHATSAPP NUMBER, digits only]
  email: "[ACADEMY EMAIL]",
  address: "135, Sector 9 Road, Sector 9, Bahadurgarh, Haryana 124507", // fallback confirm
  hours: "[ACADEMY HOURS]", // e.g. Mon - Sat: 10:00 AM - 6:00 PM
  mapsUrl: "https://maps.google.com/?q=Sector+9+Bahadurgarh+Haryana+124507", // [GOOGLE MAPS LINK]
  legalBusinessName: "[LEGAL BUSINESS NAME]",
  socials: {
    instagram: "https://instagram.com/sunitaratheemakeovers",
    youtube: "https://youtube.com/@SRMvibe",
  },
  stats: [
    { value: "150+", label: "Students trained", verified: true },
    { value: "15+", label: "Saal ka experience", verified: true },
    { value: "17K", label: "Instagram family", verified: true },
    { value: "4.9★", label: "Google rating", verified: true, note: "Bahadurgarh studio rating" },
    { value: "1", label: "Real academy, Bahadurgarh", verified: true },
  ],
  flags: {
    PAYMENT_ENABLED: false,
  },
};
