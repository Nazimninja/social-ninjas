import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Bot, BarChart2, Palette, Share2, Globe, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import SpotlightCard from '../components/SpotlightCard';
import AuroraBackground from '../components/AuroraBackground';
import ShinyButton from '../components/ShinyButton';

const services = [
  { id: 'ai-automation', Icon: Bot, title: 'AI & Lead Automation', sub: 'Save Time. Never Miss a Lead.', desc: 'Custom AI agents reply to Instagram DMs, WhatsApp, and web forms in under 1 second — qualifying, nurturing, and booking leads into your calendar 24/7 without manual work.', features: ['AI chatbot live on website or WhatsApp', 'Replies to leads in under 1 second', 'Qualifies leads & books calls automatically', 'Follows up via Email & WhatsApp', 'Syncs directly to CRM 2.0'], outcome: '14x faster lead response' },
  { id: 'performance-marketing', Icon: BarChart2, title: 'Performance Paid Ads Engine', sub: 'More Sales. Better ROAS.', desc: 'Creative-first Meta and Google campaigns engineered on unit economics, not vanity metrics. Average client reaches 4.5× ROAS by month 3 with our data-driven ad testing system.', features: ['Meta & Google Ads campaigns', 'Creative matrix A/B testing', 'Audience intent targeting', 'Weekly performance reports'], outcome: 'Average 4.5x ROAS' },
  { id: 'creative-studio', Icon: Palette, title: 'Creative Studio & Branding', sub: 'Content That Stops the Scroll.', desc: 'High-converting video scripts, carousel graphics, and short-form Reels designed around real engagement data — not just vanity aesthetics.', features: ['Reels & short-form video scripts', 'High-ROAS Meta & Google ad designs', 'Carousel & story layouts', 'UGC-style brand content'], outcome: '3x engagement lift' },
  { id: 'social-media', Icon: Share2, title: 'Social Media Management', sub: 'Grow Following. Build Trust.', desc: 'End-to-end social media growth handling post strategy, copywriting, community replies, and trend research to keep your audience expanding.', features: ['Content calendar across platforms', 'High-converting captions & hashtags', 'Community & comment replies', 'Monthly growth metrics'], outcome: '2x organic reach' },
  { id: 'web-seo', Icon: Globe, title: 'Web & Sub-Second SEO', sub: 'Get Found. Convert Traffic.', desc: 'Sub-second landing pages and technical SEO architectures designed to maximize conversion rates and dominate Google search rankings.', features: ['Conversion-focused web design', 'Technical SEO architecture', 'Keyword content strategy', 'Instant page speed optimization'], outcome: 'Top-3 Google ranking' },
  { id: 'growth-consulting', Icon: TrendingUp, title: 'Revenue Growth Consulting', sub: 'Strategy That Scale Profit.', desc: 'Deep-dive marketing audits and 90-day growth roadmaps designed to fix revenue funnel leaks and accelerate monthly recurring profit.', features: ['Full marketing & funnel audit', '90-day execution roadmap', 'CRO & offer positioning', 'Monthly strategy reviews'], outcome: '40% revenue lift' },
];

const Services: React.FC = () => {
  return (
    <div className="page-wrap bg-[#07090e] text-white">
      <SEO
        title="Services | Social Ninja's"
        description="AI automation, paid ads, content creation, social media management and SEO — everything your brand needs to grow."
      />

      {/* HERO WITH AURORA BACKGROUND */}
      <AuroraBackground className="pt-36 pb-20 border-b border-neutral-800/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4B99]/15 border border-[#1F4B99]/30 text-[#4281f5] text-xs font-bold uppercase tracking-wider">
            WHAT WE DO
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight animate-text-shimmer">
            Everything Your Brand Needs <br />
            <span className="text-[#1F4B99]">To Scale Revenue & Leads.</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            We build growth engines that keep working 24/7 — generating qualified leads, scaling ad returns, and driving predictable profit.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link to="/contact">
              <ShinyButton variant="primary" className="text-sm font-bold">
                Book Strategy Call <ArrowRight size={16} />
              </ShinyButton>
            </Link>
          </div>
        </div>
      </AuroraBackground>

      {/* SERVICES GRID WITH SPOTLIGHT CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <SpotlightCard key={i} className="p-8 bg-[#0e121d] border border-neutral-800 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#1F4B99]/15 border border-[#1F4B99]/30 flex items-center justify-center text-[#4281f5]">
                  <s.Icon size={24} />
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-[#3ba213]/10 text-[#3ba213] border border-[#3ba213]/20 rounded-full">
                  {s.outcome}
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold text-[#4281f5] uppercase tracking-wider mb-1">{s.sub}</div>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{s.desc}</p>

              <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                    <CheckCircle2 size={14} className="text-[#3ba213]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link to={`/services/${s.id}`} className="text-xs font-bold text-[#4281f5] hover:underline flex items-center gap-1">
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <SpotlightCard className="p-12 bg-gradient-to-br from-[#0e121d] via-[#121826] to-[#0e121d] border border-neutral-800 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white animate-text-shimmer">
            Ready to Build Your Custom Growth Engine?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            Book a free 30-minute growth strategy session. We will audit your revenue funnels and outline an action plan.
          </p>
          <div className="flex justify-center pt-2">
            <Link to="/contact">
              <ShinyButton variant="primary" className="text-sm font-bold">
                Book My Free Call <ArrowRight size={16} />
              </ShinyButton>
            </Link>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
};

export default Services;
