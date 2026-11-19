# Social Ninja's & Fit Ninja — Master J.A.R.V.I.S. Knowledge Vault

> **Permanent Corporate Intelligence & Operational Memory for J.A.R.V.I.S.**
> Strictly sanitized — Zero passwords, tokens, or private secrets included.
> Loaded into the J.A.R.V.I.S. cognitive core for real-time task management, lead diagnosis, content generation, and business operations.

---

## 1. Corporate Identity & Ecosystem

| Entity | Domain / URL | Core Function |
| :--- | :--- | :--- |
| **Social Ninja's (Agency)** | `https://socialninjas.in` | AI-Powered Growth Systems, Paid Meta/Google Ads Scaling, Content Studio, Lead Automation. |
| **Fit Ninja (SaaS)** | `https://fit.socialninjas.in` | Flagship athletic workout generator, routine builder, and set logger. |
| **LinkWA (Satellite)** | `https://linkwa.in` | WhatsApp direct chat link generator & HD QR code studio. Funnels organic traffic to agency. |
| **Salary Tools (Satellite)** | `https://salarytools.us` | US take-home pay & wage calculator. High-volume organic top-of-funnel asset. |

- **Founder & CEO:** Nazim (`nazim_ninja`).
- **Primary Company Email:** `info@socialninjas.in` (Mandatory on all websites, footers, tools, legal docs, and contracts).
- **Primary Business WhatsApp & Phone:** `+91 81477 57479`.
- **Secondary Business Line:** `+91 88925 87979`.
- **Headquarters:** Bengaluru, Karnataka, India.
- **Global Partner Hub:** Business Bay, Dubai, UAE.
- **Verified Directory Profiles:** Google Business Profile (Bengaluru), SaaSHub, GoodFirms, Clutch (`social-ninjas-0`), AgencySpotter, Sortlist, DesignRush.

---

## 2. Agency Core Offerings & Deliverables

### A. Paid Ads Scaling (`/services/paid-ads`)
- **Focus:** High-ROAS Meta Ads (Instagram/Facebook) and Google Search / Performance Max.
- **Value Proposition:** Turn ad spend into predictable customer acquisition with rigorous creative testing matrices and automated campaign scaling.
- **Target Spends:** ₹50,000/mo to ₹10,00,000+/mo.

### B. Full-Funnel Performance Marketing (`/services/performance-marketing`)
- **Focus:** End-to-end growth engineering, landing page conversion rate optimization (CRO), Meta Conversions API (CAPI) deduplication, and retention flows.
- **Value Proposition:** Full customer journey optimization from first impression to closed deal.

### C. Content Studio (`/services/content-production`)
- **Focus:** High-volume short-form video reels, YouTube Shorts, slide carousels, and thought-leadership ghostwriting.
- **Value Proposition:** Builds organic brand authority and founder presence without spending dozens of hours filming.

### D. Creative Studio (`/services/creative-studio`)
- **Focus:** High-converting static and motion ad creatives, offer positioning, visual brand identities, and high-CTR thumbnail design.

### E. WhatsApp Marketing & Email Automation (`/services/email-whatsapp`)
- **Focus:** WhatsApp CRM integration, 2-way AI conversational setters, abandoned cart sequences, and broadcast campaigns.
- **Value Proposition:** 98% open rates and sub-5-minute lead response times, replacing slow email inquiries.

### F. AI Automation & Lead Engines (`/services/ai-automation`)
- **Focus:** Automated appointment setters, CRM auto-enrichment, instant form qualification, and workflow syncing.

---

## 3. Fit Ninja SaaS Architecture & Strict Rules

1. **Product Functionality:**
   - Push/Pull/Legs (PPL), Upper/Lower, and Full Body workout generator algorithms.
   - Master Exercise Library: 4,000+ exercises (`public/data/exercises_master.json`) with verified animated GIF demos and thumbnail links.
   - Deduplication: Algorithms strictly sanitize exercise candidate pools to prevent mechanical redundancies (e.g. redundant bicep curls under alias names).

2. **Pricing Structure:**
   - **Introductory Acquisition Hook:** First month at **₹99** (frictionless onboarding hook used in hero CTAs).
   - **Standard Renewal:** **₹399/mo** ongoing recurring athletic membership.
   - **Starter Pass:** **₹0 Free Pass** (50+ basic exercise tutorials, manual set logger, rest timer) used for value anchoring against Pro.

