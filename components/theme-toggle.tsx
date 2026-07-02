'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<{ isDark: boolean; mounted: boolean }>({
    isDark: false,
    mounted: false,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing React state from a DOM class set by the pre-hydration script; can only happen after mount
    setTheme({
      isDark: document.documentElement.classList.contains('dark'),
      mounted: true,
    });
  }, []);

  function toggleTheme() {
    const next = !theme.isDark;
    setTheme({ isDark: next, mounted: true });
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  if (!theme.mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="squircle-sm w-9 h-9 flex items-center justify-center bg-forest/20 dark:bg-mint/10 hover:bg-forest/30 dark:hover:bg-mint/20 transition-colors"
    >
      {theme.isDark ? '☀️' : '🌙'}
    </button>
  );
}
