import { getApiUrl } from '../services/api';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Tag, Share2, ArrowRight, Twitter, Linkedin } from 'lucide-react';
import SEO from '../components/SEO';
import AdSense from '../components/AdSense';
import { POSTS, categoryColors } from '../data/blogPosts';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderBlogContent = (content: string) => {
    const headings = content.split('\n## ');
    if (headings.length <= 2) {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    }
    const firstHalf = headings.slice(0, 2).join('\n## ');
    const secondHalf = '\n## ' + headings.slice(2).join('\n## ');
    return (
      <>
        <ReactMarkdown>{firstHalf}</ReactMarkdown>
        <AdSense client="ca-pub-7295477262076788" slot="1337170960" />
        <ReactMarkdown>{secondHalf}</ReactMarkdown>
      </>
    );
  };

  useEffect(() => {
    setLoading(true);
    const localPost = POSTS.find(p => p.id === id);
    Promise.all([
      fetch(getApiUrl(`/api/data?resource=blogs&id=${id}`)).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(getApiUrl('/api/data?resource=blogs')).then(r => r.json()).catch(() => []),
    ]).then(([apiPost, all]) => {
      const finalPost = localPost || apiPost;
      setPost(finalPost);
      if (finalPost && Array.isArray(all)) {
        setRelated(all.filter((p: any) => p.id !== finalPost.id && p.category === finalPost.category).slice(0, 3));
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#07090e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(31,75,153,0.3)', borderTopColor: '#1F4B99', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#07090e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
      <SEO title="Post Not Found | Social Ninja's Blog" description="This blog post could not be found." />
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
      <h1 style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: 32, fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>Post Not Found</h1>
      <p style={{ color: '#a0a0b0', marginBottom: 28 }}>This post may have been moved or deleted.</p>
      <Link to="/blog"><button style={{ fontSize: 14, background: '#1F4B99', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', cursor: 'pointer' }}>← Back to Blog</button></Link>
    </div>
  );

  const color = categoryColors[post.category] || '#4281f5';

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="page-wrap" style={{ background: '#07090e', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Reading Progress Bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: `${scrollProgress}%`, height: '3px',
        background: 'linear-gradient(90deg, #1F4B99, #3ba213)',
        zIndex: 9999, transition: 'width 0.08s ease-out'
      }} />

      <SEO
        title={`${post.title} | Social Ninja's Blog`}
        description={post.excerpt}
        type="article"
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.publishedAt,
          section: post.category || 'Insights',
          tags: [post.category, "Social Ninja's", 'Marketing'],
          author: post.author || "Social Ninja's Team",
        }}
      />

      {/* Back nav - dark */}
      <div style={{
        position: 'sticky', top: 60, zIndex: 50,
        background: 'rgba(7,9,14,0.92)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 20px'
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/blog" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: '#a0a0b0' }}>
            <ArrowLeft size={14} /> All Posts
          </Link>
          <button onClick={share} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 500, color: '#a0a0b0', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 50, padding: '6px 14px', cursor: 'pointer' }}>
            <Share2 size={12} /> Share
          </button>
        </div>
      </div>

      {/* Article */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '60px 28px 80px', position: 'relative', zIndex: 1 }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: `${color}18`, border: `1px solid ${color}30`, borderRadius: 50, padding: '4px 12px', fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Tag size={10} />{post.category || 'Insights'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#606070' }}>
            <Clock size={11} />{post.readTime || '5 min read'}
          </div>
          <div style={{ fontSize: 12, color: '#606070' }}>
            {post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '')}
          </div>
          <div style={{ fontSize: 12, color: '#606070' }}>By {post.author || "Social Ninja's Team"}</div>
        </div>

        <h1 style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.05, color: '#ffffff', marginBottom: 20 }}>{post.title}</h1>

        {/* Excerpt */}
        <p style={{ fontSize: 17, fontWeight: 400, color: '#8090a8', lineHeight: 1.7, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.08)', fontStyle: 'italic' }}>{post.excerpt}</p>

        <AdSense client="ca-pub-7295477262076788" slot="1337170960" />

        {/* Content */}
        <div className="blog-content">
          {renderBlogContent(post.content || '')}
        </div>

        {/* Share Section */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 0', margin: '44px 0 28px', flexWrap: 'wrap', gap: 14
        }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#606070' }}>Liked this breakdown? Share it:</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#c0c8d8', padding: '8px 16px', borderRadius: 10, fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
            >
              Twitter / X
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#c0c8d8', padding: '8px 16px', borderRadius: 10, fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
            >
              LinkedIn
            </button>
            <button
              onClick={share}
              style={{ background: 'rgba(31,75,153,0.15)', border: '1px solid rgba(31,75,153,0.35)', color: '#4281f5', padding: '8px 16px', borderRadius: 10, fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* Author card */}
        <div style={{ marginTop: 56, padding: '24px', background: 'rgba(14,18,29,0.9)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#153880,#1F4B99)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🥷</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', marginBottom: 3 }}>{post.author || "Social Ninja's Team"}</div>
            <div style={{ fontSize: 12.5, fontWeight: 400, color: '#808090', lineHeight: 1.6 }}>Performance marketing, AI automation, and content strategy for ambitious brands. <Link to="/about" style={{ color: '#4281f5', textDecoration: 'none' }}>About us →</Link></div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4281f5', marginBottom: 24 }}>More in {post.category}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="related-grid">
            {related.map((r: any) => (
              <Link key={r.id} to={`/blog/${r.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ padding: 24, borderRadius: 18, height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', background: 'rgba(14,18,29,0.9)', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.2s' }}>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: 15, fontWeight: 700, color: '#f0f0f0', lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.3px' }}>{r.title}</h3>
                  <p style={{ fontSize: 12.5, color: '#606070', lineHeight: 1.62, flex: 1 }}>{r.excerpt}</p>
                  <div style={{ fontSize: 11, color: '#4281f5', marginTop: 14, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>Read <ArrowRight size={11} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 28px 88px', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(31,75,153,0.15), rgba(14,18,29,0.95))', border: '1px solid rgba(31,75,153,0.25)', borderRadius: 22, padding: '44px 36px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(31,75,153,0.5),transparent)' }} />
          <h2 style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: 'clamp(22px,4vw,36px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 10, color: '#ffffff', lineHeight: 1.1 }}>
            Ready to implement this?
          </h2>
          <p style={{ fontSize: 14, fontWeight: 400, color: '#8090a8', marginBottom: 24 }}>Book a free 30-minute strategy session — we'll apply these frameworks to your business.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact">
              <button style={{ fontSize: 14, padding: '12px 28px', background: '#1F4B99', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>Book Free Session →</button>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        .blog-content{color:#b0b8cc;font-size:16px;font-weight:400;line-height:1.82;letter-spacing:-.1px;}
        .blog-content h2{font-family:'Plus Jakarta Sans',system-ui;font-size:clamp(20px,3vw,28px);font-weight:800;letter-spacing:-1px;color:#ffffff;margin:48px 0 16px;line-height:1.1;}
        .blog-content h3{font-family:'Plus Jakarta Sans',system-ui;font-size:clamp(17px,2.5vw,22px);font-weight:700;letter-spacing:-.5px;color:#e0e8f8;margin:32px 0 12px;}
        .blog-content p{margin-bottom:22px;}
        .blog-content strong{color:#ffffff;font-weight:700;}
        .blog-content em{font-style:italic;color:#8090a8;}
        .blog-content a{color:#4281f5;text-decoration:none;border-bottom:1px solid rgba(66,129,245,0.3);}
        .blog-content a:hover{border-bottom-color:#4281f5;}
        .blog-content ul,ol{padding-left:22px;margin-bottom:22px;display:flex;flex-direction:column;gap:8px;}
        .blog-content li{color:#90a0b8;font-weight:400;}
        .blog-content blockquote{border-left:3px solid #1F4B99;padding:14px 22px;background:rgba(31,75,153,0.1);border-radius:0 12px 12px 0;margin:28px 0;font-style:italic;color:#8090a8;}
        .blog-content code{font-family:'Geist Mono',monospace;font-size:13px;background:rgba(255,255,255,0.08);padding:2px 7px;border-radius:5px;color:#c0d0e8;}
        .blog-content hr{border:none;height:1px;background:rgba(255,255,255,0.08);margin:36px 0;}
        @media(max-width:640px){.related-grid{grid-template-columns:1fr!important;} article{padding:48px 18px 60px!important;}}
      `}</style>
    </div>
  );
};

export default BlogPost;
