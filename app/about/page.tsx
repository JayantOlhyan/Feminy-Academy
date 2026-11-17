import type { Metadata } from "next";
import { TeacherStory, Portfolio, FinalInvitation } from "@/components/sales/Proof";
export const metadata: Metadata = { title: "Meet Sunita Rathee", description: "Meet the makeup artist, trainer and entrepreneur behind Feminy Academy in Bahadurgarh." };
export default function AboutPage() { return <div className="sales-page"><section className="sales-simple-hero"><div className="sales-container"><span className="sales-caption">The person behind Feminy</span><h1>The craft is personal.</h1><p>Meet Sunita Rathee, the artist and teacher behind the academy.</p></div></section><TeacherStory /><Portfolio /><FinalInvitation /></div>; }
