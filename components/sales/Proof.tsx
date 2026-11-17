import Image from "next/image";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import reviews from "@/content/client-reviews.json";
import { EnquiryLink, DetailsList } from "./Interactions";
import { salesFAQs } from "@/content/sales";

export function ClientReviews() {
  const selected = ["Himanshi", "Nikita Paliwal", "Lalita"].map(name => reviews.reviews.find(r => r.name === name)!);
  return <section className="sales-section sales-review-section" id="reviews"><div className="sales-container">
    <div className="sales-section-intro"><div><span className="sales-caption">In their words</span><h2>Care that clients remember.</h2></div><p>Sunita ke salon clients ke apne shabd. Justdial ke archived reviews, original Femina Beauty Point listing se.</p></div>
    <div className="sales-review-grid">{selected.map(review => <figure className="sales-review" key={review.name}><span className="sales-stars" aria-label={`${review.rating} out of 5 stars`}>★★★★★</span><blockquote>“{review.text_verbatim}”</blockquote><figcaption><strong>{review.name}</strong><span>Salon client on Justdial</span><time dateTime={review.date}>{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></figcaption></figure>)}</div>
    <p className="sales-footnote">These reviews describe salon services, not course outcomes. Archived source supplied by the academy; reviews have not been independently reverified.</p>
  </div></section>;
}

export function TeacherStory() {
  return <section className="sales-section sales-teacher" id="teacher"><div className="sales-container sales-teacher-grid">
    <div className="sales-teacher-image"><Image src="/academy/sunita.webp" alt="Sunita Rathee holding makeup brushes in a white striped suit" fill sizes="(max-width: 700px) 100vw, 40vw" /></div>
    <div className="sales-teacher-copy"><span className="sales-caption">Your teacher, Sunita Rathee</span><h2>Learn the craft.<br />From someone who lives it.</h2><p>Makeup artist, trainer aur entrepreneur, Bahadurgarh se. Sunita ka kaam bridal artistry, salon care aur beauty education ko ek saath laata hai.</p><blockquote>“Makeup is spiritual.<br />Makeup is personal.”</blockquote><span className="sales-footnote">Sunita Rathee, in her Shades of Woman feature</span><ul className="sales-check-list"><li><Check aria-hidden="true" size={18} /> Diploma in Advanced Skin &amp; Hair</li><li><Check aria-hidden="true" size={18} /> Bridal, HD and airbrush makeup experience</li><li><Check aria-hidden="true" size={18} /> Hindi, English and Haryanvi</li></ul><EnquiryLink location="teacher" className="sales-text-link">Talk to the academy <MessageCircle size={17} aria-hidden="true" /></EnquiryLink></div>
  </div></section>;
}

export function Portfolio() {
  return <section className="sales-section" id="work"><div className="sales-container"><div className="sales-section-intro"><div><span className="sales-caption">The work behind the teaching</span><h2>Beauty is in the details.</h2></div><p>Real work from Sunita Rathee’s bridal portfolio. Dekhiye finishing, colour aur detail par dhyaan.</p></div><div className="sales-portfolio"><figure><div><Image src="/academy/bridal.webp" fill sizes="(max-width: 600px) 80vw, 35vw" alt="Bridal makeup with a soft pink eye and precise skin finish" /></div><figcaption>Bridal artistry</figcaption></figure><figure><div><Image src="/academy/bridal-detail.webp" fill sizes="(max-width: 600px) 80vw, 35vw" alt="Bridal portrait from Sunita Rathee’s professional photoshoot" /></div><figcaption>Colour, texture &amp; finish</figcaption></figure><figure><div><Image src="/academy/studio.webp" fill sizes="(max-width: 600px) 80vw, 30vw" alt="Sunita working on a bridal client inside the salon" /></div><figcaption>Inside the salon</figcaption></figure></div><p className="sales-footnote">Professional portfolio images; these are not student submissions or a promise of learner results.</p></div></section>;
}

export function CommonQuestions() {
  return <section className="sales-section" id="questions"><div className="sales-container sales-faq-grid"><div><span className="sales-caption">Before you decide</span><h2>Aapke sawaal.<br />Seedhe jawaab.</h2><p>Apna sawaal yahan nahi mila?</p><EnquiryLink className="sales-text-link" location="faq">Ask us on WhatsApp <MessageCircle size={17} aria-hidden="true" /></EnquiryLink></div><DetailsList items={salesFAQs} label="course_faq" /></div></section>;
}

export function LearningSteps() {
  return <section className="sales-section sales-soft" id="how-it-works"><div className="sales-container"><div className="sales-section-intro"><div><span className="sales-caption">Your next chapter</span><h2>Pehle samajhiye. Phir shuru kijiye.</h2></div><p>A clear conversation before you commit.</p></div><ol className="sales-steps"><li><span>01</span><h3>Choose your direction</h3><p>Apne goal aur experience ke hisaab se course explore kijiye.</p></li><li><span>02</span><h3>Get the full picture</h3><p>Team se syllabus, dates, access aur total fees written mein lijiye.</p></li><li><span>03</span><h3>Join with clarity</h3><p>Terms samajhne ke baad enrol kijiye aur apni learning plan kijiye.</p></li></ol></div></section>;
}

export function FinalInvitation() {
  return <section id="enrol" className="sales-final"><div className="sales-container"><span className="sales-caption">A skill begins with a first step</span><h2>Apni learning ko<br />ek nayi direction dijiye.</h2><p>Course choose karne mein help chahiye? Let’s talk about your goals.</p><EnquiryLink location="final"><MessageCircle size={18} aria-hidden="true" /> Find my course</EnquiryLink><Link href="/pricing" className="sales-text-link">Compare course fees</Link></div></section>;
}
