//#region lib/js/emojipedia/convertNetworkDataToUrls.js
function e(e) {
	let t = (e ? e.log.entries.map((e) => e.request.url) : []).filter((e) => e.endsWith(".webp") && e.startsWith("https://em-content.zobj.net/thumbs/60")).map((e) => e.replace("thumbs/60", "source").replace(".webp", ".png"));
	return [...new Set(t)];
}
//#endregion
//#region lib/js/emojipedia/condenseUrls.js
function t(e) {
	let t = [], n = [];
	return [e].filter(Boolean).flat().forEach((e) => {
		let r = e.split("/"), i = r.slice(0, -1).join("/");
		t.includes(i) || t.push(i);
		let a = t.indexOf(i);
		n.push([a, r[r.length - 1]]);
	}), [t, [...new Set(n.map(JSON.stringify))].map(JSON.parse)];
}
//#endregion
//#region lib/js/emojipedia/expandUrls.js
function n([e, t]) {
	return t.map(([t, n]) => [e[t], n].join("/"));
}
//#endregion
//#region lib/main.js
var r = { js: { emojipedia: {
	convertNetworkDataToUrls: e,
	condenseUrls: t,
	expandUrls: n
} } };
//#endregion
export { r as cdn };
