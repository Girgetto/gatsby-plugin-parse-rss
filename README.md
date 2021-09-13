# gatsby-plugin-parse-rss

Add RSS feed into your Gatsby site.

## Install

```sh
npm i gatsby-plugin-parse-rss
```

or

```sh
yarn add gatsby-plugin-parse-rss
```

## How to Use

Add the plugin in your `gatsby-config.js`

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

## Options

In the `options` property you'll need to add an object with a property `rss` which is an array of objects with the RSS informations you want to parse

```js
{
  urlToFetch: "URL_TO_FETCH",
  selectors: ["SELECTORS"],
  name: "graphQLPropertyName",
}
```

Use gatsby's `useStaticQuery` to retrieve datas

```graphql
{
  allYouTubeRss {
    nodes {
      media_title
      media_thumbnail
    }
  }
}
```

This is how the data is retrieved

```json
{
  "data": {
    "allYouTubeRss": {
      "nodes": [
        {
          "media_title": [
            "React JS | To Do List | Speed Coding",
            "React JS | Calculator | Speed Coding"
          ],
          "media_thumbnail": [
            "https://i1.ytimg.com/vi/PDJKXpEtIuA/hqdefault.jpg",
            "https://i4.ytimg.com/vi/OPfaCowjGMc/hqdefault.jpg"
          ]
        }
      ]
    }
  },
  "extensions": {}
}
```

## Example: [CodeSandbox](https://codesandbox.io/s/gatsby-plugin-parse-rss-4pd1y)
