'use client';

import { ComponentProps, useState } from 'react';
import { cn } from '@sohanemon/utils';
import { Iconify } from '@sohanemon/utils/components';
import { CountryDropdown } from 'react-country-region-selector';

type CountrySelectProps = Omit<
  ComponentProps<typeof CountryDropdown>,
  'onChange' | 'value'
>;

export function CountrySelect({ ...props }: CountrySelectProps) {
  const [country, setCountry] = useState('');
  return (
    <div className="group flex h-12 items-center gap-1 rounded-full border border-input bg-transparent px-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
      <Iconify
        className="text-lg text-gray-300 group-focus-within:text-primary"
        icon="bx:world"
      />
      <CountryDropdown
        {...props}
        value={country}
        classes={cn(
          'h-full w-full -translate-x-2 appearance-none bg-transparent pl-2 text-gray-300   focus-visible:outline-none [&_option]:text-background',
          !!country && 'text-background'
        )}
        onChange={(val) => setCountry(val)}
      />
    </div>
  );
}
