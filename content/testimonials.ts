export interface StudentWorkItem {
  id: string;
  studentName: string;
  city: string;
  course: string;
  beforeImage: string;
  afterImage: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  city: string;
  course: string;
  outcomeOneLiner: string;
  type: "video" | "whatsapp" | "quote";
  mediaUrl?: string;
  posterUrl?: string;
  courseCategory: "all" | "hydra-facial" | "one-day" | "offline";
  isPlaceholder: boolean;
}

export const studentWorkConfig = {
  unedited: true,
  subtitle:
    "Ye photos hamare students ki practice ki hain — koi filter, koi editing nahi.",
  items: [
    {
      id: "work-1",
      studentName: "[Student Name 1]",
      city: "Rohtak",
      course: "Hydra Facial Course",
      beforeImage: "/images/placeholders/student-work-1-before.jpg",
      afterImage: "/images/placeholders/student-work-1-after.jpg",
    },
    {
      id: "work-2",
      studentName: "[Student Name 2]",
      city: "Bahadurgarh",
      course: "3-Month Professional Course",
      beforeImage: "/images/placeholders/student-work-2-before.jpg",
      afterImage: "/images/placeholders/student-work-2-after.jpg",
    },
    {
      id: "work-3",
      studentName: "[Student Name 3]",
      city: "Delhi",
      course: "Hydra Facial Course",
      beforeImage: "/images/placeholders/student-work-3-before.jpg",
      afterImage: "/images/placeholders/student-work-3-after.jpg",
    },
    {
      id: "work-4",
      studentName: "[Student Name 4]",
      city: "Sonipat",
      course: "3-Month Professional Course",
      beforeImage: "/images/placeholders/student-work-4-before.jpg",
      afterImage: "/images/placeholders/student-work-4-after.jpg",
    },
  ] as StudentWorkItem[],
};

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "[Student Name]",
    city: "[City]",
    course: "Online Hydra Facial Course",
    outcomeOneLiner: "[PENDING REAL TESTIMONIAL: Outcome achieved after taking the course]",
    type: "video",
    posterUrl: "/images/placeholders/testimonial-1.jpg",
    courseCategory: "hydra-facial",
    isPlaceholder: true,
  },
  {
    id: "test-2",
    name: "[Student Name]",
    city: "[City]",
    course: "3-Month Professional Course",
    outcomeOneLiner: "[PENDING REAL TESTIMONIAL: Own salon opened in Bahadurgarh]",
    type: "whatsapp",
    posterUrl: "/images/placeholders/testimonial-2.jpg",
    courseCategory: "offline",
    isPlaceholder: true,
  },
  {
    id: "test-3",
    name: "[Student Name]",
    city: "[City]",
    course: "Online Hydra Facial Course",
    outcomeOneLiner: "[PENDING REAL TESTIMONIAL: First 10 clients booked successfully]",
    type: "quote",
    courseCategory: "hydra-facial",
    isPlaceholder: true,
  },
  {
    id: "test-4",
    name: "[Student Name]",
    city: "[City]",
    course: "3-Month Professional Course",
    outcomeOneLiner: "[PENDING REAL TESTIMONIAL: Personal hands-on guidance was amazing]",
    type: "video",
    posterUrl: "/images/placeholders/testimonial-4.jpg",
    courseCategory: "offline",
    isPlaceholder: true,
  },
];

export const hasRealStudentWork = studentWorkConfig.items.some(
  (item) => !item.studentName.startsWith("[") && !item.beforeImage.includes("placeholder")
);

export const hasRealTestimonials = (category?: string) =>
  testimonialsData.some(
    (item) =>
      !item.isPlaceholder &&
      !item.name.startsWith("[") &&
      !item.outcomeOneLiner.includes("PENDING") &&
      (!category || category === "all" || item.courseCategory === category || item.courseCategory === "all")
  );

export const googleReviewsLink = "[GOOGLE REVIEWS LINK]";
