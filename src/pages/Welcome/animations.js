export const stagger = (staggerDelay = 0.1, delay = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delay: delay,
    },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: delay,
    },
  },
});

export const fadeInUp = {
  hidden: { y: 10, height: 0, opacity: 0 },
  visible: {
    y: 0,
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const fadeInUp2 = {
  hidden: { y: 10, height: 0, opacity: 0, marginTop: 0, marginBottom: 0 },
  visible: {
    y: 0,
    height: "auto",
    opacity: 1,
    marginTop: 100,
    marginBottom: 150,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const zoomOut = {
  hidden: { fontSize: "96px", gap: "20px 40px", width: "100%" },
  visible: {
    fontSize: "36px",
    gap: "20px 10px",
    width: "50%",
    fontWeight: 300,
    transition: {
      duration: 0.6,
      ease: "circInOut",
    },
  },
};

export const removeBold = {
  hidden: { fontWeight: 800 },
  visible: {
    fontWeight: 500,
    transition: {
      duration: 0.6,
      ease: "circInOut",
    },
  },
};

export const animateTooltip = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 4,
      ease: "easeInOut",
    },
  },
};
