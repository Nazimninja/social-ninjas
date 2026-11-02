import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Smartphone, 
  Clock, 
  Sparkles,
  ExternalLink,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Flame,
  Zap,
  ShieldCheck,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Layers,
  Film,
  Camera,
  Check,
  X,
  SlidersHorizontal
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
  views: string;
  likes: string;
  retentionStat: string;
  videoSrc: string;
  cleanUrl: string;
  ctaMessage: string;
  hookStrategy: string;
  editingCraft: string[];
  bestSuitedFor: string;
  audioDesignHighlight: string;
}

const SHOWCASE_REELS: ShowcaseReel[] = [
  {
    id: 'automotive-luxury',
    reelId: 'DXZRFYTESme',
    category: 'Automotive & Luxury',
    creator: '@9thgear_',
    title: 'BMW iX vs. Mercedes EQS Comparison',
    highlight: '52K+ Organic Views • High-Aesthetic Sensory Edit',
    views: '52.4K',
    likes: '1,420+',
    retentionStat: '88% 3-Second Hold Rate',
    videoSrc: '/videos/reel-luxury-automotive.mp4',
    cleanUrl: 'https://www.instagram.com/reel/DXZRFYTESme/',
    ctaMessage: 'Hey Nazim, I love the Luxury Automotive Reel style on your samples page. Can we produce this for my brand?',
    hookStrategy: 'Micro-second sensory sound design + split-screen comparison immediately forces high-intent luxury buyers to stop scrolling.',
    editingCraft: [
      'Macro speed ramps synced to engine audio',
      'Dynamic typography with clean luxury branding',
      'Custom color grading for deep blacks and glossy metallic reflections',
      'Multi-track sub-bass sound design and motor swooshes'
    ],
    bestSuitedFor: 'Luxury Dealerships, Premium Tech Brands, Automotive Accessories & High-End Lifestyle Products',
    audioDesignHighlight: 'Hyper-realistic motor hums, crisp metallic clicks, and clean atmospheric risers.'
  },
  {
    id: 'hook-strategy',
    reelId: 'Dey4nf4B3Wg',
    category: 'Retention & Hook Strategy',
    creator: '@hellowjai',
    title: 'Saurabh Joshi Immediate Payoff Breakdown',
    highlight: '587K+ Views • 18.9K Likes • 1.2s Retention Hook',
    views: '587K+',
    likes: '18.9K',
    retentionStat: '92% 5-Second Retention',
    videoSrc: '/videos/reel-hook-strategy.mp4',
    cleanUrl: 'https://www.instagram.com/reel/Dey4nf4B3Wg/',
    ctaMessage: 'Hey Nazim, I want high-retention hook strategy Reels like the one on your samples page. How do we start?',
    hookStrategy: 'Immediate climax payoff tease within 0.8s — establishes curiosity gap before the creator even finishes the first sentence.',
    editingCraft: [
      'Pattern interrupt jump-cuts every 1.4 seconds',
      'Dual-color kinetic word-by-word subtitles with emoji anchors',
      'Snap zooms and directional whip transitions',
      'Sound accents on every keyword punch'
    ],
    bestSuitedFor: 'Founders, Creators, Personal Brands, E-Commerce Stores & Educational Channels',
    audioDesignHighlight: 'Pop-in sound effects, swift paper whooshes, and subtle background tension build-up.'
  },
  {
    id: 'kinetic-explainer',
    reelId: 'DanU-jWK_bP',
    category: 'Kinetic Motion Explainer',
    creator: '@rohitiyerexplains',
    title: 'Mercedes Naming Decoded & Explained',
    highlight: '79K+ Likes • 640K+ Plays • Kinetic Motion Graphics',
    views: '640K+',
    likes: '79.2K',
    retentionStat: '4.8x Avg Re-watch Ratio',
    videoSrc: '/videos/reel-kinetic-explainer.mp4',
    cleanUrl: 'https://www.instagram.com/reel/DanU-jWK_bP/',
    ctaMessage: 'Hey Nazim, I want kinetic educational explainers like the Rohit Iyer sample. Can we talk?',
    hookStrategy: 'Curiosity reframing: "The secret naming logic you never noticed" backed by swift visual diagram reveals.',
    editingCraft: [
      'Word-by-word motion typography with neon glow accents',
      'Vector icon animations and car badge tracking',
      'Fast-paced informational structure with zero fluff',
      'Cinematic sound design pacing for maximum comprehension'
    ],
    bestSuitedFor: 'B2B SaaS, Finance, Doctors, Consultancies, Real Estate & Complex Products',
    audioDesignHighlight: 'Interface clicks, frequency sweeps, and acoustic riser transitions.'
  },
  {
    id: 'brand-authority',
    reelId: 'Dcs_ND2vUsc',
    category: 'Brand Story & Leadership',
    creator: '@kccinstitutes',
    title: 'Marcus Aurelius: 5 Rules for Leadership',
    highlight: '309K+ Views • 38K Likes • Cinematic Pacing',
    views: '309K+',
    likes: '38.4K',
    retentionStat: '86% Video Completion Rate',
    videoSrc: '/videos/reel-brand-authority.mp4',
    cleanUrl: 'https://www.instagram.com/reel/Dcs_ND2vUsc/',
    ctaMessage: 'Hey Nazim, I love the Brand Leadership Reel style on your samples page. Can we create this for my business?',
    hookStrategy: 'Gravitas vocal pacing coupled with low-frequency cinematic undertones that command instant respect and authority.',
    editingCraft: [
      'Cinematic 2.35:1 letterboxed B-roll inserts',
      'Slow push-in zooms to intensify eye contact and trust',
      'Restrained, dignified serif typography with soft gold lighting',
      'Deep orchestral and ambient sound mix'
    ],
    bestSuitedFor: 'C-Suite Executives, Universities, High-Ticket Agencies, Law Firms & Premium Clinics',
    audioDesignHighlight: 'Sub-bass drone pads, deep thunder reverberation, and crisp vocal clarity.'
  }
];

