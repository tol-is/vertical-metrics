const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');
const GOOGLE_FONTS_KEY = 'AIzaSyAPLksVreelN66UCRs9xiWND4TMR2QZkVE';

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const downloadFileAsync = async (url) => {
  let fontPromise = new Promise((resolve, reject) => {
    const urlArr = url.split('/');
    const localPath = `./public/fonts/${urlArr[urlArr.length - 1]}`;
    const file = fs.createWriteStream(localPath);
    http.get(url, function (response) {
      response.pipe(file);
      resolve(localPath);
    });
  });

  return fontPromise;
};

const downloadFonts = async (webfonts) => {
  const fonts = [];
  await asyncForEach(webfonts, async (webfont) => {
    const fileKeys = Object.keys(webfont.files);
    const localWf = {
      ...webfont,
      files: {},
    };
    await asyncForEach(fileKeys, async (key) => {
      const localFile = await downloadFileAsync(webfont.files[key]);
      localWf.files[key] = localFile;
    });
    fonts.push(localWf);
  });
  return fonts;
};

fetch(
  `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_KEY}&sort=popularity`
)
  .then((res) => res.json())
  .then((res) => downloadFonts(res.items))
  .then((fonts) => {
    let json = JSON.stringify(fonts, null, 4);
    fs.writeFileSync('fonts.json', json);
  });
