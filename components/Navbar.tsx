
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
    { label: 'Services', path: '/services' },
    { label: 'AI Products', path: '/ai-products' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
  ];


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
            width: 48, height: 48, borderRadius: '12px', overflow: 'visible', flexShrink: 0, background: 'transparent',
          }}>
            <img src="/logo.png" alt="Social Ninja's" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 17, fontWeight: 600, letterSpacing: '-0.3px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.1 }}>
              Social<span style={{ color: '#5ba4f5' }}>Ninja's</span>.
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
              background: 'linear-gradient(135deg, #2563eb, #5ba4f5)',
              border: 'none', borderRadius: 50, padding: '9px 22px',
              cursor: 'pointer', letterSpacing: '-0.1px',
              boxShadow: '0 4px 20px rgba(91,164,245,0.32), inset 0 1px 0 rgba(255,255,255,0.2)',
              transition: 'all 0.22s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'translateY(-1px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 28px rgba(91,164,245,0.42)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(91,164,245,0.32)'; }}
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
        background: '#08101f',
        backdropFilter: 'blur(48px)',
        zIndex: 60, display: 'flex', flexDirection: 'column', padding: '88px 28px 40px',
        transition: 'all 0.45s cubic-bezier(0.32,0.72,0,1)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>
        {/* Ambient */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(29,78,216,0.2),transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,164,245,0.15),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
                fontSize: 38, fontWeight: 700, letterSpacing: '-1px',
                textDecoration: 'none', lineHeight: 1.15,
                color: location.pathname === link.path ? '#5ba4f5' : 'rgba(255,255,255,0.9)',
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
              background: 'linear-gradient(135deg, #2563eb, #5ba4f5)',
              color: '#fff', border: 'none', fontSize: 16, fontWeight: 500, cursor: 'pointer',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxShadow: '0 12px 36px rgba(91,164,245,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
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
