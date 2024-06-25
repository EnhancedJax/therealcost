import React from "react";
import { createRoot } from "react-dom/client";
import Hover from "../components/Hover";
import { highlightClass } from "../constants.js";

// Inject Hover component
export default function injectHoverComponent(settings, url, demo = false) {
  console.log("%c Injecting Hover component...", "color: purple");
  const reactRootEl = document.createElement("div");
  reactRootEl.setAttribute("id", "therealcost-reactRoot");
  reactRootEl.style.position = "absolute";
  reactRootEl.style.top = "0";
  reactRootEl.style.left = "0";
  document.documentElement.appendChild(reactRootEl);
  const reactRoot = createRoot(reactRootEl);

  const renderHover = (data) => {
    reactRoot.render(
      <Hover
        data={data}
        settings={settings}
        siteReplaceBlacklisted={settings.replace_blacklist.includes(url)}
        isDemo={demo}
      />
    );
  };

  renderHover({
    amount: 0,
    currency: null,
    siteCurrency: null,
    calculated: null,
    dimensions: {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      sX: 0,
      sY: 0,
    },
  });

  document.body.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains(highlightClass)) {
      let targetRect = e.target.getBoundingClientRect();
      const data = {
        amount: e.target.dataset.amount,
        currency: e.target.dataset.currency,
        siteCurrency: e.target.dataset.siteCurrency,
        calculated: e.target.dataset.calculated,
        dimensions: {
          x: targetRect.left,
          y: targetRect.top,
          w: targetRect.width,
          h: targetRect.height,
          sX: window.scrollX,
          sY: window.scrollY,
        },
      };
      renderHover(data);
    }
  });

  console.log("Hover component injected!");
}
