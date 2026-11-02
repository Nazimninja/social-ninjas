import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Smartphone, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  TrendingUp,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight
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
  videoSrc: string;
  cleanUrl: string;
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
    videoSrc: '/videos/reel-luxury-automotive.mp4',
    cleanUrl: 'https://www.instagram.com/reel/DXZRFYTESme/',
    ctaMessage: 'Hey Nazim, I love the Luxury Automotive Reel style on your samples page. Can we produce this for my brand?'
  },
  {
    id: 'hook-strategy',
    reelId: 'Dey4nf4B3Wg',
    category: 'Retention & Hook Strategy',
    creator: '@hellowjai',
    title: 'Saurabh Joshi Immediate Payoff Breakdown',
    highlight: '587K+ Views • 18.9K Likes • 1.2s Retention Hook',
    videoSrc: '/videos/reel-hook-strategy.mp4',
    cleanUrl: 'https://www.instagram.com/reel/Dey4nf4B3Wg/',
    ctaMessage: 'Hey Nazim, I want high-retention hook strategy Reels like the one on your samples page. How do we start?'
  },
  {
    id: 'kinetic-explainer',
    reelId: 'DanU-jWK_bP',
    category: 'Kinetic Motion Explainer',
    creator: '@rohitiyerexplains',
    title: 'Mercedes Naming Decoded & Explained',
    highlight: '79K+ Likes • Kinetic Motion Graphics & Subtitles',
    videoSrc: '/videos/reel-kinetic-explainer.mp4',
    cleanUrl: 'https://www.instagram.com/reel/DanU-jWK_bP/',
    ctaMessage: 'Hey Nazim, I want kinetic educational explainers like the Rohit Iyer sample. Can we talk?'
  },
  {
    id: 'brand-authority',
    reelId: 'Dcs_ND2vUsc',
    category: 'Brand Story & Leadership',
    creator: '@kccinstitutes',
    title: 'Marcus Aurelius: 5 Rules for Leadership',
    highlight: '309K+ Views • 38K Likes • Cinematic Pacing',
    videoSrc: '/videos/reel-brand-authority.mp4',
    cleanUrl: 'https://www.instagram.com/reel/Dcs_ND2vUsc/',
    ctaMessage: 'Hey Nazim, I love the Brand Leadership Reel style on your samples page. Can we create this for my business?'
  }
];

