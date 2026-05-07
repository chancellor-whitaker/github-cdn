import JSZip from "jszip";

export default async function downloadHtmlFromUrls(urls, options = {}) {
  const { zipName = "pages.zip", concurrency = 5 } = options;

  const zip = new JSZip();
  const usedNames = new Map();

  function getUniqueName(originalName, index) {
    let name = originalName || `file_${index}.html`;

    if (!usedNames.has(name)) {
      usedNames.set(name, 0);
      return name;
    }

    const base = name.replace(/\.html$/, "");
    let count = usedNames.get(name) + 1;
    let newName;

    do {
      newName = `${base} (${count}).html`;
      count++;
    } while (usedNames.has(newName));

    usedNames.set(name, count - 1);
    usedNames.set(newName, 0);

    return newName;
  }

  function filenameFromUrl(url, index) {
    try {
      const { hostname, pathname } = new URL(url);

      let name;

      if (hostname.endsWith(".com")) {
        name = pathname.replace(/^\/+/, "").replace(/\//g, "-");
      } else {
        name = pathname.split("/").pop();
      }

      if (!name) name = `file_${index}`;

      // Ensure .html extension
      if (!name.endsWith(".html")) {
        name += ".html";
      }

      return name;
    } catch {
      return `file_${index}.html`;
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
    const res = await fetch(url);

    // Optional safety check
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      // Skip non-HTML responses
      return;
    }

    const html = await res.text();

    const rawName = filenameFromUrl(url, i);
    const filename = getUniqueName(rawName, i);

    zip.file(filename, html);
  });

  await runWithLimit(tasks, concurrency);

  const blob = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = zipName;
  a.click();
}
