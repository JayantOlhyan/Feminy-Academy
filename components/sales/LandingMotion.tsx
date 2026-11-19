"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/motion";

/** Native wheel/touch scrolling stays native. GSAP handles requested navigation and visual cues. */
export function LandingMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".sales-page");
    if (!page) return;
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 900px)" }, context => {
      if (!context.conditions?.motion) return;
      const entrance = page.querySelectorAll(".landing-hero-copy > *, .sales-hero-copy > h1, .sales-hero-copy > p, .sales-hero-copy > .sales-hero-actions");
      // Avoid moving a deep-linked section away from its requested position.
      if (!window.location.hash) gsap.from(entrance, { y: 14, opacity: 0, stagger: .055, duration: .65, ease: "power2.out", clearProps: "transform,opacity" });
      page.querySelectorAll<HTMLElement>(".sales-section-intro, .funnel-centred-intro, .sales-teacher-copy, .sales-curriculum-grid > div:first-child, .sales-enrol-grid > div:first-child, .sales-faq-grid > div:first-child").forEach(element => {
        gsap.from(element, { y: 18, opacity: .25, duration: .65, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      page.querySelectorAll(".sales-course-grid, .funnel-step-grid").forEach(grid => {
        gsap.from(grid.children, { y: 22, opacity: .3, stagger: .07, duration: .6, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: grid, start: "top 92%", once: true } });
      });
      if (context.conditions.desktop) {
        const hero = page.querySelector(".landing-hero");
        if (hero) page.querySelectorAll(".landing-reel-item > img").forEach((image, index) => {
          gsap.fromTo(image, { yPercent: -2, scale: 1.06 }, { yPercent: index === 2 ? 2 : index % 2 ? 4 : -4, scale: 1.06, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: .7 } });
        });
      }
    }, page);

    let navigation: gsap.core.Tween | undefined;
    let scheduled = 0;
    const stop = () => { cancelAnimationFrame(scheduled); navigation?.kill(); };
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname) return;
      let id: string;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      stop();
      const offset = (document.querySelector(".sales-header-inner")?.getBoundingClientRect().height || 0) + (document.querySelector(".sales-offer-bar")?.getBoundingClientRect().height || 0) + 20;
      const complete = () => {
        if (location.hash !== url.hash) history.pushState(null, "", `${location.pathname}${location.search}${url.hash}`);
        if (event.detail === 0) {
          const previous = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.addEventListener("blur", () => { if (previous === null) target.removeAttribute("tabindex"); else target.setAttribute("tabindex", previous); }, { once: true });
        }
      };
      scheduled = requestAnimationFrame(() => {
        navigation = gsap.to(window, { scrollTo: { y: target, offsetY: offset, autoKill: true }, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : .85, ease: "power2.inOut", onComplete: complete });
      });
    };
    const keyStop = (event: KeyboardEvent) => { if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Escape", " "].includes(event.key)) stop(); };
    document.addEventListener("click", navigate, true);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", keyStop);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(() => { if (page.isConnected) refresh(); });
    window.addEventListener("load", refresh);
    return () => {
      stop(); media.revert();
      document.removeEventListener("click", navigate, true);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", keyStop);
      window.removeEventListener("load", refresh);
    };
  }, [pathname]);
  return null;
}
