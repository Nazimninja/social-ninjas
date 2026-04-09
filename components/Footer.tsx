import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'rgba(5,10,20,0.98)',
      backdropFilter: 'blur(48px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      fontFamily: "'DM Sans',system-ui,sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle ambient glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 200, background: 'radial-gradient(ellipse,rgba(91,164,245,0.06),transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 28px 32px', position: 'relative', zIndex: 1 }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 52, alignItems: 'start' }} className="footer-grid">

          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}>
              <img
                src="/logo.png"
                alt="Social Ninja's"
                style={{ width: 56, height: 56, objectFit: 'contain', filter: 'drop-shadow(0 0 16px rgba(91,164,245,0.5))' }}
              />
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',system-ui", fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px', color: '#fff', lineHeight: 1.1 }}>
                  Social<span style={{ color: '#5ba4f5' }}>Ninja's</span>.
                </div>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                  AI Agency
                </div>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, fontSize: 13.5, fontWeight: 300, maxWidth: 300, marginBottom: 28 }}>
              AI-powered performance marketing for brands that want to dominate — not just participate. We build revenue systems, not campaigns.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/socialninja.s/', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61553674457871', label: 'Facebook' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/99078419/', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:info@socialninjas.in', label: 'Email' },
                { Icon: Phone, href: 'tel:+918892587979', label: 'Phone' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  title={label}
                  style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'all .2s', flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(91,164,245,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,164,245,0.3)'; (e.currentTarget as HTMLElement).style.color = '#5ba4f5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginBottom: 22, fontSize: 13, letterSpacing: '-0.1px', fontFamily: "'Bricolage Grotesque',system-ui" }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'Performance Marketing', path: '/services' },
                { label: 'AI & Automation', path: '/growth-systems' },
                { label: 'Creative Studio', path: '/services' },
                { label: 'Social Media Management', path: '/services' },
                { label: 'Web & SEO', path: '/services' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#5ba4f5')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Products */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginBottom: 22, fontSize: 13, letterSpacing: '-0.1px', fontFamily: "'Bricolage Grotesque',system-ui" }}>AI Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'AI Content Studio', path: '/standalone-landing/' },
                { label: 'Lead Agent (Soon)', path: '/ai-products' },
                { label: 'Ad Copy Gen (Soon)', path: '/ai-products' },
                { label: 'Analytics AI (Soon)', path: '/ai-products' },
              ].map(({ label, path }) => (
                <li key={label}>
                  {path.startsWith('/content-studio') ? (
                    <a href={path} style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#5ba4f5')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                    >{label}</a>
                  ) : (
                    <Link to={path} style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#5ba4f5')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                    >{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginBottom: 22, fontSize: 13, letterSpacing: '-0.1px', fontFamily: "'Bricolage Grotesque',system-ui" }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Blog', path: '/blog' },
                { label: 'Case Studies', path: '/case-studies' },
                { label: 'Contact', path: '/contact' },
                { label: 'Careers', path: '/careers' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#5ba4f5')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, fontWeight: 400 }}>
            © {new Date().getFullYear()} Social Ninja's. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.3)')}>
              Privacy Policy
            </Link>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display:'inline-block' }} />
            <Link to="/terms" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.3)')}>
              Terms of Service
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {['Dubai', 'India'].map((city, i) => (
              <span key={city} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />}
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{city}</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="mailto:hello@socialninjas.in" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#5ba4f5')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >hello@socialninjas.in</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
