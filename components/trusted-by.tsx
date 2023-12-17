import { HTMLAttributes } from 'react';
import Img from '@sohanemon/next-image';
import { cn } from '@sohanemon/utils';

import { Motion } from './motion';
import { P } from './ui/text';

export function TrustedBy({
  className,
  ...props
}: { className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <Motion className={cn('flex py-12 shadow-md', className)}>
      <Motion
        className="flex min-w-fit -space-x-3.5"
        initial="shrinked"
        transition={{ delay: 0.5 }}
      >
        {Array.from(Array(5).keys()).map((el) => (
          <Img
            key={el}
            src={`/public/assets/avatar/Clipboard-${el + 1}.png`}
            width={36}
          />
        ))}
      </Motion>
      <P className="!ml-4  text-lg font-semibold leading-relaxed text-white">
        Trusted by more than 100K <span className="text-gradient">users</span>
      </P>
    </Motion>
  );
}
