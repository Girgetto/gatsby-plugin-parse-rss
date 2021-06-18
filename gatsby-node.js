const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

function getNodeContent(node) {
  if (node.hasAttribute("url")) {
    return node.getAttribute("url");
  }
  if (node.hasAttribute("href")) {
    return node.getAttribute("href");
  }
  return node.textContent;
}

exports.sourceNodes = (
  { actions: { createNode }, createNodeId, createContentDigest },
  pluginOptions
) => {
  if (!pluginOptions.rss) {
    throw Error("Need to provide a options");
  }
  pluginOptions.rss.forEach(async (element) => {
    if (!element.selectors) {
      throw Error(`Need to provide selectors for ${element.name}`);
    }
    const response = await fetch(element.urlToFetch);
    const body = await response.text();
    const dom = new JSDOM(body, {
      contentType: "text/xml",
      storageQuota: 10000000,
    });

    const data = element.selectors.reduce((acc, selector) => {
      let HTMLCollection;
      if (selector.includes(":")) {
        HTMLCollection = dom.window.document.getElementsByTagName(selector);
      } else {
        HTMLCollection = dom.window.document.querySelectorAll(selector);
      }

      return {
        ...acc,
        [selector]: Array.from(HTMLCollection).map((node) =>
          getNodeContent(node)
        ),
      };
    }, {});

    createNode({
      id: createNodeId(`${element.name}`),
      parent: null,
      children: [],
      internal: {
        type: element.name,
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data),
      },
    });
  });
};
