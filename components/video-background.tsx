'use client';

import { useEffect, useState } from 'react';

export function VideoBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a media query that can't be known before mount (no DOM/window on the server)
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      {!reducedMotion && (
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 z-[1] bg-surface-light/40 dark:bg-ink/60" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-1/4 bg-gradient-to-b from-transparent to-surface-light dark:to-surface-dark" />
    </div>
  );
}
