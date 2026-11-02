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
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  Check
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
  views: string;
  likes: string;
  retentionStat: string;
  videoSrc: string;
  cleanUrl: string;
  ctaMessage: string;
  hookSummary: string;
}

const SHOWCASE_REELS: ShowcaseReel[] = [
  {
    id: 'automotive-luxury',
    reelId: 'DXZRFYTESme',
    category: 'Automotive & Luxury',
    creator: '@9thgear_',
    title: 'BMW iX vs. Mercedes EQS Comparison',
    views: '52K+ Views',
    likes: '1.4K Likes',
    retentionStat: '88% Hold Rate',
    videoSrc: '/videos/reel-luxury-automotive.mp4',
    cleanUrl: 'https://www.instagram.com/reel/DXZRFYTESme/',
    ctaMessage: 'Hey Nazim, I love the Luxury Automotive Reel style on your samples page. Can we produce this for my brand?',
    hookSummary: 'Micro-second sensory sound design + split-screen comparison stops high-intent luxury buyers in 0.8s.'
  },
  {
    id: 'hook-strategy',
    reelId: 'Dey4nf4B3Wg',
    category: 'Retention & Hook Strategy',
    creator: '@hellowjai',
    title: 'Saurabh Joshi Immediate Payoff Breakdown',
    views: '587K+ Views',
    likes: '18.9K Likes',
    retentionStat: '92% 5s Retention',
    videoSrc: '/videos/reel-hook-strategy.mp4',
    cleanUrl: 'https://www.instagram.com/reel/Dey4nf4B3Wg/',
    ctaMessage: 'Hey Nazim, I want high-retention hook strategy Reels like the one on your samples page. How do we start?',
    hookSummary: 'Immediate climax payoff teaser in first 1.2s makes swiping away physically impossible.'
  },
  {
    id: 'kinetic-explainer',
    reelId: 'DanU-jWK_bP',
    category: 'Kinetic Motion Explainer',
    creator: '@rohitiyerexplains',
    title: 'Mercedes Naming Decoded & Explained',
    views: '640K+ Plays',
    likes: '79K+ Likes',
    retentionStat: '4.8x Re-watch Ratio',
    videoSrc: '/videos/reel-kinetic-explainer.mp4',
    cleanUrl: 'https://www.instagram.com/reel/DanU-jWK_bP/',
    ctaMessage: 'Hey Nazim, I want kinetic educational explainers like the Rohit Iyer sample. Can we talk?',
    hookSummary: 'Curiosity reframing + word-by-word motion typography that makes complex topics effortless to watch.'
  },
  {
    id: 'brand-authority',
    reelId: 'Dcs_ND2vUsc',
    category: 'Brand Story & Leadership',
    creator: '@kccinstitutes',
    title: 'Marcus Aurelius: 5 Rules for Leadership',
    views: '309K+ Views',
    likes: '38K Likes',
    retentionStat: '86% Completion Rate',
    videoSrc: '/videos/reel-brand-authority.mp4',
    cleanUrl: 'https://www.instagram.com/reel/Dcs_ND2vUsc/',
    ctaMessage: 'Hey Nazim, I love the Brand Leadership Reel style on your samples page. Can we create this for my business?',
    hookSummary: 'Executive gravitas pacing + atmospheric low-end audio that commands instant authority.'
  }
];

const FAQS = [
  {
    q: "I'm awkward on camera or don't know what to talk about. How do we solve that?",
    a: "You don't need to guess. We give you 4 bulleted hook scripts tailored to your niche. You can record 15-second natural clips on your phone, or send raw footage of your work/clinic and our team will build faceless kinetic voiceover reels."
  },
  {
    q: "Do I need a professional camera or lighting setup?",
    a: "No. Every reel on this page was recorded on standard iPhones and Android smartphones. Good natural window lighting is all you need — our retention editing, kinetic captions, and sound design do the rest."
  },
  {
    q: "How do I send my raw footage to your team?",
    a: "We give you a private Google Drive link. Just drag and drop your raw phone clips straight from your camera roll. No editing, sorting, or trimming needed."
  },
  {
    q: "What if I need revisions or adjustments?",
    a: "Every 4-Reel Starter Sprint includes 2 rounds of revisions. If you want a caption re-worded, a font adjusted, or a transition tweaked, we refine it promptly."
  }
];

