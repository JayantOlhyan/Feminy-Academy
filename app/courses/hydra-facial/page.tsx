import type { Metadata } from "next";
import { CourseLanding } from "@/components/sales/CourseLanding";
import { salesCourses } from "@/content/sales";

export const metadata: Metadata = { title: "Hydra Facial Masterclass in Hindi", description: "Explore the learning plan, meet Sunita Rathee, review fees and discuss your batch before enrolment." };

export default function CoursePage() { return <CourseLanding course={salesCourses.find(course => course.slug === "hydra-facial")!} />; }
