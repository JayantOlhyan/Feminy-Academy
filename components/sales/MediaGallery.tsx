"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Pause, X, Maximize2 } from "lucide-react";
import { VideoPreview } from "./VideoPreview";
import { useGalleryMotion } from "./useGalleryMotion";
import { EnquiryLink } from "./Interactions";
import { gsap } from "@/lib/motion";
import media from "@/content/media.json";

type Selection = { kind: "image"; index: number } | { kind: "video"; index: number };

export function MediaGallery({ mode = "portfolio" }: { mode?: "hero" | "portfolio" | "stories" | "studio" }) {
  const [category, setCategory] = useState("Bridal artistry");
  const [selection, setSelection] = useState<Selection | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const categories = [...new Set(media.gallery.map(item => item.category))];
  const pictures = mode === "studio" ? media.gallery.filter(item => item.category === "The studio") : media.gallery.filter(item => item.category === category);
  const isOpen = selection !== null;
  const galleryMotion = useGalleryMotion(rail, mode === "hero", isOpen);
  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    const element = dialog.current;
    element.showModal();
    document.dispatchEvent(new Event("feminy:overlay-change"));
    const arrival = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : gsap.from(element, { y: 12, opacity: 0, duration: .25, ease: "power2.out", clearProps: "transform,opacity" });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { arrival?.kill(); element.close(); document.dispatchEvent(new Event("feminy:overlay-change")); document.body.style.overflow = previous; trigger.current?.focus(); };
  }, [isOpen]); // Switching media keeps the same modal and focus trap.
  const open = (next: Selection) => { trigger.current = document.activeElement as HTMLElement; setSelection(next); };
  const close = () => setSelection(null);
  const move = (step: number) => setSelection(current => current ? { ...current, index: (current.index + step + (current.kind === "image" ? pictures.length : media.videos.length)) % (current.kind === "image" ? pictures.length : media.videos.length) } : null);
  const selectedImage = selection?.kind === "image" ? pictures[selection.index] : null;
  const selectedVideo = selection?.kind === "video" ? media.videos[selection.index] : null;
  return <>
    {mode === "hero" ? <div className="landing-reel-wrap"><div className="landing-reel" ref={rail} aria-label="A glimpse of Sunita’s work">
      {[
        {src: media.gallery[0].src, alt: "Pink bridal makeup with traditional jewellery", title: "Bridal artistry"},
        {src: media.videos[0].poster, alt: "Salon client sharing her experience", title: "Client stories", video: 0},
        {src: media.gallery[2].src, alt: "Sunita applying bridal makeup during a studio shoot", title: "The artist at work"},
        {src: media.videos[1].poster, alt: "Bride wearing a yellow saree", title: "Bridal moments", video: 1},
        {src: media.gallery[13].src, alt: "Styling stations inside the Bahadurgarh studio", title: "Inside the studio"},
      ].map((item, i) => {
        const contents = <><Image src={item.src} alt={item.alt} fill priority={i === 2} sizes="(max-width: 700px) 65vw, 30vw" /><span className="landing-media-label">{item.title}</span><span className="landing-media-control">{item.video !== undefined ? <Play size={20} fill="currentColor" aria-hidden="true" /> : <Maximize2 size={20} aria-hidden="true" />}</span></>;
        const className = `landing-reel-item landing-reel-item-${i}`;
        if (item.video !== undefined) {
          const index = item.video;
          return <VideoPreview key={item.src} src={media.videos[index].src} className={className} label={`Play ${item.title}`} onOpen={() => open({kind:"video",index})}>{contents}</VideoPreview>;
        }
        return <button className={className} key={item.src} onClick={() => { const image = media.gallery.find(x => x.src === item.src)!; setCategory(image.category); open({kind:"image",index:media.gallery.filter(x => x.category === image.category).findIndex(x => x.src === item.src)}); }} aria-label={`View ${item.title}`}>{contents}</button>;
      })}
    </div><div className="landing-reel-footer"><p>Real work. Real people. A glimpse into Sunita’s world.</p><div>{galleryMotion.available && <button className="landing-arrow landing-pause" aria-label={galleryMotion.paused ? "Resume gallery motion" : "Pause gallery motion"} onClick={galleryMotion.toggle}>{galleryMotion.paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button>}<button className="landing-arrow" aria-label="Previous work" onClick={() => galleryMotion.scroll(-1)}><ArrowLeft size={18}/></button><button className="landing-arrow" aria-label="Next work" onClick={() => galleryMotion.scroll(1)}><ArrowRight size={18}/></button></div></div></div>
    : mode === "stories" ? <section className="sales-section landing-stories" id="stories"><div className="sales-container"><div className="sales-section-intro"><div><span className="sales-caption">From the salon chair</span><h2>Faces behind the feedback.</h2></div><p>Original moments from Sunita’s salon. Choose a story to watch, with sound when you open it.</p></div><div className="landing-video-grid">{media.videos.map((video,index) => <VideoPreview key={video.src} src={video.src} className="landing-video-card" onOpen={() => open({kind:"video",index})} label={`Play ${video.title}`}><Image src={video.poster} alt={video.title} fill sizes="(max-width:700px) 65vw, 25vw"/><span className="landing-media-control"><Play size={24} fill="currentColor"/></span><span className="landing-media-label">{video.title}</span></VideoPreview>)}</div><p className="sales-footnote">Salon experiences and bridal moments; these videos do not describe course outcomes.</p></div></section>
    : <section className="sales-section" id={mode === "studio" ? "studio" : "work"}><div className="sales-container"><div className="sales-section-intro"><div><span className="sales-caption">{mode === "studio" ? "Come a little closer" : "The work behind the teaching"}</span><h2>{mode === "studio" ? "A look inside the studio." : "The details make the difference."}</h2></div><p>{mode === "studio" ? "Explore the Bahadurgarh space. Arrange a visit with the team before you travel." : "Bridal finishes, transformations and hair work from Sunita’s own portfolio."}</p></div>{mode !== "studio" && <div className="landing-filters" role="group" aria-label="Filter portfolio">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>}<div data-category={mode === "studio" ? "The studio" : category} className={`landing-gallery ${mode === "studio" ? "landing-studio-grid" : ""}`}>{pictures.map((item,index) => <button className="landing-gallery-item" key={item.src} onClick={() => open({kind:"image",index})} aria-label={`Enlarge ${item.alt}`}><span><Image src={item.src} alt={item.alt} fill sizes="(max-width:700px) 50vw, 30vw"/></span><span className="landing-gallery-caption">{item.title}<Maximize2 size={16}/></span></button>)}</div>{mode === "portfolio" && <div className="landing-interest"><p>{category === "Hair" ? "Interested in the hair work?" : category === "The studio" ? "Picture yourself learning here?" : "Want to learn this kind of artistry?"}</p><EnquiryLink course={category === "Hair" ? "Hair training" : category === "The studio" ? "In-person beauty training" : "Makeup training"} location="portfolio_interest">{category === "Hair" ? "Ask about hair training" : category === "The studio" ? "Explore academy training" : "Ask about makeup training"}</EnquiryLink></div>}<p className="sales-footnote">{mode === "studio" ? "Supplied studio photographs. Confirm the current facilities and location when arranging your visit." : "Professional work and practice imagery from the supplied archive. Not a promise of learner results."}</p></div></section>}
    {selection && <dialog className="landing-lightbox" ref={dialog} aria-labelledby="media-title" onCancel={close} onClick={event => { if(event.target === event.currentTarget) close(); }} onKeyDown={event => { if ((event.target as HTMLElement).closest("video")) return; if(event.key === "ArrowLeft") move(-1); if(event.key === "ArrowRight") move(1); }}><div className="landing-lightbox-top"><span id="media-title">{selectedVideo?.title || selectedImage?.title}</span><button onClick={close} className="landing-arrow" aria-label="Close media"><X size={22}/></button></div><div className="landing-lightbox-stage">{selectedVideo ? <video key={selectedVideo.src} src={selectedVideo.src} poster={selectedVideo.poster} controls playsInline autoPlay preload="none"><p>Your browser cannot play this video. <a href={selectedVideo.src}>Open the video</a>.</p></video> : selectedImage && <div className="landing-lightbox-image"><Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="90vw"/></div>}</div><div className="landing-lightbox-bottom"><button className="landing-arrow" onClick={() => move(-1)} aria-label="Previous media"><ArrowLeft size={20}/></button><span>{selection.index+1} / {selection.kind === "image" ? pictures.length : media.videos.length}</span><button className="landing-arrow" onClick={() => move(1)} aria-label="Next media"><ArrowRight size={20}/></button></div></dialog>}
  </>;
}
