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
    throw Error("Need to provide rss options");
  }
  return new Promise((res, rej) => {
    pluginOptions.rss.forEach(async ({ selectors, name, urlToFetch }) => {
      if (!selectors) {
        rej(`Need to provide selectors to ${name || "one of the rss"}`);
        return;
      }
      const response = await fetch(urlToFetch);
      const body = await response.text();
      const dom = new JSDOM(body, {
        contentType: "text/xml",
        storageQuota: 10000000,
      });
      const data = selectors.reduce((acc, selector) => {
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
        id: createNodeId(`${name}`),
        parent: null,
        children: [],
        internal: {
          type: name,
          content: JSON.stringify(data),
          contentDigest: createContentDigest(data),
        },
      });
      res("Node Created");
    });
  });
};
