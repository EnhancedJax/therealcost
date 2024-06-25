export const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
    },
  },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

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
    marginTop: 50,
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
    gap: "20px 16px",
    width: "50%",
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
