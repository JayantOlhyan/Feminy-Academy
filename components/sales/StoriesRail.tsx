"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { gsap } from "@/lib/motion";
import media from "@/content/media.json";

/** Three identical groups let the viewport wrap without an empty end or reverse animation. */
export function StoriesRail({ dialogOpen, onOpen }: { dialogOpen: boolean; onOpen: (index: number) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const period = useRef(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = rail.current;
    const firstGroup = group.current;
    if (!element || !firstGroup) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const measure = () => {
      const next = firstGroup.getBoundingClientRect().width;
      if (!next) return;
      const offset = period.current ? ((element.scrollLeft % period.current) + period.current) % period.current : 0;
      period.current = next;
      element.scrollLeft = next + Math.min(offset, next - 1);
      setReady(true);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(firstGroup);
    const wrap = () => {
      const width = period.current;
      if (!width) return;
      if (element.scrollLeft < width * .5) element.scrollLeft += width;
      else if (element.scrollLeft > width * 1.5) element.scrollLeft -= width;
    };
    element.addEventListener("scroll", wrap, { passive: true });
    return () => { resize.disconnect(); element.removeEventListener("scroll", wrap); preference.removeEventListener("change", updatePreference); };
  }, []);

  useEffect(() => {
    const element = rail.current;
    if (!element || !ready) return;
    let visible = false;
    let hovering = false;
    let focused = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, {threshold:.15});
    observer.observe(element);
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") hovering = true; };
    const leave = () => { hovering = false; };
    const focus = () => { focused = true; };
    const blur = (event: FocusEvent) => { focused = element.contains(event.relatedTarget as Node | null); };
    let fractionalPixels = 0;
    const tick = (_time: number, delta: number) => {
      if (paused || reduced || dialogOpen || !visible || hovering || focused || document.hidden) return;
      fractionalPixels += Math.min(delta, 50) * .024;
      const pixels = Math.floor(fractionalPixels);
      fractionalPixels -= pixels;
      element.scrollLeft += pixels;
    };
    element.addEventListener("pointerenter", enter); element.addEventListener("pointerleave", leave);
    element.addEventListener("focusin", focus); element.addEventListener("focusout", blur);
    gsap.ticker.add(tick);
    return () => {
      observer.disconnect(); gsap.ticker.remove(tick);
      element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave);
      element.removeEventListener("focusin", focus); element.removeEventListener("focusout", blur);
    };
  }, [paused, reduced, dialogOpen, ready]);

  const move = (direction: number) => {
    const element = rail.current;
    const card = group.current?.querySelector<HTMLElement>("button");
    if (!element || !card) return;
    setPaused(true);
    element.scrollLeft += direction * (card.getBoundingClientRect().width + 22);
  };

  return <div className="stories-carousel" role="region" aria-roledescription="carousel" aria-label="Client video stories">
    <div className="stories-rail" ref={rail} onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)}>
      {[0,1,2].map(copy => <div className="stories-group" ref={copy === 0 ? group : undefined} key={copy} aria-hidden={copy !== 1 ? true : undefined}>
        {media.videos.map((video,index) => <button key={video.src} className="landing-video-card stories-card" tabIndex={copy === 1 ? 0 : -1} aria-label={`Play ${video.title}`} onClick={() => onOpen(index)}>
          <Image src={video.poster} alt="" fill sizes="(max-width:700px) 72vw, 300px"/>
          <span className="landing-media-control"><Play size={24} fill="currentColor" aria-hidden="true"/></span><span className="landing-media-label">{video.title}</span>
        </button>)}
      </div>)}
    </div>
    <div className="stories-controls"><p>{reduced ? "Swipe or use the arrows to choose a story." : "Stories loop gently. Touch or swipe to pause."}</p><div>
      <button className="landing-arrow" aria-label="Previous client story" onClick={() => move(-1)}><ArrowLeft size={18} aria-hidden="true"/></button>
      {!reduced && <button className="landing-arrow" aria-label={paused ? "Resume client stories" : "Pause client stories"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={18} aria-hidden="true"/> : <Pause size={18} aria-hidden="true"/>}</button>}
      <button className="landing-arrow" aria-label="Next client story" onClick={() => move(1)}><ArrowRight size={18} aria-hidden="true"/></button>
    </div></div>
  </div>;
}
