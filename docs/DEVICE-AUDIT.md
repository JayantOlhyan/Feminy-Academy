# Responsive UI audit — 18 November 2026

## Outcome

11 public pages were inspected in a Chromium browser across 32 viewport configurations, producing 352 layout checks. The final pass found no horizontal page overflow, tested text clipping, duplicate brand titles, or sibling collisions in the header, hero actions, course price/action rows and mobile enquiry dock.

This is responsive screen-size coverage, including Samsung-style phone, foldable and tablet sizes. It is not certification of every physical Samsung device, Samsung Internet release or operating system.

Raw results and dimensions are in `device-audit-results.json`. Captured examples are in `device-audit/tablet.jpg` and `device-audit/landscape-video.jpg`.

## Fixed issues

- At narrow tablet widths, the desktop header wrapped each navigation label and the CTA into multiple lines. Navigation now collapses at 900px; desktop links remain on one line. The brand and menu have compact-phone sizing and non-shrinking controls.
- The open navigation could exceed a short landscape viewport. Its own scroll area is now limited to the available dynamic viewport; the final WhatsApp action was verified reachable at 800×360.
- The video dialog reserved a fixed fraction of viewport height for media, then added controls and padding. On short screens, that could make controls unreachable. A flex-based stage now uses the remaining height while the close button and previous/next controls remain visible.
- The mobile enquiry dock did not account for orientation changes, open menus/dialogs or the visual viewport. It now updates on those states, hides during editing and on short screens, and reports its actual height to the document's scroll padding.
- Form focus previously forced a delayed smooth scroll while the device was also positioning the keyboard. That competing scroll was removed. Native focus scrolling is retained with scroll margins.
- The +91 telephone prefix had too little space before entered digits. Input padding is now 64px. Observed at 360px: prefix right edge 82px, entered text start 101px.
- Small WhatsApp action text used a green with insufficient normal-text contrast. Its default background now provides 6.48:1 white-text contrast; the existing hover colour provides 4.80:1. Placeholder text no longer uses 60% opacity.
- Policy pages had duplicate brand suffixes in browser titles and inconsistent heading/body sizing. Titles and policy typography are now consistent.
- Narrow course grids and tiny screens have safer column arrangements, min-width rules, button layouts and footer wrapping.
- The client-story description no longer assumes a hover-capable device.

## Interaction checks

- Landscape menu: final WhatsApp link visible between about 290px and 340px in a 360px-high viewport; menu scrolls internally.
- Landscape video dialog: top 12px, bottom 348px; close region ends at 80px; bottom controls end at 324px. All remain inside a 360px-high screen.
- Video next control changes the story; Escape closes the dialog.
- All five Hydra Facial curriculum sections opened without horizontal overflow.
- Mobile enquiry dock measured 71px; document scroll padding adjusted to 91px. Opening navigation hid the dock.
- Invalid local test input produced the expected accessible mobile-number error with `aria-invalid="true"`; no valid lead was submitted.

## Build and regression checks

- `npm run build`: passes, including TypeScript and the rendered placeholder/claim guard.
- `npm run lint`: passes with no ESLint warnings or errors. The existing Next.js command itself prints a deprecation notice.
- `node scripts/check-sales-behavior.mjs`: passes.
- `git diff --check`: passes.

## Coverage and limits

Viewport widths span 280–2560 CSS pixels; heights span 320–1440. The matrix includes compact/tall/wide phones, foldable-cover and open-fold widths, tablet breakpoints at 700/701 and 900/901, landscape phones/tablets, laptops, desktops and ultrawide screens.

Geometry checks supplement visual inspection; they cannot establish that every possible element, browser or device has no issue. Native Samsung keyboards, Samsung Internet rendering, iOS Safari, system font scaling, screen readers, hardware video decoding and actual 200% browser zoom were not tested on physical hardware. Reduced-width layouts were tested, but that is not the same as physical-device zoom testing. The prior reduced-motion emulation limitation remains.

Existing course facts, live lead services and analytics configuration are outside this UI audit. No change was made to the academy contact destination or business terms.
