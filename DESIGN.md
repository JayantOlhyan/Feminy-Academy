# Feminy Academy — Design System (DESIGN.md)

Single source of truth for visual identity, typography, tokens, and component guidelines for Feminy Academy.

## Offer spotlight and sourced table: 19 November 2026

Header announcement now uses contextual fee hierarchy, segmented countdown and one magenta action on pale gold. `app/offer.css` is loaded after the funnel layer. Homepage and Hydra Facial add a real comparison table immediately after preparation, highlighting Feminy and citing two published provider offers with format/scope differences. See `docs/OFFER-AND-MARKET-COMPARISON.md` for sources and verification.

## Reference-led landing implementation: 19 November 2026

Homepage and both online course funnels now implement the researched selling sequence: illustrated steps, interactive curriculum preview, format comparison, preparation cards and a pale-gold closing fee/enquiry panel. Course pages are self-contained ad destinations with specific copy and FAQs. The academy landing also uses the new steps, requirements and comparison. Actual client videos remain correctly labelled; the learning preview uses real outline data. `app/funnel.css` is the final layout layer. See `docs/LANDING-IMPLEMENTATION.md` and the 24-case viewport results.

## Genuine recurring price schedule: 19 November 2026

The owner authorised actual ₹100 fee increases every three days. A server-anchored countdown now shows the real next price/deadline; prices update consistently across cards, course pages and mobile enquiry bars. First increase: 22 November 2026, 10:30 a.m. IST. See `docs/SCHEDULED-PRICING.md` for operation, checks and the WhatsApp enrolment boundary. This supersedes the pending genuine-offer-terms note from the prior revision.

## Mobile stories and offer strip: 19 November 2026

Testimonials now use a seamless looping rail on mobile and desktop, with pause, native swipe and manual arrows; this supersedes the earlier no-mobile-auto-motion restriction for this rail only. Reduced-motion still disables automation. Hero rail behaviour remains unchanged. The shared introductory-offer strip and light media dialog follow the light theme. See `docs/MOBILE-STORIES-AND-OFFER.md` for allocation wording, checks and pending genuine promotion terms.

## Light theme correction: 19 November 2026

User direction: light colours only. This supersedes the dark navbar, teacher, invitation and footer surfaces from the earlier refresh. `app/brand.css` now uses ivory #fffefb for the navigation and hero, lilac #f5f0fa for the teacher/footer, butter #fcf7dd for the invitation, and white/neutral content surfaces. Magenta remains the primary action accent; gold is an accent, with darker gold text for readability. Dark text is retained for accessibility. Social previews and browser theme colours match the light site.

Conversion refinement: descriptive enquiry labels, visible fee comparison, and an explanation of what the WhatsApp action does. Existing real client stories, portfolio, course prices and practical next steps are retained. See `docs/LIGHT-THEME-RATIONALE.md` for evidence and verification. No conversion uplift has been measured.

## Brand refresh: 19 November 2026

This revision supersedes the earlier wine palette and JPEG presentation. The original supplied JPEG remains intact. A transparent PNG derivative preserves the crest's F, FEMINY lettering, wings, shield and magenta/gold identity; it is a background-removal derivative, not a pixel-identical master. Header and footer use its smaller transparent PNG export directly, avoiding image-conversion failures.

`app/brand.css` is the final identity layer: magenta #c3157e, gold #f0e477 and contrasting plum #281322. Page surfaces are white and warm neutral rather than pink. White on magenta is 5.63:1; gold on plum is 13.32:1; ivory navigation text on plum is 16.75:1.

## Responsive hardening: 18 November 2026

Navigation collapses at 900px. Short-screen menus scroll internally; media dialogs allocate remaining height after controls. Mobile enquiry docks account for overlays, editing and viewport changes. Normal-text WhatsApp contrast is now 6.48:1. Policy typography and titles are consistent. See `docs/DEVICE-AUDIT.md` and the saved 352-case result matrix for coverage and limitations.

## Current visual direction: 17 November 2026

Jayant explicitly requested softer rounded corners, friendlier typography, the exact supplied logo, GSAP motion and Scrollcraft. This revision supersedes the older typography, mark, radius and motion restrictions below. Historical specifications are retained for context.

