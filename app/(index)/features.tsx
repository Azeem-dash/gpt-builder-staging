import { ComponentProps } from 'react';
import { cn } from '@sohanemon/utils';

import { P } from '@/components/ui/text';

import { FeatureCards } from './feature-cards';

type FeaturesProps = ComponentProps<'div'>;

export function Features({ className, ...props }: FeaturesProps) {
  return (
    <div
      className={cn('container relative bottom-0 pt-32', className)}
      {...props}
    >
      <P center variant={'heading'}>
        Features
      </P>
      <FeatureCards />
    </div>
  );
}
