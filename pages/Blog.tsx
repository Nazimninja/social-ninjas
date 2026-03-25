import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag, Rss, TrendingUp, Bot, BarChart3, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

/* ── Reveal hook ── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('up'); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

import { POSTS, categoryColors } from '../data/blogPosts';

/* ── Standard Blog Card Component ── */
const BlogCard: React.FC<{ post: typeof POSTS[0]; index: number; featured?: boolean }> = ({ post, index, featured }) => {
  return (
    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
      <div
        className={`glass-card reveal d${index + 1}`}
        style={{
          borderRadius: 24,
          padding: '28px 30px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.border = `1px solid ${post.color}40`;
          e.currentTarget.style.background = `linear-gradient(135deg, ${post.color}15, rgba(255,255,255,0.02))`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flex: 1, marginBottom: 20 }}>
          <div>
            {/* Category + meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${post.color}14`, border: `1px solid ${post.color}28`, borderRadius: 50, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: post.color }}>
                {post.icon}{post.category}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'rgba(255,255,255,0.35)' }}>
                <Clock size={11} />{post.readTime} read
              </div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)' }}>{post.date}</div>
            </div>
            
            {/* Title */}
            <h2 className="blog-title" style={{
              fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
              fontSize: featured ? 'clamp(22px,3vw,32px)' : 'clamp(18px,2.2vw,24px)',
              fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2,
              color: 'rgba(255,255,255,0.95)', marginBottom: 14,
            }}>{post.title}</h2>
            
            {/* Excerpt */}
            <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>{post.excerpt}</p>
          </div>
          
          {/* Stat badge */}
          {featured && post.stat && (
            <div style={{ flexShrink: 0, textAlign: 'center', background: `${post.color}10`, border: `1px solid ${post.color}22`, borderRadius: 16, padding: '16px 20px', minWidth: 90, display: ['none', 'block'] as any }}>
              <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 26, fontWeight: 800, color: post.color, letterSpacing: '-1px', lineHeight: 1 }}>{post.stat.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 6, lineHeight: 1.4 }}>{post.stat.label}</div>
            </div>
          )}
        </div>

        {/* Read more link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: post.color, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
          Read full article <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};

/* ── Main Blog Page ── */
const Blog: React.FC = () => {
  useReveal();
  const [apiPosts, setApiPosts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Check if we already have static posts (avoid fetching if possible or merge)
    fetch('/api/data?resource=blogs')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setApiPosts(d); })
      .catch(() => {});
  }, []);

  const cats = ['All', 'AI & Automation', 'Content Strategy', 'Performance Marketing'];

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="Blog | Social Ninja's — AI, Marketing & Growth Intelligence"
        description="Weekly breakdowns on AI automation, performance marketing, content strategy and social media growth. Real tactics, real numbers."
        keywords="marketing blog India, AI automation guide, social media strategy 2026, performance marketing tips, content creation AI, ROAS optimization, lead generation"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 64, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid-cols">
            <div>
              <div className="eyebrow reveal"><Rss size={12} />Intelligence Feed · Weekly</div>
              <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque',system-ui,sans-serif", fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 18, color: 'rgba(255,255,255,0.96)' }}>
                Marketing<br />intelligence,<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>no fluff.</span>
              </h1>
              <p className="reveal d2" style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.72, maxWidth: 400, marginBottom: 32 }}>
                Real numbers, real case studies, and the exact frameworks we use to scale brands from ₹5L to ₹50L monthly revenue.
              </p>
              <div className="reveal d3" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {cats.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                    fontFamily: "'DM Sans',system-ui", fontSize: 12.5, fontWeight: activeFilter === cat ? 600 : 400,
                    padding: '7px 16px', borderRadius: 50, cursor: 'pointer', transition: 'all .2s',
                    background: activeFilter === cat ? 'rgba(91,164,245,0.15)' : 'rgba(255,255,255,0.05)',
                    border: activeFilter === cat ? '1px solid rgba(91,164,245,0.35)' : '1px solid rgba(255,255,255,0.09)',
                    color: activeFilter === cat ? '#5ba4f5' : 'rgba(255,255,255,0.5)',
                  }}>{cat}</button>
                ))}
              </div>
            </div>
            {/* Stats */}
            <div className="reveal-r d2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['3', 'Posts per week'], ['150+', 'Brands scaled'], ['₹40M+', 'Ad spend managed'], ['4.9★', 'Client rating']].map(([n, l]) => (
                <div key={l} className="glass-card" style={{ padding: '22px 18px', textAlign: 'center', borderRadius: 18 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 28, fontWeight: 800, color: '#5ba4f5', letterSpacing: '-1px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE POSTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 28px 88px', position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Latest dispatches — {POSTS.filter(p => activeFilter === 'All' || p.category === activeFilter).length} posts
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Click any post to expand</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {POSTS
            .filter(p => activeFilter === 'All' || p.category === activeFilter)
            .map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} featured={i === 0} />
            ))}
        </div>

        {/* Admin-created posts from API */}
        {apiPosts.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>More from the feed</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="api-grid">
              {apiPosts.map((post: any, i: number) => {
                const col = Object.values(categoryColors)[i % 3] as string;
                return (
                  <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-card" style={{ padding: 24, borderRadius: 18, height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${col}14`, border: `1px solid ${col}28`, borderRadius: 50, padding: '3px 10px', fontSize: 10.5, fontWeight: 600, color: col, marginBottom: 14, width: 'fit-content' }}>
                        <Tag size={9} />{post.category || 'Insights'}
                      </div>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.9)', lineHeight: 1.28, marginBottom: 10, letterSpacing: '-0.4px', flex: 1 }}>{post.title}</h3>
                      <p style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.62 }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 12.5, fontWeight: 500, color: col }}>
                        Read <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.75)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.38),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(22px,4vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 12, color: 'rgba(255,255,255,0.96)', lineHeight: 1.1 }}>
            Want these strategies working for your brand?
          </h2>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Book a free 30-minute audit and we'll show you exactly where your biggest growth leaks are.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14, padding: '13px 26px' }}>Book Free Audit →</button></Link>
            <a href="/content-studio"><button className="btn-ghost" style={{ fontSize: 14 }}>Try AI Content Free →</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .hero-grid-cols{grid-template-columns:1fr!important;gap:36px!important;} .hero-grid-cols>div:last-child{display:none;} }
        @media(max-width:768px){ .blog-title{font-size:clamp(17px,4.5vw,22px)!important;} }
        @media(max-width:640px){ .api-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </div>
  );
};

export default Blog;
