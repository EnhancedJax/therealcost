import React from "react";
import { createRoot } from "react-dom/client";
import Hover from "../../components/Hover/index.jsx";
import i18n from "../../utils/i18n.js";
import { inlineBlocks, matchTextOnPage } from "../../utils/matchTextOnPage.js";

/* ------- Section definitions ------ */

import { moneyRegex, spanStyle, stopWhenMatch } from "../../constants.js";

let HoverData = {
  amount: 0,
  currency: "$",
  position: null,
};

let settings = {};
let rates = {};
let conversionRate = NaN;
let foundSiteCurrency = "";
let countNoHighlights = 0;
let regex = moneyRegex;

/* -------- Section Functions ------- */

function setConversionRate(url) {
  function splice(str, index, add) {
    return str.slice(0, index) + add + str.slice(index);
  }

  function injectRegex(currency) {
    regex = new RegExp(
      splice(moneyRegex.source, 4, `(?:${currency.slice(0, 2)}|${currency})|`)
    );
  }

  const site_currency_map = settings.site_currency_map;
  const site = site_currency_map.find((site) => site.url === url);
  if (site) {
    const siteCurrency = site.currency;
    const userCurrency = settings.currency;
    conversionRate = rates[userCurrency] / rates[siteCurrency];
    foundSiteCurrency = siteCurrency;
    injectRegex(siteCurrency);
  } else {
    // site has same currency as user
    conversionRate = 1;
    injectRegex(settings.currency);
  }
}

function calculate(numStr) {
  const num = parseFloat(
    numStr.replace(/,/g, numStr.length - 3 !== numStr.indexOf(",") ? "" : ",")
  );
  var toRej = false;
  if (num < settings.minAmount) {
    toRej = true;
  }
  const convertedNum = num * conversionRate;
  let calculated = (convertedNum / settings.hourlyWage).toFixed(2);
  const string =
    (calculated < 10 ? calculated : calculated.split(".")[0]) +
    " " +
    i18n.t("hours");
  return [calculated, string, toRej];
}

