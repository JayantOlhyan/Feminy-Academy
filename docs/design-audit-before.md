# Design & Slop Audit — Before Restructure (Homepage)

**Date**: 2026-11-11  
**URL**: `http://localhost:3000` (Local reproduction of `feat/home-lead-cro`)  
**Screenshots**:
- Mobile (360×640): `docs/screenshots/before-360x640.png`
- Desktop (1440×900): `docs/screenshots/before-1440x900.png`

---

## 1. Audit Summary & Banned Patterns Identified

| Pattern / Banned Item | Status in Current Codebase | Location & Manifestation |
| :--- | :--- | :--- |
| **Icon-in-colored-circle card grid** | ❌ **Present (Classic AI Slop)** | `app/page.tsx` Section 04 ("Why Feminy"): 4 cards with `rounded-full bg-brand/10` and `bg-gold/15` circles containing generic Lucide icons. |
| **Generic Lucide decorative icons** | ❌ **Present** | `Sparkles`, `BookOpen`, `HelpCircle`, `Award` used as decorative filler in Section 04. |
| **Monotonous 16px radius everywhere** | ❌ **Present** | `tailwind.config.ts`: `borderRadius.card = "16px"`, applied to every card, modal, accordion, form, and preview across the site. |
| **Cream background + gold accents everywhere** | ⚠️ **Heavy** | `--bg: #FFFBF7`, `--surface-2: #F6EEE8`, `.surface-texture` with gold dots, multiple gold hairline borders without strict hierarchy. |
| **Gradients & decorative shadows** | ⚠️ **Present** | `linear-gradient` dividers in `globals.css` (`.divider-gold`), `shadow-warm` and `shadow-subtle` on nearly every block. |
| **Typography mismatch** | ⚠️ **Present** | `Fraunces` (high-contrast display serif used even at smaller sizes) + `Inter` body; `fontFamily.mono` mapped incorrectly to Inter. |
| **Section numbering & uniform rhythm** | ⚠️ **Present** | Sections numbered "01" through "07" regardless of semantic flow; uniform centered/wide layout rhythm across sections. |
| **Mobile Form Visibility** | ✅ **Passing** | Submit button bottom at 509.15px (≤ 640px). |

---

## 2. Color Contrast Baseline (Current Colors)

| Pair | Foreground | Background | Current Contrast | WCAG AA Requirement | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Primary text on bg | `#231F20` (`--ink`) | `#FFFBF7` (`--bg`) | 14.8:1 | ≥ 4.5:1 | Pass |
| Primary text on surface-2 | `#231F20` (`--ink`) | `#F6EEE8` (`--surface-2`) | 13.5:1 | ≥ 4.5:1 | Pass |
| Muted text on bg | `#6B6461` (`--muted`) | `#FFFBF7` (`--bg`) | 5.3:1 | ≥ 4.5:1 | Pass |
| Muted text on surface-2 | `#6B6461` (`--muted`) | `#F6EEE8` (`--surface-2`) | 4.8:1 | ≥ 4.5:1 | Pass |
| Brand button text | `#FFFFFF` | `#8A2346` (`--brand`) | 6.8:1 | ≥ 4.5:1 | Pass |
| Gold label / text | `#B8915A` (`--gold`) | `#FFFFFF` | 2.5:1 | ≥ 4.5:1 | ❌ **Fail** (gold text on white fails contrast) |

*Note: The current `--gold` (`#B8915A`) was occasionally used for text badges/chips against light backgrounds, producing failing contrast (2.5:1).*

---

## 3. Brand Asset Check (Sunita's Logo / Visiting Card)
- Checked `public/`: Only `public/images/sunita-hero.png` and `public/images/sunita-hero.jpg` are present.
- Checked `PLACEHOLDERS.md`: Brand Logo is tracked as `[LOGO FILE PENDING]` with text wordmark fallback active.
- Checked codebase: No visiting card graphics, physical brand guidelines, or custom logo assets exist in repository.
- **Conclusion**: The specified target palette from the brief will be established in `DESIGN.md` and implemented.
