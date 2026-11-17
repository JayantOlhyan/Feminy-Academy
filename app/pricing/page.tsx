import type { Metadata } from "next";
import { CourseCards } from "@/components/sales/CourseCards";
import { CommonQuestions } from "@/components/sales/Proof";
export const metadata: Metadata = { title: "Course Fees", description: "Compare the listed fees for Feminy Academy’s online courses and explore academy counselling." };
export default function PricingPage() { return <div className="sales-page"><section className="sales-simple-hero"><div className="sales-container"><span className="sales-caption">Plan your investment</span><h1>Choose with clarity.</h1><p>Compare listed course fees. Confirm your batch, exact inclusions, applicable taxes and refund terms before paying.</p></div></section><CourseCards /><CommonQuestions /></div>; }
