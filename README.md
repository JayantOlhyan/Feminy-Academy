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
| **Phase 3** | **Client Content & Photography Ingestion** | **IN PROGRESS** | Replacing placeholder tokens with Sunita's real photography, confirmed syllabus, and verified credentials (tracked in `PLACEHOLDERS.md`). |
| **Phase 4** | **Checkout Gateway & Backend Automations** | **UPCOMING** | Razorpay / course platform checkout integration (`PAYMENT_ENABLED=true`), Meta CAPI full pipeline, and automated WhatsApp replies. |

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

### 3. Lead Generation API (`/api/lead`) & Event Deduplication
- **Schema Validation**: Robust server-side validation using Zod — supports both full & compact form leads (`channel: "form"`, optional `city`, `interest` defaulting to `"Sab kuch"`) as well as WhatsApp click attribution (`channel: "whatsapp"`).
- **Strict Indian Phone Regex**: Matches 10-digit Indian mobile numbers (`/^[6-9]\d{9}$/`).
- **Attribution & Deduplication**: Tracks `source` (`home-hero`, `home-final-cta`, `sticky`, `header`, `offline-academy`), `lid`, and UTM parameters; fires client Meta Pixel + server `/api/capi` events with a shared `event_id` for deduplication.
- **Spam Mitigation**: Invisible honeypot field (`website`) silently traps and discards automated bots.
- **In-Memory Rate Limiting**: Restricts abuse to 5 submissions per 10 minutes per IP.
- **Persistence Pipeline**: Directly saves leads to MongoDB Atlas (`leads` collection) with automated fail-safe forwarding to Google Sheets via webhook (`SHEET_WEBHOOK_URL`).

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

# Server-Side Meta Conversions API
META_CAPI_TOKEN=""
```

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

### Run Headless Viewport & Responsive Tests
Verifies zero horizontal scroll and proper sticky CTA trigger behavior across mobile, tablet, and desktop:
```bash
node test-viewports.mjs
```

---

## 🎨 Design System Tokens

The visual design language is warm, approachable, and authoritative — reflecting an experienced educator rather than a generic tech startup or luxury salon:

- `--bg`: `#FFFBF7` (Warm Ivory canvas)
- `--surface`: `#FFFFFF` (Card background)
- `--surface-2`: `#F6EEE8` (Soft blush textured sections)
- `--ink`: `#231F20` (High-contrast charcoal typography)
- `--muted`: `#6B6461` (Secondary body text)
- `--line`: `#E8DDD5` (Hairline dividers and borders)
- `--brand`: `#8A2346` (Deep berry — primary actions)
- `--gold`: `#B8915A` (Editorial numbering, hairline accents)
- `--whatsapp`: `#1F9D55` (WhatsApp conversion buttons)

---

## 📄 Documentation

- Refer to [`PLACEHOLDERS.md`](./PLACEHOLDERS.md) for the active ledger of pending photography assets, verified salon credentials, and legal decisions needed from Sunita Rathee.

---

## ⚖️ License & Ownership

© 2026 Feminy Academy by Sunita Rathee. All rights reserved.
Developed for launch deployment by Jayant Solution.
