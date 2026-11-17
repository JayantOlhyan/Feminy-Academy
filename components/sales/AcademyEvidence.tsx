import Image from "next/image";
import { EnquiryLink } from "./Interactions";

export function AcademyEvidence() {
  return <section className="sales-section sales-soft" id="background"><div className="sales-container"><div className="sales-section-intro"><div><span className="sales-caption">Behind the brushes</span><h2>A craft that keeps growing.</h2></div><p>Professional learning, a magazine feature and moments from the archive.</p></div><div className="landing-evidence-grid">{[
    {src:"/assets/03-achievements/certifications/certificate-atul-chauhan-3-day-masterclass.webp",title:"Continuing her own learning",caption:"Sunita at an Atul Chauhan masterclass certificate presentation."},
    {src:"/assets/03-achievements/magazine-shades-of-woman/shades-of-woman-feature-page-63.webp",title:"Her story, in print",caption:"Featured in Shades of Woman magazine, page 63."},
    {src:"/assets/03-achievements/rudseti-rohtak-training-feb-2021/rudseti-trainee-batch-02.webp",title:"From the training archive",caption:"A group photograph from RUDSETI, Rohtak, February 2021."},
  ].map(item => <figure key={item.src}><div><Image src={item.src} alt={item.caption} fill sizes="(max-width:700px) 100vw, 33vw"/></div><figcaption><h3>{item.title}</h3><p>{item.caption}</p></figcaption></figure>)}</div><EnquiryLink location="background" className="sales-text-link">Ask about learning with Sunita</EnquiryLink></div></section>;
}
