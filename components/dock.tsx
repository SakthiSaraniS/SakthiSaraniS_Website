'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Home, History, FolderGit2, Newspaper, Sun, Moon } from 'lucide-react';
import { useLenis } from '@/components/smooth-scroll';

const links = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/background', label: 'Background', Icon: History },
  { href: '/projects', label: 'Projects', Icon: FolderGit2 },
  { href: '/blog', label: 'Blog', Icon: Newspaper },
];

const ITEM_COUNT = links.length + 1;
const ITEM_SIZE = 44;
const GAP = 8;
const LINE_SPACING = ITEM_SIZE + GAP;
const RADIUS = 130;

const BASE_SCALE = 1;
const EXPANDED_SCALE = 1.5;
const HOVER_BOOST = 0.35;
const HOVER_FALLOFF = 120;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function itemPosition(index: number, arcT: number) {
  const startX = (index - (ITEM_COUNT - 1) / 2) * LINE_SPACING;
  const angleDeg = -90 + (180 * index) / (ITEM_COUNT - 1);
  const angleRad = (angleDeg * Math.PI) / 180;
  const arcX = RADIUS * Math.sin(angleRad);
  const arcY = -RADIUS * Math.cos(angleRad);

  return {
    x: startX * (1 - arcT) + arcX * arcT,
    y: arcY * arcT,
  };
}

function tooltipOffset(index: number, arcT: number) {
  const angleDeg = -90 + (180 * index) / (ITEM_COUNT - 1);
  const angleRad = (angleDeg * Math.PI) / 180;
  const dirX = Math.sin(angleRad);
  const dirY = -Math.cos(angleRad);

  const BASE_LIFT = 30;
  const RADIAL_PUSH = 30;

  const push = RADIAL_PUSH * arcT;

  return {
    tx: dirX * push,
    ty: -BASE_LIFT + dirY * push,
  };
}

export function Dock() {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const rafId = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [hoverScales, setHoverScales] = useState<number[]>(() =>
    Array(ITEM_COUNT).fill(0)
  );
  const [theme, setTheme] = useState<{ isDark: boolean; mounted: boolean }>({
    isDark: false,
    mounted: false,
  });
  const lenis = useLenis();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing React state from a DOM class set by the pre-hydration script; can only happen after mount
    setTheme({
      isDark: document.documentElement.classList.contains('dark'),
      mounted: true,
    });
  }, []);

  useEffect(() => {
    function update() {
      const section = document.getElementById('resume-contact-section');
      if (!section) {
        setProgress(0);
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const sectionTopAbs = rect.top + scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const range = Math.max(1, maxScroll - sectionTopAbs);
      const progressed = scrollTop - sectionTopAbs;

      setProgress(clamp01(progressed / range));
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
  }, [lenis]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  function toggleTheme() {
    const next = !theme.isDark;
    setTheme({ isDark: next, mounted: true });
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  function computeHoverScales(mouseX: number | null) {
    return itemRefs.current.map((el) => {
      if (!el || mouseX === null) return 0;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - center);
      const t = Math.max(0, 1 - distance / HOVER_FALLOFF);
      return t * HOVER_BOOST;
    });
  }

  function handleMouseMove(e: React.MouseEvent) {
    const mouseX = e.clientX;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() =>
      setHoverScales(computeHoverScales(mouseX))
    );
  }

  function handleMouseLeave() {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() =>
      setHoverScales(computeHoverScales(null))
    );
  }

  const scaleT = clamp01(progress * 1.3);
  const arcT = clamp01((progress - 0.2) / 0.8);
  const baseScale = BASE_SCALE + (EXPANDED_SCALE - BASE_SCALE) * scaleT;
  const pillOpacity = 1 - arcT;
  const isExpanded = arcT > 0.6;

  const ThemeIcon = theme.isDark ? Sun : Moon;
  const themeLabel = theme.isDark ? 'Light mode' : 'Dark mode';
  const allItems = [
    ...links.map((l) => ({ ...l, kind: 'link' as const })),
    {
      kind: 'toggle' as const,
      label: themeLabel,
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 ${isExpanded ? 'dock-expanded' : ''}`}
      style={{ width: LINE_SPACING * ITEM_COUNT, height: RADIUS + ITEM_SIZE }}
    >
      <div
        className="squircle-lg absolute inset-x-0 bottom-0 border border-forest/10 bg-surface-light/70 backdrop-blur-md dark:border-mint/10 dark:bg-surface-dark/70"
        style={{ height: ITEM_SIZE + 24, opacity: pillOpacity }}
      />

      {allItems.map((item, i) => {
        const { x, y } = itemPosition(i, arcT);
        const scale = baseScale + (hoverScales[i] ?? 0);

        const iconContent =
          item.kind === 'link' ? (
            <item.Icon className="dock-icon-svg h-6 w-6" aria-hidden="true" />
          ) : (
            <ThemeIcon className="dock-icon-svg h-6 w-6" aria-hidden="true" />
          );

        const commonStyle: React.CSSProperties = {
          left: '50%',
          bottom: 12,
          transform: `translate(-50%, 0) translate(${x}px, ${y}px) scale(${scale})`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.3s var(--ease-lag)',
        };

        return (
          <div
            key={item.label}
            className="group/item absolute"
            style={commonStyle}
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"
              style={{
                transform: `translate(calc(-50% + ${tooltipOffset(i, arcT).tx}px), calc(-50% + ${tooltipOffset(i, arcT).ty}px))`,
              }}
            >
              <span className="squircle-sm border border-forest/10 bg-surface-light/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-md dark:border-mint/10 dark:bg-surface-dark/90 dark:text-mint">
                {item.label}
              </span>
            </span>

            {item.kind === 'link' ? (
              <Link
                href={item.href}
                aria-label={item.label}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="dock-icon squircle-sm flex h-11 w-11 items-center justify-center bg-surface-light/70 text-ink/70 backdrop-blur-md hover:text-moss dark:bg-surface-dark/70 dark:text-mint/70 dark:hover:text-mint"
              >
                {iconContent}
              </Link>
            ) : (
              theme.mounted && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={
                    theme.isDark
                      ? 'Switch to light mode'
                      : 'Switch to dark mode'
                  }
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="dock-icon squircle-sm flex h-11 w-11 items-center justify-center bg-surface-light/70 text-ink/70 backdrop-blur-md hover:text-moss dark:bg-surface-dark/70 dark:text-mint/70 dark:hover:text-mint"
                >
                  {iconContent}
                </button>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
