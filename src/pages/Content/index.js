import React from "react";
import { createRoot } from "react-dom/client";
import Hover from "../../components/Hover";

console.log("Content script works!");

/* ------- Section definitions ------ */

import { defaultSettings, moneyRegex, spanStyle } from "./constants.js";

let HoverData = {
  amount: 0,
  currency: "$",
  position: null,
};

let settings = {};

/* -------- Section Functions ------- */

function calculate(numStr) {
  let calculated = (
    parseFloat(
      numStr.replace(/,/g, numStr.length - 3 !== numStr.indexOf(",") ? "" : ",")
    ) / settings.hourlyWage
  ).toFixed(2);
  const string =
    (calculated < 10 ? calculated : calculated.split(".")[0]) + " hours";
  return [calculated, string];
}

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
  while ((node = walker.nextNode())) {
    if (node.parentNode.closest(".ant-popover") || node.tagName === "script") {
      continue;
    }
    const matches = node.nodeValue.match(moneyRegex);
    if (matches) {
      const parent = node.parentNode;
      const span = document.createElement("span");
      const [calculated, string] = calculate(matches[2]);

      span.className = "highlighted-money";
      if (settings.replace) {
        span.textContent = string;
      } else {
        span.textContent = matches[0];
      }

      Object.assign(span.style, spanStyle);

      // give Hover component access to the data
      span.dataset.currency = matches[1];
      span.dataset.amount = matches[2];
      span.dataset.calculated = calculated;

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

// Inject Hover component
function injectHoverComponent() {
  console.log("%c Injecting Hover component...", "color: blue");
  const reactRootEl = document.createElement("div");
  reactRootEl.setAttribute("id", "therealcost-reactRoot");
  document.documentElement.appendChild(reactRootEl);
  const reactRoot = createRoot(reactRootEl);

  const renderHover = () => {
    reactRoot.render(<Hover data={HoverData} settings={settings} />);
  };

  document.body.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("highlighted-money")) {
      let targetRect = e.target.getBoundingClientRect();
      HoverData = {
        amount: e.target.dataset.amount,
        currency: e.target.dataset.currency,
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
      renderHover();
    }
  });

  // document.body.addEventListener("mouseout", (e) => {
  //   if (e.target.classList.contains("highlighted-money")) {
  //     HoverData.dimensions = null;
  //     renderHover();
  //   }
  // });

  console.log("Hover component injected!");
}

// Observe the document for changes to re-highlight money amounts
// eslint-disable-next-line no-unused-vars
function observeDocument() {
  const observer = new MutationObserver((mutations) => {
    observer.disconnect(); // Pause observing
    let shouldHighlight = false;
    for (const mutation of mutations) {
      const exclude = document.querySelector(".ant-popover");
      // console.log(mutation.target);
      if (
        exclude &&
        (mutation.target.contains(exclude) || exclude.contains(mutation.target))
      ) {
        // console.log("^^^^^^^^^^^^^ EXCLUDED");
        continue;
      }
      shouldHighlight = true;

      // if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      //   for (const node of mutation.addedNodes) {
      //     if (
      //       node.nodeType === Node.ELEMENT_NODE &&
      //       node.tagName.toLowerCase() !== "script" &&
      //       node.id !== "currency-Hover"
      //     ) {
      //       shouldHighlight = true;
      //       break;
      //     }
      //   }
      if (shouldHighlight) {
        break;
      }
      // }
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

chrome.runtime.sendMessage("giveMeCurrentTabPlease");

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.tab) {
    const url = message.tab.url;

    restoreOptions().then(() => {
      settings.blacklist = settings.blacklist.filter(
        (entry) => entry !== null && entry !== undefined
      );
      if (settings.blacklist.includes(url)) {
        console.log("Blacklisted site:", url);
        return;
      }
      injectHoverComponent();
      highlightMoneyAmounts();
      observeDocument();
    });
  }
});
