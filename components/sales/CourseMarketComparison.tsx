import { Check, ArrowRight } from "lucide-react";
import { CourseFee } from "./OfferPricing";
import { EnquiryLink } from "./Interactions";

/** Published comparisons preserve format differences; missing detail is not evidence of absence. */
export function CourseMarketComparison() {
  const rows = [
    { title:"Learning focus", feminy:"Focused Hydra Facial learning", genetics:"HydraFacial technician programme", shringar:"Broader skin care & beauty therapy" },
    { title:"Learning format", feminy:"Online · Hindi / Hinglish", genetics:"Online study + hands-on workshop", shringar:"Classroom training in Hyderabad" },
    { title:"Machine understanding", feminy:"Parts, attachments & maintenance in the outline", genetics:"Hands-on HydraFacial practice listed", shringar:"HydraFacial included; machine topics not specified" },
    { title:"Consultation & preparation", feminy:"Skin assessment, hygiene & preparation in the outline", genetics:"Skin anatomy and skin concerns listed", shringar:"Basic and advanced facials listed" },
    { title:"Treatment learning", feminy:"Cleansing, exfoliation, hydration & aftercare in the outline", genetics:"Guided step-by-step hands-on practice", shringar:"Facials, de-tan and other beauty services" },
    { title:"In-person practice", feminy:"Confirm your online batch's practice arrangements", genetics:"One-day practical workshop listed", shringar:"Hands-on classroom practice listed" },
    { title:"Access, support & certificate", feminy:"Confirm selected batch terms before joining", genetics:"Certificate programme; access/support period not specified", shringar:"Certification and ongoing support advertised" },
  ];
  return <section className="sales-section market-comparison" id="compare-course-fees"><div className="sales-container">
    <div className="funnel-centred-intro"><span className="sales-caption">Put the fee in perspective</span><h2>Focused learning.<br/><span>A smaller starting fee.</span></h2><p>Compare Feminy’s Hydra Facial course with two published training options. Choose the learning format and scope that fit your goal.</p></div>
    <p className="market-scroll-hint" id="market-scroll-help">On a small screen, swipe the table to compare all three courses <ArrowRight size={15} aria-hidden="true"/></p>
    <div className="market-table-scroll" role="region" aria-label="Hydra Facial course comparison" aria-describedby="market-scroll-help market-comparison-note" tabIndex={0}>
      <table className="market-table"><caption>Course fees, learning topics and delivery compared</caption><colgroup><col className="market-label-col"/><col className="market-feminy-col"/><col/><col/></colgroup>
        <thead><tr><th scope="col">What you’re comparing</th><th scope="col" className="market-feminy"><span className="market-own-label">The course you’re exploring</span><strong>Feminy Academy</strong><span>Hydra Facial Masterclass</span></th><th scope="col"><strong>Genetics</strong><span>HydraFacial Technician Programme</span></th><th scope="col"><strong>Shringar Academy</strong><span>Skin Care / Beauty Therapy</span></th></tr></thead>
        <tbody><tr className="market-fee-row"><th scope="row">Published course fee</th><td className="market-feminy"><strong><CourseFee slug="hydra-facial"/></strong><span>Current scheduled fee · confirm taxes</span></td><td><strong>₹10,000</strong><span>Plus GST</span></td><td><strong>₹20,000</strong><span>Broader programme · confirm taxes</span></td></tr>
        {rows.map(row=><tr key={row.title}><th scope="row">{row.title}</th><td className="market-feminy"><span className="market-feature"><Check size={16} aria-hidden="true"/><span>{row.feminy}</span></span></td><td>{row.genetics}</td><td>{row.shringar}</td></tr>)}</tbody>
      </table>
    </div>
    <div className="market-comparison-bottom"><p id="market-comparison-note">Published pages checked 19 November 2026. Formats and scope differ; these are not identical products. “Not specified” means the cited page does not provide that detail. Confirm current fees and inclusions with each provider.</p><div className="market-sources"><span>Published sources:</span><a href="https://www.geneticskin.co/course_info.php?id=2" target="_blank" rel="noopener noreferrer">Genetics programme</a><a href="https://shringaracademy.in/" target="_blank" rel="noopener noreferrer">Shringar courses</a></div></div>
    <div className="market-cta"><div><strong>Want focused Hydra Facial learning?</strong><span>Explore the outline and ask about your starting level.</span></div><EnquiryLink course="Hydra Facial Masterclass" location="market_comparison">Ask about the course <ArrowRight size={17} aria-hidden="true"/></EnquiryLink></div>
  </div></section>;
}