const ReelsPortfolio: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I want to claim the 4-Reel Starter Sprint ($200) for my business. Can we talk?"
  )}`;

  // Autoplay videos muted reliably
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

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.clientWidth;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveReelIndex(Math.max(0, Math.min(index, SHOWCASE_REELS.length - 1)));
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveReelIndex(index);
    }
  };

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

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    const willBeMuted = !currentVideo.muted;

    if (!willBeMuted) {
      // Unmuting one mutes all others to prevent sound clash
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

  return (
    <div className="page-wrap bg-[#07090e] text-neutral-300 selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="4-Reel Starter Sprint ($200) | Social Ninja's Work Samples"
        description="High-retention Reels engineered from raw phone video with pattern-interrupt hooks, kinetic typography, and multi-track sound design. One simple $200 test sprint."
        faq={FAQS}
        service={{
          name: "4-Reel Starter Sprint",
          description: "4 custom high-retention 9:16 reels from raw phone clips with viral hooks, kinetic subtitles, and sound design.",
          price: "$200",
          providerName: "Social Ninja's"
        }}
      />

      {/* ─── MOBILE-OPTIMIZED HERO: STRAIGHT, CLEAR & COMPELLING ─── */}
      <AuroraBackground className="pt-28 pb-12 sm:pt-36 sm:pb-20 border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center space-y-5">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101422] border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-bold tracking-wider uppercase shadow-md shadow-[#38bdf8]/5">
            <Sparkles size={13} className="text-[#38bdf8]" />
            4-Reel Starter Sprint • $200 Flat
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
            High-Retention Reels That Turn <br />
            <span className="bg-gradient-to-r from-white via-neutral-100 to-[#38bdf8] bg-clip-text text-transparent">
              Scrollers Into Paying Clients.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            You shoot 15-second raw clips on your phone. We research the hooks, edit with kinetic subtitles, and mix Hollywood sound design that fills your DM calendar.
          </p>

          {/* Direct Mobile Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a href="#claim-sprint" className="w-full sm:w-auto">
              <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] shadow-lg shadow-[#1F4B99]/30 text-white px-7 py-3.5">
                Claim 4-Reel Sprint ($200) <ArrowRight size={16} />
              </ShinyButton>
            </a>
            <a 
              href={whatsappDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] text-white border border-white/[0.1] transition-all"
            >
              <MessageCircle size={16} className="text-[#38bdf8]" />
              Chat on WhatsApp
            </a>
          </div>

          {/* 3 Clear Guarantees */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-neutral-400 font-medium">
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={14} className="text-[#38bdf8]" /> Shot on Phone
            </span>
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={14} className="text-[#38bdf8]" /> 10-Day Turnaround
            </span>
            <span className="flex items-center gap-1.5 bg-[#0e121d] px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <CheckCircle2 size={14} className="text-[#38bdf8]" /> Zero Retainer Lock-In
            </span>
          </div>

        </div>
      </AuroraBackground>

      {/* ─── LIVE AUTOPLAYING SAMPLES: OPTIMIZED FOR MOBILE SWIPE ─── */}
      <section className="py-12 sm:py-20 max-w-[1140px] mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
              <Zap size={13} />
              Live Work Samples
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Swipe to See the Retention Edits
            </h2>
            <p className="text-xs text-neutral-400">
              Tap the audio button to hear the sound design. Swipe horizontally to view all 4 formats.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollToSlide(Math.max(0, activeReelIndex - 1))}
              disabled={activeReelIndex === 0}
              className={`p-2.5 rounded-xl border border-white/[0.1] bg-[#0e121d] text-white transition-all ${
                activeReelIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#182136] hover:border-[#38bdf8]/40'
              }`}
              aria-label="Previous Reel"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollToSlide(Math.min(SHOWCASE_REELS.length - 1, activeReelIndex + 1))}
              disabled={activeReelIndex === SHOWCASE_REELS.length - 1}
              className={`p-2.5 rounded-xl border border-white/[0.1] bg-[#0e121d] text-white transition-all ${
                activeReelIndex === SHOWCASE_REELS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#182136] hover:border-[#38bdf8]/40'
              }`}
              aria-label="Next Reel"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Mobile-First Swipe Carousel */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {SHOWCASE_REELS.map((reel) => {
            const isPlaying = playingStates[reel.id] ?? true;
            const isMuted = mutedStates[reel.id] ?? true;

            return (
              <div 
                key={reel.id}
                className="w-[84vw] sm:w-[320px] md:w-[330px] shrink-0 snap-center"
              >
                <SpotlightCard className="p-4 bg-[#0e121d] border border-white/[0.08] rounded-3xl space-y-3.5 flex flex-col justify-between hover:border-[#38bdf8]/30 transition-all shadow-xl h-full">
                  
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-0.5">
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase bg-[#101422] text-[#38bdf8] border border-[#38bdf8]/30">
                      {reel.category}
                    </span>
                    <a
                      href={reel.cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
                    >
                      <span>{reel.creator}</span>
                      <ExternalLink size={11} className="text-[#38bdf8]" />
                    </a>
                  </div>

                  {/* 9:16 Smartphone Mockup with Real Autoplaying Video */}
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
                      className="w-full h-full object-cover rounded-2xl"
                    />

                    {/* Top Floating Sound Toggle Pill */}
                    <div className="absolute top-3 right-3 z-20">
                      <button
                        onClick={(e) => toggleMute(reel.id, e)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-xl transition-all active:scale-90 ${
                          isMuted 
                            ? 'bg-black/80 hover:bg-black/95 text-neutral-200 border-white/20' 
                            : 'bg-[#1F4B99] text-white border-[#38bdf8]/60 shadow-[#38bdf8]/30'
                        }`}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX size={13} className="text-neutral-400" />
                            <span>Tap for Sound</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} className="text-[#38bdf8]" />
                            <span className="text-[#38bdf8]">Audio On</span>
                            <span className="flex items-center gap-0.5 ml-0.5">
                              <span className="w-0.5 h-2 bg-[#38bdf8] animate-pulse" />
                              <span className="w-0.5 h-3 bg-[#38bdf8] animate-ping" />
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Centered Play Indicator When Video Is Paused */}
                    {!isPlaying && (
                      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                        <div className="w-12 h-12 rounded-full bg-[#1F4B99] text-white flex items-center justify-center shadow-xl">
                          <Play size={20} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* In-Video Metric Overlay */}
                    <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-none">
                      <div className="p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 space-y-0.5 shadow-xl">
                        <div className="font-bold text-white text-xs truncate leading-snug">
                          {reel.title}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                          <span className="flex items-center gap-1">
                            <TrendingUp size={11} /> {reel.views}
                          </span>
                          <span className="text-[#38bdf8]">{reel.retentionStat}</span>
                        </div>
                      </div>
                    </div>

                    {/* Vignette */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
                  </div>

                  {/* Hook Summary Note */}
                  <div className="p-2.5 rounded-xl bg-[#101422] border border-[#38bdf8]/20 text-[11px] text-neutral-300 leading-snug">
                    <strong className="text-[#38bdf8]">Hook: </strong>
                    {reel.hookSummary}
                  </div>

                  {/* Direct WhatsApp Action for this specific style */}
                  <div>
                    <a
                      href={`https://wa.me/918147757479?text=${encodeURIComponent(reel.ctaMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold bg-[#1F4B99] hover:bg-[#153880] text-white shadow-md shadow-[#1F4B99]/20 transition-all active:scale-[0.98]"
                    >
                      <MessageCircle size={13} />
                      Order This Style on WhatsApp
                    </a>
                  </div>

                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {SHOWCASE_REELS.map((reel, idx) => (
            <button
              key={reel.id}
              onClick={() => scrollToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeReelIndex === idx 
                  ? 'w-7 bg-[#38bdf8] shadow-md shadow-[#38bdf8]/30' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </section>

      {/* ─── HOW IT WORKS (15 MINS OF YOUR WEEK) ─── */}
      <section className="py-14 bg-[#0c0e15] border-y border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Zero Friction Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How It Works (15 Mins Of Your Week)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-white text-sm">Shoot on Your Phone</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We send you 4 bulleted hook concepts. You shoot quick raw clips on your phone during regular appointments or office hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-white text-sm">Drop into Google Drive</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload raw clips to your private folder. No editing, no trimming, and no video software required.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e121d] border border-white/[0.08] space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1F4B99]/20 text-[#38bdf8] flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-white text-sm">Get 4 Finished Reels</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Within 10 days, all 4 high-retention Reels are delivered with captions and audio links ready to publish.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── THE SINGLE $200 STARTER SPRINT OFFER (ZERO CONFUSION) ─── */}
      <section id="claim-sprint" className="py-16 sm:py-24 max-w-[800px] mx-auto px-4 sm:px-6">
        
        <SpotlightCard className="p-6 sm:p-10 bg-[#0e121d] border-2 border-[#38bdf8] rounded-3xl shadow-2xl relative overflow-hidden space-y-6">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#38bdf8] text-[#07090e] shadow-md shadow-[#38bdf8]/30">
                ★ 4-Reel Starter Sprint
              </span>
              <span className="text-xs font-mono text-neutral-300 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                <Clock size={12} className="text-[#38bdf8]" />
                10-Day Turnaround Guarantee
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Test Our Creative Standard Before Any Retainer.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
                Get 4 high-retention Reels produced for your business with zero monthly lock-in or agency contracts.
              </p>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#07090e] border border-white/[0.08] flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-2.5">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">$200</span>
              <span className="text-neutral-400 text-xs sm:text-sm">flat one-time (approx. ₹16,500)</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              No Monthly Retainer
            </span>
          </div>

          {/* Included Deliverables Checklist */}
          <div className="space-y-2.5 text-xs sm:text-sm text-neutral-200">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>4 Custom 9:16 High-Retention Reels</strong> from your raw phone clips</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>Viral Hook Scripting &amp; Angle Research</strong> (we write what stops the scroll)</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>Kinetic Typography &amp; Subtitles</strong> with glowing keyword emphasis</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>Multi-Layer Sound Design</strong> (sub-drops, swooshes &amp; licensed trending audio)</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>10-Day Delivery Guarantee</strong> with master 4K exports</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>2 Iterative Revision Rounds</strong> included until brand-aligned</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>Full Commercial Usage Rights</strong> for organic posting &amp; paid Meta Ads</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-[#38bdf8] shrink-0 mt-0.5" />
              <span><strong>Ready-to-Post Captions</strong> and curated hashtag sets</span>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3.5 rounded-2xl bg-[#101422] border border-[#38bdf8]/30 flex items-start gap-3">
            <ShieldCheck size={20} className="text-[#38bdf8] shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong>Risk-Free Creative Test:</strong> We don't believe in locking clients into $2,000/mo retainers upfront. Test our hooks and retention editing on a single batch of 4 Reels first.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a 
              href={whatsappDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <ShinyButton variant="primary" className="w-full text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] text-white py-4 shadow-xl">
                <MessageCircle size={16} />
                Claim 4-Reel Sprint on WhatsApp
              </ShinyButton>
            </a>
            <a 
              href="https://ig.me/m/nazim_ninja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-[#121724] hover:bg-[#182136] border border-white/[0.08] text-white transition-colors"
            >
              <Smartphone size={16} className="text-[#38bdf8]" />
              DM on Instagram
            </a>
          </div>

        </SpotlightCard>

      </section>

      {/* ─── SHORT OBJECTION-BUSTING FAQ ─── */}
      <section className="py-14 bg-[#0c0e15] border-t border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-6">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl bg-[#0e121d] border border-white/[0.08] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-white hover:text-[#38bdf8] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-neutral-400 shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-neutral-300 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── FINAL FOOTER CTA ─── */}
      <div className="py-16 bg-gradient-to-t from-black to-[#07090e] border-t border-white/[0.08] text-center space-y-5 px-4">
        <h3 className="text-2xl sm:text-3xl font-black text-white max-w-lg mx-auto">
          Ready to turn phone clips into booked clients?
        </h3>
        <div className="flex items-center justify-center gap-3">
          <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer">
            <ShinyButton variant="primary" className="text-sm font-bold bg-[#1F4B99] hover:bg-[#153880] text-white px-7 py-3.5">
              <MessageCircle size={16} />
              Message Nazim on WhatsApp (+91 81477 57479)
            </ShinyButton>
          </a>
        </div>
      </div>

      {/* ─── MOBILE STICKY BOTTOM CONVERSION BAR ─── */}
      <div className="fixed bottom-3 inset-x-3 sm:hidden z-50 bg-[#0e121d]/95 backdrop-blur-xl border border-[#38bdf8]/40 rounded-2xl p-2.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-2.5">
        <div className="space-y-0.5 truncate pl-1">
          <div className="text-xs font-black text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            4-Reel Starter: $200
          </div>
          <div className="text-[10px] text-neutral-400 truncate">
            10-Day Turnaround • No Retainer
          </div>
        </div>
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1F4B99] text-white shrink-0 shadow-md shadow-[#1F4B99]/30"
        >
          <MessageCircle size={13} />
          Claim Sprint
        </a>
      </div>

    </div>
  );
};

export default ReelsPortfolio;
