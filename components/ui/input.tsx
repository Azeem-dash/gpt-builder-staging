import * as React from 'react';
import { cn } from '@sohanemon/utils';
import { Iconify } from '@sohanemon/utils/components';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="group flex h-12 items-center gap-1 rounded-full border border-input bg-transparent px-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
        {icon && (
          <Iconify
            className="text-lg text-gray-300 group-focus-within:text-primary"
            icon={icon}
          />
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'h-full w-full placeholder:text-gray-300  focus-visible:outline-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
