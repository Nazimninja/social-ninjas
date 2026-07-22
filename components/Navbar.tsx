import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';

const TEXT_PRIMARY = '#141414';
const TEXT_MUTED   = '#717171';
const BLUE         = '#1F4B99';
const BLUE_DEEP    = '#153880';
const BORDER       = '#EDEDED';

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Tools',    path: '/tools' },
  { label: 'Blog',     path: '/blog' },
  { label: 'About',    path: '/about' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* auto-close on route change */
  useEffect(() => { setIsOpen(false); }, [location]);

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      {/* ── TOP BAR ── */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 200,
        height: 60,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.25s',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1120, margin: '0 auto', padding: '0 20px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={40} />
            <div style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px',
              color: TEXT_PRIMARY, lineHeight: 1,
            }}>
              Social<span style={{ color: BLUE }}>Ninja's</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14, fontWeight: 400,
                  color: location.pathname === link.path ? TEXT_PRIMARY : TEXT_MUTED,
                  textDecoration: 'none', transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TEXT_PRIMARY; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = location.pathname === link.path ? TEXT_PRIMARY : TEXT_MUTED; }}
              >
                {link.label}
              </Link>
            ))}

            {/* Content Studio pill */}
            <a href="/content-studio" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'rgba(31,75,153,0.07)',
                border: '1px solid rgba(31,75,153,0.22)',
                borderRadius: 20, padding: '5px 13px',
                color: BLUE, fontSize: 13, fontWeight: 600,
                transition: 'all 0.15s', cursor: 'pointer',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = BLUE; el.style.color = '#fff'; el.style.borderColor = BLUE; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(31,75,153,0.07)'; el.style.color = BLUE; el.style.borderColor = 'rgba(31,75,153,0.22)'; }}
              >
                <span style={{ fontSize: 10 }}>⚡</span> Content Studio
              </div>
            </a>

            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13.5, fontWeight: 600,
                color: '#FFFFFF', background: BLUE,
                border: 'none', borderRadius: 8, padding: '9px 20px',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = BLUE_DEEP; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE; }}
              >
                Book a Call
              </button>
            </Link>
          </div>

          {/* Mobile hamburger — only shown when menu is closed */}
          {!isOpen && (
            <button
              style={{
                color: TEXT_PRIMARY, background: 'none', border: 'none',
                cursor: 'pointer', padding: 6, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              className="show-mobile"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu strokeWidth={1.8} size={24} />
            </button>
          )}

          {/* Spacer when menu is open (so logo stays left) */}
          {isOpen && <div className="show-mobile" style={{ width: 36 }} />}
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN DRAWER ── */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: '#FFFFFF',
          zIndex: 300,
          display: 'flex', flexDirection: 'column',
          transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          overflowY: 'auto',
        }}
        aria-hidden={!isOpen}
      >
        {/* Drawer top bar — logo + X button */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', height: 60, borderBottom: `1px solid ${BORDER}`,
          flexShrink: 0,
        }}>
          <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={38} />
            <div style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px',
              color: TEXT_PRIMARY,
            }}>
              Social<span style={{ color: BLUE }}>Ninja's</span>
            </div>
          </Link>

          {/* ← CLOSE BUTTON — always visible inside drawer */}
          <button
            onClick={close}
            aria-label="Close menu"
            style={{
              background: '#f5f5f5', border: '1px solid #ededed',
              borderRadius: 8, width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#141414', flexShrink: 0,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ebebeb'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f5f5f5'; }}
          >
            <X strokeWidth={2} size={20} />
          </button>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', flexShrink: 0 }}>
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={close}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 24px',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px',
                textDecoration: 'none', lineHeight: 1,
                color: location.pathname === link.path ? BLUE : TEXT_PRIMARY,
                borderBottom: `1px solid ${BORDER}`,
                background: location.pathname === link.path ? 'rgba(31,75,153,0.04)' : 'transparent',
                transition: `opacity 0.3s ease ${idx * 45}ms, transform 0.3s ease ${idx * 45}ms`,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              <span>{link.label}</span>
              <ChevronRight size={18} strokeWidth={2} style={{ color: location.pathname === link.path ? BLUE : '#d0d0d0' }} />
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
          <a href="/content-studio" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '15px',
              borderRadius: 12, background: 'rgba(31,75,153,0.07)',
              color: BLUE, border: '1.5px solid rgba(31,75,153,0.22)',
              fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              ⚡ Try Content Studio Free
            </button>
          </a>
          <Link to="/contact" onClick={close} style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '15px',
              borderRadius: 12, background: BLUE,
              color: '#FFFFFF', border: 'none', fontSize: 16, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Book a Free Call →
            </button>
          </Link>
        </div>

        {/* Footer links inside drawer */}
        <div style={{
          marginTop: 'auto', padding: '20px 24px 32px',
          borderTop: `1px solid ${BORDER}`,
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy', path: '/privacy' },
              { label: 'Terms', path: '/terms' },
              { label: 'Contact', path: '/contact' },
              { label: 'About', path: '/about' },
            ].map(l => (
              <Link key={l.path} to={l.path} onClick={close} style={{ fontSize: 13, color: TEXT_MUTED, textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>
          <p style={{ color: '#ADADAD', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            © {new Date().getFullYear()} Social Ninja's · AI Agency
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
