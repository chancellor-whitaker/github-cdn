export default async function getAllUrlsFromPages(pageUrls, options = {}) {
  const {
    proxyBase = "https://proxy.williesleepy.workers.dev",
    includeDataSrc = true,
    includeSrcset = true,

    concurrency = 5,
    // 👇 NEW: proxy support
    useProxy = true,
  } = options;

  const allUrls = new Set();

  async function runWithLimit(tasks, limit) {
    let active = 0,
      i = 0;

    return new Promise((resolve) => {
      function next() {
        if (i === tasks.length && active === 0) {
          return resolve();
        }

        while (active < limit && i < tasks.length) {
          const task = tasks[i++];
          active++;

          task()
            .catch((err) => {
              console.error("Task failed:", err);
            })
            .finally(() => {
              active--;
              next();
            });
        }
      }

      next();
    });
  }

  async function extractFromPage(url) {
    try {
      const finalUrl = useProxy
        ? `${proxyBase}?url=${encodeURIComponent(url)}`
        : url;

      const res = await fetch(finalUrl);

      if (!res.ok) {
        throw new Error(`Failed to fetch page: ${res.status}`);
      }

      const html = await res.text();

      const doc = new DOMParser().parseFromString(html, "text/html");

      const baseTag = doc.querySelector("base");
      const baseUrl = baseTag?.href || url;

      const urls = new Set();

      function addUrl(value) {
        if (
          !value ||
          value.startsWith("javascript:") ||
          value.startsWith("mailto:") ||
          value.startsWith("data:")
        ) {
          return;
        }

        try {
          const absoluteUrl = new URL(value, baseUrl).href;
          urls.add(absoluteUrl);
        } catch {}
      }

      // Core attributes
      ["href", "src"].forEach((attr) => {
        doc.querySelectorAll(`[${attr}]`).forEach((el) => {
          addUrl(el.getAttribute(attr));
        });
      });

      // Optional: data-src
      if (includeDataSrc) {
        doc.querySelectorAll("[data-src]").forEach((el) => {
          addUrl(el.getAttribute("data-src"));
        });
      }

      // Optional: srcset
      if (includeSrcset) {
        doc.querySelectorAll("[srcset]").forEach((el) => {
          const value = el.getAttribute("srcset");

          if (!value) return;

          value.split(",").forEach((part) => {
            const urlPart = part.trim().split(" ")[0];
            addUrl(urlPart);
          });
        });
      }

      return urls;
    } catch (err) {
      console.error("Failed to extract URLs from:", url, err);
      return new Set();
    }
  }

  const tasks = pageUrls.map((url) => async () => {
    const urls = await extractFromPage(url);

    urls.forEach((u) => allUrls.add(u));
  });

  await runWithLimit(tasks, concurrency);

  return Array.from(allUrls);
}
