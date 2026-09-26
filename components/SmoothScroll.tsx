import React, { useEffect } from 'react';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Enable native GPU-accelerated smooth scrolling without JS event hijacking
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped', 'lenis-scrolling');
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
