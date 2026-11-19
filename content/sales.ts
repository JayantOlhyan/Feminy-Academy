import { hydraFacialCourse } from "./courses/hydra-facial";
import { oneDayCourse } from "./courses/one-day";

export type SalesCourse = {
  slug: string;
  name: string;
  format: string;
  price: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  interest: "Skin" | "Makeup" | "Sab kuch";
  audience: string[];
  outcomes: { title: string; description: string }[];
  modules: { title: string; topics: string[] }[];
};

export const salesCourses: SalesCourse[] = [
  {
    slug: "hydra-facial",
    name: "Hydra Facial Masterclass",
    format: "Online learning in Hindi / Hinglish",
    price: hydraFacialCourse.priceDisplay,
    heading: "Hydra Facial ko step by step samajhiye.",
    description: "Machine setup, skin consultation aur treatment sequence ko samajhne ke liye focused Hydra Facial training with Sunita Rathee.",
    image: "/academy/sunita.webp",
    imageAlt: "Sunita Rathee holding makeup brushes, the instructor for this course",
    imageCaption: "Your teacher, Sunita Rathee. Explore the learning plan and discuss your starting level before joining.",
    interest: "Skin",
    audience: ["Parlour owners exploring a skin service", "Salon professionals refreshing their technique", "Learners who want to understand their machine"],
    outcomes: [
      { title: "Understand the equipment", description: "Machine parts, attachments, maintenance aur setup ke basics." },
      { title: "Start with consultation", description: "Skin assessment, hygiene aur kab treatment avoid karna chahiye." },
      { title: "Follow a clear sequence", description: "Cleansing, exfoliation, hydration aur aftercare ka learning framework." },
      { title: "Ask better questions", description: "Products, practice requirements aur client care ke doubts discuss kijiye." },
    ],
    modules: hydraFacialCourse.modules.map(m => ({ title: m.title.replace(/^\d+\. /, ""), topics: m.lessons.map(l => l.title) })),
  },
  {
    slug: "one-day",
    name: oneDayCourse.name,
    format: "One-day class in Hindi / Hinglish",
    price: oneDayCourse.priceDisplay,
    heading: "Ek din. Apni skill par poora focus.",
    description: "Sunita Rathee ke saath focused beauty learning. Apne batch ka exact topic aur practical requirements pehle janiye, phir join kijiye.",
    image: "/academy/bridal.webp",
    imageAlt: "Detailed bridal makeup from Sunita Rathee’s professional portfolio",
    imageCaption: "From Sunita’s bridal portfolio. Class topics depend on the selected batch.",
    interest: "Makeup",
    audience: ["Artists looking for a focused skill session", "Beginners exploring beauty training", "Parlour owners with limited time to study"],
    outcomes: [
      { title: "Learn with a clear focus", description: "Ek chosen technique ko samajhne ke liye focused session." },
      { title: "Understand your tools", description: "Selected class ke liye tools aur product requirements janiye." },
      { title: "Observe the technique", description: "Step-by-step demonstration aur common mistakes par discussion." },
      { title: "Plan your practice", description: "Apne level ke hisaab se next learning step discuss kijiye." },
    ],
    modules: oneDayCourse.modules.map(m => ({ title: m.title.replace(/^\d+\. /, ""), topics: m.lessons.map(l => l.title) })),
  },
];

export const salesFAQs = [
  { question: "Main beginner hoon. Kahan se shuru karun?", answer: "Apna experience aur learning goal WhatsApp par share kijiye. Team se course ka level, prerequisites aur practice requirements samajhne ke baad choose kijiye." },
  { question: "Online course ya offline academy?", answer: "Focused topic ke liye online course explore kijiye. In-person learning ke liye Bahadurgarh academy ki counselling request kijiye. Timings, fees aur course duration team se confirm karein." },
  { question: "Payment se pehle kya confirm karna chahiye?", answer: "Exact syllabus, batch date, class format, recording access, total fee including applicable taxes, kit or machine costs, support, certificate requirements aur refund terms written mein lijiye." },
  { question: "Certificate aur recording access milega?", answer: "Selected batch ke certificate rules, issuer aur access period team se written mein confirm kijiye. In details ko payment karne se pehle samajhna zaroori hai." },
  { question: "Kya job ya income ki guarantee hai?", answer: "Nahi. Training se skills develop karne mein madad mil sakti hai. Aapke results practice, experience, local demand aur kai doosri cheezon par depend karte hain." },
];
