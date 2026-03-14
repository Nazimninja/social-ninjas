
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Growth Systems', path: '/growth-systems' },
    { label: 'About', path: '/about' },
  ];

  const logoB64 = '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';

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      height: 62,
      background: scrolled || isOpen ? 'rgba(8,16,31,0.92)' : 'rgba(8,16,31,0.7)',
      backdropFilter: 'blur(48px) saturate(180%)',
      WebkitBackdropFilter: 'blur(48px) saturate(180%)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      transition: 'background 0.3s',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', position: 'relative', zIndex: 50 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
            border: '1.5px solid rgba(79,158,255,0.38)',
            boxShadow: '0 0 16px rgba(79,158,255,0.2), inset 0 1px 0 rgba(255,255,255,0.12)',
            background: '#08101f',
          }}>
            <img src={`data:image/png;base64,${logoB64}`} alt="Social Ninja's" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 17, fontWeight: 600, letterSpacing: '-0.3px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.1 }}>
              Social<span style={{ color: '#4f9eff' }}>Ninja's</span>.
            </div>
            <div style={{ fontSize: '8.5px', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', lineHeight: 1 }}>
              AI Agency
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13.5, fontWeight: 400,
                color: location.pathname === link.path ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
                textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '-0.1px',
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13.5, fontWeight: 600, color: '#fff',
              background: 'linear-gradient(135deg, #2563eb, #4f9eff)',
              border: 'none', borderRadius: 50, padding: '9px 22px',
              cursor: 'pointer', letterSpacing: '-0.1px',
              boxShadow: '0 4px 20px rgba(79,158,255,0.32), inset 0 1px 0 rgba(255,255,255,0.2)',
              transition: 'all 0.22s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 28px rgba(79,158,255,0.42)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(79,158,255,0.32)'; }}
            >
              Book Strategy Call
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          style={{ color: 'rgba(255,255,255,0.85)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none', position: 'relative', zIndex: 50 }}
          className="show-mobile"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X strokeWidth={1.5} size={26} /> : <Menu strokeWidth={1.5} size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(8,16,31,0.97)',
        backdropFilter: 'blur(48px)',
        zIndex: 40, display: 'flex', flexDirection: 'column', padding: '88px 28px 40px',
        transition: 'all 0.45s cubic-bezier(0.32,0.72,0,1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        opacity: isOpen ? 1 : 0,
      }}>
        {/* Ambient */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(37,99,235,0.2),transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(79,158,255,0.15),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 38, fontWeight: 400, letterSpacing: '-1px',
                textDecoration: 'none', lineHeight: 1.15,
                color: location.pathname === link.path ? '#4f9eff' : 'rgba(255,255,255,0.9)',
                transition: `all 0.5s ease ${100 + idx * 60}ms`,
                transform: isOpen ? 'translateX(0)' : 'translateX(40px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '28px 0' }}></div>
          <Link to="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '16px', borderRadius: 50,
              background: 'linear-gradient(135deg, #2563eb, #4f9eff)',
              color: '#fff', border: 'none', fontSize: 16, fontWeight: 500, cursor: 'pointer',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxShadow: '0 12px 36px rgba(79,158,255,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
            }}>
              Book Strategy Call
            </button>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, textAlign: 'center', marginTop: 20, fontFamily: "'DM Sans', system-ui", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Social Ninja's.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
