# Design & Anti-Slop Audit — After Restructure (Homepage)

**Date**: 2026-11-11  
**URL**: `http://localhost:3000` (Production build verified locally)  
**Live Site Reference**: `https://feminy-academy.netlify.app/`  
**Screenshots**:
- Mobile (360×640): `docs/screenshots/after-360x640.png`
- Desktop (1440×900): `docs/screenshots/after-1440x900.png`

---

## 1. Banned Patterns (AI Slop) Remediation

| Banned Pattern | Before State | After State & Resolution | Status |
| :--- | :--- | :--- | :--- |
| **Icon-in-colored-circle card grid** | ❌ 4 cards with `rounded-full` colored circles and icons in Section 04 ("Why Feminy"). | **Eliminated.** Removed Section 04. Replaced with StoryBrand `ProblemSection.tsx` (numbered typographic list with hairlines) and `PlanSection.tsx` (3 clear steps with connecting gold hairline). | ✅ **Fixed** |
| **Generic Lucide decorative icons** | ❌ `Sparkles`, `BookOpen`, `HelpCircle`, `Award` used as decorative filler. | **Eliminated.** Stripped all generic icons. Icons are retained only for concrete functional actions (`Check`, `Phone`, `ArrowRight`, `ChevronDown`, `Play`). | ✅ **Fixed** |
| **Monotonous 16px radius everywhere** | ❌ `rounded-[16px]` applied across all cards, inputs, dialogs, accordions. | **Eliminated.** Standardized to crisp 4px (`rounded-card` / `rounded-input`) across all blocks and pages. Full pill (`rounded-full`) is reserved strictly for primary CTA buttons. | ✅ **Fixed** |
| **Cream background + gold accents everywhere** | ⚠️ `--bg: #FFFBF7`, gold dot patterns, gold text badges failing contrast. | **Eliminated.** Replaced with disciplined palette: 70% `--paper` (`#FFFFFF`), `--paper-2` (`#F2EFEC`), 20% single dark `--ink` (`#161314`) section for Sunita's guide story, ≤10% rich wine `--accent` (`#7A1F3D`). No dot textures, no gradients. | ✅ **Fixed** |
| **Gradients, blurred blobs, & heavy drop shadows** | ⚠️ `linear-gradient` dividers, blurred blobs, heavy card shadows. | **Eliminated.** All background gradients and blurred blobs removed. Cards use clean border hairlines (`border-line`). Only the hero `LeadForm` uses a subtle elevation (`shadow-form`). | ✅ **Fixed** |
| **Typography mismatch** | ⚠️ `Fraunces` used even at small sizes; Inter body; `fontFamily.mono` mapped to sans. | **Eliminated.** Editorial pair established: `Bodoni Moda` (500, 600) exclusively for display headings and big numbers ≥28px; `Mukta` (400, 600) for all body copy, UI, inputs, and buttons. `fontFamily.mono` restored to standard monospace. | ✅ **Fixed** |
| **Uniform rhythm & arbitrary section numbering** | ⚠️ Sections numbered "01" through "07" with uniform centered containers. | **Eliminated.** Arbitrary numbers removed. Narrative flows dynamically through StoryBrand: Student Hero (form-first) → Proof Strip → Problem → Guide (dark contrast) → Plan → Transformation → Courses (mobile snap scroll) → Academy/FAQ → Final CTA. | ✅ **Fixed** |
| **Filler copy & fake stats** | ⚠️ Vague claims, potential fabricated student quotes. | **Eliminated.** Simple, relatable Hinglish in Latin script. All unverified figures or quotes marked with `<PlaceholderNotice>` for Sunita's validation. Zero fake numbers. | ✅ **Fixed** |

---

## 2. Color Contrast Verification Table (All Text Pairs)

All contrast ratios calculated using the standard WCAG relative luminance formula against WCAG 2.1 AA (≥ 4.5:1 for normal text, ≥ 3.0:1 for large text) and AAA (≥ 7.0:1 for normal text).

