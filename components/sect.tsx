import { ComponentProps } from 'react';
import Img from '@sohanemon/next-image';
import { cn } from '@sohanemon/utils';

import { Explanation, explanations } from '@/app/(index)/explanations.data';

import { Glob } from './glob';
import { Motion } from './motion';
import { TextReveal } from './text-reveal';

type SectProps = ComponentProps<'section'> & {
  label: keyof typeof explanations;
  rtl?: boolean;
};

export function Sect({ label, rtl, className, children, ...props }: SectProps) {
  return (
    <section
      className={cn(
        'grid grid-cols-1 items-center md:grid-cols-2 md:gap-10',
        className
      )}
      {...props}
    >
      <div
        className={cn('relative space-y-2 max-md:order-last md:space-y-6', {
          'order-last': rtl,
        })}
      >
        <Glob className={cn('absolute right-[110%]', { 'left-[110%]': rtl })} />
        <h2 className="text-2xl font-bold leading-[48px] max-md:hidden md:text-4xl">
          {label}
        </h2>
        {(explanations[label] as Explanation).map((el, idx) => (
          <div key={el.text} className="flex gap-1 md:gap-3">
            <Img
              inject
              className="mt-2 origin-top-left max-md:scale-75 md:mt-[5px]"
              src="/public/assets/ellipse.svg"
            />
            <div className="space-y-2 text-sm md:space-y-4 md:text-lg">
              {el.label && (
                <h4 className="font-bold leading-relaxed">{el.label}</h4>
              )}
              <TextReveal className="leading-7" delay={2 * idx}>
                {el.text}
              </TextReveal>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-center text-2xl font-bold leading-[48px] md:hidden md:text-4xl">
          {label}
        </h2>
        <Motion
          className="relative"
          initial={rtl ? 'left' : 'right'}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {children}
        </Motion>
      </div>
    </section>
  );
}
