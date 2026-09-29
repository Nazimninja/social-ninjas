import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedNumberProps {
  value: string; // e.g. "4.8×", "₹40Cr+", "150+", "97%"
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  // Progressive enhancement: Initialize with target value so SSR/raw HTML/no-JS displays the real number
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Extract numeric part and non-numeric prefix/suffix
    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) return;

    const prefix = match[1];
    const targetNum = parseFloat(match[2]);
    const suffix = match[3];
    const isDecimal = match[2].includes('.');

    let start = 0;
    const duration = 1800; // ms
    let animationFrameId: number;
    let startTime: number | null = null;

    function step(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo formula
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (targetNum - start) * easeProgress;

      setDisplayValue(
        `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, value]);

  return <span ref={ref} className={className}>{displayValue}</span>;
};

export default AnimatedNumber;
