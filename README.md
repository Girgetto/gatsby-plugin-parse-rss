# gatsby-plugin-parse-rss

Add RSS feed into your Gatsby site.

## Example

```js
plugins: [
  {
    resolve: "gatsby-plugin-parse-rss",
    options: {
      rss: [
        {
          urlToFetch:
            "https://www.youtube.com/feeds/videos.xml?channel_id=UChqlNb3LpXclrYsIXzD2q_w",
          selectors: ["media:title", "media:thumbnail", "entry > link"],
          name: "youTubeRSS",
        },
        {
          urlToFetch: "https://girgetto-io.netlify.app/rss.xml",
          selectors: ["title", "link"],
          name: "blogPostRSS",
        },
      ],
    },
  },
];
```
