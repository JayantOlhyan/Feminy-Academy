import { CourseData } from "./hydra-facial";

export const oneDayCourse: CourseData = {
  id: "one-day",
  slug: "one-day",
  name: "[1-DAY COURSE NAME]",
  badge: "ONLINE",
  eyebrow: "ONLINE · 1 DIN KA COURSE",
  headline: "[1-DAY COURSE NAME] — sirf ek din mein [CORE OUTCOME].",
  subheadline:
    "Sunita ma'am ke saath ek din mein seekhiye [WHAT EXACTLY]. Recorded lessons + live doubt session + certificate.",
  price: 1000,
  priceDisplay: "₹1,000",
  gstNote: "[GST NOTE]",
  accessDuration: "[ACCESS DURATION]",
  checkoutUrl: "[CHECKOUT URL]",
  chips: [
    "1 din",
    "Recorded + live doubt session",
    "Certificate",
    "Hindi / Hinglish",
  ],
  trustLine: "150+ students ne Sunita ma'am se seekha hai",
  videoIntro: {
    title: "Course ke baare mein Sunita ma'am se janiye",
    caption: "1 minute — is 1-day course mein kya cover hoga.",
    videoUrl: "",
    posterUrl: "/images/sunita-one-day.jpg",
  },
  whoFor: {
    items: [
      {
        title: "[AUDIENCE 1: E.g. Working Artists]",
        desc: "[PENDING SUNITA: Jinko kam time mein specific practical skill seekhni hai]",
      },
      {
        title: "[AUDIENCE 2: E.g. Parlour Owners]",
        desc: "[PENDING SUNITA: Jo naya trending service add karna chahte hain]",
      },
      {
        title: "[AUDIENCE 3: E.g. Beginners]",
        desc: "[PENDING SUNITA: Jo beauty field mein pehla step lena chahte hain]",
      },
      {
        title: "[AUDIENCE 4: E.g. Students]",
        desc: "[PENDING SUNITA: Jo hands-on fast-track guidance chahte hain]",
      },
    ],
    notFor: [
      "Ye course aapke liye nahi hai agar aap poora multi-month makeup & skin course dhoondh rahe hain (uske liye offline academy dekhein).",
      "Bina practice ke sirf certificate ke liye ye course nahi hai.",
    ],
  },
  outcomes: [
    {
      title: "[OUTCOME 1]",
      desc: "[PENDING SUNITA: Key skill outcome achieved in 1 day]",
    },
    {
      title: "[OUTCOME 2]",
      desc: "[PENDING SUNITA: Step-by-step practical implementation]",
    },
    {
      title: "[OUTCOME 3]",
      desc: "[PENDING SUNITA: Products aur tools ki right selection]",
    },
    {
      title: "[OUTCOME 4]",
      desc: "[PENDING SUNITA: Client consultation aur pricing]",
    },
  ],
  syllabusMeta: {
    modulesCount: "[X]",
    lessonsCount: "[Y]",
    totalHours: "[Z]",
  },
  modules: [
    {
      title: "1. [MODULE 1: Basics & Preparation]",
      lessons: [
        { title: "Introduction & Setup", duration: "10:00", preview: true },
        { title: "Product Essentials & Tools", duration: "20:00" },
      ],
    },
    {
      title: "2. [MODULE 2: Core Technique & Live Demo]",
      lessons: [
        { title: "Step-by-Step Hands-on Technique", duration: "35:00" },
        { title: "Finishing & Common Mistakes to Avoid", duration: "15:00" },
      ],
    },
    {
      title: "3. [MODULE 3: Live Doubt Session & Certificate]",
      lessons: [
        { title: "Live Q&A Recording & Summary", duration: "30:00" },
        { title: "Certificate Download & Next Steps", duration: "05:00" },
      ],
    },
  ],
  included: {
    items: [
      "Full 1-day curriculum video lessons",
      "Live doubt session Sunita ma'am ke saath",
      "Downloadable notes & product reference guide [CONFIRM]",
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
      "Kaise milega: [COMPLETION RULE]",
    ],
    issuer: "[ISSUER]",
    completionRule: "[COMPLETION RULE]",
    qrVerification: false,
    sampleImage: "/images/certificate-sample.jpg",
  },
  refundOneLiner: "Refund policy: [REFUND ONE-LINER]",
  faqs: [
    {
      question: "Course kitni der ka hai?",
      answer: "Ye 1-day intensive course hai jisme recorded sessions aur live doubt class shamil hai.",
    },
    {
      question: "Course phone pe chalega?",
      answer: "Haan, phone aur laptop dono pe dekh sakti hain.",
    },
    {
      question: "Certificate kab milega?",
      answer: "Course complete karne aur verification ke baad certificate WhatsApp/email pe milega.",
    },
    {
      question: "Doubt session kab hoga?",
      answer: "[FREQUENCY AND TIMING].",
    },
  ],
};
