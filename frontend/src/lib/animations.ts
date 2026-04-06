// Animation presets for consistent motion design
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const hoverScale = {
  scale: 1.03,
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export const tapScale = {
  scale: 0.98,
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Button hover and tap animations
export const buttonHover = {
  y: -2,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: {
    y: { type: 'spring', stiffness: 400, damping: 10 },
    boxShadow: { duration: 0.2 },
  },
};

export const buttonTap = {
  y: 0,
  scale: 0.98,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};
