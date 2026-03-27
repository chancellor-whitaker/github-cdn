export default function convertEmojipediaNetworkDataToSourceUrls(data) {
  const urls = !data ? [] : data.log.entries.map((e) => e.request.url);

  const webpUrls = urls.filter(
    (url) =>
      url.endsWith(".webp") &&
      url.startsWith("https://em-content.zobj.net/thumbs/60"),
  );

  const pngUrls = webpUrls.map((url) =>
    url.replace("thumbs/60", "source").replace(".webp", ".png"),
  );

  return [...new Set(pngUrls)];
}