- Display: locally hosted Bricolage Grotesque Bold, 700. Body/UI: locally hosted Work Sans, 400/700, with system script fallbacks. Fonts and OFL licenses are under `public/fonts/feminy`.
- Identity: use the exact supplied pink-and-gold raster crest at `public/brand/feminy-academy-logo.jpg`, uncropped and unmodified. Do not substitute the old generated F mark in the header/footer.
- Radii: media/cards 24px desktop, 20px mobile; inner surfaces 16px/12px; buttons and filters pill-shaped. Logo artwork itself is not rounded or redrawn.
- Styling overrides: `app/soft.css` loaded after the existing shared styles. Existing wine colour and readable contrast retained.
- Motion: one GSAP controller for anchor navigation and section/hero choreography; native wheel and touch scrolling. Gallery glide is desktop-only, pausable and suspended while interacting, offscreen, in a hidden tab or behind a dialog. Hover/focus video previews are muted, explicitly engaged and disabled for touch/reduced-motion.
- Mobile has no parallax or automated rail glide. Reduced-motion keeps all content visible with immediate navigation and manual video playback.
- Scrollcraft refinement brief and score live at `../scrollcraft/builds/feminy-soft/BRIEF.md`. The existing Next.js architecture and conversion logic remain in place.

---

## 1. Positioning & Strategy

- **Artifact**: Direct-response educational landing page & academy portal.
- **Audience**: Aspiring beauty professionals, salon owners, and home practitioners in Tier 2/3 cities (Haryana / NCR / North India) visiting from mobile Instagram/Facebook ads on 4G.
- **StoryBrand Positioning**:
  - **Hero**: The Student (seeking financial independence and respect).
  - **Guide**: Sunita Rathee (15+ years experience, empathy + authority, former software engineer).
  - **Plan**: 3 simple steps (Free demo class → Choose online/offline → Practice, learn & get certified).
- **Core Aesthetic Essence**: Dignified, grounded, editorial warmth. Rejecting generic AI SaaS kits (no purple gradients, no icons-in-colored-circles, no cream+gold slop, no 16px radius cards everywhere).

---

## 2. Typography

Two Google Fonts loaded via `next/font/google`:

1. **Display / Headings & Large Numerals**: `Bodoni Moda` (`--font-bodoni`)
   - Weights: 500, 600
   - Subsets: `latin`
   - `display: "swap"`
   - Usage: Strictly for `h1`, `h2`, and big numerals (≥28px). **Never** used for body, buttons, badges, forms, or any text below 28px.
2. **Body / Interface / Headings 3+**: `Mukta` (`--font-mukta`)
   - Weights: 400, 600
   - Subsets: `latin`, `devanagari`
   - `display: "swap"`
   - Usage: All body copy, labels, buttons, inputs, captions, and `h3`.
   - Note: Mukta runs slightly compact; default mobile body is set to 17px (`1.0625rem`) with line-height 1.6 to ensure readability comparable to ≥16px Inter.

### Type Scale (Fluid via clamp())
- **h1**: `clamp(2.125rem, 5vw + 1rem, 4rem)` (34px → 64px), line-height: `1.05`, letter-spacing: `-0.01em`
- **h2**: `clamp(1.75rem, 3.5vw + 0.8rem, 2.75rem)` (28px → 44px), line-height: `1.1`
- **h3**: `clamp(1.25rem, 1.5vw + 0.9rem, 1.5rem)` (20px → 24px), font-weight: 600 (Mukta)
- **body**: `1.0625rem` (17px), line-height: `1.6`, font-weight: 400
- **small / meta**: `0.875rem` (14px), line-height: `1.5`
- **eyebrow**: `0.8125rem` (13px), font-weight: 600, letter-spacing: `0.12em`, uppercase
- **max line length**: `65ch`, with `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

---

## 3. Color Tokens & Contrast Matrix

Palette adheres to the **70-20-10** balance rule:
- **~70%**: `--paper` / `--paper-2` (Backgrounds)
- **~20%**: `--ink` (Typography & Dark Feature Section)
- **≤10%**: `--accent` (Primary conversion actions)

| Token | Hex | Role | Contrast vs Context | WCAG AA Status |
| :--- | :--- | :--- | :--- | :--- |
| `--paper` | `#FFFFFF` | Default surface & page background | N/A | Base |
| `--paper-2` | `#F2EFEC` | Alternate section background | N/A | Base |
| `--ink` | `#161314` | Primary body & heading text, dark section bg | 18.46:1 on paper / 16.12:1 on paper-2 | Pass (AAA) |
| `--ink-muted` | `#5C5557` | Secondary text, captions, metadata | 7.26:1 on paper / 6.34:1 on paper-2 | Pass (AAA) |
| `--line` | `#E4DEDA` | Structural borders, card outlines | N/A (structural) | Subtle separator |
| `--accent` | `#7A1F3D` | Primary action button, hero CTA, links | 10.04:1 with white text | Pass (AAA) |
| `--accent-strong` | `#5A1229` | Active/hover button background | 13.52:1 with white text | Pass (AAA) |
| `--gold-line` | `#B8915A` | Decorative hairlines, story dividers ONLY | N/A (non-text decorative) | Strictly non-text |
| `--gold-text` | `#8A6A2F` | Gold-tinted text on light backgrounds | 5.02:1 on paper | Pass (AA ≥4.5:1) |
| `--on-ink` | `#F2EFEC` | Headline/body text inside dark guide section | 16.12:1 on ink | Pass (AAA) |
| `--on-ink-muted` | `#B9B0AC` | Secondary text inside dark guide section | 8.68:1 on ink | Pass (AAA) |
| `--whatsapp` | `#1F9D55` | Secondary WhatsApp button background | 3.49:1 (Large button target) | Large UI |
| `--success` | `#2F7D5B` | Status, confirmation notices | 4.88:1 on paper | Pass (AA) |

