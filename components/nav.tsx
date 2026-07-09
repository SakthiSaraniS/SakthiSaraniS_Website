'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Container } from '@/components/container';

const links = [
  { href: '/', label: 'Home' },
  { href: '/background', label: 'Background' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-surface-light/70 dark:bg-surface-dark/70 border-b border-forest/10 dark:border-mint/10">
      <Container className="flex items-center justify-between py-6 md:py-7">
        <Link href="/" className="text-xl md:text-2xl font-semibold">
          Sakthi Sarani S
        </Link>
        <nav className="hidden sm:flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link squircle-sm px-5 py-2.5 text-base font-medium text-ink/70 dark:text-mint/70 hover:text-moss dark:hover:text-mint"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </Container>
    </header>
  );
}
