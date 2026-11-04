export interface LessonItem {
  title: string;
  duration: string;
  preview?: boolean;
}

export interface SyllabusModule {
  title: string;
  lessons: LessonItem[];
}

export interface CourseData {
  id: string;
  slug: string;
  name: string; // "Hydra Facial" (two words)
  badge: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  price: number;
  priceDisplay: string;
  gstNote: string;
  accessDuration: string;
  checkoutUrl: string;
  chips: string[];
  trustLine: string;
  videoIntro: {
    title: string;
    caption: string;
    videoUrl?: string;
    posterUrl: string;
  };
  whoFor: {
    items: { title: string; desc: string }[];
    notFor: string[];
  };
  outcomes: { title: string; desc: string }[];
  syllabusMeta: {
    modulesCount: string;
    lessonsCount: string;
    totalHours: string;
  };
  modules: SyllabusModule[];
  included: {
    items: string[];
    highlightNote: string;
  };
  certificate: {
    title: string;
    details: string[];
    issuer: string;
    completionRule: string;
    qrVerification: boolean;
    sampleImage: string;
  };
  refundOneLiner: string;
  faqs: { question: string; answer: string; showOnlyWhenPaymentEnabled?: boolean }[];
}

export const hydraFacialCourse: CourseData = {
  id: "hydra-facial",
  slug: "hydra-facial",
  name: "Hydra Facial",
  badge: "ONLINE",
  eyebrow: "ONLINE COURSE · HINDI MEIN",
  headline: "Hydra Facial Course — machine setup se client ke glow tak.",
  subheadline:
    "Sunita ma'am se seekhiye poora process: skin samajhna, machine chalana, har step sahi karna aur common problems solve karna. Recorded lessons + live doubt sessions + certificate.",
  price: 3000,
  priceDisplay: "₹3,000",
  gstNote: "[GST NOTE]",
  accessDuration: "[ACCESS DURATION]",
  checkoutUrl: "[CHECKOUT URL]",
  chips: [
    "Hindi / Hinglish",
    "[X] lessons",
    "[TOTAL HOURS] ghante",
    "Live doubt sessions",
    "Certificate",
  ],
  trustLine: "150+ students ne Sunita ma'am se seekha hai",
  videoIntro: {
    title: "Course shuru karne se pehle, Sunita ma'am se miliye.",
    caption: "1 minute — is course mein kya milega aur kisko join karna chahiye.",
    videoUrl: "",
    posterUrl: "/images/sunita-hydra-facial.jpg",
  },
  whoFor: {
    items: [
      {
        title: "Aapka parlour hai",
        desc: "aur aap Hydra Facial service shuru karna chahti hain.",
      },
      {
        title: "Aap salon mein kaam karti hain",
        desc: "aur apni skill aur salary badhana chahti hain.",
      },
      {
        title: "Machine le li hai",
        desc: "par sahi settings aur steps confidently nahi aate.",
      },
      {
        title: "Beauty career shuru kar rahi hain",
        desc: "aur ek demand wali service seekhna chahti hain.",
      },
    ],
    notFor: [
      "Ye course aapke liye nahi hai agar aap bina practice ke sirf certificate chahti hain.",
      "Ye ek beauty/skin-care course hai, medical ya dermatology treatment nahi.",
    ],
  },
  outcomes: [
    {
      title: "Skin type pehchaanna",
      desc: "client ki skin dekh ke sahi treatment chunna",
    },
    {
      title: "Machine setup",
      desc: "parts, probes, solutions aur settings samajhna",
    },
    {
      title: "Step-by-step protocol",
      desc: "cleansing se hydration tak poora sequence",
    },
    {
      title: "Probes ka sahi use",
      desc: "kaunsa tip kab aur kaise",
    },
    {
      title: "Hygiene aur sanitisation",
      desc: "client safety ke saath",
    },
    {
      title: "Common problems solve karna",
      desc: "suction, flow, probe issues ka troubleshooting",
    },
    {
      title: "Consultation aur aftercare",
      desc: "client ko kya batana hai, before aur after",
    },
    {
      title: "Service ko business banana",
      desc: "apni service ki pricing aur clients ko kaise samjhaayein",
    },
  ],
  syllabusMeta: {
    modulesCount: "[X]",
    lessonsCount: "[Y]",
    totalHours: "[Z]",
  },
  modules: [
    {
      title: "1. Skin basics aur consultation",
      lessons: [
        { title: "Course Introduction & Welcome", duration: "05:20", preview: true },
        { title: "Understanding Skin Types & Analysis", duration: "14:10" },
        { title: "Client Consultation & Consent Protocol", duration: "10:45" },
      ],
    },
    {
      title: "2. Machine aur products ka introduction",
      lessons: [
        { title: "Machine Anatomy, Probes & Tips Explained", duration: "18:30" },
        { title: "Serum Formulations & Solution Chambers", duration: "12:15" },
        { title: "Adjusting Vacuum Pressure & Flow Rates", duration: "15:00" },
      ],
    },
    {
      title: "3. Step-by-step Hydra Facial protocol",
      lessons: [
        { title: "Step 1: Deep Cleansing & Exfoliation", duration: "16:40" },
        { title: "Step 2: Gentle Acid Peel Application", duration: "11:20" },
        { title: "Step 3: Painless Vortex Extraction", duration: "17:50" },
        { title: "Step 4: Deep Hydration & Antioxidant Infusion", duration: "14:30" },
        { title: "Step 5: Finishing Steps & LED/Cold Therapy", duration: "12:00" },
      ],
    },
    {
      title: "4. Hygiene, safety aur aftercare",
      lessons: [
        { title: "Sterilisation & Tip Disinfection Rules", duration: "10:15" },
        { title: "Post-Treatment Client Aftercare Advice", duration: "08:40" },
        { title: "Do's and Don'ts for Sensitive Skin", duration: "09:30" },
      ],
    },
    {
      title: "5. Troubleshooting aur common mistakes",
      lessons: [
        { title: "Suction Drop & Leak Troubleshooting", duration: "13:20" },
        { title: "Avoiding Bruising & Erythema", duration: "11:05" },
      ],
    },
    {
      title: "6. Business: pricing aur client handling",
      lessons: [
        { title: "How to Price Your Hydra Facial Service", duration: "12:40" },
        { title: "Package Selling & Retaining Salon Clients", duration: "15:10" },
      ],
    },
  ],
  included: {
    items: [
      "[Y] recorded lessons — kabhi bhi, kahin bhi dekhiye",
      "Live doubt sessions Sunita ma'am ke saath — [FREQUENCY]",
      "Practice assignments aur unpe feedback [CONFIRM]",
      "Students ka WhatsApp group [CONFIRM]",
      "Feminy Academy certificate",
      "[ACCESS DURATION] access",
    ],
    highlightNote:
      "Doosre online courses sirf videos dete hain. Yahan aapke sawaalon ka jawab khud teacher deti hain.",
  },
  certificate: {
    title: "Course poora kijiye, certificate paaiye.",
    details: [
      "Certificate pe aapka naam, course ka naam aur date hogi.",
      "Kaise milega: [COMPLETION RULE, e.g. 'saare lessons + 1 practice assignment']",
    ],
    issuer: "[ISSUER]",
    completionRule: "[COMPLETION RULE]",
    qrVerification: false,
    sampleImage: "/images/certificate-sample.jpg",
  },
  refundOneLiner: "Refund policy: [REFUND ONE-LINER]",
  faqs: [
    {
      question: "Kya mujhe Hydra Facial machine chahiye?",
      answer:
        "[SUNITA TO CONFIRM: needed / recommended / not required to watch: Shuru mein seekhne ke liye machine zaroori nahi hai. Aap pehle poora process samajh sakti hain, phir machine khareedne ka sahi faisla le sakti hain.]",
    },
    {
      question: "Course phone pe chalega?",
      answer: "Haan, phone aur laptop dono pe dekh sakti hain.",
    },
    {
      question: "Kitne time tak access rahega?",
      answer: "[ACCESS DURATION].",
    },
    {
      question: "Live doubt sessions kab hote hain?",
      answer: "[FREQUENCY, DAY, TIME, PLATFORM].",
    },
    {
      question: "Bilkul beginner hoon, samajh aayega?",
      answer: "Haan. Course simple Hindi mein, basics se shuru hota hai.",
    },
    {
      question: "Certificate valid hai?",
      answer:
        "Course poora karne par Feminy Academy ka certificate milta hai. [ISSUER / ANY AFFILIATION, only if true]",
    },
    {
      question: "Refund milega?",
      answer: "[REFUND POLICY SUMMARY].",
    },
    {
      question: "Enrol karne ke baad kya hoga?",
      answer:
        "[X minute/ghante] mein aapko WhatsApp pe login details aur welcome message milega.",
    },
    {
      question: "Payment fail ho gaya / paise kat gaye?",
      answer:
        "Ghabraiye nahi, WhatsApp pe screenshot bhejiye, hamari team turant help karegi.",
      showOnlyWhenPaymentEnabled: true,
    },
    {
      question: "Course ke baad offline bhi kar sakti hoon?",
      answer: "Haan. [ANY FEE ADJUSTMENT, IF OFFERED]",
    },
  ],
};