// Function to detect and highlight money amounts
function highlightMoneyAmounts() {
  // console.log("%c Highlighting money amounts...", "color: cyan");

  function splitFirst(delimiter, string) {
    const index = string.indexOf(delimiter);
    if (index === -1) {
      return [string]; // Return the original string if the delimiter is not found
    }
    return [string.slice(0, index), string.slice(index + delimiter.length)];
  }

  function highlightNode(currentBatch, matches, combinedText) {
    // console.log("%cHighlighting node...", "color: green");
    // console.log(
    //   "currentBatch.data:",
    //   currentBatch.map((node) => node)
    // );
    // console.log("-----");
    // console.log("combinedText:", combinedText);
    // console.log("matches:", matches);
    // console.log("-----");

    let lastMatchIndex = 0;
    currentBatch.forEach((node, index) => {
      const nodeText = node.data;
      const parent = node.parentNode;
      if (matches.length <= lastMatchIndex) {
        console.log("No more matches");
        return;
      }
      if (!inlineBlocks.includes(parent.nodeName)) {
        // console.log("Case: Not inline block", nodeText);
        while (true) {
          const match = matches[lastMatchIndex];
          const textContent = node.textContent;
          if (
            matches.length > lastMatchIndex &&
            textContent.includes(match[0])
          ) {
            const [calculated, string, toRej] = calculate(match[2]);
            if (toRej) {
              lastMatchIndex++;
              return;
            }

            // console.log("Match found in node", textContent);
            // console.log("(Direct text element) Creating new span...");
            const span = document.createElement("span"); // `span` element to wrap the matched text
            span.textContent = settings.replace ? string : match[0];
            span.className = "highlighted-money";
            span.dataset.currency = match[1];
            span.dataset.siteCurrency = foundSiteCurrency;
            span.dataset.amount = match[2];
            span.dataset.calculated = calculated;
            Object.assign(span.style, spanStyle);

            const parts = splitFirst(match[0], textContent); // removes the matched text from the combined text
            // Add a space after the matched text if removed (matched) text starts with a space. (Lazy fix for regex matching inital space)
            if (match[0].startsWith(" ")) {
              parts[0] += " ";
            }

            // <div> <--- parent
            //   <parts[0]/> <--- 1st insert
            //   <span/> <--- 2nd insert
            //   <node/> <--- sets to parts[1]
            // </div>

            parent.insertBefore(document.createTextNode(parts[0]), node); // Insert text before the matched text
            parent.insertBefore(span, node);
            node.textContent = parts[1];

            // console.log("Match highlighted! (Direct text element");

            lastMatchIndex++;
          } else {
            break;
          }
        }
      } else {
        const match = matches[lastMatchIndex];
        if (match[0].includes(nodeText)) {
          // console.log("Case: Inline block direct match", nodeText);
          const span = node.parentNode;
          const [calculated, string, toRej] = calculate(match[2]);
          if (toRej) {
            return;
          }

          if (nodeText === match[0]) {
            // console.log("Node is match");
            // console.log("(Span element) Modifying existing span...");
            span.textContent = settings.replace ? string : match[0];

            lastMatchIndex++;
          } else {
            // console.log("Node in match");
            // console.log("(Span element) Modifying existing span...", nodeText);
            span.textContent = match[2].startsWith(nodeText)
              ? settings.replace
                ? string
                : match[0]
              : "";
          }
          span.classList.add("highlighted-money");
          span.dataset.currency = match[1];
          span.dataset.siteCurrency = foundSiteCurrency;
          span.dataset.amount = match[2];
          span.dataset.calculated = calculated;
          Object.assign(span.style, spanStyle);
        } else {
          // console.log("Case: Inline block indirect match", nodeText);
          while (true) {
            const textContent = node.textContent;
            if (
              matches.length > lastMatchIndex &&
              textContent.includes(match[0])
            ) {
              const [calculated, string, toRej] = calculate(match[2]);
              if (toRej) {
                lastMatchIndex++;
                return;
              }

              // console.log("Match found in node", textContent);
              // console.log("(Direct text element) Creating new span...");
              const span = document.createElement("span"); // `span` element to wrap the matched text
              span.textContent = settings.replace ? string : match[0];
              span.className = "highlighted-money";
              span.dataset.currency = match[1];
              span.dataset.siteCurrency = foundSiteCurrency;
              span.dataset.amount = match[2];
              span.dataset.calculated = calculated;
              Object.assign(span.style, spanStyle);

              const parts = splitFirst(match[0], textContent); // removes the matched text from the combined text
              // Add a space after the matched text if removed (matched) text starts with a space. (Lazy fix for regex matching inital space)
              if (match[0].startsWith(" ")) {
                parts[0] += " ";
              }

              // <div> <--- parent
              //   <parts[0]/> <--- 1st insert
              //   <span/> <--- 2nd insert
              //   <node/> <--- sets to parts[1]
              // </div>

              parent.insertBefore(document.createTextNode(parts[0]), node); // Insert text before the matched text
              parent.insertBefore(span, node);
              node.textContent = parts[1];

              // console.log("Match highlighted! (Direct text element");

              lastMatchIndex++;
            } else {
              break;
            }
          }
        }
      }
    });

    // console.log("Node highlighted!");
  }

  const haveMatches = matchTextOnPage(
    document.body,
    regex,
    stopWhenMatch,
    highlightNode,
    ".ant-popover, .highlighted-money, .visuallyhidden, .aok-hidden, .aok-offscreen",
    {
      "-": " - ",
    }
  );
  countNoHighlights = haveMatches
    ? 0
    : countNoHighlights == -1
    ? settings.performance_max_empty_highlights
    : countNoHighlights + 1;

  // countNoHighlights <= 0
  //   ? console.log(
  //       "%c Money amounts highlighted!",
  //       "color: gold",
  //       countNoHighlights
  //     )
  //   : console.log(
  //       "%c No money amounts found!",
  //       "color: red",
  //       countNoHighlights
  //     );
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
      renderHover();
    }
  });

  console.log("Hover component injected!");
}

// Observe the document for changes to re-highlight money amounts
function observeDocument() {
  const observer = new MutationObserver((mutations) => {
    observer.disconnect(); // Pause observing
    let shouldHighlight = false;

    for (const mutation of mutations) {
      const exclude = document.querySelector(".ant-popover");
      if (
        exclude &&
        (mutation.target.contains(exclude) || exclude.contains(mutation.target))
      ) {
        // console.log("^^^^^^^^^^^^^ EXCLUDED");
        continue;
      }
      shouldHighlight = true;

      if (shouldHighlight) {
        break;
      }
    }

    if (shouldHighlight) {
      const highlightAndObserve = () => {
        highlightMoneyAmounts();
        observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
        console.log("%c Document changed!", "color: green");
      };

      if (countNoHighlights >= settings.performance_max_empty_highlights) {
        console.log("%c Too many empty highlights, buffering...", "color: red");

        setTimeout(() => {
          countNoHighlights = -1;
          highlightAndObserve();
        }, settings.performance_highlight_cooldown);
      } else {
        highlightAndObserve();
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/* -------- Section Initialization ------- */

chrome.runtime.sendMessage({ message: "getNecessaryInfo" });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message) {
    const rawUrl = message.tab.url;
    const url = new URL(rawUrl).origin;

    Object.assign(settings, message.settings);
    console.log("Rates:", message.rates);
    Object.assign(rates, message.rates);
    if (settings.blacklist.includes(url)) {
      console.log("Blacklisted site:", url);
      return;
    }
    setConversionRate(url);
    injectHoverComponent();
    setTimeout(() => {
      highlightMoneyAmounts();
      observeDocument();
    }, settings.performance_load_delay);
  }
});
