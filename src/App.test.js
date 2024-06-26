import { priceRegex, stopWhenMatch } from "./constants";
import { matchTextOnPage } from "./utils/matchTextOnPage";
/**
 * @jest-environment jsdom
 */

const testMatch = (html, expectedArray) => {
  return () => {
    // Return a function
    document.body.innerHTML = html;

    matchTextOnPage(
      document.body,
      priceRegex,
      stopWhenMatch,
      (currentBatch, matches) => {
        const matchData = matches;
        expect(matchData).toEqual(expectedArray);
      }
    );
  };
};

describe("matchTextOnPage (sole detection of match)", () => {
  describe("block element", () => {
    test(
      "empty",
      testMatch(
        `
    <p></p>
    `,
        []
      )
    );
    test(
      "full",
      testMatch(
        `
    <p>$100.00</p>
    `,
        ["$100.00", "$", "100.00"]
      )
    );
    test(
      "currency prefix",
      testMatch(
        `
        <p>XYZ $100.00</p>
        `,
        ["XYZ $100.00", "XYZ $", "100.00"]
      )
    );
    test(
      "text prefix and suffix",
      testMatch(
        `
        <p>Hello $100.00 Bye</p>
        `,
        ["$100.00", "$", "100.00"]
      )
    );
  });
  describe("inline element in block element", () => {
    test(
      "empty",
      testMatch(
        `
    <p><span></span></p>
    `,
        []
      )
    );
    test(
      "text prefix and suffix",
      testMatch(
        `
        <p><span>Hello $100.00 Bye</span></p>
        `,
        ["$100.00", "$", "100.00"]
      )
    );
  });
  describe("inline elements (nested)", () => {
    test(
      "currency, span amount",
      testMatch(
        `
        <p>$<span>100.00</span></p>
        `,
        ["$100.00", "$", "100.00"]
      )
    );
    test(
      "currency, span amount, span span decimal",
      testMatch(
        `
        <p>$<span>100<span>.00</span></span></p>
        `,
        ["$100.00", "$", "100.00"]
      )
    );
    test(
      "currency, span amount, span span dot, span span span decimal",
      testMatch(
        `
        <p>$<span>100<span>.<span>00</span></span></span></p>
        `,
        ["$100.00", "$", "100.00"]
      )
    );
    test(
      "sibilings",
      testMatch(
        `
        <p><span>$</span><span>100</span><span>.00</span></p>
        `,
        ["$100.00", "$", "100.00"]
      )
    );
  });
  describe("multiple matches in block", () => {
    test(
      "multiple matches",
      testMatch(
        `
        <p>$100.00 <span>$200.00</span></p>
        `,
        [
          ["$100.00", "$", "100.00"],
          ["$200.00", "$", "200.00"],
        ]
      )
    );
  });
});
