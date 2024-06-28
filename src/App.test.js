import { priceRangeRegex, priceRegex, stopWhenMatch } from "./constants";
import { matchTextOnPage } from "./utils/matchTextOnPage";
const fs = require("fs");
const path = require("path");
/**
 * @jest-environment jsdom
 */
const cbl = path.join(__dirname, "logs/currentBatch.log");
const ml = path.join(__dirname, "logs/matches.log");

fs.writeFileSync(cbl, "", "utf-8");
fs.writeFileSync(ml, "", "utf-8");

function serializeNode(node) {
  return {
    // nodeName: node.nodeName,
    textContent: node.textContent,
    parentNodeName: node.parentNode ? node.parentNode.nodeName : null,
    // attributes: Array.from(node.attributes || []).map((attr) => ({
    //   name: attr.name,
    //   value: attr.value,
    // })),
    // childNodes: Array.from(node.childNodes).map(serializeNode),
  };
}

function appendNodesToLogFile(nodes, filename) {
  const serializedNodes = nodes.map(serializeNode);
  const jsonString = JSON.stringify(serializedNodes, null, 2);
  fs.appendFileSync(filename, jsonString, "utf8");
}

const testMatch = (name, html, result1, result2) => {
  test(name, () => {
    // Return a function
    document.body.innerHTML = html;

    matchTextOnPage(
      document.body,
      [priceRegex, priceRangeRegex],
      stopWhenMatch,
      (currentBatch, matches) => {
        fs.appendFileSync(
          ml,
          `\n----------- Test ${name} -----------\n`,
          "utf-8"
        );
        fs.appendFileSync(
          cbl,
          `\n----------- Test ${name} -----------\n`,
          "utf-8"
        );
        appendNodesToLogFile(currentBatch, cbl);
        fs.appendFileSync(ml, JSON.stringify(matches), "utf-8");

        currentBatch.forEach((node, i) => {
          expect(node.parentNode.nodeName).toEqual(result1[i].parentNodeName);
          expect(node.textContent).toEqual(result1[i].textContent);
        });
        matches.forEach((match, mi) => {
          for (let i = 0; i < 4; i++) {
            expect(match[i]).toEqual(result2[mi][i]);
          }
        });
      }
    );
  });
};

// does not test regex. only tests if the nodes are found and the matches are correct
describe("matchTextOnPage - base", () => {
  testMatch(
    "price in div",
    "<div>$100</div>",
    [{ parentNodeName: "DIV", textContent: "$100" }],
    [["$100", "$", "100", ""]]
  );
  // testMatch(
  //   "price in div - neighboring text",
  //   `<div>
  //   $\n
  //   8
  // </div>`,
  //   [{ parentNodeName: "DIV", textContent: "$8" }],
  //   [["$8", "$", "8", ""]]
  // );
  testMatch(
    "2 prices in single div",
    "<div>$100 $200</div>",
    [{ parentNodeName: "DIV", textContent: "$100 $200" }],
    [
      ["$100", "$", "100", ""],
      ["$200", "$", "200", ""],
    ]
  );
  testMatch(
    "price separated by spans in div",
    "<div><span>$</span><span>100</span></div>",
    [
      { parentNodeName: "SPAN", textContent: "$" },
      { parentNodeName: "SPAN", textContent: "100" },
    ],
    [["$100", "$", "100", ""]]
  );
  testMatch(
    "price separated by nested spans in div",
    "<div><span>$</span><span>100<span>.<span>22</span></span></span> Million</div>",
    [
      { parentNodeName: "SPAN", textContent: "$" },
      { parentNodeName: "SPAN", textContent: "100" },
      { parentNodeName: "SPAN", textContent: "." },
      { parentNodeName: "SPAN", textContent: "22" },
      { parentNodeName: "DIV", textContent: " Million" },
    ],
    [["$100.22Million", "$", "100.22", "Million"]]
  );
  testMatch(
    "2 prices separated by nested spans in div",
    "<div><span>$</span><span>100<span>.<span>22</span></span></span> <span>$</span><span>200</span></div>",
    [
      { parentNodeName: "SPAN", textContent: "$" },
      { parentNodeName: "SPAN", textContent: "100" },
      { parentNodeName: "SPAN", textContent: "." },
      { parentNodeName: "SPAN", textContent: "22" },
      { parentNodeName: "SPAN", textContent: "$" },
      { parentNodeName: "SPAN", textContent: "200" },
    ],
    [
      ["$100.22", "$", "100.22", ""],
      ["$200", "$", "200", ""],
    ]
  );
});

