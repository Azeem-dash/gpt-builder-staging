import { Variants } from 'framer-motion';

export const defaultVariants: Variants = {
  left: { x: -200, opacity: 0, transition: { type: 'spring' } },
  right: { x: 200, opacity: 0, transition: { type: 'spring' } },
  top: { y: -300, opacity: 0 },
  bottom: { y: 100, opacity: 0 },
  shrinked: { scaleX: 0, transformOrigin: 'left' },
  collapsed: { scaleY: 0, transformOrigin: 'top' },
  hidden: { opacity: 0 },
  visible: { x: 0, y: 0, opacity: 1, scale: 1, scaleX: 1, scaleY: 1 },
  rotate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 20,
      repeatDelay: 0,
    },
  },
  rise: {
    y: [0, -30],
    transition: {
      repeat: Infinity,
      duration: 20,
      repeatDelay: 1,
      repeatType: 'mirror',
    },
  },
  fall: {
    y: [-30, 0],
    transition: {
      repeat: Infinity,
      duration: 20,
      repeatType: 'mirror',
    },
  },
};
