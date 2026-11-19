# Offer spotlight and published course comparison — 19 November 2026

## Offer spotlight

Replaced the equal-weight announcement text with a contextual offer block: first-500-enrolments badge, prominent current course fee, segmented days/hours/minutes/seconds countdown, exact IST deadline and magenta action. Homepage/other pages show the lowest current online course fee; online course pages show their specific current and next fees. Course action scrolls to the existing enrolment section; other-page action opens course-fee comparison. The shared pricing schedule remains unchanged.

Light pale-gold background, ivory digit cells and brand-magenta price/action create hierarchy without introducing a dark panel, flashing or attention-stealing animation. Header-height measurement still accounts for the actual offer size. The timer's visual segments are hidden from assistive technology; the existing timer label exposes the full remaining time without announcing every second.

## Market comparison

A semantic, sourced differentiation table follows `#before-you-join` directly on the homepage and Hydra Facial landing. Feminy's column is tinted lilac and its actual scheduled fee is prominent. Two other providers are named, not anonymised or assigned invented fees.

Published sources checked on 19 November 2026:

- Genetics, https://www.geneticskin.co/course_info.php?id=2 — HydraFacial technician programme, ₹10,000 plus GST; online study, hands-on practice and a one-day workshop.
- Shringar Makeup Academy, https://shringaracademy.in/ — Skin Care / Beauty Therapy programme, ₹20,000; broader beauty-therapy classroom training including HydraFacial. It is not an identical standalone online course.

The table compares subject focus, delivery, machine understanding, preparation, treatment learning, in-person practice and access/support/certificate information. Feminy entries come from its existing published outline; unconfirmed batch arrangements remain explicitly subject to confirmation. Competitor advantages and broader scope are retained. Not specifying a feature on a cited page is not treated as evidence that the provider excludes it. No fabricated cross marks, fake reference price, superiority guarantee or saving percentage is added.

The one-day course retains its existing format comparison rather than showing a Hydra Facial comparison as if it were the same subject. Source links, checked date, different-product qualification and fee/tax details are visible beneath the table. Published third-party fees should be rechecked when changing this content; they are date-stamped, not a live feed.

## Validation

- Production build passed, including TypeScript, lint and 12 rendered-page claim checks.
- Fifteen browser cases: homepage, Hydra Facial and one-day at 280, 360, 700, 901 and 1440px. All measured widths matched, no page horizontal overflow and no clipped offer container. Results: `offer-comparison-results.json`.
- Hydra Facial table follows the preparation section directly. Its fee row displayed ₹3,000 / ₹10,000 plus GST / ₹20,000 with broader-course scope noted.
- Table region at 360px: 318px viewport with 700px contents; keyboard right-arrow scrolling moved it to 80px while page overflow remained false.
- Course spotlight action reached `#enrol`; its section started about 19px below the measured sticky header.
- Desktop offer/table and phone offer were visually reviewed. This is browser viewport testing, not physical-device certification.

## Persistent footer and stronger differentiation

The course action has moved out of the top offer into a fixed footer bar on the homepage, both online course pages and academy landing. It appears from the first screen on desktop and phones, shows the current fee, and names WhatsApp as the enrolment channel. Homepage opens course selection; online course actions open a course-specific WhatsApp enquiry; academy opens training counselling. This supersedes the earlier spotlight action placement above.

The dock reserves measured bottom space so legal/footer links remain reachable. It hides for active form entry, video/media overlays, open mobile menus and viewports shorter than 480px. Header offer is now a compact two-part layout. At 360px, its total sticky header height reduced from about 240px to 180px.

Comparison now starts with three evidence-based Feminy strengths: the current listed-fee difference against the cited ₹10,000 programme (tax/format differences explicitly qualified), focused Hindi/Hinglish learning, and direct academy enquiry. The fee difference is calculated from the current scheduled fee, not hardcoded; if Feminy's future fee no longer falls below ₹10,000, that savings-style message is replaced. A separate language row distinguishes known language from unspecified competitor details. Rows that require batch confirmation use an information icon rather than a checkmark implying guaranteed inclusion. Other providers' information remains unchanged; no data was manipulated to assert universal superiority.

Validation: final production build/type/lint/rendered-page claim checks passed. Sixteen browser cases covered four landing pages at 280/360/712/1440px, all without page overflow, dock clipping or overlap between dock copy and button. Results: `footer-dock-results.json`. At the bottom of the academy page, the refund link remained about 28px above the dock. Form phone focus hid the dock, blurring restored it, opening a client video hid it, and an 800×400 viewport suppressed it. Current fee and course-specific WhatsApp target were checked without sending an enquiry.
