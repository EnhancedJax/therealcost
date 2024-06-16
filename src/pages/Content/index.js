import React from "react";
import { createRoot } from "react-dom/client";
import Tooltip from "../../components/Tooltip";

console.log("Content script works!");

/* ------- Section definitions ------ */

import { defaultSettings, moneyRegex, spanStyle } from "./constants.js";

let tooltipData = {
  amount: 0,
  currency: "$",
  position: null,
};

let settings = {};

/* -------- Section Functions ------- */

// Function to detect and highlight money amounts
function highlightMoneyAmounts() {
  console.log("%c Highlighting money amounts...", "color: blue");
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;
  // eslint-disable-next-line no-cond-assign
  while ((node = walker.nextNode())) {
    // Skip nodes within the reactRoot div
    if (node.parentNode.closest("#reactRoot") || node.tagName === "script") {
      continue;
    }
    const matches = node.nodeValue.match(moneyRegex);
    if (matches) {
      // console.log(node, node.parentNode);
      const parent = node.parentNode;
      const span = document.createElement("span");

      span.className = "highlighted-money";
      if (settings.replace) {
        span.textContent =
          (
            parseFloat(matches[2].replace(",", "")) / settings.hourlyWage
          ).toFixed(2) + " hrs";
      } else {
        span.textContent = matches[0];
      }

      Object.assign(span.style, spanStyle);

      // give tooltip component access to the data
      span.dataset.currency = matches[1];
      span.dataset.amount = matches[2];

      const parts = node.nodeValue.split(matches[0]);
      if (matches[0].startsWith(" ")) {
        // Add a space after the matched text if it starts with a space. (Lazy fix for regex matching inital space with HKD)
        parts[0] += " ";
      }
      parent.insertBefore(document.createTextNode(parts[0]), node); // Insert text before the matched text
      parent.insertBefore(span, node);
      node.nodeValue = parts[1]; // Update node value to remove the matched text
    }
  }
  console.log("%c Money amounts highlighted!", "color: gold");
}

// Inject tooltip component
function injectTooltipComponent() {
  console.log("%c Injecting tooltip component...", "color: blue");
  const reactRootEl = document.createElement("div");
  reactRootEl.setAttribute("id", "reactRoot");
  document.body.appendChild(reactRootEl);
  const reactRoot = createRoot(reactRootEl);

  const renderTooltip = () => {
    reactRoot.render(<Tooltip data={tooltipData} settings={settings} />);
  };

  document.body.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("highlighted-money")) {
      let targetRect = e.target.getBoundingClientRect();
      tooltipData = {
        amount: e.target.dataset.amount,
        currency: e.target.dataset.currency,
        dimensions: {
          x: targetRect.left + window.pageXOffset,
          y: targetRect.top + window.pageYOffset,
          w: targetRect.width,
          h: targetRect.height,
        },
      };
      renderTooltip();
    }
  });

  document.body.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("highlighted-money")) {
      tooltipData.dimensions = null;
      renderTooltip();
    }
  });

  console.log("Tooltip component injected!");
}

// Observe the document for changes to re-highlight money amounts
// eslint-disable-next-line no-unused-vars
function observeDocument() {
  const observer = new MutationObserver((mutations) => {
    observer.disconnect(); // Pause observing
    let shouldHighlight = false;
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() !== "script" &&
            node.id !== "currency-tooltip"
          ) {
            shouldHighlight = true;
            break;
          }
        }
        if (shouldHighlight) {
          break;
        }
      }
    }

    if (shouldHighlight) {
      highlightMoneyAmounts();
    }

    observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
    console.log("%c Document changed!", "color: green");
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/* ------- Read write helpers ------- */

async function writeOption(key, value) {
  try {
    await new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
    console.log(`Option ${key} set to ${value}`);
  } catch (error) {
    console.error(`Error setting option ${key}:`, error);
  }
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = async () => {
  try {
    const items = await new Promise((resolve, reject) => {
      chrome.storage.sync.get(defaultSettings, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items);
        }
      });
    });
    console.log("Options restored!", items);
    Object.assign(settings, items);
  } catch (error) {
    console.error("Error restoring options:", error);
  }
};

/* -------- Section Initialization ------- */

function init() {
  console.log("Content script initialized!");
  restoreOptions().then(() => {
    injectTooltipComponent();
    highlightMoneyAmounts();
    observeDocument();
  });
}

init();
