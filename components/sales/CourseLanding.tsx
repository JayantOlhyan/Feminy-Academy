import { CourseMarketComparison } from "./CourseMarketComparison";
import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle, BookOpen, ArrowDown } from "lucide-react";
import type { SalesCourse } from "@/content/sales";
import { CourseFee, PriceCountdown } from "./OfferPricing";
import { MediaGallery } from "./MediaGallery";
import { AcademyEvidence } from "./AcademyEvidence";
import { CourseView, DetailsList, EnquiryLink, MobileEnrolment } from "./Interactions";
import { TeacherStory, ClientReviews, CommonQuestions } from "./Proof";
import { LearningShowcase } from "./LearningShowcase";
import { LearningJourney, CourseRequirements, FormatComparison, CourseCommitment } from "./ConversionSections";

export function CourseLanding({ course }: { course: SalesCourse }) {
  return <div className="sales-page sales-course-page funnel-course-page">
    <CourseView slug={course.slug} name={course.name}/>
    <section className="sales-hero funnel-course-hero" id="sales-hero"><div className="sales-container sales-hero-grid"><div className="sales-hero-copy">
      <Link href="/#courses" className="sales-breadcrumb">Feminy Academy / {course.name}</Link><span className="sales-caption">{course.format}</span><span className="landing-course-name">{course.name}</span><h1>{course.heading}</h1><p>{course.description}</p>
      <div className="sales-hero-price"><strong><CourseFee slug={course.slug}/></strong><span>Current course fee<br/>Hindi / Hinglish</span></div>
      <div className="sales-hero-actions"><EnquiryLink course={course.name} location={`${course.slug}_hero`}><MessageCircle size={18} aria-hidden="true"/> Get course details</EnquiryLink><a href="#course-preview" className="sales-text-link">Look inside the plan <ArrowDown size={16} aria-hidden="true"/></a></div>
      <div className="funnel-hero-deadline"><PriceCountdown slug={course.slug} compact/></div><p className="sales-footnote">Syllabus, batch dates aur total fees WhatsApp par janiye. Decide karne se pehle sawaal poochhiye.</p>
    </div><figure className="sales-course-hero-photo"><div><Image src={course.image} alt={course.imageAlt} fill priority sizes="(max-width:700px) 100vw, 45vw"/><span className="funnel-photo-tag">{course.slug === "hydra-facial" ? "Learn with Sunita Rathee" : "From Sunita's professional portfolio"}</span></div><figcaption>{course.imageCaption}</figcaption></figure></div></section>
    <nav className="sales-course-nav" aria-label="On this course page"><div className="sales-container"><a href="#course-preview">Inside the course</a><a href="#learning">Is it for me?</a><a href="#curriculum">Learning plan</a><a href="#teacher">Your teacher</a><a href="#enrol">Fees & enquiry</a></div></nav>
    <LearningJourney course={course}/><LearningShowcase course={course}/>
    <section className="sales-section" id="learning"><div className="sales-container sales-learning-grid"><div><span className="sales-caption">Find your fit</span><h2>For the skill<br/>you want to build.</h2><ul className="sales-check-list">{course.audience.map(item=><li key={item}><Check size={18} aria-hidden="true"/>{item}</li>)}</ul><EnquiryLink course={course.name} location="course_fit" className="sales-text-link">Help me decide if this fits</EnquiryLink></div><div className="sales-outcomes">{course.outcomes.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>
    <section className="sales-section sales-soft" id="curriculum"><div className="sales-container sales-curriculum-grid"><div><BookOpen size={30} strokeWidth={1} aria-hidden="true"/><h2>Every topic.<br/>A clearer picture.</h2><p>Explore the outline. Your final batch syllabus, class format and support arrangements are confirmed before enrolment.</p><EnquiryLink course={course.name} location={`${course.slug}_syllabus`} className="sales-text-link">Request the final syllabus</EnquiryLink></div><DetailsList label="curriculum" items={course.modules.map((module,index)=>({question:`${String(index+1).padStart(2,"0")}  ${module.title}`,answer:module.topics.join(" • ")}))}/></div></section>
    <TeacherStory/><MediaGallery mode="stories"/><ClientReviews/><AcademyEvidence/><CourseRequirements course={course}/>{course.slug === "hydra-facial" ? <CourseMarketComparison/> : <FormatComparison course={course}/>}<CourseCommitment course={course}/><CommonQuestions course={course}/><MobileEnrolment course={course.name} courseSlug={course.slug}/>
  </div>;
}
