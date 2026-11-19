# Mobile stories and introductory offer — 19 November 2026

## Delivered

- Shared light offer strip beneath navigation on every page. Current copy: introductory offer, first 500 enrolments, linking to the fee comparison page.
- Academy owner confirmed the allocation applies across course offers. This is an allocation cap, not a live remaining-seat counter. Visitors are directed to confirm current availability. There is no enrolment inventory connected to this display.
- Homepage and course pages repeat the allocation near the course action/price. Genuine fees remain ₹3,000 for Hydra Facial and ₹1,000 for the one-day course.
- Testimonial section uses a three-group seamless horizontal carousel on mobile/tablet/desktop, driven by GSAP's ticker. Whole-pixel accumulation keeps motion working on browsers that round scroll positions. Media copies use only posters; video loads only in the opened player.
- Native touch/swipe browsing; interaction pauses automation. Previous/next buttons wrap continuously. Pause/resume control. Auto-motion stops for reduced motion, hidden document, offscreen rail, keyboard focus, mouse hover and opened media. Only the central group is exposed to assistive technology and keyboard tab order.
- Offer strip height is measured for anchor offsets and mobile-menu available height. Price values cannot split across lines; narrow screens stack their explanatory text.
- Light video dialog matches the theme; existing close, previous/next, native controls and focus restoration remain.

## Verification

Production build, TypeScript/lint and 12 rendered-page integrity checks passed. No added dependencies.

Browser checks:
- 280px header: no overflow, brand and menu separated; banner wrapping measured.
- 360px Hydra Facial: no overflow, genuine ₹3,000 rendered on a single line, allocation visible near price and in shared banner.
- 360px story rail: observed automatic position changes and wrap; ten next-button actions produced positions 1343, 1624, 776, 1057, 1338, 1619, 771, 1052, 1333, 1614, confirming repeat wrap without hitting an end. Explicit pause remained at 1306 across subsequent observations. Resume, video open and close exercised.
- Light video dialog: computed ivory background; native video controls enabled, close and navigation visible in phone screenshot.
- 712px: no page overflow, rail 641px / repeating group 1052px.
- 1440px: no page overflow, rail 1200px / repeating group 1292px.

These are browser viewport checks, not physical Samsung hardware certification. Native swiping and OS reduced-motion settings have not been exercised on physical devices. The earlier 352-case audit remains historical coverage; it was not rerun in full for this revision.

## Awaiting offer terms

The owner clarified that the proposed ₹10,000 comparison price would be inflated. That fabricated reference price and the resulting 70% claim are not published. A resetting three-day timer is not published. A fixed three-day offer requires genuine post-offer prices and a real end date; a clarification is pending. No conversion uplift is claimed.
