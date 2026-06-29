import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Users, 
  Target, 
  BarChart3, 
  ArrowUpRight 
} from 'lucide-react';
import SEO from '../components/SEO';

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

const toolCategories = [
  {
    title: "Premium AI Products",
    desc: "Enterprise-grade AI systems designed to automate workflows and drive conversions.",
    tools: [
      {
        id: 'content-studio',
        badge: '🟢 Live Now',
        icon: Sparkles,
        name: 'AI Content Studio',
        tagline: 'Your whole week of content written in 60s.',
        desc: 'Researches live trends in your exact niche, then writes your captions, scripts, carousels, and hashtags for all 7 major platforms. Native writing, infinite memory.',
        color: '#5ba4f5',
        link: 'https://contentstudio.socialninjas.in',
        external: true,
        btnText: '⚡ Try Content Studio Free'
      },
      {
        id: 'fit-ninja',
        badge: '🟢 Live Now',
        icon: Sparkles,
        name: 'Fit Ninja',
        tagline: 'Your personalized AI fitness coach & diet planner.',
        desc: 'Get custom diet plans, structured gym/home workout programs, and monthly AI coaching tailored to your exact body type, goals, and lifestyle.',
        color: '#ef4444',
        link: 'https://fit.socialninjas.in',
        external: true,
        btnText: '⚡ Start Your Fitness Journey'
      },
      {
        id: 'ai-sales-agent',
        badge: '🔜 Coming Soon',
        icon: Users,
        name: 'AI Sales Agent',
        tagline: 'Qualifies leads and books calls 24/7.',
        desc: 'An AI that replies to inquiries in under 1 second. Answers questions based on your data, qualifies leads, and books them directly into your Google calendar.',
        color: '#9b8ef0',
        link: '/contact',
        external: false,
        btnText: 'Join Waitlist →'
      },
      {
        id: 'ad-copy-generator',
        badge: '🔜 Coming Soon',
        icon: Target,
        name: 'AI Ad Copy Generator',
        tagline: 'High-converting ad copies in seconds.',
        desc: 'Describe your product, and the AI writes dozens of headlines, body texts, and CTAs tailored to Meta and Google Ads using proven copy frameworks.',
        color: '#2fcf8e',
        link: '/contact',
        external: false,
        btnText: 'Join Waitlist →'
      },
      {
        id: 'reporting-assistant',
        badge: '🔜 Coming Soon',
        icon: BarChart3,
        name: 'AI Reporting Assistant',
        tagline: 'Plain-English summaries of ad accounts.',
        desc: 'Connect your Meta and Google ad accounts, and get a weekly breakdown of what is working, what is not, and actionable next steps without spreadsheets.',
        color: '#e8b86d',
        link: '/contact',
        external: false,
        btnText: 'Join Waitlist →'
      }
    ]
  },
  {
    title: "Free Growth Tools",
    desc: "Lightweight, search-optimized Astro calculators to simplify marketing and finance.",
    tools: [
      {
        id: 'whatsapp-generator',
        badge: '🟢 Live Now',
        icon: MessageSquare,
        name: 'WhatsApp Link Generator',
        tagline: 'Create custom wa.me links & QR codes.',
        desc: 'Generate lifetime WhatsApp links with pre-filled messages, UTM campaign builders, customizable color QR codes, and Edge redirections. 100% Free.',
        color: '#25D366',
        link: 'https://linkwa.in',
        external: true,
        btnText: 'Open Generator'
      },
      {
        id: 'salary-calculator',
        badge: '🟢 Live Now',
        icon: DollarSign,
        name: 'US Take-Home Pay Calculator',
        tagline: 'Detailed gross-to-net tax breakdown.',
        desc: 'Calculate exact W-2 take-home pay after federal brackets, state progressive taxes (all 50 states), Medicare, Social Security, 401k, health insurance, and HSA deductions.',
        color: '#3b82f6',
        link: 'https://salary.socialninjas.in/salary-calculator',
        external: true,
        btnText: 'Open Calculator'
      },
      {
        id: 'hourly-salary-converter',
        badge: '🟢 Live Now',
        icon: Clock,
        name: 'Hourly ↔ Salary Converter',
        tagline: 'Convert wages to annual pay instantly.',
        desc: 'Convert hourly rates to annual, monthly, or paycheck periods. Adjust for PTO, holidays, overtime rates, and customize hours worked per week.',
        color: '#10b981',
        link: 'https://salary.socialninjas.in',
        external: true,
        btnText: 'Open Converter'
      }
    ]
  }
];

