import { LearningShowcase } from "./LearningShowcase";
import { LearningJourney, CourseRequirements, FormatComparison } from "./ConversionSections";
import { MediaGallery } from "./MediaGallery";
import { AcademyEvidence } from "./AcademyEvidence";
import { BookOpen, MapPin } from "lucide-react";
import { CourseCards } from "./CourseCards";
import { MobileEnrolment } from "./Interactions";
import { TeacherStory, ClientReviews, CommonQuestions, FinalInvitation } from "./Proof";

export function AcademyLanding() {
  return <div className="sales-page"><section className="landing-hero" id="sales-hero"><div className="sales-container landing-hero-copy"><span className="sales-caption">Beauty education with Sunita Rathee</span><h1>Turn your love for beauty<br />into <span>a skill of your own.</span></h1><p>Makeup, hair aur skin. Apni next chapter ki shuruaat kijiye,<br className="landing-desktop-break" /> with focused online learning or our Bahadurgarh academy.</p><div className="sales-hero-actions"><a href="#courses" className="sales-button">Find your course</a><a href="#stories" className="sales-text-link">Watch client stories</a></div><div className="landing-hero-note">Hindi / Hinglish classes <span>Online &amp; in person</span></div></div><MediaGallery mode="hero" /></section><div className="sales-principles"><div className="sales-container"><span><BookOpen size={18} aria-hidden="true" /> Hindi / Hinglish learning</span><span><MapPin size={18} aria-hidden="true" /> Online &amp; Bahadurgarh academy</span><span>Bridal artistry. Skin. Salon skills.</span></div></div><LearningJourney /><CourseCards /><LearningShowcase /><TeacherStory /><MediaGallery /><MediaGallery mode="stories" /><AcademyEvidence /><ClientReviews /><CourseRequirements /><FormatComparison /><FinalInvitation /><CommonQuestions /><MobileEnrolment /></div>;
}
