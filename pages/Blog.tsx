import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag, Rss } from 'lucide-react';
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

const categoryColors: Record<string,string> = {
  'AI & Automation':       '#5ba4f5',
  'Content Strategy':      '#2fcf8e',
  'Performance Marketing': '#9b8ef0',
  'SEO & Growth':          '#e8b86d',
  'Social Media':          '#f472b6',
  'Insights':              '#7a9bbf',
};

const Blog: React.FC = () => {
  useReveal();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');

  useEffect(() => {
    fetch('/api/data?resource=blogs')
      .then(r => r.json())
      .then(d => { setPosts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map((p:any) => p.category).filter(Boolean)))];
  const filtered = active === 'All' ? posts : posts.filter((p:any) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" /><div className="amb-3" />
      <SEO
        title="Blog | Social Ninja's — AI, Marketing & Growth Insights"
        description="Actionable insights on AI automation, performance marketing, social media strategy and content creation. New posts every week."
        keywords="marketing blog, AI automation tips, social media strategy, performance marketing, content creation, growth hacking, digital marketing India"
      />

      {/* HERO */}
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 72, overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>
            <Rss size={12} /> Intelligence Feed
          </div>
          <h1 className="reveal d1" style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(40px,6.5vw,80px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 0.97, marginBottom: 20, color: 'rgba(255,255,255,0.96)' }}>
            The Ninja<br /><span style={{ background: 'linear-gradient(135deg,#5ba4f5,#2fcf8e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Intelligence Log.</span>
          </h1>
          <p className="reveal d2" style={{ fontSize: 'clamp(14px,1.8vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.72, maxWidth: 520, margin: '0 auto 36px' }}>
            Weekly dispatches on AI systems, performance marketing, content that converts, and the frameworks behind brands that scale.
          </p>

          {/* Category filter */}
          {categories.length > 1 && (
            <div className="reveal d3" style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat)} style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 12.5, fontWeight: active === cat ? 600 : 400,
                  padding: '7px 16px', borderRadius: 50, cursor: 'pointer', transition: 'all .2s',
                  background: active === cat ? 'rgba(91,164,245,0.15)' : 'rgba(255,255,255,0.05)',
                  border: active === cat ? '1px solid rgba(91,164,245,0.35)' : '1px solid rgba(255,255,255,0.09)',
                  color: active === cat ? '#5ba4f5' : 'rgba(255,255,255,0.55)',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 28px 88px', position: 'relative', zIndex: 1 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(91,164,245,0.3)', borderTopColor: '#5ba4f5', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Loading posts...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>No posts yet</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>Check back soon — new posts every week.</div>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link to={`/blog/${featured.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 28 }}>
                <div className="glass-card reveal" style={{ borderRadius: 24, padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 300 }} className="blog-featured-grid">
                    {/* Colour panel */}
                    <div style={{ background: `linear-gradient(135deg, rgba(91,164,245,0.18), rgba(47,207,142,0.08))`, padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                      <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${categoryColors[featured.category] || '#7a9bbf'}15`, border: `1px solid ${categoryColors[featured.category] || '#7a9bbf'}30`, borderRadius: 50, padding: '4px 12px', fontSize: 11, fontWeight: 600, color: categoryColors[featured.category] || '#7a9bbf', marginBottom: 20 }}>
                          {featured.category || 'Insights'}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>Featured</div>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 800, letterSpacing: '-1px', color: 'rgba(255,255,255,0.96)', lineHeight: 1.12, marginBottom: 16 }}>{featured.title}</h2>
                        <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, maxWidth: 380 }}>{featured.excerpt}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 24, fontSize: 13, fontWeight: 500, color: '#5ba4f5' }}>
                        Read Post <ArrowRight size={14} />
                      </div>
                    </div>
                    {/* Meta panel */}
                    <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
                        <Clock size={12} />{featured.readTime || '5 min read'}
                        <span style={{ marginLeft: 8 }}>·</span>
                        {new Date(featured.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.38)' }}>By {featured.author || "Social Ninja's Team"}</div>
                      {/* Reading progress teaser */}
                      <div style={{ marginTop: 'auto', padding: '18px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>In this post</div>
                        <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{featured.excerpt}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="blog-grid">
                {rest.map((post: any, i: number) => (
                  <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                    <div className={`glass-card reveal d${(i % 3) + 1}`} style={{ borderRadius: 20, padding: 28, height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${categoryColors[post.category] || '#7a9bbf'}14`, border: `1px solid ${categoryColors[post.category] || '#7a9bbf'}28`, borderRadius: 50, padding: '3px 10px', fontSize: 10.5, fontWeight: 600, color: categoryColors[post.category] || '#7a9bbf', marginBottom: 16, width: 'fit-content' }}>
                        <Tag size={9} />{post.category || 'Insights'}
                      </div>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.25, marginBottom: 10, flex: 1 }}>{post.title}</h3>
                      <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11.5, color: 'rgba(255,255,255,0.35)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={11} />{post.readTime || '3 min read'}</div>
                        <div>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(60px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.35),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 12, color: 'rgba(255,255,255,0.96)', lineHeight: 1.1 }}>
            Want results, not just reads?
          </h2>
          <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Put these strategies to work for your brand. Book a free 30-minute revenue audit.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14, padding: '13px 28px' }}>Book Free Audit →</button></Link>
            <a href="/#/app/content-studio?plan=trial"><button className="btn-ghost" style={{ fontSize: 14 }}>Try AI Content Studio Free →</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:900px){.blog-featured-grid{grid-template-columns:1fr!important;} .blog-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.blog-grid{grid-template-columns:1fr!important;} .blog-featured-grid > div:last-child{display:none;}}
      `}</style>
    </div>
  );
};

export default Blog;
