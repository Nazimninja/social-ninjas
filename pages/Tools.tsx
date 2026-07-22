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
  ArrowUpRight,
  Home
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
        color: '#1F4B99',
        link: '/content-studio',
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
      },
      {
        id: 'mortgage-calculator',
        badge: '🟢 Live Now',
        icon: Home,
        name: 'US Mortgage Calculator',
        tagline: 'Estimate monthly payment & affordability.',
        desc: 'Calculate monthly home payments, taxes, insurance, HOA, and amortization schedules. Check your maximum home affordability limits under standard DTI rules.',
        color: '#153880',
        link: 'https://mortgage.socialninjas.in',
        external: true,
        btnText: 'Open Calculator'
      }
    ]
  }
];

const Tools: React.FC = () => {
  useReveal();

  return (
    <div className="page-wrap" style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      
      <SEO
        title="Free Tools & AI Products | Social Ninja's"
        description="Explore our suite of AI products and free growth tools. Generate WhatsApp links, calculate tax breakdowns, convert hourly wages, and automate content."
        keywords="free marketing tools, AI products, WhatsApp link generator, US tax calculator, hourly to salary converter, marketing automation, AI agency tools, Social Ninjas tools"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, overflow: 'hidden', borderBottom: '1px solid #ededed' }}>
        
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="pill reveal" style={{ justifyContent: 'center' }}>Agency Tools</div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(40px,6.5vw,80px)', fontWeight: 700, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 20, color: '#141414' }}>
            Growth systems & calculators<br /><span style={{ background: 'linear-gradient(135deg,#1F4B99,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>built for high-performing brands.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(14px,1.8vw,17px)', fontWeight: 400, color: '#717171', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            We build tools that save you time, optimize your digital marketing campaigns, and give you accurate mathematical breakdowns of your finances.
          </p>
        </div>
      </div>

      {/* TOOL LISTINGS */}
      <div className="section-wrap-white">
        <div className="section" style={{ paddingTop: 60, paddingBottom: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80, position: 'relative', zIndex: 1 }}>
        {toolCategories.map((category, catIdx) => (
          <div key={catIdx} className="reveal">
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: '26px', fontWeight: 900, letterSpacing: '-1px', color: '#141414', marginBottom: 8 }}>
                {category.title}
              </h2>
              <p style={{ fontSize: 14, color: '#717171' }}>
                {category.desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
              {category.tools.map((t) => {
                const IconComponent = t.icon;
                return (
                  <div key={t.id} className="card" style={{ padding: 28, borderRadius: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Top Header Row */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${t.color}14`, border: `1px solid ${t.color}24`, display: 'flex', alignItems: 'center', justifycontent: 'center', alignContent: 'center', justifyContent: 'center' }}>
                          <IconComponent size={20} color={t.color} strokeWidth={2} />
                        </div>
                        <span style={{ fontSize: 9.5, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: t.badge.includes('Live') ? 'rgba(59,162,19,0.1)' : '#f5f5f5', border: t.badge.includes('Live') ? '1px solid rgba(59,162,19,0.2)' : '1px solid #ededed', color: t.badge.includes('Live') ? '#3ba213' : '#adadad', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {t.badge}
                        </span>
                      </div>

                      {/* Tool Title */}
                      <h3 style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: 19, fontWeight: 800, color: '#141414', letterSpacing: '-0.3px', marginBottom: 4 }}>
                        {t.name}
                      </h3>
                      <div style={{ fontSize: 13, fontWeight: 500, color: t.color, marginBottom: 12 }}>
                        {t.tagline}
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: 13.5, color: '#717171', lineHeight: 1.6, marginBottom: 24 }}>
                        {t.desc}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div>
                      {t.external ? (
                        <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <button style={{
                            width: '100%', padding: '12px 18px', borderRadius: 12,
                            background: '#f5f5f5',
                            border: '1px solid #ededed',
                          color: '#141414',
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
                            (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; 
                            (e.currentTarget as HTMLElement).style.borderColor = '#ededed';
                            (e.currentTarget as HTMLElement).style.color = '#141414';
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
                            background: t.badge.includes('Live') ? `linear-gradient(135deg, ${t.color}cc, ${t.color})` : '#f5f5f5',
                            border: t.badge.includes('Live') ? 'none' : '1px solid #ededed',
                            color: '#141414',
                            fontSize: 13.5, fontWeight: 600,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            transition: 'all 0.2s',
                            boxShadow: t.badge.includes('Live') ? `0 4px 16px ${t.color}28` : 'none'
                          }}
                          onMouseEnter={e => {
                            if (!t.badge.includes('Live')) {
                              (e.currentTarget as HTMLElement).style.background = '#ededed';
                              (e.currentTarget as HTMLElement).style.borderColor = '#d0d0d0';
                            } else {
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${t.color}40`;
                            }
                          }}
                          onMouseLeave={e => {
                            if (!t.badge.includes('Live')) {
                              (e.currentTarget as HTMLElement).style.background = '#f5f5f5';
                              (e.currentTarget as HTMLElement).style.borderColor = '#ededed';
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
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="section-wrap-alt">
        <section className="section">
        <div className="reveal" style={{ background: '#fff', border: '1px solid #ededed', borderRadius: 20, padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#1F4B99,transparent)' }} />
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: 14, color: '#141414', lineHeight: 1.08 }}>
            Have an idea for a custom system?
          </h2>
          <p style={{ fontSize: 15, fontWeight: 400, color: '#717171', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
            Our engineering team builds custom AI integrations, data scrapers, automated workflows, and internal calculators for brands looking to automate their growth.
          </p>
          <Link to="/contact">
            <button className="btn-primary" style={{ fontSize: 15, padding: '15px 36px' }}>
              Book an Integration Strategy Call →
            </button>
          </Link>
        </div>
      </section>
    </div>
  </div>
  );
};

export default Tools;
