import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '@sohanemon/utils';

import { M } from '@/components/motion';

type TogglePriceProps = ComponentProps<'div'> & {
  selectedTab: 'annually' | 'monthly' | 'free';
};

export function TogglePrice({
  className,
  selectedTab,
  ...props
}: TogglePriceProps) {
  return (
    <div
      className={cn(
        'mx-auto my-10 flex w-fit items-center rounded-full bg-white/10 ',
        className
      )}
      {...props}
    >
      {['free', 'monthly', 'annually'].map((el) => (
        <div
          key={el}
          className="relative min-w-[10ch] px-6 py-2 text-center uppercase"
        >
          <Link
            href={
              el === 'monthly'
                ? '?'
                : el === 'free'
                ? '?free=true'
                : '?annually=true'
            }
          >
            {el}
          </Link>
          {el === selectedTab && (
            <M
              className="absolute inset-0 rounded-full bg-secondary mix-blend-difference"
              layoutId="tabs"
            />
          )}
        </div>
      ))}
    </div>
  );
}
