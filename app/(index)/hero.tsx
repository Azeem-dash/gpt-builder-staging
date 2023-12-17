import { ComponentProps } from 'react';
import Image from 'next/image';
import { cn } from '@sohanemon/utils';

import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/text';
import { Glob } from '@/components/glob';
import { Motion } from '@/components/motion';
import { TextReveal } from '@/components/text-reveal';

import { TrustedBy } from '../../components/trusted-by';

type HeroProps = ComponentProps<'div'>;

export function Hero({ className, ...props }: HeroProps) {
  return (
    <div
      className={cn(
        'relative grid grid-cols-1 pt-8 md:pt-32 lg:grid-cols-2',
        className
      )}
      {...props}
    >
      <Glob className="absolute right-[110%] translate-y-12" />
      <Glob className="absolute left-[110%] translate-y-12" />
      <Glob className="absolute top-2/3 -z-10 h-40 blur-[180px] center-x" />
      <div>
        <P variant={'heading'}>
          Save Your Time <span className="text-gradient">&</span> Study Faster
        </P>
        <TextReveal className="mt-2 max-w-xl leading-[30px] md:mt-5 md:text-[22px]">
          Increase your productivity, Elevate your learning experience with the
          most comprehensive and powerful AI tools.
        </TextReveal>
        <Button className="mb-12 mt-4 md:my-12 md:min-w-[240px]" size={'lg'}>
          Get Started
        </Button>
      </div>
      <div className="relative flex w-fit items-end -space-x-10">
        <Motion animate="fall">
          <Image
            alt="reading"
            height={500}
            src="/assets/reading.svg"
            width={435}
          />
        </Motion>
        <Motion animate="rise">
          <Image alt="" height={200} src="/assets/robot.svg" width={186} />
        </Motion>
        <Motion
          animate="rotate"
          className="absolute right-12 top-10 max-sm:origin-top-right max-sm:scale-75"
        >
          <Image alt="" height={60} src="/assets/gear.svg" width={60} />
        </Motion>
        <Motion
          animate="rotate"
          className="absolute right-1/4 top-20 max-sm:origin-top-right max-sm:scale-75"
        >
          <Image alt="" height={32} src="/assets/gear.svg" width={32} />
        </Motion>
      </div>
      <TrustedBy />
    </div>
  );
}
