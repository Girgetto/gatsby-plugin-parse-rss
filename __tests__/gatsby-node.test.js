jest.mock("node-fetch");

const fetch = require("node-fetch");
const { Response } = jest.requireActual("node-fetch");
const { sourceNodes } = require("../gatsby-node");

const fn = {
  actions: {
    createNode: jest.fn(),
  },
  createNodeId: () => {},
  createContentDigest: () => {},
};

test("should create node", async () => {
  let pluginOptions = {
    rss: [
      {
        urlToFetch: "https://test/rss.xml",
        selectors: ["title"],
      },
    ],
  };
  fetch.mockReturnValue(Promise.resolve(new Response("<title>Title</title>")));
  await sourceNodes(fn, pluginOptions);
  expect(fn.actions.createNode).toHaveBeenCalledWith({
    children: [],
    id: undefined,
    internal: {
      content: '{"title":["Title"]}',
      contentDigest: undefined,
      type: undefined,
    },
    parent: null,
  });
});

test("should throw errors ", async () => {
  let pluginOptions = {
    rss: [
      {
        urlToFetch: "https://test/rss.xml",
        name: "blog",
      },
    ],
  };
  fetch.mockReturnValue(Promise.resolve(new Response("<title>Title</title>")));
  try {
    await sourceNodes(fn, pluginOptions);
  } catch (error) {
    console.log(error);
  }
});