### Prohibited Color Patterns
- NO gradients across buttons or text.
- NO purple/indigo AI slop palettes.
- NO glassmorphism, blurred backdrop blobs, or neon glows.
- NO gold used for body text or unverified contrast pairings.

---

## 4. Spacing, Radius, and Shadows

### Radius Scale
- `rounded-card` / `rounded-input`: **4px** (`0.25rem`). Replaces previous 16px pill-shaped cards.
- `rounded-full`: Used **only** for primary call-to-action buttons (`Button variant="primary"` or `variant="whatsapp"`).

### Spacing Scale
- Token increments: `4px` (`0.25rem`), `8px` (`0.5rem`), `12px` (`0.75rem`), `16px` (`1rem`), `24px` (`1.5rem`), `32px` (`2rem`), `48px` (`3rem`), `72px` (`4.5rem`), `112px` (`7rem`).
- **Section Padding**:
  - Mobile: `72px` (`4.5rem`) top & bottom.
  - Desktop: `112px` (`7rem`) top & bottom.

### Elevation & Shadows
- Flat by default. Clean 1px border (`var(--line)`).
- Exactly one subtle elevation token reserved exclusively for the primary form card:
  - `shadow-form`: `0 8px 24px -4px rgba(22, 19, 20, 0.08)`

---

## 5. Motion Tokens & Constraints

- Budget:
  1. Proof strip numeral count-up (runs once on scroll enter).
  2. Plan hairline connecting line drawing in on enter.
  3. Single pinned desktop story sequence in Guide section (`≥1024px`).
  4. Subtle reveal on enter for section headings: `opacity: 0 -> 1`, `translateY: 16px -> 0px`, `450ms`, `power2.out`.
- Mobile (<768px): All pinned triggers strictly disabled; static clean layout with direct readability.
- Accessibility: `prefers-reduced-motion` unconditionally disables all animation and renders final states immediately.
- Zero scroll jacking, smooth-scroll hijacking, text-splitting, or trailing cursor blobs.

---

## 6. Brand Mark, Favicons & Vector Suite

To ensure authentic visual identity without AI slop, Feminy Academy uses a bespoke vector brand mark:
- **Geometry**: An editorial serif capital **F** with balanced bilateral serifs, framed in an antique gold hairline (`#B8915A`), accented with the signature **Bindu** (cosmetic precision dot) above the crossbar.
- **Colorway**: Deep wine tile (`#7A1F3D`) with pure white letterform (`#FFFFFF`) and antique gold hairline accents.
- **Implementations**:
  - `components/ui/Logo.tsx`: Reusable `<Logo variant="full|mark|wordmark" theme="light|dark|gold" />`.
  - Header & Footer: Complete brand lockup pairing the vector mark with editorial typography.
  - Certificate Preview: Official certificate header lockup + gold medallion seal (`theme="gold"`).
- **Favicon Suite**:
  - Vector: `app/icon.svg` and `public/icon.svg` (SVG icon, infinite sharpness).
  - Multi-resolution ICO: `public/favicon.ico` & `app/favicon.ico` (packed with 16x16, 32x32, 48x48 bitmaps for legacy browsers).
  - Apple Touch Icon: `public/apple-icon.png` (180x180) and `public/apple-touch-icon.png`.
  - Android & Web Manifest: `public/icon-192.png` and `public/icon-512.png` via `app/manifest.ts`.
