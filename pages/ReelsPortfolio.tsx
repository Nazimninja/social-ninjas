import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause,
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';

interface ReelVideo {
  id: string;
  niche: string;
  title: string;
  hook: string;
  metric: string;
  videoSrc?: string;
  posterBg: string;
  captionPreview: string;
}

const REELS: ReelVideo[] = [
  {
    id: 'aesthetics',
    niche: 'Med Spas & Aesthetic Clinics',
    title: 'HydraFacial Glow & Barrier Repair',
    hook: '"Stop booking facials until you check this 1 skin barrier sign..."',
    metric: '42 Direct Inquiries',
    videoSrc: '/videos/aesthetics.mp4',
    posterBg: 'from-[#121929] via-[#0d121c] to-[#07090e]',
    captionPreview: 'Notice how the texture immediately smooths out after step 2? Most clinics skip this step...'
  },
  {
    id: 'interior',
    niche: 'Interior Design & Architecture',
    title: '4,200 sq.ft Luxury Penthouse Tour',
    hook: '"We almost said no to this floorplan until we built this hidden island..."',
    metric: '16 High-Ticket Bookings',
    videoSrc: '/videos/interior.mp4',
    posterBg: 'from-[#181a24] via-[#10121a] to-[#07090e]',
    captionPreview: 'The fluted marble island wasn’t in the original blueprint. Here is why we insisted on it...'
  },
  {
    id: 'fitness',
    niche: 'Boutique Fitness & Performance',
    title: 'Squat Form Diagnostic & Technique',
    hook: '"If your knees cave in during squats, stop doing leg extensions."',
    metric: '38 Intro Passes Claimed',
    videoSrc: '/videos/fitness.mp4',
    posterBg: 'from-[#0f172a] via-[#0b1120] to-[#07090e]',
    captionPreview: 'Push the floor apart with your mid-foot. Watch how the hip angle shifts instantly...'
  }
];

const ReelsPortfolio: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I checked your 4-Reel Starter on the website. I want to test this for my business. Can we talk?"
  )}`;

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="page-wrap bg-[#07090e] text-neutral-300 selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="High-Retention Reels Studio for Aesthetics, Clinics & Modern Brands | Social Ninja's"
        description="Turn raw phone clips into high-converting video assets that stop the scroll and fill your booking calendar. Explore samples and start the $200 4-Reel Trial."
      />

      {/* ─── HERO SECTION (CLEAN & DIRECT) ─── */}
      <AuroraBackground className="pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} className="text-[#38bdf8]" />
            Short-Form Video Production
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            High-Retention Reels That Turn <br />
            <span className="bg-gradient-to-r from-white via-neutral-100 to-[#38bdf8] bg-clip-text text-transparent">
              Scrollers Into Paying Clients.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            You shoot quick 5-second clips on your phone. We produce high-retention Reels with proven hooks, kinetic subtitles, and sound design that fill your calendar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
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
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> Shot on Standard iPhone / Android
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> 10-Day Guaranteed Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> Zero Long-Term Commitment
            </span>
          </div>
        </div>
      </AuroraBackground>

      {/* ─── 3 CLEAN VIDEO SHOWCASE CARDS (NO TABS, STRAIGHT TO THE POINT) ─── */}
      <section className="py-20 max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            Creative Work &amp; Formats
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Recent Retention-Engineered Reels
          </h2>
          <p className="text-sm text-neutral-400">
            Engineered specifically to capture local intent and convert profile visits into inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REELS.map((reel) => {
            const isPlaying = playingId === reel.id;

            return (
              <SpotlightCard 
                key={reel.id}
                className="p-4 sm:p-5 bg-[#0e121d] border border-white/[0.08] rounded-3xl space-y-4 flex flex-col justify-between"
              >
                {/* 9:16 Smartphone Mockup Frame */}
                <div className={`relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b ${reel.posterBg} p-4 flex flex-col justify-between shadow-2xl`}>
                  
                  {/* Top Header inside phone */}
                  <div className="relative z-10 flex items-center justify-between text-[11px]">
                    <span className="px-2.5 py-1 rounded-md font-bold text-[10px] tracking-wider uppercase bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
                      {reel.niche}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                      0:18
                    </span>
                  </div>

                  {/* Middle: Video or Simulated Hook Overlay */}
                  <div className="relative z-10 my-auto text-center space-y-3 px-2">
                    <div className="inline-block px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#38bdf8]">
                        ⚡ 1.2s Pattern Interrupt Hook
                      </p>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-md">
                      {reel.hook}
                    </h4>

                    {/* Play/Pause Button */}
                    <button
                      onClick={() => togglePlay(reel.id)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1F4B99] hover:bg-[#153880] text-white text-xs font-bold shadow-lg shadow-[#1F4B99]/30 transition-transform active:scale-95"
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
                      <span>{isPlaying ? 'Pause Preview' : 'Play Preview'}</span>
                    </button>
                  </div>

                  {/* Bottom: Kinetic Subtitle Bar */}
                  <div className="relative z-10 p-3 rounded-xl bg-[#101422]/90 backdrop-blur-md border border-white/[0.08] space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                        Kinetic Subtitle Engine
                      </span>
                      <Volume2 size={12} className="text-[#38bdf8] animate-pulse" />
                    </div>
                    <p className="text-xs text-neutral-200 italic leading-snug line-clamp-2">
                      "{reel.captionPreview}"
                    </p>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="space-y-3 pt-1">
                  <div>
                    <h3 className="font-bold text-white text-base">{reel.title}</h3>
                    <p className="text-xs text-[#38bdf8] font-semibold mt-0.5">{reel.metric}</p>
                  </div>

                  <a
                    href={`https://wa.me/918147757479?text=${encodeURIComponent(
                      `Hey Nazim, I like the "${reel.title}" Reel style. Can you produce something like this for my business?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#121724] hover:bg-[#182136] border border-white/[0.08] text-white transition-colors"
                  >
                    <MessageCircle size={14} className="text-[#38bdf8]" />
                    Request This Style for Your Page
                  </a>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* ─── SIMPLE 3-STEP PROCESS ─── */}
      <section className="py-16 bg-[#0c0c0e] border-y border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Zero Friction
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How It Works (15 Mins of Your Week)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base">Shoot on Your Phone</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We send you a 5-bullet shot list tailored to your clinic or business. You shoot quick raw clips during normal appointments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base">Drop into Google Drive</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload raw video files to your private folder. No video editing software, scripts, or complicated briefs required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
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
              <span><strong>Kinetic Dynamic Captions</strong> &amp; animations</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>Sound Design</strong> &amp; trending audio selection</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>10-Day Guaranteed Delivery</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
              <span><strong>48-Hour Revisions</strong> included</span>
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
