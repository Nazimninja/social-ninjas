import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

// LIGHT THEME NAVBAR - all hardcoded hex, no rgba to avoid replacement bugs
const NAV_BG_NORMAL   = '#FFFFFF';
const NAV_BG_SCROLLED = '#FFFFFF';
const TEXT_PRIMARY    = '#141414';
const TEXT_MUTED      = '#717171';
const BLUE            = '#1F4B99';  /* Ninja Blue */
const BLUE_DEEP       = '#153880';  /* Hover / active */
const BORDER          = '#EDEDED';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Tools',    path: '/tools' },
    { label: 'Blog',     path: '/blog' },
    { label: 'About',    path: '/about' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      height: 60,
      background: NAV_BG_NORMAL,
      borderBottom: `1px solid ${BORDER}`,
      boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      transition: 'box-shadow 0.25s',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto', padding: '0 28px',
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', zIndex: 70 }}>
          <Logo size={44} />
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

          {/* Content Studio CTA pill */}
          <a href="/content-studio" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: location.pathname === '/content-studio' ? BLUE : 'rgba(31,75,153,0.07)',
              border: `1px solid ${location.pathname === '/content-studio' ? BLUE : 'rgba(31,75,153,0.22)'}`,
              borderRadius: 20, padding: '5px 13px',
              color: location.pathname === '/content-studio' ? '#fff' : BLUE,
              fontSize: 13, fontWeight: 600,
              transition: 'all 0.15s', cursor: 'pointer',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = BLUE; el.style.color = '#fff'; el.style.borderColor = BLUE; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if(location.pathname !== '/content-studio'){el.style.background = 'rgba(31,75,153,0.07)'; el.style.color = BLUE; el.style.borderColor = 'rgba(31,75,153,0.22)';} }}
            >
              <span style={{ fontSize: 10 }}>⚡</span> Content Studio
            </div>
          </a>

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13.5, fontWeight: 600,
              color: '#FFFFFF',
              background: BLUE,
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

        {/* Mobile toggle */}
        <button
          style={{
            color: TEXT_PRIMARY, background: 'none', border: 'none',
            cursor: 'pointer', padding: 4, display: 'none', zIndex: 70,
          }}
          className="show-mobile"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X strokeWidth={1.5} size={24} /> : <Menu strokeWidth={1.5} size={24} />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: 'fixed', inset: 0,
        background: '#FFFFFF',
        zIndex: 60, display: 'flex', flexDirection: 'column', padding: '80px 28px 48px',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 34, fontWeight: 900, letterSpacing: '-1.5px',
                textDecoration: 'none', lineHeight: 1.2, padding: '10px 0',
                color: location.pathname === link.path ? BLUE : TEXT_PRIMARY,
                borderBottom: `1px solid ${BORDER}`,
                transition: `opacity 0.3s ease ${idx * 40}ms, transform 0.3s ease ${idx * 40}ms`,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(16px)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="/content-studio" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '14px',
              borderRadius: 10, background: 'rgba(31,75,153,0.08)',
              color: BLUE, border: `1px solid rgba(31,75,153,0.22)`, fontSize: 15, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              ⚡ Try Content Studio Free
            </button>
          </a>
          <Link to="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '15px',
              borderRadius: 10, background: BLUE,
              color: '#FFFFFF', border: 'none', fontSize: 16, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Book a Call →
            </button>
          </Link>
          <p style={{ color: '#ADADAD', fontSize: 11, textAlign: 'center', marginTop: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Social Ninja's
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
