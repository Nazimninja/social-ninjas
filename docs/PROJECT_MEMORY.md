# Social Ninja's & Fit Ninja - Comprehensive Project Memory

This document stores the consolidated history, architectural decisions, design system, and marketing guidelines gathered across all development conversations.

---

## 1. Project Background & Ecosystem

- **Social Ninja's (`socialninjas.in`)**:
  - The flagship agency hub. Provides AI automation, growth systems, and content studio services.
  - Houses the `/app/*` routes for the Fit Ninja workout tracker.
  - Connected to CRM tables in Supabase for inbound leads and content studio clients.
- **Fit Ninja (`fit.socialninjas.in`)**:
  - Dedicated fitness application and workout planner.
  - Contains full exercise library (4,000+ exercises in `public/data/exercises_master.json`), custom routine generator, workout session tracker with rest countdowns, and Dynamic Island / Live Activity integration.
  - Core exercises must always have verified GIF demos and thumbnails.
- **Satellite Inbound Tools**:
  - `linkwa.in`: WhatsApp link generator with custom message templates and HD QR Studio. Funnels traffic to agency services.
  - `salarytools.us` & `salary.socialninjas.in`: US salary calculator and take-home pay tool. Funnels traffic to agency services.

---

## 2. Contact & Identity Standards

1. **Standard Business Email**: `info@socialninjas.in` on all headers, footers, privacy policies, terms, and tools.
2. **Founder & Cloud Admin**: `nazim.socialninja@gmail.com` (Google Business Profile, SaaSHub, GoodFirms, Crunchbase).
3. **Official Phone**: `+918147757479`.

---

## 3. Business Logic, Pricing & Policies

1. **Pricing Structure**:
   - **Starter Pass**: Free forever (₹0). 50+ basic tutorials, manual set logger, basic rest timer. Anchors value for Pro.
   - **Introductory Pro Pass**: ₹99 for the first month. Used as the primary marketing conversion hook.
   - **Pro Pass Standard Renewal**: ₹399/month recurring.
2. **Advertising & Positioning Guardrails**:
   - **No Offline Mode Promotion**: The app requires internet connectivity for Supabase authentication, cloud sync, and media streaming. The previous marketing hook claiming offline capability has been strictly retired to prevent misleading users.
   - **No "AI Fluff"**: The brand identity focuses on athletic discipline, progressive overload tracking, and reliable workout generation. Avoid hype terms ("Magic AI", "AI Guru").
3. **Geographic Scope**:
   - Primary markets: India and UAE.
   - Expanding to international users with multi-currency handling (INR, AED, USD).

---

## 4. Design System & UI Specifications

1. **Color Palette**:
   - **Obsidian Dark & Deep Carbon**: `#0c0c0e`, `#101116`, `#121215` provide a unified dark aesthetic.
   - **Electric Sky Blue (`#38bdf8`)**: Primary brand accent color used across buttons, active tab indicators, progress rings, and highlights.
   - **Muted Carbon & Slate (`#64748b`, `#94a3b8`)**: Used for comparison cards and secondary badges.
   - **Functional Green (`#22c55e`)**: Strictly reserved for completed workout sets.
2. **Grid & Container Standards**:
   - **1140px Container**: Applied to navigation, hero grids, exercise showcases, sandbox previews, pricing tables, and footer (`max-width: 1140px; margin: 0 auto 80px; width: 100%; box-sizing: border-box;`).
   - **800px Reading Container**: Applied to guides, FAQs, and documentation (`max-width: 800px; margin: 0 auto 80px; width: 100%; box-sizing: border-box;`).
   - **Zoom Stability**: Tested and locked for 100% zoom with no layout shifts or horizontal scrollbars.
3. **Form Physics**: Disabled 3D tilt physics (`rotateX`, `rotateY`, `translateZ`) on form inputs for reliable accessibility.

---

## 5. Marketing Operations & Automations

1. **Daily LinkedIn Publisher (`NazimOS Publisher`, ID `ztKys5j4Ug21IEud`)**:
   - Fires at 9:30 AM IST (`30 9 * * *`).
   - Auto-converts scheduled PDF slides & images into high-resolution PNGs for posting.
2. **Multi-Platform Monitor / Lead Generator**:
   - Configured with strict cron schedules to maintain reliability in n8n.

---

## 6. Key Integrations & APIs

1. **Meta Pixel & CAPI**:
   - **Pixel ID**: `1022819360737558`
   - **Server CAPI**: Cloudflare Worker / Pages function sends events directly to Meta Graph API.
   - **Deduplication**: Uses matching `event_id` between client `fbq` calls and server-side calls.
   - **Attribution Hygiene**: Purchase events are restricted to initial activations, not recurring charges.
2. **Supabase**:
   - **Project URL & Keys**: Configured in Cloudflare Pages and `.env.local`.
   - **Authentication**: Google OAuth with redirect URLs configured for localhost and production domains.
   - **Schema**: Tables include `leads` and `content_studio_clients` (defined in `crm_supabase_schema.sql`).
3. **Razorpay Payments**:
   - Webhook endpoints verify signatures using `RAZORPAY_WEBHOOK_SECRET`.
   - Handles subscriptions and one-time payments.

---

## 7. Development & Deployment Workflow

1. **Build Step**:
   ```bash
   npm run build
   ```
   Ensures Vite bundle builds, runs prerendering script (`scripts/prerender.js`), and copies redirects (`scripts/copy-redirects.js`).
2. **Git Workflow**:
   - Remote repository: `https://github.com/Nazimninja/social-ninjas.git`
   - Production branch: `main`
   - Cloudflare Pages automatically triggers builds on push to `main`.
