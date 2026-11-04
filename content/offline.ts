export interface OfflineCurriculumMonth {
  number: string;
  month: string;
  title: string;
  topics: string[];
  placeholderConfirm?: boolean;
}

export interface OfflinePageData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  facts: {
    duration: string;
    batchSize: string;
    timings: string;
    nextBatch: string;
    feeDisplay: string;
    emiAvailable: boolean;
    seatsLeft?: number;
  };
  whoFor: { title: string; desc: string }[];
  months: OfflineCurriculumMonth[];
  howYouLearn: { title: string; desc: string }[];
  careerOutcomes: {
    items: string[];
    placementNote?: string;
  };
  faqs: { question: string; answer: string }[];
}

export const offlineAcademyData: OfflinePageData = {
  eyebrow: "OFFLINE ACADEMY · BAHADURGARH",
  headline: "3 mahine mein professional beauty artist baniye.",
  subheadline:
    "Makeup, hair aur skin — Sunita ma'am ki academy mein, real models pe practice ke saath. Chhota batch, personal attention.",
  facts: {
    duration: "3 mahine",
    batchSize: "[BATCH SIZE]",
    timings: "[TIMINGS]",
    nextBatch: "[DATE]",
    feeDisplay: "[OFFLINE FEE DISPLAY]", // e.g. "Fee counselling mein bataayi jaayegi"
    emiAvailable: true,
    // seatsLeft: undefined (Do not fake. Only render if strictly set.)
  },
  whoFor: [
    {
      title: "Beauty ko career banana chahti hain",
      desc: "salon job ya freelance artist",
    },
    {
      title: "Apna parlour kholna chahti hain",
      desc: "poori training ek jagah",
    },
    {
      title: "Parlour chalati hain",
      desc: "aur professional level pe upgrade karna chahti hain",
    },
    {
      title: "Hands-on seekhna chahti hain",
      desc: "sirf videos se nahi, real practice se",
    },
  ],
  months: [
    {
      number: "01",
      month: "Month 1",
      title: "Basics aur skin",
      topics: [
        "Skin types & thorough skin analysis",
        "Classic & advanced facials, clean-ups",
        "Hygienic waxing & precision threading",
        "Sanitisation, sterilisation & hygiene protocols",
      ],
      placeholderConfirm: true,
    },
    {
      number: "02",
      month: "Month 2",
      title: "Makeup",
      topics: [
        "Colour theory & flawless base matching",
        "Eye makeup: smokey, cut-crease, halo & soft glam",
        "Party makeup & day-to-night looks",
        "HD makeup technique & saree/dupatta draping",
      ],
      placeholderConfirm: true,
    },
    {
      number: "03",
      month: "Month 3",
      title: "Hair + bridal + business",
      topics: [
        "Hair cuts, styling, blow-dry & thermal iron work",
        "Hair spa, smoothening & keratin fundamentals",
        "Traditional & modern bridal transformations",
        "Client consultation, pricing strategy & portfolio shoots",
      ],
      placeholderConfirm: true,
    },
  ],
  howYouLearn: [
    {
      title: "Real models pe practice",
      desc: "Sirf dummy heads par nahi — real clients aur models par live hands-on practice.",
    },
    {
      title: "Chhota batch, personal attention",
      desc: "Limited seats taaki Sunita ma'am har student ki technique par personal dhyaan de sakein.",
    },
    {
      title: "Professional products aur kit",
      desc: "[CONFIRM KIT INCLUDED?: Industry-grade products practice ke dauran provide kiye jaate hain]",
    },
    {
      title: "Portfolio photos",
      desc: "[CONFIRM: Course ke end tak aapke dwara kiye gaye models ke professional photos]",
    },
  ],
  careerOutcomes: {
    items: [
      "Salon / parlour mein job",
      "Freelance party aur bridal makeup artist",
      "Apna salon ya home-based beauty studio",
      "Online clients ke liye specialized skincare & styling services",
    ],
    placementNote: "[PLACEMENT / INTERNSHIP HELP: only if offered]",
  },
  faqs: [
    {
      question: "Fees kitni hai?",
      answer:
        "[OFFLINE FEE OR 'Demo class / counselling mein poori fee aur instalment options bataaye jaate hain.']",
    },
    {
      question: "Instalments mein de sakti hoon?",
      answer: "[CONFIRM: EMI aur flexible monthly instalment facility uplabdh hai.]",
    },
    {
      question: "Kit milti hai?",
      answer: "[CONFIRM: Professional training kit details counselling session mein milengi.]",
    },
    {
      question: "Bahar ke shehar se hoon, rehne ka intezaam?",
      answer:
        "[CONFIRM: Bahadurgarh mein safe PG aur accommodation ke contacts hum share karte hain.]",
    },
    {
      question: "Class timings kya hain? Hafte mein kitne din?",
      answer: "[CONFIRM: Mon to Fri batches, timings counselling ke waqt batayi jaayengi.]",
    },
    {
      question: "Certificate milega?",
      answer:
        "Haan, 3-month course poora karne par Feminy Academy ka certified diploma certificate milta hai. [CONFIRM ISSUER]",
    },
    {
      question: "Pehle online course kiya hai, koi fayda?",
      answer: "Haan. [ANY FEE ADJUSTMENT, IF OFFERED]",
    },
  ],
};
