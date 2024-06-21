import React from "react";
import i18n from "../../utils/i18n.js";
import Popup from "../Popup/Popup";

const i18nStop = i18n; // prevent remove import

export default function Options({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Popup />
    </div>
  );
}
