import Link from "next/link";
import { EnquiryLink } from "@/components/sales/Interactions";
export default function ThankYouPage() {
  return <div className="sales-page"><section className="sales-simple-hero"><div className="sales-container"><span className="sales-caption">Your next step</span><h1>Let’s continue<br />the conversation.</h1><p>Agar aapne enquiry form submit kiya hai, team aapki details review karegi. Apna course goal aur preferred timing WhatsApp par bhi share kar sakti hain.</p><p>This page is not a payment receipt or enrolment confirmation.</p><div className="sales-hero-actions"><EnquiryLink location="thank_you">Continue on WhatsApp</EnquiryLink><Link className="sales-text-link" href="/#courses">Explore the courses</Link></div></div></section></div>;
}
