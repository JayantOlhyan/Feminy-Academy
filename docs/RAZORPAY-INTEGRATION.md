# Feminy website ↔ course platform integration

## Current result

The marketing website now prepares a handoff to the existing course application at https://github.com/builtbykabir/course. The course application owns sign-in, Razorpay orders, payment verification, purchased access and video playback. The marketing site must not create unrelated Payment Links or grant access by itself.

The learning app has not been deployed. The handoff is therefore disabled by default. No real purchase-to-lecture test has been completed. The merchant display name can remain Jayant Systems for test-mode work; that is separate from payment/access correctness.

The earlier standalone Payment Link implementation has been replaced. `POST /api/payments/link` returns HTTP 410 and cannot create payments. No Razorpay secrets are needed on the marketing site.

## Verified repository behavior

Read from the linked repository's main branch on 19 November 2026:

- `backend/src/routes/payments.ts`: authenticated order creation and payment verification; purchase lookup is scoped to the signed-in user.
- `backend/src/payments/service.ts`: snapshots amount/currency into a purchase, validates captured payment, and records paid status plus course entitlement in one database transaction. Duplicate finalization reuses the same purchase.
- `backend/src/routes/razorpay-webhook.ts`: raw-body signature verification, event deduplication and the same finalization service for `order.paid` and `payment.captured`.
- `backend/src/middleware/auth.ts`: course/video access requires an active per-user entitlement or admin role.
- `backend/src/routes/videos.ts`: only signs private playback URLs after the entitlement check.
- `frontend/src/components/checkout-button.tsx`: sign-in, Razorpay Checkout, server verification, then navigation to `/courses/:slug/content`; pending payments are polled.
- `backend/src/scripts/seed-demo.ts`: two courses and 18 lessons, with placeholder video object keys until actual videos are uploaded.

These are code findings, not proof that deployed authentication, payment, email or video services work. The connected GitHub account has read access and no push access to the teammate's repository; no remote changes or messages were made.

## Ownership

| Responsibility | Owner |
| --- | --- |
| Public landing pages, sales copy, course discovery | Marketing website |
| Student registration, login, sessions | Course platform |
| Charge amount, pending purchase, Razorpay order | Course platform backend |
| Payment verification, webhook, access grants | Course platform backend |
| Real video upload, private playback and progress | Course platform |
| Course slug mapping and handoff availability | Marketing website |

Proposed visitor flow: **Get this course → learning platform course page → sign in/create account → Razorpay test payment → verified purchase → lessons**. Returning students use the course platform's My learning page. Reuse the existing course app frontend for the initial test instead of rebuilding its auth, payment and video player in Next.js.

## Exact course mapping

| Marketing slug | Course platform slug | Initial fee |
| --- | --- | --- |
| `hydra-facial` | `hydra-facial` | ₹3,000 / 300000 paise |
| `one-day` | `one-day-masterclass` | ₹1,000 / 100000 paise |

The marketing site's `/checkout/:slug` route validates the platform's public `/api/courses/:platformSlug` response before offering its course URL. It blocks missing/unreachable courses, malformed responses, a non-INR currency and fee mismatches. It sends no student credentials or API keys in the handoff URL.

## Work needed from the course-platform teammate

1. **Deploy a test frontend and backend.** The frontend must proxy `/api` to its Express backend, preserving first-party authentication cookies. Configure `FRONTEND_URL`, `BETTER_AUTH_URL`, allowed auth origins and OAuth callbacks for that deployment. Do not point the marketing site directly at a backend-only hostname.
2. **Configure the platform's own private services.** PostgreSQL, Better Auth, verification email, private R2 storage and Razorpay test credentials belong in the course backend's environment. Upload at least one real lesson for each course. Demo lesson database records alone are insufficient.
3. **Align pricing before enabling sales.** The marketing schedule starts on 19 November 2026 at 10:30 IST, increases ₹100 every three days and first changes on 22 November at 10:30 IST. The backend currently uses a static `course.pricePaise`. Prefer implementing the schedule in the backend and exposing its effective quote to both apps. Never trust a charge amount supplied by the browser.
4. **Define quote/pending-order expiry.** The current backend reuses one pending purchase per student/course without a pricing deadline. Applying the schedule only to new database rows leaves old pending orders at stale amounts. Decide the approved validity window and enforce it server-side, while allowing legitimate captured payments to be reconciled. The marketing preflight cannot enforce the amount charged later after login and is not a substitute for this work.
5. **Preserve the selected course through authentication.** Email login uses router state, but Google sign-in and signup currently send students to `/purchases`. Carry a validated local return path through all login, signup, verification and OAuth flows; reject external/protocol-relative return URLs.
6. **Set checkout branding.** `backend/src/routes/payments.ts` currently sends `name: 'Course Website'`. Use the agreed academy display text for test checkout. Razorpay merchant-level naming restrictions remain separate and may override parts of the hosted experience.
7. **Configure the backend webhook.** Use the deployed backend's `/api/webhooks/razorpay` endpoint with the matching private secret, subscribing to `order.paid` and `payment.captured`. Use automatic capture and test-mode keys. Do not use the retired marketing-site webhook or the manually created Payment Link.

## Marketing site configuration after the test app is deployed

Set `COURSE_PLATFORM_URL` to the deployed **frontend origin** (for example, an actual approved `https://learn.…` hostname) and `COURSE_PLATFORM_HANDOFF_ENABLED=true`. Do not configure a guessed/nonexistent domain. Keep the flag false while deployment or credentials are missing. The URL must be an HTTPS origin with no path, credentials, query or fragment. HTTP localhost is permitted only in development.

The bridge checks pricing with a fresh server request on every checkout-page visit, with a five-second timeout and no redirect following. Until backend pricing is aligned, an increase will pause the handoff rather than silently link to the old fee. This guard does not prevent someone using a saved platform URL or an old pending order; production readiness requires the backend pricing work above.

## Joint test before launch

- New student signs up, verifies email and returns to the selected course. Also test Google login and existing-account login.
- Each course creates an authenticated Razorpay **test** order at the agreed amount; the captured payment grants exactly that user's entitlement and opens the matching lessons.
- Failed/dismissed/unverified payment grants no entitlement. A student without access cannot fetch content or a video playback URL, including by copying another student's IDs.
- Close the tab after payment. The signed webhook grants access, and the student can later find it under My learning.
- Duplicate verification/webhook delivery creates no duplicate purchase/access. Another account cannot verify or retrieve someone else's purchase.
- The scheduled fee changes at the same boundary in both apps; old pending orders follow the agreed quote-expiry policy.
- Real lecture playback supports seeking, saved progress and mobile playback. Confirm unauthenticated/unauthorized responses and private storage settings.
- Document expected handling of refunds and revoked access before production: the current repository explicitly excludes refund automation.

Keep real collection disabled until these pass. The manual ₹3,000 review link `https://rzp.io/rzp/9B1eVUlg` is not connected to student enrolment and must not be used for this end-to-end test.

## Local checks

`node --test scripts/course-platform.test.mjs scripts/offer-pricing.test.mjs`

`node scripts/check-sales-behavior.mjs`

`npm run type-check`

`npm run build`

Local tests use a mocked platform response. They cover course mapping, the fee-change boundary, missing configuration, malformed/unavailable responses, safe configured origins and refusal by the retired payment endpoint. They cannot verify the undeployed course app's external services.
