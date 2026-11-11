# Feminy Academy — Official Website

> **High-converting, mobile-first beauty academy platform by Sunita Rathee (Bahadurgarh, Haryana).**  
> Engineered for sub-second mobile load speeds, ad-driven lead generation, and frictionless WhatsApp conversions.

🔗 **Live Production Site:** [https://feminy-academy.netlify.app/](https://feminy-academy.netlify.app/)

[![Live Deployment](https://img.shields.io/badge/Live_Site-feminy--academy.netlify.app-00C7B7?style=flat&logo=netlify)](https://feminy-academy.netlify.app/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.29-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat&logo=greensock)](https://greensock.com/)
[![Lighthouse Mobile](https://img.shields.io/badge/Lighthouse_Mobile-100%2F100-success?style=flat&logo=lighthouse)](https://pagespeed.web.dev/)

---

## 🚦 Phase & Milestone Tracker

| Phase | Description | Status | Details |
|---|---|---|---|
| **Phase 1** | **Frontend Launch Scope & Performance Engine** | **COMPLETED** | 11 pages built, 100/100 Lighthouse score, WhatsApp deep-links, Ad-Landing mode, responsive viewports verified. |
| **Phase 2** | **Homepage Lead-Conversion (CRO) Pass** | **COMPLETED** | Above-the-fold compact `LeadForm` on `/`, proof-before-pitch section order, deduplicated Meta Pixel + CAPI event tracking (`event_id`) for form & WhatsApp leads, mobile `StickyCTA` on `/`, 100/100 mobile Lighthouse maintained. |
| **Phase 3** | **Lead Reliability & Durable Delivery** | **COMPLETED** | Parallel MongoDB + Google Sheet writes with 5s timeout, WhatsApp click logging in `whatsapp_clicks` (Meta `Contact`), CGNAT-safe rate limiting, real Meta Graph API v22.0 CAPI dispatch, and instant email alerts via Google Apps Script (`scripts/sheet-webhook.gs`). |
| **Phase 4** | **Mobile-First Hardening (Meta Ad Traffic)** | **COMPLETED** | Hardened for 360–412px Android in-app browsers (Instagram/Facebook) and iOS WebKit: hero submit button visible at 360×640 without scrolling (`509px`), ≥16px inputs to prevent iOS zoom, ≥44×44px tap targets (0 violations), no horizontal scroll across 6 viewports, native `<dialog>` lightbox with scroll lock and 100dvh fit, automatic StickyCTA hiding during keyboard focus, and resilient attribution parsing. |
| **Phase 5** | **StoryBrand Restructure & Anti-Slop Design System** | **COMPLETED** | Transformed homepage into a StoryBrand narrative (Hero = Student, Guide = Sunita, Plan = 3-step course). Replaced AI slop patterns (no icon-in-circle grids, no generic Lucide filler, no cream/gold overuse, no 16px radius everywhere) with an editorial design system: Bodoni Moda (display ≥28px) + Mukta (body/UI), 4px card radius, disciplined palette (`--paper`, `--paper-2`, `--ink`, `--accent`), 1 pinned desktop-only Guide story with mobile static fallback, and CSS snap-scroll courses. Verified zero horizontal scroll, submit button at 521px (≤640px), 16px inputs, LCP 0.65s, CLS 0.0000. |
| **Phase 6** | **Live-Site Integrity, Anti-Placeholder Guard & Hardening** | **COMPLETED** | Removed fabricated testimonials, unconfirmed batch dates, and unverified quotes. Replaced placeholder image mosaics with verified location cards. Added build-time guard script (`scripts/check-placeholders.mjs`) ensuring zero placeholder leaks. Fixed header solid background, static SSR proof metrics (no false low numbers), fixed hydration #418, fixed problem numbers wrapping, added dynamic OpenGraph card (`app/opengraph-image.tsx`), added favicons, and suppressed Netlify HUD. Verified with Puppeteer: 0 console errors, 0 placeholder strings across mobile & desktop. |
| **Phase 7** | **Unverified Claims Removal & Integrity Pass** | **IN PROGRESS** | Converted unconfirmed claims (access duration, GST note, invented lesson durations, bio claims, hours, unverified stats 150+, 15+, 17K, 4.9★) into strict placeholder tokens cleanly hidden in production. Deleted dead StoryScroll code. Tracked in `PLACEHOLDERS.md`. |
| **Phase 8** | **Checkout Gateway & Backend Automations** | **UPCOMING** | Razorpay / course platform checkout integration (`PAYMENT_ENABLED=true`) and automated WhatsApp student onboarding. |

---

## ⚡ Core Web Vitals & Performance

Engineered specifically for visitors arriving from Instagram/Meta ads on mid-range Android devices over mobile 4G networks.

| Metric | Measured Score | Budget Target | Status |
|---|---|---|---|
| **Performance** | **100** / 100 | ≥ 90 | Pass |
| **Accessibility** | **96** / 100 | ≥ 95 | Pass |
| **Best Practices** | **96** / 100 | ≥ 95 | Pass |
| **SEO** | **100** / 100 | ≥ 95 | Pass |
| **Largest Contentful Paint (LCP)** | **0.9 s** | ≤ 2.5 s | Pass |
| **First Contentful Paint (FCP)** | **0.9 s** | ≤ 1.8 s | Pass |
| **Total Blocking Time (TBT)** | **0 ms** | < 200 ms | Pass |
| **Cumulative Layout Shift (CLS)** | **0.00** | < 0.1 | Pass |
| **First Load JS (All Routes)** | **106 – 119 kB** | < 150 kB | Pass |

---

## 🎯 Architecture & Conversion Features

### 1. Ad Landing Mode
- Detects incoming ad traffic via `?lid=<id>` or `?utm_source=meta`.
- Strips secondary navigation links automatically, leaving only the brand wordmark and direct WhatsApp conversion CTA.
- Persists ad session in `sessionStorage` across internal navigation.

### 2. WhatsApp Deep-Linking Engine (`lib/whatsapp.ts`)
- Dynamically generates localized Hindi/Hinglish inquiry messages tailored to the specific course context.
- Injects lead attribution tracking: `Ref: {lid}` persisted from query params to `localStorage`.
- Supports 5 distinct action types: general enquiry, Hydra Facial enrolment, 1-Day masterclass enrolment, question resolution, and offline demo bookings.

### 3. Lead Generation API (`/api/lead`), Durability & Event Deduplication
- **Never Lose a Lead**: Form submissions execute MongoDB (`leads` collection) and Google Sheet webhook writes in parallel (`Promise.allSettled` with a 5s `AbortController` timeout on Sheet). A lead only succeeds (`200 OK`) if at least one durable store succeeds; if both fail, `/api/lead` returns `500` and the form displays an inline Hinglish error with a direct WhatsApp fallback button (never redirecting to `/thank-you`).
- **Channel Separation**: Form leads are stored in `leads` (and forwarded to the Sheet), whereas WhatsApp clicks are logged separately to `whatsapp_clicks` (never inflating `leads` or triggering Sheet emails) and fire Meta `Contact` (never `Lead`).
- **CGNAT-Safe Rate Limiting**: Skips rate limiting for `channel: "whatsapp"` and keys form submissions by `ip:phone` (5 per 10 minutes, best-effort per serverless instance) so multiple mobile users sharing a carrier CGNAT IP do not block one another.
- **Meta Conversions API (`lib/capi.ts` + `/api/capi`)**: Sends real Graph API `v22.0` events (`POST https://graph.facebook.com/v22.0/<PIXEL_ID>/events`) with SHA-256 hashed phone (`91XXXXXXXXXX`) and lowercase first name (`fn`), `client_ip_address`, `client_user_agent`, `fbp`/`fbc` cookies, `META_TEST_EVENT_CODE` support, and `event_id` deduplication. Server-side `Lead` fires directly from `/api/lead` only after a confirmed durable save.
- **Health Check (`GET /api/health`)**: Returns boolean configuration flags (`{ mongo, sheet, capi, pixel }`) without exposing secret values.

### 4. Controlled Scroll & Motion Limits
- **Home Page**: Exactly 1 pinned founder journey sequence (*"Engineer se Cosmetologist tak"*) + smooth stat count-up.
- **Course Landing Pages**: **Zero pinned sections** to ensure immediate visual access to price, syllabus, and enrolment CTAs.
- **Offline Academy Page**: Exactly 1 pinned curriculum sequence (*"Aapke 3 Mahine"*).
- **Responsive Stacking**: Pinned sequences gracefully degrade to clean vertical timelines on viewports `< 768px`.
- **Reduced Motion**: Full native support for `@media (prefers-reduced-motion: reduce)` — disables all transitions while ensuring content remains 100% visible.

### 5. Facade Pattern for Third-Party Media
- **Video Facades**: Custom poster preview with central play badge. Heavy iframe embeds (YouTube / Bunny Stream) only load on explicit user tap, eliminating render-blocking third-party scripts.
- **Map Facades**: Static interactive preview card linking directly to Google Maps navigation.

### 6. Config-Driven Business Data
- Zero marketing copy, statistics, prices, or FAQs are hardcoded in UI components.
- Centralized in `content/*.ts` with strict TypeScript typing.
- Built-in verification filter: items with `verified: false` are excluded from production builds.
- Dynamic `PAYMENT_ENABLED` feature flag allows instantaneous switching from WhatsApp checkout to Razorpay/payment gateway.

---

## 📁 Repository Structure

```text
├── app/
│   ├── layout.tsx                # Root layout with Fraunces & Inter fonts, JSON-LD schemas
│   ├── globals.css               # Design tokens, CSS variables, paper-grain texture
│   ├── page.tsx                  # Home Page (10 conversion-focused sections)
│   ├── courses/
│   │   ├── hydra-facial/page.tsx # Primary ad landing page (Hydra Facial Online)
│   │   ├── [slug]/page.tsx       # Dynamic SSG 1-Day masterclass template
│   │   └── one-day/page.tsx      # Static route alias
│   ├── offline-academy/page.tsx  # High-ticket 3-month offline academy landing
│   ├── thank-you/page.tsx        # Multi-state confirmation (?type=offline | ?type=enrol)
│   ├── about/page.tsx            # Founder journey & academy background
│   ├── contact/page.tsx          # Academy address, hours & interactive map facade
│   ├── pricing/page.tsx          # Transparent course fee matrix
│   ├── terms/page.tsx            # Course access terms & anti-piracy policies
│   ├── privacy/page.tsx          # Data collection & student privacy policy
│   ├── refund-policy/page.tsx    # Refund timelines & cancellation terms
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── robots.ts                 # Production crawler directives
│   └── api/
│       ├── lead/route.ts         # Zod validation, rate limiting, MongoDB + Sheet forwarder
│       └── capi/route.ts         # Meta Conversions API (CAPI) server-side stub
├── components/
│   ├── ui/                       # Reusable UI primitives (Button, Card, Section, Badge, Accordion)
│   └── blocks/                   # Domain blocks (Header, Footer, ProofStrip, VideoFacade, StoryScroll...)
├── content/
│   ├── site.ts                   # Brand, address, stats, socials, and payment flags
│   ├── courses/                  # Hydra Facial & 1-Day course curriculums
│   ├── offline.ts                # 3-Month offline curriculum & batch details
│   ├── testimonials.ts           # Student work and review placeholders
│   ├── faqs.ts                   # Global FAQs
│   └── legal/                    # Structured policy content
├── lib/
│   ├── whatsapp.ts               # WhatsApp deep-link builder
│   ├── lid.ts                    # Lead ID & UTM extraction/storage
│   ├── tracking.ts               # Meta Pixel & GA4 deferred event dispatcher
│   ├── mongodb.ts                # Cached MongoDB Atlas client
│   └── format.ts                 # Currency and number formatters
├── PLACEHOLDERS.md               # Audit ledger of pending client assets & confirmations
└── test-viewports.mjs            # Puppeteer responsive test suite (360px - 1440px)
```

---

## 🚀 Getting Started

### 🌐 Live Deployment
- **Production URL**: [https://feminy-academy.netlify.app/](https://feminy-academy.netlify.app/)
- **Hosting Platform**: Netlify

### Prerequisites
- **Node.js**: `v20+` (tested on Node v25)
- **npm**: `v10+`

### 1. Clone & Install
```bash
git clone https://github.com/JayantOlhyan/Feminy-Academy.git
cd Feminy-Academy
npm install
```

### 2. Configure Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

Populate the required credentials in `.env.local`:
```env
# Database (MongoDB Atlas for leads)
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/feminy_academy?retryWrites=true&w=majority"

# Optional Google Sheet Webhook for lead forwarding
SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"

# Client Analytics
NEXT_PUBLIC_META_PIXEL_ID=""
NEXT_PUBLIC_GA4_ID=""

# Server-Side Meta Conversions API (Graph API v22.0)
META_CAPI_TOKEN=""
META_TEST_EVENT_CODE=""
```

### 2b. Google Sheet Webhook + Instant Email Alert Setup (`scripts/sheet-webhook.gs`)
To receive leads in a Google Sheet and get an instant email notification (with `tel:` and `wa.me` links) within a minute:
1. Create a Google Sheet and open **Extensions → Apps Script**.
2. Copy the contents of [`scripts/sheet-webhook.gs`](./scripts/sheet-webhook.gs) into `Code.gs` and save.
3. Open **Project Settings (gear icon) → Script Properties → Add script property**:
   - **Property**: `NOTIFY_EMAIL`
   - **Value**: Sunita's email address (e.g. `feminyacademy@gmail.com`)
4. Click **Deploy → New deployment → Select type: Web app**:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
5. Authorize the script when prompted (`SpreadsheetApp` + `MailApp` permissions), copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`), and set it as `SHEET_WEBHOOK_URL` in `.env.local` and Netlify environment variables.

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Verification & Quality Assurance

### Run Type-Check & Linter
```bash
npm run type-check
npm run lint
```

### Run Production Build
```bash
npm run build
```

### Run Headless Viewport, Responsive & Story Design Tests
Verifies zero horizontal scroll, hero submit button positioning on mobile fold, sticky CTA trigger behavior, input font sizes, and StoryBrand components:
```bash
node test-viewports.mjs
node scripts/verify-story-design.js
node scripts/measure-performance.js
```

---

## 🎨 Design System Tokens (Single Source of Truth: `DESIGN.md`)

The visual design language is an editorial, anti-slop system honoring Sunita Rathee's craft. No generic icon-in-circle cards, no heavy 16px corner radiuses everywhere, no cream+gold overdose, and no AI-generated filler copy.

### Typography
- **Display**: `Bodoni Moda` (weights 500, 600, display: swap) via `next/font/google`. Exclusively for headings and big numerals at ≥28px.
- **Body & UI**: `Mukta` (weights 400, 600, subsets `latin`) via `next/font/google`. Used for all body copy, inputs, badges, and buttons.
- **Monospace**: Clean monospace stack (`ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`).

### Colors & Contrast Ratios
- `--paper`: `#FFFFFF` (Default canvas — 70% usage)
- `--paper-2`: `#F2EFEC` (Warm stone alternate canvas)
- `--ink`: `#161314` (Deep charcoal body text — 18.46:1 contrast on paper; also used for the single dark Guide section)
- `--ink-muted`: `#5C5557` (Secondary meta text — 7.26:1 contrast on paper)
- `--line`: `#E4DEDA` (Hairline dividers and card borders)
- `--accent`: `#7A1F3D` (Rich wine — primary actions, 10.04:1 contrast with white text)
- `--accent-strong`: `#5A1229` (Hover/pressed state)
- `--gold-line`: `#B8915A` (Decorative hairlines and borders only; never used for text)
- `--gold-text`: `#8A6A2F` (Gold-tinted text — 5.02:1 contrast on paper)
- `--on-ink`: `#F2EFEC` (Headline/body text on dark Guide section — 16.32:1 contrast)
- `--on-ink-muted`: `#B9B0AC` (Secondary text on dark Guide section — 9.38:1 contrast)
- `--whatsapp`: `#1F9D55` (WhatsApp conversion buttons)

### Shape, Spacing & Motion
- **Radius**: Crisp 4px (`rounded-card` / `rounded-input`) across all cards, modals, and inputs. Full pill (`rounded-full`) is reserved strictly for primary CTA buttons.
- **Motion Budget**: One pinned desktop sequence for Sunita's guide journey (static fallback on mobile <768px), smooth stat count-up, subtle 16px enter reveals, and plan hairline draw-in. Zero scroll-jacking, zero unnecessary parallax.
- **Accessibility**: Full `@media (prefers-reduced-motion)` support, zero horizontal scroll on all viewports, inputs 16px (no iOS auto-zoom).

### Brand Mark & Favicon Suite
- **Bespoke Vector Mark (`components/ui/Logo.tsx`)**: An editorial serif capital **F** with balanced bilateral serifs, framed in an antique gold hairline (`#B8915A`), accented with the signature **Bindu** (cosmetic precision dot) above the crossbar. Zero generic icons, zero AI slop.
- **Deployments**: Header brand link, Footer brand lockup, Certificate header, and verified gold certificate seal (`theme="gold"`).
- **Multi-Resolution Favicon Suite**:
  - `app/icon.svg` & `public/icon.svg`: Razor-sharp SVG favicon for modern browsers.
  - `app/favicon.ico` & `public/favicon.ico`: Multi-resolution ICO (16px, 32px, 48px bitmaps) for legacy browsers.
  - `app/apple-icon.png` & `public/apple-icon.png` (180×180): High-resolution iOS Safari touch icon.
  - `public/icon-192.png` & `public/icon-512.png`: Android & PWA web app manifest icons via `app/manifest.ts`.

---

## 📄 Documentation

- Refer to [`PLACEHOLDERS.md`](./PLACEHOLDERS.md) for the active ledger of pending photography assets, verified salon credentials, and legal decisions needed from Sunita Rathee.

---

## ⚖️ License & Ownership

© 2026 Feminy Academy by Sunita Rathee. All rights reserved.
Developed for launch deployment by Jayant Solution.
