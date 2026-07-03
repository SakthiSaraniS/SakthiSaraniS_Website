type SquircleSize = 'sm' | 'md' | 'lg';

const sizeClass: Record<SquircleSize, string> = {
  sm: 'squircle-sm',
  md: 'squircle',
  lg: 'squircle-lg',
};

export function Squircle({
  children,
  size = 'md',
  className = '',
}: {
  children: React.ReactNode;
  size?: SquircleSize;
  className?: string;
}) {
  return <div className={`${sizeClass[size]} ${className}`}>{children}</div>;
}
