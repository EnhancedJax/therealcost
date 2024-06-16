/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable no-loop-func */
import React from 'react';
import { createRoot } from 'react-dom/client';
import Tooltip from '../../components/Tooltip.jsx';

console.log('Content script works!');

const moneyRegex =
  /((?:US|USD|EUR|JPY|GBP|AUD|CAD|CA|CHF|HKD|HK|CNY|SEK|NZD|MXN)\s?[$£¥€])\s?(\d+([.,]\d+)?)/m;

const spanStyle = {
  textDecoration: 'underline',
  borderRadius: '5px',
  padding: '2px',
};

let tooltipData = {
  amount: 0,
  currency: '$',
  position: null,
};

const wage = 75;

// Function to detect and highlight money amounts
function highlightMoneyAmounts() {
  console.log('%c Highlighting money amounts...', 'color: blue');
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
    if (node.parentNode.closest('#reactRoot')) {
      continue;
    }
    const matches = node.nodeValue.match(moneyRegex);
    if (matches) {
      console.log(node, node.parentNode);
      const parent = node.parentNode;
      const span = document.createElement('span');

      span.className = 'highlighted-money';
      span.textContent =
        (parseFloat(matches[2].replace(',', '')) / wage).toFixed(2) + ' hrs';
      // span.textContent = matches[0];

      Object.assign(span.style, spanStyle);

      // give tooltip component access to the data
      span.dataset.currency = matches[1];
      span.dataset.amount = matches[2];

      const parts = node.nodeValue.split(matches[0]);
      parent.insertBefore(document.createTextNode(parts[0]), node); // Insert text before the matched text
      parent.insertBefore(span, node);
      node.nodeValue = parts[1]; // Update node value to remove the matched text
    }
  }
  console.log('%c Money amounts highlighted!', 'color: gold');
}

// Inject tooltip component
function injectTooltipComponent() {
  console.log('%c Injecting tooltip component...', 'color: blue');
  const reactRootEl = document.createElement('div');
  reactRootEl.setAttribute('id', 'reactRoot');
  document.body.appendChild(reactRootEl);
  const reactRoot = createRoot(reactRootEl);

  const renderTooltip = () => {
    reactRoot.render(<Tooltip data={tooltipData} />);
  };

  document.body.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('highlighted-money')) {
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

  document.body.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('highlighted-money')) {
      tooltipData.dimensions = null;
      renderTooltip();
    }
  });

  console.log('Tooltip component injected!');
}

// Observe the document for changes to re-highlight money amounts
// eslint-disable-next-line no-unused-vars
function observeDocument() {
  const observer = new MutationObserver((mutations) => {
    observer.disconnect(); // Pause observing
    let shouldHighlight = false;
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() !== 'script' &&
            node.id !== 'currency-tooltip'
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
    console.log('%c Document changed!', 'color: green');
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Initialize content script
injectTooltipComponent();
highlightMoneyAmounts();
observeDocument();
