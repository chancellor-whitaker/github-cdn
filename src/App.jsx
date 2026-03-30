// import { cdn } from "https://cdn.jsdelivr.net/gh/chancellor-whitaker/github-cdn@latest/static/my-lib.js";

import downloadZipFromUrls from "../lib/js/emojipedia/downloadZipFromUrls";
import useData from "./hooks/useData";

const vendor = "whatsapp";

export default function App() {
  const data = useData(`lib/json/emojipedia/${vendor}.json`);

  return (
    <>
      <button onClick={() => downloadZipFromUrls(data)}>Click me</button>
    </>
  );
}
