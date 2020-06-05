import { Component, h } from 'preact';
import { useContext, useEffect, useState, useMemo } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';
import { useRoute } from 'wouter-preact';
import blobToBuffer from 'blob-to-buffer';
import { createBrowserHistory } from 'history';

import FontContext from './FontContext';

import Slider from './Slider';
import Switch from './Switch';

import fonts from './fonts.json';

const history = createBrowserHistory();

let h3 = css`
  font-size: 14px;
  margin: 0 0 1em 0;
  @media (min-width: 60rem) {
    font-size: 18px;
  }
`;
export default () => {
  //
  const {
    font,
    setFont,
    text,
    setText,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    hhea,
    setHhea,
    win,
    setWin,
    typo,
    setTypo,
  } = useContext(FontContext);

  const [uploaded, setUploaded] = useState(false);

  const [match, params] = useRoute('/:idx');
  const { idx = -1 } = params || {};

  const googleFontIdx = useMemo(() => {
    if (uploaded) return idx;
    return idx === -1 ? 1147 : idx;
  }, [uploaded, idx]);

  useEffect(() => {
    if (uploaded) return;

    let file = fonts[googleFontIdx].file;

    if (file) {
      loadURL(file.replace('http:', 'https:'));
    }
  }, [idx]);

  const onFileSelect = (e) => {
    let file = e.target.files && e.target.files[0];
    if (file) {
      setUploaded(true);
      history.push('/');
      loadBlob(file);
    }
  };

  const onFontSelect = (e) => {
    setUploaded(false);
    history.push(`/${e.target.value}`);
  };

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

  return (
    font && (
      <header
        className={css`
          position: fixed;
          z-index: 999;
          background-color: rgba(255, 255, 255, 0.9);
          width: 100%;
          padding: 16px 20px 16px 20px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-column-gap: 20px;
          grid-row-gap: 20px;
          @media (min-width: 60rem) {
            padding: 32px 64px 32px 64px;
            grid-column-gap: 64px;
            grid-template-columns: repeat(18, minmax(0, 1fr));
          }
        `}
      >
        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 3;
            }
          `}
        >
          <div
            className={css`
              position: relative;
            `}
          >
            <h3 className={h3}>Upload</h3>
            <div
              className={css`
                height: 48px;
                display: flex;
                align-items: center;
                height: 48px;
              `}
            >
              {uploaded ? font.familyName : 'Font File'}
              <input
                type="file"
                onChange={onFileSelect}
                className={css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  opacity: 0;
                  display: block;
                  width: 100%;
                `}
              />
            </div>
          </div>
        </div>
        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 3;
            }
          `}
        >
          <h3 className={h3}>Google Fonts</h3>
          <div
            className={css`
              display: flex;
              align-items: center;
              height: 48px;
            `}
          >
            <select
              onChange={onFontSelect}
              className={css`
                width: 100%;
              `}
            >
              <option>Select</option>
              {fonts.map((f, i) => (
                <option value={i} selected={i == googleFontIdx}>
                  {f.family} - {f.key}
                </option>
              ))}
            </select>
          </div>
          {/* <Dropdown
            selected={`${fonts[idx].family} - ${fonts[idx].key}`}
            options={fonts}
          /> */}
        </div>

        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 3;
            }
          `}
        >
          <h3 className={h3}>Text</h3>
          <div
            className={css`
              height: 48px;
            `}
          >
            <input
              type="text"
              value={text}
              onInput={(e) => setText(e.target.value)}
              className={css`
                height: 48px;
                font-size: 20px;
                padding: 0 16px;
                line-height: 48px;
                border: 1px solid #000;
                width: 100%;
                &:hover,
                &:focus {
                  outline: none;
                  border: 1px solid #f78ae0;
                }
              `}
            />
          </div>
        </div>

        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 3;
            }
          `}
        >
          <h3 className={h3}>Font Size: {`${fontSize}px`}</h3>
          <div
            className={css`
              height: 48px;
              display: flex;
              align-items: center;
            `}
          >
            <Slider
              min={12}
              max={240}
              step={1}
              value={fontSize}
              onInput={(e) => setFontSize(e.target.value)}
            />
          </div>
        </div>

        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 3;
            }
          `}
        >
          <h3 className={h3}>Line Height: {`${lineHeight}`}</h3>
          <div
            className={css`
              height: 48px;
              display: flex;
              align-items: center;
            `}
          >
            <Slider
              min={0.5}
              max={3}
              step={0.1}
              value={lineHeight}
              onInput={(e) => setLineHeight(e.target.value)}
            />
          </div>
        </div>

        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 3;
            }
            display: flex;
            justify-content: space-between;
          `}
        >
          <div>
            <h3 className={h3}>Hhea</h3>
            <div
              className={css`
                height: 48px;
                display: flex;
                align-items: center;
              `}
            >
              <Switch
                checked={hhea}
                onInput={(e) => {
                  setHhea(e.target.checked);
                }}
              />
            </div>
          </div>
          <div>
            <h3 className={h3}>usWin</h3>
            <div
              className={css`
                height: 48px;
                display: flex;
                align-items: center;
              `}
            >
              <Switch
                checked={win}
                onInput={(e) => {
                  setWin(e.target.checked);
                }}
              />
            </div>
          </div>
          <div>
            <h3 className={h3}>OS/2</h3>
            <div
              className={css`
                height: 48px;
                display: flex;
                align-items: center;
              `}
            >
              <Switch
                checked={typo}
                onInput={(e) => {
                  setTypo(e.target.checked);
                }}
              />
            </div>
          </div>
        </div>
      </header>
    )
  );
};
