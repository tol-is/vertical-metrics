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

    await asyncForEach(fileKeys, async (key) => {
      fonts.push({
        family: webfont.family,
        file: webfont.files[key],
        key: key,
      });
    });
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
    fs.writeFileSync('./src/fonts.json', json);
  });
