/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/components/tooltip.jsx
import React from "react";
import { useState } from "react";

const Tooltip = ({ data }) => {
  const { amount, currency, dimensions } = data;
  const { x, y, w, h } = dimensions || { x: 0, y: 0, w: 0, h: 0 };

  const [wage, setWage] = useState(75);
  const value = `${currency}${amount}`;

  if (!dimensions) return null;

  const style = {
    position: "absolute",
    left: `${x + w / 2 - 150 / 2}px`,
    // eslint-disable-next-line no-undef
    top: `${y - h - 30}px`,
    padding: "5px",
    width: `150px`,
    height: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    display: "block",
    zIndex: 9999,
    color: "#000",
  };

  return (
    <div style={style} id="currency-tooltip">
      {value}
    </div>
  );
};

export default Tooltip;
