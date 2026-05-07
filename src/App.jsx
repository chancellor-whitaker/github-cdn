// import useData from "./hooks/useData";
import { _ } from "../build/my-lib";

const {
  js: { getAllUrlsFromPages, downloadZipFromUrls },
} = _;

const pages = [
  "https://www.smashbros.com/en_US/",
  "https://www.smashbros.com/en_US/about/index.html",
  "https://www.smashbros.com/en_US/fighter/index.html",
  "https://www.smashbros.com/en_US/howtoplay/index.html",
  "https://www.smashbros.com/en_US/stage/index.html",
  "https://www.smashbros.com/en_US/item/index.html",
  "https://www.smashbros.com/en_US/sound/index.html",
];

const res = await getAllUrlsFromPages(pages);

console.log(res);

export default function App() {
  // const data = useData(`lib/smash-bros/json/attacks.json`);

  return (
    <>
      {/* <button onClick={() => downloadZipFromUrls(data)}>Click me</button> */}
    </>
  );
}

// const pages = [
//   "https://dragdown.wiki/wiki/SSBU/Mario",
//   "https://dragdown.wiki/wiki/SSBU/Donkey_Kong",
//   "https://dragdown.wiki/wiki/SSBU/Link",
//   "https://dragdown.wiki/wiki/SSBU/Samus",
//   "https://dragdown.wiki/wiki/SSBU/Dark_Samus",
//   "https://dragdown.wiki/wiki/SSBU/Yoshi",
//   "https://dragdown.wiki/wiki/SSBU/Kirby",
//   "https://dragdown.wiki/wiki/SSBU/Fox",
//   "https://dragdown.wiki/wiki/SSBU/Pikachu",
//   "https://dragdown.wiki/wiki/SSBU/Luigi",
//   "https://dragdown.wiki/wiki/SSBU/Ness",
//   "https://dragdown.wiki/wiki/SSBU/Captain_Falcon",
//   "https://dragdown.wiki/wiki/SSBU/Jigglypuff",
//   "https://dragdown.wiki/wiki/SSBU/Peach",
//   "https://dragdown.wiki/wiki/SSBU/Daisy",
//   "https://dragdown.wiki/wiki/SSBU/Bowser",
//   "https://dragdown.wiki/wiki/SSBU/Ice_Climbers",
//   "https://dragdown.wiki/wiki/SSBU/Sheik",
//   "https://dragdown.wiki/wiki/SSBU/Zelda",
//   "https://dragdown.wiki/wiki/SSBU/Dr._Mario",
//   "https://dragdown.wiki/wiki/SSBU/Pichu",
//   "https://dragdown.wiki/wiki/SSBU/Falco",
//   "https://dragdown.wiki/wiki/SSBU/Marth",
//   "https://dragdown.wiki/wiki/SSBU/Lucina",
//   "https://dragdown.wiki/wiki/SSBU/Young_Link",
//   "https://dragdown.wiki/wiki/SSBU/Ganondorf",
//   "https://dragdown.wiki/wiki/SSBU/Mewtwo",
//   "https://dragdown.wiki/wiki/SSBU/Roy",
//   "https://dragdown.wiki/wiki/SSBU/Chrom",
//   "https://dragdown.wiki/wiki/SSBU/Mr._Game_%26_Watch",
//   "https://dragdown.wiki/wiki/SSBU/Meta_Knight",
//   "https://dragdown.wiki/wiki/SSBU/Pit",
//   "https://dragdown.wiki/wiki/SSBU/Dark_Pit",
//   "https://dragdown.wiki/wiki/SSBU/Zero_Suit_Samus",
//   "https://dragdown.wiki/wiki/SSBU/Wario",
//   "https://dragdown.wiki/wiki/SSBU/Snake",
//   "https://dragdown.wiki/wiki/SSBU/Ike",
//   "https://dragdown.wiki/wiki/SSBU/Pokemon_Trainer",
//   "https://dragdown.wiki/wiki/SSBU/Diddy_Kong",
//   "https://dragdown.wiki/wiki/SSBU/Lucas",
//   "https://dragdown.wiki/wiki/SSBU/Sonic",
//   "https://dragdown.wiki/wiki/SSBU/King_Dedede",
//   "https://dragdown.wiki/wiki/SSBU/Olimar",
//   "https://dragdown.wiki/wiki/SSBU/Lucario",
//   "https://dragdown.wiki/wiki/SSBU/R.O.B.",
//   "https://dragdown.wiki/wiki/SSBU/Toon_Link",
//   "https://dragdown.wiki/wiki/SSBU/Wolf",
//   "https://dragdown.wiki/wiki/SSBU/Villager",
//   "https://dragdown.wiki/wiki/SSBU/Mega_Man",
//   "https://dragdown.wiki/wiki/SSBU/Wii_Fit_Trainer",
//   "https://dragdown.wiki/wiki/SSBU/Rosalina_%26_Luma",
//   "https://dragdown.wiki/wiki/SSBU/Little_Mac",
//   "https://dragdown.wiki/wiki/SSBU/Greninja",
//   "https://dragdown.wiki/wiki/SSBU/Palutena",
//   "https://dragdown.wiki/wiki/SSBU/Pac-Man",
//   "https://dragdown.wiki/wiki/SSBU/Robin",
//   "https://dragdown.wiki/wiki/SSBU/Shulk",
//   "https://dragdown.wiki/wiki/SSBU/Bowser_Jr.",
//   "https://dragdown.wiki/wiki/SSBU/Duck_Hunt",
//   "https://dragdown.wiki/wiki/SSBU/Ryu",
//   "https://dragdown.wiki/wiki/SSBU/Ken",
//   "https://dragdown.wiki/wiki/SSBU/Cloud",
//   "https://dragdown.wiki/wiki/SSBU/Corrin",
//   "https://dragdown.wiki/wiki/SSBU/Bayonetta",
//   "https://dragdown.wiki/wiki/SSBU/Inkling",
//   "https://dragdown.wiki/wiki/SSBU/Ridley",
//   "https://dragdown.wiki/wiki/SSBU/Simon",
//   "https://dragdown.wiki/wiki/SSBU/Richter",
//   "https://dragdown.wiki/wiki/SSBU/King_K._Rool",
//   "https://dragdown.wiki/wiki/SSBU/Isabelle",
//   "https://dragdown.wiki/wiki/SSBU/Incineroar",
//   "https://dragdown.wiki/wiki/SSBU/Piranha_Plant",
//   "https://dragdown.wiki/wiki/SSBU/Joker",
//   "https://dragdown.wiki/wiki/SSBU/Hero",
//   "https://dragdown.wiki/wiki/SSBU/Banjo_%26_Kazooie",
//   "https://dragdown.wiki/wiki/SSBU/Terry",
//   "https://dragdown.wiki/wiki/SSBU/Byleth",
//   "https://dragdown.wiki/wiki/SSBU/Min_Min",
//   "https://dragdown.wiki/wiki/SSBU/Steve",
//   "https://dragdown.wiki/wiki/SSBU/Sephiroth",
//   "https://dragdown.wiki/wiki/SSBU/Pyra_%26_Mythra",
//   "https://dragdown.wiki/wiki/SSBU/Kazuya",
//   "https://dragdown.wiki/wiki/SSBU/Sora",
//   "https://dragdown.wiki/wiki/SSBU/Mii_Brawler",
//   "https://dragdown.wiki/wiki/SSBU/Mii_Swordfighter",
//   "https://dragdown.wiki/wiki/SSBU/Mii_Gunner",
// ];
