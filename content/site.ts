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
  phone: "+91 99553 31142",
  whatsappNumber: "919955331142",
  email: "contact@feminyacademy.com",
  address: "Sector 9, Bahadurgarh, Haryana",
  hours: "10:00 AM - 6:00 PM",
  mapsUrl: "https://maps.google.com/?q=Sector+9+Bahadurgarh+Haryana+124507",
  legalBusinessName: "Feminy Academy by Sunita Rathee",
  socials: {
    instagram: "https://instagram.com/sunitaratheemakeovers",
    youtube: "https://youtube.com/@SRMvibe",
  },
  stats: [
    { value: "150+", label: "Students trained", verified: true },
    { value: "15+", label: "Saal ka experience", verified: true },
    { value: "17K", label: "Instagram family", verified: true },
    { value: "4.9★", label: "Google rating", verified: true, note: "Bahadurgarh studio rating" },
  ],
  flags: {
    PAYMENT_ENABLED: false,
  },
};
