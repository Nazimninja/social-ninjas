# Social Ninja's & Fit Ninja - Master Project Memory & Rules

> **Permanent Project Memory & Guidelines**
> Consolidated from all previous engineering, design, marketing, and architecture chat sessions.
> Loaded automatically by Antigravity / Gemini for all tasks in this workspace.

---

## 1. Project Identity & Architecture

- **Primary Brand / Agency**: Social Ninja's (`socialninjas.in`) — Growth Systems, Content Studio, Lead Automation.
- **Flagship SaaS Product**: **Fit Ninja** (`fit.socialninjas.in`, route `/app/*` in `social-ninjas` and companion repo `socialninjas-fit`).
- **Satellite Utility Funnel**:
  - `https://linkwa.in` — WhatsApp Direct Chat Link Generator & HD QR Studio.
  - `https://salarytools.us` & `https://salary.socialninjas.in/salary-calculator/` — US Take-Home Pay & Hourly Calculator.
  - Both satellite tools feature top-banner and post-generation funnels directing high-intent organic traffic to `socialninjas.in`.
- **Primary Tech Stack**:
  - **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, React Router v7.
  - **Backend & Functions**: Cloudflare Pages Functions (`/api/*`), Node.js / Express backend (`backend/server.js`), Supabase.
  - **Database & Auth**: Supabase (`mocqyvmntemsnmdusjcy` / South Asia Mumbai region), Google OAuth, Row Level Security (RLS).
  - **Payments**: Razorpay (Checkout SDK + Cloudflare Webhook Functions).
  - **Analytics & Tracking**: Meta Pixel (ID: `1022819360737558`) + Server-side Meta Conversions API (CAPI).
  - **Hosting & CI/CD**: Cloudflare Pages connected to GitHub (`Nazimninja/social-ninjas` & `Nazimninja/socialninjas-fit`).

---

## 2. Contact Information & Verified Authority Profiles

- **Standard Company Email**: Strictly **`info@socialninjas.in`** across all websites, landing pages, legal documents, footers, tools, and client-facing interfaces. (Legacy personal emails like `nazimpasha906@gmail.com` must never be used in public code).
- **Google Workspace / Admin Login**: `nazim.socialninja@gmail.com` (used for Google Business Profile, Google Search Console, Google Cloud/OAuth, SaaSHub, GoodFirms, and directory listings).
- **Official Contact Phone**: `+918147757479`.
- **Verified Authority Profiles & Directories**:
  - **Google Business Profile**: Claimed & verified under `nazim.socialninja@gmail.com`.
  - **SaaSHub**: Profile active with LinkWA, Salary Tools, Fit Ninja, and Social Ninja's agency listed.
  - **GoodFirms & Crunchbase**: Company profiles registered.
  - **AgencySpotter, Sortlist & DesignRush**: Agency profiles established for organic domain authority and digital PR backlinks.

---

## 3. Strict Product & Marketing Guidelines

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

## 4. Design System & UI Rules

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
- **Form & Card Interactions**:
  - Remove intrusive 3D tilt physics (`rotateX`, `rotateY`, `translateZ`) on input forms to prevent jittery inputs.

---

## 5. Fit Ninja Media & Routine Generation Architecture

- **Master Exercise Library**:
  - Stored in `public/data/exercises_master.json` (4,000+ exercises).
  - Every basic/core exercise (standing calf raises, dumbbell bicep curls, squats, bench press, lat pulldowns) MUST have verified animated GIF demos (`gifUrl`) and thumbnail images (`thumbUrl`).
- **Routine Generator Deduplication**:
  - Workout generation algorithms (Push/Pull/Legs, Upper/Lower, Full Body) must sanitize candidate exercise pools to prevent duplicate exercise mechanics (e.g. duplicate leg extensions or redundant bicep curls under alias names).

---

## 6. Marketing Automation & n8n Workflows

- **Daily LinkedIn Publisher (`NazimOS Publisher`, ID `ztKys5j4Ug21IEud`)**:
  - Cron trigger: `30 9 * * *` (Daily at 9:30 AM IST).
  - Processes scheduled PDF carousels & single images, generates high-res PNGs, and posts to LinkedIn.
