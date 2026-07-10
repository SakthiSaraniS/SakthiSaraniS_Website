'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/container';
import { Squircle } from '@/components/squircle';
import { VideoBackground } from '@/components/video-background';
import { ProjectWheel } from '@/components/project-wheel';
import { useReveal } from '@/lib/hooks/use-reveal';
import { projects } from '@/content/projects';
import { DOMAIN_FILTERS } from '@/lib/types';

export function ProjectsContent() {
  const searchParams = useSearchParams();
  const selectedDomain = searchParams.get('domain');

  return (
    <>
      {selectedDomain ? (
        <ProjectGrid domain={selectedDomain} />
      ) : (
        <DomainAccordion />
      )}
      <div aria-hidden="true" style={{ height: '15vh' }} />
    </>
  );
}

function DomainAccordion() {
  const headingRef = useReveal<HTMLDivElement>(0);
  const panels = ['All Projects', ...DOMAIN_FILTERS];

  return (
    <section
      id="nav-expand-anchor"
      className="relative min-h-screen px-6 pb-40 pt-16 sm:pt-20"
    >
      <VideoBackground mode="fixed" />
      <Container>
        <div ref={headingRef} className="reveal mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="mt-2 text-base text-ink/60 dark:text-mint/60">
            Explore by domain
          </p>
        </div>

        <div className="domain-accordion hidden sm:flex">
          {panels.map((domain) => {
            const isAll = domain === 'All Projects';
            const href = isAll
              ? '/projects?domain=all'
              : `/projects?domain=${encodeURIComponent(domain)}`;

            return (
              <Link key={domain} href={href} className="domain-panel">
                <span className="domain-panel-label">{domain}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:hidden">
          {panels.map((domain) => {
            const isAll = domain === 'All Projects';
            const href = isAll
              ? '/projects?domain=all'
              : `/projects?domain=${encodeURIComponent(domain)}`;

            return (
              <Link key={domain} href={href}>
                <Squircle
                  size="md"
                  className="card-glow flex items-center bg-moss/50 p-5 dark:bg-moss/30"
                >
                  <span className="font-medium">{domain}</span>
                </Squircle>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ProjectGrid({ domain }: { domain: string }) {
  const headingRef = useReveal<HTMLDivElement>(0);
  const isAll = domain === 'all';
  const matches = isAll
    ? projects
    : projects.filter((p) => p.domainTags.includes(domain));

  return (
    <section
      id="nav-expand-anchor"
      className="min-h-screen px-6 pb-40 pt-8 sm:pt-12"
    >
      <Container>
        <div ref={headingRef} className="reveal">
          <Link
            href="/projects"
            className="text-sm font-medium text-moss hover:underline dark:text-mint"
          >
            ← All domains
          </Link>
        </div>

        <ProjectWheel projects={matches} />
      </Container>
    </section>
  );
}
