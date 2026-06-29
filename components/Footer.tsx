import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#fafafa',
      borderTop: '1px solid #ededed',
      fontFamily: "'Inter',system-ui,sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
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
                width={56}
                height={56}
                style={{ width: 56, height: 56, objectFit: 'contain', filter: 'drop-shadow(0 0 16px rgba(91,164,245,0.5))' }}
              />
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',system-ui", fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px', color: '#141414', lineHeight: 1.1 }}>
                  Social<span style={{ color: '#0065ff' }}>Ninja's</span>.
                </div>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#adadad', marginTop: 2 }}>
                  AI Agency
                </div>
              </div>
            </Link>
            <p style={{ color: '#888', lineHeight: 1.75, fontSize: 13.5, fontWeight: 300, maxWidth: 300, marginBottom: 28 }}>
              AI-powered performance marketing for brands that want to dominate — not just participate. We build revenue systems, not campaigns.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/socialninja.s/', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61553674457871', label: 'Facebook' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/99078419/', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:info@socialninjas.in', label: 'Email' },
                { Icon: Phone, href: 'tel:+918147757479', label: 'Phone' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  title={label}
                  style={{ width: 38, height: 38, borderRadius: '50%', background: '#f5f5f5', border: '1px solid #ededed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', textDecoration: 'none', transition: 'all .2s', flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(91,164,245,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,164,245,0.3)'; (e.currentTarget as HTMLElement).style.color = '#0065ff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; (e.currentTarget as HTMLElement).style.borderColor = '#e5e5e5'; (e.currentTarget as HTMLElement).style.color = '#888'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#141414', fontWeight: 600, marginBottom: 22, fontSize: 13, letterSpacing: '-0.1px', fontFamily: "'Inter',system-ui" }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'Performance Marketing', path: '/services' },
                { label: 'AI & Automation', path: '/growth-systems' },
                { label: 'Creative Studio', path: '/services' },
                { label: 'Social Media Management', path: '/services' },
                { label: 'Web & SEO', path: '/services' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} style={{ color: '#717171', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#0065ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#adadad')}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column */}
          <div>
            <h4 style={{ color: '#141414', fontWeight: 600, marginBottom: 22, fontSize: 13, letterSpacing: '-0.1px', fontFamily: "'Inter',system-ui" }}>Growth Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[
                { label: 'AI Content Studio', path: '/standalone-landing/', external: true },
                { label: 'WhatsApp Link Gen', path: 'https://linkwa.in', external: true },
                { label: 'US Take-Home Pay Calc', path: 'https://salarytools.us/salary-calculator', external: true },
                { label: 'Hourly ↔ Salary Conv', path: 'https://salarytools.us', external: true },
              ].map(({ label, path, external }) => (
                <li key={label}>
                  {external ? (
                    <a href={path} target={path.startsWith('http') ? '_blank' : undefined} rel={path.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ color: '#717171', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#0065ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#adadad')}
                    >{label}</a>
                  ) : (
                    <Link to={path} style={{ color: '#717171', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#0065ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#adadad')}
                    >{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#141414', fontWeight: 600, marginBottom: 22, fontSize: 13, letterSpacing: '-0.1px', fontFamily: "'Inter',system-ui" }}>Company</h4>
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
                  <Link to={path} style={{ color: '#717171', textDecoration: 'none', fontSize: 13, fontWeight: 400, transition: 'color .2s', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#0065ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#adadad')}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#ededed', marginBottom: 24 }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#adadad', fontSize: 12, fontWeight: 400 }}>
            © {new Date().getFullYear()} Social Ninja's. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ fontSize: 11, color: '#adadad', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='#525252')}
              onMouseLeave={e => (e.currentTarget.style.color='#adadad')}>
              Privacy Policy
            </Link>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#d0d0d0', display:'inline-block' }} />
            <Link to="/terms" style={{ fontSize: 11, color: '#adadad', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='#525252')}
              onMouseLeave={e => (e.currentTarget.style.color='#adadad')}>
              Terms of Service
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {['Dubai', 'India'].map((city, i) => (
              <span key={city} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#c8c8c8' }} />}
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#adadad' }}>{city}</span>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="mailto:info@socialninjas.in" style={{ color: '#adadad', fontSize: 12, textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0065ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#adadad')}
            >info@socialninjas.in</a>
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
