"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { storeUrlAttribution, isAdLandingSession } from "@/lib/lid";
import { initAnalytics, trackEvent } from "@/lib/tracking";
import { PriceCountdown } from "@/components/sales/OfferPricing";
import { introductoryOffer } from "@/content/offer";
import { EnquiryLink } from "@/components/sales/Interactions";

export function Brand() {
  return <Link href="/" className="sales-brand" aria-label="Feminy Academy home"><Image className="sales-brand-logo" src="/brand/feminy-crest-navbar.png" unoptimized alt="Feminy crest logo" width={70} height={70} priority /><span className="sales-brand-name"><strong>Feminy Academy</strong><span>by Sunita Rathee</span></span></Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [adLanding, setAdLanding] = useState(false);
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = header.current;
    if (!element) return;
    const measure = () => {
      const inner = element.querySelector<HTMLElement>(".sales-header-inner");
      const offer = element.querySelector<HTMLElement>(".sales-offer-bar");
      document.documentElement.style.setProperty("--sticky-header-height", `${(inner?.offsetHeight || 0) + (offer?.offsetHeight || 0) + 1}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element); measure();
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--sticky-header-height"); };
  }, []);
  const previousPath = useRef(pathname);
  useEffect(() => { storeUrlAttribution(); initAnalytics(); setAdLanding(isAdLandingSession()); }, [pathname]);
  useEffect(() => { if (previousPath.current !== pathname) { trackEvent("PageView", { page_path: pathname }); previousPath.current = pathname; } }, [pathname]);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.dispatchEvent(new Event("feminy:overlay-change")); }, [open]);
  useEffect(() => { if (!open) return; const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); document.getElementById("sales-menu-button")?.focus(); } }; document.addEventListener("keydown", escape); return () => document.removeEventListener("keydown", escape); }, [open]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);
  return <header ref={header} className="sales-header" data-menu-open={open && !adLanding}><div className="sales-container sales-header-inner"><Brand />{adLanding ? <EnquiryLink location="ad_header" className="sales-text-link">Ask a question</EnquiryLink> : <><nav className="sales-desktop-nav" aria-label="Main navigation"><Link href="/#courses">Our courses</Link><Link href="/offline-academy">The academy</Link><Link href="/about">Meet Sunita</Link><EnquiryLink location="header" className="sales-button sales-button-outline">Ask about courses</EnquiryLink></nav><button id="sales-menu-button" className="sales-menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="sales-mobile-navigation">{open ? <X size={24} /> : <Menu size={24} />}</button></> }</div>{open && !adLanding && <nav className="sales-mobile-nav" id="sales-mobile-navigation" aria-label="Mobile navigation"><Link onClick={() => setOpen(false)} href="/#courses">Our courses</Link><Link onClick={() => setOpen(false)} href="/offline-academy">The academy</Link><Link onClick={() => setOpen(false)} href="/about">Meet Sunita</Link><Link onClick={() => setOpen(false)} href="/pricing">Course fees</Link><Link onClick={() => setOpen(false)} href="/contact">Contact</Link><EnquiryLink location="mobile_menu">Talk on WhatsApp</EnquiryLink></nav>}<div className="sales-offer-bar"><Link href="/pricing"><strong>{introductoryOffer.label} · First {introductoryOffer.allocation} enrolments</strong><span>Explore courses &amp; fees</span></Link><PriceCountdown compact /></div></header>;
}
