import { siteConfig } from "./site";

const experienceStat = siteConfig.stats.find((s) => s.id === "experience");
const studentsStat = siteConfig.stats.find((s) => s.id === "students");

export interface HomeContent {
  hero: {
    eyebrow: string;
    // Option A (Active): "Beauty ka hunar seekhiye — aur apne naam se kaam shuru kijiye."
    // Option B (A/B Test Candidate): "Ghar se shuru kijiye. Certificate ke saath professional baniye."
    h1: string;
    h1VariantB?: string;
    sub: string;
    trustMicroline: string;
    formSubmitLabel: string;
    coursesLinkLabel: string;
  };
  problem: {
    eyebrow: string;
    heading: string;
    pains: string[];
    closing: string;
  };
  guide: {
    eyebrow: string;
    heading: string;
    empathyFallback: string;
    authority: Array<{ value: string; label: string }>;
    storyBeats: Array<{ step: string; period: string; title: string; text: string }>;
  };
  plan: {
    eyebrow: string;
    heading: string;
    steps: Array<{ number: string; title: string; description: string }>;
    ctaLabel: string;
  };
  transformation: {
    showStudentStories: boolean;
    eyebrow: string;
    heading: string;
    subtitle: string;
    studentStories: Array<{
      id: string;
      name: string;
      city: string;
      before: string;
      after: string;
      course: string;
    }>;
  };
  finalCta: {
    heading: string;
    subtitle: string;
    trustNote: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "FEMINY ACADEMY · BAHADURGARH",
    // Option A is selected as default; Option B preserved for CRO A/B testing
    h1: "Beauty ka hunar seekhiye — aur apne naam se kaam shuru kijiye.",
    h1VariantB: "Ghar se shuru kijiye. Certificate ke saath professional baniye.",
    sub: experienceStat?.verified
      ? `Sunita Rathee, ${experienceStat.value} saal ki experienced cosmetologist, aapko simple Hindi mein step-by-step sikhaati hain — live doubt sessions ke saath.`
      : "Sunita Rathee, experienced cosmetologist, aapko simple Hindi mein step-by-step sikhaati hain — live doubt sessions ke saath.",
    trustMicroline: "Koi payment nahi · Hindi / Hinglish · Live doubt sessions · Certificate",
    formSubmitLabel: "Free demo class book karein",
    coursesLinkLabel: "Courses dekhein ↓",
  },
  problem: {
    eyebrow: "ASLI RUKAWAT",
    heading: "Kya aapke saath bhi aisa hota hai?",
    pains: [
      "YouTube pe hazaar videos — par kaunsa tareeka sahi hai, pata hi nahi chalta.",
      "Practice karte waqt doubt aaye, toh poochein kisse?",
      "Certificate mil bhi jaaye, par client ke saamne confidence nahi aata.",
    ],
    closing: "Ye galti aapki nahi hai. Aapko bas sahi guide chahiye.",
  },
  guide: {
    eyebrow: "AAPKI GUIDE",
    heading: experienceStat?.verified
      ? `${experienceStat.value} saal ka practical tajurba aur verified guidance.`
      : "Practical tajurba aur verified guidance.",
    empathyFallback: [
      "Sunita Rathee",
      experienceStat?.verified ? `ne pichhle ${experienceStat.value} saalon mein` : "",
      studentsStat?.verified ? `${studentsStat.value} se zyada students ko` : "students ko",
      "cosmetology, skincare aur beauty treatments mein personally train kiya hai. Bahadurgarh mein apni functional academy aur studio ke zariye, unka focus hamesha real clinical practice, hygiene standards aur client confidence par rehta hai — bina kisi unnecessary theory ya shortcuts ke.",
    ]
      .filter(Boolean)
      .join(" "),
    authority: [
      ...(experienceStat?.verified
        ? [{ value: `${experienceStat.value} saal`, label: "Ka practical experience" }]
        : []),
      ...(studentsStat?.verified
        ? [{ value: studentsStat.value, label: "Students trained & guided" }]
        : []),
      { value: "Bahadurgarh", label: "Physical academy & studio" },
    ],
    storyBeats: [
      {
        step: "01",
        period: "Tajurba",
        title: experienceStat?.verified ? `${experienceStat.value} Saal ka Safar` : "Tajurba aur Safar",
        text: experienceStat?.verified
          ? `Practical cosmetology aur salon industry mein ${experienceStat.value} saal se zyada ka continuous anubhav.`
          : "Practical cosmetology aur salon industry mein continuous anubhav.",
      },
      {
        step: "02",
        period: "Technique",
        title: "Clinical & Practical Focus",
        text: "Skin anatomy, machine handling aur modern treatments ki deep practical understanding.",
      },
      {
        step: "03",
        period: "Centre",
        title: "Apni Functional Academy",
        text: "Bahadurgarh (Sector 9) mein physical studio setup jahan har tool aur machine real practice ke liye available hai.",
      },
      {
        step: "04",
        period: "Students",
        title: studentsStat?.verified ? `${studentsStat.value} Trained Students` : "Trained Students",
        text: "Students ko live models pe practical karwake self-reliant aur career-ready banana.",
      },
    ],
  },
  plan: {
    eyebrow: "AASAN RAASTA",
    heading: "3 aasaan steps",
    steps: [
      {
        number: "1",
        title: "Free demo class book kijiye",
        description: "2 minute ka form, koi payment nahi.",
      },
      {
        number: "2",
        title: "Apna course chuniye",
        description: "Online (ghar se) ya Bahadurgarh academy mein.",
      },
      {
        number: "3",
        title: "Seekhiye, practice kijiye, certificate lijiye",
        description: "Real models pe practice aur live doubt sessions.",
      },
    ],
    ctaLabel: "Step 1 abhi kijiye",
  },
  transformation: {
    showStudentStories: false,
    eyebrow: "STUDENTS KI PEHCHAAN",
    heading: "Inhone bhi yahin se shuru kiya tha.",
    subtitle: "Real practice aur live guidance se badla confidence.",
    studentStories: [],
  },
  finalCta: {
    heading: "Apne clients. Apni pehchaan. Shuruaat ek free demo class se.",
    subtitle: "Koi advance fees nahi. Pehle aakar dekhiye, seekhiye, phir faisla kijiye.",
    trustNote: "Zero commitment · Hindi / Hinglish · Live doubt support",
  },
};