- **Multi-Platform Monitor / Lead Automation (`Flow 5 — Multi-Platform Monitor`, ID `HoTCsqjXSFoQnJb4`)**:
  - Always configure n8n schedule triggers using standard cron expressions to prevent engine schedule parameter validation errors.

---

## 7. Key Integrations & Implementation Details

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

## 8. Development & Deployment Procedures

- **Local Development**: `npm run dev` (runs Vite + backend concurrently).
- **Production Build**: `npm run build` (`vite build && node scripts/prerender.js && node scripts/copy-redirects.js`).
- **Deployments**: Pushes to `main` branch trigger automated Cloudflare Pages builds. Always test `npm run build` cleanly before pushing.

---

## 9. SEO & Content Strategy (Audit Reference & Guardrails)

### A. Keyword Reference (SERP Competition Matrix)
- **Services (Transactional / Commercial)**:
  - `ai lead generation agency` (Competition: High, fragmented)
  - `ai appointment setter` (Competition: Low–Med)
  - `whatsapp automation agency` (Competition: Med)
  - `generative engine optimization agency` (Competition: Low–Med)
  - `instagram seo service` (Competition: Low–Med)
  - `meta ads audit` (Competition: Low–Med)
  - `roas improvement service` (Competition: Low)
  - `performance marketing agency dubai` (Competition: High)
  - `meta ads agency pricing india` (Competition: Med)
- **Tools (Transactional) + Supporting Content**:
  - `whatsapp link generator` (Competition: High — beatable with content depth & clean UX)
  - `wa.me link generator` (Competition: Med)
  - `how to create whatsapp link` (Competition: Med)
  - `hourly to salary calculator` (Competition: Med–High)
  - `$25 an hour is how much a year` (Competition: Med — plus $20, $30 variants)
  - `take home pay calculator` (Competition: Very High — long game, state-specific variants)
  - `mortgage payment calculator with taxes` (Competition: Long-tail only)

### B. Service Pages Layout & Title Standards
- `/services/paid-ads` vs `/services/performance-marketing`: Must have distinct messaging (paid media buying vs comprehensive performance growth).
- `/services/content-production` vs `/services/creative-studio`: Distinct messaging (high-volume video/social asset production vs brand design & narrative).
- `/services/email-whatsapp`: Exact title standard **"WhatsApp Marketing & Email Automation Services"**.
- `/services/ai-automation`: AI appointment setters, CRM sync, and generative lead flows.

### C. Explicitly DO NOT (Strict SEO Anti-Patterns)
1. **DO NOT target head terms head-on**: Never target `mortgage calculator` or `take home pay calculator` head-on against Bankrate, NerdWallet, Zillow, or SmartAsset. Target long-tail questions, exact wage brackets ($20, $25, $30, $35/hr), and state tax variants.
2. **DO NOT chase generic brand queries**: Do not attempt to rank for generic `social ninjas` keywords owned by unrelated legacy games/publishers. Defend exact agency brand + domain queries (`socialninjas.in`, `social ninja's agency`, `social ninjas bangalore`).
3. **DO NOT publish keyword-less AI filler**: Every single blog post or page must target exactly one focus keyword, answer one distinct search intent, provide unique data or structured analysis, and conclude with a relevant service/tool CTA.
4. **DO NOT buy backlinks or use link schemes**: Never purchase PBN links or directory blasts. One manual penalty wipes out domain equity. Build links via data studies, embeddable widgets, and genuine PR citations.
5. **DO NOT let the site go stale**: Never allow a 3+ month publishing gap. Maintain a strict minimum cadence of 2 strategic posts per month.

### D. Monthly Verification Protocol (15 Minutes)
1. **Google Search Console → Performance**: Filter by `/tools/` and `/services/` to track clicks, impressions, and emerging queries.
2. **Google Indexation Check**: Run `site:socialninjas.in` to ensure indexed page count grows steadily as tools and services ship.
3. **Core Keyword Tracking**: Check rankings monthly for money keywords (`ai lead generation agency`, `whatsapp link generator`, `meta ads agency pricing india`, `generative engine optimization agency`) and log in a sheet.
4. **Rich Results Validation**: Run the Google Rich Results Test on every new page before deployment to verify JSON-LD schema validity.
