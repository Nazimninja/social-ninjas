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
  accentColor:  "#38bdf8",

  // ✅ YOUR SINGLE RAZORPAY LINK — all plans pay here
  // For subscriptions: create 3 subscription plans in Razorpay dashboard
  // For one-time: use razorpay.me/@socialninjas directly
  razorpay: {
    starter:   "https://rzp.io/rzp/7S3xXh0K",   // ₹2,999/mo
    growth:    "https://rzp.io/rzp/5uCEIMB6",   // ₹5,499/mo
    pro:       "https://rzp.io/rzp/V9wLjfrR",   // ₹8,999/mo
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
  sheetsWebhook: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
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
    color: "#38bdf8",
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
      { icon: "💬", text: "Dedicated WhatsApp support line" },
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
    formats: ["YouTube Short","Long Video","Community Post"],
    captionStyle: "YouTube title: 60 chars max, keyword-first. Description: SEO-optimised, 200+ words, timestamps.",
    hashtagCount: 5,
    hashtagStyle: "5 tags: channel name + 4 searchable topics. No spam.",
    scriptStyle: "YouTube Short: 45–60 sec. Hook (0–5s) must answer: why should I watch? Payoff must come fast. Long video: AIDA structure.",
    bestTimes: ["2pm","5pm","8pm"],
    contentTypes: ["Shorts for discovery","Long-form for authority","Community posts for retention"],
    viralMechanics: "Search-intent titles, retention hooks, end screen CTAs",
  },
  "LinkedIn": {
    formats: ["LinkedIn Video", "LinkedIn Carousel Doc", "LinkedIn Post", "LinkedIn Article", "Poll"],
    captionStyle: "Line 1: bold opinion or surprising stat — no fluff. Data-backed insight. 150–300 words. Short paragraphs (1–2 lines). NO generic hashtag spam. End with a strong opinion-driven CTA.",
    hashtagCount: 5,
    hashtagStyle: "5 precise professional hashtags. Industry-specific, not generic. e.g. #GrowthMarketing not #Marketing",
    scriptStyle: "LinkedIn Video: 60–90 sec. Speak directly to camera, smart casual. Open with a bold claim (0–5s). No music. Subtitles CRITICAL. Structure: Hook claim → proof/story → actionable takeaway → invite comment.",
    bestTimes: ["8am","12pm","5pm Tue–Thu"],
    contentTypes: ["Video posts get 5× more reach than text","Document carousels drive highest saves","Personal opinion posts 3× engagement","Polls drive massive comment volume"],
    viralMechanics: "Contrarian takes, personal story + data, comment-bait opinion questions, document carousel saves",
    requiresScript: true,
    requiresCarousel: true,
    requiresThread: false,
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
    color:"#38bdf8", darkBg:"#050B1A", brand:"sn",
    platforms:["Instagram"],
    audience:"Global founders, D2C CMOs, startup heads — US/UK/UAE/SG/AU",
    tone:"Confident, data-led, direct. Results-obsessed agency voice. No fluff.",
    avoid:"No ₹, no Bangalore, no local. $ and global framing only.",
    niche:"performance marketing, D2C growth, Meta ads, Instagram growth, agency building",
    businessContext:"Social Ninja's is a premium AI-powered social media agency helping D2C brands and founders grow globally",
  },
  sn_li:  {
    id:"sn_li", name:"Social Ninja's", sub:"LinkedIn", emoji:"🥷",
    color:"#38bdf8", darkBg:"#050B1A", brand:"sn",
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
  nazim:  {
    id:"nazim", name:"@nazim_ninja", sub:"Instagram", emoji:"👤",
    color:"#10b981", darkBg:"#010d08", brand:"sn",
    platforms:["Instagram"],
    audience:"Global founders, gym-goers, marketers, ambitious 22–35 who want to build",
    tone:"Authentic hustle. Gym + marketing + luxury cars. Raw always beats polished.",
    avoid:"No corporate tone. Be real. Show process not just results.",
    niche:"gym fitness founder life, marketing tips, luxury cars, agency building, personal brand",
    businessContext:"@nazim_ninja is Nazim's personal brand — blending gym, marketing strategy, luxury cars, and agency life.",
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
    await fetch("/api/clients", {
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

## CONTENT RULES
- Every caption must open with a PATTERN INTERRUPT — something that stops the scroll in 0.3 seconds
- Captions must be platform-native (not copy-pasted between platforms)
- Scripts must be word-for-word, ready to shoot/record, with [on-screen text] directions
- Carousel slides must be complete — every slide's heading and body copy written
- Hooks must create an open loop the brain must close
- CTAs must be specific and frictionless
- Content must feel like it was written by a human who deeply understands this audience — not an AI

## RESPONSE FORMAT
CRITICAL: Return ONLY raw JSON. Start immediately with { — no markdown fences, no preamble, no explanation.

{
  "trends": [
    {"name":"string","platform":"string","why":"string (max 20 words)","heat":"Hot|Rising|Emerging","source":"what you found in search"}
  ],
  "posts": [
    {
      "id":"p1",
      "title":"string (descriptive, max 8 words)",
      "platform":"${mainPlat}",
      "format":"${dna.formats[0]}",
      "priority":"Must Post|High Value|Good to Post",
      "best_day":"Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday",
      "best_time":"${dna.bestTimes[0]}",
      "trend_used":"string — which trend this post rides",
      "why_now":"string — why posting this THIS week matters (max 20 words)",

      "hook":"string — the opening line/text that stops the scroll (max 15 words)",
      "caption":"string — full platform-native caption, properly formatted with line breaks using \\n",
      "hashtags":["t1","t2","t3"${dna.hashtagCount>3?',"t4","t5","t6","t7","t8","t9","t10"':""}],
      "cta":"string — the call to action at end of caption",

      "script": ${dna.requiresScript || mainPlat==="YouTube" || mainPlat==="Instagram" || mainPlat==="TikTok" || mainPlat==="Snapchat" || mainPlat==="Facebook" || mainPlat==="LinkedIn"
        ? `"string — complete word-for-word script with [DIRECTIONS IN BRACKETS] for camera, text overlays, b-roll, music cues, on-screen text. Min 150 words. Max 220 words. Every line must be speakable exactly as written."`
        : "null"},

      "carousel_slides": ${dna.requiresCarousel || mainPlat==="Instagram" || mainPlat==="LinkedIn" || mainPlat==="Facebook"
        ? `[
          {"slide_num":1,"heading":"string — slide title (max 8 words)","body":"string — slide copy (2–4 lines)","design_note":"string — visual direction, background, font style, image suggestion"},
          // ...include ALL slides, min 5 slides for carousels, 4 for LinkedIn docs
        ] IMPORTANT: Always generate carousel_slides for LinkedIn (it is a document/PDF carousel). null only if the post format is a plain text post or video.`
        : "null"},

      "thread_tweets": ${mainPlat==="Twitter/X"
        ? `[{"num":1,"tweet":"string (max 280 chars)"}] — min 6 tweets in thread, max 12. Make each tweet standalone-valuable.`
        : "null"},

      "posting_checklist":["step 1","step 2","step 3","step 4","step 5"],
      "engagement_tip":"string — one specific thing to do in first 30 mins after posting to boost reach"
    }
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
      style={{background:ok?"#052e16":"rgba(255,255,255,0.07)",
        color:ok?"#4ade80":"rgba(255,255,255,0.6)",
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
        color:error?"#fca5a5":"rgba(255,255,255,0.4)",
        textTransform:"uppercase",letterSpacing:"1px",display:"block",marginBottom:6}}>
        {label}{required&&<span style={{color:"#E31313",marginLeft:3}}>*</span>}
      </label>
      {children||( rows
        ?<textarea value={value} onChange={e=>onChange(name,e.target.value)}
          placeholder={placeholder} rows={rows}
          style={{width:"100%",background:error?"#1a060e":"rgba(255,255,255,0.05)",
            border:`1px solid ${error?"#991b1b":"rgba(255,255,255,0.1)"}`,borderRadius:10,
            padding:"10px 13px",color:"#fff",fontSize:13,resize:"vertical",outline:"none",
            boxSizing:"border-box",lineHeight:1.65,fontFamily:"inherit"}}/>
        :<input value={value} onChange={e=>onChange(name,e.target.value)}
          placeholder={placeholder} type={type}
          style={{width:"100%",background:error?"#1a060e":"rgba(255,255,255,0.05)",
            border:`1px solid ${error?"#991b1b":"rgba(255,255,255,0.1)"}`,borderRadius:10,
            padding:"10px 13px",color:"#fff",fontSize:13,outline:"none",
            boxSizing:"border-box",fontFamily:"inherit"}}/>
      )}
      {error&&<div style={{fontSize:11,color:"#fca5a5",marginTop:4}}>⚠ {error}</div>}
      {hint&&!error&&<div style={{fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:4}}>{hint}</div>}
    </div>
  );
}

const MONO={fontFamily:"'JetBrains Mono',monospace",fontSize:12.5,color:"#c8d8f0",
  whiteSpace:"pre-wrap",lineHeight:1.75,background:"#020209",borderRadius:10,
  padding:"14px 16px",border:"1px solid rgba(255,255,255,0.07)",maxHeight:320,overflowY:"auto",margin:0};

// ─────────────────────────────────────────────────────────────────
//  POST CARD — all content, no graphics
// ─────────────────────────────────────────────────────────────────
function PostCard({post, profile}){
  const color = profile.color||"#38bdf8";
  const [tab,setTab]=useState("caption");

  const hasTabs=[
    {id:"caption",label:"📝 Caption"},
    ...(post.script?[{id:"script",label:"🎬 Script"}]:[]),
    ...(post.carousel_slides?.length?[{id:"slides",label:"🎠 Slides"}]:[]),
    ...(post.thread_tweets?.length?[{id:"thread",label:"🧵 Thread"}]:[]),
    {id:"checklist",label:"📋 Checklist"},
  ];

  const priorityStyle = {
    "Must Post":    {bg:"#1a0505",border:"#7f1d1d40",col:"#fca5a5",dot:"🔴"},
    "High Value":   {bg:"#1a1305",border:"#92400e40",col:"#fbbf24",dot:"🟡"},
    "Good to Post": {bg:"#031a0f",border:"#14532d40",col:"#4ade80",dot:"🟢"},
  };
  const ps=priorityStyle[post.priority]||priorityStyle["Good to Post"];

  return(
    <div style={{background:"#020617",border:`1px solid ${color}20`,borderRadius:22,overflow:"hidden"}}>
      {/* ── HEADER ── */}
      <div style={{background:`linear-gradient(135deg,${profile.darkBg||"#0d0d20"}CC,#080810)`,
        padding:"16px 20px",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
          <span style={{background:`${color}18`,color,border:`1px solid ${color}35`,
            borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:700}}>{post.platform||"—"}</span>
          <span style={{background:`${color}18`,color:`${color}cc`,border:`1px solid ${color}25`,
            borderRadius:20,padding:"3px 12px",fontSize:11,fontWeight:600}}>{post.format}</span>
          <span style={{background:ps.bg,border:`1px solid ${ps.border}`,color:ps.col,
            borderRadius:6,padding:"3px 12px",fontSize:11,fontWeight:700}}>{ps.dot} {post.priority}</span>
          <span style={{background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.35)",
            borderRadius:6,padding:"3px 12px",fontSize:11}}>{post.best_day} · {post.best_time}</span>
        </div>

        <div style={{fontSize:16,fontWeight:700,color:"#f1f5f9",letterSpacing:"-.4px",marginBottom:4}}>
          {post.title}</div>

        {/* Hook callout */}
        {post.hook&&(
          <div style={{background:`${color}10`,border:`1px solid ${color}25`,borderRadius:10,
            padding:"8px 12px",marginTop:8}}>
            <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
              color:`${color}99`,marginRight:8}}>HOOK</span>
            <span style={{fontSize:13,color:"#e2e8f0",fontWeight:600,fontStyle:"italic"}}>
              "{post.hook}"</span>
          </div>
        )}

        {/* Why now */}
        {post.why_now&&(
          <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",marginTop:8,lineHeight:1.5}}>
            <span style={{color:color,fontWeight:700}}>Why this week: </span>{post.why_now}
          </div>
        )}
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",gap:2,padding:"8px 12px 0",background:"#07070f",
        overflowX:"auto",scrollbarWidth:"none"}}>
        {hasTabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{padding:"7px 15px",borderRadius:"9px 9px 0 0",fontSize:12,fontWeight:600,
              border:"none",cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s",
              background:tab===t.id?color:"rgba(255,255,255,0.04)",
              color:tab===t.id?"#fff":"rgba(255,255,255,0.4)"}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div style={{padding:"18px 20px",background:"#07070f"}}>

        {/* CAPTION TAB */}
        {tab==="caption"&&(
          <div style={{display:"grid",gap:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",
                letterSpacing:"1.5px",color:"rgba(255,255,255,0.28)"}}>
                Caption — {post.platform}</span>
              <CopyBtn text={post.caption}/>
            </div>
            <pre style={MONO}>{post.caption}</pre>

            {post.cta&&(
              <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:9,padding:"10px 13px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                    color:"rgba(255,255,255,0.3)",marginBottom:3}}>Call to Action</div>
                  <div style={{fontSize:13,color:"#f1f5f9",fontWeight:600}}>{post.cta}</div>
                </div>
                <CopyBtn text={post.cta} sm/>
              </div>
            )}

            {post.hashtags?.length>0&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                  color:"rgba(255,255,255,0.28)",marginBottom:7}}>Hashtags</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                  {post.hashtags.map((h,i)=>(
                    <span key={i} style={{background:`${color}14`,color,border:`1px solid ${color}28`,
                      borderRadius:20,padding:"3px 11px",fontSize:11,fontWeight:600}}>
                      #{h.replace(/^#/,"")}</span>
                  ))}
                </div>
                <CopyBtn text={post.hashtags.map(h=>`#${h.replace(/^#/,"")}`).join(" ")}
                  label="Copy All Hashtags" sm/>
              </div>
            )}

            {/* Full copy block */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:10,padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                  color:"rgba(255,255,255,0.28)"}}>Full Caption + Hashtags (ready to paste)</span>
                <CopyBtn text={`${post.caption}\n\n${post.hashtags?.map(h=>`#${h.replace(/^#/,"")}`).join(" ")||""}`}
                  label="Copy Complete" sm/>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>Caption + hashtags formatted and ready to paste directly into {post.platform}</div>
            </div>
          </div>
        )}

        {/* SCRIPT TAB */}
        {tab==="script"&&post.script&&(
          <div style={{display:"grid",gap:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                  color:"rgba(255,255,255,0.28)"}}>Word-for-word script</span>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:2}}>
                  Read exactly as written · [brackets] = directions for camera/text</div>
              </div>
              <CopyBtn text={post.script}/>
            </div>
            <pre style={{...MONO,maxHeight:420}}>{post.script}</pre>
            <div style={{background:`${color}0a`,border:`1px solid ${color}18`,borderRadius:9,
              padding:"10px 13px",fontSize:12,color:"rgba(255,255,255,0.45)",lineHeight:1.6}}>
              💡 <strong style={{color}}>Filming tip:</strong> Film in portrait (9:16). Read from script but pause and look directly at camera for the hook line. First 3 seconds must grab attention.
            </div>
          </div>
        )}

        {/* CAROUSEL SLIDES TAB */}
        {tab==="slides"&&post.carousel_slides?.length&&(
          <div style={{display:"grid",gap:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                color:"rgba(255,255,255,0.28)"}}>
                Carousel — {post.carousel_slides.length} slides</span>
              <CopyBtn text={post.carousel_slides.map(s=>`Slide ${s.slide_num}: ${s.heading}\n${s.body}`).join("\n\n")}
                label="Copy All Slides"/>
            </div>
            {post.carousel_slides.map((s,i)=>(
              <div key={i} style={{background:"#030309",border:`1px solid ${color}18`,borderRadius:13,padding:"13px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:26,height:26,borderRadius:7,background:`${color}20`,color,
                      fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {s.slide_num}</div>
                    <span style={{fontSize:13,fontWeight:700,color:"#f1f5f9",letterSpacing:"-.2px"}}>{s.heading}</span>
                  </div>
                  <CopyBtn text={`${s.heading}\n${s.body}`} sm/>
                </div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.7,marginBottom:s.design_note?8:0}}>
                  {s.body}</div>
                {s.design_note&&(
                  <div style={{fontSize:11,color:`${color}80`,fontStyle:"italic",borderTop:`1px solid ${color}15`,paddingTop:6}}>
                    🎨 Design note: {s.design_note}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* THREAD TAB */}
        {tab==="thread"&&post.thread_tweets?.length&&(
          <div style={{display:"grid",gap:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
                color:"rgba(255,255,255,0.28)"}}>
                Thread — {post.thread_tweets.length} tweets</span>
              <CopyBtn text={post.thread_tweets.map(t=>`${t.num}/ ${t.tweet}`).join("\n\n")}
                label="Copy Entire Thread"/>
            </div>
            {post.thread_tweets.map((t,i)=>(
              <div key={i} style={{display:"flex",gap:10}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:`${color}20`,color,
                    fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>{t.num}</div>
                  {i<post.thread_tweets.length-1&&<div style={{width:2,flex:1,background:`${color}15`,margin:"4px 0"}}/>}
                </div>
                <div style={{background:"#030309",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:12,
                  padding:"12px 14px",flex:1,marginBottom:2}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:6}}>
                    <span style={{fontSize:11,color:`${color}80`,fontWeight:700}}>{t.tweet.length}/280</span>
                    <CopyBtn text={t.tweet} sm/>
                  </div>
                  <div style={{fontSize:13,color:"#e2e8f0",lineHeight:1.7}}>{t.tweet}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHECKLIST TAB */}
        {tab==="checklist"&&(
          <div style={{display:"grid",gap:9}}>
            <div style={{background:`${color}0a`,border:`1px solid ${color}18`,borderRadius:11,
              padding:"12px 16px",textAlign:"center",marginBottom:4}}>
              <div style={{fontSize:14,fontWeight:700,color,letterSpacing:"-.2px"}}>{post.best_day} · {post.best_time}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:3}}>Optimal posting time for {post.platform}</div>
            </div>
            {post.posting_checklist?.map((step,i)=>(
              <div key={i} style={{display:"flex",gap:11,alignItems:"flex-start",
                background:"rgba(255,255,255,0.03)",borderRadius:9,padding:"10px 14px"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:`${color}20`,color,
                  fontWeight:800,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",
                  flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>{i+1}</div>
                <span style={{fontSize:13,color:"rgba(255,255,255,0.62)",lineHeight:1.55}}>{step}</span>
              </div>
            ))}
            {post.engagement_tip&&(
              <div style={{background:"#051a0f",border:"1px solid #166534",borderRadius:10,
                padding:"12px 15px",marginTop:4}}>
                <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
                  color:"#4ade80",marginBottom:5}}>⚡ First-30-mins Engagement Tip</div>
                <div style={{fontSize:13,color:"#86efac",lineHeight:1.6}}>{post.engagement_tip}</div>
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
    <div style={{marginBottom:22}}>
      <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
        color:"rgba(255,255,255,0.28)",marginBottom:10}}>🔍 Live Trends Found This Week</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        {trends.map((t,i)=>(
          <div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${color}14`,
            borderRadius:13,padding:"13px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",letterSpacing:"-.2px",lineHeight:1.3,flex:1}}>
                {t.name}</div>
              <span style={{fontSize:9,fontWeight:700,marginLeft:6,flexShrink:0,borderRadius:5,
                padding:"2px 7px",
                background:t.heat==="Hot"?"#451a1a":t.heat==="Rising"?"#422006":"#0f2a1a",
                color:t.heat==="Hot"?"#fca5a5":t.heat==="Rising"?"#fdba74":"#4ade80",
                border:`1px solid ${t.heat==="Hot"?"#7f1d1d40":t.heat==="Rising"?"#92400e40":"#14532d40"}`}}>
                {t.heat==="Hot"?"🔥 HOT":t.heat==="Rising"?"📈 RISING":"🌱 EMERGING"}
              </span>
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",lineHeight:1.5,marginBottom:4}}>{t.why}</div>
            {t.platform&&<div style={{fontSize:10,color:`${color}70`,fontWeight:600}}>on {t.platform}</div>}
            {t.source&&<div style={{fontSize:10,color:"rgba(255,255,255,0.2)",fontStyle:"italic",marginTop:3}}>
              Source: {t.source}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  WEEK CALENDAR
// ─────────────────────────────────────────────────────────────────
function WeekCal({posts, color}){
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const full=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const byDay={};
  posts.forEach(p=>{const k=full.find(f=>f===p.best_day)?.slice(0,3);if(k)(byDay[k]=byDay[k]||[]).push(p);});
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:20}}>
      {days.map(d=>(
        <div key={d} style={{background:byDay[d]?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
          border:`1px solid ${byDay[d]?color+"35":"rgba(255,255,255,0.06)"}`,borderRadius:9,padding:"7px",minHeight:52}}>
          <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",
            color:"rgba(255,255,255,0.3)",marginBottom:4}}>{d}</div>
          {byDay[d]?.map((p,i)=>(
            <div key={i} style={{background:`${color}18`,border:`1px solid ${color}25`,borderRadius:4,
              padding:"3px 5px",marginBottom:2}}>
              <div style={{fontSize:9,color,fontWeight:700}}>{p.format}</div>
              <div style={{fontSize:8,color:"rgba(255,255,255,0.32)",fontFamily:"monospace"}}>{p.best_time}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  WORKSPACE — content generation engine
// ─────────────────────────────────────────────────────────────────
const GEN_STEPS=[
  "🔍 Scanning trending content live...",
  "📊 Analysing platform algorithms...",
  "🌍 Finding viral patterns in your niche...",
  "✍️ Writing platform-native captions...",
  "🎬 Scripting your Reels and videos...",
  "🎠 Building carousel decks...",
  "📌 Researching viral hashtags...",
  "✨ Final quality check...",
];

function Workspace({profile, hKey}){
  const color=profile.color||"#38bdf8";
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
          messages:[{role:"user",content:`Today is ${today}. Research what is trending RIGHT NOW in "${profile.niche}" on ${platforms.join(" and ")}. Then write 3 complete posts for ${profile.brandName||profile.name}. Return ONLY raw JSON starting with {`}]
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
      fetch(`/api/history/${profile.id}`, {
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
              ⚡ Free Trial — <span style={{color:"#38bdf8"}}>{trialRemaining} post{trialRemaining!==1?"s":""} remaining</span>
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>
              No card needed. Upgrade after to unlock more posts, platforms and weekly tips.
            </div>
          </div>
          <a href="https://rzp.io/rzp/7S3xXh0K" target="_blank"
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
            {[["₹3,999/mo","Starter","15 posts · 2 platforms"],
              ["₹6,499/mo","Growth","25 posts · 4 platforms"],
              ["₹11,999/mo","Pro","Unlimited · All platforms"]].map(([price,name,desc])=>(
              <a key={name} href={CONFIG.razorpay[name.toLowerCase()]} target="_blank"
                style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.25)",
                  borderRadius:13,padding:"14px 8px",textDecoration:"none",display:"block"}}>
                <div style={{fontSize:15,fontWeight:800,color:"#38bdf8",marginBottom:3}}>{price}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:3}}>{name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.4}}>{desc}</div>
              </a>
            ))}
          </div>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>
            Scroll down to view your 3 generated posts anytime ↓
          </p>
        </div>
      )}
      {/* Week history pills */}
      {hist.length>=1&&(
        <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"1.5px",
            color:"rgba(255,255,255,0.22)"}}>History:</span>
          {hist.map((w,i)=>(
            <button key={i} onClick={()=>{setResult(w);setErr(null);}}
              style={{padding:"4px 15px",borderRadius:20,fontSize:12,fontWeight:600,
                border:`1px solid ${color}40`,transition:"all .15s",
                background:result?.week===w.week?color:`${color}10`,
                color:result?.week===w.week?"#fff":color,cursor:"pointer"}}>
              W{w.week} <span style={{opacity:.7,fontSize:10}}>· {w.posts?.length||0} posts</span>
            </button>
          ))}
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
          style={{background:gen||trialExhausted?"rgba(255,255,255,0.04)":`linear-gradient(135deg,${color},${color}88)`,
            color:gen||trialExhausted?"rgba(255,255,255,0.2)":"#fff",
            border:`1px solid ${gen||trialExhausted?"rgba(255,255,255,0.07)":color}`,borderRadius:12,
            padding:"13px 26px",fontSize:14,fontWeight:700,cursor:gen||trialExhausted?"not-allowed":"pointer",
            minWidth:195,transition:"all .2s",letterSpacing:"-.2px"}}>
          {trialExhausted?"Trial Complete — Upgrade to Continue":gen?"Researching...":hist.length>0?`↻ Generate Week ${hist.length+1}`:"⚡ Research & Write"}
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
        <div style={{background:"#110508",border:"1px solid #7f1d1d",borderRadius:13,
          padding:"16px 20px",marginBottom:20}}>
          <p style={{color:"#fca5a5",margin:"0 0 4px",fontWeight:700,fontSize:14}}>
            {err==="RATE_LIMIT"?"⏳ Rate limit reached":"⚠️ Generation failed"}</p>
          <p style={{color:"#fda4af",margin:"0 0 12px",fontSize:13}}>
            {err==="RATE_LIMIT"
              ?"You've hit the hourly API cap. Resets in a few minutes. Your saved content is still below."
              :err}</p>
          <div style={{display:"flex",gap:8}}>
            {err!=="RATE_LIMIT"&&(
              <button onClick={generate} style={{background:"#7f1d1d",color:"#fff",border:"none",
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
          <div className="mobile-col" style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}>
            <div style={{height:1,flex:1,background:`${color}12`}}/>
            <div style={{background:color,color:"#fff",borderRadius:20,padding:"4px 16px",
              fontSize:11,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase"}}>
              Week {result.week} · {result.date}</div>
            <div style={{height:1,flex:1,background:`${color}12`}}/>
          </div>
          {result.posts?.length>0&&<WeekCal posts={result.posts} color={color}/>}
          <TrendCards trends={result.trends} color={color}/>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",
            color:"rgba(255,255,255,0.28)",marginBottom:14}}>
            📝 {result.posts?.length||0} Posts — Platform-native content ready to publish</div>
          <div style={{display:"grid",gap:16}}>
            {result.posts?.map((p,i)=><PostCard key={i} post={p} profile={profile}/>)}
          </div>
          <div style={{textAlign:"center",marginTop:28,paddingTop:22,
            borderTop:"1px solid rgba(255,255,255,0.05)"}}>
            <button onClick={generate}
              style={{background:`linear-gradient(135deg,${color},${color}88)`,
                color:"#fff",border:"none",borderRadius:12,padding:"13px 28px",
                fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"-.2px"}}>
              ↻ Generate Week {hist.length+1}</button>
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

  const COLORS=["#38bdf8","#7C3AED","#E31313","#10b981","#f59e0b","#ec4899","#0ea5e9","#6366f1","#14b8a6","#C9A84C"];

  return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"28px 20px"}}>
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
          <div style={{fontSize:12,fontWeight:700,color:"#38bdf8",textTransform:"uppercase",
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
  const [mode,setMode]=useState("pay"); // pay | verify | done
  const [pid,setPid]=useState("");
  const [checking,setChecking]=useState(false);
  const [pidErr,setPidErr]=useState("");

  const confirm=async()=>{
    if(!pid.trim()||pid.trim().length<10){
      setPidErr("Enter your Razorpay Payment ID (starts with pay_...)");return;
    }
    setChecking(true); setPidErr("");
    await pushToClickUp({...formData,planName:plan.name,displayINR:plan.displayINR,
      paymentId:pid.trim(),joinDate:new Date().toLocaleDateString("en-IN"),
      paymentStatus:"pending_verification"},
      CONFIG.clickup.leadsListId);
    setMode("done");
    setChecking(false);
    setTimeout(()=>onVerified(),1000);
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
            style={{display:"block",textAlign:"center",
              background:"linear-gradient(135deg,#3395FF,#1a5fc8)",
              color:"#fff",borderRadius:13,padding:"15px",fontSize:16,fontWeight:700,
              textDecoration:"none",letterSpacing:"-.2px"}}>
            💳 Pay ₹{plan.priceINR.toLocaleString("en-IN")} with Razorpay →
          </a>
          <div style={{textAlign:"center",fontSize:12,color:"rgba(255,255,255,0.28)",padding:"4px 0"}}>
            You'll be taken to Razorpay's secure payment page</div>
          <button onClick={()=>setMode("verify")}
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
          <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.2px",marginBottom:5}}>
            Confirm your payment</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.65,marginBottom:14}}>
            After paying, Razorpay shows you a Payment ID like{" "}
            <code style={{background:"rgba(255,255,255,0.08)",borderRadius:5,padding:"1px 7px",
              fontFamily:"monospace",fontSize:11}}>pay_XXXXXXXXXXXXXXXX</code>
            {" "}in the confirmation screen or email. Paste it below.
          </div>
          <input value={pid} onChange={e=>{setPid(e.target.value);setPidErr("");}}
            placeholder="pay_XXXXXXXXXXXXXXXX"
            style={{width:"100%",background:"rgba(255,255,255,0.06)",
              border:`1px solid ${pidErr?"#991b1b":"rgba(255,255,255,0.12)"}`,borderRadius:10,
              padding:"11px 13px",color:"#fff",fontSize:13,outline:"none",
              boxSizing:"border-box",fontFamily:"'JetBrains Mono',monospace",marginBottom:pidErr?6:10}}/>
          {pidErr&&<div style={{fontSize:11,color:"#fca5a5",marginBottom:10}}>⚠ {pidErr}</div>}
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
  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  const filtered=options.filter(o=>o.toLowerCase().includes(q.toLowerCase()));
  const select=(v)=>{onChange(v);setQ("");setOpen(false);};
  return(
    <div ref={ref} style={{position:"relative",marginBottom:14}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:error?"#fca5a5":"rgba(255,255,255,0.4)",
        textTransform:"uppercase",letterSpacing:"1px",marginBottom:5}}>
        {label}{required&&<span style={{color:"#E31313"}}> *</span>}
      </label>
      <div onClick={()=>setOpen(o=>!o)} style={{
        background:"rgba(255,255,255,0.05)",border:`1px solid ${error?"#dc2626":open?"rgba(56,189,248,0.6)":"rgba(255,255,255,0.1)"}`,
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
              placeholder="Search or type your own..."
              style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:7,padding:"7px 11px",fontSize:13,color:"#fff",outline:"none"}}/>
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {filtered.map(o=>(
              <div key={o} onClick={()=>select(o)}
                style={{padding:"10px 14px",cursor:"pointer",fontSize:13,
                  color:value===o?"#fff":"rgba(255,255,255,0.7)",
                  background:value===o?"rgba(56,189,248,0.15)":"transparent",
                  transition:"background .1s"}}
                onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                onMouseOut={e=>e.currentTarget.style.background=value===o?"rgba(56,189,248,0.15)":"transparent"}>
                {value===o&&<span style={{color:"#38bdf8",marginRight:8}}>✓</span>}{o}
              </div>
            ))}
            {allowCustom&&q&&!options.includes(q)&&(
              <div onClick={()=>select(q)}
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
      {error&&<div style={{fontSize:11,color:"#fca5a5",marginTop:4}}>⚠ {error}</div>}
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
            color:"#38bdf8",borderRadius:10,padding:"10px 16px",fontSize:13,
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
  const [stage, setStage] = useState(0); // 0=loading, 1=results
  const [posts, setPosts] = useState([]);
  const color = plan?.color || "#38bdf8";

  useEffect(() => {
    // Simulate generation sequence
    const timer = setTimeout(() => {
      setPosts([
        {
          platform: formData.platforms[0] || "Instagram",
          type: "Reel / Short",
          hook: `How to dominate as a ${formData.niche || 'brand'} in 2024`,
          caption: "Tired of the same old advice? Do this instead...\n\n#growth #strategy",
        },
        {
          platform: formData.platforms[0] || "Instagram",
          type: "Carousel",
          hook: "3 mistakes killing your engagement right now",
          caption: "Swipe to see if you're making these 3 common mistakes. 👇",
        },
        {
          platform: formData.platforms[0] || "Instagram",
          type: "Single Post",
          hook: "Unpopular opinion: " + (formData.niche || 'Your niche') + " is changing.",
          caption: "Adapt or get left behind. Here's our exact framework... 🚀",
        }
      ]);
      setStage(1);
    }, 2500);
    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div style={{animation:"fadeUp .3s ease", maxWidth: 640, margin: "0 auto", padding: "40px 20px"}}>
      <div style={{textAlign:"center", marginBottom:32}}>
        <div style={{fontSize:42, marginBottom:10}}>⚡</div>
        <h2 style={{fontSize:24, fontWeight:800, letterSpacing:"-.5px", marginBottom:8}}>
          {stage === 0 ? "Generating your posts..." : "Your 3 free posts are ready!"}
        </h2>
        <p style={{fontSize:14, color:"rgba(255,255,255,0.5)", maxWidth:400, margin:"0 auto", lineHeight: 1.6}}>
          {stage === 0
            ? `Analysing ${formData.brandName} and live trends in ${formData.niche}...`
            : "Here's a preview of the content quality you can expect. Subscribe to unlock the full agency studio."}
        </p>
      </div>

      {stage === 0 ? (
        <div style={{padding:"60px 0", textAlign:"center"}}>
          <div style={{width:48, height:48, border:`4px solid ${color}33`, borderTopColor:color, borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto 20px"}}/>
          <style>{`
            @keyframes spin {100% {transform: rotate(360deg);}}
            @media (max-width: 768px) {
              .mobile-grid-1 { grid-template-columns: 1fr !important; }
              .mobile-col { flex-direction: column !important; align-items: flex-start !important; }
            }
          `}</style>
          <div style={{fontSize:14, color:color, fontWeight:700, letterSpacing: "1px", textTransform: "uppercase"}}>AI Agent Working</div>
        </div>
      ) : (
        <div style={{display:"grid", gap:16, marginBottom:32}}>
          {posts.map((p, i) => (
            <div key={i} style={{background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"20px"}}>
              <div style={{fontSize:11, fontWeight:800, color:color, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:8}}>
                {p.platform} · {p.type}
              </div>
              <div style={{fontSize:16, fontWeight:800, marginBottom:10, lineHeight: 1.3}}>{p.hook}</div>
              <div style={{fontSize:14, color:"rgba(255,255,255,0.6)", whiteSpace:"pre-wrap", lineHeight: 1.6}}>{p.caption}</div>
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
function Onboarding({onComplete, geo={country:"_DEFAULT"}}){
  const [screen,setScreen]=useState("plans"); // plans|details|payment|profile|trial
  const [plan,setPlan]=useState(null);
  const [form,setForm]=useState({
    brandName:"",email:"",phone:"",
    audience:"",tone:"",niche:"",
    platforms:[],
  });
  const [trialContent, setTrialContent]=useState(null);
  const [errors,setErrors]=useState({});

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("?")) {
      const urlParams = new URLSearchParams(hash.split("?")[1]);
      const planParam = urlParams.get("plan");
      if (planParam === "trial") {
        setPlan({ id: "trial", isTrialFlow: true, name: "Free Trial", color: "#38bdf8", platformCount: 1, platformOptions: ["Instagram","YouTube","LinkedIn","Facebook","Twitter/X","Threads"] });
        setScreen("details");
      } else if (planParam) {
        const selectedPlan = PLANS.find(p => p.id === planParam);
        if (selectedPlan) {
          setPlan(selectedPlan);
          setScreen("details");
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
  const [waCode, setWaCode] = useState("");

  const AGENCY_WHATSAPP = "919000000000"; // Replace with agency's real WhatsApp number

  const submitDetails=async()=>{
    const errs=validateDetails();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setSavingData(true);
    try {
      // Send OTP via backend (falls back to test mode if Twilio not configured)
      if(form.phone) {
        await fetch("/api/send-otp", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({phone:form.phone})
        });
      }
    } catch(e){ /* non-blocking — proceed to OTP screen anyway */ }
    setSavingData(false);
    setScreen("otp");
  };

  const verifyOtpAndProceed=async()=>{
    if(!otpValue.trim()) { setOtpError("Please enter the 4-digit code."); return; }
    setVerifyingOtp(true);
    setOtpError("");
    try {
      // Verify OTP via backend (returns success for code "1234" when Twilio not configured)
      if(form.phone) {
        const res = await fetch("/api/verify-otp", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({phone:form.phone, code:otpValue.trim()})
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
          setOtpError("A free trial has already been generated for this email or phone number.");
          setVerifyingOtp(false);
          return;
        }
        trials[Date.now()] = { email: tEmail, phone: form.phone, date: new Date().toISOString() };
        await DB.set("snstudio_trials", trials);
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
          <img src="/logo.png" alt={CONFIG.brandName} style={{height:64,width:"auto",objectFit:"contain"}}/>
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
          setPlan({ id: "trial", isTrialFlow: true, name: "Free Trial", color: "#38bdf8", platformCount: 1, platformOptions: ["Instagram","YouTube","LinkedIn","Facebook","Twitter/X","Threads"] });
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
                  style={{width:"100%",background:`linear-gradient(135deg,${pl.color},${pl.color}88)`,
                    color:"#fff",border:"none",borderRadius:11,padding:"13px",
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
          <div key={n} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:14,padding:"18px",textAlign:"center"}}>
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
          <div key={q} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:12,padding:"14px 16px",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.75)",marginBottom:5,letterSpacing:"-.2px"}}>{q}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.6}}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── DETAILS + PLATFORM SCREEN ──
  if(screen==="details"&&plan) return(
    <div style={{maxWidth:560,margin:"0 auto",padding:"28px 20px"}}>
      <button onClick={()=>setScreen("plans")}
        style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)",
          color:"rgba(255,255,255,0.5)",borderRadius:9,padding:"6px 13px",fontSize:12,
          cursor:"pointer",marginBottom:20,fontWeight:600}}>← Back to Plans</button>

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

      <h2 style={{fontSize:20,fontWeight:800,letterSpacing:"-.5px",marginBottom:4}}>Your brand details</h2>
      <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,marginBottom:20,lineHeight:1.6}}>
        This trains the AI to write specifically for your brand and audience. Be detailed — the more context, the better the content.</p>

      <div style={{display:"grid",gap:14}}>
        <Field label="Brand / Business Name" name="brandName" value={form.brandName}
          onChange={setF} error={errors.brandName} placeholder="e.g. FitLife Studio, Priya's Skincare" required/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Field label="Email" name="email" type="email" value={form.email}
            onChange={setF} error={errors.email} placeholder="you@email.com" required/>
          <Field label="WhatsApp / Phone" name="phone" value={form.phone}
            onChange={setF} error={errors.phone} placeholder="+91 98765 43210"/>
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
          <div style={{fontSize:11,fontWeight:700,color:errors.platforms?"#fca5a5":"rgba(255,255,255,0.4)",
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
          {errors.platforms&&<div style={{fontSize:11,color:"#fca5a5",marginTop:6}}>⚠ {errors.platforms}</div>}
          {form.platforms.length>0&&!errors.platforms&&(
            <div style={{marginTop:8,fontSize:11,color:`${plan.color}99`}}>
              ✓ AI will write native content for: {form.platforms.join(", ")}</div>
          )}
        </div>
      </div>

      <button onClick={submitDetails} disabled={savingData}
        style={{width:"100%",marginTop:22,
          background:`linear-gradient(135deg,${plan.color},${plan.color}88)`,
          color:"#fff",border:"none",borderRadius:13,padding:"14px",
          fontSize:15,fontWeight:700,cursor:savingData?"not-allowed":"pointer",letterSpacing:"-.2px",
          opacity: savingData ? 0.7 : 1}}>
        {savingData ? "Processing..." : plan.isTrialFlow ? "⚡ Generate My 3 Free Posts →" : "Continue to Payment →"}
      </button>
    </div>
  );

  if(screen==="otp"&&plan) return (
    <div style={{maxWidth:400,margin:"0 auto",padding:"40px 20px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16}}>📱</div>
      <h2 style={{fontSize:24,fontWeight:800,marginBottom:8}}>Verify your WhatsApp</h2>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginBottom:24}}>
        We've sent a 4-digit verification code to<br/><b style={{color:"#fff"}}>{form.phone || "your phone number"}</b>.<br/><span style={{fontSize:11,opacity:0.6}}>(Use 1234 for testing)</span>
      </p>
      <input value={otpValue} onChange={e=>setOtpValue(e.target.value)} maxLength={4}
        placeholder="----"
        style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:12,padding:"16px",fontSize:24,textAlign:"center",letterSpacing:"12px",marginBottom:8,color:"#fff",outline:"none",fontFamily:"monospace"}}/>
      {otpError && <div style={{color:"#fca5a5",fontSize:13,marginBottom:16}}>⚠ {otpError}</div>}
      
      <button onClick={verifyOtpAndProceed} disabled={verifyingOtp}
        style={{width:"100%",background:`linear-gradient(135deg,#25D366,#128C7E)`,
          color:"#fff",border:"none",borderRadius:12,padding:"16px",marginTop:16,
          fontSize:16,fontWeight:700,cursor:verifyingOtp?"not-allowed":"pointer",boxShadow:"0 8px 24px rgba(37,211,102,0.25)",transition:"all .2s"}}>
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
        color: "#38bdf8", brand: "client", darkBg: "#020617",
        joinDate: new Date().toLocaleDateString("en-IN"), active: true, emoji: "🎁",
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
    if(!res.ok) return null;
    const data = await res.json();
    const raw = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
    const s=raw.indexOf("{"), en=raw.lastIndexOf("}");
    if(s===-1||en===-1) return null;
    return JSON.parse(raw.slice(s,en+1));
  } catch { return null; }
}

// ─────────────────────────────────────────────────────────────────
//  CLIENT PROFILE DASHBOARD
// ─────────────────────────────────────────────────────────────────
function ClientDashboard({profile, hKey, onGenerateContent}) {
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

  const phaseColor = {Building:"#38bdf8",Momentum:"#f59e0b",Scaling:"#7C3AED",Dominating:"#E31313"};
  const pc = phaseColor[tips?.growth_phase]||color;

  const TABS = [
    {id:"overview", label:"📊 Overview"},
    {id:"upgrade", label:"🚀 Upgrade Plan"},
    {id:"tips", label:"💡 Weekly Tips"},
    {id:"platforms", label:"📲 Platform Tips"},
    {id:"history", label:"📅 Content History"},
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
            {profile.plan === "trial" ? (
              <button onClick={() => setActiveTab("upgrade")}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,color:"#fff",
                  border:"none",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700,
                  cursor:"pointer",letterSpacing:"-.2px",whiteSpace:"nowrap"}}>
                🚀 Upgrade to Generate</button>
            ) : (
              <button onClick={onGenerateContent}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,color:"#fff",
                  border:"none",borderRadius:10,padding:"10px 18px",fontSize:13,fontWeight:700,
                  cursor:"pointer",letterSpacing:"-.2px",whiteSpace:"nowrap"}}>
                ⚡ Generate Content</button>
            )}
            <button onClick={fetchTips} disabled={loadingTips}
              style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",
                color:"rgba(255,255,255,0.7)",borderRadius:10,padding:"10px 18px",
                fontSize:13,fontWeight:600,cursor:loadingTips?"not-allowed":"pointer",whiteSpace:"nowrap"}}>
              {loadingTips?"Analysing...":"🔄 Refresh Tips"}</button>
          </div>
        </div>
      </div>

      {/* ── INFOGRAPHIC STATS ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[
          {label:"Posts Created",value:totalPosts,sub:"all time",icon:"📝",color:"#38bdf8"},
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

      {/* ── TABS ── */}
      <div style={{display:"flex",gap:3,background:"rgba(255,255,255,0.04)",borderRadius:12,
        padding:4,marginBottom:16,overflowX:"auto",scrollbarWidth:"none"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)}
            style={{padding:"7px 16px",borderRadius:9,fontSize:12,fontWeight:600,
              border:"none",cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s",
              background:activeTab===t.id?color:"transparent",
              color:activeTab===t.id?"#fff":"rgba(255,255,255,0.42)"}}>
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

          {/* ── UPGRADE TAB ── */}
          {activeTab==="upgrade"&&(()=>{
            const currentPlanIndex = PLANS.findIndex(p => p.id === profile.plan);
            const geoObj = JSON.parse(sessionStorage.getItem("sn_geo") || '{"country":"IN"}');
            const userGeo = GEO_PRICING[geoObj.country] || GEO_PRICING["_DEFAULT"];
            const currentPrice = currentPlanIndex >= 0 ? userGeo.rates[currentPlanIndex] : 0;
            
            return(
              <div style={{animation:"fadeUp .3s ease"}}>
                <div style={{background:"#020617",border:`1px solid ${color}30`,borderRadius:16,padding:"24px",textAlign:"center"}}>
                  <h3 style={{fontSize:20,fontWeight:800,marginBottom:8}}>Ready to Scale?</h3>
                  <p style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginBottom:24}}>Upgrade your plan to unlock more posts, more platforms, and faster growth.</p>
                  
                  <div style={{display:"grid",gap:16,gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))"}}>
                    {PLANS.map((pl, idx) => {
                      if (idx <= currentPlanIndex) return null;
                      const plPrice = userGeo.rates[idx];
                      const diff = plPrice - currentPrice;
                      return (
                        <div key={pl.id} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${pl.color}40`,borderRadius:14,padding:"20px",textAlign:"left",boxShadow:`0 4px 20px ${pl.color}15`}}>
                          <div style={{fontSize:10,fontWeight:800,color:pl.color,textTransform:"uppercase",letterSpacing:"1px",marginBottom:4}}>{pl.name}</div>
                          <div style={{fontSize:18,fontWeight:800,marginBottom:10}}>{pl.tagline}</div>
                          <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:16}}>
                            ✓ {pl.postsPerMonth === 999 ? "Unlimited" : pl.postsPerMonth} posts/mo<br/>
                            ✓ {pl.platformCount === 999 ? "All" : pl.platformCount} platforms
                          </div>
                          <div style={{marginBottom:16}}>
                            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)"}}>Price Difference to Upgrade:</div>
                            <div style={{fontSize:24,fontWeight:800,color:pl.color}}>{userGeo.symbol}{diff.toLocaleString()}</div>
                          </div>
                          <button onClick={() => window.open('https://razorpay.me/@socialninjas', '_blank')}
                            style={{width:"100%",background:`linear-gradient(135deg,${pl.color},${pl.color}88)`,color:"#fff",border:"none",borderRadius:10,padding:"12px",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:`0 4px 15px ${pl.color}40`}}>
                            Pay {userGeo.symbol}{diff.toLocaleString()} to Upgrade →
                          </button>
                        </div>
                      );
                    })}
                    {currentPlanIndex >= PLANS.length - 1 && (
                      <div style={{color:"rgba(255,255,255,0.5)",fontSize:15,fontStyle:"italic",padding:"20px",textAlign:"center",gridColumn:"1/-1"}}>
                        You are already on the highest tier plan! 🚀 Take over the world.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

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
                {label:"⚡ Quick Wins",items:tips.account_analysis.quick_wins,col:"#38bdf8",bg:"#0a1628"},
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
              tip.priority==="High"?"#7f1d1d40":"rgba(255,255,255,0.07)"}`,borderRadius:14,padding:"16px 18px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{width:32,height:32,borderRadius:9,
                  background:tip.priority==="High"?"#7f1d1d":"rgba(255,255,255,0.07)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:13,fontWeight:800,color:tip.priority==="High"?"#fca5a5":"rgba(255,255,255,0.4)",
                  flexShrink:0,fontFamily:"monospace"}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                    <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.2px"}}>{tip.title}</div>
                    <span style={{fontSize:10,fontWeight:700,borderRadius:5,padding:"2px 8px",
                      background:tip.priority==="High"?"#7f1d1d":"rgba(255,255,255,0.07)",
                      color:tip.priority==="High"?"#fca5a5":"rgba(255,255,255,0.4)"}}>
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

      {/* ── CONTENT HISTORY TAB ── */}
      {activeTab==="history"&&(
        <div style={{display:"grid",gap:10}}>
          {hist.length===0&&(
            <div style={{textAlign:"center",padding:"40px",background:"rgba(255,255,255,0.02)",
              borderRadius:14,border:"1px dashed rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:10}}>No content generated yet</div>
              <button onClick={onGenerateContent}
                style={{background:`linear-gradient(135deg,${color},${color}88)`,color:"#fff",
                  border:"none",borderRadius:10,padding:"10px 22px",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                ⚡ Generate First Week</button>
            </div>
          )}
          {hist.slice().reverse().map((w,i)=>(
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
//  PORTAL CLIENT VIEW — dashboard + content with tab toggle
// ─────────────────────────────────────────────────────────────────
function PortalClientView({client, onHome}){
  const [view, setView] = useState("dashboard");
  const color = client.color||"#7C3AED";
  const hKey = `snstudio_portal_${client.id}`;
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
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
        <span style={{fontSize:11,background:"#052e16",color:"#4ade80",border:"1px solid #166534",
          borderRadius:6,padding:"3px 10px",fontWeight:700}}>✓ {client.planName} · Active</span>
        <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.05)",borderRadius:9,padding:3}}>
          {[["dashboard","📊 My Profile"],["content","⚡ Generate"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)}
              style={{padding:"5px 14px",borderRadius:7,fontSize:12,fontWeight:600,border:"none",
                cursor:"pointer",transition:"all .15s",
                background:view===v?color:"transparent",
                color:view===v?"#fff":"rgba(255,255,255,0.4)"}}>
              {l}</button>
          ))}
        </div>
      </div>
      {view==="dashboard"
        ?<ClientDashboard profile={client} hKey={hKey} onGenerateContent={()=>setView("content")}/>
        :<Workspace profile={client} hKey={hKey}/>
      }
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

  useEffect(()=>{(async()=>setClients(await DB.get("snstudio_clients")||{}))();},[]);
  useEffect(()=>{(async()=>{ const g=await detectGeo(); setGeo(g||{country:"_DEFAULT"}); })();},[]);
  const saveClients=async c=>{setClients(c);await DB.set("snstudio_clients",c);};

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("?plan=")) {
      setTab("portal");
      setPortalView("onboarding");
    }
  }, []);

  const CSS=`<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@500;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html,body,*{font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:4px;}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
    h1,h2,h3{letter-spacing:-.4px;line-height:1.15;}
    input,textarea,select,button{font-family:'Plus Jakarta Sans',system-ui,sans-serif!important;}
    input,textarea,select{color:#fff;}
    a{text-decoration:none;}
    [contenteditable]{outline:none;}
    
    /* MOBILE RESPONSIVENESS OVERRIDES */
    @media (max-width: 768px) {
      .mobile-col { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
      .mobile-wrap { flex-wrap: wrap !important; }
      .mobile-grid-1 { grid-template-columns: 1fr !important; }
      .mobile-padding { padding: 16px !important; }
      .mobile-btn { padding: 12px 16px !important; font-size: 13px !important; width: 100% !important; }
      .mobile-text-sm { font-size: 12px !important; }
    }
  </style>`;

  const NAV=(
    <nav style={{background:"rgba(4,4,12,0.97)",backdropFilter:"blur(24px)",
      borderBottom:"1px solid rgba(255,255,255,0.07)",position:"sticky",top:0,zIndex:50}}>
      <div style={{maxWidth:1040,margin:"0 auto",padding:"0 20px",height:56,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:9,
            background:"linear-gradient(135deg,#38bdf8,#0D1B3E)",
            border:"1px solid #38bdf840",display:"flex",alignItems:"center",
            justifyContent:"center",fontSize:16}}>🥷</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,letterSpacing:"-.5px"}}>{CONFIG.brandName}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:"2px",
              textTransform:"uppercase",marginTop:1}}>{CONFIG.brandTagline}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.05)",borderRadius:11,padding:3}}>
          {tab === "dashboard" && (
            <button onClick={()=>{setTab("portal");setClientSelected(null);}}
              style={{padding:"5px 14px",borderRadius:8,fontSize:12,fontWeight:600,border:"none",
                cursor:"pointer",transition:"all .15s",letterSpacing:"-.1px",
                background:"transparent", color:"rgba(255,255,255,0.38)"}}>
              ← Back to Portal</button>
          )}
        </div>
      </div>
    </nav>
  );

  const wrap=children=>(
    <div style={{background:"#04040c",minHeight:"100vh",color:"#fff"}}>
      <div dangerouslySetInnerHTML={{__html:CSS}}/>
      {NAV}
      <div className="mobile-padding" style={{maxWidth:1040,margin:"0 auto",padding:"24px 20px",animation:"fadeUp .3s ease"}}>
        {children}
      </div>
    </div>
  );

  // ── MY ACCOUNTS & CLIENTS REMOVED FOR PRIVACY ────────────────────
  // All administrative client management is now exclusively in Admin.tsx

  // ── DASHBOARD (Replaces standalone client view) ──────────────────
  if(tab==="dashboard" && clientSelected){
    const cl=clients[clientSelected];
    return wrap(
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,flexWrap:"wrap"}}>
            <button onClick={()=>{setClientSelected(null);setTab("portal");}}
              style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                color:"rgba(255,255,255,0.55)",borderRadius:9,padding:"7px 13px",fontSize:13,
                cursor:"pointer",fontWeight:600}}>← Back</button>
            {cl?.logoPreview
              ?<img src={cl.logoPreview} alt="logo" style={{width:36,height:36,borderRadius:10,objectFit:"contain",background:"#fff",padding:2}}/>
              :<div style={{width:36,height:36,borderRadius:10,background:`${cl?.color||"#7C3AED"}18`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🏢</div>}
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontWeight:700,letterSpacing:"-.3px"}}>
                {cl?.brandName}
                <span style={{color:cl?.color||"#7C3AED",fontSize:12}}> · {(cl?.platforms||[cl?.sub]).join(", ")}</span>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",marginTop:1}}>{cl?.audience}</div>
            </div>
            <span style={{fontSize:11,background:"#052e16",color:"#4ade80",border:"1px solid #166534",
              borderRadius:6,padding:"3px 10px",fontWeight:700}}>{cl?.planName} · ✓ Active</span>
            {/* View toggle */}
            <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.05)",borderRadius:9,padding:3}}>
              {[["dashboard","📊 Profile"],["content","⚡ Content"]].map(([v,l])=>(
                <button key={v} onClick={()=>setClientView(v)}
                  style={{padding:"5px 13px",borderRadius:7,fontSize:12,fontWeight:600,border:"none",
                    cursor:"pointer",transition:"all .15s",
                    background:clientView===v?cl?.color||"#7C3AED":"transparent",
                    color:clientView===v?"#fff":"rgba(255,255,255,0.4)"}}>
                  {l}</button>
              ))}
            </div>
          </div>
          {clientView==="dashboard"
            ?<ClientDashboard profile={cl} hKey={`snstudio_hist_${clientSelected}`}
                onGenerateContent={()=>setClientView("content")}/>
            :<Workspace profile={cl} hKey={`snstudio_client_${clientSelected}`}/>
          }
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
        <Onboarding geo={geo} onComplete={async cl=>{
          const existing=await DB.get("snstudio_clients")||{};
          await DB.set("snstudio_clients",{...existing,[cl.id]:cl});
          setClients(p=>({...p,[cl.id]:cl}));
          setActiveClient(cl);
          setPortalView("workspace");
        }}/>
      </div>
    ):portalView==="workspace"&&activeClient?(
      <PortalClientView client={activeClient} onHome={()=>setPortalView("home")}/>
    ):null
  );

  return null;
}




