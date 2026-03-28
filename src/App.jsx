// import { cdn } from "https://cdn.jsdelivr.net/gh/chancellor-whitaker/github-cdn@latest/static/my-lib.js";

// import { useMemo } from "react";

// import useData from "./hooks/useData";

// const vendor = "au-kddi";

export default function App() {
  // const data = useData(`lib/json/emojipedia/${vendor}.json`);

  // const condensedData = useMemo(() => condenseEmojiUrlData(data), [data]);

  // console.log(expandEmojiUrlData(condensedData));

  return <></>;
}

// const condenseEmojiUrlData = (urls) => {
//   const prefixes = [];

//   const suffixes = [];

//   [urls]
//     .filter(Boolean)
//     .flat()
//     .forEach((url) => {
//       const segments = url.split("/");

//       const prefix = segments.slice(0, -1).join("/");

//       if (!prefixes.includes(prefix)) prefixes.push(prefix);

//       const prefixIndex = prefixes.indexOf(prefix);

//       suffixes.push([prefixIndex, segments[segments.length - 1]]);
//     });

//   const uniqueSuffixes = [...new Set(suffixes.map(JSON.stringify))].map(
//     JSON.parse,
//   );

//   return [prefixes, uniqueSuffixes];
// };

// const expandEmojiUrlData = ([a, b]) =>
//   b.map(([i, suffix]) => [a[i], suffix].join("/"));
