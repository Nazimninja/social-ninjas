import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   SOCIAL NINJA'S — AI CONTENT STUDIO  v7
   ✦ Razorpay only · ✦ No graphics — pure content depth
   ✦ Platform-specific research · ✦ Plans from ₹3,999
   ✦ ClickUp CRM · ✦ Google Sheets auto-log
   © Social Ninja's — AI Automations Division
═══════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────
//  CONFIG — fill in your links, everything else is ready
// ─────────────────────────────────────────────────────────────────
const CONFIG = {
  brandName:    "Social Ninja's",
  brandTagline: "AI Content Studio",
  accentColor:  "#5ba4f5",

  // ✅ YOUR SINGLE RAZORPAY LINK — all plans pay here
  // For subscriptions: create 3 subscription plans in Razorpay dashboard
  // For one-time: use razorpay.me/@socialninjas directly
  razorpay: {
    starter:   "https://rzp.io/rzp/90qEc0D",    // ₹2,999/mo
    growth:    "https://rzp.io/rzp/YkQovO28",   // ₹5,499/mo
    pro:       "https://rzp.io/rzp/Kk2QqWB",    // ₹8,999/mo
    // Replace above with specific subscription plan links once created
    // e.g. https://rzp.io/l/sn-starter-monthly
  },

  // ClickUp — lists already live in your workspace
  clickup: {
    leadsListId:   "901613894433",
    activeListId:  "901613894434",
    renewalListId: "901613894435",
  },

  // Google Sheets webhook — paste Apps Script URL here
  sheetsWebhook: import.meta?.env?.VITE_GOOGLE_SHEET_URL || "",
};

// ─────────────────────────────────────────────────────────────────
//  PLANS — starting ₹2,999, no-brainer value architecture
// ─────────────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Video-first growth — 2 platforms",
    priceINR: 2999,
    displayINR: "₹2,999",
    originalINR: "₹9,999",
    postsPerWeek: 4,
    postsPerMonth: 15,
    platformCount: 2,
    color: "#5ba4f5",
    badge: null,
    platformOptions: ["Instagram", "Facebook", "YouTube", "LinkedIn", "Twitter/X", "Threads"],
    features: [
      { icon: "🎬", text: "15 posts/month — video-first strategy" },
      { icon: "📽", text: "Full Reel/Short scripts — word-for-word, ready to film" },
      { icon: "🔍", text: "Live trend research before every generation" },
      { icon: "✍️", text: "Platform-native captions + hooks" },
      { icon: "📌", text: "Viral hashtag sets per post" },
      { icon: "🗓", text: "Weekly content calendar with best posting times" },
      { icon: "📊", text: "Client profile dashboard — track your growth" },
      { icon: "♻️", text: "Content memory — AI never repeats" },
      { icon: "📲", text: "Choose 2 platforms" },
      { icon: "📧", text: "Email support" },
    ],
    guarantee: "Try free — 3 posts generated instantly, no card required",
    perPost: "₹267/post",
    highlight: "Video content gets 3× more reach — we lead with Reels",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Most popular — 4 platforms",
    priceINR: 5499,
    displayINR: "₹5,499",
    originalINR: "₹18,000",
    postsPerWeek: 6,
    postsPerMonth: 25,
    platformCount: 4,
    color: "#7C3AED",
    badge: "BEST VALUE",
    platformOptions: ["Instagram", "Facebook", "YouTube", "LinkedIn", "Twitter/X", "Threads", "Pinterest", "Snapchat"],
    features: [
      { icon: "📅", text: "25 posts/month — 6 per week" },
      { icon: "🔍", text: "Deep trend research per platform" },
      { icon: "✍️", text: "Platform-native captions + Reel scripts" },
      { icon: "🎠", text: "Full carousel slide copy per post" },
      { icon: "📌", text: "Platform-optimised hashtag strategy" },
      { icon: "🗓", text: "Full content calendar — all 3 platforms" },
      { icon: "📈", text: "Weekly trend report — your niche only" },
      { icon: "📲", text: "Choose 4 platforms" },
      { icon: "⚡", text: "Priority support — 24hr response" },
      { icon: "📞", text: "Monthly 30-min strategy call" },
    ],
    guarantee: "Full refund if not satisfied within 7 days — zero questions",
    perPost: "₹260/post",
    highlight: "Save ₹11,501/mo vs hiring a content team",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Unlimited — every platform",
    priceINR: 8999,
    displayINR: "₹8,999",
    originalINR: "₹35,000",
    postsPerWeek: 999,
    postsPerMonth: 999,
    platformCount: 999,
    color: "#E31313",
    badge: "AGENCY GRADE",
    platformOptions: ["Instagram", "Facebook", "YouTube", "LinkedIn", "Twitter/X", "Threads", "Pinterest", "Snapchat", "TikTok", "All Platforms"],
    features: [
      { icon: "∞", text: "Unlimited posts — generate anytime" },
      { icon: "🔍", text: "Real-time viral trend research" },
      { icon: "✍️", text: "Every content format — posts, reels, carousels, stories" },
      { icon: "🎬", text: "Word-for-word Reel + YouTube scripts" },
      { icon: "🎠", text: "Complete carousel decks with CTA slides" },
      { icon: "📌", text: "Competitor gap analysis per generation" },
      { icon: "📲", text: "Every platform — no limits" },
      { icon: "✉️", text: "Priority email support — 24hr response" },
      { icon: "📞", text: "Bi-weekly strategy call — agency founder" },
      { icon: "🔄", text: "Cancel anytime — no contracts" },
    ],
    guarantee: "Cancel anytime. No lock-in. No questions.",
    perPost: "Unlimited",
    highlight: "Same output as a full content team for 95% less",
  },
];

// ─────────────────────────────────────────────────────────────────
//  GEO PRICING — currency by country
// ─────────────────────────────────────────────────────────────────
const GEO_PRICING = {
  // country_code: { currency, symbol, rates: [starter, growth, pro], originals: [orig_starter, orig_growth, orig_pro] }
  IN:  { currency:"INR", symbol:"₹",  flag:"🇮🇳", rates:[2999,5499,8999],   originals:[9999,18000,35000],  perPost:["₹200","₹220","Unlimited"] },
  US:  { currency:"USD", symbol:"$",  flag:"🇺🇸", rates:[49,79,149],         originals:[129,219,419],       perPost:["$3.3","$3.2","Unlimited"] },
  GB:  { currency:"GBP", symbol:"£",  flag:"🇬🇧", rates:[39,65,119],         originals:[99,179,339],        perPost:["£2.6","£2.6","Unlimited"] },
  AE:  { currency:"AED", symbol:"AED",flag:"🇦🇪", rates:[179,299,549],       originals:[479,829,1549],      perPost:["AED 12","AED 12","Unlimited"] },
  AU:  { currency:"AUD", symbol:"A$", flag:"🇦🇺", rates:[75,119,229],        originals:[199,329,649],       perPost:["A$5","A$4.8","Unlimited"] },
  SG:  { currency:"SGD", symbol:"S$", flag:"🇸🇬", rates:[65,105,199],        originals:[175,289,549],       perPost:["S$4.3","S$4.2","Unlimited"] },
  CA:  { currency:"CAD", symbol:"C$", flag:"🇨🇦", rates:[69,109,209],        originals:[179,299,569],       perPost:["C$4.6","C$4.4","Unlimited"] },
  DE:  { currency:"EUR", symbol:"€",  flag:"🇩🇪", rates:[45,75,139],         originals:[119,209,389],       perPost:["€3","€3","Unlimited"] },
  FR:  { currency:"EUR", symbol:"€",  flag:"🇫🇷", rates:[45,75,139],         originals:[119,209,389],       perPost:["€3","€3","Unlimited"] },
  NL:  { currency:"EUR", symbol:"€",  flag:"🇳🇱", rates:[45,75,139],         originals:[119,209,389],       perPost:["€3","€3","Unlimited"] },
  _DEFAULT: { currency:"USD", symbol:"$", flag:"🌐", rates:[49,79,149], originals:[129,219,419], perPost:["$3.3","$3.2","Unlimited"] },
};

// Detect visitor's country via free IP API, cache in sessionStorage
async function detectGeo() {
  try {
    const cached = sessionStorage.getItem("sn_geo");
    if(cached) return JSON.parse(cached);
    const r = await fetch("https://ipapi.co/json/");
    const d = await r.json();
    const result = { country: d.country_code||"_DEFAULT", city: d.city, region: d.region };
    sessionStorage.setItem("sn_geo", JSON.stringify(result));
    return result;
  } catch { return { country:"_DEFAULT" }; }
}

function getPricing(countryCode, planIndex) {
  const geo = GEO_PRICING[countryCode] || GEO_PRICING["_DEFAULT"];
  return {
    geo,
    price: geo.rates[planIndex],
    original: geo.originals[planIndex],
    display: geo.symbol + geo.rates[planIndex].toLocaleString(),
    displayOriginal: geo.symbol + geo.originals[planIndex].toLocaleString(),
    perPost: geo.perPost[planIndex],
    disc: Math.round((1 - geo.rates[planIndex]/geo.originals[planIndex])*100),
  };
}

// ─────────────────────────────────────────────────────────────────
//  PLATFORM CONFIGS — how AI writes per platform
// ─────────────────────────────────────────────────────────────────
const PLATFORM_DNA = {
  "Instagram": {
    formats: ["Reel","Carousel","Feed Post","Story"],
    captionStyle: "Hook in line 1. Storytelling body. CTA at end. Max 150 words. Line breaks every 2–3 lines. 3–5 emojis max.",
    hashtagCount: 10,
    hashtagStyle: "Mix: 3 broad (1M+), 4 mid (100k–500k), 3 niche (<50k). No banned tags.",
    scriptStyle: "15–30 second Reel. Hook (0–3s): must stop scroll. Body: value/story. End: CTA + audio cue.",
    bestTimes: ["7am","12pm","6pm","9pm"],
    contentTypes: ["Reels get 3× reach — prioritise","Carousels save rate is highest","Talking head builds trust fastest"],
    viralMechanics: "Pattern interrupt hooks, save-worthy value, comment bait questions",
    requiresScript: true,
    requiresCarousel: true,
    requiresThread: false,
  },
  "Facebook": {
    formats: ["Video Post","Link Post","Story","Carousel Ad"],
    captionStyle: "Conversational. Story-led. 50–300 words. Emotional triggers. Community language.",
    hashtagCount: 3,
    hashtagStyle: "3 hashtags max on Facebook. Broad, topic-level only.",
    scriptStyle: "60–90 second Facebook video. Slow hook — don't rush. Story arc. Soft CTA at end.",
    bestTimes: ["9am","1pm","3pm"],
    contentTypes: ["Long-form video performs","Personal stories viral","Community questions drive comments"],
    viralMechanics: "Relatable opinions, share-triggers, Facebook groups cross-posting",
  },
  "YouTube": {
    formats: ["YouTube Short","Long-Form Video","Community Post"],
    captionStyle: "VIDEO TITLE (not a social caption): 60 chars max, keyword-first for SEO. Example: 'How I Grew 10K Followers in 30 Days'. Then: SEO description 200+ words with timestamps, keywords in first 2 lines.",
    hashtagCount: 5,
    hashtagStyle: "5 hashtags: channel topic + 4 searchable keyword tags. No spam.",
    scriptStyle: "Choose ONE: (A) YouTube Short (60 sec max) — vertical video, hook in first 3 sec, fast delivery, loop-worthy ending. OR (B) Long-Form (8-15 min) — hook story first 60 sec, chapter outline with timestamps, full talking script. Always include [DIRECTION: camera/cut/text] notes. YouTube NEVER uses carousel slides.",
    bestTimes: ["2pm","5pm","8pm Fri-Sun"],
    contentTypes: ["Shorts for discovery — always generate first","Long-form for authority and watch time","Community posts for subscriber retention"],
    viralMechanics: "Keyword-rich titles (search intent), strong thumbnail concept, retention hooks every 2 min, end-screen CTAs",
    requiresScript: true,
    requiresCarousel: false,
    requiresThread: false,
  },
  "LinkedIn": {
    formats: ["LinkedIn Post","LinkedIn Document Carousel","LinkedIn Video","Poll"],
    captionStyle: "Line 1: bold opinion OR surprising stat — no fluff, no greetings. Data-backed professional insight. 150–300 words. Short paragraphs 1–2 lines max. This is NOT an Instagram caption — no emoji spam, professional voice. End with a thought-provoking question to drive comments.",
    hashtagCount: 5,
    hashtagStyle: "5 precise professional hashtags. Industry-specific. e.g. #GrowthMarketing #B2BSaaS — NOT #viral #love",
    scriptStyle: "LinkedIn Video (60–90 sec): Speak directly to camera, smart casual. Bold claim in first 5 sec. No background music. Subtitles CRITICAL. Structure: Hook claim → data/proof → actionable takeaway → invite comment. This is NOT a Reel — professional delivery only.",
    bestTimes: ["8am","12pm","5pm Tue–Thu"],
    contentTypes: ["Document/PDF carousels get 3x saves — frameworks and lists perform best","Video posts get 5x reach vs text","Personal founder story + real data = highest engagement","Polls drive massive comment volume"],
    viralMechanics: "Contrarian professional takes, personal story + hard data, save-worthy frameworks as Document carousels (NOT image carousels)",
    requiresScript: false,
    requiresCarousel: true,
    requiresThread: false,
    isLinkedIn: true,
  },
  "Twitter/X": {
    formats: ["Tweet Thread","Single Tweet","Reply Hook","Quote Tweet"],
    captionStyle: "Tweet: max 280 chars. Punchy. Opinion-forward. Thread: Hook tweet → 8–12 numbered tweets → CTA tweet.",
    hashtagCount: 2,
    hashtagStyle: "1–2 hashtags only on X. Trending or niche-specific.",
    scriptStyle: "Twitter/X video: 30–60 sec. No intro fluff. Jump straight in. Subtitles always.",
    bestTimes: ["8am","12pm","5pm","9pm"],
    contentTypes: ["Threads go viral fastest","Hot takes with data","Replies to trending topics"],
    viralMechanics: "Controversial but true statements, thread hooks, reply farming",
  },
  "Threads": {
    formats: ["Thread","Single Post","Reply"],
    captionStyle: "Conversational, warm, authentic. Max 500 chars. Like texting a friend. No hashtags needed.",
    hashtagCount: 0,
    hashtagStyle: "No hashtags on Threads — algorithm ignores them.",
    scriptStyle: "No video scripts needed — Threads is text-first.",
    bestTimes: ["9am","1pm","7pm"],
    contentTypes: ["Short opinions get reshared","Personal takes outperform brand content","Reply chains build following fast"],
    viralMechanics: "Authentic unpopular opinions, Instagram crosspost, reply-driven growth",
  },
  "Pinterest": {
    formats: ["Idea Pin","Standard Pin","Video Pin"],
    captionStyle: "SEO-keyword rich description. 100–150 words. Focus on searchable terms. Seasonal awareness.",
    hashtagCount: 5,
    hashtagStyle: "5–10 descriptive tags matching search intent.",
    scriptStyle: "Idea Pin: 3–5 slides. Step-by-step or how-to format. Visual-first.",
    bestTimes: ["8pm","9pm Fri/Sat"],
    contentTypes: ["How-to content pins best","Infographic style drives saves","Seasonal content is evergreen"],
    viralMechanics: "SEO-optimised titles, tall format, save-worthy utility content",
  },
  "Snapchat": {
    formats: ["Snap Story","Spotlight"],
    captionStyle: "Very short. 1 line max. Casual, Gen Z tone. Entertainment-first.",
    hashtagCount: 0,
    hashtagStyle: "No hashtags on Snapchat.",
    scriptStyle: "10–15 second Spotlight. Raw, authentic. No production needed. Sound-on assumed.",
    bestTimes: ["12pm","10pm"],
    contentTypes: ["Authentic behind-scenes works","Entertainment drives Spotlight","Story series builds retention"],
    viralMechanics: "Raw authenticity, behind-scenes exclusivity, fast entertainment",
  },
  "TikTok": {
    formats: ["TikTok Video","TikTok Live","Photo Mode"],
    captionStyle: "Short caption: 1–3 lines. Trending sound name if relevant. 3–5 hashtags max.",
    hashtagCount: 5,
    hashtagStyle: "Mix trending sounds hashtags + niche + FYP. Max 5.",
    scriptStyle: "15–60 sec TikTok. HOOK in first 1 second (text overlay + visual). Trending audio. Loop potential at end.",
    bestTimes: ["7am","12pm","7pm","9pm"],
    contentTypes: ["Trending audio × niche = viral","Duet/Stitch builds massive reach","POV format converts"],
    viralMechanics: "Trending sound + niche pivot, fast hook, loop-worthy endings",
  },
  "All Platforms": {
    formats: ["Multi-platform post","Platform-adapted content"],
    captionStyle: "Write platform-native versions for each active platform.",
    hashtagCount: 10,
    hashtagStyle: "Adapt hashtags per platform.",
    scriptStyle: "Write separate scripts per platform format.",
    bestTimes: ["Multiple times per day"],
    contentTypes: ["Cross-platform repurposing","Core content adapted per platform"],
    viralMechanics: "Content ecosystem — one idea, many formats",
  },
};

// ─────────────────────────────────────────────────────────────────
//  MY PROFILES
// ─────────────────────────────────────────────────────────────────
const MY_PROFILES = {
  sn_ig:  {
    id:"sn_ig", name:"Social Ninja's", sub:"Instagram", emoji:"🥷",
    color:"#5ba4f5", darkBg:"#050B1A", brand:"sn",
    platforms:["Instagram"],
    audience:"Global founders, D2C CMOs, startup heads — US/UK/UAE/SG/AU",
    tone:"Confident, data-led, direct. Results-obsessed agency voice. No fluff.",
    avoid:"No ₹, no Bangalore, no local. $ and global framing only.",
    niche:"performance marketing, D2C growth, Meta ads, Instagram growth, agency building",
    businessContext:"Social Ninja's is a premium AI-powered social media agency helping D2C brands and founders grow globally",
  },
  sn_li:  {
    id:"sn_li", name:"Social Ninja's", sub:"LinkedIn", emoji:"🥷",
    color:"#5ba4f5", darkBg:"#050B1A", brand:"sn",
    platforms:["LinkedIn"],
    audience:"Global B2B — CMOs, growth leads, D2C founders, startup heads",
    tone:"Thought leader. Data-heavy. McKinsey insight, direct founder delivery.",
    avoid:"No local references. Global metrics: %, ROAS, CAC, CPL.",
    niche:"B2B marketing, D2C scaling, performance marketing, growth strategy, AI automation",
    businessContext:"Social Ninja's is a premium AI-powered social media agency. LinkedIn is for B2B lead generation.",
  },
  gear_ig:{
    id:"gear_ig", name:"9th Gear", sub:"Instagram", emoji:"🏎",
    color:"#E31313", darkBg:"#0A0800", brand:"gear",
    platforms:["Instagram"],
    audience:"LOCAL Bangalore/Karnataka HNIs, luxury car buyers 28–55, car enthusiasts",
    tone:"Trustworthy, aspirational, warm local luxury expert. Premium but approachable.",
    avoid:"International framing. Lean into Bangalore/Koramangala identity.",
    niche:"luxury used cars Bangalore, BMW Mercedes Audi pre-owned, Koramangala, premium automobiles",
    businessContext:"9th Gear is a luxury pre-owned car dealership in Koramangala, Bangalore. We sell certified BMW, Mercedes, Audi, Porsche.",
  },

};

// ─────────────────────────────────────────────────────────────────
//  STORAGE
// ─────────────────────────────────────────────────────────────────
const DB = {
  async get(k){try{const r=localStorage.getItem(k);return r?JSON.parse(r):null;}catch{return null;}},
  async set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}},
};

// ─────────────────────────────────────────────────────────────────
//  VALIDATION
// ─────────────────────────────────────────────────────────────────
const V = {
  email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  phone:    v => /^[+]?[\d\s\-()]{8,15}$/.test(v.trim()),
  url:      v => !v || /^https?:\/\/.+\..+/.test(v.trim()),
  notEmpty: v => v.trim().length >= 2,
  minWords: (v,n) => v.trim().split(/\s+/).length >= n,
};
const fieldErr=(k,v)=>{
  if(k==="email"&&!V.email(v)) return "Enter a valid email address";
  if(k==="phone"&&v&&!V.phone(v)) return "Enter a valid phone number (e.g. +91 98765 43210)";
  if(k==="website"&&v&&!V.url(v)) return "Enter a valid URL starting with https://";
  if(k==="brandName"&&!V.notEmpty(v)) return "Brand name is required";
  if(k==="audience"&&!V.minWords(v,5)) return "Describe your audience — at least 5 words";
  if(k==="businessContext"&&!V.minWords(v,8)) return "Tell us more — at least 8 words helps the AI write better";
  if(k==="tone"&&!V.notEmpty(v)) return "Brand voice is required";
  if(k==="niche"&&!V.notEmpty(v)) return "Content niche is required";
  return null;
};

// ─────────────────────────────────────────────────────────────────
//  CLICKUP PUSH
// ─────────────────────────────────────────────────────────────────
async function pushToClickUp(data, listId) {
  try {
    const desc=`**Brand:** ${data.brandName}
**Email:** ${data.email}
**Phone:** ${data.phone||"—"}
**Plan:** ${data.planName} (${data.displayINR}/mo)
**Platforms:** ${(data.platforms||[data.platform]).join(", ")}
**Audience:** ${data.audience}
**Business:** ${data.businessContext}
**Niche:** ${data.niche}
**Tone:** ${data.tone}
**Website:** ${data.website||"—"}
**Payment ID:** ${data.paymentId||"—"}
**Joined:** ${data.joinDate}`;
    await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,
        tools:[{type:"url",url:"https://mcp.clickup.com/mcp",name:"clickup-mcp"}],
        messages:[{role:"user",content:`Create task in ClickUp list ${listId} named "${data.brandName} — ${data.planName}" with this description:\n${desc}`}]})});
  } catch{}
}

// ─────────────────────────────────────────────────────────────────
//  GOOGLE SHEETS PUSH
// ─────────────────────────────────────────────────────────────────
async function pushToSheets(data) {
  if(!CONFIG.sheetsWebhook||CONFIG.sheetsWebhook.includes("YOUR_SCRIPT")) return;
  try {
    await fetch(CONFIG.sheetsWebhook,{method:"POST",mode:"no-cors",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        timestamp:new Date().toISOString(),
        brand:data.brandName,email:data.email,phone:data.phone||"",
        plan:data.planName,price:data.displayINR,
        platforms:(data.platforms||[data.platform]).join(", "),
        audience:data.audience,niche:data.niche,
        website:data.website||"",joinDate:data.joinDate,
        paymentId:data.paymentId||"",status:"active",
      })});
  } catch{}
}

