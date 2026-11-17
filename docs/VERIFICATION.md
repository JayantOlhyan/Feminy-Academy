# Redesign verification — 16 November 2026

## Passed

- `npm run build`: production build completes, all 25 generated Next.js outputs complete, TypeScript validation passes.
- Existing production integrity check passes for 12 rendered HTML pages: no blocked placeholders or unverified statistical claims detected by that check.
- `node scripts/check-sales-behavior.mjs`: paid Instagram attribution, persistence through internal navigation, correct WhatsApp destination, exact custom enquiry message, reference ID retention, placeholder-free one-day enquiries, single analytics initialisation and early-event delivery to Meta and GA queues.
- Local HTTP checks: all 11 visitor pages return HTTP 200; an unknown course slug returns HTTP 404.
- Local lead API: malformed phone rejected with HTTP 400. Valid synthetic enquiry with no configured durable storage returns HTTP 500 rather than false success.
- Browser: homepage at 390 px, 820 px and 1440 px widths; course layout at 320 px and 390 px. Observed document width equals viewport width at those sizes.
- Browser: mobile navigation opens and Escape closes it; course discovery links navigate; curriculum and FAQ disclosures expand; sticky mobile action appears after the hero.
- Browser: paid-course header reduces navigation, selected-course WhatsApp enquiry points to +91 90176 43392, and the reference ID survives hydration. No WhatsApp message was sent.
- Browser: empty enquiry shows validation; synthetic valid local enquiry shows the storage failure and a working WhatsApp fallback link, with no false confirmation.
- Final homepage browser error log queried: no error entries returned.
- Final source changes reviewed against the supplied original. Original Desktop project remains unchanged.

## Fixed during verification

- Build originally depended on downloading Google Fonts. Retained the original project’s font subsets locally so the production build succeeds without that network dependency.
- Course-view events could be dropped before delayed analytics initialisation; events now queue and are flushed once.
- Paid Instagram links were not recognised by the original Meta-only landing detection; supported paid Instagram/Facebook source combinations now select the focused header.
- Stored references could differ between server markup and initial browser markup, leaving enquiry links without attribution. Initial link markup is now deterministic; the reference is attached after mount and verified in the browser.
- The existing WhatsApp helper ignored custom messages for general/offline enquiries. It now respects them and removes an unconfirmed fixed offline-course duration.
- Querying a thank-you URL previously displayed enrolment confirmation without payment evidence. The follow-up page no longer claims a completed purchase.

## Limits and launch dependencies

Local health response shows MongoDB, Sheet webhook, Meta CAPI and Meta Pixel are not configured. The form’s recoverable failure is verified; successful durable storage and live event delivery are not verified in this environment. GA4 also requires deployment configuration. No external messages or payments were made.

The site supports enquiries. It does not implement payment checkout, verified purchase webhooks, login, protected lessons, learning progress or automatic certificates. Those future operations are documented in the workflow.

Current prices remain from the supplied edited code. Final syllabi, batch dates, format, access, certificate and refund terms require academy confirmation. Existing supplied legal content was retained and has not been independently validated.

Portfolio images are professional work, not learner evidence. The three testimonials are archived 2017–2018 salon client reviews and are explicitly labelled as such. They are not verified course reviews. A real Hydra Facial teaching sample and recent learner proof remain content priorities.

No claim is made of measured conversion improvement, a completed accessibility audit, physical-device WhatsApp behaviour, live deployment, a Lighthouse score or performance under a throttled mobile network. Reduced-motion support and visible focus styles are implemented; further assistive-technology testing can be done before launch.

The existing Node warning about typeless package metadata in the placeholder-check script remains non-blocking. The source archive excludes dependencies and build output; install dependencies with `npm ci` before building elsewhere.

## Saved visual evidence

The workspace `previews` folder contains the desktop homepage, mobile homepage, mobile course page and mobile enquiry fallback. These are browser captures of the finished production build.
