import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseFee } from "@/components/sales/OfferPricing";
import { EnquiryLink } from "@/components/sales/Interactions";
import { priceSchedule, type PricedCourseSlug } from "@/lib/offer-pricing";
import { getCourseHandoff } from "@/lib/course-platform";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Course payment", robots: { index: false, follow: false } };
export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!Object.hasOwn(priceSchedule.courses, slug)) notFound();
  const course = priceSchedule.courses[slug as PricedCourseSlug];
  const handoff = await getCourseHandoff(slug as PricedCourseSlug);
  return <div className="sales-page"><section className="sales-section"><div className="sales-container course-checkout-layout"><Link href={`/courses/${slug}`} className="sales-text-link">← Back to the course</Link><h1>Take your next step.</h1><div className="course-checkout-panel">
    <span className="sales-caption">Your selected course</span><h2>{course.name}</h2><div className="sales-large-price"><CourseFee slug={slug}/></div>
    <p>Sign in to your learning account before paying. Your purchase and course access will be linked to that account.</p>
    {handoff.status === "ready" ? <><a className="sales-button" href={handoff.url}>Continue to your learning account</a><p>Review the course and final fee there, then pay through Razorpay. Lessons unlock after the learning platform verifies your payment.</p></> : <p role="status">{handoff.status === "not-configured" ? "Online course checkout is being connected. Please contact the academy before making a payment." : handoff.status === "price-mismatch" ? "The course fee is being updated. Checkout is temporarily paused; please contact the academy." : "The learning platform is temporarily unavailable. Please try again later or contact the academy."}</p>}
    <EnquiryLink course={course.name} location="checkout_support" className="sales-text-link">Contact the academy on WhatsApp</EnquiryLink>
    <div className="sales-price-policy"><Link href="/terms">Terms</Link><Link href="/refund-policy">Refund information</Link><Link href="/privacy">Privacy</Link></div>
  </div></div></section></div>;
}