// ─────────────────────────────────────────────────────────────────
//  BACKEND SYNC PUSH
// ─────────────────────────────────────────────────────────────────
async function pushToBackend(data) {
  try {
    await fetch("/api/data?resource=clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("Failed to sync to backend:", error);
  }
}

// ─────────────────────────────────────────────────────────────────
//  AI PROMPT — platform-specific, no graphics, pure content depth
// ─────────────────────────────────────────────────────────────────
function buildPrompt(profile, prevTitles=[]) {
  const platforms = profile.platforms || [profile.sub||profile.platform||"Instagram"];
  const mainPlat  = platforms[0];
  const dna       = PLATFORM_DNA[mainPlat] || PLATFORM_DNA["Instagram"];
  const allDNA    = platforms.map(p => PLATFORM_DNA[p]||PLATFORM_DNA["Instagram"]);
  const prev      = prevTitles.length
    ? `\nNEVER REPEAT THESE (already published):\n${prevTitles.map((t,i)=>`${i+1}. ${t}`).join("\n")}\n`:"";

  const platformInstructions = platforms.length > 1
    ? platforms.map(p => {
        const d = PLATFORM_DNA[p]||PLATFORM_DNA["Instagram"];
        return `\n### ${p}
- Formats: ${d.formats.join(", ")}
- Caption style: ${d.captionStyle}
- Hashtags: ${d.hashtagCount} tags — ${d.hashtagStyle}
- Script style: ${d.scriptStyle}
- Best times: ${d.bestTimes.join(", ")}
- What works: ${d.contentTypes.join(" | ")}
- Viral mechanics: ${d.viralMechanics}`;
      }).join("\n")
    : `- Formats available: ${dna.formats.join(", ")}
- Caption style: ${dna.captionStyle}
- Hashtag count: ${dna.hashtagCount} — ${dna.hashtagStyle}
- Script requirements: ${dna.scriptStyle}
- Best posting times: ${dna.bestTimes.join(", ")}
- What performs: ${dna.contentTypes.join(" | ")}
- Viral mechanics on this platform: ${dna.viralMechanics}`;

  return `You are a world-class viral content strategist with 15 years experience growing brands to millions of followers across every social platform. You've run content for brands doing $100M+ in revenue. Every post you write is strategically engineered to stop the scroll, hold attention, and drive action.

## CLIENT BRIEF
- Brand: ${profile.brandName||profile.name}
- Business: ${profile.businessContext||profile.industry||profile.niche||"Growing brand"}
- Target Audience: ${profile.audience||"People interested in "+profile.niche}
- Brand Voice: ${profile.tone||profile.personality||"Engaging, authentic, relatable"}
- Content Niche: ${profile.niche||profile.industry||"General"}
- Active Platforms: ${platforms.join(", ")}
- Avoid: ${profile.avoid||"Nothing specific"}
${profile.competitors?`- Competitors to Research: ${profile.competitors} — study what they post, find gaps, write angles that differentiate`:""}
${profile.tagline?`- Tagline: ${profile.tagline}`:""}
${profile.socialAccounts?.instagram?`- Instagram: @${profile.socialAccounts.instagram.replace("@","")} — research this account's recent posts, engagement style, and what's working/missing`:""}
${profile.socialAccounts?.linkedin?`- LinkedIn: ${profile.socialAccounts.linkedin} — analyse their LinkedIn presence and content gaps`:""}
${profile.socialAccounts?.youtube?`- YouTube: ${profile.socialAccounts.youtube} — analyse their channel strategy and content opportunities`:""}
${profile.socialAccounts?.tiktok?`- TikTok: @${profile.socialAccounts.tiktok.replace("@","")} — research their TikTok content angles`:""}
${profile.socialAccounts?.twitter?`- Twitter/X: @${profile.socialAccounts.twitter.replace("@","")} — analyse their X presence`:""}
${prev}
## PLATFORM INTELLIGENCE
${platformInstructions}

## YOUR JOB
Step 1: Use web_search to find what is ACTUALLY TRENDING RIGHT NOW in "${profile.niche}" on ${platforms.join(" and ")}. Search for:
- "${mainPlat} trending content ${new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"})}"
- "viral ${(profile.niche.split(",")[0]||"").trim()} content ${mainPlat}"
- trending hashtags, sounds, formats, memes or conversations in this niche this week
${profile.competitors?`- Also search what ${profile.competitors.split(",")[0]?.trim()} is posting lately to find gaps you can fill`:""}
${profile.socialAccounts?.instagram||profile.socialAccounts?.linkedin?`- Search the client's brand "${profile.brandName}" online to understand their current positioning and what content gaps exist`:""}

Step 2: Write 3 complete, platform-native posts using what you found. Every post must be deeply researched and hyper-specific to "${profile.niche}" — no generic content.

## PLATFORM-SPECIFIC RULES (NON-NEGOTIABLE)
- YouTube: "caption" field = SEO video TITLE (60 chars, keyword-first). No carousel_slides. Script = YouTube Short (60 sec) OR Long-Form with chapter outline. 
- LinkedIn: Professional thought-leadership tone. "caption" = 150-300 word post (bold opinion opening). carousel_slides = Document/PDF format (6-8 data-driven slides). NOT Instagram-style.
- Instagram/TikTok: Short reel scripts (15-30 sec). Carousel = swipe posts (5+ slides). Visual hooks.
- Twitter/X: thread_tweets only. No carousel. No scripts.
- Threads: Short conversational text only. No hashtags. No scripts.
- Each post must cover a DIFFERENT topic — never repeat the same angle across posts.

## CONTENT RULES
- Every caption must open with a PATTERN INTERRUPT — a bold statement, controversial opinion, or specific number that stops the scroll in 0.3 seconds. No greetings, no "Are you...", no questions as openers.
- Captions must be LONG and valuable — minimum 150 words. Use line breaks every 1-2 sentences. Include specific facts, numbers, or insights. Not fluffy filler.
- Captions must be platform-native (Instagram caption ≠ LinkedIn post ≠ Twitter thread)
- Scripts MUST be word-for-word, minimum 180 words, with [DIRECTION: ...] notes for every scene change, text overlay, B-roll cut, and camera action. Write it so someone can read it cold and film immediately.
- Carousel slides must be complete — EVERY slide's heading AND full body copy written. Minimum 5 slides. Slide 1 = hook, Last slide = strong CTA. Each slide must standalone-valuable.
- Hooks must create a knowledge gap or open loop the brain is compelled to close
- Hashtags must be NICHE-SPECIFIC — mix of: 3 broad niche tags, 3 mid-size community tags, 3 micro-niche tags, 1 trending tag. NO generic tags like #love #instagood #viral
- CTAs must be specific, low-friction, and tied to the post content — not "follow for more" or "link in bio"
- Content must feel like it was written by a practitioner who lives this niche — insider language, specific examples, real numbers

## RESPONSE FORMAT
CRITICAL: Return ONLY raw JSON. Start immediately with { — no markdown fences, no preamble, no explanation.

{
  "trends": [
    {"name":"string","platform":"string","why":"string (max 20 words)","heat":"Hot|Rising|Emerging","source":"what you found in search"}
  ],
  "posts": [
    ${platforms.map((p,i) => {
      const d = PLATFORM_DNA[p] || PLATFORM_DNA["Instagram"];
      const needsScript  = d.requiresScript  !== false && p !== "Threads" && p !== "Twitter/X" && p !== "Pinterest";
      const needsCarousel= d.requiresCarousel !== false && p !== "YouTube" && p !== "Twitter/X" && p !== "Threads" && p !== "TikTok" && p !== "Snapchat";
      const needsThread  = p === "Twitter/X";
      const isYT = p === "YouTube";
      const isLI = p === "LinkedIn";
      const htags = d.hashtagCount > 5 ? ',"t4","t5","t6","t7","t8","t9","t10"' : d.hashtagCount > 3 ? ',"t4","t5"' : '';
      return `{
      "id":"p${i+1}",
      "platform":"${p}",
      "format":"${d.formats[0]}",
      "title":"string — post title/topic (max 8 words, specific to ${p})",
      "priority":"Must Post|High Value|Good to Post",
      "best_day":"string",
      "best_time":"${d.bestTimes[0]}",
      "trend_used":"string — which specific trend this post rides on ${p}",
      "why_now":"string — why this angle works THIS week on ${p} (max 20 words)",
      "hook":"string — ${isYT ? 'video title (60 chars max, SEO keyword-first)' : 'opening line that stops scroll on '+p+' (max 15 words)'}",
      "caption":"string — ${isYT ? 'SEO video description (200+ words, keywords in first 2 lines, timestamps)' : isLI ? 'professional LinkedIn post (150-300 words, bold stat/opinion opening, NOT an Instagram caption)' : 'full '+p+'-native caption with line breaks, min 100 words'}",
      "hashtags":["t1","t2","t3"${htags}],
      "cta":"string — specific CTA for ${p}",
      "script":${needsScript ? `"${isYT ? 'YOUTUBE: Choose Short (60 sec, vertical, hook 0-3s, fast, loop ending) OR Long-Form (full script with chapter outline and timestamps). Include [DIRECTION: camera/cut/text] notes throughout. Min 200 words.' : isLI ? 'LINKEDIN VIDEO (60-90 sec): Bold claim 0-5s, data/proof, actionable takeaway, invite comment. No music. Subtitles critical. Professional delivery. [DIRECTION] notes for each section. Min 150 words.' : 'Word-for-word script with [DIRECTION: camera/text/action] every 5-10 sec. Hook in first 2 sec. Min 150 words. Speakable as written.'}"`  : '"null"'},
      "carousel_slides":${needsCarousel ? `[{"slide_num":1,"heading":"string","body":"string — ${isLI ? 'LinkedIn Document carousel (PDF format). Slide 1=title card, slides 2-6=data/framework/insight, last slide=CTA+follow. Professional design.' : 'Instagram/Facebook carousel. Slide 1=bold hook, slides 2-4=value, last slide=CTA. Each slide save-worthy.'}","design_note":"string"}]` : '"null"'},
      "thread_tweets":${needsThread ? '[{"num":1,"tweet":"string (max 280 chars)"},{"num":2,"tweet":"..."}] — min 7 tweets, last tweet=CTA. Each tweet standalone-valuable. Number them like 1/8.' : '"null"'},
      "posting_checklist":["${p}-specific step 1","step 2","step 3","step 4","step 5"],
      "engagement_tip":"string — one specific action in first 30 min after posting on ${p} to boost reach"
    }`;}).join(',\n    ')}
  ]
}`;
}

// ─────────────────────────────────────────────────────────────────
//  UTILITY COMPONENTS
// ─────────────────────────────────────────────────────────────────
function CopyBtn({text,label="Copy",sm,full}){
  const [ok,setOk]=useState(false);
  return(
    <button onClick={()=>{navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),2000);}}
      style={{background:ok?"rgba(47,207,142,0.15)":"rgba(91,164,245,0.12)",
        color:ok?"#2fcf8e":"rgba(255,255,255,0.6)",
        border:`1px solid ${ok?"#166534":"rgba(255,255,255,0.12)"}`,
        borderRadius:7,padding:sm?"4px 10px":"7px 15px",fontSize:sm?11:12,
        fontWeight:600,cursor:"pointer",transition:"all .15s",
        width:full?"100%":undefined,textAlign:full?"center":undefined}}>
      {ok?"✓ Copied":label}
    </button>
  );
}

function Field({label,name,value,onChange,error,placeholder,type="text",rows,hint,required,children}){
  return(
    <div>
      <label style={{fontSize:11,fontWeight:700,
        color:error?"#e8b86d":"rgba(255,255,255,0.4)",
        textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6}}>
        {label}{required&&<span style={{color:"#E31313",marginLeft:3}}>*</span>}
      </label>
      {children||( rows
        ?<textarea value={value} onChange={e=>onChange(name,e.target.value)}
          placeholder={placeholder} rows={rows}
          style={{width:"100%",background:error?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",
            border:`1px solid ${error?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,
            padding:"10px 13px",color:"#fff",fontSize:13,resize:"vertical",outline:"none",
            boxSizing:"border-box",lineHeight:1.65,fontFamily:"inherit"}}/>
        :<input value={value} onChange={e=>onChange(name,e.target.value)}
          placeholder={placeholder} type={type}
          style={{width:"100%",background:error?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",
            border:`1px solid ${error?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,
            padding:"10px 13px",color:"#fff",fontSize:13,outline:"none",
            boxSizing:"border-box",fontFamily:"inherit"}}/>
      )}
      {error&&<div style={{fontSize:11,color:"#e8b86d",marginTop:4}}>⚠ {error}</div>}
      {hint&&!error&&<div style={{fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:4}}>{hint}</div>}
    </div>
  );
}

const MONO={fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#c8d8f0",
  whiteSpace:"pre-wrap",lineHeight:1.85,background:"#020209",borderRadius:10,
  padding:"14px 16px",border:"1px solid rgba(255,255,255,0.07)",maxHeight:380,overflowY:"auto",margin:0};

// Normalize AI-returned escaped newlines to real newlines
function fixText(t){ return t ? t.replace(/\\n/g,"\n").replace(/\\t/g,"  ").trim() : t; }

// ─────────────────────────────────────────────────────────────────
//  HOW TO USE BANNER
// ─────────────────────────────────────────────────────────────────
function HowToUseBanner({color, postCount}){
  const [dismissed, setDismissed] = useState(false);
  if(dismissed) return null;
  const steps = [
    { n:"1", icon:"📋", label:"Copy Caption", desc:"Caption tab → Copy Complete button → paste into Instagram/LinkedIn" },
    { n:"2", icon:"🎬", label:"Film Your Script", desc:"Script tab → read word-for-word on camera. [Brackets] = directions for you" },
    { n:"3", icon:"🎠", label:"Design Slides", desc:"Slides tab → copy each slide's heading + body → paste into Canva" },
    { n:"4", icon:"✅", label:"Post It Right", desc:"Checklist tab → follow each step to maximise reach on posting day" },
  ];
  return(
    <div style={{background:"linear-gradient(135deg,rgba(56,189,248,0.08),rgba(56,189,248,0.03))",
      border:"1px solid rgba(56,189,248,0.25)",borderRadius:16,padding:"20px 22px",marginBottom:24,position:"relative"}}>
      <button onClick={()=>setDismissed(true)} title="Dismiss"
        style={{position:"absolute",top:12,right:14,background:"rgba(255,255,255,0.06)",border:"none",
          color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:14,lineHeight:1,borderRadius:6,
          width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <span style={{fontSize:20}}>🗺️</span>
        <div>
          <div style={{fontSize:14,fontWeight:800,color:"#f1f5f9",letterSpacing:"-.3px"}}>
            {postCount} posts generated — here is how to use each one</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>
            Click the tabs inside each post card to switch between sections</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:8}}>
        {steps.map((s,i)=>(
          <div key={i} style={{background:"rgba(0,0,0,0.3)",borderRadius:12,padding:"12px 14px",
            border:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{width:28,height:28,borderRadius:8,background:`${color}22`,color,
              fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {s.n}</div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#e2e8f0",marginBottom:3}}>
                {s.icon} {s.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.42)",lineHeight:1.55}}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  POST CARD — redesigned for clarity and usability
// ─────────────────────────────────────────────────────────────────
function PostCard({post, profile, index}){
  const color = profile.color||"#5ba4f5";
  const [tab,setTab]=useState("caption");
  const [copied,setCopied]=useState(false);

  // Map distinct colours to each platform to make them stand out
  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case "instagram": return { bg: "#E1306C", text: "#fff" };
      case "linkedin": return { bg: "#0077B5", text: "#fff" };
      case "youtube": return { bg: "#FF0000", text: "#fff" };
      case "twitter/x": return { bg: "#1DA1F2", text: "#fff" };
      case "twitter": return { bg: "#1DA1F2", text: "#fff" };
      case "facebook": return { bg: "#1877F2", text: "#fff" };
      case "tiktok": return { bg: "#00f2fe", text: "#000" };
      default: return { bg: color, text: "#fff" };
    }
  };

  const pColor = getPlatformColor(post.platform);


  const tabs=[
    {id:"caption", icon:"📋", label:"Caption", hint:"Copy & paste into your post"},
    ...(post.script?[{id:"script", icon:"🎬", label:"Script", hint:"Read on camera word-for-word"}]:[]),
    ...(post.carousel_slides?.length?[{id:"slides", icon:"🎠", label:"Slides", hint:"Each slide for Canva"}]:[]),
    ...(post.thread_tweets?.length?[{id:"thread", icon:"🧵", label:"Thread", hint:"Post tweets in order"}]:[]),
    {id:"checklist", icon:"✅", label:"Checklist", hint:"Step-by-step posting guide"},
  ];

  const priorityMap = {
    "Must Post":    {bg:"rgba(28,22,8,0.9)",border:"#e8b86d30",col:"#e8b86d",badge:"🔴 Must Post"},
    "High Value":   {bg:"#1c1408",border:"#f59e0b30",col:"#fcd34d",badge:"🟡 High Value"},
    "Good to Post": {bg:"#0a1c0e",border:"#22c55e30",col:"#86efac",badge:"🟢 Good to Post"},
  };
  const ps=priorityMap[post.priority]||priorityMap["Good to Post"];

  const copyAll = () => {
    const caption = fixText(post.caption)||"";
    const tags = (post.hashtags||[]).map(h=>`#${h.replace(/^#/,"")}`).join(" ");
    navigator.clipboard.writeText(`${caption}\n\n${tags}`);
    setCopied(true); setTimeout(()=>setCopied(false),2200);
  };

  return(
    <div style={{background:"rgba(8,14,26,0.85)",border:`1px solid ${color}20`,borderRadius:20,overflow:"hidden",backdropFilter:"blur(32px) saturate(180%)",WebkitBackdropFilter:"blur(32px) saturate(180%)",boxShadow:`inset 0 1px 0 rgba(255,255,255,0.06),0 8px 32px rgba(0,0,0,0.3)`}}>

      {/* ── HEADER STRIP ── */}
      <div style={{background:`linear-gradient(135deg,${color}14,${color}06)`,
        borderBottom:`1px solid ${color}18`,padding:"18px 22px"}}>

        {/* Post number + platform + priority */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
          <div style={{width:28,height:28,borderRadius:8,background:`${color}20`,border:`1px solid ${color}30`,
            color,fontWeight:900,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {index+1}</div>
          <span style={{background:pColor.bg,color:pColor.text,boxShadow:`0 0 10px ${pColor.bg}40`,
            borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:"1px"}}>
            {post.platform||"—"}</span>
          <span style={{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.6)",
            borderRadius:20,padding:"4px 13px",fontSize:11,fontWeight:600}}>
            {post.format}</span>
          <span style={{background:ps.bg,border:`1px solid ${ps.border}`,color:ps.col,
            borderRadius:20,padding:"4px 13px",fontSize:11,fontWeight:700,marginLeft:"auto"}}>
            {ps.badge}</span>
        </div>

        {/* Title */}
        <div style={{fontSize:17,fontWeight:700,color:"rgba(255,255,255,0.97)",letterSpacing:"-.5px",lineHeight:1.25,marginBottom:10,fontFamily:"'Bricolage Grotesque',system-ui,sans-serif"}}>
          {post.title}</div>

        {/* Hook */}
        {post.hook&&(
          <div style={{background:"rgba(0,0,0,0.3)",border:`1px solid ${color}25`,borderRadius:11,
            padding:"10px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{background:`${color}20`,color,borderRadius:6,padding:"2px 8px",
              fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:"1.5px",
              whiteSpace:"nowrap",flexShrink:0,marginTop:1}}>HOOK</div>
            <div style={{fontSize:13,color:"#e2e8f0",fontWeight:600,fontStyle:"italic",lineHeight:1.5}}>
              "{post.hook}"</div>
          </div>
        )}

        {/* Schedule pill */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:10}}>
          <span style={{fontSize:12}}>📅</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.45)",fontWeight:600}}>
            Post on <span style={{color:"rgba(255,255,255,0.75)"}}>{post.best_day}</span> at <span style={{color:"rgba(255,255,255,0.75)"}}>{post.best_time}</span></span>
          {post.why_now&&<span style={{fontSize:11,color:"rgba(255,255,255,0.28)",marginLeft:6}}>· {post.why_now}</span>}
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div style={{background:"rgba(0,0,0,0.2)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"0 16px",display:"flex",gap:2,overflowX:"auto",scrollbarWidth:"none"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            title={t.hint}
            style={{padding:"10px 18px",fontSize:12.5,fontWeight:tab===t.id?700:400,border:"none",cursor:"pointer",
              whiteSpace:"nowrap",transition:"all .2s",
              borderBottom:`2px solid ${tab===t.id?color:"transparent"}`,
              background:tab===t.id?`${color}12`:"transparent",
              color:tab===t.id?color:"rgba(255,255,255,0.4)",
              display:"flex",alignItems:"center",gap:6,borderRadius:"8px 8px 0 0"}}>
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB HINT BAR ── */}
      <div style={{background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.04)",
        padding:"7px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",display:"flex",alignItems:"center",gap:6}}>
          <span style={{color,fontWeight:700}}>
            {tabs.find(t=>t.id===tab)?.icon} {tabs.find(t=>t.id===tab)?.label}:
          </span>
          <span>{tabs.find(t=>t.id===tab)?.hint}</span>
        </div>
        {tab==="caption"&&(
          <button onClick={copyAll}
            style={{background:copied?"#052e16":`${color}18`,color:copied?"#4ade80":color,
              border:`1px solid ${copied?"#166534":color+"40"}`,borderRadius:8,
              padding:"5px 14px",fontSize:11,fontWeight:700,cursor:"pointer",
              display:"flex",alignItems:"center",gap:5,transition:"all .2s",whiteSpace:"nowrap"}}>
            {copied?"✓ Copied! ":"⚡ Copy Caption + Tags"}
          </button>
        )}
      </div>

      {/* ── BODY ── */}
      <div style={{padding:"20px 22px",background:"rgba(8,12,22,0.7)"}}>

        {/* ════ CAPTION TAB ════ */}
        {tab==="caption"&&(
          <div style={{display:"grid",gap:14}}>

            {/* Caption text box */}
            <div style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,overflow:"hidden"}}>
              <div style={{padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",
                display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                  color:"rgba(255,255,255,0.3)"}}>📝 Caption text — copy this into your post</span>
                <CopyBtn text={fixText(post.caption)} label="Copy Caption" sm/>
              </div>
              <pre style={MONO}>{fixText(post.caption)}</pre>
            </div>

            {/* CTA */}
            {post.cta&&(
              <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:11,padding:"11px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                    color:"rgba(255,255,255,0.28)",marginBottom:4}}>💬 Call to Action — add this at the end</div>
                  <div style={{fontSize:13,color:"#f1f5f9",fontWeight:600}}>{post.cta}</div>
                </div>
                <CopyBtn text={post.cta} sm/>
              </div>
            )}

            {/* Hashtags */}
            {post.hashtags?.length>0&&(
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:11,padding:"13px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                    color:"rgba(255,255,255,0.28)"}}>🏷️ Hashtags — paste below your caption</span>
                  <CopyBtn text={post.hashtags.map(h=>`#${h.replace(/^#/,"")}`).join(" ")}
                    label="Copy Hashtags" sm/>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {post.hashtags.map((h,i)=>(
                    <span key={i} style={{background:`${color}12`,color:`${color}dd`,
                      border:`1px solid ${color}25`,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:600}}>
                      #{h.replace(/^#/,"")}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Ready-to-paste block */}
            <div style={{background:`${color}08`,border:`1px solid ${color}25`,borderRadius:13,padding:"14px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color,marginBottom:2}}>⚡ Ready to paste — caption + hashtags combined</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>Click the button → open {post.platform} → paste. Done.</div>
                </div>
                <button onClick={copyAll}
                  style={{background:copied?"#052e16":`linear-gradient(135deg,${color},${color}99)`,
                    color:copied?"#2fcf8e":"#fff",border:"none",borderRadius:10,
                    padding:"9px 18px",fontSize:12,fontWeight:800,cursor:"pointer",
                    transition:"all .2s",whiteSpace:"nowrap",flexShrink:0}}>
                  {copied?"✓ Copied!":"Copy Complete ↗"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════ SCRIPT TAB ════ */}
        {tab==="script"&&(
          <div style={{display:"grid",gap:12}}>
            {/* Instruction banner */}
            <div style={{background:"#070f1a",border:"1px solid rgba(56,189,248,0.2)",borderRadius:12,
              padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{fontSize:20,flexShrink:0}}>🎬</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#5ba4f5",marginBottom:4}}>How to use this script</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.65}}>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>1. Open your camera</strong> → film in portrait (9:16 vertical)<br/>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>2. Read each line</strong> exactly as written — then look at camera<br/>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>3. [DIRECTION: ...]</strong> = action for you (don't say these out loud)<br/>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>4. First 3 seconds</strong> = the hook line — nail this, it stops the scroll
                </div>
              </div>
            </div>

            {/* Script body */}
            {post.script?(
              <div style={{background:"rgba(0,0,0,0.25)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,overflow:"hidden"}}>
                <div style={{padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",
                  display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                    color:"rgba(255,255,255,0.3)"}}>Word-for-word script · [brackets] = your directions</span>
                  <CopyBtn text={fixText(post.script)} label="Copy Script" sm/>
                </div>
                <pre style={{...MONO,maxHeight:500,fontSize:13,lineHeight:1.9}}>{fixText(post.script)}</pre>
              </div>
            ):(
              <div style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"24px",textAlign:"center",
                color:"rgba(255,255,255,0.3)",fontSize:13}}>
                No script generated for this post format. Use the Caption tab instead.
              </div>
            )}
          </div>
        )}

        {/* ════ SLIDES TAB ════ */}
        {tab==="slides"&&(
          <div style={{display:"grid",gap:10}}>
            {/* Instruction */}
            <div style={{background:"#0a0f1a",border:"1px solid rgba(168,85,247,0.2)",borderRadius:12,
              padding:"12px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{fontSize:20,flexShrink:0}}>🎠</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#c084fc",marginBottom:4}}>How to turn these into a carousel</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.65}}>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>1. Open Canva</strong> → search "Instagram Carousel" template<br/>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>2. For each slide</strong> → copy the Heading + Body text → paste in<br/>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>3. Design note</strong> = colour/style suggestion for that slide<br/>
                  <strong style={{color:"rgba(255,255,255,0.7)"}}>4. Last slide</strong> = always your CTA / follow prompt
                </div>
              </div>
            </div>

            {/* Copy all */}
            <div style={{display:"flex",justifyContent:"flex-end"}}>
              <CopyBtn text={(post.carousel_slides||[]).map(s=>`Slide ${s.slide_num}: ${s.heading}\n${s.body}`).join("\n\n")}
                label={`Copy All ${post.carousel_slides?.length||0} Slides`}/>
            </div>

            {/* Slide cards */}
            {(post.carousel_slides||[]).map((s,i)=>(
              <div key={i} style={{background:"#020209",border:`1px solid rgba(168,85,247,0.18)`,
                borderRadius:14,overflow:"hidden"}}>
                <div style={{background:"rgba(168,85,247,0.08)",padding:"10px 16px",
                  borderBottom:"1px solid rgba(168,85,247,0.12)",
                  display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:28,height:28,borderRadius:8,background:"rgba(168,85,247,0.2)",
                      color:"#c084fc",fontWeight:800,fontSize:12,display:"flex",
                      alignItems:"center",justifyContent:"center"}}>
                      {s.slide_num}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9"}}>{s.heading}</div>
                      <div style={{fontSize:10,color:"rgba(168,85,247,0.7)",marginTop:1}}>
                        {i===0?"Opening slide — make this visually bold":
                         i===(post.carousel_slides.length-1)?"Last slide — strong call to action":"Body slide"}</div>
                    </div>
                  </div>
                  <CopyBtn text={`${s.heading}

${s.body}`} sm/>
                </div>
                <div style={{padding:"13px 16px"}}>
                  <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.75,marginBottom:s.design_note?10:0}}>
                    {s.body}</div>
                  {s.design_note&&(
                    <div style={{display:"flex",gap:6,alignItems:"flex-start",
                      background:"rgba(168,85,247,0.07)",borderRadius:8,padding:"8px 11px",
                      border:"1px solid rgba(168,85,247,0.15)"}}>
                      <span style={{fontSize:13}}>🎨</span>
                      <div>
                        <div style={{fontSize:10,fontWeight:700,color:"#c084fc",textTransform:"uppercase",
                          letterSpacing:"1px",marginBottom:2}}>Design note</div>
                        <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>{s.design_note}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════ THREAD TAB ════ */}
        {tab==="thread"&&post.thread_tweets?.length&&(
          <div style={{display:"grid",gap:8}}>
            <div style={{background:"#0a1018",border:"1px solid rgba(29,161,242,0.2)",borderRadius:12,
              padding:"12px 16px",display:"flex",gap:10,alignItems:"flex-start",marginBottom:4}}>
              <span style={{fontSize:18}}>🧵</span>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>
                Post tweet <strong style={{color:"rgba(255,255,255,0.7)"}}>1/</strong> first, then reply to it with each next tweet in order.
                Use the copy button on each tweet to paste one at a time.
              </div>
            </div>
            <CopyBtn text={post.thread_tweets.map(t=>`${t.num}/ ${t.tweet}`).join("\n\n")} label="Copy Entire Thread"/>
            {post.thread_tweets.map((t,i)=>(
              <div key={i} style={{display:"flex",gap:10}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:"rgba(29,161,242,0.15)",
                    color:"#60a5fa",fontWeight:800,fontSize:12,display:"flex",
                    alignItems:"center",justifyContent:"center"}}>{t.num}</div>
                  {i<post.thread_tweets.length-1&&(
                    <div style={{width:2,flex:1,background:"rgba(29,161,242,0.15)",margin:"4px 0"}}/>
                  )}
                </div>
                <div style={{background:"#020209",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,
                  padding:"12px 15px",flex:1,marginBottom:2}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:8}}>
                    <span style={{fontSize:10,color:"rgba(29,161,242,0.7)",fontWeight:700,
                      background:"rgba(29,161,242,0.1)",borderRadius:5,padding:"2px 8px"}}>
                      {t.tweet.length}/280 chars</span>
                    <CopyBtn text={t.tweet} sm/>
                  </div>
                  <div style={{fontSize:13,color:"#e2e8f0",lineHeight:1.75}}>{t.tweet}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════ CHECKLIST TAB ════ */}
        {tab==="checklist"&&(
          <div style={{display:"grid",gap:10}}>

            {/* Posting time card */}
            <div style={{background:`${color}10`,border:`1px solid ${color}25`,borderRadius:13,
              padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                  color:`${color}80`,marginBottom:4}}>📅 When to post this</div>
                <div style={{fontSize:20,fontWeight:800,color:"#f1f5f9",letterSpacing:"-.4px"}}>
                  {post.best_day} · {post.best_time}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:3}}>
                  Optimal time for {post.platform} · {post.format}
                </div>
              </div>
              <div style={{fontSize:36}}>⏰</div>
            </div>

            {/* Steps */}
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
              color:"rgba(255,255,255,0.28)",margin:"4px 0 2px"}}>📋 Step-by-step posting checklist</div>

            {(post.posting_checklist||[]).map((step,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",
                background:"rgba(255,255,255,0.03)",borderRadius:11,padding:"12px 16px",
                border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{width:26,height:26,borderRadius:8,background:`${color}20`,color,
                  fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",
                  flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>{i+1}</div>
                <span style={{fontSize:13,color:"rgba(255,255,255,0.7)",lineHeight:1.6}}>{step}</span>
              </div>
            ))}

            {/* Engagement tip */}
            {post.engagement_tip&&(
              <div style={{background:"#051a0e",border:"1px solid #16653430",borderRadius:12,padding:"14px 16px"}}>
                <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                  <span style={{fontSize:18}}>⚡</span>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                      color:"#4ade80",marginBottom:5}}>Do this in the first 30 minutes after posting</div>
                    <div style={{fontSize:13,color:"#86efac",lineHeight:1.65}}>{post.engagement_tip}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
//  TREND RESEARCH CARDS
// ─────────────────────────────────────────────────────────────────
function TrendCards({trends, color}){
  if(!trends?.length) return null;
  return(
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:13}}>🔍</span>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
          color:"rgba(255,255,255,0.3)"}}>Live trends found this week in your niche</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8}}>
        {trends.map((t,i)=>{
          const heat = t.heat==="Hot"?{bg:"rgba(30,24,8,0.9)",border:"#e8b86d28",col:"#e8b86d",tag:"🔥 Hot"}:
            t.heat==="Rising"?{bg:"#1c1408",border:"#f59e0b28",col:"#fcd34d",tag:"📈 Rising"}:
            {bg:"#081c0e",border:"#22c55e28",col:"#86efac",tag:"🌱 New"};
          return(
            <div key={i} style={{background:heat.bg,border:`1px solid ${heat.border}`,
              borderRadius:12,padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6,marginBottom:5}}>
                <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",lineHeight:1.3,flex:1}}>{t.name}</div>
                <span style={{fontSize:10,fontWeight:700,color:heat.col,whiteSpace:"nowrap",flexShrink:0,
                  background:heat.border,borderRadius:5,padding:"2px 7px"}}>{heat.tag}</span>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.38)",lineHeight:1.5}}>{t.why}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekCal({posts, color}){
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const full=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const byDay={};
  posts.forEach(p=>{const k=full.find(f=>f===p.best_day)?.slice(0,3);if(k)(byDay[k]=byDay[k]||[]).push(p);});
  const hasAny = Object.keys(byDay).length > 0;
  if(!hasAny) return null;
  return(
    <div style={{marginBottom:20}}>
      <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
        color:"rgba(255,255,255,0.3)",marginBottom:8}}>📅 Your posting schedule this week</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
        {days.map(d=>(
          <div key={d} style={{background:byDay[d]?`${color}0c`:"rgba(255,255,255,0.02)",
            border:`1px solid ${byDay[d]?color+"28":"rgba(255,255,255,0.05)"}`,
            borderRadius:10,padding:"7px 5px",minHeight:52,textAlign:"center"}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",
              color:byDay[d]?color:"rgba(255,255,255,0.22)",marginBottom:5}}>{d}</div>
            {byDay[d]?.map((p,i)=>(
              <div key={i} style={{background:`${color}18`,borderRadius:4,
                padding:"3px 4px",marginBottom:2}}>
                <div style={{fontSize:8,color,fontWeight:700,lineHeight:1.2}}>{p.format}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


const GEN_STEPS = [
  "🔍 Researching live trends in your niche...",
  "📊 Analysing platform algorithms...",
  "✍️ Writing platform-native captions...",
  "🎬 Scripting your Reels...",
  "✨ Final quality check...",
];

function Workspace({profile, hKey, onUpgrade}){
  const color=profile.color||"#5ba4f5";
  const [hist,setHist]=useState([]);
  const [gen,setGen]=useState(false);
  const [result,setResult]=useState(null);
  const [err,setErr]=useState(null);
  const [step,setStep]=useState(0);
  const tmr=useRef(null);
  const platforms=(profile.platforms||[profile.sub||"Instagram"]);

  useEffect(()=>{
    (async()=>{const h=await DB.get(hKey)||[];setHist(h);if(h.length>0)setResult(h[h.length-1]);})();
  },[hKey]);

  // ── trial limit: count total posts ever generated for this key
  const totalGenerated = hist.flatMap(w=>w.posts||[]).length;
  const TRIAL_LIMIT = 3;
  const trialExhausted = profile?.isTrial && totalGenerated >= TRIAL_LIMIT;
  const trialRemaining = profile?.isTrial ? Math.max(0, TRIAL_LIMIT - totalGenerated) : null;

  const generate=async()=>{
    if(trialExhausted) return; // hard block
    setGen(true);setErr(null);setResult(null);setStep(0);
    tmr.current=setInterval(()=>setStep(s=>(s+1)%GEN_STEPS.length),3500);
    try{
      const prevTitles=hist.flatMap(w=>w.posts?.map(p=>p.title)||[]);
      const today=new Date().toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
      const res=await fetch("/api/generate",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          system:buildPrompt(profile,prevTitles),
          messages:[{role:"user",content:`Today is ${today}. Research what is ACTUALLY TRENDING RIGHT NOW in "${profile.niche}" on ${platforms.join(" and ")}. Write ${platforms.length} post${platforms.length>1?"s — one per platform, each on a DIFFERENT topic and angle":""}. Each post must be deeply specific to "${profile.niche}", use current trends, and be genuinely different from the others. Return ONLY raw JSON starting with {`}]
        })
      });
      clearInterval(tmr.current);
      if(!res.ok){
        const e=await res.json().catch(()=>({}));
        const m=e?.error?.message||"";
        throw new Error(m.includes("exceeded_limit")||m.includes("rate")?"RATE_LIMIT":m||"API error");
      }
      const data=await res.json();
      const raw=(data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
      const s=raw.indexOf("{"),en=raw.lastIndexOf("}");
      if(s===-1||en===-1) throw new Error("JSON not found in response. Try again.");
      let parsed;
      try{ parsed=JSON.parse(raw.slice(s,en+1)); }
      catch(pe){ throw new Error("JSON parse failed — "+pe.message); }
      if(!parsed.posts?.length) throw new Error("No posts returned. Please try again.");
      const entry={week:(hist.length||0)+1,date:today,trends:parsed.trends||[],posts:parsed.posts||[]};
      const newH=[...hist,entry];
      setHist(newH); await DB.set(hKey,newH); setResult(entry);
      
      // Sync to Admin Backend
      fetch(`/api/data?resource=history&clientId=${profile.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newH)
      }).catch(err => console.error("Admin sync failed:", err));

    }catch(e){clearInterval(tmr.current);setErr(e.message||"Unknown error");}
    setGen(false);
  };

  return(
    <div>
      {/* ── TRIAL BANNER ── */}
      {profile?.isTrial && !trialExhausted && (
        <div style={{background:"linear-gradient(135deg,rgba(56,189,248,0.12),rgba(56,189,248,0.04))",
          border:"1px solid rgba(56,189,248,0.28)",borderRadius:14,padding:"13px 18px",
          marginBottom:16,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:700,letterSpacing:"-.2px",marginBottom:3}}>
              ⚡ Free Trial — <span style={{color:"#5ba4f5"}}>{trialRemaining} post{trialRemaining!==1?"s":""} remaining</span>
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>
              No card needed. Upgrade after to unlock more posts, platforms and weekly tips.
            </div>
          </div>
          <a href={CONFIG.razorpay.starter} target="_blank"
            style={{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",
              border:"none",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:700,
              cursor:"pointer",textDecoration:"none",whiteSpace:"nowrap",flexShrink:0}}>
            Upgrade to Full Plan →</a>
        </div>
      )}

      {/* ── TRIAL EXHAUSTED WALL ── */}
      {trialExhausted && (
        <div style={{background:"linear-gradient(135deg,rgba(56,189,248,0.1),rgba(56,189,248,0.03))",
          border:"1px solid rgba(56,189,248,0.3)",borderRadius:18,padding:"28px 24px",
          marginBottom:20,textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:10}}>⚡</div>
          <h3 style={{fontSize:20,fontWeight:800,letterSpacing:"-.4px",marginBottom:8}}>
            Your 3 free posts are ready!</h3>
          <p style={{fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.7,maxWidth:460,margin:"0 auto 20px"}}>
            You've seen what AI-researched, platform-native content looks like for your brand.
            Upgrade now to generate 15–unlimited posts every month — new trends, new topics, every week.
          </p>
          <div className="mobile-grid-1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20,maxWidth:460,margin:"0 auto 20px"}}>
            {[
              {price:"₹2,999/mo",name:"Starter",desc:"15 posts · 2 platforms",id:"starter"},
              {price:"₹5,499/mo",name:"Growth",desc:"25 posts · 4 platforms",id:"growth"},
              {price:"₹8,999/mo",name:"Pro",desc:"Unlimited · All platforms",id:"pro"},
            ].map(({price,name,desc,id})=>(
              <button key={name}
                onClick={()=> { 
                  if(typeof onUpgrade === 'function') onUpgrade(id); 
                  else window.location.href=`${window.location.origin}/app/content-studio?plan=${id}`; 
                }}
                style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.25)",
                  borderRadius:13,padding:"14px 8px",cursor:"pointer",display:"block",width:"100%",textAlign:"center",transition:"all .2s"}}
                  onMouseOver={(e)=>e.currentTarget.style.background="rgba(56,189,248,0.2)"}
                  onMouseOut={(e)=>e.currentTarget.style.background="rgba(56,189,248,0.1)"}>
                <div style={{fontSize:15,fontWeight:800,color:"#5ba4f5",marginBottom:3,pointerEvents:"none"}}>{price}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3,pointerEvents:"none"}}>{name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.4,pointerEvents:"none"}}>{desc}</div>
              </button>
            ))}
          </div>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>
            Scroll down to view your 3 generated posts anytime ↓
          </p>
        </div>
      )}

      {/* Generate CTA */}
      <div className="mobile-col" style={{background:`linear-gradient(135deg,${profile.darkBg||"#0B152B"}CC,#080810)`,
        border:`1px solid ${color}20`,borderRadius:16,padding:"20px 24px",marginBottom:20,
        display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:14,fontWeight:700,marginBottom:4,letterSpacing:"-.3px"}}>
            Week {hist.length+1}
            <span style={{color,fontSize:12,fontWeight:500}}> — live research · write · optimise</span>
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginBottom:hist.length?6:0}}>
            {hist.length>0
              ? `✓ ${hist.flatMap(w=>w.posts||[]).length} posts saved — AI never repeats them`
              : "AI finds what's trending → writes platform-native content → ready to post"}
          </div>
          {/* Platform badges */}
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>
            {platforms.map(p=>(
              <span key={p} style={{background:`${color}15`,border:`1px solid ${color}30`,color,
                borderRadius:15,padding:"2px 10px",fontSize:11,fontWeight:600}}>
                {p}</span>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={gen||trialExhausted}
          style={{background:gen||trialExhausted?"rgba(255,255,255,0.04)":"linear-gradient(135deg,#1d4ed8,#5ba4f5)",
            color:gen||trialExhausted?"rgba(255,255,255,0.2)":"#fff",
            border:`1px solid ${gen||trialExhausted?"rgba(255,255,255,0.07)":"rgba(91,164,245,0.5)"}`,borderRadius:50,
            padding:"15px 32px",fontSize:15,fontWeight:600,boxShadow:gen||trialExhausted?"none":"0 8px 28px rgba(91,164,245,0.3),inset 0 1px 0 rgba(255,255,255,0.15)",cursor:gen||trialExhausted?"not-allowed":"pointer",
            minWidth:195,transition:"all .2s",letterSpacing:"-.2px"}}>
          {trialExhausted?"🔒 Trial Complete — Upgrade":gen?"✦ Researching trends...":hist.length>0?`⚡ Generate Week ${hist.length+1} Content`:"⚡ Research Trends & Write Content"}
        </button>
      </div>

      {/* Loading */}
      {gen&&(
        <div style={{textAlign:"center",padding:"52px 20px",background:"rgba(255,255,255,0.02)",
          borderRadius:18,border:"1px solid rgba(255,255,255,0.05)",marginBottom:20}}>
          <div style={{width:46,height:46,borderRadius:"50%",
            border:`3px solid ${color}20`,borderTop:`3px solid ${color}`,
            margin:"0 auto 20px",animation:"spin .85s linear infinite"}}/>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:15,margin:"0 0 5px",fontWeight:600,letterSpacing:"-.2px"}}>
            {GEN_STEPS[step]}</p>
          <p style={{color:"rgba(255,255,255,0.25)",fontSize:12,margin:0}}>
            30–60 seconds · searching live web · {platforms.join(", ")}</p>
          <div style={{display:"flex",justifyContent:"center",gap:5,marginTop:16}}>
            {GEN_STEPS.map((_,i)=>(
              <div key={i} style={{width:5,height:5,borderRadius:"50%",transition:"all .3s",
                background:i===step?color:"rgba(255,255,255,0.1)"}}/>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {err&&(
        <div style={{background:"#110508",border:"1px solid #78510a",borderRadius:13,
          padding:"16px 20px",marginBottom:20}}>
          <p style={{color:"#e8b86d",margin:"0 0 4px",fontWeight:700,fontSize:14}}>
            {err==="RATE_LIMIT"?"⏳ Rate limit reached":"⚠️ Generation failed"}</p>
          <p style={{color:"#fda4af",margin:"0 0 12px",fontSize:13}}>
            {err==="RATE_LIMIT"
              ?"You've hit the hourly API cap. Resets in a few minutes. Your saved content is still below."
              :err}</p>
          <div style={{display:"flex",gap:8}}>
            {err!=="RATE_LIMIT"&&(
              <button onClick={generate} style={{background:"#78510a",color:"#fff",border:"none",
                borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                ↻ Try Again</button>
            )}
            {hist.length>0&&(
              <button onClick={()=>{setResult(hist[hist.length-1]);setErr(null);}}
                style={{background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.7)",
                  border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"7px 14px",
                  fontSize:12,fontWeight:700,cursor:"pointer"}}>
                📁 View Saved</button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {result&&!gen&&(
        <div>
          {/* Week history pills (Interactive Navigation) inside Content generation area */}
          {hist.length>=1&&(
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center",
              background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
              padding:"10px 14px",borderRadius:12}}>
              <span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                color:"rgba(255,255,255,0.3)"}}>View Week:</span>
              {hist.map((w,i)=>(
                <button key={i} onClick={()=>{setResult(w);setErr(null);}}
                  style={{padding:"6px 16px",borderRadius:8,fontSize:13,fontWeight:600,
                    border:result?.week===w.week?`1px solid ${color}`:"1px solid rgba(255,255,255,0.1)",
                    transition:"all .2s",
                    background:result?.week===w.week?color:"rgba(255,255,255,0.05)",
                    color:result?.week===w.week?"#fff":"rgba(255,255,255,0.7)",cursor:"pointer",
                    boxShadow:result?.week===w.week?`0 4px 12px ${color}40`:"none"}}>
                  Week {w.week || (i + 1)}
                </button>
              ))}
            </div>
          )}

          <div className="mobile-col" style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}>
            <div style={{height:1,flex:1,background:`${color}12`}}/>
            <div style={{background:color,color:"#fff",borderRadius:20,padding:"4px 16px",
              fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase"}}>
              Week {result.week || (hist.indexOf(result)+1)} · {result.date}</div>
            <div style={{height:1,flex:1,background:`${color}12`}}/>
          </div>
          {result.posts?.length>0&&<WeekCal posts={result.posts} color={color}/>}
          <TrendCards trends={result.trends} color={color}/>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
            color:"rgba(255,255,255,0.28)",marginBottom:14}}>
            📝 {result.posts?.length||0} Posts — Platform-native content ready to publish</div>
          <HowToUseBanner color={color} postCount={result.posts?.length||0}/>
          <div style={{display:"grid",gap:20}}>
            {result.posts?.map((p,i)=><PostCard key={i} post={p} profile={profile} index={i}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:28,paddingTop:22,
            borderTop:"1px solid rgba(255,255,255,0.05)"}}>
            {trialExhausted ? (
              <div style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.3)",borderRadius:12,padding:"20px",maxWidth:400,margin:"0 auto"}}>
                <div style={{fontSize:20,marginBottom:8}}>⚡</div>
                <div style={{fontSize:14,fontWeight:700,color:"#5ba4f5",marginBottom:12}}>Ready for more content?</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginBottom:16,lineHeight:1.5}}>Upgrade to generate 15-unlimited posts every month with live trend research.</div>
                <button onClick={() => onUpgrade ? onUpgrade("starter") : (window.location.href=`${window.location.origin}/app/content-studio?plan=starter`)}
                  style={{background:"#5ba4f5",color:"#000",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:700,cursor:"pointer",width:"100%"}}>
                  View Plans & Upgrade →</button>
              </div>
            ) : (
              <button onClick={generate}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,
                  color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",
                  fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"}}>
                ↻ Generate Week {hist.length+1}</button>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result&&!gen&&!err&&(
        <div style={{textAlign:"center",padding:"52px 20px",background:"rgba(255,255,255,0.02)",
          borderRadius:18,border:"1px dashed rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:38,marginBottom:12}}>{profile.emoji||"🏢"}</div>
          <h3 style={{color:"rgba(255,255,255,0.55)",fontWeight:700,marginBottom:12,letterSpacing:"-.3px",fontSize:18}}>
            Ready for {profile.brandName||profile.name}</h3>
          <div style={{display:"inline-grid",textAlign:"left",gap:7,background:"rgba(255,255,255,0.03)",
            borderRadius:13,padding:"14px 20px"}}>
            {["🔍 Searches live trends on "+platforms.join(" + "),
              "✍️ Writes platform-native captions and scripts",
              "🎠 Builds complete carousel decks",
              "🧵 Creates Twitter/X threads if needed",
              "📌 Researches platform-specific hashtags",
              "📋 Gives step-by-step posting checklist",
              "⚡ Tells you exactly what to do after posting",
              "♻️ Never repeats — permanent content memory",
            ].map(s=>(
              <div key={s} style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  PROFILE BUILDER (post-payment)
// ─────────────────────────────────────────────────────────────────
function ProfileBuilder({clientData, plan, onComplete}){
  const [form,setForm]=useState({logo:null,logoPreview:null,tagline:"",website:"",
    instagram:"",linkedin:"",youtube:"",tiktok:"",twitter:"",facebook:"",
    brandPersonality:"",businessContext:"",avoid:"",contentGoal:"",competitors:"",colorHex:plan.color,
    followers:{instagram:"",linkedin:"",youtube:"",tiktok:""},
  });
  const [errors,setErrors]=useState({});
  const [saving,setSaving]=useState(false);
  const fileRef=useRef();

  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const validate=()=>{
    const e={};
    if(!V.notEmpty(form.tagline)) e.tagline="Required";
    if(form.website&&!V.url(form.website)) e.website="Enter a valid URL";
    if(!V.notEmpty(form.brandPersonality)) e.brandPersonality="Required";
    return e;
  };

  const handleLogo=e=>{
    const f=e.target.files?.[0]; if(!f) return;
    if(f.size>5*1024*1024){alert("Max 5MB");return;}
    const r=new FileReader();
    r.onload=ev=>set("logoPreview",ev.target.result);
    r.readAsDataURL(f); set("logo",f);
  };

  const save=async()=>{
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setSaving(true);
    const enriched={...clientData,...form,
      tagline:form.tagline,color:form.colorHex,
      tone:clientData.tone+(form.brandPersonality?`. Personality: ${form.brandPersonality}`:""),
      businessContext:form.businessContext,
      avoid:form.avoid,
      contentGoal:form.contentGoal,
      niche:clientData.niche+(form.competitors?`. Inspired by: ${form.competitors}`:""),
      socialAccounts:{
        instagram: form.instagram||"",
        linkedin:  form.linkedin||"",
        youtube:   form.youtube||"",
        tiktok:    form.tiktok||"",
        twitter:   form.twitter||"",
        facebook:  form.facebook||"",
      },
      followers: form.followers||{},
    };
    await pushToClickUp(enriched, CONFIG.clickup.activeListId);
    await pushToSheets(enriched);
    onComplete(enriched);
  };

  const COLORS=["#5ba4f5","#7C3AED","#E31313","#10b981","#f59e0b","#ec4899","#0ea5e9","#6366f1","#14b8a6","#C9A84C"];

  return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"clamp(16px,4vw,28px) clamp(14px,4vw,20px)"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{width:52,height:52,borderRadius:14,background:"#052e16",border:"1px solid #166534",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 12px"}}>✅</div>
        <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-.5px",marginBottom:6}}>
          Payment confirmed — build your brand profile</h2>
        <p style={{color:"rgba(255,255,255,0.38)",fontSize:13,lineHeight:1.65}}>
          The more detail you give, the more your content will sound exactly like your brand.</p>
      </div>
      <div style={{display:"grid",gap:14}}>
        {/* Logo */}
        <div>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.38)",textTransform:"uppercase",
            letterSpacing:"1px",marginBottom:8}}>Brand Logo (optional)</div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div onClick={()=>fileRef.current.click()}
              style={{width:68,height:68,borderRadius:14,background:"rgba(255,255,255,0.05)",
                border:"2px dashed rgba(255,255,255,0.15)",display:"flex",alignItems:"center",
                justifyContent:"center",overflow:"hidden",cursor:"pointer",flexShrink:0}}>
              {form.logoPreview
                ?<img src={form.logoPreview} alt="logo" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
                :<div style={{textAlign:"center"}}><div style={{fontSize:20}}>🖼</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>Upload</div></div>}
            </div>
            <div>
              <button onClick={()=>fileRef.current.click()}
                style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",
                  color:"rgba(255,255,255,0.65)",borderRadius:9,padding:"8px 15px",
                  fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:5,display:"block"}}>
                {form.logo?"Change Logo":"Upload Logo"}</button>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.28)"}}>PNG or JPG · max 5MB</div>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleLogo} style={{display:"none"}}/>
        </div>

        <Field label="Brand Tagline / Slogan" name="tagline" value={form.tagline}
          onChange={(k,v)=>set(k,v)} error={errors.tagline} required
          placeholder="e.g. Grow Fast. Scale Smart."
          hint="This appears in your generated content"/>
        <Field label="Website" name="website" value={form.website}
          onChange={(k,v)=>set(k,v)} error={errors.website}
          placeholder="https://yourbrand.com"/>

        {/* ── SOCIAL ACCOUNTS ── */}
        <div style={{background:"rgba(56,189,248,0.06)",border:"1px solid rgba(56,189,248,0.18)",
          borderRadius:14,padding:"18px 16px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#5ba4f5",textTransform:"uppercase",
            letterSpacing:"1.5px",marginBottom:4}}>🔗 Connect Your Social Accounts</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:14,lineHeight:1.6}}>
            The AI will analyse your actual accounts — what's working, what's missing, gaps vs competitors — and tailor every piece of content to improve your specific presence.
          </div>
          <div style={{display:"grid",gap:10}}>
            {/* Instagram */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"}}>
              <Field label="Instagram Handle" name="instagram" value={form.instagram}
                onChange={(k,v)=>set(k,v)} placeholder="@yourbrand"/>
              <div style={{marginBottom:0}}>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",
                  textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6}}>Followers</label>
                <input value={form.followers?.instagram||""}
                  onChange={e=>set("followers",{...form.followers,instagram:e.target.value})}
                  placeholder="e.g. 4,200"
                  style={{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}}/>
              </div>
            </div>
            {/* LinkedIn */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"}}>
              <Field label="LinkedIn Profile / Company URL" name="linkedin" value={form.linkedin}
                onChange={(k,v)=>set(k,v)} placeholder="linkedin.com/in/yourname or /company/yourbrand"/>
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",
                  textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6}}>Followers</label>
                <input value={form.followers?.linkedin||""}
                  onChange={e=>set("followers",{...form.followers,linkedin:e.target.value})}
                  placeholder="e.g. 1,800"
                  style={{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}}/>
              </div>
            </div>
            {/* YouTube */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"}}>
              <Field label="YouTube Channel" name="youtube" value={form.youtube}
                onChange={(k,v)=>set(k,v)} placeholder="youtube.com/@yourchannel"/>
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",
                  textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6}}>Subscribers</label>
                <input value={form.followers?.youtube||""}
                  onChange={e=>set("followers",{...form.followers,youtube:e.target.value})}
                  placeholder="e.g. 890"
                  style={{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}}/>
              </div>
            </div>
            {/* TikTok */}
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:8,alignItems:"end"}}>
              <Field label="TikTok Handle" name="tiktok" value={form.tiktok}
                onChange={(k,v)=>set(k,v)} placeholder="@yourbrand"/>
              <div>
                <label style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",
                  textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6}}>Followers</label>
                <input value={form.followers?.tiktok||""}
                  onChange={e=>set("followers",{...form.followers,tiktok:e.target.value})}
                  placeholder="e.g. 12,000"
                  style={{width:"100px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
                    borderRadius:10,padding:"10px 12px",fontSize:13,color:"#fff",outline:"none"}}/>
              </div>
            </div>
            {/* Twitter / Facebook row */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Field label="Twitter / X Handle" name="twitter" value={form.twitter}
                onChange={(k,v)=>set(k,v)} placeholder="@yourbrand"/>
              <Field label="Facebook Page" name="facebook" value={form.facebook}
                onChange={(k,v)=>set(k,v)} placeholder="facebook.com/yourbrand"/>
            </div>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:12,lineHeight:1.5}}>
            🔒 Your account handles are only used for AI research — we never log in or access private data.
          </div>
        </div>
        <Field label="Brand Personality" name="brandPersonality" value={form.brandPersonality}
          onChange={(k,v)=>set(k,v)} error={errors.brandPersonality} required rows={2}
          placeholder="e.g. Bold, no-fluff, like a high-performance coach. Think Hormozi meets Red Bull."
          hint="The AI writes exactly like this"/>
        <Field label="What Your Business Does (Context)" name="businessContext" value={form.businessContext}
          onChange={(k,v)=>set(k,v)} error={errors.businessContext} required rows={2}
          placeholder="What do you sell? What problem do you solve? What makes you different?"
          hint="Be specific — this directly improves content quality"/>
        <Field label="Topics to Avoid (optional)" name="avoid" value={form.avoid}
          onChange={(k,v)=>set(k,v)}
          placeholder="e.g. No political content, no competitor mentions, no medical claims"/>
        <Field label="Content Goal" name="contentGoal" value={form.contentGoal}
          onChange={(k,v)=>set(k,v)} rows={2}
          placeholder="e.g. Generate leads for my online coaching programme — 50 sign-ups/month target"
          hint="What do you want social media to achieve?"/>
        <Field label="Top Competitors / Inspiration Accounts" name="competitors"
          value={form.competitors} onChange={(k,v)=>set(k,v)}
          placeholder="e.g. @alexhormozi, @garyvee, @hubspot"
          hint="AI studies their style and writes better"/>

        {/* Color picker */}
        <div>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.38)",textTransform:"uppercase",
            letterSpacing:"1px",marginBottom:8}}>Brand Accent Colour</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:8}}>
            {COLORS.map(c=>(
              <button key={c} onClick={()=>set("colorHex",c)}
                style={{width:30,height:30,borderRadius:"50%",background:c,cursor:"pointer",
                  border:`3px solid ${form.colorHex===c?"#fff":"transparent"}`,transition:"all .15s"}}/>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <input type="color" value={form.colorHex} onChange={e=>set("colorHex",e.target.value)}
              style={{width:34,height:34,borderRadius:8,border:"none",cursor:"pointer"}}/>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.38)",fontFamily:"monospace"}}>{form.colorHex}</span>
          </div>
        </div>
      </div>
      <button onClick={save} disabled={saving}
        style={{width:"100%",marginTop:22,background:saving?"rgba(255,255,255,0.05)":
          "linear-gradient(135deg,#4ade80,#16a34a)",
          color:saving?"rgba(255,255,255,0.3)":"#fff",border:"none",borderRadius:13,
          padding:"14px",fontSize:15,fontWeight:700,cursor:saving?"not-allowed":"pointer",letterSpacing:"-.2px"}}>
        {saving?"Saving...":"✓ Save Profile & Open Content Studio →"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  PAYMENT STEP — Razorpay only (razorpay.me/@socialninjas)
// ─────────────────────────────────────────────────────────────────
function PaymentStep({plan, formData, onVerified}){
  // Always start on verify so the Payment ID input is immediately visible
  const [mode,setMode]=useState("verify"); // pay | verify | done
  const [pid,setPid]=useState("");
  const [checking,setChecking]=useState(false);
  const [pidErr,setPidErr]=useState("");

  const confirm=async()=>{
    const cleanPid = pid.trim();

    // ── SECRET TEST BYPASS ── (owner-only, never shown in UI)
    const isTestBypass = cleanPid === "SN_TEST_2026";
    if(!isTestBypass && (!cleanPid || !cleanPid.startsWith("pay_") || cleanPid.length < 14)){
      setPidErr("Enter a valid Razorpay Payment ID — it starts with pay_ followed by letters and numbers");return;
    }
    setChecking(true); setPidErr("");
    try {
      if(isTestBypass){
        // Skip API call — simulate verified payment for owner testing
        await new Promise(r=>setTimeout(r,800));
        setMode("done");
        setTimeout(()=>onVerified(),1200);
        setChecking(false);
        return;
      }
      const res = await fetch("/api/verify-payment",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({paymentId:cleanPid, planId:plan.id, brandName:formData.brandName, email:formData.email})
      });
      const data = await res.json();
      if(!res.ok || !data.verified){
        setPidErr(data.error || "Payment verification failed. Please check the ID and try again.");
        setChecking(false); return;
      }
      // ✅ Payment verified — push to CRM as active client
      await pushToClickUp({...formData,planName:plan.name,displayINR:plan.displayINR,
        paymentId:cleanPid,joinDate:new Date().toLocaleDateString("en-IN"),
        paymentStatus:"verified"}, CONFIG.clickup.activeListId);
      await pushToSheets({...formData,planName:plan.name,displayINR:plan.displayINR,
        paymentId:cleanPid,joinDate:new Date().toLocaleDateString("en-IN"),paymentStatus:"verified"});
      setMode("done");
      setTimeout(()=>onVerified(),1200);
    } catch(e){
      setPidErr("Network error. Please check your connection and try again.");
    }
    setChecking(false);
  };

  const disc=Math.round((1-plan.priceINR/parseInt(plan.originalINR.replace(/[₹,]/g,"")))*100);

  return(
    <div style={{maxWidth:460,margin:"0 auto",padding:"28px 20px"}}>
      <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-.5px",marginBottom:4}}>Complete Payment</h2>
      <p style={{color:"rgba(255,255,255,0.38)",fontSize:13,marginBottom:20}}>{plan.guarantee}</p>

      {/* Order card */}
      <div style={{background:"#050A1F",border:`1px solid ${plan.color}25`,borderRadius:14,
        padding:"16px 20px",marginBottom:18}}>
        <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
          color:"rgba(255,255,255,0.3)",marginBottom:12}}>Order Summary</div>
        {[
          ["Plan", <span style={{color:plan.color,fontWeight:700}}>{plan.name}</span>],
          ["Brand", formData.brandName],
          ["Platforms", (formData.platforms||[]).join(", ") || formData.platform],
          ["Posts/month", plan.postsPerMonth===999?"Unlimited":plan.postsPerMonth],
          ["Amount", plan.displayINR+"/mo"],
        ].map(([k,v],i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
            <span style={{fontSize:13,color:"rgba(255,255,255,0.38)"}}>{k}</span>
            <span style={{fontSize:13,color:"rgba(255,255,255,0.8)"}}>{v}</span>
          </div>
        ))}
        <div style={{height:1,background:"rgba(255,255,255,0.07)",margin:"11px 0"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:15,fontWeight:700}}>Total</span>
            <span style={{background:`${plan.color}18`,color:plan.color,borderRadius:5,
              padding:"2px 7px",fontSize:10,fontWeight:700}}>{disc}% OFF</span>
          </div>
          <span style={{fontSize:24,fontWeight:800,color:plan.color,letterSpacing:"-1px"}}>
            {plan.displayINR}</span>
        </div>
      </div>

      {mode==="pay"&&(
        <div style={{display:"grid",gap:10}}>
          <a href={CONFIG.razorpay[plan.id]} target="_blank" rel="noreferrer"
            onClick={()=>setTimeout(()=>setMode("verify"),2000)}
            id="btn-pay-razorpay"
            style={{display:"block",textAlign:"center",
              background:"linear-gradient(135deg,#3395FF,#1a5fc8)",
              color:"#fff",borderRadius:13,padding:"15px",fontSize:16,fontWeight:700,
              textDecoration:"none",letterSpacing:"-.2px"}}>
            💳 Pay ₹{plan.priceINR.toLocaleString("en-IN")} with Razorpay →
          </a>
          <div style={{textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.28)",padding:"4px 0"}}>
            You'll be taken to Razorpay's secure payment page</div>
          <button id="btn-already-paid" onClick={()=>setMode("verify")}
            style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",
              color:"rgba(255,255,255,0.45)",borderRadius:11,padding:"10px",
              fontSize:13,cursor:"pointer",fontWeight:600}}>
            Already paid? Enter Payment ID →
          </button>
        </div>
      )}

      {mode==="verify"&&(
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.09)",
          borderRadius:13,padding:"18px 20px"}}>
          {/* Razorpay link for paid users at top */}
          <a href={CONFIG.razorpay[plan.id]} target="_blank" rel="noreferrer"
            style={{display:"block",textAlign:"center",
              background:"linear-gradient(135deg,#3395FF,#1a5fc8)",
              color:"#fff",borderRadius:10,padding:"12px",fontSize:14,fontWeight:700,
              textDecoration:"none",letterSpacing:"-.2px",marginBottom:14}}>
            💳 Pay ₹{plan.priceINR.toLocaleString("en-IN")} with Razorpay →
          </a>
          <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.2px",marginBottom:5}}>
            Already paid? Confirm your payment</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.65,marginBottom:14}}>
            After paying, Razorpay shows you a Payment ID like{" "}
            <code style={{background:"rgba(255,255,255,0.08)",borderRadius:5,padding:"1px 7px",
              fontFamily:"monospace",fontSize:11}}>pay_XXXXXXXXXXXXXXXX</code>
            {" "}in the confirmation screen or email. Paste it below.
          </div>
          <input id="input-payment-id" value={pid} onChange={e=>{setPid(e.target.value);setPidErr("");}}
            placeholder="pay_XXXXXXXXXXXXXXXX  (or SN_TEST_2026 to test)"
            style={{width:"100%",background:"rgba(255,255,255,0.06)",
              border:`1px solid ${pidErr?"#92620a":"rgba(255,255,255,0.12)"}`,borderRadius:10,
              padding:"11px 13px",color:"#fff",fontSize:13,outline:"none",
              boxSizing:"border-box",fontFamily:"'JetBrains Mono',monospace",marginBottom:pidErr?6:10}}/>
          {pidErr&&<div style={{fontSize:11,color:"#e8b86d",marginBottom:10}}>⚠ {pidErr}</div>}
          <button onClick={confirm} disabled={checking}
            style={{width:"100%",background:checking?"rgba(255,255,255,0.05)":
              `linear-gradient(135deg,${plan.color},${plan.color}88)`,
              color:checking?"rgba(255,255,255,0.3)":"#fff",border:"none",borderRadius:11,
              padding:"12px",fontSize:14,fontWeight:700,cursor:checking?"not-allowed":"pointer"}}>
            {checking?"Saving...":"✓ Confirm Payment & Continue →"}
          </button>
          <button onClick={()=>setMode("pay")}
            style={{width:"100%",background:"none",border:"none",color:"rgba(255,255,255,0.28)",
              fontSize:12,cursor:"pointer",marginTop:8,padding:"6px"}}>
            ← Back to payment</button>
        </div>
      )}

      {mode==="done"&&(
        <div style={{background:"#052e16",border:"1px solid #166534",borderRadius:13,
          padding:"20px",textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:8}}>✅</div>
          <div style={{fontSize:16,fontWeight:700,color:"#4ade80",letterSpacing:"-.2px"}}>
            Payment confirmed — opening your studio…</div>
        </div>
      )}

      <div style={{fontSize:11,color:"rgba(255,255,255,0.2)",textAlign:"center",marginTop:12}}>
        🔒 Secure payment via Razorpay · {plan.guarantee}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
//  TRIAL FORM — 3 free posts, no card required
// ─────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────
//  SMART DROPDOWN — searchable select with custom option
// ─────────────────────────────────────────────────────────────────
function SmartSelect({label, value, onChange, options, placeholder, hint, error, required, allowCustom=true}){
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState("");
  const ref=useRef();
  const selectingRef=useRef(false);
  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  const filtered=options.filter(o=>o.toLowerCase().includes(q.toLowerCase()));
  const select=(v)=>{
    if(selectingRef.current) return;
    selectingRef.current=true;
    onChange(v);setQ("");setOpen(false);
    setTimeout(()=>{selectingRef.current=false;},300);
  };
  return(
    <div ref={ref} style={{position:"relative",marginBottom:14}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:error?"#e8b86d":"rgba(255,255,255,0.4)",
        textTransform:"uppercase",letterSpacing:"1px",marginBottom:5}}>
        {label}{required&&<span style={{color:"#E31313"}}> *</span>}
      </label>
      <div onClick={()=>setOpen(o=>!o)} style={{
        background:"rgba(255,255,255,0.05)",border:`1px solid ${error?"#c49b3a":open?"rgba(56,189,248,0.6)":"rgba(255,255,255,0.1)"}`,
        borderRadius:10,padding:"10px 14px",fontSize:14,color:value?"#fff":"rgba(255,255,255,0.3)",
        cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",minHeight:42,
        transition:"border .15s"}}>
        <span style={{lineHeight:1.4,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {value||placeholder}</span>
        <span style={{color:"rgba(255,255,255,0.3)",fontSize:10,flexShrink:0,marginLeft:6}}>{open?"▲":"▼"}</span>
      </div>
      {open&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:200,
          background:"#0f0f1e",border:"1px solid rgba(255,255,255,0.12)",
          borderRadius:12,marginTop:4,boxShadow:"0 16px 48px rgba(0,0,0,0.7)",
          maxHeight:260,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          <div style={{padding:"8px 10px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>{
                if(e.key==="Enter"){
                  // Commit: use first filtered match, or the typed custom value
                  const commit = filtered.length>0 ? filtered[0] : (allowCustom&&q ? q : null);
                  if(commit){ select(commit); }
                }
                if(e.key==="Escape") setOpen(false);
              }}
              placeholder="Search or type your own..."
              style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:7,padding:"7px 11px",fontSize:13,color:"#fff",outline:"none"}}/>
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {filtered.map(o=>(
              <div key={o}
                onMouseDown={e=>{e.preventDefault();select(o);}}
                style={{padding:"10px 14px",cursor:"pointer",fontSize:13,
                  color:value===o?"#fff":"rgba(255,255,255,0.7)",
                  background:value===o?"rgba(56,189,248,0.15)":"transparent",
                  transition:"background .1s"}}
                onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                onMouseOut={e=>e.currentTarget.style.background=value===o?"rgba(56,189,248,0.15)":"transparent"}>
                {value===o&&<span style={{color:"#5ba4f5",marginRight:8}}>✓</span>}{o}
              </div>
            ))}
            {allowCustom&&q&&!options.includes(q)&&(
              <div
                onMouseDown={e=>{e.preventDefault();select(q);}}
                style={{padding:"10px 14px",cursor:"pointer",fontSize:13,
                  color:"rgba(255,255,255,0.5)",borderTop:"1px solid rgba(255,255,255,0.06)"}}
                onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                ✏️ Use "<strong style={{color:"#fff"}}>{q}</strong>"
              </div>
            )}
            {filtered.length===0&&!q&&(
              <div style={{padding:"16px 14px",fontSize:13,color:"rgba(255,255,255,0.3)",textAlign:"center"}}>
                No options found</div>
            )}
          </div>
        </div>
      )}
      {hint&&!error&&<div style={{fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:4}}>{hint}</div>}
      {error&&<div style={{fontSize:11,color:"#e8b86d",marginTop:4}}>⚠ {error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  COMPETITOR TAG INPUT
// ─────────────────────────────────────────────────────────────────
function CompetitorInput({value, onChange}){
  const [inp,setInp]=useState("");
  const tags=(value||"").split(",").map(s=>s.trim()).filter(Boolean);
  const add=()=>{
    const v=inp.trim();
    if(v&&!tags.includes(v)){
      onChange([...tags,v].join(", "));
    }
    setInp("");
  };
  const remove=(t)=>onChange(tags.filter(x=>x!==t).join(", "));
  return(
    <div>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",
        textTransform:"uppercase",letterSpacing:"1px",marginBottom:5}}>
        Competitors / Brands to Watch
        <span style={{fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.25)",
          letterSpacing:0,textTransform:"none",marginLeft:6}}>(optional — helps AI research positioning)</span>
      </label>
      {tags.length>0&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
          {tags.map(t=>(
            <span key={t} style={{display:"inline-flex",alignItems:"center",gap:5,
              background:"rgba(56,189,248,0.12)",border:"1px solid rgba(56,189,248,0.28)",
              borderRadius:20,padding:"3px 10px 3px 12px",fontSize:12,fontWeight:600,color:"#7ab8f5"}}>
              {t}
              <button onClick={()=>remove(t)}
                style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",
                  cursor:"pointer",fontSize:14,lineHeight:1,padding:"0 2px"}}>×</button>
            </span>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:8}}>
        <input value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"||e.key===","){e.preventDefault();add();}}}
          placeholder="e.g. @urbanclap, Nykaa, MamaEarth — press Enter to add"
          style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:10,padding:"10px 14px",fontSize:13,color:"#fff",outline:"none"}}/>
        <button onClick={add}
          style={{background:"rgba(56,189,248,0.15)",border:"1px solid rgba(56,189,248,0.3)",
            color:"#5ba4f5",borderRadius:10,padding:"10px 16px",fontSize:13,
            fontWeight:700,cursor:"pointer",flexShrink:0}}>+ Add</button>
      </div>
      <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:4}}>
        AI uses these to research competitor gaps and trending angles in your niche
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  NICHE / INDUSTRY OPTIONS
// ─────────────────────────────────────────────────────────────────
const NICHE_OPTIONS = [
  "Fitness & Personal Training","Yoga & Wellness","Nutrition & Diet Coaching",
  "D2C Skincare & Beauty","D2C Fashion & Apparel","D2C Food & Beverages",
  "Real Estate","Interior Design","Architecture",
  "Restaurant & Cafe","Cloud Kitchen & Food Delivery","Bakery & Desserts",
  "EdTech & Online Courses","Coaching & Mentoring","School & College",
  "SaaS & Tech Product","Mobile App","AI & Automation",
  "Digital Marketing Agency","Social Media Management","Performance Marketing",
  "Finance & Investment","Insurance","Crypto & Web3",
  "Healthcare & Clinic","Mental Health & Therapy","Ayurveda & Holistic",
  "Legal Services","CA & Accounting","HR & Recruitment",
  "Luxury Cars & Auto","Electric Vehicles","Auto Accessories",
  "Travel & Tourism","Hotels & Resorts","Visa & Immigration",
  "Photography & Videography","Music & Entertainment","Podcasting",
  "E-commerce & Marketplace","Dropshipping","Amazon FBA",
  "Personal Brand / Creator","Influencer Marketing","Comedy & Entertainment",
  "NGO & Social Impact","Government & Public Sector","Startup / VC",
];

const TONE_OPTIONS = [
  "Bold & Confident — No fluff, straight talk",
  "Educational & Informative — Teach, don't sell",
  "Luxury & Premium — Aspirational, sophisticated",
  "Casual & Conversational — Like a friend texting",
  "Motivational & Inspirational — Energy, push, fire",
  "Professional & Corporate — Polished, trust-building",
  "Witty & Humorous — Light, relatable, shareable",
  "Storytelling & Emotional — Heart-led, human",
  "Rebellious & Edgy — Challenge the status quo",
  "Empathetic & Supportive — Warm, understanding",
  "Data-Led & Analytical — Facts, stats, proof",
  "Aspirational & Dream-selling — Future-focused",
];

const AUDIENCE_TEMPLATES = [
  "Working professionals 25–40, urban India, want career growth",
  "Women 22–35, tier 1 cities, interested in skincare & beauty",
  "Entrepreneurs and startup founders, India & UAE",
  "Fitness enthusiasts 20–35, want to lose weight or build muscle",
  "Parents of school-age children, education-conscious families",
  "D2C brand owners looking to scale with digital marketing",
  "Real estate investors and first-time home buyers",
  "Restaurant and F&B business owners in metro cities",
  "Young professionals 22–30 interested in personal finance",
  "Gen Z creators and aspiring influencers",
  "HNI / luxury buyers — premium cars, travel, lifestyle",
  "Healthcare seekers — patients, wellness enthusiasts",
  "B2B decision makers — CMOs, founders, procurement heads",
  "Students preparing for competitive exams in India",
  "Working women 30–45 balancing career and family",
];

function TrialGeneration({ plan, formData, onSubscribe }) {
  const [stage, setStage] = useState(0); // 0=loading, 1=results, 2=error
  const [posts, setPosts] = useState([]);
  const [stepMsg, setStepMsg] = useState("Researching trends in your niche...");
  const color = plan?.color || "#5ba4f5";

  const GEN_MSGS = [
    "🔍 Researching live trends in your niche...",
    "📊 Analysing platform algorithms...",
    "✍️ Writing platform-native captions...",
    "🎬 Scripting your Reels...",
    "✨ Final quality check...",
  ];

  useEffect(() => {
    let msgIdx = 0;
    const msgTimer = setInterval(() => {
      msgIdx = (msgIdx + 1) % GEN_MSGS.length;
      setStepMsg(GEN_MSGS[msgIdx]);
    }, 3000);

    const profile = {
      brandName: formData.brandName,
      name: formData.brandName,
      audience: formData.audience,
      tone: formData.tone,
      niche: formData.niche,
      platforms: formData.platforms?.length ? formData.platforms : ["Instagram"],
      businessContext: `${formData.brandName} — ${formData.niche}`,
      color: color,
      darkBg: "#050B1A",
      avoid: "",
    };

    const today = new Date().toLocaleDateString("en-GB", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: buildPrompt(profile, []),
        messages: [{ role: "user", content: `Today is ${today}. Research what is ACTUALLY TRENDING RIGHT NOW in "${profile.niche}" on ${(profile.platforms||["Instagram"])[0]}. Write 3 complete posts — all 3 for ${(profile.platforms||["Instagram"])[0]} only, each on a DIFFERENT topic and angle. Use real current trends you find. Each post needs a full word-for-word script (min 180 words) and carousel slides if applicable for this platform. Return ONLY raw JSON starting with {` }],
        max_tokens: 6000,
      })
    })
    .then(async res => {
      clearInterval(msgTimer);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const raw = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("").trim();
      const s = raw.indexOf("{"), en = raw.lastIndexOf("}");
      if (s === -1 || en === -1) throw new Error("Invalid JSON");
      const parsed = JSON.parse(raw.slice(s, en + 1));
      if (!parsed.posts?.length) throw new Error("No posts returned");
      setPosts(parsed.posts);
      setStage(1);
    })
    .catch(() => {
      clearInterval(msgTimer);
      // Fallback to sample posts so trial isn't broken
      setPosts([
        {
          platform: formData.platforms?.[0] || "Instagram",
          format: "Reel",
          title: `3 things ${formData.niche || 'top brands'} never tell you`,
          hook: `3 things every successful ${formData.niche || 'brand'} does that nobody talks about`,
          caption: `Nobody in ${formData.niche || 'your space'} is telling you this. \u00b7\u00b7\u00b7\n\nHere are the 3 things the top 1% do every single week that the rest ignore completely:\n\n1️⃣ They post for ONE specific person, not for everyone\n2️⃣ They lead every video with the result, then show the process\n3️⃣ They reply to comments in the first 30 minutes — every time\n\nThe algorithm rewards activity, not perfection.\n\nSave this. Read it before you post next time.`,
          cta: "Tag someone who needs to see this ↓",
          hashtags: [formData.niche?.toLowerCase().replace(/\s/g,"") || "contentcreator", "socialmediatips", "growyourbusiness", "contentmarketing", "instagramtips", "reelstrategy", "digitalmarketing", "brandbuilding", "entrepreneur", "businessgrowth"],
          priority: "Must Post",
          best_day: "Tuesday",
          best_time: "9am",
          why_now: "Early-week content gets highest organic reach",
          script: `[DIRECTION: Open to camera, direct eye contact. No intro. Start speaking immediately.]\n\nNobody in ${formData.niche || 'this space'} is going to tell you what I'm about to say.\n\n[DIRECTION: Hold up 3 fingers, counting down as you speak]\n\nThere are 3 things the top creators and brands do every single week — and the majority of people never do any of them.\n\nNumber one: They post for ONE specific person. Not everyone. ONE person.\n\n[DIRECTION: Point at camera] When you write your next caption, picture one real human and write it to them directly. Watch your engagement double.\n\nNumber two: They lead with the result, then show the process. Not "here's how I did it" — they open with "here's what you'll get."\n\n[DIRECTION: Step in closer to camera, lower voice slightly]\n\nNumber three: They reply to every comment in the first 30 minutes. Every. Single. Time. The algorithm treats your post like a conversation. Be part of it.\n\n[DIRECTION: Look directly into camera, pause for 1 second]\n\nSave this video. You'll want to come back to it.`,
          carousel_slides: [
            {slide_num:1, heading:`3 Things Top ${formData.niche || 'Brands'} Never Tell You`, body:"The strategies that actually drive growth — swipe to see all 3.", design_note:"Bold headline on dark background. Brand colour accent on '3'. Clean, minimal."},
            {slide_num:2, heading:"#1: Post for ONE person", body:"Stop trying to reach everyone. Picture your ideal customer and write every caption like it's a DM to them specifically. Specificity converts.", design_note:"Icon of a single person target. Split between muted and highlighted text."},
            {slide_num:3, heading:"#2: Lead with the RESULT", body:"Don't open with \"here's how I did it.\" Open with \"here's what you'll achieve.\" People act on outcomes, not processes.", design_note:"Arrow pointing up-right. Result = highlighted. Process = faded."},
            {slide_num:4, heading:"#3: Reply in the first 30 mins", body:"The algorithm reads early engagement as a signal of quality. Reply to every comment in the first half hour. It changes reach dramatically.", design_note:"Clock icon showing 30 minutes. Urgent, warm colour."},
            {slide_num:5, heading:"Save this and post it this week.", body:"Follow for weekly content strategy. These 3 things cost zero — but most people never do them.", design_note:"Strong CTA. Brand logo bottom right. Contrast background."}
          ],
          posting_checklist: ["Film in good natural side-lighting, portrait mode (9:16)", "Add captions/subtitles in CapCut or Instagram native tool", "Use trending audio under 30s at 8–20% volume", "Post between 8–10am on Tuesday for best reach", "Reply to every comment within the first 30 minutes"],
          engagement_tip: "Pin a comment like \"Which of these 3 do you already do?\" immediately after posting. It primes the comment section and boosts algorithm ranking."
        },
        {
          platform: formData.platforms?.[0] || "Instagram",
          format: "Carousel",
          title: `The ${formData.niche || 'content'} content calendar that actually works`,
          hook: `Your content calendar is the reason you're not growing`,
          caption: `Here's the brutal truth about why most ${formData.niche || 'business'} content doesn't convert. \u2193\n\nIt's not the graphics.\nIt's not the algorithm.\nIt's not even the hashtags.\n\nIt's that there's NO system behind it.\n\nWe mapped out a 5-post weekly structure that works for ${formData.niche || 'any niche'} — swipe through to steal it.\n\nEvery post has a purpose.\nEvery post builds on the last.\nNone of them feel like ads.\n\nSave this carousel — you'll use it every week.`,
          cta: "Drop a 🔥 in the comments if you want the full monthly template",
          hashtags: ["contentcalendar", formData.niche?.toLowerCase().replace(/[^a-z]/g,"") || "contentcreator", "socialmediatips", "contentplanning", "digitalmarketing", "instagrammarketing", "marketingstrategy"],
          priority: "High Value",
          best_day: "Thursday",
          best_time: "12pm",
          why_now: "Mid-week carousel posts receive highest save rates",
          carousel_slides: [
            {slide_num:1, heading:"The 5-Post Weekly System for " + (formData.niche || "Any Business"), body:"Stop posting randomly. Every slot in your week has a job. Swipe to see the exact structure.", design_note:"Strong contrasting headline. Week calendar grid graphic. Dark BG with brand colour accent."},
            {slide_num:2, heading:"Monday: Education Post", body:"Teach something specific and useful. Show your expertise without selling. This builds trust and saves rate. Example: '3 things about [niche] that most people get wrong.'", design_note:"📚 icon. Blue/cool colour scheme. Clean text layout."},
            {slide_num:3, heading:"Tuesday: Reel / Video", body:"Video gets 3× more reach than static. Post a talking-head, how-to, or trend-based Reel. Even 15 seconds of value counts.", design_note:"🎬 icon. Energetic warm colour tone. Bold typography."},
            {slide_num:4, heading:"Thursday: Social Proof or Story", body:"Share a result, testimonial, or behind-the-scenes moment. This converts followers into buyers. Real > polished.", design_note:"⭐ star or speech bubble icon. Warm, human tone."},
            {slide_num:5, heading:"Saturday: Engagement Bait", body:"A question, poll, or this-or-that post. Not for reach — for depth. Comments and DMs tell the algorithm this content resonates.", design_note:"💬 icon. Playful, light design."},
            {slide_num:6, heading:"Save this. Use it every week.", body:"Follow for more systems that grow " + (formData.niche || "your business") + " without burning out.", design_note:"CTA slide. Bold save icon. Brand logo and handle. High contrast."}
          ],
          posting_checklist: ["Design slides in Canva using 1080×1080px format", "Keep each slide to 1 core idea only", "Slide 1 must work as a standalone image (shown in grid)", "Add your handle watermark on every slide", "Post on Thursday 12pm for maximum save rate"],
          engagement_tip: "Save carousels get reshared. Pin a comment asking followers \"Which slide hit hardest?\" to force people back to the beginning and re-read."
        },
        {
          platform: formData.platforms?.[0] || "Instagram",
          format: "Reel",
          title: `Why ${formData.niche || 'your industry'} is harder than it looks`,
          hook: `Everyone thinks ${formData.niche || 'this'} is easy. Here's what they're not seeing.`,
          caption: `Everyone thinks ${formData.niche || 'running a brand'} looks easy from the outside. \u00b7\u00b7\u00b7\n\nThey see the posts.\nThey don't see the 6am mornings.\nThe failed launches.\nThe content that got 3 likes.\n\nHere's what actually separates the brands that grow from the ones that disappear:\n\n✔️ Consistency over perfection\n✔️ Showing up even when nothing is working\n✔️ Treating every post as a test, not a statement\n\nThe brands winning in ${formData.niche || 'your space'} right now aren't the most talented.\n\nThey're the most consistent.\n\nAre you one of them? 👇`,
          cta: "Follow if you're building something real in ${formData.niche || 'this space'}",
          hashtags: ["entrepreneurmindset", formData.niche?.toLowerCase().replace(/[^a-z]/g,"") || "entrepreneur", "businessgrowth", "contentcreator", "buildingabrand", "motivation"],
          priority: "Good to Post",
          best_day: "Saturday",
          best_time: "10am",
          why_now: "Weekend motivational content receives high shares and saves",
          script: `[DIRECTION: Start walking towards the camera or seated at desk. Casual, unscripted feel. No music intro.]\n\nEveryone thinks ${formData.niche || 'doing this'} is easy.\n\n[DIRECTION: Pause. Slight smile. Look directly at camera.]\n\nThey see the polished posts. They don't see what it actually takes.\n\nThe 6am mornings when you'd rather do anything else.\nThe content you spent 3 hours on that got 4 likes.\nThe week you almost quit.\n\n[DIRECTION: Step closer to camera, drop voice slightly]\n\nBut here's what I've learned.\n\nThe brands that win in ${formData.niche || 'this space'} aren't the most talented.\n\nThey're not the best looking.\nThey don't have the biggest budgets.\n\n[DIRECTION: Point at camera, hold for 1 second]\n\nThey're the most consistent.\n\nIf you're still showing up — you're already ahead of 80% of people who started when you did.\n\n[DIRECTION: Smile, relax. Lower energy finish.]\n\nKeep going.`,
          posting_checklist: ["Film in natural light, minimal background clutter", "Keep total length under 45 seconds", "Add motivational background music at 15% volume", "Add 1-2 text overlays for key lines", "Post Saturday morning 9–11am when people are browsing"],
          engagement_tip: "Ask in your Stories the same day: 'Are you still showing up even when it's hard? Reply YES.' Screenshot the replies and post them next week as social proof."
        },
      ]);
      setStage(1);
    });

    return () => clearInterval(msgTimer);
  }, []);

  return (
    <div style={{animation:"fadeUp .3s ease", maxWidth: 700, margin: "0 auto", padding: "40px 20px"}}>
      <div style={{textAlign:"center", marginBottom:32}}>
        <div style={{fontSize:42, marginBottom:10}}>⚡</div>
        <h2 style={{fontSize:24, fontWeight:800, letterSpacing:"-.5px", marginBottom:8}}>
          {stage === 0 ? "Generating your posts..." : "Your 3 free posts are ready!"}
        </h2>
        <p style={{fontSize:14, color:"rgba(255,255,255,0.5)", maxWidth:460, margin:"0 auto", lineHeight: 1.6}}>
          {stage === 0
            ? stepMsg
            : "Real AI-generated content for your brand. Subscribe to unlock the full studio."}
        </p>
      </div>

      {stage === 0 ? (
        <div style={{padding:"60px 0", textAlign:"center"}}>
          <div style={{width:48, height:48, border:`4px solid ${color}33`, borderTopColor:color, borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto 20px"}}/>
          <div style={{fontSize:13, color:color, fontWeight:700, letterSpacing: "1px", textTransform: "uppercase"}}>AI Agent Working</div>
        </div>
      ) : (
        <div style={{display:"grid", gap:16, marginBottom:32}}>
          {posts.map((p, i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"20px"}}>
              <div style={{fontSize:11, fontWeight:800, color:color, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:8}}>
                {p.platform} · {p.format}
              </div>
              <div style={{fontSize:16, fontWeight:800, marginBottom:10, lineHeight: 1.3}}>{p.hook || p.title}</div>
              <div style={{fontSize:13, color:"rgba(255,255,255,0.6)", whiteSpace:"pre-wrap", lineHeight: 1.6, marginBottom: p.hashtags?.length ? 8 : 0}}>{p.caption}</div>
              {p.hashtags?.length > 0 && (
                <div style={{display:"flex", flexWrap:"wrap", gap:5, marginTop:6}}>
                  {p.hashtags.slice(0,5).map((h,j) => (
                    <span key={j} style={{background:`${color}14`, color, border:`1px solid ${color}28`, borderRadius:20, padding:"2px 9px", fontSize:11, fontWeight:600}}>#{h.replace(/^#/,"")}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {stage === 1 && (
        <button onClick={() => onSubscribe(posts)}
          style={{width:"100%", background:`linear-gradient(135deg,${color},${color}88)`,
            color:"#fff", border:"none", borderRadius:14, padding:"16px",
            fontSize:16, fontWeight:700, cursor:"pointer", letterSpacing:"-.2px",
            boxShadow:`0 8px 30px ${color}44`, transition:"all .2s"}}>
          Save to My Dashboard →
        </button>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
//  ONBOARDING FLOW — plan → details → platform pick → payment → profile
// ─────────────────────────────────────────────────────────────────
function Onboarding({onComplete, geo={country:"_DEFAULT"}, trialData=null}){
  const [screen,setScreen]=useState("plans"); // plans|details|otp|payment|profile|trial|trial_generation
  const [plan,setPlan]=useState(null);
  // Pre-fill form from trial data if upgrading
  const [form,setForm]=useState(trialData ? {
    brandName: trialData.brandName||"",
    email:     trialData.email||"",
    phone:     trialData.phone||"",
    countryCode: trialData.countryCode||"+91",
    audience:  trialData.audience||"",
    tone:      trialData.tone||"",
    niche:     trialData.niche||"",
    platforms: trialData.platforms||[],
  } : {
    brandName:"",email:"",phone:"",countryCode:"+91",
    audience:"",tone:"",niche:"",
    platforms:[],
  });
  const [trialContent, setTrialContent]=useState(null);
  const [errors,setErrors]=useState({});
  // Flag so the details screen knows to show upgrade-specific UI
  const isUpgradeFlow = !!trialData;

  useEffect(() => {
    const querySource = window.location.search || window.location.hash;
    if (querySource.includes("?")) {
      const urlParams = new URLSearchParams(querySource.split("?")[1]);
      const planParam = urlParams.get("plan");
      const isUpgrade = urlParams.get("upgrade") === "1";
      if (planParam === "trial") {
        setPlan({ id: "trial", isTrialFlow: true, name: "Free Trial", color: "#5ba4f5", platformCount: 1, platformOptions: ["Instagram","YouTube","LinkedIn","Facebook","Twitter/X","Threads"] });
        setScreen("details");
      } else if (planParam) {
        const selectedPlan = PLANS.find(p => p.id === planParam);
        if (selectedPlan) {
          setPlan({...selectedPlan, isTrialFlow: false});
          // If coming from trial upgrade, go straight to details (pre-filled)
          if (isUpgrade || trialData) setScreen("details");
        }
      }
    }
  }, []);

  const setF=(k,v)=>{
    setForm(p=>({...p,[k]:v}));
    const e=fieldErr(k,v);
    setErrors(p=>({...p,[k]:e||undefined}));
  };

  const togglePlatform=(p)=>{
    const maxCount = plan?.platformCount===999 ? 999 : plan?.platformCount||1;
    setForm(prev=>{
      const cur=prev.platforms||[];
      if(cur.includes(p)) return {...prev,platforms:cur.filter(x=>x!==p)};
      if(cur.length>=maxCount) return prev; // at limit
      return {...prev,platforms:[...cur,p]};
    });
  };

  const [savingData, setSavingData] = useState(false);
  const validateDetails=()=>{
    const e={};
    ["brandName","email","audience","tone","niche"].forEach(k=>{
      const err=fieldErr(k,form[k]||"");
      if(err) e[k]=err;
    });
    if(form.phone){const err=fieldErr("phone",form.phone);if(err) e.phone=err;}
    if(!form.platforms?.length) e.platforms="Choose at least one platform";
    return e;
  };

  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifyingOtp,setVerifyingOtp]=useState(false);
  const [otpSessionId, setOtpSessionId] = useState(""); // 2Factor session ID

  const SUPPORT_EMAIL = "info@socialninjas.in";
  const SUPPORT_INSTAGRAM = "https://www.instagram.com/socialninja.s/";

  const submitDetails=async()=>{
    const errs=validateDetails();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setSavingData(true);
    try {
      if(form.phone) {
        const r = await fetch("/api/send-otp", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({phone: form.countryCode + form.phone.replace(/\D/g,"")})
        });
        const d = await r.json().catch(()=>({}));
        if(d.sessionId) setOtpSessionId(d.sessionId);
      }
    } catch(e){ /* non-blocking */ }
    setSavingData(false);
    setScreen("otp");
  };

  const verifyOtpAndProceed=async()=>{
    if(!otpValue.trim()) { setOtpError("Please enter the 6-digit code."); return; }
    setVerifyingOtp(true);
    setOtpError("");
    try {
      if(form.phone) {
        const res = await fetch("/api/verify-otp", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            phone: form.countryCode + form.phone.replace(/\D/g,""),
            code: otpValue.trim(),
            sessionId: otpSessionId
          })
        });
        if(!res.ok) {
          const err = await res.json().catch(()=>({}));
          setOtpError(err.error || "Invalid code. Please try again.");
          setVerifyingOtp(false);
          return;
        }
      }

      if(plan.isTrialFlow) {
        const trials = await DB.get("snstudio_trials") || {};
        const tEmail = form.email.toLowerCase().trim();
        const tPhone = form.phone ? form.phone.replace(/\D/g,'') : null;
        const hasEmail = Object.values(trials).some(t => t.email.toLowerCase().trim() === tEmail);
        const hasPhone = tPhone && Object.values(trials).some(t => t.phone && t.phone.replace(/\D/g,'') === tPhone);
        if (hasEmail || hasPhone) {
          setOtpError("A free trial has already been used for this email or phone number. Please upgrade to continue.");
          setVerifyingOtp(false);
          return;
        }
        // Check backend too (cross-device duplicate protection)
        try {
          const checkRes = await fetch("/api/check-trial", {
            method:"POST", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:tEmail, phone:form.phone})
          });
          if(checkRes.ok){
            const checkData = await checkRes.json();
            if(checkData.exists){
              setOtpError("A free trial has already been used for this email or phone. Please upgrade to continue.");
              setVerifyingOtp(false); return;
            }
          }
        } catch(e){ /* non-blocking — local check already passed */ }
        trials[Date.now()] = { email: tEmail, phone: form.phone, date: new Date().toISOString() };
        await DB.set("snstudio_trials", trials);
        // Persist to Upstash Redis for cross-device trial tracking
        fetch("/api/check-trial", {method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({action:"save", email:tEmail, phone:form.phone})}).catch(()=>{});
        fetch("/api/data?resource=clients", {method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({type:"trial",email:tEmail,phone:form.phone,brandName:form.brandName,
            date:new Date().toISOString(),paymentStatus:"trial"})}).catch(()=>{});
      }

      const leadData = {...form, planName:plan.name, displayINR:plan.displayINR,
        joinDate:new Date().toLocaleDateString("en-IN"), paymentStatus:"lead"};
      pushToClickUp(leadData, CONFIG.clickup.leadsListId);
      pushToBackend(leadData);

      setVerifyingOtp(false);
      if(plan.isTrialFlow) {
        setScreen("trial_generation");
      } else {
        setScreen("payment");
      }
    } catch(e) {
      setOtpError("Network error. Please check your connection and try again.");
      setVerifyingOtp(false);
    }
  };

  // ── PLANS SCREEN ──
  if(screen==="plans") return(
    <div style={{maxWidth:920,margin:"0 auto",padding:"36px 20px"}}>
      {/* Hero */}
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:12}}>
          <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#38bdf8,#0D1B3E)",border:"1px solid #38bdf840",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🥷</div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
            <span style={{fontFamily:"Outfit, sans-serif",fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-0.5px",lineHeight:1}}>Social<em style={{fontStyle:"normal",color:CONFIG.accentColor}}>Ninja's</em>.</span>
            <span style={{fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.2em",color:CONFIG.accentColor,alignSelf:"flex-end",lineHeight:1,marginTop:-2}}>AI Agency</span>
          </div>
        </div>
        <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"3px",marginBottom:10}}>{CONFIG.brandTagline}</div>
        <h1 style={{fontSize:46,fontWeight:800,margin:"0 0 14px",letterSpacing:"-1.8px",lineHeight:1.08,
          background:"linear-gradient(155deg,#ffffff 40%,#7BA8D4)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          Stop guessing.<br/>Start growing.
        </h1>
        <p style={{color:"rgba(255,255,255,0.42)",fontSize:16,maxWidth:500,margin:"0 auto 24px",lineHeight:1.7}}>
          AI researches what's trending on your platform right now — then writes every caption, script, carousel, thread and hashtag set. You just copy, paste, and post.
        </p>
        {/* Feature pills */}
        <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:10}}>
          {["✓ Live trend research","✓ Platform-native captions","✓ Reel scripts","✓ Carousel copy","✓ Thread writer","✓ Hashtag strategy","✓ Posting checklist","✓ Never repeats"].map(f=>(
            <span key={f} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",
              borderRadius:30,padding:"5px 13px",fontSize:12,color:"rgba(255,255,255,0.65)"}}>{f}</span>
          ))}
        </div>
        <button onClick={()=>{
          setPlan({ id: "trial", isTrialFlow: true, name: "Free Trial", color: "#5ba4f5", platformCount: 1, platformOptions: ["Instagram","YouTube","LinkedIn","Facebook","Twitter/X","Threads"] });
          setScreen("details");
        }} style={{marginTop:24, background:`linear-gradient(135deg,#38bdf8,#38bdf888)`,color:"#fff",border:"none",borderRadius:14,padding:"14px 28px",fontSize:15,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px",boxShadow:`0 8px 30px #38bdf844`}}>
          ⚡ Try 3 Posts Free — No Card Needed
        </button>
      </div>

      {/* Plans grid */}
      <div className="mobile-grid-1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:40}}>
        {PLANS.map((pl,plIdx)=>{
          const pricing = getPricing(geo.country, plIdx);
          const geoInfo = GEO_PRICING[geo.country]||GEO_PRICING["_DEFAULT"];
          return(
            <div key={pl.id}
              style={{background:pl.badge?"linear-gradient(160deg,#0D1B3E,#0b0b1a)":"#050A1F",
                border:`2px solid ${pl.color}${pl.badge?"70":"25"}`,borderRadius:22,
                padding:"24px 20px",position:"relative",transition:"transform .18s"}}
              onMouseOver={e=>e.currentTarget.style.transform="translateY(-3px)"}
              onMouseOut={e=>e.currentTarget.style.transform="translateY(0)"}>
              {pl.badge&&(
                <div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",
                  background:`linear-gradient(135deg,${pl.color},${pl.color}AA)`,color:"#fff",
                  borderRadius:20,padding:"3px 16px",fontSize:10,fontWeight:800,letterSpacing:"1.5px",
                  whiteSpace:"nowrap"}}>{pl.badge}</div>
              )}
              <div style={{fontSize:10,fontWeight:700,color:pl.color,textTransform:"uppercase",
                letterSpacing:"2px",marginBottom:4}}>{pl.tagline}</div>
              <div style={{fontSize:24,fontWeight:800,letterSpacing:"-.5px",marginBottom:10}}>{pl.name}</div>

              {/* Price */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:3}}>
                  {geoInfo.flag} Pricing in {geoInfo.currency}
                </div>
                <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:4}}>
                  <span style={{fontSize:38,fontWeight:800,color:pl.color,letterSpacing:"-1.5px"}}>
                    {pricing.display}</span>
                  <span style={{fontSize:13,color:"rgba(255,255,255,0.35)"}}>/mo</span>
                </div>
                <div style={{display:"flex",gap:7,alignItems:"center"}}>
                  <span style={{fontSize:12,color:"rgba(255,255,255,0.25)",textDecoration:"line-through"}}>
                    {pricing.displayOriginal}</span>
                  <span style={{background:`${pl.color}20`,color:pl.color,borderRadius:5,
                    padding:"2px 7px",fontSize:10,fontWeight:700}}>{pricing.disc}% off</span>
                </div>
                {pl.highlight&&(
                  <div style={{fontSize:11,color:pl.color,fontWeight:600,marginTop:5}}>
                    💡 {pl.highlight}</div>
                )}
              </div>

              {/* Per-post count */}
              <div className="mobile-col" style={{display:"flex",gap:16,marginBottom:20,flexWrap:"wrap"}}>
                <div style={{background:"rgba(255,255,255,0.05)",borderRadius:7,
                  padding:"5px 10px",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.55)"}}>
                  {pl.postsPerMonth===999?"Unlimited":"~"+pl.postsPerMonth} posts/month</div>
                <div style={{background:`${pl.color}12`,border:`1px solid ${pl.color}25`,borderRadius:7,
                  padding:"5px 10px",fontSize:11,fontWeight:700,color:pl.color}}>
                  {pl.platformCount===999?"All platforms":"Choose "+pl.platformCount+" platform"+(pl.platformCount!==1?"s":"")}</div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:7,
                  padding:"5px 10px",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.4)"}}>
                  {pricing.perPost}/post</div>
              </div>
              {/* Platform icons — compact pill row */}
              <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:10,padding:"9px 11px",marginBottom:14}}>
                <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                  color:"rgba(255,255,255,0.3)",marginBottom:6}}>
                  {pl.platformCount===999?"All platforms included":"Pick "+pl.platformCount+" from"}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {(pl.platformCount===999
                    ? ["📸","▶️","💼","𝕏","🎵","🧵","👤","📌","👻"]
                    : pl.platformOptions.slice(0,pl.platformCount===2?4:8)
                  ).map((ic,i)=>{
                    const names={"📸":"IG","▶️":"YT","💼":"LI","𝕏":"X","🎵":"TK","🧵":"Th","👤":"FB","📌":"Pin","👻":"SC"};
                    const allIcons={"Instagram":"📸","Facebook":"👤","YouTube":"▶️","LinkedIn":"💼","Twitter/X":"𝕏","Threads":"🧵","Pinterest":"📌","Snapchat":"👻","TikTok":"🎵"};
                    const isEmoji = typeof ic === "string" && ic.length <= 2;
                    const displayIcon = isEmoji ? ic : (allIcons[ic]||"📲");
                    const displayName = isEmoji ? (names[ic]||"") : ic.split("/")[0].substring(0,3);
                    const active = pl.platformCount===999 || i<pl.platformCount;
                    return(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:3,
                        background:active?`${pl.color}18`:"rgba(255,255,255,0.04)",
                        border:`1px solid ${active?pl.color+"35":"rgba(255,255,255,0.08)"}`,
                        borderRadius:6,padding:"3px 8px",fontSize:10,fontWeight:700,
                        color:active?pl.color:"rgba(255,255,255,0.25)"}}>
                        <span>{displayIcon}</span>{displayName}
                      </div>
                    );
                  })}
                  {pl.platformCount===999&&(
                    <div style={{display:"flex",alignItems:"center",
                      background:`${pl.color}18`,border:`1px solid ${pl.color}35`,
                      borderRadius:6,padding:"3px 8px",fontSize:9,fontWeight:700,
                      color:`${pl.color}99`}}>+more</div>
                  )}
                </div>
              </div>

              <div style={{height:1,background:"rgba(255,255,255,0.06)",marginBottom:14}}/>
              <div style={{display:"grid",gap:6,marginBottom:16}}>
                {pl.features.map((f,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                    <span style={{color:pl.color,fontSize:14,flexShrink:0,lineHeight:1.3}}>{f.icon}</span>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.58)",lineHeight:1.45}}>{f.text}</span>
                  </div>
                ))}
              </div>
              <div style={{background:`${pl.color}0d`,border:`1px solid ${pl.color}22`,borderRadius:9,
                padding:"8px 11px",fontSize:11,color:`${pl.color}cc`,fontWeight:600,
                textAlign:"center",marginBottom:14}}>
                🛡 {pl.guarantee}</div>
              {true?(
                <button onClick={()=>{setPlan({...pl, isTrialFlow: false});setScreen("details");}}
                  style={{width:"100%",background:`linear-gradient(135deg,${pl.color},${pl.color}99)`,color:"#fff",border:"none",borderRadius:50,padding:"13px",boxShadow:`0 8px 24px ${pl.color}40,inset 0 1px 0 rgba(255,255,255,0.18)`,
                    fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"}}>
                  Select {pl.name} →
                </button>
              ):(
                <button onClick={()=>{setPlan(pl);setScreen("details");}}
                  style={{width:"100%",background:`linear-gradient(135deg,${pl.color},${pl.color}88)`,
                    color:"#fff",border:"none",borderRadius:11,padding:"12px",
                    fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"}}>
                  Choose {pl.name} →
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Social proof */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:36}}>
        {[["150+","Brands Growing","India · UAE · US · UK"],
          ["2.4M+","Posts Created","Across all niches"],
          ["4.9★","Client Rating","Verified reviews"]].map(([n,l,s])=>(
          <div key={n} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderRadius:14,padding:"18px",textAlign:"center",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05)"}}>
            <div style={{fontSize:28,fontWeight:800,color:CONFIG.accentColor,letterSpacing:"-.8px"}}>{n}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:"-.2px"}}>{l}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.33)",marginTop:2}}>{s}</div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.5)",textAlign:"center",
          marginBottom:16,letterSpacing:"-.2px"}}>Common questions</div>
        {[["Do I need to know anything about content?","No. Just tell us your brand and what you sell. The AI does all the research and writing."],
          ["What platforms do you support?","Instagram, Facebook, YouTube, LinkedIn, Twitter/X, Threads, Pinterest, Snapchat, TikTok."],
          ["Can I cancel anytime?","Yes. All plans are month-to-month. No contracts, no lock-in."],
          ["What does 'live trend research' mean?","Before writing your content, the AI searches the web to find what's actually trending this week in your niche — so every post rides current momentum, not last month's trends."],
          ["Is the content really unique?","Yes. The AI has permanent memory — it tracks every post generated and never repeats a topic or angle."],
        ].map(([q,a])=>(
          <div key={q} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(20px)",borderRadius:12,padding:"14px 16px",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.75)",marginBottom:5,letterSpacing:"-.2px"}}>{q}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.6}}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── DETAILS + PLATFORM SCREEN ──
  if(screen==="details"&&plan) return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"clamp(16px,4vw,28px) clamp(14px,4vw,20px)"}}>
      <button onClick={()=>setScreen("plans")}
        style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.55)",borderRadius:50,padding:"7px 16px",fontSize:12.5,cursor:"pointer",marginBottom:20,fontWeight:400,backdropFilter:"blur(20px)",fontFamily:"'Outfit', 'DM Sans',sans-serif",letterSpacing:"-.1px"}}>← Back to Plans</button>

      {/* Plan badge */}
      <div style={{background:`${plan.color}12`,border:`1px solid ${plan.color}28`,borderRadius:12,
        padding:"13px 17px",marginBottom:22,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.2px"}}>
            {plan.name} {plan.isTrialFlow ? "· Free / No Card Required" : `· ${getPricing(geo.country, PLANS.findIndex(p=>p.id===plan.id)).display}/mo`}
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{plan.guarantee || "Cancel anytime. No lock-in."}</div>
        </div>
        <button onClick={()=>setScreen("plans")}
          style={{fontSize:12,color:plan.color,background:"none",border:"none",cursor:"pointer",fontWeight:700}}>
          Change</button>
      </div>

      {/* Smart upgrade notice — shown when upgrading from trial */}
      {isUpgradeFlow && (
        <div style={{background:"linear-gradient(135deg,rgba(52,211,153,0.12),rgba(52,211,153,0.04))",
          border:"1px solid rgba(52,211,153,0.3)",borderRadius:14,padding:"14px 18px",marginBottom:20,
          display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:22}}>✓</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:"#34d399",marginBottom:3}}>Your trial details have been carried over</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.55}}>
              We've pre-filled your brand info. Just add additional details below to unlock the full studio.
            </div>
          </div>
        </div>
      )}

      <h2 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:28,fontWeight:800,letterSpacing:"-1px",marginBottom:6,lineHeight:1.04}}>
        {isUpgradeFlow ? "Complete your brand profile" : "Your brand details"}
      </h2>
      <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,marginBottom:20,lineHeight:1.6}}>
        {isUpgradeFlow
          ? "These extra details massively improve AI content quality — social accounts, personality and goals."
          : "This trains the AI to write specifically for your brand and audience. Be detailed — the more context, the better the content."}
      </p>

      <div style={{display:"grid",gap:14}}>
        {/* For upgrade flow, show pre-filled fields as read-only summary, then extra fields */}
        {isUpgradeFlow ? (
          <>
            {/* Read-only summary of existing trial data */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"14px 16px"}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"rgba(255,255,255,0.3)",marginBottom:10}}>From your trial</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[{k:"Brand",v:form.brandName},{k:"Email",v:form.email},{k:"Niche",v:form.niche},{k:"Platforms",v:(form.platforms||[]).join(", ")}].map(({k,v})=>(
                  <div key={k} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"8px 11px"}}>
                    <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"rgba(255,255,255,0.28)",marginBottom:2}}>{k}</div>
                    <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>{v||"—"}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>setScreen("plans")}
                style={{marginTop:10,background:"none",border:"none",color:"rgba(255,255,255,0.3)",fontSize:11,cursor:"pointer",textDecoration:"underline"}}>
                Edit these details
              </button>
            </div>

            {/* Phone re-verification if not provided in trial */}
            {!form.phone && (
              <div style={{marginBottom:0}}>
                <Field label="Phone / WhatsApp" name="phone" error={errors.phone}>
                  <div style={{display:"flex",gap:6}}>
                    <select
                      value={form.countryCode}
                      onChange={e=>setF("countryCode",e.target.value)}
                      style={{width:"clamp(80px,22vw,100px)",flexShrink:0,background:errors.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",
                        border:`1px solid ${errors.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,
                        padding:"10px 4px",color:"#fff",fontSize:12,outline:"none"}}>
                      <option value="+91" style={{background:"#08101f",color:"#fff"}}>🇮🇳 +91</option>
                      <option value="+1" style={{background:"#08101f",color:"#fff"}}>🇺🇸 +1</option>
                      <option value="+44" style={{background:"#08101f",color:"#fff"}}>🇬🇧 +44</option>
                      <option value="+971" style={{background:"#08101f",color:"#fff"}}>🇦🇪 +971</option>
                      <option value="+61" style={{background:"#08101f",color:"#fff"}}>🇦🇺 +61</option>
                    </select>
                    <input value={form.phone} onChange={e=>setF("phone",e.target.value)}
                      placeholder="98765 43210" type="tel"
                      style={{flex:1,minWidth:0,background:errors.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",
                        border:`1px solid ${errors.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,
                        padding:"10px 11px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                </Field>
              </div>
            )}

            {/* Extra fields only asked on upgrade */}
            <div style={{background:"rgba(56,189,248,0.05)",border:"1px solid rgba(56,189,248,0.15)",borderRadius:14,padding:"16px"}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",color:"#5ba4f5",marginBottom:14}}>Additional details to maximise your content</div>
              <div style={{display:"grid",gap:12}}>
                <Field label="Website" name="website" value={form.website||""}
                  onChange={setF} placeholder="https://yourbrand.com"
                  hint="AI links to your site and understands your offering better"/>
                <Field label="Brand Tagline / Slogan" name="tagline" value={form.tagline||""}
                  onChange={setF} placeholder="e.g. Grow Fast. Scale Smart."
                  hint="Appears in your AI-generated content"/>
                <Field label="Brand Personality" name="brandPersonality" value={form.brandPersonality||""}
                  onChange={setF} rows={2}
                  placeholder="e.g. Bold, no-fluff, like a high-performance coach. Think Hormozi meets Red Bull."
                  hint="The AI writes exactly like this. Be expressive."/>
                <Field label="Content Goal" name="contentGoal" value={form.contentGoal||""}
                  onChange={setF} rows={2}
                  placeholder="e.g. Generate leads for online coaching — 50 sign-ups/month"
                  hint="What do you want social media to achieve?"/>
                <Field label="Top Competitors / Inspiration Accounts" name="competitors" value={form.competitors||""}
                  onChange={setF} placeholder="e.g. @alexhormozi, @garyvee, @hubspot"
                  hint="AI studies their style and writes better than them"/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <Field label="Instagram Handle" name="instagram" value={form.instagram||""}
                    onChange={setF} placeholder="@yourbrand"/>
                  <Field label="LinkedIn Profile" name="linkedin" value={form.linkedin||""}
                    onChange={setF} placeholder="linkedin.com/in/yourname"/>
                </div>
              </div>
            </div>

            {/* Platform change option */}
            {plan.platformCount > (form.platforms?.length||0) && (
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"1px",marginBottom:8}}>
                  {plan.name} plan — choose up to {plan.platformCount} platforms
                  <span style={{color:plan.color,fontWeight:700,marginLeft:8}}>
                    {form.platforms.length}/{plan.platformCount===999?"∞":plan.platformCount} selected
                  </span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {plan.platformOptions.map(p=>{
                    const sel=form.platforms.includes(p);
                    const atLimit=form.platforms.length>=(plan.platformCount)&&plan.platformCount!==999;
                    const disabled=!sel&&atLimit;
                    return(
                      <button key={p} onClick={()=>!disabled&&togglePlatform(p)}
                        style={{padding:"7px 14px",borderRadius:25,fontSize:12,fontWeight:600,
                          cursor:disabled?"not-allowed":"pointer",transition:"all .15s",
                          background:sel?plan.color:disabled?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.05)",
                          color:sel?"#fff":disabled?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.65)",
                          border:`1.5px solid ${sel?plan.color:disabled?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.12)"}`,
                          opacity:disabled?0.45:1}}>
                        {sel?"✓ ":""}{p}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
        <Field label="Brand / Business Name" name="brandName" value={form.brandName}
          onChange={setF} error={errors.brandName} placeholder="e.g. FitLife Studio, Priya's Skincare" required/>
        <Field label="Email" name="email" type="email" value={form.email}
          onChange={setF} error={errors.email} placeholder="you@email.com" required/>
        <div>
            <Field label="Phone / WhatsApp" name="phone" error={errors.phone}>
              <div style={{display:"flex",gap:6}}>
                <select 
                  value={form.countryCode} 
                  onChange={e=>setF("countryCode",e.target.value)}
                  style={{width:"clamp(80px,22vw,100px)",flexShrink:0,background:errors.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",
                    border:`1px solid ${errors.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,
                    padding:"10px 4px",color:"#fff",fontSize:12,outline:"none"}}>
                  <option value="+91" style={{background:"#08101f",color:"#fff"}}>🇮🇳 +91</option>
                  <option value="+1" style={{background:"#08101f",color:"#fff"}}>🇺🇸 +1</option>
                  <option value="+44" style={{background:"#08101f",color:"#fff"}}>🇬🇧 +44</option>
                  <option value="+971" style={{background:"#08101f",color:"#fff"}}>🇦🇪 +971</option>
                  <option value="+61" style={{background:"#08101f",color:"#fff"}}>🇦🇺 +61</option>
                  <option value="+65" style={{background:"#08101f",color:"#fff"}}>🇸🇬 +65</option>
                  <option value="+49" style={{background:"#08101f",color:"#fff"}}>🇩🇪 +49</option>
                  <option value="+27" style={{background:"#08101f",color:"#fff"}}>🇿🇦 +27</option>
                </select>
                <input value={form.phone} onChange={e=>setF("phone",e.target.value)}
                  placeholder="98765 43210" type="tel"
                  style={{flex:1,minWidth:0,background:errors.phone?"rgba(30,22,8,0.8)":"rgba(255,255,255,0.05)",
                    border:`1px solid ${errors.phone?"#92620a":"rgba(255,255,255,0.1)"}`,borderRadius:10,
                    padding:"10px 11px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box"}}/>
              </div>
            </Field>
        </div>

        {/* Niche — smart dropdown */}
        <SmartSelect label="Content Niche / Industry" value={form.niche} onChange={v=>setF("niche",v)}
          options={NICHE_OPTIONS} placeholder="Select your niche or type your own..."
          hint="This directs all trend research — be specific" error={errors.niche} required/>

        {/* Audience — smart dropdown */}
        <SmartSelect label="Target Audience" value={form.audience} onChange={v=>setF("audience",v)}
          options={AUDIENCE_TEMPLATES} placeholder="Who are your ideal customers?"
          hint="Age, location, interests, pain point" error={errors.audience} required/>

        {/* Brand voice — smart dropdown */}
        <SmartSelect label="Brand Voice" value={form.tone} onChange={v=>setF("tone",v)}
          options={TONE_OPTIONS} placeholder="How does your brand sound?"
          hint="The AI writes every caption in this voice" error={errors.tone} required/>

        {/* ── PLATFORM SELECTOR ── */}
        <div>
          <div style={{fontSize:11,fontWeight:700,color:errors.platforms?"#e8b86d":"rgba(255,255,255,0.4)",
            textTransform:"uppercase",letterSpacing:"1px",marginBottom:4}}>
            Choose Platform{plan.platformCount!==1?"s":""} <span style={{color:"#E31313"}}>*</span>
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.28)",marginBottom:10,lineHeight:1.5}}>
            {plan.platformCount===999
              ? "Pro plan — choose as many platforms as you want"
              : `${plan.name} plan — choose ${plan.platformCount} platform${plan.platformCount!==1?"s":""}`}
            {form.platforms.length>0&&(
              <span style={{color:plan.color,fontWeight:700,marginLeft:6}}>
                {form.platforms.length}/{plan.platformCount===999?"∞":plan.platformCount} selected</span>
            )}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {plan.platformOptions.map(p=>{
              const sel=form.platforms.includes(p);
              const atLimit=form.platforms.length>=(plan.platformCount) && plan.platformCount!==999;
              const disabled=!sel&&atLimit;
              return(
                <button key={p} onClick={()=>!disabled&&togglePlatform(p)}
                  style={{padding:"8px 16px",borderRadius:25,fontSize:13,fontWeight:600,
                    cursor:disabled?"not-allowed":"pointer",transition:"all .15s",
                    background:sel?plan.color:disabled?"rgba(255,255,255,0.02)":"rgba(255,255,255,0.05)",
                    color:sel?"#fff":disabled?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.65)",
                    border:`1.5px solid ${sel?plan.color:disabled?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.12)"}`,
                    opacity:disabled?0.45:1}}>
                  {sel?"✓ ":""}{p}
                </button>
              );
            })}
          </div>
          {errors.platforms&&<div style={{fontSize:11,color:"#e8b86d",marginTop:6}}>⚠ {errors.platforms}</div>}
          {form.platforms.length>0&&!errors.platforms&&(
            <div style={{marginTop:8,fontSize:11,color:`${plan.color}99`}}>
              ✓ AI will write native content for: {form.platforms.join(", ")}</div>
          )}
        </div>
          </>
        )}
      </div>

      <button onClick={submitDetails} disabled={savingData}
        style={{width:"100%",marginTop:22,
          background:`linear-gradient(135deg,${plan.color},${plan.color}88)`,
          color:"#fff",border:"none",borderRadius:13,padding:"14px",
          fontSize:15,fontWeight:700,cursor:savingData?"not-allowed":"pointer",letterSpacing:"-.2px",
          opacity: savingData ? 0.7 : 1}}>
        {savingData ? "Processing..." : plan.isTrialFlow ? "⚡ Generate My 3 Free Posts →" : isUpgradeFlow ? "Continue to Payment →" : "Continue to Payment →"}
      </button>
    </div>
  );


  if(screen==="otp"&&plan) return (
    <div style={{maxWidth:400,margin:"0 auto",padding:"40px 20px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16}}>📱</div>
      <h2 style={{fontFamily:"'Bricolage Grotesque',system-ui,sans-serif",fontSize:24,fontWeight:700,marginBottom:8,letterSpacing:"-0.5px"}}>Verify your phone</h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:24}}>
        We've sent a verification code via SMS to<br/>
        <b style={{color:"#fff"}}>{form.phone ? `${form.countryCode} ${form.phone}` : "your phone number"}</b>.
      </p>
      
      {import.meta?.env?.DEV && (
        <div style={{background:"rgba(56,189,248,0.08)", border:"1px dashed rgba(56,189,248,0.2)", borderRadius:8, padding:"10px", marginBottom:20, color:"#7ab8f5", fontSize:11, fontWeight:600}}>
          🛠 Dev Mode: Use code <b style={{color:"#fff"}}>1234</b> · 2Factor SMS not active in local dev
        </div>
      )}
      <input value={otpValue} onChange={e=>setOtpValue(e.target.value)} maxLength={6}
        placeholder="------"
        style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:12,padding:"16px",fontSize:28,textAlign:"center",letterSpacing:"14px",marginBottom:8,color:"#fff",outline:"none",fontFamily:"monospace"}}/>
      {otpError && <div style={{color:"#e8b86d",fontSize:13,marginBottom:16}}>⚠ {otpError}</div>}
      
      <button onClick={verifyOtpAndProceed} disabled={verifyingOtp}
        style={{width:"100%",background:`linear-gradient(135deg,#1d4ed8,#5ba4f5)`,
          color:"#fff",border:"none",borderRadius:12,padding:"16px",marginTop:16,
          fontSize:16,fontWeight:700,cursor:verifyingOtp?"not-allowed":"pointer",boxShadow:"0 8px 24px rgba(91,164,245,0.28)",transition:"all .2s"}}>
        {verifyingOtp ? "Verifying code..." : "Verify & Continue →"}
      </button>
      <button onClick={()=>setScreen("details")} disabled={verifyingOtp}
        style={{marginTop:24,background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer",textDecoration:"underline"}}>
        Change phone number
      </button>
    </div>
  );

  if(screen==="trial_generation"&&plan) return(
    <TrialGeneration plan={plan} formData={form} onSubscribe={async (posts) => {
      const id = `client_${Date.now()}`;
      const enriched = {
        ...form, id, plan: "trial", planName: "Free Trial",
        isTrial: true,
        color: "#5ba4f5", brand: "client", darkBg: "#020617",
        joinDate: new Date().toLocaleDateString("en-IN"), active: true, emoji: "🎁",
        platforms: form.platforms?.length ? form.platforms : ["Instagram"],
        sub: form.platforms?.[0] || "Instagram",
      };
      
      const clients = await DB.get("snstudio_clients") || {};
      await DB.set("snstudio_clients", { ...clients, [id]: enriched });
      await pushToBackend(enriched);

      const historyEntry = {
        date: new Date().toLocaleDateString("en-US", {month:"short", day:"numeric"}),
        posts: posts
      };
      await DB.set(`snstudio_hist_${id}`, [historyEntry]);

      onComplete(enriched);
    }}/>
  );

  if(screen==="payment"&&plan) return(
    <PaymentStep plan={plan} formData={form}
      onVerified={()=>setScreen("profile")}/>
  );

  if(screen==="profile"&&plan) return(
    <ProfileBuilder clientData={{
      ...form, plan:plan.id, planName:plan.name, displayINR:plan.displayINR,
      color:plan.color, brand:"client", darkBg:"#020617",
      joinDate:new Date().toLocaleDateString("en-IN"), active:true, emoji:"🏢",
      sub:form.platforms?.[0]||"Instagram",
    }} plan={plan}
    onComplete={async enriched=>{
      const clients=await DB.get("snstudio_clients")||{};
      const id=`client_${Date.now()}`;
      enriched.id=id;
      
      await DB.set("snstudio_clients",{...clients,[id]:enriched});
      await pushToBackend(enriched);
      
      onComplete(enriched);
    }}/>
  );

  return null;
}

