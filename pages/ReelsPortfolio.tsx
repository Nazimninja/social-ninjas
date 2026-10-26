import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  MessageCircle, 
  Smartphone, 
  Clock, 
  TrendingUp, 
  Eye, 
  Volume2, 
  Film, 
  Send,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Check,
  RotateCcw,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  FileText,
  UserCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';
import { submitToGoogleSheets } from '../services/googleSheets';

interface ReelTeardown {
  id: string;
  niche: 'aesthetics' | 'interior' | 'fitness';
  badge: string;
  clientType: string;
  title: string;
  hook: string;
  videoSrc?: string;
  rawIssues: string[];
  retentionFixes: string[];
  inquiryMetric: string;
  holdRate: string;
  reach: string;
  audioTrack: string;
  colorGrade: string;
}

const TEARDOWNS: ReelTeardown[] = [
  {
    id: 'aesthetics',
    niche: 'aesthetics',
    badge: 'Aesthetic Clinic & Med Spa',
    clientType: 'Cosmetic Clinic & Skin Studio',
    title: 'HydraFacial Glow & Barrier Repair Reveal',
    hook: '"Stop booking facials until you check this 1 skin barrier sign..."',
    videoSrc: '/videos/aesthetics.mp4',
    rawIssues: [
      'Overhead yellow clinic lighting made skin look dull',
      'Uncut 12-second clips with zero visual progression',
      'No subtitles — 70% of followers scrolled past on mute'
    ],
    retentionFixes: [
      'Sub-1.2s micro-hook with high-contrast curiosity title',
      'Clinical color grading (true skin tone & natural luminosity)',
      'Kinetic animated subtitles with emphasis highlights',
      'Sound design: crisp micro-suction & barrier hydration audio'
    ],
    inquiryMetric: '42 Direct Inquiries',
    holdRate: '84% 3-Sec Hold',
    reach: '58.4K Local Reach',
    audioTrack: 'Ambient Lofi Beat (Trending Niche Audio)',
    colorGrade: 'Neutral 5500K Glow Grade'
  },
  {
    id: 'interior',
    niche: 'interior',
    badge: 'Interior Design & Staging',
    clientType: 'Architecture & Luxury Living',
    title: '4,200 sq.ft Minimalist Penthouse Walkthrough',
    hook: '"We almost said no to this floorplan until we built this hidden island..."',
    videoSrc: '/videos/interior.mp4',
    rawIssues: [
      'Slow, shaky phone pan across rooms feeling like raw CCTV footage',
      'Generic copyright-free elevator music that felt corporate',
      'No architectural callouts or reason for viewers to save the post'
    ],
    retentionFixes: [
      'Beat-matched cuts every 0.8s on the musical tempo',
      'Cinematic motion stabilization and architectural whip-pans',
      'Material callout badges (Fluted Italian Quartz, Walnut Joinery)',
      'Direct save/share prompt generating 400+ bookmark saves'
    ],
    inquiryMetric: '16 Consultation Bookings',
    holdRate: '89% Completion',
    reach: '73.2K Reach',
    audioTrack: 'Deep House / Rhythmic Bass Drop',
    colorGrade: 'Architectural Warm Charcoal'
  },
  {
    id: 'fitness',
    niche: 'fitness',
    badge: 'Boutique Fitness & Wellness',
    clientType: 'Pilates, Strength & Performance Studios',
    title: 'Squat Form Diagnostic & Member PR Transformation',
    hook: '"If your knees cave in during squats, stop doing leg extensions."',
    videoSrc: '/videos/fitness.mp4',
    rawIssues: [
      'Heavy gym background noise drowned out coach instructions',
      'Static angle from the floor with zero anatomical focus',
      'Ended abruptly with no incentive for local viewers to try a class'
    ],
    retentionFixes: [
      'AI audio isolation making coach voice crystal clear studio quality',
      'Animated joint trajectory arrows and muscle tension highlights',
      'Dynamic speed ramps (slow-mo on the lift, snap cut on the lockout)',
      'Local introductory pass CTA pinned in caption and end-card'
    ],
    inquiryMetric: '38 Intro Passes Claimed',
    holdRate: '79% Avg Watch Time',
    reach: '64.1K Views',
    audioTrack: 'Energetic Phonk / Hip-Hop Beat',
    colorGrade: 'High-Contrast Athletic Slate'
  }
];

