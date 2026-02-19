import type { Transition, Variants } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDuration = {
  revealUp: 0.8,
  softScale: 0.72,
  floating: 7,
} as const;

export const revealUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.revealUp,
      ease: motionEase,
      delay,
    },
  },
});

export const softScale = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionDuration.softScale,
      ease: motionEase,
      delay,
    },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const floatingTransition: Transition = {
  duration: motionDuration.floating,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "mirror",
};
