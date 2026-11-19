# Scheduled course pricing — 19 November 2026

The academy owner updated the schedule on 19 November 2026 to a genuine compounded 10% increase every three days. This supersedes the previous flat ₹100 increase. Timers appear only on the two online course landing pages, including their header bars; the offline academy, homepage and other pages have no timer.

## Business schedule

- Shared anchor: 19 November 2026, 10:30 a.m. Asia/Kolkata.
- First increase: 22 November 2026, 10:30 a.m. IST.
- Hydra Facial: ₹3,000 → ₹3,300 → ₹3,630; one-day class: ₹1,000 → ₹1,100 → ₹1,210.
- Each subsequent 72-hour boundary multiplies the baseline fee by another factor of 1.10. The displayed and compared result is rounded to the nearest paise; fractional rupees display two decimal places. There is no maximum or end date in the approved recurring schedule. Offline training remains individually quoted.
- Schedule and baseline fees have one source: `lib/offer-pricing.ts`. Changing the anchor changes the business schedule, so it must not be moved with each deployment.
- The previously confirmed 500-enrolment allocation is a shared cap, not a remaining-seat counter. No enrolment inventory has been connected.

## Implementation

`GET /api/course-pricing` returns server time, current/next fees and next deadline with no-store caching. One page-level provider fetches this on load, rechecks every minute and on returning to the tab or reconnecting. Countdown ticks derive from server time plus monotonic elapsed time; device wall-clock changes and page refreshes do not start a new cycle. Completed intervals are calculated, not incremented in storage, so missed visits and server restarts do not skip increases.

Course cards, hero fees, enrolment panels and mobile enquiry bars use this same source. Countdown shows the next fee and an explicit IST deadline. The shared header and countdown component both restrict timers to `/courses/hydra-facial` and `/courses/one-day`, including trailing-slash variants. Deadline text does not announce every second to screen readers. No fabricated reference price or percentage discount is used.

Public pages remain statically cached; fresh prices load from the uncached endpoint. While prices load, if the request fails, or if JavaScript is unavailable, the page says “Confirm fee” rather than showing an obsolete fee. The deadline is not displayed until server time is available.

Course checkout hands off to the separate learning platform, whose authoritative backend charge must use the same percentage schedule. A fresh preflight compares integer paise and pauses checkout for a mismatch. The platform is not yet deployed; see `RAZORPAY-INTEGRATION.md`.

## Verification

Current deterministic tests cover the shared deadline, exact and pre-boundary prices, multiple compounded cycles, paise rounding/formatting, invalid timestamps, the two-page timer allowlist and platform price matching. Run `node --test scripts/offer-pricing.test.mjs scripts/course-platform.test.mjs` and `npm run build`.
