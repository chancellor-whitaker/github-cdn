// import { _ } from "https://cdn.jsdelivr.net/gh/chancellor-whitaker/github-cdn@master/build/my-lib.js";

import { _ } from "https://spring-sky-8320.chancellor-whitaker.workers.dev/";

const { downloadZipFromUrls } = _;

console.log(_);

import useData from "./hooks/useData";

const vendor = "whatsapp";

export default function App() {
  const data = useData(`lib/emojipedia/json/${vendor}.json`);

  return (
    <>
      <button onClick={() => downloadZipFromUrls(data)}>Click me</button>
    </>
  );
}
