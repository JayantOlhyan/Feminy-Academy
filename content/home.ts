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
    sub: "Sunita Rathee, 15+ saal ki experienced cosmetologist, aapko simple Hindi mein step-by-step sikhaati hain — live doubt sessions ke saath.",
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
    heading: "Main bhi ek din zero se shuru hui thi.",
    empathyFallback:
      "Software engineer se cosmetologist banne ka safar aasan nahi tha. Maine seekha ki sirf theory ya online videos se confidence nahi aata — asli hunar tab banta hai jab koi aapka haath pakadkar har step samjhaye aur har chhota-bada doubt bina jhijhak clear kare. Feminy Academy mein mera maksad yahi hai: aapko independent banana.",
    authority: [
      { value: "15+ saal", label: "Ka practical experience" },
      { value: "150+", label: "Students trained & guided" },
      { value: "Bahadurgarh", label: "Physical academy & studio" },
    ],
    storyBeats: [
      {
        step: "01",
        period: "Pehle",
        title: "Engineering se Shuruaat",
        text: "Tech desk chhod kar jab maine passion chuna, sabne sawaal uthaye.",
      },
      {
        step: "02",
        period: "Phir",
        title: "Kadi Mehnat & Clients",
        text: "Saalon ki real practice, clinical skin understanding aur bridal artistry.",
      },
      {
        step: "03",
        period: "15+ saal",
        title: "Apni Academy",
        text: "Bahadurgarh mein studio aur academy setup jahan har tool real hai.",
      },
      {
        step: "04",
        period: "Aaj",
        title: "150+ Self-Reliant Students",
        text: "Hazaaron doubts door karke students ko unke pairon par khada karna.",
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
    eyebrow: "STUDENTS KI PEHCHAAN",
    heading: "Inhone bhi yahin se shuru kiya tha.",
    subtitle: "Real practice aur live guidance se badla confidence.",
    studentStories: [
      {
        id: "story-1",
        name: "Pooja S.",
        city: "Rohtak",
        before: "Basic beauty work aata tha par skin machines se darr lagta tha",
        after: "HydraFacial aur treatments khud confidence se handle karti hain",
        course: "HydraFacial Course",
      },
      {
        id: "story-2",
        name: "Ritu V.",
        city: "Bahadurgarh",
        before: "Online videos se seekhne ki koshish ki, doubts clear nahi hote the",
        after: "Academy mein live models pe practical karke apna kaam shuru kiya",
        course: "3-Month Professional",
      },
      {
        id: "story-3",
        name: "Neha M.",
        city: "Delhi NCR",
        before: "Client ke saamne baat karne aur rate batane mein jhijhak thi",
        after: "Certified cosmetologist bankar freelance clients le rahi hain",
        course: "HydraFacial Course",
      },
    ],
  },
  finalCta: {
    heading: "Apne clients. Apni pehchaan. Shuruaat ek free demo class se.",
    subtitle: "Koi advance fees nahi. Pehle aakar dekhiye, seekhiye, phir faisla kijiye.",
    trustNote: "Zero commitment · Hindi / Hinglish · Live doubt support",
  },
};