const FAQS = [
  {
    q: "I am awkward on camera or don't know what to talk about. How do we solve that?",
    a: "You never have to wonder what to say. Before every batch, we provide 4 tailored, bulleted hook scripts written specifically for your niche. You can record 15-second natural talking clips on your phone, or send us raw B-roll footage (your workspace, procedures, clients, screen recordings) and our team can build faceless kinetic voiceover reels."
  },
  {
    q: "What equipment or camera do I need? Do I need expensive 4K gear?",
    a: "Zero professional camera equipment required. Every reel in our showcase was shot on standard iPhones or Android smartphones. Modern phone sensors shoot spectacular 4K footage — what makes the video stop the scroll is our 1.5s hook scripting, kinetic typography, and multi-layer sound design."
  },
  {
    q: "How do I send my raw footage to your team?",
    a: "We give you a private, dedicated Google Drive folder or Dropbox link. Whenever you have 5 minutes between appointments, simply drop your raw phone clips into the folder. No video editing, no trimming, and no organizing necessary."
  },
  {
    q: "How fast is turnaround, and how are the finished Reels delivered?",
    a: "Your 4-Reel Starter Sprint is fully delivered within 10 business days. You receive master 4K 9:16 video files, along with complete ready-to-paste caption copy, curated hashtag sets, trending audio recommendations, and pinned comment engagement hooks."
  },
  {
    q: "What is your revision policy if I need brand or text tweaks?",
    a: "Every batch includes 2 rounds of iterative revisions. If you need a font style tweak, subtitle re-phrasing, or pacing adjustment, we refine it promptly until it aligns with your brand standards."
  },
  {
    q: "Can these same videos be run as high-ROAS Meta & Instagram Ads?",
    a: "Yes! High-retention reels make exceptional top-of-funnel Meta Ad creatives (Reels placement, Boosted Posts, and Spark Ads). Because they feel native and organic rather than like a pushy corporate ad, they typically achieve 35% lower cost-per-click and higher watch time."
  }
];

const COMPARISON_ROWS = [
  {
    feature: "Viral Hook Research & Scripting",
    socialNinjas: "Bespoke 1.5s pattern-interrupt hooks for your niche",
    fiverr: "Zero scripting — you must write everything",
    inHouse: "Requires constant creative direction & training",
    bigAgency: "Generic agency brainstorms that take 3 weeks"
  },
  {
    feature: "Kinetic Motion Typography",
    socialNinjas: "Custom branded motion subtitles with glowing accents",
    fiverr: "Generic auto-captions with bad timing & typos",
    inHouse: "Basic Premiere text presets",
    bigAgency: "Professional but outsourced to junior interns"
  },
  {
    feature: "Multi-Track Hollywood Sound Design",
    socialNinjas: "Layered sub-bass, whooshes, risers & licensed audio",
    fiverr: "Flat audio or copyright-strikable music",
    inHouse: "Usually ignored due to time constraints",
    bigAgency: "Included, but charged at $3,500/mo retainer"
  },
  {
    feature: "Contract & Retainer Lock-In",
    socialNinjas: "Zero lock-in. Flat $200 test sprint first",
    fiverr: "Per-gig, but unpredictable quality every time",
    inHouse: "Full-time salary ($4,000/mo) + benefits",
    bigAgency: "Strict 6-month lock-in retainer ($3,000+/mo)"
  },
  {
    feature: "Delivery Turnaround",
    socialNinjas: "Guaranteed 10-day turnaround for 4 Reels",
    fiverr: "Unpredictable (often 14+ days with revisions)",
    inHouse: "Slow due to internal meetings and task backlog",
    bigAgency: "3 to 4 weeks per batch"
  },
  {
    feature: "Direct Communication",
    socialNinjas: "Direct WhatsApp channel with the founder (Nazim)",
    fiverr: "Broken English chat via platform tickets",
    inHouse: "Slack channels and weekly 1-on-1s",
    bigAgency: "Account managers acting as communication bottlenecks"
  }
];

const ReelsPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('automotive-luxury');
  const [viewMode, setViewMode] = useState<'theater' | 'grid'>('theater');
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({
    'automotive-luxury': true,
    'hook-strategy': true,
    'kinetic-explainer': true,
    'brand-authority': true
  });
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
    'automotive-luxury': true,
    'hook-strategy': true,
    'kinetic-explainer': true,
    'brand-authority': true
  });
  const [videoProgress, setVideoProgress] = useState<{ [key: string]: number }>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState<boolean>(false);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const activeReel = SHOWCASE_REELS.find(r => r.id === activeTab) || SHOWCASE_REELS[0];

  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I checked your 4-Reel Starter Sprint on the website. I want to test this for my business. Can we talk?"
  )}`;

  // Autoplay all videos muted initially
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([_, video]) => {
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    });
  }, []);

  // Show floating CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setPlayingStates(prev => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setPlayingStates(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const toggleMute = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    const willBeMuted = !currentVideo.muted;

    if (!willBeMuted) {
      // Unmuting one video mutes all others to prevent audio clash
      Object.entries(videoRefs.current).forEach(([key, video]) => {
        if (video && key !== id) {
          video.muted = true;
        }
      });
      setMutedStates({
        'automotive-luxury': true,
        'hook-strategy': true,
        'kinetic-explainer': true,
        'brand-authority': true,
        [id]: false
      });
      currentVideo.muted = false;
      if (currentVideo.paused) {
        currentVideo.play().catch(() => {});
        setPlayingStates(prev => ({ ...prev, [id]: true }));
      }
    } else {
      currentVideo.muted = true;
      setMutedStates(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleTimeUpdate = (id: string) => {
    const video = videoRefs.current[id];
    if (video && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(prev => ({ ...prev, [id]: progress }));
    }
  };

  const switchTab = (id: string) => {
    setActiveTab(id);
    // Auto-play the newly active tab's video
    setTimeout(() => {
      const video = videoRefs.current[id];
      if (video && video.paused) {
        video.play().catch(() => {});
        setPlayingStates(prev => ({ ...prev, [id]: true }));
      }
    }, 50);
  };

  return (
    <div className="page-wrap bg-[#07090e] text-neutral-300 selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="High-Retention Short-Form Reels Studio | Social Ninja's Work Samples"
        description="Experience real high-retention video edits engineered with pattern-interrupt hooks, kinetic typography, and multi-layer sound design. Claim our $200 4-Reel Starter Sprint."
        faq={FAQS}
        service={{
          name: "High-Retention Short-Form Reels Production",
          description: "End-to-end short-form video production from raw phone footage, including viral hook scripting, kinetic typography, and Hollywood-grade sound design.",
          price: "$200",
          providerName: "Social Ninja's"
        }}
      />

      {/* ─── HERO SECTION: FIRST IMPRESSION IS BEST IMPRESSION ─── */}
      <AuroraBackground className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Studio Capacity Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101422] border border-[#38bdf8]/30 shadow-lg shadow-[#38bdf8]/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#38bdf8] text-xs font-bold tracking-wide uppercase">
              Short-Form Creative Studio • 3 Client Slots Open
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Raw Phone Footage In. <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-[#38bdf8] bg-clip-text text-transparent">
              Viral Retention &amp; High-Ticket Clients Out.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Stop spending 12 hours a week fighting video editing apps or settling for 200 views. Send us raw clips from your phone — we script pattern-interrupt hooks, build kinetic typography, and mix Hollywood-grade sound design that turns scrollers into booked calls.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#starter-trial" className="w-full sm:w-auto">
              <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] shadow-xl shadow-[#1F4B99]/30 text-white px-8 py-4">
                Claim 4-Reel Starter ($200) <ArrowRight size={16} />
              </ShinyButton>
            </a>
            <a 
              href={whatsappDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.1] hover:border-[#38bdf8]/40 transition-all shadow-lg"
            >
              <MessageCircle size={17} className="text-[#38bdf8]" />
              Chat Directly on WhatsApp
            </a>
          </div>

          {/* Trust Guarantees Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> 100% Shot on Standard Phone
            </span>
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> 10-Day Turnaround Guarantee
            </span>
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> Zero Retainer Lock-In
            </span>
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={15} className="text-[#38bdf8]" /> Full Commercial Usage Rights
            </span>
          </div>

          {/* Social Proof Metric Pillars */}
          <div className="pt-8 max-w-[1000px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-[#0e121d]/80 border border-white/[0.08] backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">1.8M+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] mt-0.5">Organic Views Engineered</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e121d]/80 border border-white/[0.08] backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">4.2x</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] mt-0.5">Avg. Retention Lift</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e121d]/80 border border-white/[0.08] backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">10-Day</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] mt-0.5">Delivery Guarantee</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e121d]/80 border border-white/[0.08] backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8] mt-0.5">Mobile Shot (No DSLR)</div>
            </div>
          </div>

        </div>
      </AuroraBackground>

      {/* ─── LIVE AUTOPLAYING WORK SAMPLES: THE SHOWCASE THEATER ─── */}
      <section id="work-samples" className="py-16 sm:py-24 max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Header with View Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              <Sparkles size={14} />
              Interactive Work Showcase
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Real High-Retention Edits in Action
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Inspect the anatomy of our retention formula. Tap the audio button on any reel to hear the custom multi-track sound design that triples viewer hold time.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0e121d] border border-white/[0.08] self-start md:self-end">
            <button
              onClick={() => setViewMode('theater')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'theater'
                  ? 'bg-[#1F4B99] text-white shadow-lg shadow-[#1F4B99]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film size={14} />
              Studio Theater
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#1F4B99] text-white shadow-lg shadow-[#1F4B99]/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={14} />
              All 4 Styles Grid
            </button>
          </div>
        </div>

        {/* ── VIEW MODE 1: FEATURED STUDIO THEATER ── */}
        {viewMode === 'theater' && (
          <div className="pt-8 space-y-8">
            
            {/* Format Selection Tab Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {SHOWCASE_REELS.map((reel) => {
                const isSelected = activeTab === reel.id;
                return (
                  <button
                    key={reel.id}
                    onClick={() => switchTab(reel.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-[#101422] border-[#38bdf8] shadow-xl shadow-[#38bdf8]/10 text-white'
                        : 'bg-[#0e121d] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/[0.2]'
                    }`}
                  >
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                      {reel.category}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate mt-1">
                      {reel.creator}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                      <TrendingUp size={11} /> {reel.views} views
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Split Screen Cinema Theater */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0a0d15] p-5 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden">
              
              {/* Subtle background ambient light based on brand blue */}
              <div 
                className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
              />

              {/* LEFT: Simulated iPhone 16 Pro Mockup with Live Autoplaying Video */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[280px] sm:w-[320px] aspect-[9/19] rounded-[48px] p-3 bg-gradient-to-b from-[#2a3040] via-[#1a1f2c] to-[#0d1017] border-[3px] border-[#3a4459] shadow-2xl relative select-none">
                  
                  {/* Dynamic Island Pill at Top */}
                  <div className="absolute top-5 inset-x-0 mx-auto w-24 h-5 rounded-full bg-black z-30 flex items-center justify-between px-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-neutral-400">
                      {mutedStates[activeReel.id] ? 'MUTED' : 'AUDIO'}
                    </span>
                  </div>

                  {/* Inner Screen Display */}
                  <div 
                    onClick={() => togglePlay(activeReel.id)}
                    className="relative w-full h-full rounded-[40px] overflow-hidden bg-black cursor-pointer group"
                  >
                    {/* HTML5 Autoplaying Loop Video */}
                    <video
                      ref={(el) => {
                        videoRefs.current[activeReel.id] = el;
                        if (el) {
                          el.muted = mutedStates[activeReel.id] ?? true;
                        }
                      }}
                      src={activeReel.videoSrc}
                      autoPlay
                      loop
                      muted={mutedStates[activeReel.id] ?? true}
                      playsInline
                      preload="metadata"
                      onTimeUpdate={() => handleTimeUpdate(activeReel.id)}
                      className="w-full h-full object-cover rounded-[38px]"
                    />

                    {/* Top Right Sound Toggle Button with Animated Wave Visualizer */}
                    <div className="absolute top-10 right-3.5 z-30">
                      <button
                        onClick={(e) => toggleMute(activeReel.id, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border shadow-xl transition-all active:scale-95 ${
                          mutedStates[activeReel.id]
                            ? 'bg-black/75 hover:bg-black/90 text-neutral-200 border-white/20'
                            : 'bg-[#1F4B99] hover:bg-[#153880] text-white border-[#38bdf8]/60 shadow-[#38bdf8]/30'
                        }`}
                      >
                        {mutedStates[activeReel.id] ? (
                          <>
                            <VolumeX size={13} className="text-neutral-400" />
                            <span className="text-[10px]">Tap for Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} className="text-[#38bdf8] animate-bounce" />
                            <span className="text-[10px] text-[#38bdf8] font-bold">Sound On</span>
                            <div className="flex items-center gap-0.5 ml-1">
                              <span className="w-0.5 h-2 bg-[#38bdf8] animate-pulse" />
                              <span className="w-0.5 h-3 bg-[#38bdf8] animate-ping" />
                              <span className="w-0.5 h-1.5 bg-[#38bdf8] animate-pulse" />
                            </div>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Centered Play Indicator When Paused */}
                    {!playingStates[activeReel.id] && (
                      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                        <div className="w-14 h-14 rounded-full bg-[#1F4B99] text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                          <Play size={24} className="fill-current ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Bottom In-Reel Title & Engagement Tag */}
                    <div className="absolute bottom-6 inset-x-3.5 z-20 pointer-events-none">
                      <div className="p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 space-y-1 shadow-2xl">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-white truncate max-w-[170px]">{activeReel.title}</span>
                          <span className="text-[#38bdf8] font-bold">{activeReel.likes} Likes</span>
                        </div>
                        <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <TrendingUp size={11} /> {activeReel.retentionStat}
                        </div>
                      </div>
                    </div>

                    {/* Video Progress Scrubber Bar at the bottom */}
                    <div className="absolute bottom-1 inset-x-5 h-1 bg-white/20 rounded-full overflow-hidden z-20">
                      <div 
                        className="h-full bg-[#38bdf8] transition-all duration-150"
                        style={{ width: `${videoProgress[activeReel.id] || 0}%` }}
                      />
                    </div>

                    {/* Subtle Cinematic Vignette */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* RIGHT: Studio Inspector & The Anatomy of the Retention Edit */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Meta Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30">
                      {activeReel.category} Format
                    </span>
                    <a
                      href={activeReel.cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.08]"
                    >
                      <span>Creator: {activeReel.creator}</span>
                      <ExternalLink size={12} className="text-[#38bdf8]" />
                    </a>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {activeReel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    {activeReel.highlight}
                  </p>
                </div>

                {/* Key Metrics Dashboard */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#0e121d] border border-white/[0.08]">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400">Organic Views</div>
                    <div className="text-lg sm:text-xl font-black text-white mt-0.5">{activeReel.views}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400">Likes &amp; Saves</div>
                    <div className="text-lg sm:text-xl font-black text-white mt-0.5">{activeReel.likes}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400">Viewer Retention</div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">{activeReel.retentionStat}</div>
                  </div>
                </div>

                {/* Anatomy Breakdown: The Hook */}
                <div className="p-4 rounded-2xl bg-[#101422] border border-[#38bdf8]/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
                    <Zap size={14} />
                    The 0:00 - 0:02 Pattern-Interrupt Hook
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                    {activeReel.hookStrategy}
                  </p>
                </div>

                {/* Anatomy Breakdown: Editing Craft Techniques */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Layers size={13} className="text-[#38bdf8]" />
                    Retention Mechanics Applied
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {activeReel.editingCraft.map((craft, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-[#0e121d] p-2.5 rounded-xl border border-white/[0.06]">
                        <Check size={14} className="text-[#38bdf8] shrink-0 mt-0.5" />
                        <span>{craft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sound Design Note */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1F4B99]/30 text-[#38bdf8] flex items-center justify-center shrink-0">
                    <Volume2 size={16} />
                  </div>
                  <div className="text-xs text-neutral-300 leading-snug">
                    <strong className="text-white">Multi-Layer Sound Design: </strong>
                    {activeReel.audioDesignHighlight}
                  </div>
                </div>

                {/* Best Suited For Callout */}
                <div className="text-xs text-neutral-400 flex items-start gap-2">
                  <Star size={14} className="text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral-200">Best Suited For: </strong>
                    {activeReel.bestSuitedFor}
                  </span>
                </div>

                {/* Direct Conversion Action */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/918147757479?text=${encodeURIComponent(activeReel.ctaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <ShinyButton variant="primary" className="w-full text-xs font-bold bg-[#1F4B99] hover:bg-[#153880] text-white py-3.5">
                      <MessageCircle size={15} />
                      Order This Exact Editing Style on WhatsApp
                    </ShinyButton>
                  </a>
                  <a
                    href="#starter-trial"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.1] transition-colors"
                  >
                    View $200 Starter Sprint <ArrowRight size={14} />
                  </a>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ── VIEW MODE 2: ALL 4 STYLES GRID VIEW ── */}
        {viewMode === 'grid' && (
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOWCASE_REELS.map((reel) => {
              const isPlaying = playingStates[reel.id] ?? true;
              const isMuted = mutedStates[reel.id] ?? true;

              return (
                <SpotlightCard 
                  key={reel.id}
                  className="p-4 bg-[#0e121d] border border-white/[0.08] rounded-3xl space-y-4 flex flex-col justify-between hover:border-[#38bdf8]/40 transition-all shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-1">
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30">
                      {reel.category}
                    </span>
                    <a
                      href={reel.cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1"
                    >
                      <span>{reel.creator}</span>
                      <ExternalLink size={11} className="text-[#38bdf8]" />
                    </a>
                  </div>

                  {/* 9:16 Video Frame */}
                  <div 
                    onClick={() => togglePlay(reel.id)}
                    className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-black shadow-2xl cursor-pointer group select-none"
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[reel.id] = el;
                        if (el) {
                          el.muted = isMuted;
                        }
                      }}
                      src={reel.videoSrc}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="metadata"
                      onTimeUpdate={() => handleTimeUpdate(reel.id)}
                      className="w-full h-full object-cover rounded-2xl"
                    />

                    {/* Sound Button */}
                    <div className="absolute top-3 right-3 z-20">
                      <button
                        onClick={(e) => toggleMute(reel.id, e)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-lg transition-all ${
                          isMuted
                            ? 'bg-black/75 text-neutral-300 border-white/15'
                            : 'bg-[#1F4B99] text-white border-[#38bdf8]/50'
                        }`}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX size={12} className="text-neutral-400" />
                            <span>Muted</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={12} className="text-[#38bdf8]" />
                            <span className="text-[#38bdf8]">Audio On</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Pause Overlay */}
                    {!isPlaying && (
                      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                        <div className="w-12 h-12 rounded-full bg-[#1F4B99] text-white flex items-center justify-center shadow-xl">
                          <Play size={20} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Title Pill */}
                    <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-none">
                      <div className="p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 space-y-0.5">
                        <div className="font-bold text-white text-xs truncate">{reel.title}</div>
                        <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <TrendingUp size={11} /> {reel.views} Views
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-2 pt-1">
                    <a
                      href={`https://wa.me/918147757479?text=${encodeURIComponent(reel.ctaMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#1F4B99] hover:bg-[#153880] text-white shadow-md shadow-[#1F4B99]/20 transition-all"
                    >
                      <MessageCircle size={13} />
                      Order This Style
                    </a>
                  </div>

                </SpotlightCard>
              );
            })}
          </div>
        )}

      </section>

      {/* ─── THE 4-LAYER RETENTION BLUEPRINT (WHY 99% OF REELS FAIL) ─── */}
      <section className="py-20 bg-[#0c0e15] border-y border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              The Retention Blueprint
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why Most Business Reels Get 200 Views <br />
              <span className="text-neutral-400 font-normal text-lg sm:text-xl">
                (And How Our Formula Fixes It)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base">The 1.5s Pattern Interrupt</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                90% of scrollers swipe away in the first 2 seconds. We research visual &amp; audio hooks that reset mindless scrolling and force viewers to stop.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base">Kinetic Dynamic Typography</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Over 70% of Instagram users watch with the sound muted. Our motion subtitles highlight keywords with color accents so they read every word.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-white text-base">Multi-Layer Sound Design</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sound design is 60% of emotional retention. We mix sub-bass drops, paper tears, swooshes, and licensed trending audio that triggers dopamine.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-bold text-white text-base">Frictionless Conversion CTA</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Views don't pay bills. Every video includes a tailored comment-to-DM keyword trigger or booking prompt that turns engaged viewers into booked clients.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── ZERO FRICTION PROCESS: 15 MINS OF YOUR WEEK ─── */}
      <section className="py-20 max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            Zero Friction Client Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            How It Works (15 Mins Of Your Week)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            No lighting crews. No complex scripts. No learning video editing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-base">
              01
            </div>
            <h3 className="font-bold text-white text-lg">Shoot 15 Mins on Your Phone</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We send you 4 bulleted hook concepts tailored to your industry. You record quick clips on your iPhone or Android during regular client appointments or office hours.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-base">
              02
            </div>
            <h3 className="font-bold text-white text-lg">Drop into Private Google Drive</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Upload raw video files straight from your camera roll into your private client folder. No trimming, no color adjusting, and no video editing skills required.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-base">
              03
            </div>
            <h3 className="font-bold text-white text-lg">Receive 4 Ready-to-Post Reels</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Within 10 days, all 4 high-retention Reels are delivered with plug-and-play captions, hashtag sets, and audio links ready to publish on Instagram, TikTok, and YouTube Shorts.
            </p>
          </div>
        </div>
      </section>

      {/* ─── HONEST COMPARISON: US VS FIVERR VS IN-HOUSE VS BIG AGENCIES ─── */}
      <section className="py-20 bg-[#0c0e15] border-y border-white/[0.08]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Honest Market Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why High-Ticket Brands Choose Us Over Freelancers &amp; Big Retainers
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[#0e121d] shadow-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#121724]">
                  <th className="p-4 sm:p-5 font-bold text-neutral-300 w-1/4">Key Deliverables</th>
                  <th className="p-4 sm:p-5 font-black text-white bg-[#101422] border-x border-[#38bdf8]/30 w-1/4">
                    <div className="text-[#38bdf8] text-xs font-mono uppercase tracking-wider mb-0.5">★ Featured</div>
                    Social Ninja's ($200 Sprint)
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-neutral-400 w-1/4">Fiverr / Cheap Upwork ($30)</th>
                  <th className="p-4 sm:p-5 font-bold text-neutral-400 w-1/4">Big Agencies ($3,000/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 font-medium text-neutral-100 bg-[#101422]/60 border-x border-[#38bdf8]/20">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
                        <span>{row.socialNinjas}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      <div className="flex items-start gap-2">
                        <X size={16} className="text-rose-400 shrink-0 mt-0.5" />
                        <span>{row.fiverr}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      <div className="flex items-start gap-2">
                        <X size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{row.bigAgency}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ─── PACKAGES & PRICING: THE 4-REEL STARTER SPRINT & SCALE OPTIONS ─── */}
      <section id="starter-trial" className="py-20 sm:py-28 max-w-[1140px] mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] px-3.5 py-1.5 rounded-full bg-[#101422] border border-[#38bdf8]/30">
            Transparent Pricing &amp; Testing
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Test Our Quality Before Any Retainer.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            We don't lock you into expensive multi-month contracts upfront. Test our hook scripting, kinetic typography, and sound design on a single 4-Reel Starter Sprint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* PACKAGE 1: THE 4-REEL STARTER SPRINT (HERO HIGHLIGHTED) */}
          <div className="lg:col-span-2">
            <SpotlightCard className="p-8 sm:p-10 bg-[#0e121d] border-2 border-[#38bdf8] rounded-3xl shadow-2xl relative overflow-hidden space-y-7 h-full flex flex-col justify-between">
              
              {/* Top Banner Tag */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#38bdf8] text-[#07090e] shadow-md shadow-[#38bdf8]/30">
                    ★ 4-Reel Starter Sprint (Most Popular)
                  </span>
                  <span className="text-xs font-mono text-neutral-300 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    <Clock size={13} className="text-[#38bdf8]" />
                    10-Day Delivery Turnaround
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    The Complete 4-Reel Proof Batch
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    Designed for founders, doctors, luxury brands, and business owners who want to test our creative caliber with zero risk or ongoing commitment.
                  </p>
                </div>

                {/* Price Box */}
                <div className="p-5 rounded-2xl bg-[#07090e] border border-white/[0.08] flex items-baseline justify-between flex-wrap gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$200</span>
                    <span className="text-neutral-400 text-xs sm:text-sm">flat one-time (approx. ₹16,500)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                    Zero Monthly Lock-In
                  </span>
                </div>

                {/* Bulleted Inclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>4 Custom 9:16 High-Retention Reels</strong> from raw phone clips</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Viral Hook Scripting</strong> &amp; niche angle research</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Kinetic Dynamic Captions</strong> &amp; glowing highlights</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Multi-Track Hollywood Sound Design</strong> &amp; audio mixing</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>10-Day Delivery Guarantee</strong> with master 4K exports</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>2 Iterative Revision Rounds</strong> included</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Full Commercial Usage Rights</strong> for organic &amp; ads</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0" />
                    <span><strong>Ready-to-Post Captions</strong> + hashtag research package</span>
                  </div>
                </div>

                {/* Callout Notice */}
                <div className="p-4 rounded-2xl bg-[#101422] border border-[#38bdf8]/30 flex items-start gap-3">
                  <Sparkles size={20} className="text-[#38bdf8] shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    <strong>Why start with a 4-Reel Starter Sprint?</strong> We believe agency retainers should be earned through tangible retention data and booked sales calls — not locked contracts. Once you see the quality, scaling into a monthly batch is simple.
                  </p>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a 
                  href={whatsappDirectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] text-white py-4 shadow-xl">
                    <MessageCircle size={16} />
                    Claim 4-Reel Starter on WhatsApp
                  </ShinyButton>
                </a>
                <a 
                  href="https://ig.me/m/nazim_ninja" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] border border-white/[0.08] text-white transition-colors"
                >
                  <Smartphone size={16} className="text-[#38bdf8]" />
                  DM on Instagram (@nazim_ninja)
                </a>
              </div>

            </SpotlightCard>
          </div>

          {/* PACKAGE 2: ONGOING SCALE RETAINERS */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
            
            {/* Monthly Growth Tier */}
            <div className="p-6 rounded-3xl bg-[#0e121d] border border-white/[0.08] space-y-4 hover:border-white/[0.2] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Monthly Growth
                </span>
                <span className="text-xs text-[#38bdf8] font-bold">2 Reels / Week</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">$380</span>
                <span className="text-xs text-neutral-400">/mo (8 Reels)</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Consistent weekly cadence for business owners building feed authority and steady inbound leads.
              </p>
              <ul className="text-xs text-neutral-300 space-y-2">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#38bdf8]" /> 8 Custom High-Retention Reels
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#38bdf8]" /> Bi-weekly Hook Ideation Calls
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#38bdf8]" /> Priority 7-Day Turnaround
                </li>
              </ul>
              <a
                href={`https://wa.me/918147757479?text=${encodeURIComponent("Hey Nazim, I want to discuss the 8-Reel Monthly Growth Retainer ($380/mo).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.08] transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>

            {/* Viral Scale Tier */}
            <div className="p-6 rounded-3xl bg-[#0e121d] border border-white/[0.08] space-y-4 hover:border-white/[0.2] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Viral Scale Retainer
                </span>
                <span className="text-xs text-[#38bdf8] font-bold">4 Reels / Week</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">$700</span>
                <span className="text-xs text-neutral-400">/mo (16 Reels)</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Omni-channel takeover across Instagram, TikTok, and YouTube Shorts for aggressive customer acquisition.
              </p>
              <ul className="text-xs text-neutral-300 space-y-2">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#38bdf8]" /> 16 High-Retention Reels / Shorts
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#38bdf8]" /> Dedicated Senior Video Editor
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#38bdf8]" /> Expedited 5-Day Delivery Batches
                </li>
              </ul>
              <a
                href={`https://wa.me/918147757479?text=${encodeURIComponent("Hey Nazim, I want to discuss the 16-Reel Viral Scale Retainer ($700/mo).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.08] transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>

          </div>

        </div>

      </section>

      {/* ─── FREQUENTLY ASKED QUESTIONS (ACCORDION) ─── */}
      <section className="py-20 bg-[#0c0e15] border-t border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Everything you need to know about testing our 4-Reel Starter Sprint.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl bg-[#0e121d] border border-white/[0.08] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#38bdf8] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-neutral-400 shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── FINAL FOOTER CALL TO ACTION ─── */}
      <div className="py-20 bg-gradient-to-t from-black to-[#07090e] border-t border-white/[0.08] text-center space-y-6 px-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            Start Today
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Ready to turn raw phone clips into high-ticket clients?
          </h3>
          <p className="text-sm text-neutral-400">
            Send a message to Nazim on WhatsApp. Let's discuss your brand, review your current content, and deliver your first batch in 10 days.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer">
            <ShinyButton variant="primary" className="text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] text-white px-8 py-4 shadow-xl shadow-[#1F4B99]/30">
              <MessageCircle size={16} />
              Message Nazim on WhatsApp (+91 81477 57479)
            </ShinyButton>
          </a>
          <a
            href="https://ig.me/m/nazim_ninja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.1] transition-colors"
          >
            <Smartphone size={16} className="text-[#38bdf8]" />
            Instagram DM (@nazim_ninja)
          </a>
        </div>
      </div>

      {/* ─── STICKY BOTTOM CONVERSION BAR (APPEARS ON SCROLL) ─── */}
      {showStickyCta && (
        <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-50 bg-[#0e121d]/95 backdrop-blur-xl border border-[#38bdf8]/40 rounded-2xl p-3 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 animate-fade-in">
          <div className="space-y-0.5 truncate pl-1">
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              4-Reel Starter Sprint: $200
            </div>
            <div className="text-[10px] text-neutral-400 truncate">
              10-Day Turnaround • Zero Retainer Lock-In
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1F4B99] hover:bg-[#153880] text-white shadow-md shadow-[#1F4B99]/30"
            >
              <MessageCircle size={13} />
              Claim Sprint
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReelsPortfolio;
