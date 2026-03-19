import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Tag, Share2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const categoryColors: Record<string,string> = {
  'AI & Automation': '#5ba4f5', 'Content Strategy': '#2fcf8e',
  'Performance Marketing': '#9b8ef0', 'SEO & Growth': '#e8b86d',
  'Social Media': '#f472b6', 'Insights': '#7a9bbf',
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/data?resource=blogs&id=${id}`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch('/api/data?resource=blogs').then(r => r.json()).catch(() => []),
    ]).then(([post, all]) => {
      setPost(post);
      if (post && Array.isArray(all)) {
        setRelated(all.filter((p:any) => p.id !== post.id && p.category === post.category).slice(0, 3));
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#07101e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(91,164,245,0.3)', borderTopColor: '#5ba4f5', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#07101e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
      <SEO title="Post Not Found | Social Ninja's Blog" description="This blog post could not be found." />
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Post Not Found</h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>This post may have been moved or deleted.</p>
      <Link to="/blog"><button className="btn-primary" style={{ fontSize: 14 }}>← Back to Blog</button></Link>
    </div>
  );

  const color = categoryColors[post.category] || '#7a9bbf';

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="page-bg" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div className="amb-1" /><div className="amb-2" />
      <SEO
        title={`${post.title} | Social Ninja's Blog`}
        description={post.excerpt}
        type="article"
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.publishedAt,
          section: post.category || 'Insights',
          tags: [post.category, 'Social Ninja\'s', 'Marketing'],
          author: post.author || "Social Ninja's Team",
        }}
      />

      {/* Back nav */}
      <div style={{ position: 'sticky', top: 62, zIndex: 50, background: 'rgba(7,16,30,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '12px 28px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/blog" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', transition: 'color .2s' }}>
            <ArrowLeft size={14} /> All Posts
          </Link>
          <button onClick={share} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '6px 14px', cursor: 'pointer' }}>
            <Share2 size={12} /> Share
          </button>
        </div>
      </div>

      {/* Article */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '60px 28px 80px', position: 'relative', zIndex: 1 }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${color}14`, border: `1px solid ${color}28`, borderRadius: 50, padding: '4px 12px', fontSize: 11, fontWeight: 600, color }}>
            <Tag size={10} />{post.category || 'Insights'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.38)' }}>
            <Clock size={11} />{post.readTime || '5 min read'}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>By {post.author || "Social Ninja's Team"}</div>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, color: 'rgba(255,255,255,0.97)', marginBottom: 20 }}>{post.title}</h1>

        {/* Excerpt */}
        <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.58)', lineHeight: 1.7, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.08)', fontStyle: 'italic' }}>{post.excerpt}</p>

        {/* Content */}
        <div className="blog-content">
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
        </div>

        {/* Author card */}
        <div style={{ marginTop: 56, padding: '24px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#1d4ed8,#5ba4f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🥷</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 3 }}>{post.author || "Social Ninja's Team"}</div>
            <div style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.6 }}>Performance marketing, AI automation, and content strategy for ambitious brands. <Link to="/about" style={{ color: '#5ba4f5', textDecoration: 'none' }}>About us →</Link></div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5ba4f5', marginBottom: 24 }}>More in {post.category}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="related-grid">
            {related.map((r:any) => (
              <Link key={r.id} to={`/blog/${r.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: 24, borderRadius: 18, height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.88)', lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.3px' }}>{r.title}</h3>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.62, flex: 1 }}>{r.excerpt}</p>
                  <div style={{ fontSize: 11, color: '#5ba4f5', marginTop: 14, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>Read <ArrowRight size={11} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(8,14,26,0.7)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 22, padding: '44px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(91,164,245,0.35),transparent)' }} />
          <h2 style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 'clamp(22px,4vw,36px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 10, color: 'rgba(255,255,255,0.96)', lineHeight: 1.1 }}>
            Ready to implement this?
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.48)', marginBottom: 24 }}>Book a free 30-minute strategy session — we'll apply these frameworks to your business.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact"><button className="btn-primary" style={{ fontSize: 14, padding: '12px 24px' }}>Book Free Session →</button></Link>
            <a href="https://socialninjas.in/#/app/content-studio?plan=trial"><button className="btn-ghost" style={{ fontSize: 14 }}>Try AI Content Studio</button></a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .blog-content{color:rgba(255,255,255,0.72);font-size:16px;font-weight:300;line-height:1.78;letter-spacing:-.1px;}
        .blog-content h2{font-family:'Bricolage Grotesque',system-ui;font-size:clamp(20px,3vw,28px);font-weight:800;letter-spacing:-1px;color:rgba(255,255,255,0.96);margin:44px 0 16px;line-height:1.1;}
        .blog-content h3{font-family:'Bricolage Grotesque',system-ui;font-size:clamp(17px,2.5vw,22px);font-weight:700;letter-spacing:-.5px;color:rgba(255,255,255,0.9);margin:32px 0 12px;}
        .blog-content p{margin-bottom:22px;}
        .blog-content strong{color:rgba(255,255,255,0.9);font-weight:600;}
        .blog-content em{font-style:italic;color:rgba(255,255,255,0.65);}
        .blog-content a{color:#5ba4f5;text-decoration:none;border-bottom:1px solid rgba(91,164,245,0.3);}
        .blog-content a:hover{border-bottom-color:#5ba4f5;}
        .blog-content ul,ol{padding-left:22px;margin-bottom:22px;display:flex;flex-direction:column;gap:8px;}
        .blog-content li{color:rgba(255,255,255,0.65);font-weight:300;}
        .blog-content blockquote{border-left:3px solid #5ba4f5;padding:14px 22px;background:rgba(91,164,245,0.06);border-radius:0 12px 12px 0;margin:28px 0;font-style:italic;color:rgba(255,255,255,0.65);}
        .blog-content code{font-family:'JetBrains Mono',monospace;font-size:13px;background:rgba(255,255,255,0.07);padding:2px 7px;border-radius:5px;color:rgba(255,255,255,0.8);}
        .blog-content hr{border:none;height:1px;background:rgba(255,255,255,0.08);margin:36px 0;}
        @media(max-width:640px){.related-grid{grid-template-columns:1fr!important;} article{padding:48px 18px 60px!important;}}
      `}</style>
    </div>
  );
};

export default BlogPost;
