# Local landing-page preview — 17 November 2026

## Latest refinement

The preview now uses the supplied crest, Bricolage Grotesque/Work Sans, rounded surfaces, GSAP navigation and media motion, pausable gallery movement and muted desktop hover previews. Full playback is still explicit. The Scrollcraft brief and detailed verification are at `./scrollcraft/`. Reduced-motion handling is implemented, but browser preference emulation could not be verified. Earlier verification notes below describe the first local version.

The working copy is in this workspace's `website` directory. Nothing was committed, pushed or deployed. The original Desktop project and source media were left untouched.

## Review locally

- Home: http://127.0.0.1:3000/
- Hydra Facial: http://127.0.0.1:3000/courses/hydra-facial
- One-day class: http://127.0.0.1:3000/courses/one-day
- Academy: http://127.0.0.1:3000/offline-academy

To restart this production preview after stopping it, run `npm start -- --hostname 127.0.0.1 --port 3000` from `website`. After editing source files, build again first with `npm run build`. For active editing, stop the production server and use `npm run dev` instead. Do not build while the development server is running: both use `.next`.

## Changes

The homepage borrows the reference's central offer and immediate media rail, adapted to Feminy's existing typography and wine palette. Existing course options, teacher story, reviews, joining process and WhatsApp enquiries remain. New shared components add a filtered portfolio, native image/video modal, click-to-load client videos, studio tour and archived professional evidence.

The two online course pages now include the course name above the headline, client videos and professional background evidence. The academy page adds a real studio tour and client stories.

Media comes from the locally downloaded Google Drive asset pack, specifically its optimized `web-ready` directory. `content/media.json` indexes 17 gallery images and 4 video stories with posters. Three additional evidence images are referenced by `AcademyEvidence.tsx`. Source-relative names are preserved under `public/assets`. No direct Google Drive embed or live Drive connection is required. Existing selected portraits and course photographs are retained. Unused duplicates, low-quality screenshots and obsolete offers are excluded.

Videos are absent from the document until a visitor chooses play. A native dialog provides a focus trap, Escape dismissal, next/previous controls and focus restoration. Comparison images preserve both sides of the supplied collage.

## Verification

- Production build passes; all 25 generated routes complete.
- Build-time placeholder/claim check passes on 12 rendered HTML pages.
- Lint passes with no ESLint warnings or errors (the Next.js lint command itself emits its existing deprecation notice).
- Type checking passes.
- Existing sales checks pass: attribution persistence, correct WhatsApp number/message, reference propagation and deferred analytics queue.
- All 25 media paths in the JSON manifest exist.
- Four landing pages checked at 360, 768 and 1440 pixels: one H1, no horizontal page overflow, no video elements before activation.
- Browser interaction verified: opening a video, advancing to the next video, closing it, changing the portfolio filter, opening an image and closing with Escape.
- Browser console inspection returned no captured errors for the checked preview.
- Desktop/mobile screenshots saved under `../previews/localhost-landing/`.

These checks do not establish a fresh Lighthouse score or real-device performance. Client video audio was not independently transcribed or assessed.

## Content still requiring owner confirmation

- No identifiable Hydra Facial teaching demonstration is in the inspected archive. Its existing salon photo remains explicitly captioned as such.
- Listed fees and course outlines are inherited from the supplied project. Current dates, final syllabus, access, kit costs, certificate and refund terms still require academy confirmation.
- Salon reviews and client videos support service experience; they are not labelled as student outcomes.
- Live lead delivery and analytics require configured services and separate end-to-end verification. No real lead was submitted during this work.
- Existing dependencies still use the prior workspace's node_modules link; run `npm ci` if moving this source elsewhere.
