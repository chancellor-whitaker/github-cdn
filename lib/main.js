import extractNetworkPngUrls from "./emojipedia/js/extractNetworkPngUrls";
import downloadZipFromUrls from "./emojipedia/js/downloadZipFromUrls";

const sum = (numbers) =>
  numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

const _ = {
  emojipedia: {
    js: {
      extractNetworkPngUrls,
      downloadZipFromUrls,
    },
  },
  math: { sum },
};

export { _ };
