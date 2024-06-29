import React from "react";
import { createRoot } from "react-dom/client";
import Welcome from "./Welcome";
import "./index.css";
import { AppProvider } from "./models/Welcome";

const container = document.getElementById("app-container");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <AppProvider>
    <Welcome />
  </AppProvider>
);
