import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const servicesData = {
  'ai-automation': {
    title: 'AI & Automation',
    tagline: 'Your 24/7 intelligent sales team',
    icon: '🤖',
    color: '#5ba4f5',
    description: 'Intelligent chatbots and automated workflows that handle lead qualification, follow-ups, and sales 24/7 — while your team focuses on closing.',
    benefits: [
      'Qualify leads instantly, zero drop-off',
      'Automated follow-ups across email & SMS',
      'Direct calendar booking integration',
      'CRM syncing without manual entry'
    ],
    details: 'The average response time to an inbound lead is 47 hours. Your AI agent replies in 0.8 seconds. By instantly engaging prospects while their intent is highest, you capture revenue that your competitors ignore due to human bandwidth limits.'
  },
  'performance-marketing': {
    title: 'Performance Marketing',
    tagline: 'High-ROAS Meta & Google Campaigns',
    icon: '🚀',
    color: '#818cf8',
    description: 'Data-driven paid campaigns on Meta & Google, enriched with AI insights and creative intelligence for maximum ROAS.',
    benefits: [
      'Mathematical audience targeting',
      'Continuous A/B creative testing',
      'Deep funnel conversion tracking',
      'Live ROAS dashboards'
    ],
    details: 'We don\'t just run ads; we engineer scalable revenue systems. By testing hundreds of creative variations against data-backed audiences, we reliably drop your CAC and boost your LTV:CAC ratio.'
  },
  'creative-studio': {
    title: 'Creative Studio',
    tagline: 'Scroll-stopping content that converts',
    icon: '🎬',
    color: '#34d399',
    description: 'High-converting video content, designs and copy — all optimised by real performance data, not just gut feeling.',
    benefits: [
      'UGC & Branded Video Production',
      'Conversion-optimised Landing Pages',
      'Psychology-driven Copywriting',
      'Motion Graphics & Reels'
    ],
    details: 'Beautiful creative is useless if it doesn\'t sell. Our studio builds assets using frameworks proven to drive clicks, retention, and purchases.'
  },
  'social-media': {
    title: 'Social Media Management',
    tagline: 'Build authority, grow community',
    icon: '📱',
    color: '#f59e0b',
    description: 'Full-service social media management that grows community, drives engagement, and converts followers into customers.',
    benefits: [
      'Platform-native content strategies',
      'Active community management',
      'Trend-jacking & viral hooks',
      'Data-driven hashtag strategies'
    ],
    details: 'Consistency isn\'t enough anymore. You need relevance. We build your organic presence to capture demand before they even search for your product.'
  },
  'web-seo': {
    title: 'Web & SEO',
    tagline: 'Foundational organic growth',
    icon: '🌐',
    color: '#ec4899',
    description: 'Conversion-optimised websites and data-driven SEO that turn visitors into leads — built for speed and performance.',
    benefits: [
      'Lightning-fast page loads',
      'Technical SEO & Architecture',
      'High-intent keyword targeting',
      'Conversion rate optimization'
    ],
    details: 'Your website is your best salesperson. We ensure it ranks at the top of Google and is engineered to turn that traffic into qualified leads.'
  },
  'growth-consulting': {
    title: 'Growth Consulting',
    tagline: 'Strategic advisory for scale',
    icon: '📊',
    color: '#a78bfa',
    description: 'Strategic advisory for founders who want to build systematic, scalable growth engines — not random marketing activities.',
    benefits: [
      'Comprehensive funnel audits',
      'Go-to-Market strategies',
      'Unit economics optimization',
      'Team structuring & upskilling'
    ],
    details: 'Stop throwing tactics at the wall. We sit down with founders to architect true 90-day growth sprints with clear KPIs and board-level reporting.'
  }
};

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && servicesData[id as keyof typeof servicesData]) {
      setService(servicesData[id as keyof typeof servicesData]);
    } else {
      setService({ notFound: true });
    }
  }, [id]);

  if (!service) return <div style={{ minHeight: '100vh', background: '#07101e' }} />;

  if (service.notFound) {
    return (
      <div style={{ minHeight: '100vh', background: '#07101e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h2>Service Not Found</h2>
        <Link to="/services"><button className="btn-primary" style={{ marginTop: 20 }}>Back to Services</button></Link>
      </div>
    );
  }

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" />
      <SEO title={`${service.title} | Social Ninja's`} description={service.description} />

      <div style={{ position: 'sticky', top: 62, zIndex: 50, background: 'rgba(7,16,30,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Link to="/services" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>
            <ArrowLeft size={14} /> Back to Services
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 64 }} className="hero-grid-cols">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: `${service.color}14`, border: `1px solid ${service.color}28`, borderRadius: 12, padding: '8px 16px', fontSize: 18, marginBottom: 24, color: service.color }}>
            {service.icon} <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{service.title}</span>
          </div>
          
          <h1 style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, color: 'rgba(255,255,255,0.95)', marginBottom: 24 }}>
            {service.tagline}
          </h1>
          
          <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 40 }}>
            {service.description}
          </p>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 40 }} />

          <h2 style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 20 }}>Why it matters</h2>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 40 }}>
            {service.details}
          </p>
        </div>

        <div>
          <div className="glass-card" style={{ padding: 40, borderRadius: 24, border: `1px solid ${service.color}30`, position: 'sticky', top: 120 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 24 }}>What you get</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {service.benefits.map((b: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                  <CheckCircle2 size={18} color={service.color} style={{ flexShrink: 0, marginTop: 2 }} />
                  {b}
                </div>
              ))}
            </div>
            
            <Link to="/contact">
              <button className="btn-primary" style={{ width: '100%', fontSize: 15, padding: '16px', background: `linear-gradient(135deg, ${service.color}cc, ${service.color})` }}>
                Discuss your project
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <style>{`
        @media(max-width:900px) { .hero-grid-cols{ grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
