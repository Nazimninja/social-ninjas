import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';

interface ShowcaseReel {
  id: string;
  reelId: string;
  category: string;
  creator: string;
  title: string;
  highlight: string;
  cleanUrl: string;
  embedUrl: string;
  ctaMessage: string;
}

const SHOWCASE_REELS: ShowcaseReel[] = [
  {
    id: 'automotive-luxury',
    reelId: 'DXZRFYTESme',
    category: 'Automotive & Luxury',
    creator: '@9thgear_',
    title: 'BMW iX vs. Mercedes EQS Comparison',
    highlight: '52K+ Views • High-Aesthetic Sensory Edit',
    cleanUrl: 'https://www.instagram.com/reel/DXZRFYTESme/',
    embedUrl: 'https://www.instagram.com/reel/DXZRFYTESme/embed/',
    ctaMessage: 'Hey Nazim, I love the Luxury Automotive Reel style on your samples page. Can we produce this for my brand?'
  },
  {
    id: 'hook-strategy',
    reelId: 'Dey4nf4B3Wg',
    category: 'Retention & Hook Strategy',
    creator: '@hellowjai',
    title: 'Saurabh Joshi Immediate Payoff Breakdown',
    highlight: '587K+ Views • 18.9K Likes • 1.2s Retention Hook',
    cleanUrl: 'https://www.instagram.com/reel/Dey4nf4B3Wg/',
    embedUrl: 'https://www.instagram.com/reel/Dey4nf4B3Wg/embed/',
    ctaMessage: 'Hey Nazim, I want high-retention hook strategy Reels like the one on your samples page. How do we start?'
  },
  {
    id: 'kinetic-explainer',
    reelId: 'DanU-jWK_bP',
    category: 'Kinetic Motion Explainer',
    creator: '@rohitiyerexplains',
    title: 'Mercedes Naming Decoded & Explained',
    highlight: '79K+ Likes • Kinetic Motion Graphics & Subtitles',
    cleanUrl: 'https://www.instagram.com/reel/DanU-jWK_bP/',
    embedUrl: 'https://www.instagram.com/reel/DanU-jWK_bP/embed/',
    ctaMessage: 'Hey Nazim, I want kinetic educational explainers like the Rohit Iyer sample. Can we talk?'
  },
  {
    id: 'brand-authority',
    reelId: 'Dcs_ND2vUsc',
    category: 'Brand Story & Leadership',
    creator: '@kccinstitutes',
    title: 'Marcus Aurelius: 5 Rules for Leadership',
    highlight: '309K+ Views • 38K Likes • Cinematic Pacing',
    cleanUrl: 'https://www.instagram.com/reel/Dcs_ND2vUsc/',
    embedUrl: 'https://www.instagram.com/reel/Dcs_ND2vUsc/embed/',
    ctaMessage: 'Hey Nazim, I love the Brand Leadership Reel style on your samples page. Can we create this for my business?'
  }
];

