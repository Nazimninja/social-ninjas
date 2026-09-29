import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
    {
        id: 1,
        slug: "zara-skin-co",
        client: "Zara Skin Co.",
        logo: "https://placehold.co/200x60/020617/ffffff?text=Zara+Skin+Co.",
        category: "E-Commerce",
        industry: "D2C Clean Beauty & Skincare",
        location: "Jaipur, Rajasthan",
        timeline: "90-Day Sprint",
        servicesUsed: [
            "Paid Ads (Meta & Google)",
            "Creative Studio (UGC & Reels)",
            "Performance Marketing"
        ],
        mainMetric: "6.1x",
        metricLabel: "ROAS in 90 Days",
        secondaryMetrics: [
            { label: "Monthly Revenue", value: "₹18.4L+" },
            { label: "CPA Reduction", value: "-38%" },
            { label: "Blended MER", value: "4.8x" },
            { label: "Average Order Value", value: "₹1,265" }
        ],
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200",
        clientBackground: "Zara Skin Co. is an indie Ayurvedic skincare brand crafting active-botanical face serums, gentle clarifying toners, and barrier-repair moisturizers. Founded in 2023, the brand had strong organic word-of-mouth and a 34% repeat customer rate in Rajasthan and Delhi NCR. However, attempts to scale paid customer acquisition across pan-India metros were draining cash flow due to rising CPMs and low conversion rates on cold traffic.",
        challenge: "When Zara Skin Co. approached Social Ninja's, they were spending ₹2,00,000 per month on Meta Ads but were stuck at a dismal 1.4x ROAS — barely breaking even after packaging, shipping, and payment gateway fees. Their internal team was running polished studio packshots with generic 'Shop Now' copy, which caused ad fatigue within 5 days. Furthermore, their tracking relied on standard browser cookies without Meta Conversions API (CAPI), causing up to 30% of purchase signals to drop off due to iOS privacy restrictions and ad blockers.",
        solution: "We engineered a complete overhaul of Zara Skin Co.'s growth architecture across three core layers: rapid creative iteration, full-funnel media architecture, and server-side attribution infrastructure. We deployed a 3-tier UGC pipeline testing 15 new video angles per week, switched to broad demographic targeting with Advantage+ Shopping Campaigns, and integrated Meta CAPI via Cloudflare Workers to restore lost signal fidelity.",
        whatWeDid: [
            {
                step: "01",
                title: "Rapid UGC & Hook Testing Pipeline",
                description: "We dismantled their studio product photography and replaced it with a structured creative sprint. We produced 15 UGC reel concepts weekly across three high-converting formats: Problem-Agitation (acne flareups vs botanical soothing), Ingredient Breakdown (niacinamide + saffron formulation), and Honest 14-Day Micro-Documentaries. Every ad was built with 3 distinct 3-second hook variations to defeat algorithmic creative fatigue."
            },
            {
                step: "02",
                title: "Full-Funnel Advantage+ Shopping Restructuring",
                description: "We consolidated fragmented ad sets into an Advantage+ Shopping Campaign (ASC) structure. We established clear budget guardrails: 70% budget allocated to cold acquisition testing proven hooks, 20% dedicated to Dynamic Product Ads (DPA) featuring post-purchase cross-sells, and 10% reserved for Google Search brand protection to harvest Meta-generated demand."
            },
            {
                step: "03",
                title: "Server-Side CAPI & Shopify Attribution Fix",
                description: "We implemented Meta Conversions API (CAPI) with redundant server-side tracking, achieving an Event Quality Match score of 9.2/10. This allowed Meta's machine-learning algorithm to optimize for high-LTV purchasers rather than casual window-shoppers."
            },
            {
                step: "04",
                title: "Post-Click Conversion Rate & AOV Optimization",
                description: "We replaced single-product destination pages with high-converting bundle landers (e.g., 'The 3-Step Clear Skin Routine'). By introducing smart 1-click order-bump add-ons at checkout, Average Order Value (AOV) increased by 42% from ₹890 to ₹1,265, instantly improving unit economics."
            }
        ],
        detailedResults: [
            {
                metric: "Blended Return on Ad Spend (ROAS)",
                before: "1.4x",
                after: "6.1x",
                impact: "+335% ROAS increase"
            },
            {
                metric: "Monthly Tracked Revenue",
                before: "₹3,20,000",
                after: "₹18,40,000",
                impact: "+475% revenue scale"
            },
            {
                metric: "Cost Per Acquisition (CPA)",
                before: "₹680",
                after: "₹421",
                impact: "38% cheaper customer acquisition"
            },
            {
                metric: "Average Order Value (AOV)",
                before: "₹890",
                after: "₹1,265",
                impact: "+₹375 margin per customer"
            }
        ],
        keyTakeaways: [
            "Creative is the new targeting: UGC reels with strong 3-second hooks outperformed detailed interest targeting by 4.2x.",
            "Attribution fidelity matters: Installing Meta CAPI recovered 28% of unrecorded purchases, allowing the ad algorithm to find higher-value buyers.",
            "Unit economics drive scale: Boosting AOV from ₹890 to ₹1,265 through bundled landers allowed the brand to bid more aggressively while expanding profit margins."
        ],
        tags: ["Meta Ads", "UGC Creatives", "D2C Skincare", "Shopify CRO", "Conversions API"],
        testimonial: {
            text: "We went from barely breaking even to our most profitable quarter since inception. The creative sprint system Social Ninja's deployed was unlike any agency we worked with before — they delivered content that felt like real people sharing genuine skin transformations rather than corporate ads.",
            author: "Priya V.",
            role: "Founder & CEO, Zara Skin Co.",
            image: "https://randomuser.me/api/portraits/women/28.jpg"
        },
        publishedAt: "2026-03-12",
        updatedAt: "2026-09-28",
        relatedService: {
            name: "Performance Marketing & Paid Ads",
            path: "/services/paid-ads"
        }
    },
    {
        id: 2,
        slug: "nexvue-technologies",
        client: "Nexvue Technologies",
        logo: "https://placehold.co/200x60/020617/ffffff?text=Nexvue+Tech",
        category: "B2B Lead Gen",
        industry: "Enterprise HR Tech & SaaS",
        location: "Pune, Maharashtra",
        timeline: "120-Day Deployment",
        servicesUsed: [
            "Paid Ads (LinkedIn & Meta)",
            "AI Automation & Lead Routing",
            "Growth Consulting"
        ],
        mainMetric: "+134%",
        metricLabel: "Qualified Sales Pipeline",
        secondaryMetrics: [
            { label: "Cost Per Lead (CPL)", value: "-52%" },
            { label: "Demo Show-Up Rate", value: "+31%" },
            { label: "Pipeline Value Added", value: "₹1.2Cr+" },
            { label: "Lead Response Time", value: "<60s" }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        clientBackground: "Nexvue Technologies is a mid-market B2B HR SaaS platform that automates attendance tracking, payroll compliance, and employee lifecycle management for organizations with 200 to 2,000 employees. With an average annual contract value (ACV) of ₹3.5L to ₹8L, the leadership team needed predictable enterprise demos for their 6-person sales engineering team.",
        challenge: "Despite an enterprise-ready product, Nexvue's existing LinkedIn campaigns were hemorrhaging budget. They were generating high lead volume, but over 78% of form fills were junior HR interns, students, or small companies under 20 employees with zero software budget. Their Cost Per Lead sat at an unsustainable ₹4,200, demo-to-close rate hovered below 8%, and over 42% of scheduled prospects failed to attend their booked demo calls.",
        solution: "Social Ninja's engineered an Account-Based Marketing (ABM) outbound and paid capture engine. We eliminated open-form lead generation, built a proprietary interactive HR Attrition Calculator, deployed hyper-segmented LinkedIn and Meta retargeting to 800 verified mid-market companies, and integrated an autonomous AI lead-qualification and calendar sync sequence.",
        whatWeDid: [
            {
                step: "01",
                title: "ABM Target Account List (TAL) Curation",
                description: "We extracted and verified a precision list of 800 high-intent enterprise accounts across Indian manufacturing, IT services, and retail sectors. We mapped verified decision-maker titles: CHROs, VP of Human Resources, Head of Payroll, and Chief Operating Officers, eliminating non-decision makers from media delivery."
            },
            {
                step: "02",
                title: "High-Intent Interactive Value Asset",
                description: "We replaced passive corporate whitepapers with an interactive web tool: 'The Mid-Market Employee Turnover & Compliance Cost Calculator'. Decision-makers entered their headcount and current payroll error rate to receive an instant, personalized audit report. This filtered out unqualified tire-kickers and established undeniable business ROI before sales touchpoints."
            },
            {
                step: "03",
                title: "Omnipresent Founder & Proof Retargeting",
                description: "Using matched audience custom lists, we surrounded engaged decision-makers with short video snippets from Nexvue's founder explaining regulatory payroll compliance in India, accompanied by enterprise customer video case studies from respected brands."
            },
            {
                step: "04",
                title: "Sub-60s AI Qualification & Calendar Sync",
                description: "When an executive requested a demo, an automated webhook routed lead data through our AI qualifier. Leads meeting company size criteria received an instant personalized WhatsApp confirmation and 1-click Google/Outlook calendar link with automated SMS reminders, lifting demo show rates from 58% to 89%."
            }
        ],
        detailedResults: [
            {
                metric: "Sales Qualified Leads (SQL) Volume",
                before: "18 / month",
                after: "44 / month",
                impact: "+144% qualified pipeline increase"
            },
            {
                metric: "Cost Per Qualified Lead (CPL)",
                before: "₹4,200",
                after: "₹2,015",
                impact: "52% reduction in acquisition cost"
            },
            {
                metric: "Demo Attendance / Show-Up Rate",
                before: "58%",
                after: "89%",
                impact: "+31% higher pipeline velocity"
            },
            {
                metric: "Total Qualified Pipeline Value",
                before: "₹48L",
                after: "₹1.68Cr",
                impact: "Added ₹1.2Cr in active deals"
            }
        ],
        keyTakeaways: [
            "Stop collecting names, start collecting intent: Calculators and interactive tools self-qualify budget authority far better than gating generic eBooks.",
            "Sub-60-second follow-up closes deals: Automating calendar confirmation via WhatsApp and SMS eliminates no-shows and prevents leads from researching competitors.",
            "ABM lists save media spend: Narrowing audience targeting to 800 verified enterprise accounts lowered CPL by 52% while doubling pipeline quality."
        ],
        tags: ["B2B SaaS", "LinkedIn Ads", "Account-Based Marketing", "AI Automation", "HubSpot CRM"],
        testimonial: {
            text: "We wasted nearly six months on marketing agencies that flooded our CRM with unqualified leads who couldn't afford our software. Social Ninja's completely rebuilt our demand engine. In our first full quarter, our account executives closed three enterprise logos directly traced to their ABM funnel.",
            author: "Rohit M.",
            role: "VP Marketing, Nexvue Technologies",
            image: "https://randomuser.me/api/portraits/men/41.jpg"
        },
        publishedAt: "2026-04-18",
        updatedAt: "2026-09-28",
        relatedService: {
            name: "AI Automation & CRM Integration",
            path: "/services/ai-automation"
        }
    },
    {
        id: 3,
        slug: "the-biryani-house",
        client: "The Biryani House",
        logo: "https://placehold.co/200x60/020617/ffffff?text=Biryani+House",
        category: "Local Business",
        industry: "Hospitality & Cloud Kitchen Chain",
        location: "Hyderabad, Telangana",
        timeline: "60-Day Campaign",
        servicesUsed: [
            "Instagram SEO & Organic Growth",
            "Creative Studio (Short-Form Reels)",
            "Local Search Optimization"
        ],
        mainMetric: "4.2M+",
        metricLabel: "Organic Views in 60 Days",
        secondaryMetrics: [
            { label: "Direct WhatsApp Orders", value: "+210%" },
            { label: "New Instagram Followers", value: "62K" },
            { label: "Aggregator Fee Savings", value: "₹4.8L+" },
            { label: "Google Maps Actions", value: "18.5K" }
        ],
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=1200",
        clientBackground: "The Biryani House is an authentic woodfire Hyderabadi dum biryani kitchen operating 3 busy cloud kitchens and one flagship dine-in restaurant in Hyderabad. Known locally for authentic spices and generous meat portions, the business was generating consistent volume but suffering margin compression due to steep 28%–32% commissions charged by delivery platforms like Zomato and Swiggy.",
        challenge: "Despite stellar food quality and a 4.6-star rating, The Biryani House had zero digital brand equity. Their Instagram profile was inactive, posting occasional flyer graphics that averaged fewer than 40 likes. They had no direct ordering channel, leaving them 100% dependent on third-party aggregators. With a major new location launching in Jubilee Hills in 60 days, they needed organic footfall and direct customer relationships without burning millions on paid ads.",
        solution: "Social Ninja's launched a multi-faceted organic dominance strategy focusing on Instagram SEO, sensory 4K food cinematography, micro-influencer launch sprints, and a frictionless direct WhatsApp ordering engine that bypassed third-party aggregator commissions.",
        whatWeDid: [
            {
                step: "01",
                title: "Instagram Search (SEO) Architecture",
                description: "We optimized their Instagram bio, display name, handle keywords, and post alt-text around high-volume local search phrases like 'Best Hyderabadi Biryani', 'Authentic Dum Biryani Jubilee Hills', and 'Late Night Food Hyderabad'. Within 3 weeks, their account ranked in the top 3 results for regional culinary search terms."
            },
            {
                step: "02",
                title: "Sensory ASMR Video Production",
                description: "We deployed our production team with macro lenses and binaural microphones to shoot authentic culinary storytelling. We produced high-energy, sensory reels: the unsealing of steaming clay pots, slow-motion rice aeration, and chef POV ghee pours. These reels triggered Instagram's recommendation algorithm, generating millions of non-follower impressions."
            },
            {
                step: "03",
                title: "Hyper-Local Micro-Influencer Blitz",
                description: "Rather than paying high fees to generic lifestyle creators, we curated 12 authentic Hyderabad food vloggers with dedicated local followings. We hosted an exclusive midnight tasting session 5 days before the new branch opening, resulting in synchronized reel drops that dominated Hyderabad explore pages."
            },
            {
                step: "04",
                title: "Direct WhatsApp Commerce Funnel",
                description: "We created customized smart QR codes on packaging and in-profile link trees directing customers straight into a WhatsApp ordering flow with an exclusive '10% Direct-Order Loyalty Benefit'. Over 2,400 customers converted into direct re-order subscribers in the first two months."
            }
        ],
        detailedResults: [
            {
                metric: "Organic Video Impressions",
                before: "12,000 / mo",
                after: "4,200,000+",
                impact: "350x organic reach expansion"
            },
            {
                metric: "Direct Customer Orders",
                before: "140 / mo",
                after: "434 / mo",
                impact: "+210% margin-rich orders"
            },
            {
                metric: "Instagram Audience Following",
                before: "1,850",
                after: "63,850",
                impact: "+62,000 hyper-local followers"
            },
            {
                metric: "Monthly Third-Party Commission Saved",
                before: "₹0 saved",
                after: "₹2,40,000 / mo",
                impact: "₹4.8L preserved in gross margin"
            }
        ],
        keyTakeaways: [
            "Sensory storytelling beats paid ads: Authentic high-frame-rate food preparation consistently beats static advertising on social feeds.",
            "Instagram is the new search engine: Optimizing post captions, audio tags, and profile metadata captures users actively searching for dining recommendations.",
            "Direct customer data is priceless: Transitioning customers to a direct WhatsApp ordering channel insulates restaurants against aggregator fee hikes."
        ],
        tags: ["Instagram SEO", "Reels Production", "Hospitality", "WhatsApp Commerce", "Local SEO"],
        testimonial: {
            text: "62,000 organic followers in two months without spending a single rupee on Meta Ads. On the opening day of our Jubilee Hills branch, we had a 45-minute queue down the street solely because of the viral reel series. Direct WhatsApp ordering has completely shifted our profitability.",
            author: "Azhar K.",
            role: "Co-Founder, The Biryani House",
            image: "https://randomuser.me/api/portraits/men/67.jpg"
        },
        publishedAt: "2026-05-04",
        updatedAt: "2026-09-28",
        relatedService: {
            name: "Instagram SEO & Discovery",
            path: "/services/instagram-seo"
        }
    },
    {
        id: 4,
        slug: "pocketfit-india",
        client: "PocketFit India",
        logo: "https://placehold.co/200x60/020617/ffffff?text=PocketFit",
        category: "App Growth",
        industry: "Consumer Health & Mobile Apps",
        location: "Mumbai, Maharashtra",
        timeline: "90-Day Sprint",
        servicesUsed: [
            "Performance Marketing",
            "Creative Studio (Vernacular Creators)",
            "App Store Optimization (ASO)"
        ],
        mainMetric: "-61%",
        metricLabel: "Cost Per Install (CPI)",
        secondaryMetrics: [
            { label: "Day-30 Retention", value: "2.8x" },
            { label: "App Store Ranking", value: "Top 12" },
            { label: "Monthly Active Users", value: "180K+" },
            { label: "Paywall Conversion", value: "+44%" }
        ],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
        clientBackground: "PocketFit India is a mobile fitness app tailored for working professionals and homemakers across tier-2 and tier-3 Indian cities. Offering 15-minute guided bodyweight workouts, regional meal plans, and Hindi/Marathi audio coaching, the app is priced affordably at ₹299 per year or ₹49 per month to drive mass adoption.",
        challenge: "When scaling paid user acquisition via Meta and Google UAC campaigns, PocketFit was hit with an unsustainable Cost Per Install (CPI) of ₹180. With their low annual price point, this resulted in deeply negative unit economics. Furthermore, their generic English-language fitness ads attracted low-intent downloads: Day-1 retention was 24%, and Day-30 retention dropped below 11%, leading to rapid user churn and poor app store visibility.",
        solution: "We re-engineered PocketFit's growth engine around hyper-regional vernacular creator content, App Store Optimization for high-intent search keywords, and an automated onboarding journey that drove immediate product activation within 90 seconds of download.",
        whatWeDid: [
            {
                step: "01",
                title: "Vernacular Living-Room Creator Sprints",
                description: "We stopped running glossy gym ads and contracted 16 regional fitness creators across Indore, Lucknow, Nagpur, and Surat. We produced authentic, unpolished mobile-shot reels in Hindi and Marathi showing relatable workouts in modest living rooms without expensive gym equipment, resonating deeply with tier-2 audiences."
            },
            {
                step: "02",
                title: "App Store Optimization (ASO) Engine",
                description: "We localized the Google Play and Apple App Store listings with regional keywords, revised screenshots showcasing Hindi audio coaching, and localized video previews. This lifted organic app store conversion rate by 38% and propelled PocketFit into the Top 12 in the Health & Fitness category."
            },
            {
                step: "03",
                title: "Sub-90-Second Onboarding Re-Architecture",
                description: "We collaborated with their product team to shorten time-to-first-workout. We replaced lengthy 14-screen registration forms with an interactive 3-question fitness assessment ('What is your goal?', 'How many minutes daily?', 'Preferred language?'), dropping drop-off rates by 46%."
            },
            {
                step: "04",
                title: "Push Notification & Habit Retention Triggers",
                description: "We integrated event-based push notification journeys triggered by user schedule preferences (e.g., 'Your 15-min morning stretch starts in 5 minutes'). Users receiving targeted prompts showed a 2.8x higher Day-30 retention rate."
            }
        ],
        detailedResults: [
            {
                metric: "Cost Per Install (CPI)",
                before: "₹180",
                after: "₹71",
                impact: "61% drop in paid acquisition cost"
            },
            {
                metric: "Day-30 User Retention",
                before: "11%",
                after: "31%",
                impact: "2.8x increase in product stickiness"
            },
            {
                metric: "Play Store Category Ranking",
                before: "#84",
                after: "#12",
                impact: "Top 12 Health & Fitness in India"
            },
            {
                metric: "Free-to-Paid Paywall Conversion",
                before: "3.2%",
                after: "4.6%",
                impact: "+44% higher subscription conversion"
            }
        ],
        keyTakeaways: [
            "Language and relatability conquer CAC: Vernacular creator content in regional languages outperformed English creative assets by 3.4x in tier-2 India.",
            "ASO provides free compounding compounding downloads: Ranking in the top 12 of an App Store category delivers sustained, zero-CAC organic installs every day.",
            "Activation predicts retention: Getting a new user to complete their first 5-minute session on Day 1 is the single greatest predictor of annual subscription renewal."
        ],
        tags: ["App Growth", "Vernacular Marketing", "Performance Marketing", "ASO", "Mobile Retention"],
        testimonial: {
            text: "Switching from generic fitness ads to vernacular living-room creators changed our entire business trajectory. Our install costs collapsed from ₹180 to ₹71, and because the creators were relatable, the users who downloaded the app actually stuck around past the first month.",
            author: "Sneha P.",
            role: "Head of Growth, PocketFit India",
            image: "https://randomuser.me/api/portraits/women/53.jpg"
        },
        publishedAt: "2026-06-14",
        updatedAt: "2026-09-28",
        relatedService: {
            name: "Performance Marketing & Acquisition",
            path: "/services/paid-ads"
        }
    },
    {
        id: 5,
        slug: "aura-aesthetics-clinic",
        client: "Aura Aesthetics & Dental",
        logo: "https://placehold.co/200x60/020617/ffffff?text=Aura+Aesthetics",
        category: "High-Ticket Healthcare",
        industry: "Cosmetic Dermatology & Aesthetic Dentistry",
        location: "Dubai (Jumeirah) & Bangalore",
        timeline: "90-Day Full Deployment",
        servicesUsed: [
            "AI Appointment Setter",
            "Paid Ads (Meta & Google Search)",
            "Email & WhatsApp Automation"
        ],
        mainMetric: "₹46L+",
        metricLabel: "High-Ticket Treatment Revenue",
        secondaryMetrics: [
            { label: "Lead Response Time", value: "<25 Seconds" },
            { label: "Consultation Booking Rate", value: "3.2x" },
            { label: "Clinic Show-Up Rate", value: "84%" },
            { label: "Cost Per Booked Patient", value: "-68%" }
        ],
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
        clientBackground: "Aura Aesthetics & Dental is a luxury cosmetic clinic operating out of Jumeirah (Dubai) and Indiranagar (Bangalore). Specializing in high-ticket treatments including Invisalign aligners, full-mouth dental implants, laser resurfacing, and non-surgical facial rejuvenation, their procedure values range from ₹45,000 to over ₹3,50,000 ($600 to $4,500 USD).",
        challenge: "Aura was spending ₹3,50,000 per month on Google and Meta Ads, generating roughly 250 inbound inquiries monthly. However, their front-desk receptionists were overwhelmed with in-clinic patients and took 4 to 12 hours to call back digital leads. By the time the clinic reached out, over 65% of prospects had already contacted rival clinics or lost interest. Worse, of the consultations actually scheduled, 55% failed to show up, wasting valuable doctor chair time.",
        solution: "Social Ninja's deployed our Autonomous AI Appointment Setter system integrated directly with WhatsApp Business API and Google Calendar. We connected paid advertising directly into conversational AI qualification that contacted every lead in under 25 seconds, vetted treatment budget, scheduled doctor appointments, and ran automated multi-channel pre-visit nurture workflows.",
        whatWeDid: [
            {
                step: "01",
                title: "24/7 Sub-30s WhatsApp AI Setter",
                description: "We implemented an intelligent conversational AI setter trained on Aura's clinical FAQs, pricing tiers, and contraindications. The moment a lead submitted a form on Instagram or Google, the AI initiated a conversational WhatsApp chat within 22 seconds, asking qualifying questions about desired treatment, timeline, and budget."
            },
            {
                step: "02",
                title: "Frictionless 2-Way Calendar Booking",
                description: "Once qualified, the AI presented available consultation slots based on live doctor schedules and booked appointments directly into the clinic's CRM without human intervention. Confirmation emails and WhatsApp calendar invites were delivered instantaneously."
            },
            {
                step: "03",
                title: "Interactive Pre-Consultation Nurture Cadence",
                description: "To fix the 55% no-show problem, we built an automated pre-visit sequence: an introductory video from the treating physician, clinic parking and landmark directions via Google Maps, a treatment preparation checklist, and an automated 24-hour WhatsApp confirmation prompt."
            },
            {
                step: "04",
                title: "Doctor-Led Video Ad Creative Revamp",
                description: "We replaced stock model imagery with doctor-led procedural walk-throughs and patient testimonial journeys explaining clear aligner technology, drastically lifting lead intent and eliminating price objections before the consultation call."
            }
        ],
        detailedResults: [
            {
                metric: "Average Speed-to-Lead Response",
                before: "5.5 Hours",
                after: "22 Seconds",
                impact: "99% faster first touchpoint"
            },
            {
                metric: "Inquiry to Booked Consultation Rate",
                before: "9.2%",
                after: "29.4%",
                impact: "3.2x higher consultation volume"
            },
            {
                metric: "Consultation In-Clinic Show Rate",
                before: "45%",
                after: "84%",
                impact: "+39% higher doctor chair utilization"
            },
            {
                metric: "Attributed Treatment Revenue (90 Days)",
                before: "₹14,20,000",
                after: "₹46,80,000",
                impact: "+₹32.6L in closed procedures"
            }
        ],
        keyTakeaways: [
            "Speed-to-lead is everything in high-ticket services: Inquiring leads called within 60 seconds convert at 391% higher rates than those contacted after 2 hours.",
            "Autonomous AI eliminates human fatigue: Front-desk staff cannot respond to leads at 11 PM on Sunday; an AI setter works 24/7 with zero lag.",
            "Pre-visit nurture destroys no-shows: Sending doctor video introductions and practical directions builds personal trust and reduces cancellation rates to under 16%."
        ],
        tags: ["AI Appointment Setter", "WhatsApp Automation", "Healthcare Lead Gen", "Google Ads", "Dubai Medical"],
        testimonial: {
            text: "Our biggest headache wasn't generating leads — it was that our front desk was too busy with patients to respond promptly. Social Ninja's AI setter now books appointments while we sleep. Our consultation attendance jumped from 45% to 84%, generating over ₹46 Lakhs in new patient revenue in our first quarter.",
            author: "Dr. Farhan A.",
            role: "Clinical Director, Aura Aesthetics & Dental",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        publishedAt: "2026-07-20",
        updatedAt: "2026-09-28",
        relatedService: {
            name: "AI Appointment Setter Systems",
            path: "/services/ai-appointment-setter"
        }
    },
    {
        id: 6,
        slug: "cloudscale-logistics",
        client: "CloudScale Logistics",
        logo: "https://placehold.co/200x60/020617/ffffff?text=CloudScale",
        category: "Enterprise Outbound",
        industry: "3PL & Cold-Chain Supply Logistics",
        location: "Navi Mumbai, Maharashtra",
        timeline: "90-Day Enterprise Sprint",
        servicesUsed: [
            "Email & WhatsApp Systems",
            "AI Automation & Enrichment",
            "Growth Consulting"
        ],
        mainMetric: "₹3.4Cr+",
        metricLabel: "Closed Enterprise Contract Value",
        secondaryMetrics: [
            { label: "Cold Email Inbox Placement", value: "98.4%" },
            { label: "Positive Executive Reply Rate", value: "14.2%" },
            { label: "Enterprise Sales Calls Booked", value: "38 Meetings" },
            { label: "Average Deal Value", value: "₹28L/Year" }
        ],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
        clientBackground: "CloudScale Logistics is a tech-enabled third-party logistics (3PL) and temperature-controlled cold-chain warehousing provider based in Navi Mumbai. Serving enterprise FMCG, pharmaceutical, and rapid-growth D2C brands, CloudScale's contracts average ₹25L to ₹60L in annual recurring logistics fees.",
        challenge: "CloudScale's executive sales team was facing a critical pipeline bottleneck. Inbound search volume for enterprise cold-chain warehousing is notoriously thin, and traditional cold calling was stopped dead by corporate switchboard gatekeepers. To make matters worse, an internal sales rep sent 8,000 unauthenticated cold emails from their primary company domain, ruining their SPF/DKIM records and sending their corporate email straight into Google and Microsoft spam folders.",
        solution: "Social Ninja's engineered an enterprise cold outbound infrastructure. We isolated and warmed 12 dedicated secondary outbound domains with custom tracking domains (CTD), deployed AI web scrapers to enrich target account warehouse pain points, and launched a multi-threaded personalized email and LinkedIn outreach cadence.",
        whatWeDid: [
            {
                step: "01",
                title: "Bulletproof Domain Cluster & Inbox Warming",
                description: "We spun up 12 secondary lookalike domains configured with independent Google Workspace accounts, strict SPF, DKIM, DMARC, and custom tracking domains. Each inbox was warmed systematically over 21 days via automated peer-to-peer engagement, reaching a pristine 98.4% primary inbox placement score."
            },
            {
                step: "02",
                title: "AI Account Research & Trigger-Based Scraping",
                description: "We built automated scraping workflows that identified enterprise FMCG and pharma brands actively expanding into western India, experiencing warehouse stockouts, or receiving negative customer reviews regarding transit spoilage. This provided acute, timely context for every outreach message."
            },
            {
                step: "03",
                title: "Multi-Threaded Cold Outreach Cadence",
                description: "We wrote ultra-personalized, short-form 4-touch email sequences focused strictly on solving temperature-logistics compliance, avoiding salesy jargon. If an executive opened an email multiple times without replying, an automated touchpoint was triggered on LinkedIn."
            },
            {
                step: "04",
                title: "HubSpot CRM Synchronization & Lead Routing",
                description: "When an executive replied positively, an automated webhook routed the conversation into HubSpot, alerted the designated senior Account Executive on Slack, and pushed calendar options via WhatsApp, securing meetings with zero administrative lag."
            }
        ],
        detailedResults: [
            {
                metric: "Primary Inbox Placement",
                before: "22% (Spam-flagged)",
                after: "98.4%",
                impact: "Full domain deliverability recovery"
            },
            {
                metric: "Positive Executive Reply Rate",
                before: "0.8%",
                after: "14.2%",
                impact: "17.7x higher reply rate"
            },
            {
                metric: "Qualified Meetings with Heads of Supply Chain",
                before: "2 / month",
                after: "38 in 90 days",
                impact: "Over 12 qualified enterprise calls/month"
            },
            {
                metric: "Closed Multi-Year Logistics Contracts",
                before: "₹0 outbound",
                after: "₹3,40,00,000",
                impact: "₹3.4Cr in new annual contract value"
            }
        ],
        keyTakeaways: [
            "Never risk the primary domain: Outbound email requires dedicated, warmed secondary domains with isolated DNS records to protect day-to-day corporate operations.",
            "Relevance beats volume: 500 hyper-researched emails sent to the right supply chain heads generated more revenue than 20,000 generic spam blasts.",
            "Speed of reply handoff secures the contract: When an enterprise director replies 'Send details', scheduling a call within 10 minutes increases conversion by 80%."
        ],
        tags: ["Cold Email Infrastructure", "Deliverability", "B2B Enterprise", "Logistics", "HubSpot Automation"],
        testimonial: {
            text: "Before Social Ninja's, our corporate domain was blacklisted and our sales reps couldn't get a single meeting with enterprise brand directors. Their team built a pristine outbound machine that booked 38 meetings with senior supply chain heads, resulting in ₹3.4 Crores in closed warehousing contracts in three months.",
            author: "Vikram S.",
            role: "Director of Business Development, CloudScale Logistics",
            image: "https://randomuser.me/api/portraits/men/51.jpg"
        },
        publishedAt: "2026-08-11",
        updatedAt: "2026-09-28",
        relatedService: {
            name: "Email & WhatsApp Outbound Systems",
            path: "/services/email-whatsapp"
        }
    }
];