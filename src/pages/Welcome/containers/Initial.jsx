import { motion } from "framer-motion";
import React from "react";
import { fadeInUp, stagger } from "../animations";
import { InitialContainer } from "../styles";

export default function Initial({ handlePageChange }) {
  return (
    <InitialContainer
      variants={stagger(1.5, 1)}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => {
        setTimeout(handlePageChange, 3000);
      }}
    >
      <motion.p variants={fadeInUp}>👋 Hello</motion.p>
      <motion.p variants={fadeInUp}>
        Thank you for installing TheRealCost!
      </motion.p>
      <motion.p variants={fadeInUp}>
        I'll guide you through what the extension does.
      </motion.p>
      <motion.p variants={fadeInUp}>Let's setup the extension first!</motion.p>
      <motion.p
        animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [1, 1.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        ...
      </motion.p>
    </InitialContainer>
  );
}
