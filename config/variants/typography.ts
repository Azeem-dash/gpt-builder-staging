import { cva } from 'class-variance-authority';

export const textVariants = cva([], {
  variants: {
    variant: {
      heading: 'md:text-4xl text-2xl font-bold',
    },
    size: {},
  },
});
