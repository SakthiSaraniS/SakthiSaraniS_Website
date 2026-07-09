'use client';

import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/smooth-scroll';

export function useScrollScale<T extends HTMLElement>(
  minScale = 0.4,
  rangePx = 900
) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a media query that can't be known before mount (no DOM/window on the server)
      setProgress(1);
      return;
    }

    function update() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const entered = window.innerHeight - rect.top;
      const t = Math.max(0, Math.min(1, entered / rangePx));
      setProgress(t);
    }

    if (lenis) {
      lenis.on('scroll', update);
      update();
      return () => {
        lenis.off('scroll', update);
      };
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [lenis, rangePx]);

  const scale = minScale + (1 - minScale) * progress;
  const opacity = progress;

  return { ref, scale, opacity };
}
