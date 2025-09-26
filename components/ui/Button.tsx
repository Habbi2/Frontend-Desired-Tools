import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
}

const base = 'inline-flex items-center justify-center font-medium rounded-md select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 text-sm';
const sizes: Record<string,string> = {
  sm: 'h-8 px-3 gap-1',
  md: 'h-9 px-4 gap-2'
};
const variants: Record<string,string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-600/60',
  outline: 'border border-neutral-300 dark:border-neutral-700 hover:border-brand-500 text-neutral-700 dark:text-neutral-200',
  ghost: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60'
};

export function Button({ variant='primary', size='md', className, ...props}: ButtonProps) {
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
}

export default Button;