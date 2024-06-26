import i18n from "../../utils/i18n.js";
import injectHoverComponent from "../../utils/injectHoverComponent.js";
import { inlineBlocks, matchTextOnPage } from "../../utils/matchTextOnPage.js";

/* ------- Section definitions ------ */

import {
  highlightClass,
  highlightClassHidden,
  preMatchIgnoreClasses,
  priceRangeRegex,
  priceRegex,
  // preMatchIgnoreClassesIncludes,
  // preMatchIgnoreClassesNegative,
  spanStyle,
  stopWhenMatch,
} from "../../constants.js";

var settings = {};
var rates = {};
var conversionRate = NaN;
var regex = priceRegex;
var rangedRegex = priceRangeRegex;
var countNoHighlights = 0;
var foundSiteCurrency = "";
var matchIgnoreSelector = "";
var replace = true;

/* -------- Section Functions ------- */

function getMatchIgnoreSelector() {
  // const allElements = document.querySelectorAll("*");
  // const classNames = new Set();
  // allElements.forEach((element) => {
  //   element.classList.forEach((className) => {
  //     if (
  //       preMatchIgnoreClassesIncludes.some((ignoreClass) =>
  //         className.includes(ignoreClass)
  //       ) &&
  //       !preMatchIgnoreClassesNegative.some((ignoreClass) =>
  //         className.includes(ignoreClass)
  //       )
  //     ) {
  //       classNames.add(className);
  //     }
  //   });
  // });
  // const uniqueClassNames = Array.from(classNames);
  // const matchIgnoreClasses = preMatchIgnoreClasses.concat(uniqueClassNames);
  matchIgnoreSelector = preMatchIgnoreClasses
    .map((className) => `.${className}`)
    .join(", ");
}

function getThisSiteReplace(url) {
  if (settings.replace_blacklist.includes(url)) {
    console.log("Blacklisted site for replace:", url);
    replace = false;
  } else {
    replace = !settings.noReplace;
  }
}

function setConversionRate(url) {
  function injectRegex(currency) {
    regex = new RegExp(
      priceRegex.source
        .replace("XY", currency.slice(0, 2))
        .replace("XYZ", currency)
    );
    rangedRegex = new RegExp(
      priceRangeRegex.source
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

function calculate(match) {
  const fullMatch = match[0];
  const currency = match[1];
  const amount = match[2];
  const unit = match[3];

  let num = parseFloat(
    amount.replace(/,/g, amount.length - 3 !== amount.indexOf(",") ? "" : ",")
  );

  if (unit) {
    if (unit === "m" || unit === "M" || unit.trim() === "Million") {
      num = num * 1000000;
    } else if (unit === "k" || unit === "K" || unit.trim() === "Thousand") {
      num = num * 1000;
    }
  }
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
  return [fullMatch, currency, amount, unit, calculated, string, toRej];
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
    const createSpan = (node, match) => {
      const parent = node.parentNode;
      const textContent = node.textContent;

      const [fullMatch, currency, amount, unit, calculated, string, toRej] =
        calculate(match);

      const span = document.createElement("span");
      span.textContent = toRej ? fullMatch : replace ? string : fullMatch;
      span.className = toRej ? highlightClassHidden : highlightClass;
      span.dataset.currency = currency;
      span.dataset.siteCurrency = foundSiteCurrency;
      span.dataset.amount = amount + unit;
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

    let index = startIndex;

    while (true) {
      const match = matches[index];
      const textContent = node.textContent;
      if (matches.length > index) {
        // If there are still matches left
        if (textContent.includes(match[2])) {
          // If the textContent contains the amount
          index += createSpan(node, match);
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

  const editSpan = (span, nodeText, match) => {
    const [fullMatch, currency, amount, unit, calculated, string, toRej] =
      calculate(match);

    if (nodeText === fullMatch) {
      console.log("Node is match");
      span.textContent = replace || !toRej ? string : fullMatch;
    } else {
      console.log("Node in match");
      if (amount.startsWith(nodeText) || nodeText.startsWith(amount)) {
        // If node text is where amount starts
        span.textContent = toRej ? fullMatch : replace ? string : fullMatch;
      } else {
        if (span.childElementCount > 0 && nodeText.startsWith(currency)) {
          // If node text is where currency starts
          if (amount.includes(nodeText.replace(currency, ""))) {
            // If node text contains amount
            !toRej
              ? (span.childNodes[0].textContent = replace ? string : "")
              : "";
          } else {
            span.childNodes[0].textContent = toRej ? currency : "";
          }
        } else {
          span.textContent = "";
        }
      }
    }
    span.classList.add(toRej ? highlightClassHidden : highlightClass);
    span.dataset.currency = currency;
    span.dataset.siteCurrency = foundSiteCurrency;
    span.dataset.amount = amount + unit;
    span.dataset.calculated = calculated;
    if (!toRej) {
      Object.assign(span.style, spanStyle);
    }

    return nodeText === fullMatch ? 1 : 0;
  };

  const matchCallback = (currentBatch, matches, combinedText) => {
    console.log("%cHighlighting node...", "color: green");
    console.log(
      "currentBatch.data:",
      currentBatch.map((node) => node.data)
    );
    console.log("matches:", matches);

    let lastMatchIndex = 0;

    currentBatch.forEach((node) => {
      const nodeTextContent = node.textContent.trim();
      const parent = node.parentNode;
      if (!parent || matches.length <= lastMatchIndex) {
        return;
      }
      if (!inlineBlocks.includes(parent.nodeName)) {
        // CASE: Node is direct text content of non-inline block
        lastMatchIndex += createSpans(node, matches, lastMatchIndex);
      } else {
        const match = matches[lastMatchIndex];
        if (match[0].includes(nodeTextContent)) {
          // Case: Inline block is part / full match of current match
          const span = node.parentNode;
          lastMatchIndex += editSpan(span, nodeTextContent, match);
        } else if (nodeTextContent.includes(match[0])) {
          // Case: Inline block contains match
          lastMatchIndex += createSpans(node, matches, lastMatchIndex);
        } else {
          lastMatchIndex++;
        }
      }
    });

    // console.log("Node highlighted!");
  };

  const haveMatches = matchTextOnPage(
    document.body,
    [regex, rangedRegex],
    stopWhenMatch,
    matchCallback,
    matchIgnoreSelector
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

// Observe the document for changes to re-highlight money amounts
function observeDocument() {
  const observer = new MutationObserver((mutations) => {
    observer.disconnect(); // Pause observing

    if (countNoHighlights >= settings.performance_stop_threshold) {
      console.log("%c Too many empty highlights, stopping...", "color: red");
      return;
    }

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
    getThisSiteReplace(url);
    setConversionRate(url);
    injectHoverComponent(settings, url);
    setTimeout(() => {
      highlightMoneyAmounts();
      observeDocument();
    }, settings.performance_load_delay);
  }
});
