import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive=false, className, ...props}: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-neutral-800 bg-neutral-900 shadow-sm',
        interactive && 'transition-shadow hover:shadow-md focus-within:shadow-md',
        className
      )}
      {...props}
    />
  );
}

export default Card;