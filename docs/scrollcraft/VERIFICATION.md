# Verification: softer Feminy refinement

## Delivered

- Bricolage Grotesque headings and Work Sans body/UI, self-hosted with OFL licenses.
- Rounded media/cards (24px desktop, 20px mobile), inner surfaces (16px/12px), pill actions/filters and softer section colours.
- Exact supplied JPEG crest in header/footer and structured metadata. Browser/app icons are mechanical resizes of that artwork; share image embeds the same JPEG. SHA-256 source and copied original both equal `15df45a5bf0d3788ef6da85a067e3ea193df66b1279b88121e440066b6127c3e`.
- Existing GSAP dependency used for anchor navigation, entrance/reveal motion, photographic depth, manual rail navigation, automatic gallery glide, preview crossfades and lightbox arrival. Native wheel/touch scrolling remains native.
- Pausable gallery motion, suspended on hover/focus, user touch/wheel interaction, hidden/offscreen state and open gallery dialog.
- Muted hover/focus previews on capable pointers; full playback remains a separate explicit click. Preview failures retain the real poster.
- Portfolio category changes update the relevant learning enquiry. The WhatsApp message for Hair contains Hair training and the existing academy number.

## Evidence observed in the browser

- Header logo references the supplied crest via Next image optimization.
- Computed heading font is Bricolage Grotesque; computed media radius is 24px on desktop.
- Gallery travelled from its initial position and exposes Pause/Resume controls. Clicking Pause produced Resume gallery motion.
- Focus on a video card created one preview video and its opacity reached 1; explicit click opened the native dialog. Escape closed it.
- Hair portfolio selection produced the expected hair-training WhatsApp URL.
- Primary course link settled with the course section about 115px below the viewport top on desktop.
- On 360×640, primary action bottom was about 494px; no horizontal overflow. Automatic gallery motion controls were absent at this size.
- Mobile menu opened, its course link closed it, and the course section settled about 98px below the top.
- Four landing routes checked at 360, 768 and 1440 pixels: one H1 each, no horizontal page overflow.
- Opening, course destination and mobile compositions visually inspected. Screenshots saved under `../../../previews/soft-motion/` (workspace previews directory).

## Automated checks

- Production build, including TypeScript and rendered placeholder/claim guard, passes.
- Lint passes with no ESLint warnings/errors; the existing next lint command reports its own deprecation notice.
- Existing attribution/WhatsApp/deferred analytics regression checks pass.
- No new package dependencies or framework changes.

## Scope and limitations

This is a refinement of the existing Next.js site, not a replacement with the skill's standalone HTML engine. The copied engine is preserved unchanged for provenance and is not loaded alongside GSAP. The local fingerprint registry had no earlier entries. The chosen structure retains the existing editorial gallery; competing cinematic, split-stage and continuous-world grammars would change the requested course-reading experience.

No generated imagery or provider spend. Optional doctor warnings concerned an absent generation key, playwright-core and WebP encoder; none was needed for this supplied-media/browser-tool path.

Reduced-motion code was reviewed: GSAP positioning/glide/hover previews are gated, navigation duration becomes zero, and CSS transitions/animations are disabled. Browser preference emulation stalled and could not be visually verified. No claim is made that reduced-motion browser testing passed. Actual iPhone decoder, touch behaviour and Low Power Mode were not tested.

No fresh Lighthouse or conversion experiment was run. More readable/friendlier typography is an art-direction choice; no unsupported psychological or conversion benefit is claimed. GSAP raises the reported landing-page First Load JS from about 119kB to 167kB; the new fonts also add first-visit transfer cost. Font files are local and cacheable.

Existing business-data confirmation and live lead-delivery limitations remain. Nothing was committed, pushed or deployed.

## Feel check

Observed opening: approachable. Work rail: curious. Courses: clear. Teacher/evidence: steady. Enquiry: deliberate. The new font reduced the formal magazine character of the old Bodoni headline. The compact mobile composition needed a smaller type scale and vertically stacked actions; both were applied. Reduced-motion feeling remains unverified.
