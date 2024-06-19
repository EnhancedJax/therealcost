/**
 * Matches text on the page based on a regular expression and applies a callback function to the matched text nodes.
 * @param {Node} root - The root node from which to start searching for text nodes.
 * @param {RegExp} regex - The regular expression used to match the text nodes.
 * @param {Function} callback - The callback function to be applied to the matched text nodes.
 * @throws {string} Throws an error if no regex is provided.
 */

function matchTextOnPage(root, regex, callback) {
  if (!regex) {
    throw "No regex provided";
  }

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
          return node.data.trim().length > 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      },
      false
    );

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    return textNodes;
  }

  /**
   * Checks the text across sibling nodes for matches and applies the callback function to the matched nodes.
   * @param {Array} nodes - An array of text nodes to check.
   */
  function checkTextAcrossSiblings(nodes) {
    let combinedText = "";
    let currentBatch = [];

    nodes.forEach((node, index) => {
      combinedText += node.data.trim();
      currentBatch.push(node);

      console.log(`Node ${index}: ${node.data.trim()}`);
      console.log(`Combined Text: ${combinedText}`);

      if (
        (index < nodes.length - 1 &&
          findParent(nodes[index + 1]) !== findParent(node)) ||
        index === nodes.length - 1
      ) {
        console.log(
          "Non-sibling encountered, resetting combinedText and checking matches"
        );

        const matches = combinedText.match(regex);
        if (matches) {
          console.log("%cMatch Found", "color: gold", matches);
          callback(currentBatch, matches, combinedText);
        } else {
          console.log("%cNo Match Found", "color: red");
        }
        combinedText = "";
        currentBatch = [];
      }
    });
  }

  console.log(`Processing root node: ${root.nodeName}`);
  const textNodes = getTextNodes(root);
  console.log(`Found ${textNodes.length} text nodes`);
  checkTextAcrossSiblings(textNodes);
}

/**
 * Finds the parent node of a given node, skipping any intermediate span tags.
 * @param {Node} node - The node for which to find the parent.
 * @returns {Node} The parent node.
 */
function findParent(node) {
  let parent = node.parentNode;
  while (parent.nodeName === "SPAN") {
    parent = parent.parentNode;
  }
  return parent;
}

export { findParent, matchTextOnPage };
