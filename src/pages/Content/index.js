import React from "react";
import { createRoot } from "react-dom/client";
import Hover from "../../components/Hover/index.jsx";
import i18n from "../../utils/i18n.js";
import { inlineBlocks, matchTextOnPage } from "../../utils/matchTextOnPage.js";

/* ------- Section definitions ------ */

import {
  highlightClass,
  highlightClassHidden,
  moneyRegex,
  preMatchIgnoreClasses,
  preMatchIgnoreClassesIncludes,
  spanStyle,
  stopWhenMatch,
} from "../../constants.js";

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
let matchIgnoreSelector = "";

/* -------- Section Functions ------- */

function getMatchIgnoreSelector() {
  const allElements = document.querySelectorAll("*");
  const classNames = new Set();
  allElements.forEach((element) => {
    element.classList.forEach((className) => {
      if (
        preMatchIgnoreClassesIncludes.some((ignoreClass) =>
          className.includes(ignoreClass)
        )
      ) {
        classNames.add(className);
      }
    });
  });
  const uniqueClassNames = Array.from(classNames);
  const matchIgnoreClasses = preMatchIgnoreClasses.concat(uniqueClassNames);
  matchIgnoreSelector = matchIgnoreClasses
    .map((className) => `.${className}`)
    .join(", ");
}

function setConversionRate(url) {
  function injectRegex(currency) {
    regex = new RegExp(
      moneyRegex.source
        .replace("XY", currency.slice(0, 2))
        .replace("XYZ", currency)
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

  const splitFirst = (delimiter, string) => {
    const index = string.indexOf(delimiter);
    if (index === -1) {
      return [string]; // Return the original string if the delimiter is not found
    }
    return [string.slice(0, index), string.slice(index + delimiter.length)];
  };

  const createSpans = (node, matches, startIndex) => {
    const createSpan = (node, fullMatch, currency, amount) => {
      const parent = node.parentNode;
      const textContent = node.textContent;

      const [calculated, string, toRej] = calculate(amount);

      const span = document.createElement("span");
      span.textContent = toRej
        ? fullMatch
        : settings.replace
        ? string
        : fullMatch;
      span.className = toRej ? highlightClassHidden : highlightClass;
      span.dataset.currency = currency;
      span.dataset.siteCurrency = foundSiteCurrency;
      span.dataset.amount = amount;
      span.dataset.calculated = calculated;
      if (!toRej) {
        Object.assign(span.style, spanStyle);
      }

      const parts = splitFirst(fullMatch, textContent);
      if (fullMatch.startsWith(" ")) {
        parts[0] += " ";
      }

      // <div> <--- parent
      parent.insertBefore(document.createTextNode(parts[0]), node); //   <parts[0]/> <--- 1st insert
      parent.insertBefore(span, node); //   <span/> <--- 2nd insert
      node.textContent = parts[1]; //   <node/> <--- sets to parts[1]
      // </div>
      return 1;
    };

    var index = startIndex;

    while (true) {
      const match = matches[index];
      const textContent = node.textContent;
      if (matches.length > index) {
        // If there are still matches left
        if (textContent.includes(match[2])) {
          // If the textContent contains the amount
          index += createSpan(node, match[0], match[1], match[2]);
        } else {
          if (textContent.includes(match[1])) {
            // If the textContent contains the currency
            const lastIndex = textContent.lastIndexOf(match[1]);
            node.textContent =
              textContent.slice(0, lastIndex) +
              textContent.slice(lastIndex + match[1].length);
          }
          break;
        }
      } else {
        break;
      }
    }
    return index;
  };

  const editSpan = (span, nodeText, fullMatch, currency, amount) => {
    const [calculated, string, toRej] = calculate(amount);
    if (nodeText === fullMatch) {
      // console.log("Node is match");
      span.textContent = settings.replace || !toRej ? string : fullMatch;
    } else {
      // console.log("Node in match");

      span.textContent = amount.startsWith(nodeText)
        ? toRej
          ? fullMatch
          : settings.replace
          ? string
          : fullMatch
        : "";
    }
    span.classList.add(toRej ? highlightClassHidden : highlightClass);
    span.dataset.currency = currency;
    span.dataset.siteCurrency = foundSiteCurrency;
    span.dataset.amount = amount;
    span.dataset.calculated = calculated;
    if (!toRej) {
      Object.assign(span.style, spanStyle);
    }

    return nodeText === fullMatch ? 1 : 0;
  };

  const matchCallback = (currentBatch, matches, combinedText) => {
    // console.log("%cHighlighting node...", "color: green");
    // console.log(
    //   "currentBatch.data:",
    //   currentBatch.map((node) => node.data)
    // );
    // console.log("matches:", matches);

    let lastMatchIndex = 0;
    currentBatch.forEach((node) => {
      const nodeText = node.data;
      const parent = node.parentNode;
      if (matches.length <= lastMatchIndex) {
        return;
      }
      if (!inlineBlocks.includes(parent.nodeName)) {
        // CASE: Node is direct text content of non-inline block
        lastMatchIndex += createSpans(node, matches, lastMatchIndex);
      } else {
        const match = matches[lastMatchIndex];
        if (match[0].includes(nodeText)) {
          // Case: Inline block is part / full match of current match
          const span = node.parentNode;
          lastMatchIndex += editSpan(
            span,
            nodeText,
            match[0],
            match[1],
            match[2]
          );
        } else {
          // Case: Inline block contains match
          lastMatchIndex += createSpans(node, matches, lastMatchIndex);
        }
      }
    });

    // console.log("Node highlighted!");
  };

  const haveMatches = matchTextOnPage(
    document.body,
    regex,
    stopWhenMatch,
    matchCallback,
    matchIgnoreSelector,
    {
      "-": " - ",
    }
  );
  countNoHighlights = haveMatches ? 0 : countNoHighlights + 1;

  countNoHighlights <= 0
    ? console.log(
        "%c Money amounts highlighted!",
        "color: gold",
        countNoHighlights
      )
    : console.log(
        "%c No money amounts found!",
        "color: red",
        countNoHighlights
      );
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
    if (e.target.classList.contains(highlightClass)) {
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
      const excludePopover = document.querySelector(".ant-popover");
      if (
        excludePopover &&
        (mutation.target.contains(excludePopover) || // mutation -> popover: popover show
          excludePopover.contains(mutation.target)) // popover -> mutation: popover button clicked
      ) {
        continue;
      }
      shouldHighlight = true;

      if (shouldHighlight) {
        break;
      }
    }

    if (shouldHighlight) {
      if (countNoHighlights >= settings.performance_max_empty_highlights) {
        console.log("%c Too many empty highlights, buffering...", "color: red");

        setTimeout(() => {
          countNoHighlights = 0;
          highlightMoneyAmounts();
          observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
        }, settings.performance_highlight_cooldown);
      } else {
        highlightMoneyAmounts();
        observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
      }
    } else {
      observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
    }
    console.log("%c Document changed!", "color: green");
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
    Object.assign(rates, message.rates);
    if (settings.blacklist.includes(url)) {
      console.log("Blacklisted site:", url);
      return;
    }
    getMatchIgnoreSelector();
    setConversionRate(url);
    injectHoverComponent();
    setTimeout(() => {
      highlightMoneyAmounts();
      observeDocument();
    }, settings.performance_load_delay);
  }
});
