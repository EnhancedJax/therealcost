import { motion } from "framer-motion";
import React from "react";
import { fadeInUp2, stagger, zoomOut } from "../animations";
import { T, TA, TB, TC } from "../styles";

export default function Display({ t, data, rates, handlePageChange }) {
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
        <TA>{data.currency}</TA>
        <TA>{data.hourlyWage}</TA>
        <TB>{t("welcome.configurator.2")}</TB>
        <TB>{t("welcome.configurator.3")}</TB>
        <TA>
          {data.hoursPerDay} {t("hours")}
        </TA>
        <TB>{t("welcome.configurator.4")}</TB>
        <TA>
          {data.daysPerWeek} {t("days")}
        </TA>
        <TB>{t("welcome.configurator.5")}</TB>
      </TC>
      <T variants={fadeInUp2}>
        {t("welcome.display.1", { currency: data.currency, price })}
        <TA>
          {calculated} {t("hours")}
        </TA>
        {t("welcome.display.2")}
      </T>
    </motion.div>
  );
}