const ReelsPortfolio: React.FC = () => {
  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I checked your 4-Reel Starter on the website. I want to test this for my business. Can we talk?"
  )}`;

  return (
    <div className="page-wrap bg-[#07090e] text-neutral-300 selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="High-Retention Reels Studio & Conversion Showcase | Social Ninja's"
        description="Review real high-retention Instagram Reels engineered to convert viewers into booked clients. Explore our 4 proven editing styles and start the $200 4-Reel Trial."
      />

      {/* ─── HERO SECTION ─── */}
      <AuroraBackground className="pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} className="text-[#38bdf8]" />
            High-Retention Creative Studio
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            High-Retention Reels That Turn <br />
            <span className="bg-gradient-to-r from-white via-neutral-100 to-[#38bdf8] bg-clip-text text-transparent">
              Scrollers Into Paying Clients.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            You shoot quick 5-second clips on your phone. We engineer high-retention Reels with pattern-interrupt hooks, kinetic subtitles, and sound design that fill your booking calendar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#starter-trial" className="w-full sm:w-auto">
              <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] shadow-lg shadow-[#1F4B99]/25 text-white">
                Claim 4-Reel Starter ($200) <ArrowRight size={16} />
              </ShinyButton>
            </a>
            <a 
              href={whatsappDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.08] transition-colors"
            >
              <MessageCircle size={16} className="text-[#38bdf8]" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> Shot on Standard Phone
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> 10-Day Guaranteed Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> 100% Money-Back Guarantee
            </span>
          </div>
        </div>
      </AuroraBackground>

      {/* ─── 4 REAL INSTAGRAM REEL SHOWCASE CARDS (CLEAN 2x2 GRID) ─── */}
      <section className="py-20 max-w-[1020px] mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            Proven Client Work
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Real High-Retention Reels In Action
          </h2>
          <p className="text-sm text-neutral-400">
            From high-ticket brand storytelling to viral kinetic breakdowns. Click play on any Reel below to review our production standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SHOWCASE_REELS.map((reel) => (
            <SpotlightCard 
              key={reel.id}
              className="p-5 bg-[#0e121d] border border-white/[0.08] rounded-3xl space-y-4 flex flex-col justify-between hover:border-white/[0.18] transition-all shadow-xl"
            >
              {/* Card Header: Category & Clean Instagram Link */}
              <div className="flex items-center justify-between pb-1">
                <span className="px-3 py-1 rounded-full font-bold text-[11px] tracking-wider uppercase bg-[#1F4B99]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                  {reel.category}
                </span>
                <a
                  href={reel.cleanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                  title="Open Reel on Instagram"
                >
                  <span>{reel.creator}</span>
                  <ExternalLink size={13} className="text-[#38bdf8]" />
                </a>
              </div>

              {/* Clean Instagram Embed Container (Without Any Referral Popups) */}
              <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-black border border-white/[0.1] shadow-2xl flex items-center justify-center">
                <iframe
                  src={reel.embedUrl}
                  className="w-full h-full border-0 rounded-2xl bg-black"
                  scrolling="no"
                  allowTransparency={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={reel.title}
                  loading="lazy"
                />
              </div>

              {/* Card Meta & Direct Action */}
              <div className="space-y-3 pt-1">
                <div>
                  <h3 className="font-bold text-white text-base leading-snug">
                    {reel.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-1">
                    <TrendingUp size={13} />
                    <span>{reel.highlight}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918147757479?text=${encodeURIComponent(reel.ctaMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#1F4B99] hover:bg-[#153880] text-white shadow-md shadow-[#1F4B99]/20 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle size={14} />
                  Get This Editing Style on WhatsApp
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ─── SIMPLE 3-STEP PROCESS (ZERO FRICTION) ─── */}
      <section className="py-16 bg-[#0c0d12] border-y border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Zero Friction Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How It Works (15 Mins of Your Week)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base">Shoot on Your Phone</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We send you a 5-bullet shot list tailored to your clinic or business. You shoot quick raw clips during normal appointments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base">Drop into Google Drive</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload raw video files to your private folder. No video editing software, scripts, or complicated briefs required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-white text-base">Receive 4 Finished Reels</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Within 10 days, all 4 high-retention Reels are delivered with plug-and-play captions and trending audio links ready to post.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE $200 STARTER TRIAL CARD (THE SINGLE CALL TO ACTION) ─── */}
      <section id="starter-trial" className="py-20 max-w-[800px] mx-auto px-4 sm:px-6">
        <SpotlightCard className="p-8 sm:p-12 bg-[#0e121d] border-2 border-[#38bdf8]/40 rounded-3xl shadow-2xl relative overflow-hidden space-y-7">
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#38bdf8] text-[#07090e] shadow-md shadow-[#38bdf8]/20">
                ★ 4-Reel Starter Trial
              </span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                <Clock size={13} className="text-[#38bdf8]" />
                10-Day Turnaround
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Test Our Creative Quality With Zero Risk.
              </h2>
              <p className="text-sm text-neutral-400 mt-2">
                Get 4 high-retention Reels produced for your business before considering any long-term retainer.
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-[#07090e] border border-white/[0.08] flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$200</span>
              <span className="text-neutral-400 text-sm">flat one-time (approx. ₹16,500)</span>
            </div>
            <span className="text-xs font-semibold text-[#38bdf8]">
              No Recurring Charge
            </span>
          </div>

          {/* Included Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>4 Custom 9:16 Reels</strong> from your raw clips</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>High-Hook Scripting</strong> &amp; research</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>Kinetic Dynamic Captions</strong> &amp; sound design</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>10-Day Guaranteed Delivery</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>48-Hour Revisions</strong> included</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>100% Money-Back Guarantee</strong></span>
            </div>
          </div>

          {/* 100% Guarantee Box */}
          <div className="p-4 rounded-2xl bg-[#101422] border border-[#38bdf8]/30 flex items-start gap-3.5">
            <ShieldCheck size={24} className="text-[#38bdf8] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                100% "Love It Or Get Refunded" Guarantee
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If you review the first finished Reel and feel the quality doesn't match your brand, we will refund your $200 immediately. No questions asked.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={whatsappDirectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] text-white">
                  <MessageCircle size={16} />
                  Start 4-Reel Trial on WhatsApp
                </ShinyButton>
              </a>
              <a 
                href="https://ig.me/m/nazim_ninja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] border border-white/[0.08] text-white transition-colors"
              >
                <Smartphone size={16} className="text-[#38bdf8]" />
                DM on Instagram (@nazim_ninja)
              </a>
            </div>
          </div>

        </SpotlightCard>
      </section>

      {/* ─── FINAL FOOTER CTA ─── */}
      <div className="py-14 bg-gradient-to-t from-black to-[#07090e] border-t border-white/[0.08] text-center space-y-4 px-4">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Ready to turn phone clips into booked clients?
        </h3>
        <div className="flex items-center justify-center gap-4 pt-2">
          <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer">
            <ShinyButton variant="primary" className="text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] text-white">
              <MessageCircle size={16} />
              Message Nazim on WhatsApp
            </ShinyButton>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReelsPortfolio;
