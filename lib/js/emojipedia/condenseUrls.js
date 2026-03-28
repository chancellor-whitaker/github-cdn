export default function condenseUrls(urls) {
  const prefixes = [];

  const suffixes = [];

  [urls]
    .filter(Boolean)
    .flat()
    .forEach((url) => {
      const segments = url.split("/");

      const prefix = segments.slice(0, -1).join("/");

      if (!prefixes.includes(prefix)) prefixes.push(prefix);

      const prefixIndex = prefixes.indexOf(prefix);

      suffixes.push([prefixIndex, segments[segments.length - 1]]);
    });

  const uniqueSuffixes = [...new Set(suffixes.map(JSON.stringify))].map(
    JSON.parse,
  );

  return [prefixes, uniqueSuffixes];
}
