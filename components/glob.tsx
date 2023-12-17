import { ComponentProps } from 'react';
import { cn } from '@sohanemon/utils';

type GlobProps = ComponentProps<'div'>;

export function Glob({ className, ...props }: GlobProps) {
  return (
    <div
      className={cn(
        'h-[440px] w-[440px] rounded-full bg-glow/50 blur-[200px]',
        className
      )}
      {...props}
    ></div>
  );
}
