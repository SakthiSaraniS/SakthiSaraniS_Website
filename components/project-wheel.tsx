'use client';

import { useEffect, useRef, useState } from 'react';
import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/types';

// --- Path geometry: two big semicircles, one per side, pinched at center ---
const FLARE_DISTANCE = 55;
const PINCH_AMOUNT = 5;
const ROW_Y_SPREAD = 400;
const FOCUS_FALLOFF = 150;

const ROTATE_PER_PIXEL = 0.25;
const INTRO_SPINS = 2;
const INTRO_DURATION = 2600;
const LERP_FACTOR = 0.09;
const SETTLE_DELAY = 220;

// Doubt #1: flip this to -1 if scrolling down currently moves rows the
// wrong physical direction (e.g. next project appears above instead of below).
const SCROLL_SIGN = -1;

// Doubt #2: flip this to -1 if the bottom-half tilt reads as "out of the
// screen" and the top-half reads as "into the screen" (i.e. reversed from
// what's asked: bottom should lean IN, top should lean OUT).
const TILT_SIGN = 1;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function normalizeAngle(deg: number) {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a < -180) a += 360;
  return a;
}

export function ProjectWheel({ projects }: { projects: Project[] }) {
  const rows = chunk(projects, 2);
  const anglePerRow = 360 / Math.max(1, rows.length);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const targetRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reducedMotionRef.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of a media query that can't be known before mount (no DOM/window on the server)
      setIntroDone(true);
      return;
    }

    const totalDegrees = -360 * INTRO_SPINS;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const p = Math.min(1, (now - start) / INTRO_DURATION);
      const eased = 1 - Math.pow(1 - p, 4);
      const current = totalDegrees * eased;
      rotationRef.current = current;
      targetRef.current = current;
      setRotation(current);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        rotationRef.current = totalDegrees;
        targetRef.current = totalDegrees;
        setRotation(totalDegrees);
        setIntroDone(true);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!introDone || reducedMotionRef.current) return;
    let raf = 0;

    function loop() {
      const diff = targetRef.current - rotationRef.current;
      if (Math.abs(diff) > 0.01) {
        rotationRef.current += diff * LERP_FACTOR;
        setRotation(rotationRef.current);
      }
      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;
    const stage = stageRef.current;
    if (!stage) return;

    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    function scheduleSettle() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const nearest =
          Math.round(targetRef.current / anglePerRow) * anglePerRow;
        targetRef.current = nearest;
      }, SETTLE_DELAY);
    }

    function applyDelta(delta: number) {
      targetRef.current -= SCROLL_SIGN * delta * ROTATE_PER_PIXEL;
      scheduleSettle();
    }

    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      applyDelta(e.deltaY);
    }

    let touchStartY = 0;
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
      const y = e.touches[0].clientY;
      applyDelta(touchStartY - y);
      touchStartY = y;
    }

    stage.addEventListener('wheel', handleWheel, { passive: false });
    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      clearTimeout(settleTimer);
      stage.removeEventListener('wheel', handleWheel);
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchmove', handleTouchMove);
    };
  }, [introDone, anglePerRow]);

  return (
    <>
      <div
        ref={stageRef}
        className="wheel-stage hidden sm:block"
        data-lenis-prevent
      >
        {rows.map((row, i) => {
          const a = normalizeAngle(i * anglePerRow - rotation);
          const abs = Math.abs(a);

          // The path is only defined across a semicircle (-90..90). Beyond
          // that, a row simply isn't on the visible arc — fade it out
          // completely rather than let it awkwardly reappear elsewhere.
          if (abs > 95) return null;

          const theta = Math.min(90, abs) * Math.sign(a || 1);
          const thetaRad = (theta * Math.PI) / 180;
          const t = Math.min(1, abs / FOCUS_FALLOFF);

          const rowY = ROW_Y_SPREAD * Math.sin(thetaRad);
          const spread =
            PINCH_AMOUNT +
            (FLARE_DISTANCE - PINCH_AMOUNT) * (1 - Math.cos(thetaRad));
          const tilt = TILT_SIGN * theta * 0.6;

          const blur = t * 4;
          const opacity = 1 - t;
          const brightness = 100 - t * 30;
          const contrast = 100 + t * 45;

          return (
            <div
              key={i}
              className="wheel-row"
              style={{
                transform: `translateY(${rowY}px) rotateX(${tilt}deg)`,
                filter: `blur(${blur}px)`,
                opacity,
                zIndex: Math.round(1000 - abs),
              }}
            >
              {row.map((project, cardIndex) => {
                const side = cardIndex === 0 ? -1 : 1;
                const offsetX = side * spread;

                return (
                  <div
                    key={project.slug}
                    className="wheel-card"
                    style={{
                      transform: `translateX(${offsetX}px)`,
                      filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-6 sm:hidden">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
