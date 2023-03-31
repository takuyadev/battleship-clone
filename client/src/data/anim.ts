// Framer motion animation variants
export const fadeIn = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const slideLeft = {
  initial: {
    x: '100vw',
    opacity: 0,
    transition: { ease: [0.65, 0, 0.35, 1], duration: 1 },
  },
  animate: {
    x: '0%',
    opacity: 1,
    transition: { ease: [0.65, 0, 0.35, 1], duration: 1 },
  },
  exit: {
    x: '-100vw',
    position: 'absolute',
    opacity: 0,
    transition: { ease: [0.65, 0, 0.35, 1], duration: 0.5 },
  },
};

export const slideRight = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};
