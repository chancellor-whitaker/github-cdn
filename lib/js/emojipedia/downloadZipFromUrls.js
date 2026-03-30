import JSZip from "jszip";

export default async function downloadZipFromUrls(urls, options = {}) {
  const { zipName = "download.zip", concurrency = 5 } = options;

  const zip = new JSZip();

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
    const buffer = await res.arrayBuffer();

    const filename = url.split("/").pop() || `file_${i}.png`;
    zip.file(filename, buffer);
  });

  await runWithLimit(tasks, concurrency);

  const blob = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = zipName;
  a.click();
}
