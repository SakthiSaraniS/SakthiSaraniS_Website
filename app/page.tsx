'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Container } from '@/components/container';
import { Squircle } from '@/components/squircle';
import { Modal } from '@/components/modal';
import { useReveal } from '@/lib/hooks/use-reveal';
import { VideoBackground } from '@/components/video-background';
import { useParallax } from '@/lib/hooks/use-parallax';
import { useScrollScale } from '@/lib/hooks/use-scroll-scale';

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Home() {
  const heroRef = useReveal<HTMLDivElement>(0);
  const accentRef = useParallax<HTMLDivElement>(0.15);
  const {
    ref: resumeRef,
    scale: resumeScale,
    opacity: resumeOpacity,
  } = useScrollScale<HTMLDivElement>(0.4, 650);
  const {
    ref: contactRef,
    scale: contactScale,
    opacity: contactOpacity,
  } = useScrollScale<HTMLDivElement>(0.4, 650);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <VideoBackground />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
        >
          <div
            ref={accentRef}
            className="select-none text-[28rem] leading-none text-moss opacity-[0.06]"
          >
            {'\u2726'}
          </div>
        </div>

        <div ref={heroRef} className="reveal relative z-10">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Sakthi Sarani S
          </h1>
          <p className="mt-4 text-lg text-ink/60 dark:text-mint/60 sm:text-xl">
            BTech in Computer Science, PES University
          </p>
        </div>
      </section>

      <section id="nav-expand-anchor" className="px-6 pb-40 pt-32 sm:pt-40">
        <Container className="grid gap-16 md:grid-cols-2">
          <Squircle
            ref={resumeRef}
            size="lg"
            className="card-glow flex flex-col gap-6 bg-moss/50 p-8 dark:bg-moss/30 sm:p-10"
            style={{
              transform: `scale(${resumeScale})`,
              opacity: resumeOpacity,
            }}
          >
            <div>
              <h2 className="text-2xl font-medium">Resume</h2>
              <p className="mt-2 text-ink/60 dark:text-mint/60">
                View it inline or download the PDF.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-haspopup="dialog"
              aria-label="Expand resume to full view"
              className="group relative flex-1 overflow-hidden rounded-[calc(var(--radius-md)-8px)] border border-forest/10 text-left dark:border-mint/10"
            >
              <object
                data="/resume.pdf"
                type="application/pdf"
                className="pointer-events-none h-64 w-full"
                aria-label="Sakthi Sarani S resume preview"
              >
                <div className="flex h-64 w-full items-center justify-center p-4 text-sm text-ink/60 dark:text-mint/60">
                  Preview unavailable, click to view full resume.
                </div>
              </object>

              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-black/70">
                <span className="mb-4 squircle-sm bg-surface-light px-4 py-2 text-sm font-medium text-ink dark:bg-surface-dark dark:text-mint">
                  Click to expand full resume
                </span>
              </div>
            </button>

            <a
              href="/resume.pdf"
              download
              className="squircle-sm inline-flex w-fit items-center gap-2 bg-forest px-5 py-2.5 text-sm font-medium text-surface-light transition-colors hover:bg-moss dark:bg-mint dark:text-ink dark:hover:bg-mint/80"
            >
              Download PDF
            </a>
          </Squircle>

          <Squircle
            ref={contactRef}
            size="lg"
            className="card-glow flex flex-col gap-6 bg-moss/50 p-8 dark:bg-moss/30 sm:p-10"
            style={{
              transform: `scale(${contactScale})`,
              opacity: contactOpacity,
            }}
          >
            <div>
              <h2 className="text-2xl font-medium">Contact</h2>
              <p className="mt-2 text-ink/60 dark:text-mint/60">
                Reach out directly.
              </p>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-3"
              aria-label="Contact links"
            >
              <a
                href="mailto:sakthipes525@gmail.com"
                className="nav-link squircle-sm flex items-center gap-3 px-6 py-5 text-xl font-medium text-ink/70 dark:text-mint/70 hover:text-moss dark:hover:text-mint"
              >
                <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
                sakthipes525@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/sakthisarani/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link squircle-sm flex items-center gap-3 px-6 py-5 text-xl font-medium text-ink/70 dark:text-mint/70 hover:text-moss dark:hover:text-mint"
              >
                <LinkedInIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href="https://github.com/SakthiSaraniS"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link squircle-sm flex items-center gap-3 px-6 py-5 text-xl font-medium text-ink/70 dark:text-mint/70 hover:text-moss dark:hover:text-mint"
              >
                <GitHubIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                GitHub
              </a>
            </nav>
          </Squircle>
        </Container>
      </section>

      <div aria-hidden="true" style={{ height: '15vh' }} />

      <Modal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        title="Resume"
      >
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="h-[75vh] w-full"
          aria-label="Sakthi Sarani S resume"
        >
          <div className="flex h-[75vh] w-full flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-ink/60 dark:text-mint/60">
              Your browser can&apos;t preview this PDF inline.
            </p>
            <a
              href="/resume.pdf"
              download
              className="squircle-sm inline-flex w-fit items-center gap-2 bg-forest px-5 py-2.5 text-sm font-medium text-surface-light hover:bg-moss dark:bg-mint dark:text-ink dark:hover:bg-mint/80"
            >
              Download instead
            </a>
          </div>
        </object>
      </Modal>
    </>
  );
}