const ReelsPortfolio: React.FC = () => {
  const [activeNiche, setActiveNiche] = useState<'aesthetics' | 'interior' | 'fitness'>('aesthetics');
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form submission state
  const [formState, setFormState] = useState({
    name: '',
    instagram: '',
    contact: '',
    niche: 'Aesthetic Clinic / Med Spa'
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const currentTeardown = TEARDOWNS.find(t => t.niche === activeNiche) || TEARDOWNS[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.instagram || !formState.contact) return;
    setSubmitStatus('submitting');

    try {
      await submitToGoogleSheets({
        type: 'Leads',
        name: formState.name || 'Reels Portfolio Lead',
        instagram: formState.instagram,
        contact: formState.contact,
        niche: formState.niche,
        source: 'Reels Portfolio Showcase ($200 Trial Page)',
        date: new Date().toISOString()
      });
      setSubmitStatus('success');
    } catch (err) {
      console.error(err);
      setSubmitStatus('success');
    }
  };

  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I checked your 4-Reel Starter samples on the website. I want to test this for my business. Can we talk?"
  )}`;

  return (
    <div className="page-wrap bg-[#07090e] text-neutral-300 selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="High-Retention Reels Studio for Aesthetics, Clinics & Modern Brands | Social Ninja's"
        description="Turn raw phone clips into high-converting video assets that stop the scroll and fill your booking calendar. Explore samples and start the $200 4-Reel Trial."
      />

      {/* ─── HERO SECTION ─── */}
      <AuroraBackground className="pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} className="text-[#38bdf8]" />
            High-Retention Reels & Short-Form Studio
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Turn Raw Phone Clips Into <br />
            <span className="bg-gradient-to-r from-white via-neutral-100 to-[#38bdf8] bg-clip-text text-transparent">
              High-Paying Client Inquiries.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Engineered specifically for aesthetic clinics, interior designers, and modern service businesses. 
            You shoot quick 5-second clips on your phone — we produce high-retention Reels that stop the scroll and book appointments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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

          {/* Clean Trust Pillars */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-neutral-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38bdf8]" />
              <span>Shot on Standard iPhone / Android</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38bdf8]" />
              <span>10-Day Guaranteed Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38bdf8]" />
              <span>Zero Long-Term Contract</span>
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* ─── INTERACTIVE BEFORE / AFTER REEL SHOWCASE ─── */}
      <section className="py-20 border-b border-white/[0.08] bg-[#0c0c0e]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                Interactive Teardown Studio
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                See The Transformation Live
              </h2>
              <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                Compare raw unedited client clips with our retention-engineered final cut. Toggle between Before &amp; After below.
              </p>
            </div>

            {/* Niche Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-[#101116] rounded-xl border border-white/[0.08] overflow-x-auto">
              {(['aesthetics', 'interior', 'fitness'] as const).map((niche) => (
                <button
                  key={niche}
                  onClick={() => setActiveNiche(niche)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    activeNiche === niche
                      ? 'bg-[#38bdf8] text-[#0c0c0e] shadow-md shadow-[#38bdf8]/20 font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {niche === 'aesthetics' && 'Med Spas & Clinics'}
                  {niche === 'interior' && 'Interiors & Spaces'}
                  {niche === 'fitness' && 'Boutique Fitness'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Player & Teardown Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Phone Mockup Frame (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[9/17] bg-[#101116] rounded-[40px] p-3 border-4 border-neutral-800 shadow-2xl shadow-[#38bdf8]/5 flex flex-col">
                
                {/* Speaker Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-neutral-950" />
                </div>

                {/* Inner Screen Container */}
                <div className={`relative w-full h-full rounded-[30px] overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 ${
                  viewMode === 'video'
                    ? 'bg-black'
                    : viewMode === 'after'
                    ? 'bg-gradient-to-b from-[#10141f] via-[#0d1017] to-[#07090e]'
                    : 'bg-neutral-900/90'
                }`}>
                  
                  {/* Top Bar with Mode Pill */}
                  <div className="relative z-20 pt-4 flex items-center justify-between text-[11px]">
                    <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] tracking-wider uppercase border ${
                      viewMode === 'after'
                        ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/40'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                    }`}>
                      {viewMode === 'after' ? '✓ Retention-Engineered Cut' : '✕ Raw Phone Footage'}
                    </span>

                    <span className="text-neutral-400 font-mono text-[10px]">
                      0:18
                    </span>
                  </div>

                  {/* Middle Hook Graphic */}
                  <div className="relative z-10 my-auto text-center space-y-3 px-2">
                    {viewMode === 'after' ? (
                      <div className="space-y-3 animate-fade-in-up">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1F4B99]/40 border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] font-black tracking-wider uppercase">
                          <Zap size={11} /> 1.2s Pattern Interrupt
                        </div>
                        <h4 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-md">
                          {currentTeardown.hook}
                        </h4>
                        <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                          <Volume2 size={12} className="text-[#38bdf8] animate-pulse" />
                          <span>{currentTeardown.audioTrack}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 opacity-60">
                        <div className="inline-block px-2.5 py-0.5 rounded bg-neutral-800 text-neutral-400 text-[10px] font-mono">
                          No Hook / Slow Panning
                        </div>
                        <p className="text-xs text-neutral-400 italic">
                          "Hey everyone, welcome back to our clinic... today we're showing..."
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Subtitle Bar */}
                  <div className="relative z-10 space-y-3">
                    {viewMode === 'after' ? (
                      <div className="p-3 rounded-xl bg-[#121622]/90 backdrop-blur-md border border-white/[0.08] space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-white flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                            Kinetic Subtitle
                          </span>
                          <span className="text-[#38bdf8] font-bold text-[9px] uppercase">
                            High-Contrast
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-white leading-snug">
                          "Watch how the hydration barrier recovers within 48 hours..."
                        </p>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-center">
                        <span className="text-[10px] text-neutral-400">
                          ✕ No Subtitles (72% scroll past on mute)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Mode Toggle Switch on the phone */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/90 backdrop-blur-md rounded-xl border border-white/[0.08] relative z-30">
                    <button
                      onClick={() => setViewMode('after')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                        viewMode === 'after'
                          ? 'bg-[#38bdf8] text-[#0c0c0e] font-black shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Social Ninja's Cut
                    </button>
                    <button
                      onClick={() => setViewMode('before')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                        viewMode === 'before'
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Raw Clips
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Teardown Deep Dive (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1F4B99]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                  {currentTeardown.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                  {currentTeardown.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Engineered for {currentTeardown.clientType}
                </p>
              </div>

              {/* Verified Metrics Row */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#101116] rounded-2xl border border-white/[0.08]">
                <div>
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Bookings / Leads</p>
                  <p className="text-base sm:text-lg font-black text-[#38bdf8] mt-0.5">{currentTeardown.inquiryMetric}</p>
                </div>
                <div className="border-x border-white/[0.06] px-3">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Attention Hold</p>
                  <p className="text-base sm:text-lg font-black text-white mt-0.5">{currentTeardown.holdRate}</p>
                </div>
                <div className="pl-2">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase">Organic Reach</p>
                  <p className="text-base sm:text-lg font-black text-white mt-0.5">{currentTeardown.reach}</p>
                </div>
              </div>

              {/* Side-by-Side Breakdown List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* What Was Wrong */}
                <div className="p-4 rounded-xl bg-[#121215] border border-white/[0.06] space-y-2.5">
                  <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-600" />
                    The Raw Footage Bottlenecks
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-400">
                    {currentTeardown.rawIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-neutral-500 font-bold shrink-0">✕</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Engineered */}
                <div className="p-4 rounded-xl bg-[#101524] border border-[#38bdf8]/30 space-y-2.5">
                  <span className="text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#38bdf8]" />
                    Social Ninja's Retention Upgrades
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-200">
                    {currentTeardown.retentionFixes.map((fix, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={13} className="text-[#38bdf8] shrink-0 mt-0.5" />
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Direct Action for this style */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/918147757479?text=${encodeURIComponent(
                    `Hey Nazim, I want this "${currentTeardown.title}" Reel style for my business.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#1F4B99] hover:bg-[#153880] text-white transition-colors shadow-md shadow-[#1F4B99]/30"
                >
                  <MessageCircle size={14} />
                  Request This Style for Your Page
                </a>
                <span className="text-xs text-neutral-400">
                  Turnaround: 48h for first draft
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── THE CLINIC / BUSINESS ROI MATH (WHY $200 IS A NO-BRAINER) ─── */}
      <section className="py-20 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            The Economics of Short-Form
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Why Closing Just 1 Client Pays For The Entire Test
          </h2>
          <p className="text-sm text-neutral-400">
            Most businesses spend thousands on broad agency retainers. Here is the direct math on our 4-Reel Starter trial:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard className="p-6 bg-[#101116] border border-white/[0.08] rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <Eye size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase font-mono">Step 1: Local Attention</p>
              <h3 className="text-lg font-bold text-white mt-1">12,000–35,000 Views</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              4 retention-engineered Reels reach real local prospects within your city who are already interested in treatments, renovations, or training.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-[#101116] border border-white/[0.08] rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase font-mono">Step 2: Profile &amp; Inquiries</p>
              <h3 className="text-lg font-bold text-white mt-1">15–40 Inbound DMs</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Clear low-friction calls to action ("Comment GLOW for consultation pricing") funnel active scrollers directly into your Instagram inbox.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6 bg-[#101524] border border-[#38bdf8]/40 rounded-2xl space-y-4 shadow-lg shadow-[#38bdf8]/10">
            <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/20 border border-[#38bdf8]/50 flex items-center justify-center text-[#38bdf8]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs text-[#38bdf8] uppercase font-mono">Step 3: Revenue Return</p>
              <h3 className="text-lg font-bold text-white mt-1">$450 – $2,500+ Closed</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Closing just <strong>one single client</strong> or treatment appointment recovers the $200 trial 2× to 10× over — and all 4 video assets remain yours forever.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* ─── COMPLETE DELIVERABLES BREAKDOWN (WHAT'S IN THE BOX) ─── */}
      <section className="py-20 border-y border-white/[0.08] bg-[#0c0c0e]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Zero Guesswork
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              What You Receive in the 4-Reel Trial
            </h2>
            <p className="text-sm text-neutral-400">
              A complete, plug-and-play video delivery. You don't write scripts, you don't research sounds, you don't edit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-white text-base">4 High-Retention Reels</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Rendered in 1080×1920 60fps vertical format, optimized for Instagram Reels, TikTok, and YouTube Shorts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-white text-base">1-Page Shot List</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                A dead-simple 5-bullet guide telling you exactly what 5 clips to record during your clinic appointments. Takes 10 minutes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-white text-base">Ready-to-Paste Captions</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                High-converting caption copy, keyword-optimized SEO tags, and direct-response DM triggers for every single Reel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h4 className="font-bold text-white text-base">Trending Audio Links</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct Instagram sound links chosen for viral algorithmic push without any commercial copyright strikes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── THE $200 STARTER OFFER CARD WITH IRONCLAD GUARANTEE ─── */}
      <section id="starter-trial" className="py-24 max-w-[800px] mx-auto px-4 sm:px-6">
        <SpotlightCard className="p-8 sm:p-12 bg-[#0e121d] border-2 border-[#38bdf8]/40 rounded-3xl shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#38bdf8] text-[#07090e] shadow-md shadow-[#38bdf8]/20">
                ★ 4-Reel Growth Trial
              </span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                <Clock size={13} className="text-[#38bdf8]" />
                Limited to 4 New Brands / Week
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Test Our Creative Quality With Zero Risk.
              </h2>
              <p className="text-sm text-neutral-400 mt-2">
                Experience the impact of retention editing on your own business before considering any recurring monthly retainer.
              </p>
            </div>
          </div>

          {/* Pricing Highlight Box */}
          <div className="p-5 rounded-2xl bg-[#07090e] border border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$200</span>
              <span className="text-neutral-400 text-sm">one-time flat (approx. ₹16,500)</span>
            </div>
            <span className="text-xs font-semibold text-[#38bdf8]">
              Zero Recurring Commitment
            </span>
          </div>

          {/* Included Features Checklist */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Included in the 4-Reel Package:
            </p>
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
          </div>

          {/* 100% Ironclad Money-Back Guarantee Box */}
          <div className="p-4 rounded-2xl bg-[#101422] border border-[#38bdf8]/30 flex items-start gap-3.5">
            <ShieldCheck size={24} className="text-[#38bdf8] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                100% "Love It Or Get Refunded" Guarantee
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If you review the first finished Reel and feel the quality doesn't match your brand's aesthetic, we will refund your $200 immediately. No arguments, no fine print.
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
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
                  Start Trial on WhatsApp
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
            
            <p className="text-center text-[11px] text-neutral-400">
              Direct checkout link or invoice provided immediately upon confirmation.
            </p>
          </div>

        </SpotlightCard>
      </section>

      {/* ─── FREE 60-SEC REEL HOOK AUDIT (MICRO-COMMITMENT FORM) ─── */}
      <section className="py-16 max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e121d] border border-white/[0.08] space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Want To See Ideas First?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Get 2 Custom Reel Concepts for Your Profile
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
              Drop your Instagram handle below. Nazim will inspect your current feed and send you 2 high-converting video hooks for your business within 24 hours — 100% free.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="p-6 rounded-2xl bg-[#101827] border border-[#38bdf8]/40 text-center space-y-2">
              <CheckCircle2 size={32} className="text-[#38bdf8] mx-auto" />
              <p className="text-base font-bold text-white">We're reviewing your profile!</p>
              <p className="text-xs text-neutral-300">
                Nazim will message your Instagram/WhatsApp with your 2 custom video concepts within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Name / Business</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah / Glow Aesthetics"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090e] border border-white/[0.08] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. @yourclinic"
                    value={formState.instagram}
                    onChange={(e) => setFormState({ ...formState, instagram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090e] border border-white/[0.08] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Email or WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    placeholder="Where should we send your concepts?"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090e] border border-white/[0.08] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Niche</label>
                  <select
                    value={formState.niche}
                    onChange={(e) => setFormState({ ...formState, niche: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#07090e] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    <option value="Aesthetic Clinic / Med Spa">Aesthetic Clinic / Med Spa</option>
                    <option value="Interior Design / Architecture">Interior Design / Architecture</option>
                    <option value="Boutique Fitness / Wellness">Boutique Fitness / Wellness</option>
                    <option value="Other Modern Business">Other Modern Business</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1F4B99] to-[#38bdf8] text-white hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#1F4B99]/30"
              >
                {submitStatus === 'submitting' ? (
                  <span>Reviewing Profile...</span>
                ) : (
                  <>
                    <Send size={15} />
                    Send Me 2 Free Custom Reel Concepts
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ─── FREQUENTLY ASKED QUESTIONS ─── */}
      <section className="py-20 max-w-[800px] mx-auto px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="text-center space-y-2 mb-10">
          <h3 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-neutral-400">Everything you need to know about the 4-Reel Starter trial.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Do I need expensive camera or studio lighting?",
              a: "Not at all. Standard iPhone or Android phone videos shot in natural salon or studio lighting actually perform better on Instagram than over-produced corporate video commercials because viewers perceive them as authentic and relatable."
            },
            {
              q: "What if I am busy and don't know what to film?",
              a: "As soon as you begin the trial, we send you a simple 5-bullet shot list customized for your clinic or studio. You simply record quick 5-second B-roll clips during your routine appointments without disrupting your schedule."
            },
            {
              q: "How fast do we receive our completed 4 Reels?",
              a: "Within 10 days of uploading your raw phone clips into our shared Google Drive folder, all 4 edited, color-graded, and captioned Reels are delivered."
            },
            {
              q: "What happens after the 4-Reel trial ends?",
              a: "There is zero obligation or automatic renewal. If you love the inquiries and want an ongoing monthly content system, we offer recurring retainers (8, 12, or 16 Reels/month). If not, you walk away with 4 high-performing video assets."
            },
            {
              q: "How does the 100% money-back guarantee work?",
              a: "When we deliver your first completed Reel draft, if you feel the editing style doesn't align with your clinic's brand, simply tell us. We will issue an immediate 100% refund of your $200 payment."
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="rounded-xl bg-[#0e121d] border border-white/[0.08] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#38bdf8] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-neutral-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.06] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL STICKY BOTTOM ACTION BANNER ─── */}
      <div className="py-14 bg-gradient-to-t from-black to-[#07090e] border-t border-white/[0.08] text-center space-y-4 px-4">
        <p className="text-xs uppercase tracking-widest text-[#38bdf8] font-mono">
          Ready to turn scrollers into booked consultations?
        </p>
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Claim Your 4-Reel Starter Today for $200.
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
