import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@sohanemon/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 active:scale-95 focus-visible:ring-ring duration-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ',
  {
    variants: {
      variant: {
        'no-glow': 'bg-gradient-to-t from-muted to-primary  text-foreground',
        black: 'bg-background text-foreground',
        default:
          'bg-gradient-to-t from-muted to-primary  text-foreground hover:[box-shadow:0_0_16px_#2CB49F]',
        outline: 'bg-background !h-[46px] hover:[box-shadow:0_0_16px_#2CB49F]',
      },
      size: {
        default: 'md:h-12 h-10 px-8 py-2',
        sm: 'h-9 px-3',
        lg: 'md:h-16 h-12 px-5 md:px-16 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const OutlineDiv = variant === 'outline' ? 'div' : React.Fragment;
    return (
      <OutlineDiv
        className={cn(buttonVariants({ variant: 'default' }), 'p-0.5')}
      >
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      </OutlineDiv>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
