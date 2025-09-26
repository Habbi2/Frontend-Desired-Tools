import React from 'react';
import clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'brand' | 'success' | 'warn' | 'info';
}

const tones: Record<string,string> = {
  neutral: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  brand: 'bg-brand-600 text-white',
  success: 'bg-emerald-600 text-white',
  warn: 'bg-amber-600 text-white',
  info: 'bg-indigo-600 text-white'
};

export function Badge({ tone='neutral', className, ...props}: BadgeProps) {
  return <span className={clsx('inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide select-none', tones[tone], className)} {...props} />;
}

export default Badge;