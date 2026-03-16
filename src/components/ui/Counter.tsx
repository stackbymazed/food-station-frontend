"use client";

import { useEffect, useState, useRef } from 'react';

export default function Counter({ end, duration = 2500, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTimestamp: number | null = null;
        
        // Easing function: easeOutExpo
        const easeOutExpo = (t: number): number => {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };

        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          
          const easedProgress = easeOutExpo(progress);
          setCount(Math.floor(easedProgress * end));
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(end); // Ensure we end exactly at 'end'
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration]);

  // Format the number with commas (e.g., 85,000)
  const formattedCount = new Intl.NumberFormat('en-US').format(count);

  return <div ref={ref} className="stat-circle flex items-center justify-center font-bold tracking-tight">{formattedCount}{suffix}</div>;
}
