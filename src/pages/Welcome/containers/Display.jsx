import { motion } from "framer-motion";
import React from "react";
import { fadeInUp2, removeBold, stagger, zoomOut } from "../animations";
import { useAppContext } from "../models/Welcome";
import { T, TA, TB, TC } from "../styles";

export default function Display() {
  const { t, data, rates, handlePageChange } = useAppContext();

  const calculated = ((999 * rates[data.currency]) / data.hourlyWage).toFixed(
    0
  );
  const price = (999 * rates[data.currency]).toFixed(0);
  return (
    <motion.div
      variants={stagger(1)}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => {
        setTimeout(handlePageChange, 3000);
      }}
    >
      <TC variants={zoomOut}>
        <TB>{t("welcome.configurator.1")}</TB>
        <TA variants={removeBold}>{data.currency}</TA>
        <TA variants={removeBold}>{data.hourlyWage}</TA>
        <TB>{t("welcome.configurator.2")}</TB>
        <TB>{t("welcome.configurator.3")}</TB>
        <TA variants={removeBold}>
          {data.hoursPerDay} {t("hours")}
        </TA>
        <TB>{t("welcome.configurator.4")}</TB>
        <TA variants={removeBold}>
          {data.daysPerWeek} {t("days")}
        </TA>
        <TB>{t("welcome.configurator.5")}</TB>
      </TC>
      <T variants={fadeInUp2}>
        {t("welcome.display.1")}
        <i>
          {data.currency}
          {price}
        </i>
        {t("welcome.display.2")}
        <TA>
          {calculated} {t("hours")}
        </TA>
        {t("welcome.display.3")}
      </T>
    </motion.div>
  );
}
