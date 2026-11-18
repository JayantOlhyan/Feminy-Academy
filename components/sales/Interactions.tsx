"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent, trackWhatsAppClick } from "@/lib/tracking";
import { siteConfig } from "@/content/site";
import type { ReactNode } from "react";

export function EnquiryLink({ children, course, location, className = "sales-button" }: { children: ReactNode; course?: string; location: string; className?: string }) {
  const message = course
    ? `Namaste Sunita ma'am, mujhe ${course} ki details chahiye. Kripya syllabus, batch date, total fees, recording access, certificate aur refund terms share kijiye.`
    : "Namaste Sunita ma'am, mujhe Feminy Academy mein apne liye sahi course choose karna hai. Please details share kijiye.";
  // Keep the initial server and browser markup identical. Attach stored attribution after mount.
  const [href, setHref] = useState(() => `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`);
  useEffect(() => { setHref(getWhatsAppUrl("question", message)); }, [message]);
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" onClick={() => { trackWhatsAppClick(location); trackEvent("cta_click", { location, course, channel: "whatsapp" }); }}>{children}</a>;
}

export function DetailsList({ items, label }: { items: { question: string; answer: string }[]; label: string }) {
  return <div className="sales-faq">{items.map(item => <details key={item.question} onToggle={event => { if (event.currentTarget.open) trackEvent("faq_open", { question: item.question, location: label }); }}><summary>{item.question}<Plus size={20} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>;
}

export function CourseView({ slug, name }: { slug: string; name: string }) {
  useEffect(() => { trackEvent("ViewContent", { content_ids: [slug], content_name: name, content_type: "course" }); }, [slug, name]);
  return null;
}

export function MobileEnrolment({ course, price }: { course?: string; price?: string }) {
  const [visible, setVisible] = useState(false);
  const dock = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = document.getElementById("sales-hero");
    const enrol = document.getElementById("enrol");
    const footer = document.querySelector("footer");
    const update = () => {
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 70 : false;
      const isVisible = (el: Element | null) => { if (!el) return false; const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
      const editing = /^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement?.tagName || "");
      const overlay = document.querySelector('dialog[open], header[data-menu-open="true"]');
      const smallHeight = (window.visualViewport?.height || innerHeight) < 480;
      setVisible(pastHero && !isVisible(enrol) && !isVisible(footer) && !editing && !overlay && !smallHeight);
    };
    const observer = new IntersectionObserver(update);
    [hero, enrol, footer].forEach(el => el && observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    document.addEventListener("feminy:overlay-change", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); window.visualViewport?.removeEventListener("resize", update); document.removeEventListener("feminy:overlay-change", update); document.removeEventListener("focusin", update); document.removeEventListener("focusout", update); };
  }, []);
  useEffect(() => {
    const element = dock.current;
    const measure = () => document.documentElement.style.setProperty("--enrolment-dock-height", `${element && getComputedStyle(element).display !== "none" ? element.getBoundingClientRect().height : 0}px`);
    const observer = new ResizeObserver(measure);
    if (element) observer.observe(element);
    measure();
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--enrolment-dock-height"); };
  }, [visible]);
  if (!visible) return null;
  return <aside ref={dock} className="sales-mobile-bar" aria-label="Course enquiry"><div><span>{course || "Find your course"}</span><strong>{price || "Learn with Sunita"}</strong></div>{course ? <EnquiryLink course={course} location="mobile_sticky"><MessageCircle size={18} aria-hidden="true" /> Get details</EnquiryLink> : <a className="sales-button" href="#courses">Explore courses</a>}</aside>;
}

export function PhoneLink() { return <a href={`tel:+${siteConfig.whatsappNumber}`} className="sales-text-link">{siteConfig.phone}</a>; }
