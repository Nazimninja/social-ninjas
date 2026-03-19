import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import SEO from '../components/SEO';

const productsData: Record<string, any> = {
  'content-studio': {
    name: 'AI Content Studio', icon: '⚡', color: '#5ba4f5', badge: '🟢 Live',
    tagline: 'Your whole week of content — written in 60 seconds.',
    hero: 'You know you should be posting more content. But coming up with ideas, researching what\'s trending, writing captions for different platforms, making scripts for Reels, finding hashtags — it takes hours every week. We built AI Content Studio to do all of that for you.',
    tryLink: 'https://socialninjas.in/#/app/content-studio?plan=trial',
    problem: 'Most content tools give you templates. Fancy, flexible, well-designed templates — that still require you to do all the thinking. You still need to research trends, write the actual content, adapt it for each platform, and figure out the hashtags.',
    solution: 'AI Content Studio does the research first, then the writing. Before it writes a single word, it checks what\'s actually trending in your niche this week. Then it writes everything — captions, scripts, carousel slides, hashtags — in the voice of your brand.',
    steps: [
      { n: '01', t: 'Tell it about your brand', d: 'Describe your niche, your audience, your tone and what you sell. Takes about 5 minutes. You only do this once.' },
      { n: '02', t: 'It researches live trends', d: 'Every time you generate, the AI checks what\'s trending in your specific niche right now — not last month, not templates.' },
      { n: '03', t: 'Your posts are written', d: 'Full captions, word-for-word video scripts, carousel slide copy, hashtag sets — platform-specific for every piece.' },
      { n: '04', t: 'Copy, paste, post', d: 'Click copy on what you need. Paste your script into your phone and film. Paste slides into Canva. You\'re done.' },
    ],
    features: ['Live trend research before every single generation','Word-for-word Reel and YouTube Short scripts with camera directions','Platform-native captions — Instagram, LinkedIn, X, Facebook, Threads all sound different','Carousel slide copy ready to paste into Canva — every slide written out','Real hashtag research per post — broad, mid, and niche mix, never repeated','Thread writer — full multi-tweet threads and Threads posts, one-click copy per tweet','Posting checklist with the best time to post for your niche','Your brand voice stored permanently — every post sounds like you'],
    reviews: [
      { name: 'Priya Mehta', role: 'Skincare brand · Mumbai', text: 'I paid ₹18,000 for 8 generic posts from a freelancer. This costs less per month and writes better content than she did. Every caption actually sounds like me.', stars: 5 },
      { name: 'Rahul Sharma', role: 'Fitness coach · Delhi', text: 'Went from 2K to 18K followers in 3 months just by being consistent with the scripts. I just read them on camera. My engagement went crazy.', stars: 5 },
      { name: 'Ananya', role: 'D2C fashion brand · Bangalore', text: 'We manage 4 platforms and were spending 15 hours a week on content. Now it takes 30 minutes. The carousel copy alone saves us ₹12,000 a month in freelance costs.', stars: 5 },
    ],
    plans: [
      { name: 'Starter', price: '₹2,999', period: '/mo', features: ['15 posts per month','2 platforms of your choice','Captions + Scripts + Slides','Hashtag strategy','Posting checklist'] },
      { name: 'Growth', price: '₹5,499', period: '/mo', popular: true, features: ['25 posts per month','4 platforms included','Everything in Starter','Thread writer for X/Threads','Monthly strategy call'] },
      { name: 'Pro', price: '₹8,999', period: '/mo', features: ['Unlimited posts','All 7 platforms','Everything in Growth','Priority email support','Multi-brand workspace'] },
    ],
    stats: [['150+','Brands Using It'],['2.4M+','Posts Generated'],['7','Platforms Supported'],['60s','To Generate Everything']],
  },
  'ai-sales-agent': {
    name: 'AI Sales Agent', icon: '🤖', color: '#9b8ef0', badge: '🔜 Coming Soon',
    tagline: 'Your 24/7 sales team. Never misses a lead.',
    hero: 'Every time someone fills in a form, sends a DM, or clicks a button on your website — they expect a reply fast. The research is clear: if you reply within 5 minutes, you\'re 9× more likely to convert them. If you wait an hour, most are already gone.',
    tryLink: '/contact',
    problem: 'Your team can\'t be online all the time. Leads come in at 11pm, on weekends, during school runs and meetings. By the time you reply, they\'ve moved on. You\'re losing sales without ever knowing it.',
    solution: 'Our AI Sales Agent plugs into wherever your leads come from and replies in under 1 second — any time, any day. It asks the right questions, figures out who\'s a good fit, and books meetings into your calendar automatically.',
    steps: [
      { n: '01', t: 'We set up the agent', d: 'We build and configure your AI agent in 7–10 days. You approve the scripts and qualification questions.' },
      { n: '02', t: 'It goes live everywhere', d: 'We connect it to your website, WhatsApp, Instagram DMs — wherever your leads land.' },
      { n: '03', t: 'Every lead gets a reply', d: 'The moment someone reaches out, the AI replies. It answers questions, qualifies, and books calls.' },
      { n: '04', t: 'You talk to ready buyers', d: 'Your sales team only gets involved when a lead is qualified and ready to talk price.' },
    ],
    features: ['Replies in under 1 second — 24 hours a day, 7 days a week','Asks qualification questions naturally, like a human would','Books meetings straight into your Google Calendar or Calendly','Sends follow-up emails and SMS if they go quiet','Logs every conversation to your CRM automatically','Works on your website chat, WhatsApp, Instagram, and email','Full weekly report of all conversations and conversion rates','7–10 day setup — no technical knowledge needed'],
    reviews: [
      { name: 'Mike Ross', role: 'VP Sales · SaaSify', text: 'Our close rate doubled because we stopped talking to the wrong people. The AI pre-qualifies everyone so by the time they get on a call with us, they\'re basically already sold.', stars: 5 },
      { name: 'Karthik Nair', role: 'EdTech founder · Chennai', text: 'We were losing 60% of leads because nobody replied fast enough. The AI fixed that overnight. First week we booked 11 extra demos we would have lost.', stars: 5 },
    ],
    stats: [['0.8s','Avg Reply Time'],['24/7','Always Online'],['3×','Conversion Lift'],['7-10','Days to Deploy']],
  },
  'ad-copy-generator': {
    name: 'AI Ad Copy Generator', icon: '🎯', color: '#2fcf8e', badge: '🔜 Coming Soon',
    tagline: 'High-converting ad copy. Seconds, not days.',
    hero: 'Writing ad copy is one of the most valuable skills in marketing — and one of the hardest. A single headline change can double your click-through rate. Most businesses either guess or spend hours testing. We built AI to do it faster.',
    tryLink: '/contact',
    problem: 'Writing good ad copy takes research, experience, and a lot of testing. Most business owners don\'t have time for that. They write one version, run it, wonder why it doesn\'t convert, and give up on ads.',
    solution: 'Our AI Ad Copy Generator uses proven copywriting frameworks to write multiple variations of your ad — headlines, body copy, CTAs — all ready to A/B test. Describe what you\'re selling, and it does the rest.',
    steps: [
      { n: '01', t: 'Describe your offer', d: 'Tell the AI what you\'re selling, who it\'s for, and what platform you\'re running on. Takes 2 minutes.' },
      { n: '02', t: 'Get 10+ variations', d: 'Multiple headlines, body copy, and CTAs — each written using a different proven framework.' },
      { n: '03', t: 'Pick and test', d: 'Choose your favourites or run them all. A/B testing from day one, no extra work.' },
      { n: '04', t: 'Keep what converts', d: 'Double down on the winners. The AI learns your brand voice with every use.' },
    ],
    features: ['Generates copy for Meta, Google, LinkedIn and more','Multiple headline + body + CTA combinations per brief','Hooks built around proven psychology frameworks (AIDA, PAS, etc)','Different variations for different campaign objectives','Your brand voice preserved across every piece','A/B test-ready from the moment it\'s generated'],
    stats: [['Meta+Google','Both platforms'],['∞','Unlimited variations'],['A/B Ready','Test from day one'],['Seconds','Not days']],
  },
  'reporting-assistant': {
    name: 'AI Reporting Assistant', icon: '📊', color: '#e8b86d', badge: '🔜 Coming Soon',
    tagline: 'Know what\'s working. Skip the spreadsheets.',
    hero: 'Every Monday, someone on your team (or you) spends hours pulling numbers from Meta, Google, and whatever else you\'re running — trying to make sense of it all. That time should be spent improving campaigns, not building reports.',
    tryLink: '/contact',
    problem: 'Data without interpretation is just numbers. Most marketing dashboards give you a lot of numbers but very little insight. What actually worked? What wasted money? What should you do next week? These questions are rarely answered automatically.',
    solution: 'Connect your ad accounts and every week the AI sends you a plain-English summary of what happened, what it means, and what to do about it. No more Monday morning spreadsheets.',
    steps: [
      { n: '01', t: 'Connect your accounts', d: 'Link Meta Ads Manager and Google Ads. Takes about 10 minutes. We do it with you.' },
      { n: '02', t: 'Set your benchmarks', d: 'Tell us your targets — ROAS, CPA, whatever matters to your business.' },
      { n: '03', t: 'Get weekly reports', d: 'Every Monday, a plain-English summary lands in your inbox. What worked, what didn\'t, what to do.' },
      { n: '04', t: 'Act on the insights', d: 'The AI flags problems before they get expensive and highlights opportunities you might have missed.' },
    ],
    features: ['Automatic weekly performance summaries','Written in plain English — no marketing jargon','Compares this week to last week and to your targets','Flags anomalies before they cost you real money','Industry benchmark comparisons so you know how you stack up','One-click PDF export to share with your team or clients','Covers Meta, Google, and more platforms coming'],
    stats: [['Weekly','Auto reports'],['Plain English','No jargon'],['Meta+Google','Data connected'],['1-Click','PDF export']],
  },
};

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const AIProductLanding: React.FC = () => {
  useReveal();
  const { id } = useParams<{ id: string }>();
  const p = id ? productsData[id] : null;

  if (!p) return (
    <div style={{ minHeight: '100vh', background: '#07101e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 20 }}>
      <div style={{ fontSize: 48 }}>🔍</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Bricolage Grotesque',system-ui" }}>Product not found</h1>
      <Link to="/ai-products"><button className="btn-primary">See All Products</button></Link>
    </div>
  );

  const isLive = p.badge.includes('Live');

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO title={`${p.name} | Social Ninja's`} description={p.hero} />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Link to="/ai-products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: 13, marginBottom: 36, fontWeight: 400 }}>
            <ArrowLeft size={14} /> Back to AI Products
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: `${p.color}14`, border: `1px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{p.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 50, background: isLive ? 'rgba(47,207,142,0.12)' : 'rgba(255,255,255,0.06)', border: isLive ? '1px solid rgba(47,207,142,0.25)' : '1px solid rgba(255,255,255,0.1)', color: isLive ? '#2fcf8e' : 'rgba(255,255,255,0.5)' }}>{p.badge}</div>
          </div>
          <h1 className="reveal" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(38px,6vw,80px)', fontWeight: 700, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 16, color: 'rgba(255,255,255,0.96)' }}>{p.name}</h1>
          <div className="reveal d1" style={{ fontSize: 'clamp(16px,2.2vw,24px)', fontWeight: 400, color: p.color, marginBottom: 20 }}>{p.tagline}</div>
          <p className="reveal d2" style={{ fontSize: 'clamp(14px,1.6vw,17px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, maxWidth: 600, margin: '0 auto 40px' }}>{p.hero}</p>
          <div className="reveal d3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={p.tryLink}><button className="btn-primary" style={{ fontSize: 15, padding: '15px 32px', background: `linear-gradient(135deg,${p.color}cc,${p.color})` }}>{isLive ? '⚡ Try Free — No Card Needed' : 'Join the Waitlist →'}</button></a>
            {isLive && <a href="https://socialninjas.in/#/app/content-studio?plan=starter"><button className="btn-ghost" style={{ fontSize: 15 }}>See Pricing</button></a>}
          </div>
          {/* Stats row */}
          <div className="reveal d4" style={{ display: 'flex', justifyContent: 'center', gap: 0, marginTop: 56, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50, padding: '16px 8px', maxWidth: 640, margin: '56px auto 0', flexWrap: 'wrap' }}>
            {p.stats.map(([n, l]: string[]) => (
              <div key={l} style={{ textAlign: 'center', padding: '4px 24px', borderRight: '1px solid rgba(255,255,255,0.07)' }} className="last-no-border">
                <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 20, fontWeight: 700, color: p.color, letterSpacing: '-0.5px', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM / SOLUTION */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 72 }} className="hero-grid-cols">
          <div className="glass-card reveal" style={{ padding: 32, borderRadius: 22 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,100,100,0.7)', marginBottom: 12 }}>The Problem</div>
            <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.75 }}>{p.problem}</p>
          </div>
          <div className="glass-card reveal d1" style={{ padding: 32, borderRadius: 22, borderTop: `2px solid ${p.color}50` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: p.color, marginBottom: 12 }}>Our Solution</div>
            <p style={{ fontSize: 14.5, fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.75 }}>{p.solution}</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '80px 28px', background: 'rgba(4,8,18,0.5)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>How It Works</div>
          <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 48, color: 'rgba(255,255,255,0.95)', lineHeight: 1.1 }}>
            Simple to use. Powerful results.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="four-cols">
            {p.steps.map((s: any, i: number) => (
              <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 28, borderRadius: 20 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, fontWeight: 500, color: `${p.color}40`, lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.88)', marginBottom: 10, fontFamily: "'DM Sans',sans-serif" }}>{s.t}</div>
                <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
        <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Features</div>
        <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 40, color: 'rgba(255,255,255,0.95)' }}>
          Everything you get, in detail.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {p.features.map((f: string, i: number) => (
            <div key={i} className={`glass-card reveal d${(i%3)+1}`} style={{ padding: '18px 22px', borderRadius: 16, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <CheckCircle2 size={16} color={p.color} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS (only for live products) */}
      {p.reviews && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '80px 28px', background: 'rgba(4,8,18,0.5)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Real Results</div>
            <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 48, color: 'rgba(255,255,255,0.95)' }}>
              What users are saying.
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="three-cols">
              {p.reviews.map((r: any, i: number) => (
                <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 28, borderRadius: 22 }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {[...Array(r.stars)].map((_,j) => <Star key={j} size={13} fill={p.color} color={p.color} />)}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>"{r.text}"</p>
                  <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.88)' }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{r.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRICING (only for live products) */}
      {p.plans && (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Pricing</div>
          <h2 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-1.5px', textAlign: 'center', marginBottom: 12, color: 'rgba(255,255,255,0.95)' }}>
            Start free. Upgrade when ready.
          </h2>
          <p className="reveal d2" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: 44, fontSize: 15 }}>Try 3 posts completely free — no credit card, no commitment.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="three-cols">
            {p.plans.map((pl: any, i: number) => (
              <div key={i} className={`glass-card reveal d${i+1}`} style={{ padding: 32, borderRadius: 24, borderTop: pl.popular ? `2px solid ${p.color}` : '2px solid transparent', position: 'relative', overflow: 'hidden' }}>
                {pl.popular && <div style={{ position: 'absolute', top: 0, right: 0, background: p.color, color: '#07101e', fontSize: 9, fontWeight: 800, padding: '4px 12px', letterSpacing: '0.1em', borderBottomLeftRadius: 10 }}>MOST POPULAR</div>}
                <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{pl.name}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 36, fontWeight: 700, color: pl.popular ? p.color : '#fff', letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 4 }}>{pl.price}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>{pl.period}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 28 }}>
                  {pl.features.map((f: string, j: number) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                      <CheckCircle2 size={13} color={p.color} strokeWidth={2} />{f}
                    </div>
                  ))}
                </div>
                <a href={`https://socialninjas.in/#/app/content-studio?plan=${pl.name.toLowerCase()}`}>
                  <button className="btn-primary" style={{ width: '100%', fontSize: 14, padding: '13px 0', background: pl.popular ? `linear-gradient(135deg,${p.color}cc,${p.color})` : undefined }}>Get Started →</button>
                </a>
              </div>
            ))}
          </div>
          <p className="reveal" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', marginTop: 20, fontSize: 12 }}>No contracts. Cancel anytime. All prices in INR.</p>
        </div>
      )}

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${p.color}50,transparent)` }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4vw,50px)', fontWeight: 700, letterSpacing: '-2px', marginBottom: 14, color: 'rgba(255,255,255,0.96)', lineHeight: 1.06 }}>
            {isLive ? 'Try it free. See it work.' : 'Be first in line.'}
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
            {isLive ? 'Get 3 complete posts written for your brand right now. No credit card, no commitment. Just see what it can do.' : 'Join the waitlist and be the first to try it when it launches.'}
          </p>
          <a href={p.tryLink}><button className="btn-primary" style={{ fontSize: 15, padding: '15px 40px', background: `linear-gradient(135deg,${p.color}cc,${p.color})` }}>
            {isLive ? '⚡ Try 3 Posts Free' : 'Join Waitlist →'}
          </button></a>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.hero-grid-cols,.three-cols,.four-cols{grid-template-columns:1fr!important;gap:28px!important;}}
        .last-no-border:last-child{border-right:none!important;}
      `}</style>
    </div>
  );
};
export default AIProductLanding;
