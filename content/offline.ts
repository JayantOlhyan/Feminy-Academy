export interface MonthPlan {
  number: string;
  month: string;
  title: string;
  topics: string[];
  placeholderConfirm?: boolean;
}

export type OfflineCurriculumMonth = MonthPlan;

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
  whoFor: Array<{
    title: string;
    desc: string;
  }>;
  months: MonthPlan[];
  howYouLearn: Array<{
    title: string;
    desc: string;
  }>;
  careerOutcomes: {
    items: string[];
    placementNote: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const offlineAcademyData: OfflinePageData = {
  eyebrow: "OFFLINE ACADEMY · BAHADURGARH",
  headline: "3 mahine mein professional beauty artist baniye.",
  subheadline:
    "Makeup, hair aur skin — Sunita ma'am ki academy mein, real models pe practice ke saath. Chhota batch, personal attention.",
  facts: {
    duration: "3 mahine",
    batchSize: "Chhote batches (limited seats)",
    timings: "Counselling mein bataayi jaayengi",
    nextBatch: "", // Real batch date confirmed hone par hi render hoga
    feeDisplay: "Counselling session mein poori jaankari",
    emiAvailable: true,
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
      placeholderConfirm: false,
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
      placeholderConfirm: false,
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
      placeholderConfirm: false,
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
      desc: "Industry-grade professional products practice ke dauran uplabdh karwaye jaate hain.",
    },
    {
      title: "Portfolio guidance",
      desc: "Course ke dauran live models par aapke kaam ke photos aapke portfolio ke liye.",
    },
  ],
  careerOutcomes: {
    items: [
      "Salon / parlour mein job",
      "Freelance party aur bridal makeup artist",
      "Apna salon ya home-based beauty studio",
      "Online clients ke liye specialized skincare & styling services",
    ],
    placementNote: "",
  },
  faqs: [
    {
      question: "Fees kitni hai?",
      answer:
        "Demo class aur counselling session mein poori fee structure aur instalment options share kiye jaate hain.",
    },
    {
      question: "Instalments mein de sakti hoon?",
      answer: "Haan, admission ke samay monthly instalment options ki suvidha uplabdh hai.",
    },
    {
      question: "Kit milti hai?",
      answer: "Training kit aur equipment details counselling session mein step-by-step batayi jaati hain.",
    },
    {
      question: "Bahar ke shehar se hoon, rehne ka intezaam?",
      answer:
        "Bahadurgarh mein verified safe PG aur accommodation ke contacts academy team share karti hai.",
    },
    {
      question: "Class timings kya hain? Hafte mein kitne din?",
      answer: "Batches ki timings aur schedule counselling session ke dauran fix kiye jaate hain.",
    },
    {
      question: "Certificate milega?",
      answer:
        "Haan, 3-month course safaltapoorvak poora karne par Feminy Academy ka professional diploma certificate milta hai.",
    },
    {
      question: "Pehle online course kiya hai, koi fayda?",
      answer: "Haan, hamare online students ko offline admission mein special guidance aur preference di jaati hai.",
    },
  ],
};
