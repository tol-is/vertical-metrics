const fs = require('fs');

const fontkit = require('fontkit');

const googleFonts = require('./src/fonts.json');

// based on https://github.com/developit/dlv
const get = (obj, key, def) => {
  key = key && key.split ? key.split('.') : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : def;
  }

  if (typeof obj === 'string') {
    return obj;
  }
  return def;
};

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const analyzeFontSync = (file) => {
  console.log(file);
  const font = fontkit.openSync(file);
  return font;
};

const analyze = async () => {
  const fonts = [];
  await asyncForEach(googleFonts, async (webfont) => {
    const font = await analyzeFontSync(webfont.local);

    const os2 = font['OS/2'];
    const family = get(
      font,
      'name.records.preferredFamily.en',
      font.familyName
    );

    const res = {
      family: family,
      weight: os2.usWeightClass,
      italic: os2.fsSelection.italic,
      upm: font.unitsPerEm,
      xHeight: font.xHeight,
      capHeight: font.capHeight,
      useTypoMetrics: os2.fsSelection.useTypoMetrics,
      hheaAscender: font.hhea.ascent,
      typoAscender: os2.typoAscender,
      winAscent: os2.winAscent,
      winAscentDif: font.hhea.ascent - os2.winAscent,
      hheaAscentDif: font.hhea.ascent - font.hhea.ascent,
      typoAscentDif: font.hhea.ascent - os2.typoAscender,
      hheaDescender: font.hhea.descent,
      typoDescender: os2.typoDescender,
      winDescent: os2.winDescent,
      winDescentDif: font.hhea.descent - os2.winDescent,
      hheaDescentDif: font.hhea.descent - font.hhea.descent,
      typoDescentDif: font.hhea.descent - os2.typoDescender,
    };

    fonts.push(res);
  });

  let json = JSON.stringify(fonts, null, 4);
  fs.writeFileSync('results.json', json);

  return fonts;
};

const fonts = analyze();

// console.log(fonts);
