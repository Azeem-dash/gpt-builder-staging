'use client';

import { ComponentProps } from 'react';
import { cn } from '@sohanemon/utils';
import { motion } from 'framer-motion';

type TextRevealProps = ComponentProps<'div'>;

export function TextReveal({
  className,
  children,
  delay = 0,
  ...props
}: TextRevealProps & { children: string; delay?: number }) {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        delayChildren: delay,
        staggerChildren: 0.04,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className={cn(className)} {...props}>
      <motion.h3
        initial="hidden"
        variants={sentence}
        viewport={{ once: true }}
        whileInView="visible"
      >
        {children.split('').map((char, idx) => (
          <motion.span key={char + idx} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.h3>
    </div>
  );
}