describe("matchTextOnPage - ranged (double regex)", () => {
  testMatch(
    "double dollar sign in div (base)",
    "<div>$100-$200</div>",
    [{ parentNodeName: "DIV", textContent: "$100-$200" }],
    [
      ["$100", "$", "100", ""],
      ["$200", "$", "200", ""],
    ]
  );
  testMatch(
    "price range in div",
    "<div>XYZ $100-200</div>",
    [{ parentNodeName: "DIV", textContent: "XYZ $100-200" }],
    [
      ["XYZ $100", "XYZ $", "100", ""],
      ["XYZ $100-200", "XYZ $", "200", ""],
    ]
  );
  testMatch(
    "price range separated by spans in div",
    "<div>XYZ <span>$</span><span>100</span>-<span>200</span></div>",
    [
      { parentNodeName: "DIV", textContent: "XYZ " },
      { parentNodeName: "SPAN", textContent: "$" },
      { parentNodeName: "SPAN", textContent: "100" },
      { parentNodeName: "DIV", textContent: "-" },
      { parentNodeName: "SPAN", textContent: "200" },
    ],
    [
      ["XYZ$100", "XYZ$", "100", ""],
      ["XYZ$100-200", "XYZ$", "200", ""],
    ]
  );
});

describe("snippets", () => {
  testMatch(
    "https://www.apple.com/shop/buy-iphone/iphone-15-pro",
    `<label for=":r7:" class="form-selector-label" id=":r7:_label"><span class="row"><span class="column form-selector-left-col rf-bfe-selector-left-col"><span class="form-selector-title">iPhone&nbsp;15&nbsp;Pro
<span class="form-label-small">6.1-inch display<span class="visuallyhidden">&nbsp;footnote&nbsp;</span>¹</span></span></span><span class="column form-selector-right-col rf-bfe-selector-right-col"><span class="form-label-small" data-autom="pricedimensionScreensize6_1inch"> <span class="price-point price-point-fullPrice">From <span class="nowrap">$999</span></span> <span class="price-point price-point-acmiPrice"><span> or <span class="nowrap">$41.62<span aria-hidden="true">/mo.</span><span class="visuallyhidden"> per month</span></span> <span class="nowrap acinstallment-term-length"> for 24 <span aria-hidden="true">mo.</span><span class="visuallyhidden">months</span></span></span><span class="visuallyhidden">Footnote</span>*</span></span></span></span></label>`,
    [
      {
        textContent: "iPhone 15 Pro\n",
        parentNodeName: "SPAN",
      },
      {
        textContent: "6.1-inch display",
        parentNodeName: "SPAN",
      },
      {
        textContent: " footnote ",
        parentNodeName: "SPAN",
      },
      {
        textContent: "¹",
        parentNodeName: "SPAN",
      },
      {
        textContent: "From ",
        parentNodeName: "SPAN",
      },
      {
        textContent: "$999",
        parentNodeName: "SPAN",
      },
      {
        textContent: " or ",
        parentNodeName: "SPAN",
      },
      {
        textContent: "$41.62",
        parentNodeName: "SPAN",
      },
      {
        textContent: "/mo.",
        parentNodeName: "SPAN",
      },
      {
        textContent: " per month",
        parentNodeName: "SPAN",
      },
      {
        textContent: " for 24 ",
        parentNodeName: "SPAN",
      },
      {
        textContent: "mo.",
        parentNodeName: "SPAN",
      },
      {
        textContent: "months",
        parentNodeName: "SPAN",
      },
      {
        textContent: "Footnote",
        parentNodeName: "SPAN",
      },
      {
        textContent: "*",
        parentNodeName: "SPAN",
      },
    ],
    [
      ["$999", "$", "999", ""],
      ["$41.62", "$", "41.62", ""],
    ]
  );
});
