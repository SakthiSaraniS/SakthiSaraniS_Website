'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from '@/components/smooth-scroll';

export function useParallax<T extends HTMLElement>(speed: number = 0.15) {
  const ref = useRef<T | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function update() {
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = `translateY(${centerOffset * -speed}px)`;
    }

    if (lenis) {
      lenis.on('scroll', update);
      update();
      return () => {
        lenis.off('scroll', update);
      };
    }

    // Lenis not ready yet — fall back to native scroll, still correct, just less tightly synced
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [speed, lenis]);

  return ref;
}
