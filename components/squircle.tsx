import { forwardRef } from 'react';

type SquircleSize = 'sm' | 'md' | 'lg';

const sizeClass: Record<SquircleSize, string> = {
  sm: 'squircle-sm',
  md: 'squircle',
  lg: 'squircle-lg',
};

type SquircleProps = {
  children: React.ReactNode;
  size?: SquircleSize;
  className?: string;
  style?: React.CSSProperties;
};

export const Squircle = forwardRef<HTMLDivElement, SquircleProps>(
  function Squircle({ children, size = 'md', className = '', style }, ref) {
    return (
      <div
        ref={ref}
        className={`${sizeClass[size]} ${className}`}
        style={style}
      >
        {children}
      </div>
    );
  }
);
