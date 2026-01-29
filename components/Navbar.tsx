
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'AI Automation', path: '/ai-automation' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || isOpen ? 'bg-brand-dark/90 backdrop-blur-xl border-white/5 py-3' : 'bg-transparent border-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-50">
          <img
            src="/logo.png"
            alt="Social Ninja's"
            className="h-16 md:h-24 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
            Social<span className="text-brand-primary">Ninja's</span>.
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-neutral-400'}`}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/contact">
            <Button variant="primary" className="relative py-2.5 px-6 text-xs shadow-none rounded-full font-bold overflow-hidden group animate-button-glow transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-primary via-white to-brand-primary opacity-20 group-hover:animate-shine"></span>
              <span className="relative z-10">Book Strategy Call</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-white hover:text-brand-primary transition-colors p-1 md:hidden relative z-50 touch-manipulation"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X strokeWidth={1.5} size={28} /> : <Menu strokeWidth={1.5} size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-dark z-40 flex flex-col pt-24 px-6 pb-8 transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1) md:hidden h-[100dvh] overflow-y-auto safe-area-top safe-area-bottom ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>

        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-brand-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] bg-brand-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: `${100 + (idx * 50)}ms` }}
                className={`text-4xl font-display font-bold tracking-tight transition-all duration-500 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} ${location.pathname === link.path ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary' : 'text-white hover:text-brand-primary'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full"></div>

            <div className={`transition-all duration-500 delay-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button fullWidth className="rounded-full py-5 text-lg font-bold shadow-[0_0_30px_rgba(56,189,248,0.15)] bg-gradient-to-r from-brand-primary/90 to-brand-secondary/90 hover:from-brand-primary hover:to-brand-secondary border-none text-white">
                  Book Strategy Call
                </Button>
              </Link>
            </div>

            <p className={`text-neutral-500 text-xs text-center font-medium tracking-widest uppercase transition-all duration-500 delay-500 transform ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              &copy; {new Date().getFullYear()} Social Ninja's.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
