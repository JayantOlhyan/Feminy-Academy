import { CourseData } from "./hydra-facial";
import { siteConfig } from "@/content/site";

const studentsStat = siteConfig.stats.find((s) => s.id === "students");

export const oneDayCourse: CourseData = {
  id: "one-day",
  slug: "one-day",
  name: "1-Day Beauty Masterclass",
  badge: "ONLINE",
  eyebrow: "ONLINE · 1 DIN KA COURSE",
  headline: "1-Day Beauty Masterclass — ek din mein seekhiye salon-ready practical skill.",
  subheadline:
    "Sunita ma'am ke saath seekhiye step-by-step technique. Structured lessons + live doubt session + Feminy Academy certificate.",
  price: 1000,
  priceDisplay: "₹1,000",
  gstNote: "[GST NOTE]",
  accessDuration: "[ACCESS DURATION]",
  checkoutUrl: "https://wa.me/919955331142?text=Hello%20Sunita%20ma%27am%2C%20mujhe%201-Day%20Masterclass%20mein%20enrol%20karna%20hai",
  chips: [
    "1 din",
    "Structured + live doubt session",
    "Certificate",
    "Hindi / Hinglish",
  ],
  trustLine: studentsStat?.verified ? `${studentsStat.value} students ne Sunita ma'am se seekha hai` : "",
  videoIntro: {
    title: "Course ke baare mein Sunita ma'am se janiye",
    caption: "1 minute — is 1-day course mein kya cover hoga.",
    videoUrl: "",
    posterUrl: "/images/sunita-hero.jpg",
  },
  whoFor: {
    items: [
      {
        title: "Working Artists",
        desc: "Jinko kam samay mein specific practical skill upgrade karni hai.",
      },
      {
        title: "Parlour Owners",
        desc: "Jo naya trending service add karke salon ki income badhana chahte hain.",
      },
      {
        title: "Beginners",
        desc: "Jo beauty industry mein guided pehla kadam lena chahte hain.",
      },
      {
        title: "Aspiring Beauticians",
        desc: "Jo direct teacher supervision aur practical doubts clear karna chahte hain.",
      },
    ],
    notFor: [
      "Ye course aapke liye nahi hai agar aap poora multi-month makeup & skin course dhoondh rahe hain (uske liye offline academy dekhein).",
      "Bina practice ke sirf certificate ke liye ye course nahi hai.",
    ],
  },
  outcomes: [
    {
      title: "Practical Technique Foundation",
      desc: "Step-by-step sahi tareeqe se technique aur sequence seekhiye.",
    },
    {
      title: "Hands-on Implementation",
      desc: "Live model demonstration dekhkar step-by-step follow kijiye.",
    },
    {
      title: "Right Tools & Products",
      desc: "Kam budget mein sahi tools aur products choose karne ki knowledge.",
    },
    {
      title: "Client Handling & Pricing",
      desc: "Client consultation aur treatment ka sahi price fix karna seekhiye.",
    },
  ],
  syllabusMeta: {
    modulesCount: "3",
    lessonsCount: "6",
    totalHours: "2",
    confirmed: false,
  },
  modules: [
    {
      title: "1. Basics & Product Knowledge",
      lessons: [
        { title: "Introduction & Workstation Setup", preview: true },
        { title: "Product Essentials & Machine Setup" },
      ],
    },
    {
      title: "2. Hands-on Step-by-Step Technique",
      lessons: [
        { title: "Live Demonstration & Core Protocol" },
        { title: "Finishing, Aftercare & Common Mistakes" },
      ],
    },
    {
      title: "3. Live Doubt Session & Certification",
      lessons: [
        { title: "Live Doubt Clearing Session" },
        { title: "Certificate Download & Next Steps" },
      ],
    },
  ],
  included: {
    items: [
      "Complete curriculum video lessons",
      "Live doubt session Sunita ma'am ke saath",
      "Downloadable notes aur product guide",
      "Feminy Academy completion certificate",
      "[ACCESS DURATION]",
    ],
    highlightNote:
      "Doosre online courses sirf videos dete hain. Yahan aapke sawaalon ka jawab khud teacher deti hain.",
  },
  certificate: {
    title: "Course poora kijiye, certificate paaiye.",
    details: [
      "Certificate pe aapka naam, course ka naam aur date hogi.",
      "[SOFT COPY DELIVERY]",
    ],
    issuer: "[CERTIFICATE ISSUER]",
    completionRule: "[COMPLETION RULE]",
    qrVerification: false,
    sampleImage: "/images/certificate-sample.jpg",
  },
  refundOneLiner: "Refund policy: Kisi bhi issue ke liye support team WhatsApp par assist karti hai.",
  faqs: [
    {
      question: "Course kitni der ka hai?",
      answer: "Ye 1-day intensive course hai jisme structured sessions aur live doubt class shamil hai.",
    },
    {
      question: "Course phone pe chalega?",
      answer: "Haan, phone aur laptop dono pe dekh sakti hain.",
    },
    {
      question: "Certificate kab milega?",
      answer: "Course complete karne ke baad certificate WhatsApp aur email pe milega.",
    },
    {
      question: "Doubt session kab hoga?",
      answer: "Batch join karne par live session ka time WhatsApp group mein share kiya jaata hai.",
    },
  ],
};
