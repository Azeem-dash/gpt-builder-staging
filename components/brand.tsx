import { HtmlHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@sohanemon/utils';

interface CompType {}

export function Brand({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLAnchorElement> & CompType) {
  return (
    <Link
      href={'/'}
      {...props}
      className={cn(
        'overflow-hidden text-2xl font-semibold leading-loose [&>span]:[text-shadow:_0px_4px_30px_#97FEED;]',
        {},
        className
      )}
    >
      <span className={cn('text-gradient')}>GPT</span> <span>Guider</span>
    </Link>
  );
}
