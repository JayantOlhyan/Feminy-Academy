export interface StatItem {
  id?: string;
  value: string;
  label: string;
  verified: boolean;
  reviewCount?: number;
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
  meetSunita: {
    careerSwitch: string;
    studentOutcome: string;
    clientsHandled: string;
    physicalStudio: string;
  };
  flags: {
    PAYMENT_ENABLED: boolean;
  };
}

export const siteConfig: SiteConfig = {
  brand: "Feminy Academy",
  byline: "by Sunita Rathee",
  phone: "+91 99553 31142",
  whatsappNumber: "919955331142",
  email: "[ACADEMY EMAIL]",
  address: "Sector 9, Bahadurgarh, Haryana",
  hours: "[ACADEMY HOURS]",
  mapsUrl: "https://maps.google.com/?q=Sector+9+Bahadurgarh+Haryana+124507",
  legalBusinessName: "Feminy Academy by Sunita Rathee",
  socials: {
    instagram: "https://instagram.com/sunitaratheemakeovers",
    youtube: "https://youtube.com/@SRMvibe",
  },
  stats: [
    { id: "students", value: "150+", label: "Students trained", verified: false },
    { id: "experience", value: "15+", label: "Saal ka experience", verified: false },
    { id: "instagram", value: "17K", label: "Instagram family", verified: false },
    {
      id: "rating",
      value: "4.9★",
      label: "Google rating",
      verified: false,
      reviewCount: 37,
      note: "Bahadurgarh studio ki verified rating hai.",
    },
  ],
  meetSunita: {
    careerSwitch: "[SUNITA'S WORDS: career switch]",
    studentOutcome: "[VERIFIED STUDENT OUTCOME]",
    clientsHandled: "[HAZAARON REAL CLIENTS]",
    physicalStudio: "[ZAMEEN PAR STUDIO]",
  },
  flags: {
    PAYMENT_ENABLED: false,
  },
};
