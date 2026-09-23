import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Completely bypass Lenis on Admin CRM and Fit Ninja App so native mouse wheel,
    // trackpad, modals, and tables scroll freely without event hijacking.
    const isBypassed = location.pathname.startsWith('/admin') ||
                       location.pathname === '/app' ||
                       location.pathname.startsWith('/app/');

    if (isBypassed) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [location.pathname]);

  // Update Lenis dimensions whenever route changes (on public pages)
  useEffect(() => {
    if (lenisRef.current) {
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScroll;
