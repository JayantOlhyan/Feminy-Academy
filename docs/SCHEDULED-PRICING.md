# Scheduled course pricing — 19 November 2026

The academy owner authorised a genuine ₹100 increase after every three-day countdown. This supersedes the earlier request for a resetting timer with no underlying price change.

## Business schedule

- Shared anchor: 19 November 2026, 10:30 a.m. Asia/Kolkata.
- First increase: 22 November 2026, 10:30 a.m. IST.
- Hydra Facial: ₹3,000 initially, then ₹3,100; one-day class: ₹1,000 initially, then ₹1,100.
- Each subsequent 72-hour boundary adds another ₹100 to each listed online course. There is no maximum or end date in the approved recurring schedule. Offline training remains individually quoted.
- Schedule and baseline fees have one source: `lib/offer-pricing.ts`. Changing the anchor changes the business schedule, so it must not be moved with each deployment.
- The previously confirmed 500-enrolment allocation is a shared cap, not a remaining-seat counter. No enrolment inventory has been connected.

## Implementation

`GET /api/course-pricing` returns server time, current/next fees and next deadline with no-store caching. One page-level provider fetches this on load, rechecks every minute and on returning to the tab or reconnecting. Countdown ticks derive from server time plus monotonic elapsed time; device wall-clock changes and page refreshes do not start a new cycle. Completed intervals are calculated, not incremented in storage, so missed visits and server restarts do not skip increases.

Course cards, hero fees, enrolment panels and mobile enquiry bars use this same source. Countdown shows the next fee and an explicit IST deadline. Header displays the same schedule on every page. Deadline text does not announce every second to screen readers. No fabricated reference price or percentage discount is used.

Public pages remain statically cached; fresh prices load from the uncached endpoint. While prices load, if the request fails, or if JavaScript is unavailable, the page says “Confirm fee” rather than showing an obsolete fee. The deadline is not displayed until server time is available.

Current enrolment is a WhatsApp enquiry, not an automated checkout. Course-specific enquiries include the displayed fee. The academy team must charge the corresponding scheduled fee when completing enrolment. There is no external payment-provider price to update in this repository.

## Verification

- Six deterministic tests passed with `node --test scripts/offer-pricing.test.mjs`: shared deadline, one millisecond before boundary, exact boundary, ten missed cycles, no pre-launch price reduction, INR/IST formatting and invalid timestamp handling.
- Production build passed, including TypeScript/lint and 12 rendered-page integrity checks.
- Local API returned 200 and `Cache-Control: no-store, max-age=0`; initial/next prices matched both courses.
- Browser refresh and navigation preserved the 22 November 2026 05:00 UTC deadline (10:30 IST).
- Homepage showed ₹3,000/₹1,000; Hydra Facial showed ₹3,000/next ₹3,100; one-day showed ₹1,000/next ₹1,100. Course enquiry URL included the displayed fee.
- No horizontal page overflow at 280/360/1440px; 280px header logo and menu remained separate. Countdown visually reviewed on mobile and desktop. This is browser viewport testing, not physical-device certification.
