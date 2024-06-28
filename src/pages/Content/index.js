import injectHoverComponent from "../../utils/injectHoverComponent.js";
import { matchTextOnPage } from "../../utils/matchTextOnPage.js";

/* ---------------------------------- */
/*             Definitions            */
/* ---------------------------------- */

import {
  preMatchIgnoreClasses,
  priceRangeRegex,
  priceRegex,
  stopWhenMatch,
} from "../../utils/constants.js";

var settings = {};
var rates = {};
var conversionRate = NaN;
var regex = priceRegex;
var rangedRegex = priceRangeRegex;
var countNoHighlights = 0;
var foundSiteCurrency = "";
var matchIgnoreSelector = "";
var replace = true;

/* ---------------------------------- */
/*            Initializers            */
/* ---------------------------------- */

function getMatchIgnoreSelector() {
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

/* ---------------------------------- */
/*                Main                */
/* ---------------------------------- */

function highlightPrices() {
  // Cases:
  // [t$1.00kt]
  // [t $1.00k t $2.00k t]
  // [t$/1.00k/t]
  // [t$1/.00k/t]
  // [t$/1/.00k//t]
  // [t/$//1//.00k/t]
  // [/t/$1.00k/t/]
  // [t$1.00k-$2.00kt]
  // [t$1.00k/-//$2.00k/t]
  // [t/$1.00k/-/$2.00k/t]
  // [t/$1.00k//-//$2.00k/t]
  // [t/$1.00k-//$2.00k/t]
  // [t/$1.00k//-$2.00k/t]
  // [t/$//1.00k//-//$2.00k/t]
  // [$ 1]

  const matchCallback = (indexedMatch) => {
    console.log("Match:", indexedMatch);
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
        "%c Money prices highlighted!",
        "color: gold",
        countNoHighlights
      )
    : console.log("%c No money prices found!", "color: red", countNoHighlights);
}

/* ---------------------------------- */
/*              Observer              */
/* ---------------------------------- */

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
        highlightPrices();
        observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
      }, settings.performance_highlight_cooldown);
    } else {
      highlightPrices();
      observer.observe(document.body, { childList: true, subtree: true }); // Resume observing
    }

    console.log("%c Document changed!", "color: green");
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
      console.log("Blacklisted site:", url);
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
