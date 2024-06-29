import i18n from "../../utils/i18n.js";
import injectHoverComponent from "../../utils/injectHoverComponent.js";
import { matchTextOnPage } from "../../utils/matchTextOnPage.js";

/* ---------------------------------- */
/*             Definitions            */
/* ---------------------------------- */

import {
  highlightClass,
  highlightClassHidden,
  preMatchIgnoreClasses,
  priceRangeRegex,
  priceRegex,
  spanStyle,
  stopWhenMatch,
} from "../../utils/constants.js";

var settings = {};
var rates = {};
var V_conversionRate = NaN;
var V_regex = priceRegex;
var V_rangedRegex = priceRangeRegex;
var V_countNoHighlights = 0;
var V_foundSiteCurrency = "";
var V_matchIgnoreSelector = "";
var V_replace = true;

/* ---------------------------------- */
/*            Initializers            */
/* ---------------------------------- */

function getMatchIgnoreSelector() {
  V_matchIgnoreSelector = preMatchIgnoreClasses
    .map((className) => `.${className}`)
    .join(", ");
}

function getThisSiteReplace(url) {
  if (settings.replace_blacklist.includes(url)) {
    V_replace = false;
  } else {
    V_replace = !settings.noReplace;
  }
}

function setConversionRate(url) {
  function injectRegex(currency) {
    V_regex = new RegExp(
      priceRegex.source
        .replace("XY", currency.slice(0, 2))
        .replace("XYZ", currency)
    );
    V_rangedRegex = new RegExp(
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
    V_conversionRate = rates[userCurrency] / rates[siteCurrency];
    V_foundSiteCurrency = siteCurrency;
    injectRegex(siteCurrency);
  } else {
    // site has same currency as user
    V_conversionRate = 1;
    injectRegex(settings.currency);
  }
}

/* ---------------------------------- */
/*                Main                */
/* ---------------------------------- */

function highlightPrices() {
  const calulate = (match) => {
    const fullMatch = match.value;
    const currency = match.groups[0].value;
    const price = match.groups[1].value;
    const unit = match.groups[2].value;

    let num = parseFloat(
      price.replace(/,/g, price.length - 3 !== price.indexOf(",") ? "" : ",")
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
    const convertedNum = num * V_conversionRate;
    let calcHours = (convertedNum / settings.hourlyWage).toFixed(2);
    const setText =
      (calcHours < 10 ? calcHours : calcHours.split(".")[0]) +
      " " +
      i18n.t("hours");
    return {
      amounts: { fullMatch, currency, price, unit },
      calcHours,
      setText,
      toRej,
    };
  };

  const matchCallback = (indexedMatch) => {
    let offset = 0;
    let lastNode = null;
    let lastNodeData = null;
    indexedMatch.forEach((match) => {
      const { groups } = match;
      const {
        amounts: { fullMatch, currency, price, unit },
        calcHours,
        setText,
        toRej,
      } = calulate(match);

      for (let i = 0; i < 3; i++) {
        const { full, nodes, start, end, value } = groups[i];
        /* ----------- createSpan ----------- */
        const createSpan = (data) => {
          const span = document.createElement("span");
          span.textContent = (() => {
            if ((!toRej && !V_replace) || toRej) return value;
            if (i !== 1 || !value.startsWith(data)) return "";
            return setText;
          })();
          span.className = toRej ? highlightClassHidden : highlightClass;
          span.dataset.currency = currency;
          span.dataset.siteCurrency = V_foundSiteCurrency;
          span.dataset.price = price + " " + unit;
          span.dataset.calculated = calcHours;
          span.dataset.value = value;
          if (!toRej) Object.assign(span.style, spanStyle);
          return span;
        };
        /* ---------------- - --------------- */
        if (nodes === null) continue;
        if (full) {
          nodes.forEach((node) => {
            const span = createSpan(node.data);
            node.replaceWith(span);
          });
        } else {
          if (start < 0) continue;
          let node = nodes[0];

          if (lastNodeData !== node.data) {
            offset = 0;
            lastNodeData = node.data;
          } else {
            node = lastNode;
          }

          const span = createSpan(
            node.data.substring(start + offset, end + offset)
          );
          const startNode = document.createTextNode(
            node.textContent.substring(0, start + offset)
          );
          const endNode = document.createTextNode(
            node.textContent.substring(end + offset)
          );
          node.replaceWith(startNode, span, endNode);
          offset = -end;

          lastNode = endNode;
        }
      }
    });
  };

  const haveMatches = matchTextOnPage(
    document.body,
    [V_regex, V_rangedRegex],
    stopWhenMatch,
    matchCallback,
    V_matchIgnoreSelector
  );
  V_countNoHighlights = haveMatches ? 0 : V_countNoHighlights + 1;
}

/* ---------------------------------- */
/*              Observer              */
/* ---------------------------------- */

function observeDocument() {
  const observer = new MutationObserver((mutations) => {
    observer.disconnect(); // Pause observing

    if (V_countNoHighlights >= settings.performance_stop_threshold) return;

    if (V_countNoHighlights >= settings.performance_max_empty_highlights) {
      setTimeout(() => {
        V_countNoHighlights = 0;
        highlightPrices();
        observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
      }, settings.performance_highlight_cooldown);
    } else {
      highlightPrices();
      observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

/* ---------------------------------- */
/*           Initialization           */
/* ---------------------------------- */

chrome.runtime.sendMessage({ message: "getNecessaryInfo" });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message) {
    const rawUrl = message.tab.url;
    const url = new URL(rawUrl).origin;

    Object.assign(settings, message.settings);
    Object.assign(rates, message.rates);
    if (settings.blacklist.includes(url)) {
      return;
    }

    getMatchIgnoreSelector();
    getThisSiteReplace(url);
    setConversionRate(url);
    injectHoverComponent(settings, url);
    setTimeout(() => {
      highlightPrices();
      observeDocument();
    }, settings.performance_load_delay);
  }
});