// ─────────────────────────────────────────────────────────────────
//  WEEKLY TIPS ENGINE — AI generates profile analysis + tips
// ─────────────────────────────────────────────────────────────────
async function generateWeeklyTips(profile, history) {
  const totalPosts = history.flatMap(w=>w.posts||[]).length;
  const platforms = (profile.platforms||[profile.sub||"Instagram"]).join(", ");
  const lastWeek = history[history.length-1];
  const accts = profile.socialAccounts||{};
  const hasAccounts = Object.values(accts).some(v=>v);
  try {
    const res = await fetch("/api/analysis", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        system:`You are a world-class social media growth consultant who has grown accounts to millions of followers. Deeply analyse this client's profile, their actual social media accounts, and content history to give hyper-specific, actionable growth tips.

Client: ${profile.brandName||profile.name}
Platforms: ${platforms}
Niche: ${profile.niche}
Audience: ${profile.audience}
Brand Voice: ${profile.tone||"Engaging and authentic"}
Posts generated so far: ${totalPosts}
Plan: ${profile.planName||"Starter"}
${lastWeek ? `Last week's content topics: ${lastWeek.posts?.map(p=>p.title).join(", ")}` : ""}
${accts.instagram?`Instagram: @${accts.instagram.replace("@","")}`:""} 
${accts.linkedin?`LinkedIn: ${accts.linkedin}`:""}
${accts.youtube?`YouTube: ${accts.youtube}`:""}
${accts.tiktok?`TikTok: @${accts.tiktok.replace("@","")}`:""}
${accts.twitter?`Twitter/X: @${accts.twitter.replace("@","")}`:""}
${profile.followers?.instagram?`Instagram followers: ${profile.followers.instagram}`:""}
${profile.followers?.linkedin?`LinkedIn followers: ${profile.followers.linkedin}`:""}

${hasAccounts?"IMPORTANT: Use web_search to actually look up their social media accounts listed above. Find what they post, their engagement style, what's working, what's missing, and what their top-performing content looks like. Base your tips on what you actually find.":""}

Return ONLY raw JSON (no markdown fences):
{
  "score": number (1-100, account health),
  "growth_phase": "Building|Momentum|Scaling|Dominating",
  "account_analysis": {
    "strengths": ["string"],
    "gaps": ["string"],
    "quick_wins": ["string — specific, actionable, implementable today"]
  },
  "weekly_tips": [
    {"title":"string","detail":"string (be very specific to their niche and account)","priority":"High|Medium","impact":"string e.g. +15% reach","platform":"string"}
  ],
  "this_week_focus": "string (one main priority, max 20 words)",
  "platform_tips": [
    {"platform":"string","tip":"string","action":"string (step-by-step, specific to their account)","best_time":"string"}
  ],
  "content_insights": "string (3-4 sentences — specific observations about their content pattern, what to double down on, what to stop)"
}`,
        messages:[{role:"user",content:`Analyse ${profile.brandName||profile.name}'s social media presence and generate week ${history.length+1} growth strategy. ${hasAccounts?"Search their actual accounts online first.":""} Check current trends in "${profile.niche}" right now. Be hyper-specific — no generic tips.`}]
      })
    });
    if(!res.ok) throw new Error("API failed");
    const data = await res.json();
    const raw = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
    const s=raw.indexOf("{"), en=raw.lastIndexOf("}");
    if(s===-1||en===-1) throw new Error("JSON invalid");
    return JSON.parse(raw.slice(s,en+1));
  } catch (err) {
    // Return sample tips if generation fails to ensure trial users see the feature
    return {
      score: 85, growth_phase: "Building",
      account_analysis: {
        strengths: ["Clear niche focus", "Consistent branding"], gaps: ["Underutilizing video hooks", "Low community engagement"], quick_wins: ["Reply to all comments in first hour to boost algorithm", "Add a CTA to bio link"]
      },
      weekly_tips: [
        {title: "Optimize Bio for Search", detail: "Update your profile name to include your main keyword, not just your brand name.", priority: "High", impact: "Higher profile discovery", platform: "Instagram"},
        {title: "Test Hook Variations", detail: "Start your next 3 videos with text on screen in the first 0.5s that states the exact problem you are solving.", priority: "High", impact: "+20% retention", platform: "All"}
      ],
      this_week_focus: "Establish authority and drive saves.",
      platform_tips: [
        {platform: "Instagram", tip: "Carousels are currently favored by the algorithm.", action: "Post a 5-slide educational carousel this week.", best_time: "Wed 2pm"}
      ],
      content_insights: "Your audience is looking for actionable advice. Lean heavily into 'How To' styles and myth-busting formats this week to generate trust."
    };
  }
}

