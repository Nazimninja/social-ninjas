import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    { label: 'Services',    path: '/services' },
    { label: 'Tools',       path: '/tools' },
    { label: 'Blog',        path: '/blog' },
    { label: 'About',       path: '/about' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      height: 60,
      background: scrolled || isOpen
        ? 'rgba(255,255,255,0.97)'
        : 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid #ededed',
      transition: 'background 0.25s',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 28px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', position: 'relative', zIndex: 70 }}>
          <img src="/logo.png" alt="Social Ninja's" width={36} height={36} style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
          <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', color: '#141414', lineHeight: 1 }}>
            Social<span style={{ color: '#0065ff' }}>Ninja's</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14, fontWeight: 400,
                color: location.pathname === link.path ? '#141414' : '#717171',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#141414'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = location.pathname === link.path ? '#141414' : '#717171'; }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13.5, fontWeight: 600, color: '#fff',
              background: '#0065ff',
              border: 'none', borderRadius: 8, padding: '8px 18px',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#0047f0'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#0065ff'; }}
            >
              Book a Call
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          style={{ color: '#141414', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none', position: 'relative', zIndex: 70 }}
          className="show-mobile"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X strokeWidth={1.5} size={24} /> : <Menu strokeWidth={1.5} size={24} />}
        </button>
      </div>

      {/* Mobile Full-screen Menu */}
      <div style={{
        position: 'fixed', inset: 0,
        background: '#fff',
        zIndex: 60, display: 'flex', flexDirection: 'column', padding: '80px 28px 48px',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px',
                textDecoration: 'none', lineHeight: 1.15, padding: '8px 0',
                color: location.pathname === link.path ? '#0065ff' : '#141414',
                borderBottom: '1px solid #ededed',
                transition: `all 0.35s ease ${idx * 50}ms`,
                transform: isOpen ? 'translateX(0)' : 'translateX(24px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <Link to="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '15px',
              borderRadius: 10,
              background: '#0065ff',
              color: '#fff', border: 'none', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Book a Call →
            </button>
          </Link>
          <p style={{ color: '#adadad', fontSize: 11, textAlign: 'center', marginTop: 20, fontFamily: "'Inter', system-ui", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Social Ninja's
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
