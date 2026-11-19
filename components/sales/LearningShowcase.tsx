"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, BookOpen, Check, Plus } from "lucide-react";
import { salesCourses, type SalesCourse } from "@/content/sales";
import { EnquiryLink } from "./Interactions";

export function LearningShowcase({ course }: { course?: SalesCourse }) {
  const [slug, setSlug] = useState(course?.slug || salesCourses[0].slug);
  const selected = course || salesCourses.find(item => item.slug === slug)!;
  const [expanded, setExpanded] = useState(0);
  const moduleIndex = Math.min(expanded, selected.modules.length - 1);
  return <section className="sales-section funnel-showcase" id="course-preview"><div className="sales-container">
    <div className="funnel-centred-intro"><span className="sales-caption">A closer look before you join</span><h2>See the plan.<br /><span>Find your starting point.</span></h2><p>Course ke andar kya explore hoga? Topics kholiye, apne goals se compare kijiye, aur apne sawaal poochhiye.</p></div>
    {!course && <div className="funnel-course-switch" role="group" aria-label="Choose a course learning preview">{salesCourses.map(item => <button key={item.slug} aria-pressed={selected.slug === item.slug} onClick={() => { setSlug(item.slug); setExpanded(0); }}>{item.name}</button>)}</div>}
    <div className="funnel-learning-window">
      <div className="funnel-window-bar"><span><BookOpen size={16} aria-hidden="true"/> {selected.name}</span><span>Learning outline</span></div>
      <div className="funnel-mobile-outline"><p>Tap a topic to see what you’ll explore.</p>{selected.modules.map((item,index) => <details key={`${selected.slug}-${item.title}`} name={`mobile-topics-${selected.slug}`}><summary><span>{String(index+1).padStart(2,"0")}</span><strong>{item.title}</strong><Plus size={18} aria-hidden="true"/></summary><div className="funnel-mobile-topic"><ul>{item.topics.map(topic => <li key={topic}><Check size={16} aria-hidden="true"/><span>{topic}</span></li>)}</ul><EnquiryLink course={selected.name} location="mobile_learning_preview" className="sales-text-link">Ask about this topic <ArrowUpRight size={16} aria-hidden="true"/></EnquiryLink></div></details>)}</div>
      <div className="funnel-learning-panels">
        <div className="funnel-outline"><span className="funnel-small-label">Explore the topics</span>{selected.modules.map((item,index) => <button key={item.title} aria-expanded={moduleIndex === index} aria-controls={`outline-${selected.slug}`} onClick={() => setExpanded(index)}><span>{String(index+1).padStart(2,"0")}</span>{item.title}<ArrowUpRight size={16} aria-hidden="true"/></button>)}</div>
        <div className="funnel-module" id={`outline-${selected.slug}`} aria-live="polite"><span className="funnel-small-label">Selected topic</span><h3>{selected.modules[moduleIndex].title}</h3><ul>{selected.modules[moduleIndex].topics.map(topic => <li key={topic}><Check size={17} aria-hidden="true"/><span>{topic}</span></li>)}</ul><EnquiryLink course={selected.name} location="learning_preview" className="sales-text-link">Ask about this learning plan <ArrowUpRight size={17} aria-hidden="true"/></EnquiryLink></div>
        <figure className="funnel-teacher-preview"><Image src="/academy/sunita.webp" alt="Sunita Rathee, your beauty trainer" fill sizes="(max-width:900px) 50vw, 25vw"/><figcaption><span>Your teacher</span><strong>Sunita Rathee</strong><span>Hindi / Hinglish</span></figcaption></figure>
      </div>
      <div className="funnel-window-notes"><span><Check size={15} aria-hidden="true"/> Topic-by-topic outline</span><span><Check size={15} aria-hidden="true"/> Practice-focused learning</span><span><Check size={15} aria-hidden="true"/> Discuss your starting level</span></div>
    </div><p className="sales-footnote funnel-preview-note">Explore the course outline here. Ask for the final batch syllabus, class format and a teaching preview before enrolment.</p>
  </div></section>;
}