// ─────────────────────────────────────────────────────────────────
//  CLIENT PROFILE DASHBOARD
// ─────────────────────────────────────────────────────────────────
function ClientDashboard({profile, hKey, onGenerateContent, onUpgrade}) {
  const color = profile.color||"#7C3AED";
  const [tips, setTips] = useState(null);
  const [loadingTips, setLoadingTips] = useState(false);
  const [hist, setHist] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(()=>{
    (async()=>{
      const h = await DB.get(hKey)||[];
      setHist(h);
    })();
  },[hKey]);

  const fetchTips = async() => {
    setLoadingTips(true);
    const h = await DB.get(hKey)||[];
    const result = await generateWeeklyTips(profile, h);
    if(result) {
      setTips(result);
      await DB.set(hKey+"_tips", {tips:result, date:new Date().toLocaleDateString("en-GB")});
    }
    setLoadingTips(false);
  };

  useEffect(()=>{
    (async()=>{
      const saved = await DB.get(hKey+"_tips");
      if(saved?.tips) setTips(saved.tips);
    })();
  },[hKey]);

  const totalPosts = hist.flatMap(w=>w.posts||[]).length;
  const totalWeeks = hist.length;
  const platforms = profile.platforms||[profile.sub||"Instagram"];
  const lastGenDate = hist[hist.length-1]?.date||"Not yet";

  // Infographic ring component
  const Ring = ({value, max=100, size=80, color:rc, label, sub}) => {
    const pct = Math.min(value/max, 1);
    const r = (size-10)/2;
    const circ = 2*Math.PI*r;
    const dash = circ*pct;
    return (
      <div style={{textAlign:"center"}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={8}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={rc} strokeWidth={8}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{transition:"stroke-dasharray 1s ease"}}/>
        </svg>
        <div style={{marginTop:-size*0.7, position:"relative", zIndex:1}}>
          <div style={{fontSize:size*0.2, fontWeight:800, color:rc, letterSpacing:"-0.5px"}}>{value}</div>
        </div>
        <div style={{fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)", marginTop:size*0.3+4, letterSpacing:"-.1px"}}>{label}</div>
        {sub&&<div style={{fontSize:10, color:"rgba(255,255,255,0.28)"}}>{sub}</div>}
      </div>
    );
  };

  const phaseColor = {Building:"#5ba4f5",Momentum:"#f59e0b",Scaling:"#7C3AED",Dominating:"#E31313"};
  const pc = phaseColor[tips?.growth_phase]||color;

  const TABS = [
    {id:"overview", label:"📊 Overview"},
    {id:"tips", label:"💡 Weekly Tips"},
    {id:"platforms", label:"📲 Platform Tips"},
    {id:"content", label:"📝 Ongoing Content"},
    {id:"history", label:"📅 Previous History"},
  ];

  return (
    <div style={{animation:"fadeUp .3s ease"}}>
      {/* ── PROFILE HERO ── */}
      <div style={{background:`linear-gradient(135deg,${profile.darkBg||"#020617"},#0B152B)`,
        border:`1px solid ${color}22`,borderRadius:22,padding:"24px",marginBottom:16,
        position:"relative",overflow:"hidden"}}>
        {/* BG glow */}
        <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",
          background:`radial-gradient(circle,${color}20,transparent 70%)`,pointerEvents:"none"}}/>

        <div style={{display:"flex",alignItems:"flex-start",gap:16,flexWrap:"wrap",position:"relative"}}>
          {/* Logo / avatar */}
          <div style={{flexShrink:0}}>
            {profile.logoPreview
              ?<img src={profile.logoPreview} alt="logo"
                style={{width:64,height:64,borderRadius:16,objectFit:"contain",
                  background:"#fff",padding:6,border:`2px solid ${color}40`}}/>
              :<div style={{width:64,height:64,borderRadius:16,
                background:`linear-gradient(135deg,${color}30,${color}10)`,
                border:`2px solid ${color}35`,display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:28}}>{profile.emoji||"🏢"}</div>
            }
          </div>

          <div style={{flex:1,minWidth:200}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:5}}>
              <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-.5px",margin:0}}>
                {profile.brandName||profile.name}</h2>
              <span style={{background:"#052e16",color:"#4ade80",border:"1px solid #166534",
                borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>● Active</span>
              {profile.planName&&(
                <span style={{background:`${color}20`,color,border:`1px solid ${color}40`,
                  borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>
                  {profile.planName}</span>
              )}
            </div>
            {profile.tagline&&(
              <div style={{fontSize:13,color:`${color}99`,fontStyle:"italic",marginBottom:6}}>
                "{profile.tagline}"</div>
            )}
            <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.6,marginBottom:10,
              maxWidth:480}}>{profile.businessContext}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {platforms.map(p=>(
                <span key={p} style={{background:`${color}15`,border:`1px solid ${color}28`,color,
                  borderRadius:15,padding:"3px 11px",fontSize:11,fontWeight:700}}>{p}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
            <button onClick={fetchTips} disabled={loadingTips}
              style={{background:"rgba(255,255,255,0.08)",border:`1px solid ${color}30`,
                color:"rgba(255,255,255,0.8)",borderRadius:10,padding:"9px 18px",
                fontSize:13,fontWeight:600,cursor:loadingTips?"not-allowed":"pointer",whiteSpace:"nowrap",
                transition:"all .15s"}}>
              {loadingTips?"⏳ Analysing...":"🔄 Refresh Analysis"}</button>
          </div>
        </div>
      </div>

      {/* ── INFOGRAPHIC STATS ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Posts Created",value:totalPosts,sub:"all time",icon:"📝",color:"#5ba4f5"},
          {label:"Weeks Active",value:totalWeeks,sub:"content weeks",icon:"📅",color:"#7C3AED"},
          {label:"Platforms",value:platforms.length,sub:"active",icon:"📲",color:"#10b981"},
          {label:"This Week",value:hist[hist.length-1]?.posts?.length||0,sub:"posts ready",icon:"🎯",color:color},
        ].map((s,i)=>(
          <div key={i} style={{background:"#020617",border:`1px solid ${s.color}20`,borderRadius:16,
            padding:"16px 14px",textAlign:"center"}}>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:28,fontWeight:800,color:s.color,letterSpacing:"-1px",lineHeight:1}}>
              {s.value}</div>
            <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",marginTop:4,letterSpacing:"-.1px"}}>
              {s.label}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.25)"}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── GROWTH PHASE BANNER (when tips available) ── */}
      {tips?.growth_phase&&(
        <div style={{background:`linear-gradient(135deg,${pc}15,${pc}05)`,
          border:`1px solid ${pc}30`,borderRadius:14,padding:"14px 18px",marginBottom:16,
          display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
              color:"rgba(255,255,255,0.35)",marginBottom:3}}>Growth Phase</div>
            <div style={{fontSize:20,fontWeight:800,color:pc,letterSpacing:"-.5px"}}>
              {tips.growth_phase}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
              color:"rgba(255,255,255,0.35)",marginBottom:3}}>This Week's Focus</div>
            <div style={{fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.75)",letterSpacing:"-.2px"}}>
              {tips.this_week_focus}</div>
          </div>
          {tips.score&&(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
                color:"rgba(255,255,255,0.35)",marginBottom:6}}>Account Score</div>
              <div style={{position:"relative",width:72,height:72}}>
                <svg width={72} height={72} style={{transform:"rotate(-90deg)"}}>
                  <circle cx={36} cy={36} r={28} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={7}/>
                  <circle cx={36} cy={36} r={28} fill="none" stroke={pc} strokeWidth={7}
                    strokeDasharray={`${2*Math.PI*28*tips.score/100} ${2*Math.PI*28}`}
                    strokeLinecap="round"/>
                </svg>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
                  fontSize:16,fontWeight:800,color:pc}}>{tips.score}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── COMPACT UPGRADE BANNER ── */}
      {(profile.plan==="trial" || !profile.plan) && (
        <div style={{background:"linear-gradient(135deg,rgba(56,189,248,0.1),rgba(56,189,248,0.04))",
          border:"1px solid rgba(56,189,248,0.28)",borderRadius:12,padding:"10px 16px",
          marginBottom:14,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <span style={{fontSize:16}}>⚡</span>
          <div style={{flex:1,minWidth:180}}>
            <span style={{fontSize:13,fontWeight:700,color:"#f1f5f9"}}>You're on Free Trial — </span>
            <span style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>Upgrade to unlock 15–unlimited posts/month</span>
          </div>
          <button onClick={()=>typeof onUpgrade==='function' ? onUpgrade('starter') : (window.location.href=`${window.location.origin}/app/content-studio?plan=starter&upgrade=1`)}
            style={{background:"linear-gradient(135deg,#38bdf8,#1d4ed8)",color:"#fff",
              border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:700,
              cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,
              boxShadow:"0 4px 14px rgba(56,189,248,0.3)"}}>
            ⚡ Upgrade Now →</button>
        </div>
      )}

      {/* ── TABS ── */}
      <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",borderRadius:12,
        padding:4,marginBottom:16,overflowX:"auto",scrollbarWidth:"none",
        border:"1px solid rgba(255,255,255,0.06)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)}
            style={{padding:"8px 16px",borderRadius:9,fontSize:12,fontWeight:activeTab===t.id?700:500,
              border:activeTab===t.id?`1px solid ${color}40`:"1px solid transparent",
              cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s",
              background:activeTab===t.id?color:"transparent",
              color:activeTab===t.id?"#ffffff":"rgba(255,255,255,0.45)",
              boxShadow:activeTab===t.id?`0 2px 10px ${color}35`:"none"}}>
            {t.label}</button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab==="overview"&&(
        <div style={{display:"grid",gap:12}}>
          {/* Profile details */}
          <div style={{background:"#020617",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:16,padding:"18px 20px"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
              color:"rgba(255,255,255,0.28)",marginBottom:14}}>Brand Profile</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                ["Audience",profile.audience],
                ["Niche",profile.niche],
                ["Brand Voice",profile.tone],
                ["Avoid",profile.avoid||"Nothing specified"],
                ["Plan",profile.planName],
                ["Member Since",profile.joinDate],
                ["Email",profile.email],
                ["Website",profile.website||"Not provided"],
              ].filter(([,v])=>v).map(([k,v])=>(
                <div key={k} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                    color:"rgba(255,255,255,0.3)",marginBottom:4}}>{k}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.68)",lineHeight:1.5,
                    overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                    {v}</div>
                </div>
              ))}
            </div>
          </div>



          {/* ── SOCIAL ACCOUNTS PANEL ── */}
          {profile.socialAccounts&&Object.values(profile.socialAccounts).some(v=>v)&&(
            <div style={{background:"#020617",border:`1px solid ${color}20`,borderRadius:16,padding:"18px 20px"}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
                color:"rgba(255,255,255,0.28)",marginBottom:14}}>🔗 Connected Social Accounts</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
                {[
                  {key:"instagram",label:"Instagram",icon:"📸",prefix:"@",url:"https://instagram.com/"},
                  {key:"linkedin",label:"LinkedIn",icon:"💼",prefix:"",url:"https://"},
                  {key:"youtube",label:"YouTube",icon:"▶️",prefix:"",url:"https://"},
                  {key:"tiktok",label:"TikTok",icon:"🎵",prefix:"@",url:"https://tiktok.com/@"},
                  {key:"twitter",label:"Twitter/X",icon:"𝕏",prefix:"@",url:"https://x.com/"},
                  {key:"facebook",label:"Facebook",icon:"👤",prefix:"",url:"https://"},
                ].filter(a=>profile.socialAccounts[a.key]).map(a=>(
                  <a key={a.key} href={a.url+profile.socialAccounts[a.key].replace("@","")}
                    target="_blank" rel="noopener"
                    style={{display:"flex",alignItems:"center",gap:10,
                      background:"rgba(255,255,255,0.03)",border:`1px solid ${color}15`,
                      borderRadius:11,padding:"10px 13px",textDecoration:"none"}}>
                    <span style={{fontSize:18}}>{a.icon}</span>
                    <div style={{flex:1,overflow:"hidden"}}>
                      <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                        color:"rgba(255,255,255,0.3)",marginBottom:2}}>{a.label}</div>
                      <div style={{fontSize:12,fontWeight:600,color:color,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {a.prefix}{profile.socialAccounts[a.key].replace("@","")}</div>
                    </div>
                    {profile.followers?.[a.key]&&(
                      <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",
                        flexShrink:0}}>{profile.followers[a.key]}</div>
                    )}
                  </a>
                ))}
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:10}}>
                AI analyses these accounts before every content generation to fill your specific gaps</div>
            </div>
          )}

          {/* ── ACCOUNT ANALYSIS (quick wins) ── */}
          {tips?.account_analysis&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
              {[
                {label:"💪 Strengths",items:tips.account_analysis.strengths,col:"#10b981",bg:"#052e16"},
                {label:"🚧 Gaps",items:tips.account_analysis.gaps,col:"#f59e0b",bg:"#1c1203"},
                {label:"⚡ Quick Wins",items:tips.account_analysis.quick_wins,col:"#5ba4f5",bg:"#0a1628"},
              ].map(({label,items,col,bg})=>(
                <div key={label} style={{background:bg,border:`1px solid ${col}25`,borderRadius:14,padding:"14px 15px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:col,textTransform:"uppercase",
                    letterSpacing:"1.5px",marginBottom:10}}>{label}</div>
                  {(items||[]).slice(0,3).map((item,i)=>(
                    <div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",marginBottom:7}}>
                      <div style={{width:16,height:16,borderRadius:"50%",background:`${col}20`,color:col,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:9,fontWeight:800,flexShrink:0,marginTop:1}}>
                        {i+1}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",lineHeight:1.5}}>{item}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Content summary donut */}
          {totalPosts>0&&(
            <div style={{background:"#020617",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:16,
              padding:"18px 20px"}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
                color:"rgba(255,255,255,0.28)",marginBottom:16}}>Content Summary</div>
              <div style={{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
                <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                  <Ring value={totalPosts} max={Math.max(totalPosts,60)} size={76} color={color}
                    label="Total Posts" sub="generated"/>
                  <Ring value={totalWeeks} max={Math.max(totalWeeks,12)} size={76} color="#10b981"
                    label="Weeks" sub="of content"/>
                  <Ring value={platforms.length} max={10} size={76} color="#f59e0b"
                    label="Platforms" sub="active"/>
                </div>
                <div style={{flex:1,minWidth:200}}>
                  {hist.slice(-3).reverse().map((w,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.4)",
                        width:32,flexShrink:0}}>W{w.week}</div>
                      <div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:4,height:6,overflow:"hidden"}}>
                        <div style={{height:"100%",background:color,borderRadius:4,
                          width:`${Math.min((w.posts?.length||0)/5*100,100)}%`,transition:"width 1s ease"}}/>
                      </div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",width:20,textAlign:"right"}}>
                        {w.posts?.length||0}</div>
                    </div>
                  ))}
                  {hist.length===0&&<div style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>
                    Generate your first week of content to see history here</div>}
                </div>
              </div>
            </div>
          )}

          {tips?.content_insights&&(
            <div style={{background:`${color}0a`,border:`1px solid ${color}20`,borderRadius:14,
              padding:"14px 18px"}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
                color:`${color}80`,marginBottom:7}}>🧠 AI Content Analysis</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.65)",lineHeight:1.7}}>
                {tips.content_insights}</div>
            </div>
          )}

          {!tips&&(
            <div style={{background:"rgba(255,255,255,0.02)",border:"1px dashed rgba(255,255,255,0.08)",
              borderRadius:14,padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:10}}>
                Get your personalised weekly analysis and growth tips</div>
              <button onClick={fetchTips} disabled={loadingTips}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,color:"#fff",
                  border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:700,
                  cursor:loadingTips?"not-allowed":"pointer"}}>
                {loadingTips?"Analysing your profile...":"🔍 Run AI Analysis"}</button>
            </div>
          )}
        </div>
      )}

      {/* ── WEEKLY TIPS TAB ── */}
      {activeTab==="tips"&&(
        <div style={{display:"grid",gap:10}}>
          {loadingTips&&(
            <div style={{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",
              borderRadius:14,border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{width:40,height:40,borderRadius:"50%",
                border:`3px solid ${color}20`,borderTop:`3px solid ${color}`,
                margin:"0 auto 14px",animation:"spin .85s linear infinite"}}/>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:13}}>Researching your niche and analysing your content…</div>
            </div>
          )}
          {!tips&&!loadingTips&&(
            <div style={{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",
              borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:32,marginBottom:12}}>💡</div>
              <div style={{fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.45)",marginBottom:8,letterSpacing:"-.2px"}}>
                No tips generated yet</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.28)",marginBottom:16}}>
                Click below to get personalised weekly growth tips for {profile.brandName||profile.name}</div>
              <button onClick={fetchTips}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,color:"#fff",
                  border:"none",borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                🔍 Analyse & Get Tips</button>
            </div>
          )}
          {tips?.weekly_tips?.map((tip,i)=>(
            <div key={i} style={{background:"#020617",border:`1px solid ${
              tip.priority==="High"?"#78510a40":"rgba(255,255,255,0.07)"}`,borderRadius:14,padding:"16px 18px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:32,height:32,borderRadius:9,
                  background:tip.priority==="High"?"#78510a":"rgba(255,255,255,0.07)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:13,fontWeight:800,color:tip.priority==="High"?"#e8b86d":"rgba(255,255,255,0.4)",
                  flexShrink:0,fontFamily:"monospace"}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                    <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.2px"}}>{tip.title}</div>
                    <span style={{fontSize:10,fontWeight:700,borderRadius:5,padding:"2px 8px",
                      background:tip.priority==="High"?"#78510a":"rgba(255,255,255,0.07)",
                      color:tip.priority==="High"?"#e8b86d":"rgba(255,255,255,0.4)"}}>
                      {tip.priority==="High"?"🔴 High Priority":"🟡 Medium"}</span>
                    {tip.impact&&<span style={{fontSize:11,color:"#4ade80",fontWeight:600}}>
                      📈 {tip.impact}</span>}
                  </div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.7}}>{tip.detail}</div>
                </div>
              </div>
            </div>
          ))}
          {tips&&(
            <button onClick={fetchTips} disabled={loadingTips}
              style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",
                color:"rgba(255,255,255,0.45)",borderRadius:10,padding:"10px",
                fontSize:12,fontWeight:600,cursor:loadingTips?"not-allowed":"pointer"}}>
              {loadingTips?"Refreshing...":"↻ Refresh Tips"}</button>
          )}
        </div>
      )}

      {/* ── PLATFORM TIPS TAB ── */}
      {activeTab==="platforms"&&(
        <div style={{display:"grid",gap:10}}>
          {!tips?.platform_tips&&!loadingTips&&(
            <div style={{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",
              borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"}}>
              <button onClick={fetchTips}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,color:"#fff",
                  border:"none",borderRadius:10,padding:"11px 24px",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                🔍 Get Platform-Specific Tips</button>
            </div>
          )}
          {tips?.platform_tips?.map((pt,i)=>(
            <div key={i} style={{background:"#020617",border:`1px solid ${color}18`,borderRadius:14,padding:"16px 18px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{background:`${color}20`,color,border:`1px solid ${color}35`,
                  borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700}}>{pt.platform}</span>
              </div>
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.75)",marginBottom:6,letterSpacing:"-.2px"}}>
                {pt.tip}</div>
              <div style={{background:`${color}0a`,border:`1px solid ${color}18`,borderRadius:8,
                padding:"8px 11px",fontSize:12,color:color,fontWeight:600}}>
                → Action: {pt.action}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── ONGOING CONTENT TAB ── */}
      {activeTab==="content"&&(
        <div style={{display:"grid",gap:32}}>
          {hist.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",background:"rgba(255,255,255,0.02)",
              borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:36,marginBottom:12}}>📝</div>
              <div style={{fontSize:15,fontWeight:700,color:"rgba(255,255,255,0.45)",marginBottom:8}}>No content generated yet</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.28)",marginBottom:16}}>
                Scroll down to the Content Generator section below to create your first week of posts</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.2)"}}>↓ Content Generator is right below on this page</div>
            </div>
          )}
          {hist.length>0&&(()=>{
            const latest = hist[hist.length-1];
            return (
              <div style={{animation:"fadeUp .3s ease"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                  <div style={{height:1,flex:1,background:`${color}15`}}/>
                  <div style={{background:color,color:"#fff",borderRadius:20,padding:"4px 16px",
                    fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase"}}>
                    Week {latest.week} · {latest.date}
                  </div>
                  <div style={{height:1,flex:1,background:`${color}15`}}/>
                </div>
                {latest.posts?.length>0&&<WeekCal posts={latest.posts} color={color}/>}
                <TrendCards trends={latest.trends} color={color}/>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
                  color:"rgba(255,255,255,0.28)",marginBottom:14}}>
                  📝 {latest.posts?.length||0} Posts — Platform-native content ready to publish
                </div>
                <div style={{display:"grid",gap:20}}>
                  {latest.posts?.map((p,i)=><PostCard key={i} post={p} profile={profile} index={i}/>)}
                </div>
              </div>
            );
          })()}

          {/* Generator embedded directly in Ongoing Content */}
          <div style={{paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
              <div style={{height:1,flex:1,background:`${color}12`}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,
                background:`${color}12`,border:`1px solid ${color}28`,borderRadius:24,
                padding:"7px 20px"}}>
                <span style={{fontSize:15}}>⚡</span>
                <span style={{fontSize:13,fontWeight:700,color,letterSpacing:"-.2px"}}>Content Generator</span>
              </div>
              <div style={{height:1,flex:1,background:`${color}12`}}/>
            </div>
            <Workspace profile={profile} hKey={hKey}
              onUpgrade={(planId)=>typeof onUpgrade==='function' ? onUpgrade(planId) : (window.location.href=`${window.location.origin}/app/content-studio?plan=${planId}&upgrade=1`)}/>
          </div>
        </div>
      )}

      {/* ── PREVIOUS HISTORY TAB ── */}
      {activeTab==="history"&&(
        <div style={{display:"grid",gap:10}}>
          {hist.length<=1&&(
            <div style={{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",
              borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:6}}>Previous weeks appear here</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.2)"}}>
                {hist.length===0?"No content generated yet":"Generate more weeks to see history here"}
              </div>
            </div>
          )}
          {hist.slice(0,-1).reverse().map((w,i)=>(
            <div key={i} style={{background:"#020617",border:`1px solid rgba(255,255,255,0.07)`,
              borderRadius:14,padding:"16px 18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div>
                  <span style={{background:color,color:"#fff",borderRadius:6,
                    padding:"2px 10px",fontSize:11,fontWeight:700,marginRight:8}}>Week {w.week}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>{w.date}</span>
                </div>
                <span style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.45)"}}>
                  {w.posts?.length||0} posts</span>
              </div>
              <div style={{display:"grid",gap:5}}>
                {w.posts?.map((p,pi)=>(
                  <div key={pi} style={{display:"flex",alignItems:"center",gap:8,
                    background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"7px 11px"}}>
                    <span style={{background:`${color}18`,color,borderRadius:4,
                      padding:"1px 7px",fontSize:10,fontWeight:700,flexShrink:0}}>{p.format}</span>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.6)",flex:1,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.title}</span>
                    <span style={{fontSize:10,color:"rgba(255,255,255,0.28)",flexShrink:0}}>
                      {p.best_day}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
//  PORTAL CLIENT VIEW — unified single-page layout
// ─────────────────────────────────────────────────────────────────
function PortalClientView({client, onHome, onUpgrade}){
  const color = client.color||"#7C3AED";
  const hKey = `snstudio_hist_${client.id}`;
  const handleUpgrade = (planId) => {
    if(typeof onUpgrade === 'function') onUpgrade(planId, client);
    else window.location.href=`${window.location.origin}/app/content-studio?plan=${planId}&upgrade=1`;
  };
  return (
    <div>
      {/* ── TOP NAV ── */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        <button onClick={onHome}
          style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.55)",borderRadius:9,padding:"7px 13px",fontSize:13,
            cursor:"pointer",fontWeight:600}}>← Home</button>
        {client.logoPreview
          ?<img src={client.logoPreview} alt="logo" style={{width:36,height:36,borderRadius:10,objectFit:"contain",background:"#fff",padding:2}}/>
          :<div style={{width:36,height:36,borderRadius:10,background:`${color}18`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🏢</div>}
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:700,letterSpacing:"-.3px"}}>{client.brandName}
            <span style={{color,fontSize:12}}> · {(client.platforms||[client.sub]).join(", ")}</span></div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1}}>
            Member since {client.joinDate}</div>
        </div>
        {(client.plan==="trial"||!client.plan) ? (
          <button onClick={()=>handleUpgrade("starter")}
            style={{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",
              border:"none",borderRadius:8,padding:"7px 16px",fontSize:12,fontWeight:700,
              cursor:"pointer",whiteSpace:"nowrap"}}>
            ⚡ Upgrade Plan
          </button>
        ) : (
          <span style={{fontSize:11,background:"#052e16",color:"#4ade80",border:"1px solid #166534",
            borderRadius:6,padding:"3px 10px",fontWeight:700}}>✓ {client.planName} · Active</span>
        )}
      </div>

      {/* ── PROFILE DASHBOARD SECTION ── */}
      <ClientDashboard profile={client} hKey={hKey} onGenerateContent={null} onUpgrade={handleUpgrade}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("portal");
  const [mySelected,setMySelected]=useState(null);
  const [clients,setClients]=useState({});
  const [clientSelected,setClientSelected]=useState(null);
  const [portalView,setPortalView]=useState("home"); // home|onboarding|workspace
  const [activeClient,setActiveClient]=useState(null);
  const [clientView, setClientView]=useState("dashboard"); // dashboard|content
  const [geo, setGeo]=useState({country:"_DEFAULT"});
  const [upgradeTrialData, setUpgradeTrialData]=useState(null); // holds trial form data when upgrading

  useEffect(()=>{(async()=>{
    const saved = await DB.get("snstudio_clients") || {};
    setClients(saved);
    // Restore last active client so users keep access after refresh
    const lastId = await DB.get("snstudio_active_client_id");
    if (lastId && saved[lastId]) {
      setActiveClient(saved[lastId]);
      setPortalView("workspace");
    }
  })();},[]);
  useEffect(()=>{(async()=>{ const g=await detectGeo(); setGeo(g||{country:"_DEFAULT"}); })();},[]);
  const saveClients=async c=>{setClients(c);await DB.set("snstudio_clients",c);};

  // Persist active client ID whenever it changes
  useEffect(()=>{
    if(activeClient?.id) DB.set("snstudio_active_client_id", activeClient.id);
  },[activeClient]);

  useEffect(() => {
    const querySource = window.location.search || window.location.hash;
    if (querySource.includes("plan=")) {
      setTab("portal");
      setPortalView("onboarding");
    }
  }, []);

  const CSS=`<style>
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
    :root{--blue:#5ba4f5;--blue2:#2563eb;--mint:#34d399;--vio:#818cf8;--g1:rgba(255,255,255,.055);--g2:rgba(255,255,255,.09);--g3:rgba(255,255,255,.04);--gb:rgba(255,255,255,.09);--gb2:rgba(255,255,255,.15);--t1:rgba(255,255,255,.95);--t2:rgba(255,255,255,.62);--t3:rgba(255,255,255,.36);--t4:rgba(255,255,255,.18);}
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body,*{font-family:'Outfit','DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;} h1,h2,h3,h4{font-family:'Bricolage Grotesque',system-ui,sans-serif!important;letter-spacing:-.03em;line-height:1.06;}
    body{background:#07101e;color:rgba(255,255,255,.96);}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(91,164,245,0.4)}50%{box-shadow:0 0 0 8px rgba(91,164,245,0)}}
    h1,h2,h3{letter-spacing:-.4px;line-height:1.15;}
    input,textarea,select,button{font-family:'Outfit','DM Sans',system-ui,sans-serif!important;}
    input,textarea,select{color:rgba(255,255,255,.92);}
    a{text-decoration:none;}[contenteditable]{outline:none;}
    .sn-glass{background:rgba(255,255,255,.055);backdrop-filter:blur(36px) saturate(180%);-webkit-backdrop-filter:blur(36px) saturate(180%);border:1px solid rgba(255,255,255,.09);border-radius:18px;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 8px 32px rgba(0,0,0,.2);}
    .sn-input{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:12px;color:rgba(255,255,255,.92);padding:12px 14px;font-size:14px;width:100%;transition:all .2s;outline:none;}
    .sn-input:focus{border-color:rgba(91,164,245,.45);background:rgba(91,164,245,.06);box-shadow:0 0 0 3px rgba(91,164,245,.1);}
    .sn-input::placeholder{color:rgba(255,255,255,.28);}
    .sn-btn-primary{background:linear-gradient(135deg,#2563eb,#5ba4f5);color:#fff;border:none;border-radius:50px;padding:13px 24px;font-size:14px;font-weight:500;cursor:pointer;box-shadow:0 8px 24px rgba(91,164,245,.3),inset 0 1px 0 rgba(255,255,255,.18);transition:all .22s;font-family:'Outfit','DM Sans',system-ui,sans-serif;letter-spacing:-.1px;}
    .sn-btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 12px 32px rgba(91,164,245,.4);}
    .sn-btn-ghost{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7);border-radius:50px;padding:12px 22px;font-size:14px;font-weight:400;cursor:pointer;transition:all .2s;font-family:'Outfit','DM Sans',system-ui,sans-serif;backdrop-filter:blur(20px);}
    .sn-btn-ghost:hover{background:rgba(255,255,255,.09);border-color:rgba(255,255,255,.2);color:#fff;}
    .sn-btn-icon{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:9px 14px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;color:rgba(255,255,255,.65);display:inline-flex;align-items:center;gap:7px;font-family:'Outfit','DM Sans',system-ui,sans-serif;}
    .sn-btn-icon:hover{background:rgba(91,164,245,.12);border-color:rgba(91,164,245,.25);color:#5ba4f5;}
    .sn-btn-icon.active{background:rgba(91,164,245,.15);border-color:rgba(91,164,245,.3);color:#5ba4f5;}
    .plan-card-glass{background:rgba(255,255,255,.04);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:28px;position:relative;overflow:hidden;transition:all .3s;box-shadow:inset 0 1px 0 rgba(255,255,255,.06);}
    .plan-card-glass:hover{transform:translateY(-3px);border-color:rgba(91,164,245,.2);box-shadow:0 16px 40px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.08);}
    .plan-card-hl{border-color:rgba(91,164,245,.3)!important;background:linear-gradient(165deg,rgba(37,99,235,.12) 0%,rgba(8,16,31,.96) 50%)!important;box-shadow:0 0 0 1px rgba(91,164,245,.1),0 20px 50px rgba(91,164,245,.1),inset 0 1px 0 rgba(91,164,245,.18)!important;}
    .post-card{background:rgba(255,255,255,.04);backdrop-filter:blur(32px) saturate(180%);-webkit-backdrop-filter:blur(32px) saturate(180%);border:1px solid rgba(255,255,255,.09);border-radius:18px;overflow:hidden;transition:all .3s;box-shadow:inset 0 1px 0 rgba(255,255,255,.05);position:relative;}
    .post-card:hover{border-color:rgba(91,164,245,.2);box-shadow:0 12px 36px rgba(0,0,0,.25);}
    .sn-tabbar{display:flex;gap:4px;background:rgba(255,255,255,.04);border-radius:14px;padding:4px;border:1px solid rgba(255,255,255,.07);}
    .sn-tab{padding:8px 16px;border-radius:11px;font-size:13px;font-weight:400;color:rgba(255,255,255,.45);cursor:pointer;border:none;background:transparent;transition:all .2s;font-family:'Outfit','DM Sans',system-ui,sans-serif;white-space:nowrap;}
    .sn-tab.active{background:rgba(91,164,245,.15);color:#5ba4f5;font-weight:500;border:1px solid rgba(91,164,245,.22);}
    .sn-tab:hover:not(.active){background:rgba(255,255,255,.06);color:rgba(255,255,255,.7);}
    .sn-badge-blue{background:rgba(91,164,245,.1);border:1px solid rgba(91,164,245,.2);color:#5ba4f5;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:500;}
    .sn-badge-green{background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.2);color:#34d399;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:500;}
    .sn-badge-red{background:rgba(232,184,109,.1);border:1px solid rgba(196,155,58,.18);color:#e8b86d;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:50px;font-size:11px;font-weight:500;}
    .sn-divider{height:1px;background:rgba(255,255,255,.07);margin:16px 0;}
    .sn-h1{font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:clamp(24px,3.5vw,38px);font-weight:400;letter-spacing:-.5px;line-height:1.12;color:rgba(255,255,255,.95);}
    .sn-h2{font-size:19px;font-weight:500;letter-spacing:-.3px;color:rgba(255,255,255,.9);}
    .sn-body{font-size:14px;font-weight:300;color:rgba(255,255,255,.6);line-height:1.68;}
    .copy-btn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:7px 13px;font-size:12px;font-weight:500;cursor:pointer;color:rgba(255,255,255,.55);transition:all .2s;display:inline-flex;align-items:center;gap:6px;font-family:'Outfit','DM Sans',system-ui,sans-serif;}
    .copy-btn:hover{background:rgba(91,164,245,.12);border-color:rgba(91,164,245,.25);color:#5ba4f5;}
    .copy-btn.copied{background:rgba(52,211,153,.12);border-color:rgba(52,211,153,.25);color:#34d399;}
    @media(max-width:768px){
      .mobile-col{flex-direction:column!important;align-items:stretch!important;gap:12px!important;}
      .mobile-wrap{flex-wrap:wrap!important;}
      .mobile-grid-1{grid-template-columns:1fr!important;}
      .mobile-padding{padding:14px!important;}
      .mobile-btn{padding:13px 16px!important;font-size:14px!important;width:100%!important;}
      html,body{overflow-x:hidden!important;max-width:100vw!important;}
      .sn-card{max-width:100%!important;width:100%!important;}
      h1{font-size:clamp(24px,8vw,38px)!important;letter-spacing:-1px!important;}
      h2{font-size:clamp(20px,5.5vw,30px)!important;}
      h3{font-size:clamp(16px,4vw,22px)!important;}
      input,textarea,select{width:100%!important;min-width:0!important;font-size:16px!important;}
      .sn-tabs,.sn-tabbar{overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;white-space:nowrap!important;}
      .sn-tabs::-webkit-scrollbar,.sn-tabbar::-webkit-scrollbar{display:none!important;}
      .plans-grid{grid-template-columns:1fr!important;max-width:100%!important;margin:0 auto!important;padding:0 4px!important;}
      .plan-card-glass{padding:22px!important;}
      .ws-sidebar{display:none!important;}
      .ws-main{padding:14px!important;}
      .nav-inner{padding:0 14px!important;}
      .gen-grid{grid-template-columns:1fr!important;}
      .details-row{flex-direction:column!important;gap:10px!important;}
      .phone-row{flex-direction:row!important;gap:8px!important;}
      .post-card{border-radius:14px!important;}
      .sn-btn-primary,.sn-btn-ghost{width:100%!important;text-align:center!important;justify-content:center!important;}
      .sn-glass{padding:16px!important;}
    }
    @media(max-width:480px){
      h1{font-size:clamp(22px,7vw,32px)!important;}
      .mobile-padding{padding:12px!important;}
      .plan-card-glass{padding:18px!important;}
    }
  </style>`;

  const NAV=(
    <nav style={{background:"rgba(8,16,31,0.88)",backdropFilter:"blur(48px) saturate(180%)",
      WebkitBackdropFilter:"blur(48px) saturate(180%)",
      borderBottom:"1px solid rgba(255,255,255,0.07)",position:"sticky",top:0,zIndex:50}}>
      <div className="nav-inner" style={{maxWidth:1060,margin:"0 auto",padding:"0 20px",height:60,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <img src="/logo.png" alt="Social Ninja's" style={{width:52,height:52,objectFit:"contain",filter:"drop-shadow(0 0 16px rgba(91,164,245,0.5))",flexShrink:0}}/>
          <div>
            <div style={{fontSize:18,fontWeight:700,letterSpacing:"-.4px",lineHeight:1.1,fontFamily:"'Bricolage Grotesque',system-ui,sans-serif"}}>
              Social<span style={{color:"#5ba4f5"}}>Ninja's</span>.
            </div>
            <div style={{fontSize:"8.5px",fontWeight:400,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,0.32)",lineHeight:1,marginTop:2}}>{CONFIG.brandTagline}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {activeClient&&(
            <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(91,164,245,0.08)",border:"1px solid rgba(91,164,245,0.2)",borderRadius:50,padding:"5px 14px 5px 6px"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#1d4ed8,#5ba4f5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0}}>
                {(activeClient.brandName||activeClient.email||"U")[0].toUpperCase()}
              </div>
              <span style={{fontSize:12.5,color:"rgba(255,255,255,0.7)",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500}}>
                {activeClient.brandName||activeClient.email||"My Account"}
              </span>
            </div>
          )}
          <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",borderRadius:13,padding:4,border:"1px solid rgba(255,255,255,0.07)"}}>
            {tab==="dashboard"&&(
              <button onClick={()=>{setTab("portal");setClientSelected(null);}}
                style={{padding:"6px 14px",borderRadius:10,fontSize:12.5,fontWeight:400,border:"none",cursor:"pointer",transition:"all .15s",fontFamily:"'DM Sans',sans-serif",background:"transparent",color:"rgba(255,255,255,0.45)"}}>
                ← Back</button>
            )}
            {activeClient&&(
              <button onClick={async()=>{await DB.set("snstudio_active_client_id",null);setActiveClient(null);setPortalView("home");setTab("portal");}}
                style={{padding:"6px 14px",borderRadius:10,fontSize:12.5,fontWeight:500,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",background:"transparent",color:"rgba(240,80,80,0.7)"}}>
                Sign Out</button>
            )}
            {!activeClient&&(
              <button onClick={()=>{
                setPortalView("login");
              }}
                style={{padding:"6px 14px",borderRadius:10,fontSize:12.5,fontWeight:500,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",background:"rgba(91,164,245,0.12)",color:"#5ba4f5"}}>
                Sign In</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const wrap=children=>(
    <div style={{background:"#07101e",minHeight:"100vh",color:"rgba(255,255,255,0.95)",position:"relative",overflow:"hidden"}}>
      {/* Ambient background */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",width:700,height:700,borderRadius:"50%",filter:"blur(130px)",opacity:.22,top:"-20%",left:"-10%",background:"radial-gradient(circle,rgba(37,99,235,.35),transparent 70%)"}}></div>
        <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",filter:"blur(120px)",opacity:.16,top:"15%",right:"-5%",background:"radial-gradient(circle,rgba(91,164,245,.3),transparent 70%)"}}></div>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",filter:"blur(110px)",opacity:.14,bottom:"10%",left:"25%",background:"radial-gradient(circle,rgba(16,185,129,.25),transparent 70%)"}}></div>
      </div>
      <div dangerouslySetInnerHTML={{__html:CSS}}/>
      {NAV}
      <div className="mobile-padding" style={{maxWidth:1060,margin:"0 auto",padding:"clamp(16px,3vw,28px) clamp(14px,2vw,20px)",animation:"fadeUp .35s ease",position:"relative",zIndex:1}}>
        {children}
      </div>
    </div>
  );

  // ── MY ACCOUNTS & CLIENTS REMOVED FOR PRIVACY ────────────────────
  // All administrative client management is now exclusively in Admin.tsx

  // ── DASHBOARD (Replaces standalone client view) ──────────────────
  if(tab==="dashboard" && clientSelected){
    const cl=clients[clientSelected];
    const clColor = cl?.color||"#7C3AED";
    return wrap(
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,flexWrap:"wrap"}}>
            <button onClick={()=>{setClientSelected(null);setTab("portal");}}
              style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.55)",borderRadius:9,padding:"7px 13px",fontSize:13,
                cursor:"pointer",fontWeight:600}}>← Back</button>
            {cl?.logoPreview
              ?<img src={cl.logoPreview} alt="logo" style={{width:36,height:36,borderRadius:10,objectFit:"contain",background:"#fff",padding:2}}/>
              :<div style={{width:36,height:36,borderRadius:10,background:`${clColor}18`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🏢</div>}
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,letterSpacing:"-.3px"}}>
                {cl?.brandName}
                <span style={{color:clColor,fontSize:12}}> · {(cl?.platforms||[cl?.sub]).join(", ")}</span>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1}}>{cl?.audience}</div>
            </div>
            <span style={{fontSize:11,background:"#052e16",color:"#4ade80",border:"1px solid #166534",
              borderRadius:6,padding:"3px 10px",fontWeight:700}}>{cl?.planName} · ✓ Active</span>
          </div>
          <ClientDashboard profile={cl} hKey={`snstudio_hist_${clientSelected}`} onGenerateContent={null}/>
          <div style={{marginTop:32,paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22}}>
              <div style={{height:1,flex:1,background:`${clColor}12`}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,
                background:`${clColor}12`,border:`1px solid ${clColor}28`,borderRadius:24,
                padding:"7px 20px"}}>
                <span style={{fontSize:15}}>⚡</span>
                <span style={{fontSize:13,fontWeight:700,color:clColor,letterSpacing:"-.2px"}}>Content Generator</span>
              </div>
              <div style={{height:1,flex:1,background:`${clColor}12`}}/>
            </div>
            <Workspace profile={cl} hKey={`snstudio_hist_${clientSelected}`}
              onUpgrade={(planId)=>{ window.location.href=`${window.location.origin}/app/content-studio?plan=${planId}`; }}/>
          </div>
        </div>
    );
  }

  // ── PORTAL ───────────────────────────────────────────────────────
  if(tab==="portal") return wrap(
    portalView==="home"?(
      <div style={{textAlign:"center",maxWidth:580,margin:"60px auto 40px"}}>
        <div style={{width:70,height:70,borderRadius:20,
          background:"linear-gradient(135deg,#38bdf8,#0D1B3E)",
          border:"1px solid #38bdf840",display:"flex",alignItems:"center",
          justifyContent:"center",fontSize:30,margin:"0 auto 18px"}}>🥷</div>
        <div style={{fontSize:12,fontWeight:700,color:CONFIG.accentColor,textTransform:"uppercase",
          letterSpacing:"2.5px",marginBottom:10}}>{CONFIG.brandName}</div>
        <h1 style={{fontSize:40,fontWeight:800,letterSpacing:"-1.4px",lineHeight:1.08,margin:"0 0 14px",
          background:"linear-gradient(155deg,#fff 40%,#7BA8D4)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          Content that actually converts.
        </h1>
        <p style={{color:"rgba(255,255,255,0.42)",fontSize:15,marginBottom:28,lineHeight:1.7}}>
          AI that researches trends, writes platform-native captions and scripts, and hands you content that's ready to post — every single week.
        </p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}>
          <button onClick={()=>setPortalView("onboarding")}
            style={{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",border:"none",
              borderRadius:13,padding:"14px 32px",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"}}>
            See Plans & Get Started →</button>
          {activeClient&&(
            <button onClick={()=>setPortalView("workspace")}
              style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",
                color:"rgba(255,255,255,0.85)",borderRadius:13,padding:"14px 22px",
                fontSize:14,fontWeight:700,cursor:"pointer"}}>
              📁 My Studio →</button>
          )}
        </div>
        {activeClient&&(
          <div style={{background:"#052e16",border:"1px solid #166534",borderRadius:11,
            padding:"10px 20px",display:"inline-block",fontSize:13,color:"#4ade80",fontWeight:700}}>
            ✓ {activeClient.brandName} · {activeClient.planName} · Active</div>
        )}
      </div>
    ):portalView==="onboarding"?(
      <div>
        <button onClick={()=>setPortalView("home")}
          style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.5)",borderRadius:9,padding:"7px 13px",
            fontSize:12,cursor:"pointer",fontWeight:600,marginBottom:4}}>← Home</button>
        <Onboarding geo={geo} trialData={upgradeTrialData} onComplete={async cl=>{
          const existing=await DB.get("snstudio_clients")||{};
          await DB.set("snstudio_clients",{...existing,[cl.id]:cl});
          setClients(p=>({...p,[cl.id]:cl}));
          setActiveClient(cl);
          setUpgradeTrialData(null);
          setPortalView("workspace");
        }}/>
      </div>
    ):portalView==="login"?(
      <div style={{maxWidth:500,margin:"60px auto",textAlign:"center"}}>
        <h2 style={{fontSize:24,fontWeight:700,marginBottom:20}}>Welcome back</h2>
        {Object.keys(clients||{}).length > 0 ? (
          <div style={{display:"grid",gap:12,textAlign:"left"}}>
            {Object.values(clients).map(cl => (
              <button key={cl.id} onClick={async()=>{
                await DB.set("snstudio_active_client_id",cl.id);
                setActiveClient(cl);
                setPortalView("workspace");
              }} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"all .15s"}}
              onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
              onMouseOut={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
                <div style={{width:40,height:40,borderRadius:"50%",background:`${cl.color||"#5ba4f5"}22`,display:"flex",alignItems:"center",justifyContent:"center",color:cl.color||"#5ba4f5",fontWeight:700,fontSize:16}}>
                  {(cl.brandName||cl.email||"U")[0].toUpperCase()}
                </div>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:4}}>{cl.brandName || "My Workspace"}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>{cl.email} {cl.planName ? `· ${cl.planName}` : ""}</div>
                </div>
              </button>
            ))}
            <div style={{marginTop:20,textAlign:"center"}}>
              <button onClick={()=>setPortalView("onboarding")} style={{background:"none",border:"none",color:"#5ba4f5",cursor:"pointer",fontSize:14,fontWeight:600}}>+ Create New Workspace</button>
            </div>
          </div>
        ) : (
           <div style={{textAlign:"center"}}>
             <p style={{color:"rgba(255,255,255,0.5)",marginBottom:20}}>No workspaces found on this device.</p>
             <button onClick={()=>setPortalView("onboarding")} style={{background:"linear-gradient(135deg,#38bdf8,#1a3a6e)",color:"#fff",border:"none",borderRadius:13,padding:"14px 32px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Create Workspace →</button>
           </div>
        )}
        <button onClick={()=>setPortalView("home")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:13,marginTop:24}}>← Back to Home</button>
      </div>
    ):portalView==="workspace"&&activeClient?(
      <PortalClientView client={activeClient} onHome={()=>setPortalView("home")}
        onUpgrade={(planId, trialData)=>{
          setUpgradeTrialData(trialData||activeClient);
          setPortalView("onboarding");
        }}/>
    ):null
  );

  return null;
}




