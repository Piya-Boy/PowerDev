'use client';

import { cn } from '@/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
}

export function Loader({
  className,
  size = 'md',
  variant = 'default',
  ...props
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const variantClasses = {
    default: 'border-gray-300 border-t-gray-600',
    primary: 'border-[hsl(var(--neon-blue)/0.2)] border-t-[hsl(var(--neon-blue))]',
    secondary: 'border-[hsl(var(--neon-purple)/0.2)] border-t-[hsl(var(--neon-purple))]',
  };

  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-2',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
} 