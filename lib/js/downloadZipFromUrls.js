import JSZip from "jszip";

export default async function downloadZipFromUrls(urls, options = {}) {
  const {
    proxyBase = "https://proxy.williesleepy.workers.dev",
    zipName = "download.zip",
    concurrency = 5,
    useProxy = true, // 👈 toggle proxy usage
  } = options;

  const zip = new JSZip();
  const usedNames = new Map();

  function getUniqueName(originalName, index) {
    let name = originalName || `file_${index}`;

    if (!usedNames.has(name)) {
      usedNames.set(name, 0);
      return name;
    }

    const extMatch = name.match(/(\.[^.]*)$/);
    const base = extMatch ? name.slice(0, -extMatch[1].length) : name;
    const ext = extMatch ? extMatch[1] : "";

    let count = usedNames.get(name) + 1;
    let newName;

    do {
      newName = `${base} (${count})${ext}`;
      count++;
    } while (usedNames.has(newName));

    usedNames.set(name, count - 1);
    usedNames.set(newName, 0);

    return newName;
  }

  function filenameFromUrl(url, index) {
    try {
      const { hostname, pathname } = new URL(url);

      let name = pathname.replace(/^\/+/, "").replace(/\//g, "-");

      // Ensure extension is preserved (important for Wikia-style URLs)
      const extMatch = pathname.match(
        /\.(png|jpg|jpeg|gif|webp|svg|mp4|webm|css|js)(?=\/|$)/i,
      );
      const ext = extMatch ? extMatch[0] : "";

      if (ext && !name.endsWith(ext)) {
        name += ext;
      }

      return name || `file_${index}${ext || ""}`;
    } catch {
      return `file_${index}`;
    }
  }

  async function runWithLimit(tasks, limit) {
    let active = 0,
      i = 0;

    return new Promise((resolve) => {
      function next() {
        if (i === tasks.length && active === 0) return resolve();

        while (active < limit && i < tasks.length) {
          const task = tasks[i++];
          active++;

          task()
            .catch(() => {})
            .finally(() => {
              active--;
              next();
            });
        }
      }
      next();
    });
  }

  const tasks = urls.map((url, i) => async () => {
    try {
      const finalUrl = useProxy
        ? `${proxyBase}?url=${encodeURIComponent(url)}`
        : url;

      const res = await fetch(finalUrl);

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      const buffer = await res.arrayBuffer();

      const rawName = filenameFromUrl(url, i); // 👈 use original URL for naming
      const filename = getUniqueName(rawName, i);

      zip.file(filename, buffer);
    } catch (err) {
      console.error("Download failed:", url, err);
    }
  });

  await runWithLimit(tasks, concurrency);

  const blob = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = zipName;
  a.click();
}
