import { ComponentProps } from 'react';
import Link from 'next/link';
import Img from '@sohanemon/next-image';
import { cn } from '@sohanemon/utils';

import { kebabCase } from '@/lib/utils';
import { Motion } from '@/components/motion';

import { data } from './dashboard.data';

type FeatureCardsProps = ComponentProps<'div'>;

export function FeatureCards({ className, ...props }: FeatureCardsProps) {
  return (
    <div
      className={cn(
        'my-32 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
      {...props}
    >
      {data.map((el, idx) => (
        <Motion
          key={el.label}
          className="overflow-hidden rounded-[50px]  bg-gradient-to-br from-accent to-primary p-0.5 drop-shadow-2xl"
          initial="bottom"
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
        >
          <div className="flex h-full flex-col items-center rounded-[48px] bg-black px-10 py-7">
            <Img
              inject
              className="-mb-14 -mt-20 md:-mb-12 md:-mt-16"
              src={el.icon}
            />
            <Link
              className="text-center font-bold md:text-xl "
              // href={kebabCase(el.label)}
              href={el?.link}
            >
              {el.label}
            </Link>
            <div className="mt-2 line-clamp-4 text-center text-xs font-medium md:mt-5 md:text-[15px] ">
              {el.text}
            </div>
          </div>
        </Motion>
      ))}
    </div>
  );
}