| Element / Role | Foreground | Background | Calculated Ratio | WCAG AA Threshold | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Body / Headings on Paper** | `--ink` (`#161314`) | `--paper` (`#FFFFFF`) | **18.46:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Body / Headings on Paper 2** | `--ink` (`#161314`) | `--paper-2` (`#F2EFEC`) | **16.32:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Muted Meta / Labels on Paper** | `--ink-muted` (`#5C5557`) | `--paper` (`#FFFFFF`) | **7.26:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Muted Meta / Labels on Paper 2**| `--ink-muted` (`#5C5557`) | `--paper-2` (`#F2EFEC`) | **6.42:1** | ≥ 4.5:1 | **Pass (AA)** |
| **Primary CTA Button Text** | White (`#FFFFFF`) | `--accent` (`#7A1F3D`) | **10.04:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Primary CTA Hover/Pressed** | White (`#FFFFFF`) | `--accent-strong` (`#5A1229`)| **14.36:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Gold Text on Paper** | `--gold-text` (`#8A6A2F`) | `--paper` (`#FFFFFF`) | **5.02:1** | ≥ 4.5:1 | **Pass (AA)** |
| **Guide Section Headline / Body** | `--on-ink` (`#F2EFEC`) | `--ink` (`#161314`) | **16.32:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Guide Section Secondary Text** | `--on-ink-muted` (`#B9B0AC`)| `--ink` (`#161314`) | **9.38:1** | ≥ 4.5:1 | **Pass (AAA)** |
| **Decorative Hairlines / Rules** | `--gold-line` (`#B8915A`)| `--paper` / `--ink` | *N/A (Non-text)* | *Non-text rule* | **Compliant** (strictly used for rules, never text) |

---

## 3. Mobile First & Technical Verification Metrics

Measured via automated headless browser tests (`scripts/verify-story-design.js` and `scripts/measure-performance.js`):

| Metric | Target | Actual Measured Result | Status |
| :--- | :--- | :--- | :--- |
| **Hero Submit Button Bottom (360×640)** | ≤ 640px | **521.33px** | **Pass** (well above mobile fold) |
| **Input Font Size (all inputs)** | ≥ 16px (no iOS auto-zoom) | **16px** (computed) | **Pass** |
| **Touch Target Size** | ≥ 44×44px | Buttons & interactive links **≥ 44px** | **Pass** |
| **Horizontal Overflow / Scroll** | 0px on 320, 360, 375, 390, 1440 | **0px** across all tested viewports | **Pass** |
| **Cumulative Layout Shift (CLS)** | < 0.05 | **0.0000** | **Pass (Ideal)** |
| **Largest Contentful Paint (LCP)** | < 2.5s (4G Throttled) | **0.65s** | **Pass (Fast)** |
| **DOMContentLoaded** | < 1.5s (4G Throttled) | **0.52s** | **Pass (Fast)** |
| **First Load JS Bundle (Homepage)** | Lean (< 150 kB) | **130 kB** (103 kB shared chunks) | **Pass** |
| **Motion Budget & GSAP Execution** | Pinned sequence on desktop only | Pinned only ≥1024px; static on mobile; reverts cleanly on unmount; disables on `prefers-reduced-motion` | **Pass** |
| **Lead Generation Durability** | Durable API persistence | `hero-lead-form` preserved; CAPI dispatch ready; WhatsApp click tracking 200 OK | **Pass** |

---

## 4. Visual Comparison Summary

- **Before**: Generic template feel with heavy 16px rounded corners, repeated 4-card icon-in-circle grid, high-contrast Fraunces serif used inappropriately at small sizes, failing gold text contrast, and scattered section structure.
- **After**: Distinctive editorial identity honoring Sunita Rathee's craft. Bodoni Moda headlines paired with highly readable Mukta body text. Clear StoryBrand progression that leads the visitor naturally from student pain points to Sunita as their trusted guide, through 3 transparent steps, leading into enrollment. Fully responsive, zero horizontal scroll, instant mobile load.