const Tools: React.FC = () => {
  useReveal();

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="Free Tools & AI Products | Social Ninja's"
        description="Explore our suite of AI products and free growth tools. Generate WhatsApp links, calculate tax breakdowns, convert hourly wages, and automate content."
        keywords="free marketing tools, AI products, WhatsApp link generator, US tax calculator, hourly to salary converter, marketing automation, AI agency tools, Social Ninjas tools"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>Agency Tools</div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(40px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
            Growth systems & calculators<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>built for high-performing brands.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(14px,1.8vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, maxWidth: 600, margin: '0 auto' }}>
            We build tools that save you time, optimize your digital marketing campaigns, and give you accurate mathematical breakdowns of your finances.
          </p>
        </div>
      </div>

      {/* TOOL LISTINGS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 28px 80px', display: 'flex', flexDirection: 'column', gap: 80, position: 'relative', zIndex: 1 }}>
        {toolCategories.map((category, catIdx) => (
          <div key={catIdx} className="reveal">
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: '28px', fontWeight: 700, letterSpacing: '-1px', color: 'rgba(255,255,255,0.95)', marginBottom: 8 }}>
                {category.title}
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)' }}>
                {category.desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
              {category.tools.map((t) => {
                const IconComponent = t.icon;
                return (
                  <div key={t.id} className="glass-card" style={{ padding: 28, borderRadius: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s' }}>
                    <div>
                      {/* Top Header Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${t.color}14`, border: `1px solid ${t.color}24`, display: 'flex', alignItems: 'center', justifycontent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                          <IconComponent size={20} color={t.color} strokeWidth={2} />
                        </div>
                        <span style={{ fontSize: 9.5, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: t.badge.includes('Live') ? 'rgba(47,207,142,0.1)' : 'rgba(255,255,255,0.05)', border: t.badge.includes('Live') ? '1px solid rgba(47,207,142,0.2)' : '1px solid rgba(255,255,255,0.08)', color: t.badge.includes('Live') ? '#2fcf8e' : 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.badge}
                        </span>
                      </div>

                      {/* Tool Title */}
                      <h3 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 19, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px', marginBottom: 4 }}>
                        {t.name}
                      </h3>
                      <div style={{ fontSize: 13, fontWeight: 500, color: t.color, marginBottom: 12 }}>
                        {t.tagline}
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, marginBottom: 24 }}>
                        {t.desc}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div>
                      {t.external ? (
                        <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <button style={{
                            width: '100%', padding: '12px 18px', borderRadius: 12,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: 13.5, fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { 
                            (e.currentTarget as HTMLElement).style.background = `${t.color}18`; 
                            (e.currentTarget as HTMLElement).style.borderColor = `${t.color}40`;
                            (e.currentTarget as HTMLElement).style.color = '#fff';
                          }}
                          onMouseLeave={e => { 
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; 
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
                          }}
                          >
                            {t.btnText}
                            <ArrowUpRight size={14} />
                          </button>
                        </a>
                      ) : (
                        <Link to={t.link} style={{ textDecoration: 'none' }}>
                          <button style={{
                            width: '100%', padding: '12px 18px', borderRadius: 12,
                            background: t.badge.includes('Live') ? `linear-gradient(135deg, ${t.color}cc, ${t.color})` : 'rgba(255,255,255,0.04)',
                            border: t.badge.includes('Live') ? 'none' : '1px solid rgba(255,255,255,0.08)',
                            color: '#fff',
                            fontSize: 13.5, fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            transition: 'all 0.2s',
                            boxShadow: t.badge.includes('Live') ? `0 4px 16px ${t.color}28` : 'none'
                          }}
                          onMouseEnter={e => {
                            if (!t.badge.includes('Live')) {
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                            } else {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${t.color}40`;
                            }
                          }}
                          onMouseLeave={e => {
                            if (!t.badge.includes('Live')) {
                              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                            } else {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${t.color}28`;
                            }
                          }}
                          >
                            {t.btnText}
                            <ArrowRight size={14} />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.32),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, letterSpacing: '-1.5px', marginBottom: 14, color: 'rgba(255,255,255,0.96)', lineHeight: 1.08 }}>
            Have an idea for a custom system?
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
            Our engineering team builds custom AI integrations, data scrapers, automated workflows, and internal calculators for brands looking to automate their growth.
          </p>
          <Link to="/contact">
            <button className="btn-primary" style={{ fontSize: 15, padding: '15px 36px' }}>
              Book an Integration Strategy Call →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tools;
