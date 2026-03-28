export default function expandUrls([a, b]) {
  return b.map(([i, suffix]) => [a[i], suffix].join("/"));
}