const ReelsPortfolio: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const whatsappDirectUrl = `https://wa.me/918147757479?text=${encodeURIComponent(
    "Hey Nazim, I checked your 4-Reel Starter on the website. I want to test this for my business. Can we talk?"
  )}`;

  // Ensure all videos autoplay muted reliably on mobile and desktop
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([_, video]) => {
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay policy fallback
          });
        }
      }
    });
  }, []);

  // Sync active index with carousel scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft } = carouselRef.current;
    const firstCard = carouselRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.clientWidth;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, SHOWCASE_REELS.length - 1)));
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
      setActiveIndex(index);
    }
  };

  const scrollPrev = () => {
    scrollToSlide(Math.max(0, activeIndex - 1));
  };

  const scrollNext = () => {
    scrollToSlide(Math.min(SHOWCASE_REELS.length - 1, activeIndex + 1));
  };

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setPlayingStates((prev) => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setPlayingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentVideo = videoRefs.current[id];
    if (!currentVideo) return;

    const willBeMuted = !currentVideo.muted;

    // When unmuting one video, mute all others so sound never clashes
    if (!willBeMuted) {
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
    } else {
      currentVideo.muted = true;
      setMutedStates((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <div className="page-wrap bg-[#07090e] text-neutral-300 selection:bg-[#38bdf8] selection:text-black">
      <SEO
        title="High-Retention Reels Studio & Mobile Showcase | Social Ninja's"
        description="Experience real high-retention video edits with instant autoplay and kinetic sound design. Swipe through our 4 proven formats and claim the $200 4-Reel Trial."
      />

      {/* ─── HERO SECTION ─── */}
      <AuroraBackground className="pt-32 pb-14 sm:pt-36 sm:pb-20 border-b border-white/[0.08]">
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

      {/* ─── MOBILE-FIRST HORIZONTAL CAROUSEL SHOWCASE ─── */}
      <section className="py-16 sm:py-20 max-w-[1300px] mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
              <Sparkles size={13} />
              Live Autoplaying Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Real High-Retention Reels In Action
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Mobile-optimized carousel. Swipe through our 4 editing styles and tap the audio icon to hear the sound design.
            </p>
          </div>

          {/* Desktop & Tablet Previous/Next Arrows */}
          <div className="hidden sm:flex items-center gap-2 self-end">
            <button
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              className={`p-3 rounded-xl border border-white/[0.1] bg-[#0e121d] text-white transition-all ${
                activeIndex === 0 
                  ? 'opacity-40 cursor-not-allowed' 
                  : 'hover:bg-[#182136] hover:border-[#38bdf8]/40 active:scale-95'
              }`}
              title="Previous Reel"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              disabled={activeIndex === SHOWCASE_REELS.length - 1}
              className={`p-3 rounded-xl border border-white/[0.1] bg-[#0e121d] text-white transition-all ${
                activeIndex === SHOWCASE_REELS.length - 1 
                  ? 'opacity-40 cursor-not-allowed' 
                  : 'hover:bg-[#182136] hover:border-[#38bdf8]/40 active:scale-95'
              }`}
              title="Next Reel"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Track (Swipeable on touch screens) */}
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
                className="w-[82vw] sm:w-[340px] md:w-[350px] lg:w-[360px] shrink-0 snap-center"
              >
                <SpotlightCard className="p-4 sm:p-5 bg-[#0e121d] border border-white/[0.08] rounded-3xl space-y-4 flex flex-col justify-between hover:border-white/[0.2] transition-all shadow-2xl h-full">
                  
                  {/* Card Header: Category & Clean Instagram Link */}
                  <div className="flex items-center justify-between pb-1">
                    <span className="px-3 py-1 rounded-full font-bold text-[10px] sm:text-[11px] tracking-wider uppercase bg-[#1F4B99]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                      {reel.category}
                    </span>
                    <a
                      href={reel.cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
                      title="Open Original on Instagram"
                    >
                      <span className="font-medium">{reel.creator}</span>
                      <ExternalLink size={12} className="text-[#38bdf8]" />
                    </a>
                  </div>

                  {/* 9:16 Smartphone Mockup with Real Autoplaying Video */}
                  <div 
                    onClick={() => togglePlay(reel.id)}
                    className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-black shadow-2xl cursor-pointer group select-none"
                  >
                    {/* Native HTML5 Autoplaying Video */}
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

                    {/* Top Right Floating Sound Toggle Pill */}
                    <div className="absolute top-3 right-3 z-20">
                      <button
                        onClick={(e) => toggleMute(reel.id, e)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-xl transition-all active:scale-90 ${
                          isMuted 
                            ? 'bg-black/75 hover:bg-black/90 text-neutral-300 border-white/15' 
                            : 'bg-[#1F4B99]/90 hover:bg-[#1F4B99] text-white border-[#38bdf8]/50 shadow-[#38bdf8]/20 animate-pulse'
                        }`}
                        title={isMuted ? "Tap to Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX size={13} className="text-neutral-400" />
                            <span className="text-[10px]">Tap for sound</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={13} className="text-[#38bdf8]" />
                            <span className="text-[10px] text-[#38bdf8]">Audio On</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Centered Play Indicator When Video Is Paused */}
                    {!isPlaying && (
                      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                        <div className="w-14 h-14 rounded-full bg-[#1F4B99] text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                          <Play size={24} className="fill-current ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Inside Glass Overlay for Title & Metric */}
                    <div className="absolute bottom-3 inset-x-3 z-20 pointer-events-none">
                      <div className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1 shadow-2xl">
                        <h4 className="font-bold text-white text-xs sm:text-sm leading-tight drop-shadow-md">
                          {reel.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                          <TrendingUp size={12} />
                          <span>{reel.highlight}</span>
                        </div>
                      </div>
                    </div>

                    {/* Subtle Dark Vignette for Cinematic Pacing */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
                  </div>

                  {/* Card Meta & Direct Conversion Action */}
                  <div className="space-y-3 pt-1">
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
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots & Mobile Swipe Hint */}
        <div className="flex flex-col items-center justify-center gap-3 pt-2">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {SHOWCASE_REELS.map((reel, idx) => (
              <button
                key={reel.id}
                onClick={() => scrollToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-8 bg-[#38bdf8] shadow-md shadow-[#38bdf8]/40' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <span className="text-[11px] text-neutral-400 sm:hidden">
            ← Swipe to see all 4 formats →
          </span>
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
