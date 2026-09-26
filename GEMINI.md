# Social Ninja's & Fit Ninja - Master Project Memory & Rules

> **Permanent Project Memory & Guidelines**
> Consolidated from 127 previous engineering, design, marketing, and architecture chat sessions.
> Loaded automatically by Antigravity / Gemini for all tasks in this workspace.

---

## 1. Project Identity & Architecture

- **Primary Brand / Agency**: Social Ninja's (`socialninjas.in`) — Growth Systems, Content Studio, Lead Automation.
- **Flagship SaaS Product**: **Fit Ninja** (`fit.socialninjas.in`, route `/app/*` in `social-ninjas` and companion repo `socialninjas-fit`).
- **Satellite Utility Funnel**:
  - `https://linkwa.in` — WhatsApp Direct Chat Link Generator.
  - `https://salarytools.us` — US Take-Home Pay & Hourly Calculator.
  - Both satellite tools feature top-banner funnels directing traffic to `socialninjas.in`.
- **Primary Tech Stack**:
  - **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, React Router v7.
  - **Backend & Functions**: Cloudflare Pages Functions (`/api/*`), Node.js / Express backend (`backend/server.js`), Supabase.
  - **Database & Auth**: Supabase (`mocqyvmntemsnmdusjcy` / South Asia Mumbai region), Google OAuth, Row Level Security (RLS).
  - **Payments**: Razorpay (Checkout SDK + Cloudflare Webhook Functions).
  - **Analytics & Tracking**: Meta Pixel (ID: `1022819360737558`) + Server-side Meta Conversions API (CAPI).
  - **Hosting & CI/CD**: Cloudflare Pages connected to GitHub (`Nazimninja/social-ninjas` & `Nazimninja/socialninjas-fit`).

---

## 2. Strict Product & Marketing Guidelines

- **NO Offline Claims**:
  - **RULE**: NEVER claim or market the app as "working offline without internet". The app relies on Supabase auth, remote exercise media, and sync APIs. The user explicitly mandated complete removal of the offline angle to prevent misleading customers.
- **NO AI Fluff / Buzzwords**:
  - **RULE**: NEVER use cheesy buzzwords like "AI Coach", "AI-Powered Magic", or generic AI hype. Frame Fit Ninja as an elite coaching, workout generation, and training system built for real athletes and serious progress.
- **Pricing Strategy**:
  - **Introductory Acquisition Hook**: First month at **₹99** (used in ad creatives and landing page hero CTA to drive friction-free signups).
  - **Standard Renewal**: **₹399/mo** (recurring membership).
  - **Starter Tier**: ₹0 Free Pass (50+ basic tutorials, manual set logger, basic rest timer) used for value anchoring against Pro.
- **Target Geographies**: India, UAE, and International (USD/AED/INR currency awareness).

---

## 3. Design System & UI Rules

- **Color Discipline (No Rainbow Clutter)**:
  - **Base Backgrounds**: Obsidian dark (`#0c0c0e`), Deep Carbon (`#101116`), Card surface (`#121215`).
  - **Borders**: Translucent subtle white (`rgba(255, 255, 255, 0.08)`).
  - **Primary Accent**: **Electric Sky Blue (`#38bdf8`)** — strictly used for primary CTAs, active pills, badges, and progress indicators.
  - **Muted Comparison Secondary**: Sleek slate/carbon (`#94a3b8` / `#64748b`) — neon yellows and pinks were eliminated.
  - **Functional Green (`#22c55e`)**: Strictly reserved for logged workout sets ("Done ✓") — NEVER for general button accents.
- **Layout & Zoom Alignment (Pixel-Perfect 100% Zoom)**:
  - **Main Grids & Showcase Containers**: Strictly `max-width: 1140px; margin: 0 auto 80px; width: 100%; box-sizing: border-box;`.
  - **Focused Reading & FAQ Containers**: Strictly `max-width: 800px; margin: 0 auto 80px; width: 100%; box-sizing: border-box;`.
  - **Never introduce conflicting widths** like `1200px`, `1100px`, `1060px`, or `880px` which break vertical visual alignment.

---

## 4. Key Integrations & Implementation Details

### Meta Pixel & Conversions API (CAPI)
- **Pixel ID**: `1022819360737558`
- **Domain Verification**: Meta tag verified on `fit.socialninjas.in` and `socialninjas.in`.
- **Deduplication**: Client `fbq('track', ...)` and Cloudflare Pages server CAPI send identical `event_id` tokens (e.g. `sub_...` or hashed purchase ID) to prevent double counting.
- **Purchase Trigger Rule**: Only send `Purchase` on the initial customer checkout activation — NOT on recurring renewal `subscription.charged` events.

### Supabase & Auth
- **Project**: `mocqyvmntemsnmdusjcy`
- **Tables**: `crm_supabase_schema.sql` handles `leads` and `content_studio_clients`.
- **OAuth**: Google OAuth is active with verified callback redirect URLs for production and local development.

### Razorpay Payments
- **Webhook Handlers**: Handle `subscription.activated` and `payment.captured`.
- **Environment Variables**: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.

### Dynamic Island & Workout Companion
- **Phase 1 (Web / In-App)**: Floating pill with rest timer countdown, Next Exercise preview, and audio cues.
- **Phase 2 (Mobile / Capacitor)**: iOS ActivityKit bridge for lock screen Live Activities.

---

## 5. Development & Deployment Procedures

- **Local Development**: `npm run dev` (runs Vite + backend concurrently).
- **Production Build**: `npm run build` (`vite build && node scripts/prerender.js && node scripts/copy-redirects.js`).
- **Deployments**: Pushes to `main` branch trigger automated Cloudflare Pages builds. Always test `npm run build` cleanly before pushing.