3. **STRICT Non-Negotiable Rules:**
   - **NO Offline Claims:** NEVER claim or market Fit Ninja as working offline. It requires active connectivity for Supabase authentication, media streaming, and cloud routine sync.
   - **NO AI Hype/Fluff:** NEVER use cheesy buzzwords like "Magic AI" or "AI Coach". Frame Fit Ninja as an elite athletic training and workout tracking system built for real athletes.

---

## 4. Design System & Layout Standards

- **Color Discipline:**
  - Base Backgrounds: Obsidian dark (`#0c0c0e`), Deep Carbon (`#101116`), Card surface (`#121215`).
  - Borders: Translucent subtle white (`rgba(255, 255, 255, 0.08)`).
  - Primary Accent: **Electric Sky Blue (`#38bdf8`)** — exclusively for primary CTAs, active pills, badges, and progress indicators.
  - Secondary: Sleek slate/carbon (`#94a3b8` / `#64748b`).
  - Functional Green (`#22c55e`): STRICTLY reserved for completed workout sets ("Done ✓") — never for general UI buttons.
- **Layout & Zoom Alignment:**
  - Main showcases & hero grids: `max-width: 1140px; margin: 0 auto 80px; width: 100%; box-sizing: border-box;`.
  - Focused reading & FAQ containers: `max-width: 800px; margin: 0 auto 80px; width: 100%; box-sizing: border-box;`.
  - Forms: Flat and stable. No jittery 3D tilt physics (`rotateX`, `rotateY`, `translateZ`).

---

## 5. Ideal Customer Profiles (ICPs) & Lead Tiers

- **Primary ICPs:**
  - High-ticket luxury real estate developers & luxury villa brokers (Bengaluru, Dubai, Mumbai).
  - Aesthetic, wellness, cosmetic surgery, and dental clinics.
  - Premium fitness centers, personal training studios, and gym chains.
  - B2B service agencies and SaaS companies needing high-volume lead pipelines.
- **Budget Qualification Thresholds:**
  - `< ₹50K / mo`: Recommend introductory toolkits / self-service Starter Pass.
  - `₹50K - ₹2L / mo`: Growth Tier — Paid Meta Ads sprint or Content Studio package.
  - `₹2L - ₹5L / mo`: High-Ticket Tier — Full-funnel performance marketing + AI appointment setter.
  - `₹5L+ / mo`: Enterprise Tier — Bespoke multi-channel revenue engine with dedicated account strategy.

---

## 6. Active Marketing & Infrastructure Workflows

1. **Content Distribution (`NazimOS Publisher`, ID `ztKys5j4Ug21IEud`):**
   - Active on Railway n8n (`https://n8n-production-29f31.up.railway.app`).
   - Trigger: Daily at **9:30 AM IST** (`30 9 * * *`).
   - Automatically renders PDF carousels & single images into high-res PNGs and posts to LinkedIn.
2. **Fit Ninja Auto Onboarding (`8ViQQiNq4COBGjyL`):**
   - Active on Railway n8n.
   - Trigger: Webhook `/webhook/fitninja-welcome` (called by `api/razorpay-webhook.js`).
   - Dispatches instant personalized WhatsApp setup guide and workout routine to new Pro athletes via Evolution API.
3. **Outbound Prospecting:** Handled exclusively by **Muse AI** (all legacy n8n scrapers and monitors decommissioned).
4. **WhatsApp Dispatcher:** Evolution API v2.3.7 running on Railway (`https://evolution-api-production-b3d9.up.railway.app`), connected to instance `fitninja` at phone `+91 81477 57479`.

---

## 7. SEO Strategy & Brand Guardrails

1. **Zero AI Filler:** Every post must target exactly 1 verified keyword, satisfy 1 search intent, and conclude with a specific service/audit CTA.
2. **Defend Brand Queries:** Defend exact agency domain and brand queries (`socialninjas.in`, `social ninja's agency`, `social ninjas bangalore`).
3. **Never Target Head Terms Head-On:** Avoid head-on competition against entrenched giants for broad terms like `mortgage calculator` or `take home pay calculator`. Target long-tail, wage brackets ($20, $25, $30, $35/hr), and state tax variants.
4. **Zero Link Schemes:** Build domain equity strictly via data studies, embeddable calculators, and directory citations. Never buy links or use PBNs.
5. **Cadence Discipline:** Minimum 2 strategic authority articles/month.
