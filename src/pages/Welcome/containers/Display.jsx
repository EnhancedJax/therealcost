import { motion } from "framer-motion";
import React from "react";
import { fadeInUp2, stagger, zoomOut } from "../animations";
import { T, TA, TB, TC } from "../styles";

export default function Display({ data, rates, handlePageChange }) {
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
        <TB>If you earn</TB>
        <TA>{data.currency}</TA>
        <TA>{data.hourlyWage}</TA>
        <TB>per hour, </TB>
        <TA>{data.hoursPerDay} hours</TA>
        <TB>a day, </TB>
        <TA>{data.daysPerWeek} days</TA>
        <TB>a week...</TB>
      </TC>
      <T variants={fadeInUp2}>
        Your new phone isn't ${price}, it's <TA>{calculated} hours</TA> of your
        life.
      </T>
    </motion.div>
  );
}
