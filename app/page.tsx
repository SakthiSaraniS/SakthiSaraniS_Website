'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { useReveal } from '@/lib/hooks/use-reveal';
import { useParallax } from '@/lib/hooks/use-parallax';
import { useCountUp } from '@/lib/hooks/use-count-up';

export default function Home() {
  const heroRef = useReveal<HTMLDivElement>(100);
  const card1Ref = useReveal<HTMLDivElement>(100);
  const card2Ref = useReveal<HTMLDivElement>(250);
  const card3Ref = useReveal<HTMLDivElement>(400);
  const parallaxRef = useParallax<HTMLDivElement>(0.2);
  const { ref: statRef, value: statValue } =
    useCountUp<HTMLParagraphElement>(87);

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-ink dark:text-mint transition-colors">
      {/* Nav placeholder with toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div ref={heroRef} className="reveal max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-moss">
            Design system test
          </p>
          <h1 className="text-5xl font-semibold leading-tight sm:text-7xl">
            Building systems <span className="italic-accent">that scale</span>
          </h1>
          <p className="mt-6 text-lg text-ink/60 dark:text-mint/60">
            Scroll down to test Lenis smooth scroll and staggered reveal
            animations.
          </p>
        </div>
      </section>

      {/* Squircle token test cards — scroll distance forces real reveal testing */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
        <div
          ref={card1Ref}
          className="reveal squircle w-full max-w-md bg-forest/10 dark:bg-forest/20 p-8"
        >
          <h2 className="text-2xl font-medium text-moss">Card One</h2>
          <p className="mt-2 text-ink/70 dark:text-mint/70">
            Testing squircle corners, forest tint background, and reveal delay
            0ms.
          </p>
        </div>
        <div
          ref={card2Ref}
          className="reveal squircle w-full max-w-md bg-moss/10 dark:bg-moss/20 p-8"
        >
          <h2 className="text-2xl font-medium text-moss">Card Two</h2>
          <p className="mt-2 text-ink/70 dark:text-mint/70">
            Reveal delay 100ms — should visibly stagger after Card One.
          </p>
        </div>
        <div
          ref={card3Ref}
          className="reveal squircle-lg w-full max-w-md bg-mint/20 dark:bg-mint/10 p-8"
        >
          <h2 className="text-2xl font-medium text-moss">Card Three</h2>
          <p className="mt-2 text-ink/70 dark:text-mint/70">
            Reveal delay 200ms, larger squircle-lg radius variant.
          </p>
        </div>
      </section>

      {/* Parallax + bottom spacer — real scroll distance to feel Lenis easing */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          ref={parallaxRef}
          className="pointer-events-none absolute select-none text-9xl text-moss opacity-10"
          aria-hidden="true"
        >
          ✦
        </div>

        <div className="relative">
          <p ref={statRef} className="text-6xl font-semibold text-moss">
            {statValue}%
          </p>
          <p className="mt-2 text-sm uppercase tracking-widest text-ink/50 dark:text-mint/50">
            Test coverage
          </p>
        </div>

        <p className="relative mt-8 text-ink/40 dark:text-mint/40">
          End of test page. Scroll back up to confirm reveal doesn&apos;t
          re-trigger, and watch the ✦ above drift at a different speed than this
          text.
        </p>
      </section>
    </div>
  );
}
