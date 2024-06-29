/**
 * Matches text on the page based on a regular expression and applies a callback function to the matched text nodes.
 * @param {Node} root - The root node from which to start searching for text nodes.
 * @param {RegExp} regex - The regular expression used to match the text nodes.
 * @param {RegExp} regexStop - The regular expression used to stop the search for matches once a match is found.
 * @param {Function} callback - The callback function to be applied to the matched text nodes.
 * The callback function should accept the following parameters:
 * - {Array} currentBatch - An array of text nodes that are part of the same batch of text.
 * - {Array} matches - An array of matches found within the current batch of text.
 * - {string} combinedText - The combined text of the current batch of text nodes.
 * @param {string} ignoreSelectors - A string of css selectors to ignore when searching for text nodes.
 * @param {Object} nodeReplaceMap - An object containing key-value pairs of text to replace in the text nodes.
 * @throws {string} Throws an error if no regex is provided.
 */

function matchTextOnPage(
  root = document.body,
  regexList = [],
  regexStop,
  callback = () => {},
  ignoreSelectors = ""
) {
  if (!regexList.length) {
    throw "No regex provided";
  }

  let result = false;

  const ignoreTags = [
    "SCRIPT",
    "NOSCRIPT",
    "IMG",
    "STYLE",
    "CODE",
    "IFRAME",
    "INPUT",
    "TEXTAREA",
  ];

  /**
   * Retrieves all text nodes within a given node.
   * @param {Node} node - The node from which to retrieve the text nodes.
   * @returns {Array} An array of text nodes.
   */
  function getTextNodes(node) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (
            node.data.trim().length === 0 ||
            ignoreTags.includes(node.parentNode.nodeName) ||
            (ignoreSelectors && node.parentNode.closest(ignoreSelectors))
          ) {
            return NodeFilter.FILTER_SKIP;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      },
      false
    );

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    return textNodes;
  }

  function getLastMatch(text) {
    const allMatches = getAllMatches(text);
    return allMatches[allMatches.length - 1];
  }

  function getAllMatches(text) {
    let matches = [];
    let m;
    let t;
    regexList.forEach((regex) => {
      t = text;
      while ((m = t.match(regex))) {
        matches.push(m);
        t = t.substring(m.index + m[0].length);
      }
    });
    return matches;
  }

  function indexMatches(nodes, matches, concatenatedString) {
    const result = [];
    let matchIndex = 0;

    for (let match of matches) {
      const fullMatch = {
        start: concatenatedString.indexOf(match[0], matchIndex),
        end: concatenatedString.indexOf(match[0], matchIndex) + match[0].length,
        value: match[0],
      };

      const groups = [];
      for (let i = 1; i < match.length; i++) {
        const group = match[i];
        if (group === "") {
          groups.push({
            nodes: null,
            start: -1,
            end: -1,
            value: "",
            full: false,
          });
          continue;
        }

        const groupResult = {
          nodes: [],
          start: -1,
          end: -1,
          value: group,
          full: false,
        };

        let currentIndex = 0;
        let groupStartIndex = concatenatedString.indexOf(group, matchIndex);
        let groupEndIndex = groupStartIndex + group.length;
        matchIndex = groupEndIndex;
        for (let node of nodes) {
          if (currentIndex + node.data.length > groupStartIndex) {
            groupResult.nodes.push(node);
            if (groupResult.start === -1) {
              groupResult.start = groupStartIndex - currentIndex;
            }
            if (currentIndex + node.data.length >= groupEndIndex) {
              groupResult.end = groupResult.start + group.length;
              groupResult.full = node.data.length <= group.length;
              break;
            }
          }
          currentIndex += node.data.length;
        }

        groups.push(groupResult);
      }

      result.push({ fullMatch, groups });
    }

    return result;
  }

  /**
   * Checks the text across sibling nodes for matches and applies the callback function to the matched nodes.
   * @param {Array} nodes - An array of text nodes to check.
   */
  function checkTextAcrossSiblings(nodes) {
    let combinedText = "";
    let currentBatch = [];
    let savedMatch = [];

    nodes.forEach((node, index) => {
      combinedText += node.data;
      currentBatch.push(node);

      const stopMatch =
        savedMatch.length > 0 ? false : regexStop.test(combinedText);
      const nonSibling =
        (index < nodes.length - 1 &&
          findParent(nodes[index + 1]) !== findParent(node)) ||
        index === nodes.length - 1; // checks if the next node is a sibling

      if (savedMatch.length > 0) {
        const lastMatch = getLastMatch(combinedText);

        if (lastMatch[0] !== savedMatch[savedMatch.length - 1][0]) {
          savedMatch.push(lastMatch);
        }
        if (!nonSibling) {
          return;
        }
      }

      if (nonSibling || stopMatch) {
        const matches = getAllMatches(combinedText);
        if (matches.length > 0 && stopMatch && !nonSibling) {
          // note: check stopMatch only when there are matches
          savedMatch.push(matches[0]);
        } else {
          if (savedMatch.length > 0 || matches.length > 0) {
            const match = savedMatch.length > 0 ? savedMatch : matches;
            result = true;
            callback(indexMatches(currentBatch, match, combinedText));
          }
          savedMatch = [];
          combinedText = "";
          currentBatch = [];
        }
      }
    });
  }

  const textNodes = getTextNodes(root);
  checkTextAcrossSiblings(textNodes);
  return result;
}

/**
 * Finds the parent node of a given node, skipping any intermediate span tags.
 * @param {Node} node - The node for which to find the parent.
 * @returns {Node} The parent node.
 */

const inlineBlocks = [
  "SPAN",
  "A",
  "B",
  "I",
  "EM",
  "STRONG",
  "CODE",
  "S",
  "SMALL",
  "SUB",
  "SUP",
];

function findParent(node) {
  let parent = node.parentNode;
  // let level = 0;
  while (inlineBlocks.includes(parent.nodeName)) {
    parent = parent.parentNode;
    // level++;
  }
  return parent;
}

export { findParent, inlineBlocks, matchTextOnPage };
