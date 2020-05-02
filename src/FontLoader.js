import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';
import { useRoute } from 'wouter-preact';

import blobToBuffer from 'blob-to-buffer';

import FontContext from './FontContext';

import fonts from './fonts.json';

// 2860

export default () => {
  //
  const { setFont } = useContext(FontContext);
  // const [idx, setIdx] = useState(120);
  const [match, params] = useRoute('/:idx');

  const { idx = 0 } = params;

  useEffect(() => {
    let file = fonts[idx].file;

    console.log(idx, file);

    if (file) {
      loadURL(file.replace('http:', 'https:'));
    }
  }, [idx]);

  const loadURL = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then(loadBlob, console.error);
  };

  const loadBlob = (blob) => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        throw err;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        const font = fontkit.create(buffer);
        useFont({ fontData: reader.result, font });
      };
      reader.readAsDataURL(blob);
    });
  };

  const useFont = ({ fontData, font }) => {
    console.log(font);
    if (!font) return;
    setFont(font);

    injectGlobal`
      @font-face {
        font-family: '${font.familyName}';
        font-style: normal;
        font-weight: ${font['OS/2'].usWeightClass};
        src: url('${fontData}')
            format('opentype');
      }
    `;
  };

  return null;
};
