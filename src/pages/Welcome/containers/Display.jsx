import React from "react";
import { NextContainer, TA, TB, TC } from "../styles";

export default function Display() {
  return (
    <>
      <TC small="true">
        <TB small="true">If you earn</TB>
        <TA small="true">$</TA>
        <TA small="true">30</TA>
        <TB small="true">per hour, </TB>
        <TA small="true">80 hours</TA>
        <TB small="true">a day, </TB>
        <TA small="true">5 days</TA>
        <TB small="true">a week...</TB>
      </TC>
      <TB>Your new phone isn't $999, it's 33 hours of your life.</TB>
      <NextContainer></NextContainer>
    </>
  );
}
