import { js } from "https://cdn.jsdelivr.net/gh/chancellor-whitaker/github-cdn@master/static/my-lib.js";
import useData from "./hooks/useData";

// console.log(js);

export default function App() {
  const data = useData("emojipedia.org.json");

  const urls = js.functions.convertEmojipediaNetworkDataToSourceUrls(data);

  console.log(urls);

  return <></>;
}
