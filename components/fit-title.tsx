'use client';

import { useEffect, useRef, useState } from 'react';

export function FitTitle({
  children,
  className,
  maxFontRem = 1.35,
  minFontRem = 0.75,
}: {
  children: React.ReactNode;
  className?: string;
  maxFontRem?: number;
  minFontRem?: number;
}) {
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const [fontSize, setFontSize] = useState(maxFontRem);

  useEffect(() => {
    const zone = zoneRef.current;
    const text = textRef.current;
    if (!zone || !text) return;

    let size = maxFontRem;
    text.style.fontSize = `${size}rem`;

    // Shrink in small steps until the title fits within its allotted
    // zone height, stopping at a minimum readable size rather than
    // shrinking indefinitely.
    while (text.scrollHeight > zone.clientHeight && size > minFontRem) {
      size -= 0.05;
      text.style.fontSize = `${size}rem`;
    }
    setFontSize(size);
  }, [children, maxFontRem, minFontRem]);

  return (
    <div ref={zoneRef} className="flip-title-zone">
      <h3
        ref={textRef}
        className={className}
        style={{ fontSize: `${fontSize}rem` }}
      >
        {children}
      </h3>
    </div>
  );
}
