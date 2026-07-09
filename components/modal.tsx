'use client';

import { useEffect } from 'react';

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm dark:bg-black/70"
      />
      <div className="squircle-lg relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden border border-forest/10 bg-surface-light shadow-2xl dark:border-mint/10 dark:bg-surface-dark">
        <div className="flex items-center justify-between border-b border-forest/10 px-6 py-4 dark:border-mint/10">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="nav-link squircle-sm flex h-9 w-9 items-center justify-center text-ink/70 dark:text-mint/70"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
