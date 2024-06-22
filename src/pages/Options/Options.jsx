import React from "react";
import "../../utils/i18n.js";
import Popup from "../Popup/Popup";

export default function Options({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Popup />
    </div>
  );
}
