"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "@/lib/motion";

export function useGalleryMotion(rail: RefObject<HTMLDivElement | null>, enabled: boolean, dialogOpen: boolean) {
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const manualTween = useRef<gsap.core.Tween | null>(null);
  const autoTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = rail.current;
    if (!enabled || !element) return;
    const preference = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    let hovering = false;
    let focused = false;
    let max = -1;
    const previousSnap = "";
    const sync = () => {
      const nextMax = Math.max(0, element.scrollWidth - element.clientWidth);
      const canMove = preference.matches && nextMax > 10;
      setAvailable(canMove);
      if (nextMax !== max || !autoTween.current) {
        max = nextMax;
        autoTween.current?.kill();
        autoTween.current = null;
        if (canMove) {
          const destination = element.scrollLeft >= max - 2 ? 0 : max;
          autoTween.current = gsap.to(element, { scrollLeft: destination, duration: Math.max(9, Math.abs(destination - element.scrollLeft) / 18), ease: "sine.inOut", repeat: -1, yoyo: true, repeatDelay: 1.2, paused: true });
        }
      }
      if (!canMove || paused || dialogOpen || !visible || hovering || focused || document.hidden) {
        autoTween.current?.pause();
        element.style.scrollSnapType = previousSnap;
      } else {
        element.style.scrollSnapType = "none";
        autoTween.current?.resume();
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold:.2});
    observer.observe(element);
    const resize = new ResizeObserver(sync);
    resize.observe(element);
    const enter = () => { hovering = true; sync(); };
    const leave = () => { hovering = false; sync(); };
    const focus = () => { focused = true; sync(); };
    const blur = (event: FocusEvent) => { if (!element.contains(event.relatedTarget as Node | null)) { focused = false; sync(); } };
    const interact = () => setPaused(true);
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("focusin", focus);
    element.addEventListener("focusout", blur);
    element.addEventListener("pointerdown", interact);
    element.addEventListener("wheel", interact, {passive:true});
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect(); resize.disconnect(); autoTween.current?.kill(); autoTween.current = null;
      element.style.scrollSnapType = previousSnap;
      element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave);
      element.removeEventListener("focusin", focus); element.removeEventListener("focusout", blur);
      element.removeEventListener("pointerdown", interact); element.removeEventListener("wheel", interact);
      document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", sync);
    };
  }, [rail, enabled, paused, dialogOpen]);

  useEffect(() => () => { manualTween.current?.kill(); }, []);
  const scroll = (direction: number) => {
    const element = rail.current;
    if (!element) return;
    setPaused(true);
    autoTween.current?.pause();
    manualTween.current?.kill();
    const card = element.querySelector<HTMLElement>(".landing-reel-item");
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(element).gap || "0") : 300;
    const target = Math.max(0, Math.min(element.scrollWidth - element.clientWidth, element.scrollLeft + direction * step));
    element.style.scrollSnapType = "none";
    manualTween.current = gsap.to(element, { scrollTo: {x:target, autoKill:true}, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : .65, ease:"power2.inOut", onComplete: () => { element.style.scrollSnapType = ""; } });
  };
  return { paused, available, toggle: () => setPaused(value => !value), scroll };
}
