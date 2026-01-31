import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, BarChart3, ArrowRight, Layers, MessageSquare, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

// Internal Component for Parallax Cards
interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  bgContent: React.ReactNode;
  videoSrc?: string;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
  children,
  className = "",
  bgContent,
  videoSrc
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Disable heavy calculations on touch devices
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    cardRef.current.style.setProperty('--mouse-x', x.toString());
    cardRef.current.style.setProperty('--mouse-y', y.toString());
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isTouch) return;
    cardRef.current.style.setProperty('--mouse-x', '0');
    cardRef.current.style.setProperty('--mouse-y', '0');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0A0A] transition-all duration-500 hover:border-brand-primary/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] group ${className}`}
      style={{
        perspective: '1000px',
        // Default vars to avoid null issues
        ['--mouse-x' as any]: '0',
        ['--mouse-y' as any]: '0'
      }}
    >
      {/* Background Visual Layer with Parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Video Background Layer */}
        {videoSrc && (
          <div className="absolute inset-0 z-0 opacity-20 md:group-hover:opacity-40 transition-opacity duration-700">
            <div className="absolute inset-0 bg-brand-dark/50 z-10 mix-blend-multiply"></div> {/* Darken overlay */}
            <video
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover grayscale mix-blend-screen transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Abstract/SVG Layer (Sits on top of video) */}
        <div className="relative z-10 w-full h-full">
          {bgContent}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col p-8 md:p-10 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const serviceDetails = [
    {
      title: "AI & Automation",
      description: "Custom chatbots and workflows to automate lead qualification and sales processes.",
      features: [
        "24/7 Sales Chatbots",
        "Automated Follow-ups",
        "CRM Integration",
        "Lead Scoring Systems",
        "Workflow Optimization"
      ]
    },
    {
      title: "Performance Marketing",
      description: "AI-enhanced ad spend management on Meta & Google to maximize ROI.",
      features: [
        "Predictive Audience Targeting",
        "A/B Testing Creatives",
        "Retargeting Campaigns",
        "Real-time ROI Tracking",
        "Conversion Optimization"
      ]
    },
    {
      title: "Creative Studio",
      description: "Data-backed video and design assets tailored to convert viewers into customers.",
      features: [
        "High-Converting Video Ads",
        "Persuasive Copywriting",
        "3D Visuals & Animation",
        "Brand Identity Design",
        "Social Media Content"
      ]
    },
    {
      title: "Web & Tech",
      description: "Fast, SEO-optimized websites and custom applications built on modern technology.",
      features: [
        "High-Speed Landing Pages",
        "Custom Web Apps (React/Next.js)",
        "SEO & Performance Tuning",
        "API Integrations",
        "Scalable Architecture"
      ]
    }
  ];

  return (
    <div className="pt-24 pb-32 min-h-screen bg-[#020617] overflow-hidden selection:bg-brand-primary selection:text-black">
      <SEO
        title="Our Services | Performance Marketing, AI & Creative | Social Ninja's"
        description="Comprehensive digital growth solutions. From precision ad campaigns and creative production to AI automation and high-performance web development."
      />

      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Modernist Header */}
        <div className="mb-12 md:mb-16 max-w-3xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-primary">What We Do</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Comprehensive Digital Growth Solutions.
          </h1>
          <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-xl">
            We provide the tools and strategies you need to scale. Simple, transparent, and effective.
          </p>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">

          {/* Card 1: AI & Automation (Wide) */}
          <div className="md:col-span-2 h-full">
            <ScrollReveal className="h-full">
              <ParallaxCard
                className="h-full group"
                videoSrc="https://cdn.coverr.co/videos/coverr-neural-network-5238/1080p.mp4"
                bgContent={
                  <>
                    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-brand-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
                      style={{ transform: 'translate(calc(-50% + var(--mouse-x) * -20px), calc(-50% + var(--mouse-y) * -20px))' }}></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="relative w-48 h-48 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"
                        style={{ transform: 'rotateX(60deg) translate(calc(var(--mouse-x) * 10px), calc(var(--mouse-y) * 10px))' }}>
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-brand-primary rounded-full blur-[2px] shadow-[0_0_10px_#38bdf8]"></div>
                      </div>
                      <div className="absolute w-32 h-32 border border-brand-primary/20 rounded-full animate-[spin_7s_linear_infinite_reverse]"
                        style={{ transform: 'translate(calc(var(--mouse-x) * 20px), calc(var(--mouse-y) * 20px))' }}></div>
                    </div>
                  </>
                }
              >
                <div className="relative z-10 flex flex-col h-full justify-between pointer-events-auto">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 border border-brand-primary/20">
                      <MessageSquare size={20} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3">AI & Automation</h2>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mb-6">
                      Deploy 24/7 intelligent agents. We build custom workflows that handle sales qualification and support automatically.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Chatbots', 'CRM Sync', 'Auto-Replies', 'Sales Agents'].map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Wide Card Action */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link to="/contact">
                      <button className="px-6 py-3 rounded-xl bg-brand-primary text-black font-bold text-sm shadow-xl hover:bg-white transition-colors flex items-center gap-2">
                        Get Automated <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </ParallaxCard>
            </ScrollReveal>
          </div>

          {/* Card 2: Web & Tech (Square) */}
          <div className="md:col-span-1 h-full">
            <ScrollReveal className="h-full" delay="100ms">
              <ParallaxCard
                className="h-full group"
                videoSrc="https://cdn.coverr.co/videos/coverr-html-coding-5407/1080p.mp4"
                bgContent={
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    transform: 'translate(calc(var(--mouse-x) * -15px), calc(var(--mouse-y) * -15px))'
                  }}></div>
                }
              >
                <div className="mt-auto pointer-events-auto relative">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-12">
                    <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-secondary mb-6 border border-brand-secondary/20">
                      <Layers size={24} />
                    </div>

                    <h2 className="text-2xl font-display font-bold text-white mb-3">Web & Tech</h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      Fast, secure, and beautiful websites that actually rank.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Fast Loading', 'SEO', 'Secure'].map((tag, i) => (
                        <span key={i} className="text-xs font-bold uppercase tracking-wider text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Slide-Up CTA */}
                  <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Link to="/contact">
                      <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm shadow-xl hover:bg-brand-secondary hover:text-white transition-colors flex items-center justify-center gap-2">
                        Build Site <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </ParallaxCard>
            </ScrollReveal>
          </div>

          {/* Card 3: Performance Marketing (Square) */}
          <div className="md:col-span-1 h-full">
            <ScrollReveal className="h-full" delay="200ms">
              <ParallaxCard
                className="h-full group"
                videoSrc="https://cdn.coverr.co/videos/coverr-business-charts-5369/1080p.mp4"
                bgContent={
                  <>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-primary/10 to-transparent perspective-3d opacity-30">
                      <div className="w-full h-full border-t border-brand-primary/20"
                        style={{ transform: 'rotateX(60deg) scale(2)' }}></div>
                    </div>
                    <svg viewBox="0 0 200 100" className="absolute bottom-20 left-0 w-full h-32 stroke-brand-primary fill-none stroke-[3px] drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                      style={{ transform: 'translate(calc(var(--mouse-x) * 15px), calc(var(--mouse-y) * 5px))' }}>
                      <path d="M0 80 Q 50 70, 80 40 T 200 10" />
                    </svg>
                  </>
                }
              >
                <div className="mt-auto pointer-events-auto relative">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-12">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-6 border border-green-500/20">
                      <BarChart3 size={20} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3">Performance Marketing</h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      Data-driven ad campaigns on Meta & Google. We focus on getting you more customers for less money.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Meta Ads', 'Google Ads', 'ROI Focused'].map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Link to="/contact">
                      <button className="w-full py-3 rounded-xl bg-green-500 text-black font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        Get More Leads <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </ParallaxCard>
            </ScrollReveal>
          </div>

          {/* Card 4: Creative Studio (Square) */}
          <div className="md:col-span-1 h-full">
            <ScrollReveal className="h-full" delay="300ms">
              <ParallaxCard
                className="h-full group"
                videoSrc="https://cdn.coverr.co/videos/coverr-ink-swirl-in-water-18/1080p.mp4"
                bgContent={
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
                }
              >
                <div className="mt-auto pointer-events-auto relative">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-12">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 border border-purple-500/20">
                      <Video size={20} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3">Creative Studio</h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      Eye-catching videos and designs that grab attention and tell your story effectively.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Video Ads', 'Graphic Design', 'Branding'].map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Link to="/contact">
                      <button className="w-full py-3 rounded-xl bg-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        Create Content <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </ParallaxCard>
            </ScrollReveal>
          </div>

          {/* Card 5: Growth Strategy (Square) */}
          <div className="md:col-span-1 h-full">
            <ScrollReveal className="h-full" delay="400ms">
              <ParallaxCard
                className="h-full group"
                videoSrc="https://cdn.coverr.co/videos/coverr-time-lapse-in-modern-office-5264/1080p.mp4"
                bgContent={
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                }
              >
                <div className="mt-auto pointer-events-auto relative">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-12">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 border border-brand-accent/20">
                      <BarChart3 size={20} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-3">Growth Strategy</h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                      We don't just run ads; we build a full plan to grow your business sustainably.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Consulting', 'Audits', 'Roadmaps'].map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <Link to="/contact">
                      <button className="w-full py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-sm shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        Get a Strategy <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </ParallaxCard>
            </ScrollReveal>
          </div>

          {/* CTA Banner */}
          <div className="md:col-span-3 mt-8">
            <ScrollReveal>
              <Link to="/contact">
                <div className="bg-brand-primary rounded-[32px] p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group hover:shadow-[0_0_50px_rgba(56,189,248,0.3)] transition-all duration-500">
                  {/* Animated Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-display font-black text-brand-dark uppercase tracking-tight mb-2">Ready to Grow?</h3>
                    <p className="text-brand-dark/80 font-bold text-lg">Hit the button to get a custom roadmap for your business.</p>
                  </div>
                  <div className="relative z-10 mt-6 md:mt-0 bg-brand-dark text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 group-hover:scale-105 transition-transform shadow-2xl border border-white/10">
                    Start Project <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Detailed List (SEO) - Refined */}
        <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-white text-3xl font-display font-bold mb-2">Service Breakdown</h2>
              <p className="text-neutral-500 text-sm">Detailed look at exactly what we offer.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {serviceDetails.map((service, i) => (
              <div key={i} className="group">
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-brand-primary transition-colors">{service.title}</h4>
                <p className="text-xs text-neutral-500 mb-6 border-b border-white/5 pb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-neutral-400 text-sm flex items-start gap-3 group/item">
                      <CheckCircle2 size={16} className="text-brand-dark/50 group-hover/item:text-brand-primary transition-colors mt-0.5 shrink-0" />
                      <span className="group-hover/item:text-neutral-300 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
