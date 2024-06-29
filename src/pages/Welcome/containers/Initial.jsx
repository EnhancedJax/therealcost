import { motion } from "framer-motion";
import React from "react";
import { fadeInUp, stagger } from "../animations";
import { useAppContext } from "../models/Welcome";
import { InitialContainer } from "../styles";

export default function Initial() {
  const { t, handlePageChange } = useAppContext();

  return (
    <InitialContainer
      variants={stagger(1.5, 1)}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => {
        setTimeout(handlePageChange, 3000);
      }}
    >
      <motion.p variants={fadeInUp}>👋 {t("welcome.initial.hello")}</motion.p>
      <motion.p variants={fadeInUp}>{t("welcome.initial.thank")}</motion.p>
      <motion.p variants={fadeInUp}>{t("welcome.initial.guide")}</motion.p>
      <motion.p variants={fadeInUp}>{t("welcome.initial.setup")}</motion.p>
      <motion.p
        animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [1, 1.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        ...
      </motion.p>
    </InitialContainer>
  );
}
