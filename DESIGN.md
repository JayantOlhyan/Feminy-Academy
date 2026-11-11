# Feminy Academy — Design System (DESIGN.md)

Single source of truth for visual identity, typography, tokens, and component guidelines for Feminy Academy.

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
