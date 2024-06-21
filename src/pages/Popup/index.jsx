import React from "react";
import { createRoot } from "react-dom/client";
import i18n from "../../utils/i18n.js";

const i18nStop = i18n; // prevent remove import

import Popup from "./Popup";
import "./index.css";

const container = document.getElementById("app-container");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
