import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Zap, ArrowRight, Star } from 'lucide-react';
import SEO from '../components/SEO';

const aiProductsData = {
  'content-studio': {
    name: 'AI Content Studio',
    tagline: 'Your brand\'s always-on viral content team.',
    icon: '⚡',
    color: '#5ba4f5',
    desc: 'Research what\'s trending in your niche right now, then write every caption, script, carousel and hashtag set — platform-native, specific to your brand, in 60 seconds.',
    stats: [['150+', 'Brands'], ['2.4M+', 'Posts'], ['60s', 'To generate']],
    features: [
      'Live web trend research before generation',
      'Word-for-word Reel and YouTube Short scripts',
      'Platform-native captions (IG, LinkedIn, X)',
      'Carousel slide copy ready for Canva',
      'Niche hashtag strategies'
    ],
    pricing: [
      { name: 'Starter', price: '₹2,999/mo', desc: '15 posts across 2 platforms' },
      { name: 'Growth', price: '₹5,499/mo', desc: '25 posts across 4 platforms', popular: true },
    ],
    appLink: '/#/app/content-studio?plan=trial'
  },
  'ai-sales-agent': {
    name: 'AI Sales Agent',
    tagline: 'Your 24/7 sales team that never sleeps.',
    icon: '🤖',
    color: '#9b8ef0',
    desc: 'Deploy an intelligent agent that qualifies every inbound lead, books calls directly into your calendar, and follows up automatically — around the clock.',
    stats: [['0.8s', 'Avg. Response'], ['3×', 'Conversion Lift'], ['24/7', 'Always On']],
    features: [
      'Instant lead qualification & scoring',
      'Natural language conversation',
      'Direct calendar booking',
      'CRM syncing without manual entry'
    ],
    pricing: null,
    waitlist: true,
  }
};

const AIProductLanding: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && aiProductsData[id as keyof typeof aiProductsData]) {
      setProduct(aiProductsData[id as keyof typeof aiProductsData]);
    } else {
      setProduct({ notFound: true });
    }
  }, [id]);

  if (!product) return <div style={{ minHeight: '100vh', background: '#07101e' }} />;
  if (product.notFound) {
    return (
      <div style={{ minHeight: '100vh', background: '#07101e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h2>Product Not Found</h2>
        <Link to="/ai-products"><button className="btn-primary" style={{ marginTop: 20 }}>Back to AI Products</button></Link>
      </div>
    );
  }

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO title={`${product.name} | Social Ninja's`} description={product.desc} />

      <div style={{ position: 'sticky', top: 62, zIndex: 50, background: 'rgba(7,16,30,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Link to="/ai-products" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>
            <ArrowLeft size={14} /> Back to Suite
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 28px 80px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${product.color}15`, border: `1px solid ${product.color}30`, borderRadius: 50, padding: '6px 16px', fontSize: 14, fontWeight: 700, color: product.color, marginBottom: 24 }}>
          {product.icon} {product.name}
        </div>
        
        <h1 style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, color: 'rgba(255,255,255,0.95)', marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          {product.tagline}
        </h1>
        
        <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto 40px' }}>
          {product.desc}
        </p>
        
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {product.waitlist ? (
             <Link to="/contact"><button className="btn-primary" style={{ fontSize: 16, padding: '16px 32px', background: `linear-gradient(135deg, ${product.color}cc, ${product.color})` }}>Join the Waitlist</button></Link>
          ) : (
            <>
              <a href={product.appLink}><button className="btn-primary" style={{ fontSize: 16, padding: '16px 32px', background: `linear-gradient(135deg, ${product.color}cc, ${product.color})` }}>Start Free Trial</button></a>
              <a href="#pricing"><button className="btn-ghost" style={{ fontSize: 16, padding: '16px 32px' }}>View Pricing</button></a>
            </>
          )}
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '60px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
           {product.stats.map(([val, label]: any) => (
             <div key={label}>
               <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontSize: 42, fontWeight: 800, color: product.color, marginBottom: 8 }}>{val}</div>
               <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{label}</div>
             </div>
           ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid-cols">
          <div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontSize: 40, fontWeight: 800, color: 'white', marginBottom: 32, lineHeight: 1.1 }}>Stop doing the repetitive work.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {product.features.map((f: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontSize: 16, color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${product.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={16} color={product.color} />
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card" style={{ padding: 40, borderRadius: 24, border: `1px solid ${product.color}30` }}>
            {!product.pricing ? (
               <div style={{ textAlign: 'center' }}>
                 <h3 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 16 }}>Available Soon</h3>
                 <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>We are currently rolling this out to select agency clients first. Reserve your spot to get early access.</p>
                 <Link to="/contact"><button className="btn-primary" style={{ width: '100%' }}>Join Waitlist</button></Link>
               </div>
            ) : (
               <div id="pricing">
                 <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 24, textAlign: 'center' }}>Simple, transparent pricing</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                   {product.pricing.map((p: any) => (
                     <div key={p.name} style={{ background: p.popular ? `${product.color}15` : 'rgba(255,255,255,0.03)', border: p.popular ? `1px solid ${product.color}40` : '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                           <span style={{ fontSize: 18, fontWeight: 700, color: p.popular ? product.color : 'white' }}>{p.name}</span>
                           {p.popular && <span style={{ fontSize: 10, fontWeight: 800, background: product.color, color: 'white', padding: '2px 8px', borderRadius: 20 }}>POPULAR</span>}
                         </div>
                         <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{p.desc}</div>
                       </div>
                       <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontSize: 24, fontWeight: 800, color: 'white' }}>
                         {p.price}
                       </div>
                     </div>
                   ))}
                 </div>
                 <a href={product.appLink}><button className="btn-primary" style={{ width: '100%', marginTop: 24, padding: 16, background: `linear-gradient(135deg, ${product.color}cc, ${product.color})` }}>Start Generating Now</button></a>
               </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px) { .hero-grid-cols{ grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </div>
  );
};

export default AIProductLanding;
