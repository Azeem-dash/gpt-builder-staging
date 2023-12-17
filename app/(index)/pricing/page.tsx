import { PageProps } from '@/types';

import { AP, Motion } from '@/components/motion';

import { Card } from './card';
import { TogglePrice } from './toggle-price';

export const metadata = {
  title: 'Pricing',
};

export default function PricingPage({
  searchParams: { annually, free },
}: PageProps) {
  const selectedTab = !!free ? 'free' : !!annually ? 'annually' : 'monthly';

  return (
    <section className="container">
      <TogglePrice selectedTab={selectedTab} />
      <AP mode="wait">
        <Motion
          key={selectedTab?.toString()}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="my-20 flex justify-center max-md:flex-col max-md:gap-10 md:-space-x-4  "
          exit={{ scale: 0.1, opacity: 0, y: 100 }}
          initial={{ scale: 0.8, opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Card pack="free" selectedTab={selectedTab} />
          <Card pack="basic" selectedTab={selectedTab} />
          <Card defaultPlan pack="standard" selectedTab={selectedTab} />
          <Card pack="premium" selectedTab={selectedTab} />
        </Motion>
      </AP>
    </section>
  );
}
