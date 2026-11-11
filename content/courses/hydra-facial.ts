export interface CourseLesson {
  title: string;
  duration: string;
  preview?: boolean;
}

export type Lesson = CourseLesson;

export interface CourseModule {
  title: string;
  lessons: CourseLesson[];
}

export type SyllabusModule = CourseModule;

export interface CourseData {
  id: string;
  slug: string;
  name: string;
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
    videoUrl: string;
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
  modules: CourseModule[];
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
  faqs: {
    question: string;
    answer: string;
    showOnlyWhenPaymentEnabled?: boolean;
  }[];
}

export const hydraFacialCourse: CourseData = {
  id: "hydra-facial",
  slug: "hydra-facial",
  name: "Hydra Facial Online Masterclass",
  badge: "ONLINE",
  eyebrow: "ONLINE COURSE · HINDI MEIN",
  headline: "Hydra Facial Course — machine setup se client ke glow tak.",
  subheadline:
    "Sunita ma'am se seekhiye poora process: skin samajhna, machine chalana, har step sahi karna aur common problems solve karna. Recorded lessons + live doubt sessions + certificate.",
  price: 3000,
  priceDisplay: "₹3,000",
  gstNote: "Sabhi taxes sammilit",
  accessDuration: "1 Saal",
  checkoutUrl: "",
  chips: [
    "Hindi / Hinglish",
    "Practical Video Lessons",
    "Live Doubt Sessions",
    "Feminy Certificate",
  ],
  trustLine: "150+ students ne Sunita ma'am se seekha hai",
  videoIntro: {
    title: "Course shuru karne se pehle, Sunita ma'am se miliye.",
    caption: "1 minute — is course mein kya milega aur kisko join karna chahiye.",
    videoUrl: "",
    posterUrl: "/images/sunita-hero.jpg",
  },
  whoFor: {
    items: [
      {
        title: "Aapka parlour hai",
        desc: "aur aap Hydra Facial service shuru karke apni earning badhana chahti hain.",
      },
      {
        title: "Aap salon mein kaam karti hain",
        desc: "aur apni skill aur client handling capacity upgrade karna chahti hain.",
      },
      {
        title: "Machine le li hai",
        desc: "par sahi settings, serums aur practical steps confidently nahi aate.",
      },
      {
        title: "Beginner hain",
        desc: "aur trending cosmetology service se beauty career shuru karna chahti hain.",
      },
    ],
    notFor: [
      "Ye course aapke liye nahi hai agar aap advanced clinical dermatology injections ya medical procedures seekhna chahte hain.",
      "Bina practice ke sirf certificate ikattha karne walo ke liye nahi hai.",
    ],
  },
  outcomes: [
    {
      title: "Machine confidently chalana",
      desc: "Vacuum suction se lekar probes aur serums ki sahi settings.",
    },
    {
      title: "Skin type ke hisaab se protocol",
      desc: "Oily, dry, sensitive aur acne-prone skin ke liye sahi step aur precautions.",
    },
    {
      title: "Client consultation & pricing",
      desc: "Client ko samjhana, treatment package banana aur sahi rate decide karna.",
    },
    {
      title: "Safety & Hygiene standards",
      desc: "Sterilization, contraindications aur treatment ke baad home care advice.",
    },
  ],
  syllabusMeta: {
    modulesCount: "5",
    lessonsCount: "12",
    totalHours: "6",
  },
  modules: [
    {
      title: "1. Machine Setup & Tool Understanding",
      lessons: [
        { title: "Hydra Facial machine ke parts aur attachments", duration: "18:00", preview: true },
        { title: "Suction power, tips aur maintenance", duration: "22:00" },
        { title: "Serums: Salicylic, Glycolic aur Hyaluronic acid kab use karein", duration: "25:00" },
      ],
    },
    {
      title: "2. Skin Consultation & Prep",
      lessons: [
        { title: "Client skin assessment aur contraindications", duration: "20:00" },
        { title: "Cleansing aur double-cleansing protocol", duration: "15:00" },
      ],
    },
    {
      title: "3. Step-by-Step Practical Treatment",
      lessons: [
        { title: "Step 1: Exfoliation aur Dead Skin Removal", duration: "28:00" },
        { title: "Step 2: Deep Pore Cleansing aur Extraction", duration: "30:00" },
        { title: "Step 3: Hydration aur Serum Infusion", duration: "25:00" },
      ],
    },
    {
      title: "4. Add-on Procedures & Glow Boosters",
      lessons: [
        { title: "High-frequency wand aur cooling probe usage", duration: "20:00" },
        { title: "Sheet masks aur post-care treatment", duration: "18:00" },
      ],
    },
    {
      title: "5. Pricing, Packages & Salon Growth",
      lessons: [
        { title: "Client pricing: ₹1,500 se ₹4,000 tak package banana", duration: "24:00" },
        { title: "Aftercare guidance aur client retention secrets", duration: "16:00" },
      ],
    },
  ],
  included: {
    items: [
      "Step-by-step practical video lessons — kabhi bhi, kahin bhi dekhiye",
      "Live doubt sessions Sunita ma'am ke saath",
      "Practical technique aur common mistakes guidance",
      "Direct WhatsApp support doubt clearing ke liye",
      "Feminy Academy completion certificate",
      "1 Saal ka full access",
    ],
    highlightNote:
      "Doosre online courses sirf videos dete hain. Yahan aapke sawaalon ka jawab khud Sunita ma'am deti hain.",
  },
  certificate: {
    title: "Course poora kijiye, certificate paaiye.",
    details: [
      "Certificate pe aapka poora naam, course ka naam aur completion date hogi.",
      "Course complete karne par digital printable certificate turant issue hota hai.",
    ],
    issuer: "Feminy Academy by Sunita Rathee",
    completionRule: "Saare lessons complete karne par",
    qrVerification: false,
    sampleImage: "/images/certificate-sample.jpg",
  },
  refundOneLiner: "Transparent admission & refund policy",
  faqs: [
    {
      question: "Kya mujhe Hydra Facial machine chahiye?",
      answer:
        "Shuru mein seekhne ke liye machine zaroori nahi hai. Aap pehle poora process aur technique samajh sakti hain, phir sahi machine chunne ka faisla le sakti hain.",
    },
    {
      question: "Course phone pe chalega?",
      answer: "Haan, phone aur laptop dono pe dekh sakti hain.",
    },
    {
      question: "Kitne time tak access rahega?",
      answer: "Aapko 1 saal tak video lessons ka uninterrupted access milta hai.",
    },
    {
      question: "Live doubt sessions kab hote hain?",
      answer: "Har week schedule WhatsApp group mein share kiya jata hai jahan aap direct sawaal pooch sakti hain.",
    },
    {
      question: "Bilkul beginner hoon, samajh aayega?",
      answer: "Haan. Course simple Hindi mein, basics se shuru hota hai.",
    },
    {
      question: "Certificate valid hai?",
      answer:
        "Haan, course poora karne par Feminy Academy ka official verified certificate milta hai jise aap apne salon ya studio mein laga sakti hain.",
    },
    {
      question: "Refund milega?",
      answer: "Hamari transparent policy hai. Agar koi dikkat aati hai, aap hamari WhatsApp support team se baat kar sakti hain.",
    },
    {
      question: "Enrol karne ke baad kya hoga?",
      answer:
        "Aapko WhatsApp pe turant access details aur guidance message mil jaayega.",
    },
    {
      question: "Payment fail ho gaya / paise kat gaye?",
      answer:
        "Ghabraiye nahi, WhatsApp pe screenshot bhejiye, hamari team turant help karegi.",
      showOnlyWhenPaymentEnabled: true,
    },
    {
      question: "Course ke baad offline bhi kar sakti hoon?",
      answer: "Haan, aap offline academy aakar 3-month advanced professional diploma course mein upgrade kar sakti hain.",
    },
  ],
};
