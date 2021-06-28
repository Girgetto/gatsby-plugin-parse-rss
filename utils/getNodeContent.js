function getNodeContent(node) {
  if (node.hasAttribute("url")) {
    return node.getAttribute("url");
  }
  if (node.hasAttribute("href")) {
    return node.getAttribute("href");
  }
  return node.textContent;
}

module.exports = getNodeContent;
