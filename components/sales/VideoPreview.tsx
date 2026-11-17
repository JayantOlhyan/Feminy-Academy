"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/motion";

/** Hover is an opt-in muted preview; opening the full video remains an explicit click. */
export function VideoPreview({ src, className, label, children, onOpen }: { src: string; className: string; label: string; children: ReactNode; onOpen: () => void }) {
  const [active, setActive] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const start = () => {
    if (document.hidden || document.querySelector("dialog[open]") || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    setActive(true);
  };
  useEffect(() => {
    if (!active || !button.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setActive(false); });
    observer.observe(button.current);
    const visibility = () => { if (document.hidden) setActive(false); };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => { if (preference.matches) setActive(false); };
    preference.addEventListener("change", changed);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); preference.removeEventListener("change", changed); document.removeEventListener("visibilitychange", visibility); };
  }, [active]);
  useEffect(() => {
    const current = video.current;
    return () => { if (current) { gsap.killTweensOf(current); current.pause(); } };
  }, [active]);
  const reveal = async () => {
    const current = video.current;
    if (!current) return;
    try {
      await current.play();
      if (current.isConnected && !current.paused) gsap.to(current, { opacity: 1, duration: .25, ease: "power1.out", overwrite: true });
    } catch { /* The supplied poster stays visible when autoplay is unavailable. */ }
  };
  return <button ref={button} className={className} aria-label={label} onPointerEnter={start} onPointerLeave={() => setActive(false)} onFocus={start} onBlur={() => setActive(false)} onClick={() => { video.current?.pause(); setActive(false); onOpen(); }}>
    {children}
    {active && <video className="landing-hover-video" ref={video} src={src} muted playsInline preload="none" autoPlay aria-hidden="true" tabIndex={-1} onCanPlay={reveal} onError={() => setActive(false)} onTimeUpdate={event => { if (event.currentTarget.currentTime > 5) event.currentTarget.currentTime = .1; }} />}
  </button>;
}
