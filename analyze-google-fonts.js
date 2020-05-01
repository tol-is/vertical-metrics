const fs = require('fs');

const fontkit = require('fontkit');

const googleFonts = require('./fonts.json');

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
  const font = fontkit.openSync(file);
  return font;
};

const analyze = async () => {
  const fonts = [];
  await asyncForEach(googleFonts, async (webfont) => {
    const fileKeys = Object.keys(webfont.files);
    await asyncForEach(fileKeys, async (key) => {
      const font = await analyzeFontSync(webfont.files[key]);

      const os2 = font['OS/2'];
      const family = get(
        font,
        'name.records.preferredFamily.en',
        font.familyName
      );

      const res = {
        file: webfont.files[key],
        family: family,
        weight: os2.usWeightClass,
        italic: os2.fsSelection.italic,
        upm: font.unitsPerEm,
        xHeight: font.xHeight,
        capHeight: font.capHeight,
        ascender: font.ascent,
        descender: font.descent,
        useTypoMetrics: os2.fsSelection.useTypoMetrics,
        typoAscender: os2.typoAscender,
        typoDescender: os2.typoDescender,
        typoLineGap: os2.typoLineGap,
        winAscent: os2.winAscent,
        winDescent: os2.winDescent,
        hheaAscender: font.hhea.ascent,
        hheaDescender: font.hhea.descent,
        hheaLineGap: font.hhea.hheaLineGap,
        winAscentDif: font.ascent !== os2.winAscent,
        winDescentDif: font.descent !== os2.winAscent,
        hheaAscentDif: font.ascent !== font.hhea.ascent,
        hheaDescentDif: font.descent !== font.hhea.descent,
        typoAscentDif: font.ascent !== os2.typoAscender,
        typeDescentDif: font.descent !== os2.typoAscender,
      };

      fonts.push(res);
    });
  });

  let json = JSON.stringify(fonts, null, 4);
  fs.writeFileSync('results.json', json);

  return fonts;
};

const fonts = analyze();

// console.log(fonts);
