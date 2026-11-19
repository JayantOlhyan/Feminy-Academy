# Reference-led landing implementation — 19 November 2026

## Scope and final behaviour

Implemented on `/`, `/courses/hydra-facial`, `/courses/one-day`, and the associated `/offline-academy` landing. Online course pages work as self-contained destinations for paid traffic: course identity, fee, direct enquiry, course preview, audience, curriculum, trainer, proof, prerequisites, alternatives, closing fee panel and FAQs are all present on the course URL.

- Homepage: hero and wide work rail → illustrated learning steps → course choices → interactive learning-plan showcase → teacher/portfolio → looping client stories and evidence → preparation → format comparison → closing course fees → FAQs.
- Online course pages: specific hero/current fee/action/next price → illustrated steps → course-specific interactive outline → fit and learning topics → full expandable curriculum → trainer/client evidence → requirements → format comparison → pale-gold closing fee panel → course-specific FAQs.
- Academy page: the existing counselling form, studio gallery and trainer story are retained, with illustrated steps, academy-specific preparation and learning-format comparison added.

The visual adaptation uses real supplied images, ivory/lilac/pale-gold surfaces, magenta actions, rounded image frames, small desktop hover lift, responsive grids and existing GSAP/reduced-motion conventions. No new package was added.

## Components and content

`ConversionSections.tsx` supplies reusable journey, preparation, comparison and closing-enquiry sections. `LearningShowcase.tsx` renders the actual curated curriculum as interactive topic controls, with a homepage course switch. The full curriculum remains available as disclosures on each course page. `funnel.css` contains the layout layer, imported after the identity styles.

Hydra Facial's hero now shows the actual teacher portrait instead of a bridal appointment. Its headline and audience describe the specific subject. The one-day page has its own course focus, topic list, requirements and FAQs. Generic enrolment steps have been replaced in these funnels by the visual sequence; their older component remains available to other consumers.

Current/next fees, countdown, enrolment bar and WhatsApp quote continue to use the shared pricing provider. Direct ad attribution still reduces header navigation to the enquiry action and is retained in the enquiry links. No test enquiry was sent.

## Evidence boundaries

The supplied video manifest contains four salon/client videos, not verified teaching-demo footage. These remain labelled as client experiences. The new learning preview is an interactive curriculum outline, not a pretend video lesson. Actual lesson footage can replace or complement this preview when supplied. Unconfirmed recording periods, certificate rules, kit contents and support schedules are not presented as included guarantees. The closing panel points visitors to confirm those details before enrolment.

The software reference's roadmap, invented feature bundle and payment-provider mechanics were not copied into the academy product. A neutral comparison of Feminy's actual learning formats serves the comparison section instead. Supplied archived reviews and trainer evidence are retained with their context.

## Verification

- Production build passed with TypeScript/lint and the 12-page rendered-claim guard.
- Existing six scheduled-pricing tests passed.
- Browser matrix: four pages × six widths = 24 checks. Widths 280, 360, 412, 712, 901 and 1440 CSS pixels. All measured widths matched the requested viewport; no page horizontal overflow or clipped checked new headings/buttons. Raw results: `landing-responsive-results.json`.
- Homepage course switch changed the outline from Hydra Facial to one-day content; topic selection updated the corresponding content and expanded state. Course-specific topic selection was also exercised on mobile.
- Course FAQ expanded and showed the scheduled-price explanation.
- Direct Facebook-style attributed entry at 360px showed the reduced header and the main enquiry button in the first 800px screen (button top approximately 727px). At 280px, brand and enquiry action remained separated with no horizontal overflow.
- Closing Hydra Facial panel showed ₹3,000, next ₹3,100 and the shared 22 November 10:30 IST deadline; its enquiry URL contained the current fee.
- Desktop visual review covered hero, visual steps, interactive outline, preparation, comparison and closing panel. Mobile hero and interactions were reviewed. Source images and text reflow were inspected; no physical-device certification or conversion uplift is claimed.

## Operational limitation

Enrolment remains a WhatsApp conversation or existing academy counselling form. This work does not add a payment gateway or student portal, and course fees must still be honoured by the academy team when completing enrolment.
