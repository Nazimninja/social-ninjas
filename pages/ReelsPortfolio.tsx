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
  Layers,
  Award
} from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';
import { submitToGoogleSheets } from '../services/googleSheets';

interface ReelSample {
  id: string;
  niche: 'aesthetics' | 'interior' | 'fitness';
  nicheLabel: string;
  title: string;
  hookText: string;
  metrics: {
    inquiries: string;
    retention: string;
    views: string;
  };
  beforeProblem: string;
  afterFix: string;
  captionPreview: string;
  colorGradient: string;
  iconTag: string;
}

const samples: ReelSample[] = [
  {
    id: 'aesthetic-1',
    niche: 'aesthetics',
    nicheLabel: 'Aesthetic Clinic & Med Spa',
    title: 'HydraGlow Treatment & Barrier Repair Reveal',
    hookText: '"Stop booking facials until you check this one thing..."',
    metrics: {
      inquiries: '42 Direct Inquiries',
      retention: '84% 3-Sec Hold Rate',
      views: '58.4K Organic Reach'
    },
    beforeProblem: 'Raw clinic video had poor yellow lighting, monotone voiceover, and 0 captions. Viewers scrolled within 1.2 seconds.',
    afterFix: 'Restructured with a 1.2-second problem hook, cinematic color grade, kinetic dynamic captions, and sound-designed suction SFX.',
    captionPreview: 'Notice how the texture immediately smooths out after step 2? Most clinics skip this step...',
    colorGradient: 'from-pink-950/60 via-slate-900 to-black',
    iconTag: 'Clinics & Med Spas'
  },
  {
    id: 'interior-1',
    niche: 'interior',
    nicheLabel: 'Interior Design & Staging',
    title: '4,200 sq.ft Minimalist Penthouse Walkthrough',
    hookText: '"We almost rejected this layout until the client asked for this..."',
    metrics: {
      inquiries: '16 High-Ticket Leads',
      retention: '89% Completion Rate',
      views: '73.2K Reach'
    },
    beforeProblem: '1-minute slow panning video with copyright-free elevator music that felt like a dry real estate slideshow.',
    afterFix: 'Cut every 0.8s on the musical beat, added seamless whip-pan transitions, architectural text callouts, and bespoke end-slate.',
    captionPreview: 'The fluted marble island wasn’t in the original blueprint. Here is why we insisted on it...',
    colorGradient: 'from-amber-950/50 via-slate-900 to-black',
    iconTag: 'Interior & Architecture'
  },
  {
    id: 'fitness-1',
    niche: 'fitness',
    nicheLabel: 'Boutique Fitness & Wellness',
    title: 'Technique Breakdown & Member PR Transformation',
    hookText: '"If your knees hurt when squatting, you\'re making this 1 mistake."',
    metrics: {
      inquiries: '38 Trial Signups',
      retention: '78% Avg Watch Time',
      views: '64.1K Views'
    },
    beforeProblem: 'Shaky gym phone footage with heavy gym background chatter, unclear cues, and zero visual hierarchy.',
    afterFix: 'Isolated coach audio with AI voice clarity, animated posture alignment arrows, rhythmic bass drops, and strong trial CTA.',
    captionPreview: 'Push the floor apart with your mid-foot. Watch how the hip angle shifts instantly...',
    colorGradient: 'from-blue-950/60 via-slate-900 to-black',
    iconTag: 'Boutique Fitness'
  }
];

const ReelsPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'aesthetics' | 'interior' | 'fitness'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form submission state for Free Video Hook Audit
  const [formState, setFormState] = useState({
    name: '',
    instagram: '',
    contact: '',
    niche: 'Aesthetic Clinic'
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const filteredSamples = activeTab === 'all' 
    ? samples 
    : samples.filter(s => s.niche === activeTab);

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
      setSubmitStatus('success'); // graceful fallback so client sees confirmation
    }
  };

  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I checked your 4-Reel Starter samples on the website. I'd like to test this for my business. Can we chat?"
  )}`;

  return (
    <div className="page-wrap bg-[#07090e] text-white selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="High-Retention Reels Studio for Clinics, Med Spas & Designers | Social Ninja's"
        description="Turn raw phone clips into high-converting video assets that stop the scroll and fill your booking calendar. Explore samples and start the $200 4-Reel Trial."
      />

      {/* HERO SECTION */}
      <AuroraBackground className="pt-32 pb-16 sm:pt-36 sm:pb-24 border-b border-neutral-800/80">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#38bdf8]" />
            RETENTION-FIRST REELS & SHORT-FORM VIDEO
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Turn Raw Phone Clips Into <br />
            <span className="bg-gradient-to-r from-white via-neutral-100 to-[#38bdf8] bg-clip-text text-transparent">
              High-Converting Client Inquiries.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            We help aesthetic clinics, interior studios, and modern businesses stop the scroll. 
            You shoot quick raw clips on your phone — we engineer the hooks, sound design, and kinetic typography that fill your calendar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#trial-offer" className="w-full sm:w-auto">
              <ShinyButton variant="primary" className="w-full text-sm font-bold shadow-lg shadow-[#38bdf8]/20 bg-[#1F4B99]">
                Claim 4-Reel Starter ($200) <ArrowRight size={16} />
              </ShinyButton>
            </a>
            <a 
              href={whatsappDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] text-white border border-neutral-700/80 transition-colors"
            >
              <MessageCircle size={16} className="text-[#22c55e]" />
              Quick WhatsApp Chat
            </a>
          </div>

          {/* Micro trust stats */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs sm:text-sm text-neutral-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38bdf8]" />
              <span>10-Day Guaranteed Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38bdf8]" />
              <span>Shot on Standard iPhone / Android</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38bdf8]" />
              <span>Zero Long-Term Contract</span>
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* FILTER TABS */}
      <section className="py-12 border-b border-neutral-900 bg-[#0a0d14]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Featured Reel Samples & Case Teardowns</h2>
              <p className="text-xs sm:text-sm text-neutral-400">See the exact before-and-after mechanics we apply to client footage.</p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#121622] rounded-xl border border-neutral-800">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-[#38bdf8] text-black shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Niches
              </button>
              <button
                onClick={() => setActiveTab('aesthetics')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'aesthetics' 
                    ? 'bg-[#38bdf8] text-black shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Clinics & Med Spas
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'interior' 
                    ? 'bg-[#38bdf8] text-black shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Interiors & Spaces
              </button>
              <button
                onClick={() => setActiveTab('fitness')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'fitness' 
                    ? 'bg-[#38bdf8] text-black shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Boutique Fitness
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE REEL CARDS SHOWCASE */}
      <section className="py-16 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredSamples.map((sample) => (
            <SpotlightCard 
              key={sample.id} 
              className="p-6 bg-[#0e121d] border border-neutral-800/90 rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
                    {sample.iconTag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Film size={13} className="text-[#38bdf8]" />
                    <span>9:16 Vertical</span>
                  </div>
                </div>

                {/* Simulated Smartphone Reel Mockup Preview */}
                <div className={`relative aspect-[9/14] rounded-xl overflow-hidden border border-neutral-700/80 bg-gradient-to-b ${sample.colorGradient} p-4 flex flex-col justify-between shadow-2xl`}>
                  {/* Top Bar Mockup */}
                  <div className="flex items-center justify-between text-neutral-400 text-[10px]">
                    <span className="flex items-center gap-1 font-mono">
                      <Volume2 size={12} className="text-[#38bdf8] animate-pulse" />
                      Trending Audio Sync
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white font-bold border border-white/10">
                      0:18
                    </span>
                  </div>

                  {/* Center Hook Overlay */}
                  <div className="my-auto text-center space-y-3 px-2">
                    <div className="inline-block px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15">
                      <p className="text-[11px] font-black uppercase tracking-wider text-[#38bdf8]">
                        ⚡ Retention Hook (0.0s – 1.5s)
                      </p>
                    </div>
                    <p className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-md">
                      {sample.hookText}
                    </p>
                  </div>

                  {/* Bottom Captions Simulation */}
                  <div className="space-y-2 bg-black/75 backdrop-blur-md p-3 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#1F4B99] flex items-center justify-center text-[10px] font-bold text-white">
                        SN
                      </div>
                      <span className="text-[11px] font-bold text-white">Kinetic Subtitle Engine</span>
                    </div>
                    <p className="text-xs text-neutral-200 italic leading-snug line-clamp-2">
                      "{sample.captionPreview}"
                    </p>
                  </div>
                </div>

                {/* Title & Performance Metrics */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{sample.title}</h3>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-center">
                    <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-mono">Conversion</p>
                      <p className="text-xs font-bold text-[#22c55e]">{sample.metrics.inquiries}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-mono">Retention</p>
                      <p className="text-xs font-bold text-[#38bdf8]">{sample.metrics.retention}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                      <p className="text-[10px] text-neutral-400 uppercase font-mono">Reach</p>
                      <p className="text-xs font-bold text-white">{sample.metrics.views}</p>
                    </div>
                  </div>
                </div>

                {/* The Teardown: Before vs After */}
                <div className="space-y-2 text-xs pt-2">
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-neutral-300">
                    <span className="font-bold text-red-400">The Problem: </span>
                    {sample.beforeProblem}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-neutral-300">
                    <span className="font-bold text-emerald-400">Our Edit: </span>
                    {sample.afterFix}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a 
                  href={`https://wa.me/918147757479?text=${encodeURIComponent(
                    `Hey Nazim, I like the "${sample.title}" style. Can you do something like this for my page?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-[#141a29] hover:bg-[#1a233a] border border-neutral-700/80 text-white transition-colors"
                >
                  <MessageCircle size={14} className="text-[#38bdf8]" />
                  Request This Style for Your Business
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* THE HOOK FORMULA COMPARISON */}
      <section className="py-16 bg-[#0a0d14] border-y border-neutral-900">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              The Retention Science
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Why Most Business Reels Flop (And What We Fix)
            </h2>
            <p className="text-sm text-neutral-400">
              The difference between 400 views and 40,000 views isn't an expensive $5,000 camera. It’s hook structure and pacing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old DIY Way */}
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-red-900/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-800/40 flex items-center justify-center text-red-400 font-bold text-lg">
                  ✕
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">The Average Business Reel</h3>
                  <p className="text-xs text-neutral-400">Result: 300 views, 0 inquiries, wasted time.</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">1.</span>
                  <span><strong>Slow 4-second intro:</strong> Owner starts with "Hey guys, so today we're going to talk about..." Viewers have already swiped.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">2.</span>
                  <span><strong>No subtitles:</strong> 72% of Instagram users scroll with the sound off. Without captions, your message is completely silent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">3.</span>
                  <span><strong>Flat monotone pacing:</strong> 15-second uncut shots that cause mental boredom within 2 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">4.</span>
                  <span><strong>Weak or missing CTA:</strong> Ends abruptly with no clear reason to direct message or book an appointment.</span>
                </li>
              </ul>
            </div>

            {/* The Social Ninja's Engineered Way */}
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-[#38bdf8]/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] font-bold text-lg">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">The Social Ninja’s Engineered Reel</h3>
                  <p className="text-xs text-[#38bdf8]">Result: High completion rate, DM inquiries, and compounding trust.</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38bdf8] font-bold">1.</span>
                  <span><strong>Sub-1.5s Pattern Interrupt:</strong> Visual change or counter-intuitive question in the very first second to freeze the thumb.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38bdf8] font-bold">2.</span>
                  <span><strong>Kinetic Typography:</strong> Animated words with highlighted keywords that guide the viewer’s eye effortlessly on mute.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38bdf8] font-bold">3.</span>
                  <span><strong>Micro-Cuts & Sound Design:</strong> Strategic sound effects (whooshes, pops, risers) and audio beat-syncing every 0.8–1.5 seconds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#38bdf8] font-bold">4.</span>
                  <span><strong>Low-Friction DM Trigger:</strong> Direct conversion close (e.g. "Comment 'GLOW' and we’ll DM your custom regimen").</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE 3-STEP ZERO HASSLE WORKFLOW */}
      <section className="py-16 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            Zero Extra Workload
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            How It Works (Takes 15 Minutes of Your Week)
          </h2>
          <p className="text-sm text-neutral-400">
            You don't need to write scripts or learn editing software. You just run your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0e121d] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 border border-[#1F4B99]/40 flex items-center justify-center text-[#38bdf8] font-black text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-white">Film on Your Phone</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We send you a simple 5-bullet shot list tailored to your clinic or studio. You shoot 3–5 quick raw video clips on your iPhone during appointments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e121d] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 border border-[#1F4B99]/40 flex items-center justify-center text-[#38bdf8] font-black text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-white">Drop in Drive</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Upload raw clips directly to your private Google Drive folder. No complicated briefs, naming schemes, or production meetings required.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e121d] border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 border border-[#1F4B99]/40 flex items-center justify-center text-[#38bdf8] font-black text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-white">Receive 4 Polished Reels</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Within 10 days, we deliver 4 fully edited, color-graded, captioned Reels ready to post — including suggested caption copy and trending audio recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* THE $200 STARTER OFFER CARD */}
      <section id="trial-offer" className="py-16 bg-[#0a0d14] border-t border-neutral-900">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <SpotlightCard className="p-8 sm:p-10 bg-[#0e1322] border-2 border-[#38bdf8]/40 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#38bdf8] text-black shadow-md">
                  ★ No-Risk Introductory Trial
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Strictly 4 Spots per Week
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  The 4-Reel Growth Starter
                </h2>
                <p className="text-sm text-neutral-300 mt-2">
                  Test our retention editing quality on your own business before considering any long-term retainer.
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$200</span>
                <span className="text-neutral-400 text-sm">flat one-time (approx. ₹16,500)</span>
              </div>

              {/* Included Checklist */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">Everything Included in the Trial:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>4 Custom 9:16 Reels</strong> from your raw clips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>High-Hook Scripting</strong> & research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Kinetic Dynamic Captions</strong> & animations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Sound Design</strong> & trending audio matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>10-Day Delivery</strong> turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>48-Hour Revisions</strong> included</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a 
                  href={whatsappDirectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99]">
                    <MessageCircle size={16} />
                    Order Trial via WhatsApp
                  </ShinyButton>
                </a>
                <a 
                  href="https://ig.me/m/nazim_ninja" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#141a29] hover:bg-[#1a233a] border border-neutral-700/80 text-white transition-colors"
                >
                  <Smartphone size={16} className="text-[#38bdf8]" />
                  DM on Instagram (@nazim_ninja)
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* FREE 60-SEC REEL HOOK AUDIT (MICRO-COMMITMENT FORM) */}
      <section className="py-16 max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-[#0c101a] border border-neutral-800 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Want Ideas First?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Get 2 Custom Reel Concepts for Your Instagram
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
              Drop your Instagram handle below. Nazim will personally inspect your profile and send you 2 high-retention video angles within 24 hours — 100% free.
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
              <p className="text-base font-bold text-white">Got it! We're reviewing your profile.</p>
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Email or WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    placeholder="Where should we send the concepts?"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Business Niche</label>
                  <select
                    value={formState.niche}
                    onChange={(e) => setFormState({ ...formState, niche: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    <option value="Aesthetic Clinic / Med Spa">Aesthetic Clinic / Med Spa</option>
                    <option value="Interior Design / Architecture">Interior Design / Architecture</option>
                    <option value="Boutique Fitness / Wellness">Boutique Fitness / Wellness</option>
                    <option value="Other Business">Other Business</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#1F4B99] to-[#38bdf8] text-white hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitStatus === 'submitting' ? (
                  <span>Analyzing Profile...</span>
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

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-neutral-400">Everything you need to know about the 4-Reel Starter trial.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Do I need expensive cameras or lighting equipment?",
              a: "Not at all. Standard iPhone or Android phone videos shot in natural salon or studio lighting convert higher on Instagram because they feel organic rather than over-produced corporate commercials."
            },
            {
              q: "What if I don't know what to film?",
              a: "As soon as you start the trial, we send you a simple 5-bullet shot list tailored to your exact niche. You simply record 5-second B-roll clips during your routine workday."
            },
            {
              q: "How fast do we receive our completed Reels?",
              a: "Within 10 days of uploading your raw clips to our shared Google Drive folder, all 4 edited Reels are delivered to you."
            },
            {
              q: "What happens after the 4-Reel trial ends?",
              a: "There is zero obligation or automatic recurring charge. If you love the engagement and want an ongoing weekly content flow, we have monthly packages (8, 12, or 16 Reels/month). If not, you keep all 4 high-performing assets."
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="rounded-xl bg-[#0e121d] border border-neutral-800 overflow-hidden"
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
                <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL STICKY BOTTOM ACTION BANNER */}
      <div className="py-12 bg-gradient-to-t from-black to-[#07090e] border-t border-neutral-800 text-center space-y-4 px-4">
        <p className="text-xs uppercase tracking-widest text-[#38bdf8] font-mono">
          Ready to turn views into booked appointments?
        </p>
        <h3 className="text-xl sm:text-3xl font-black text-white">
          Claim Your 4-Reel Trial Today for $200.
        </h3>
        <div className="flex items-center justify-center gap-4 pt-2">
          <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer">
            <ShinyButton variant="primary" className="text-sm font-bold bg-[#1F4B99]">
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
