import React from "react";
import { useState } from "react";
import { Container } from "./styles";

const Tooltip = ({ data, settings }) => {
  const { amount, currency, dimensions } = data;

  const value = `${currency}${amount}`;

  if (!dimensions) return null;

  return (
    <Container d={dimensions} id="currency-tooltip">
      {value}
    </Container>
  );
};

export default Tooltip;
