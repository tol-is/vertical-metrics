import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import fontkit from 'fontkit';
import { useRoute } from 'wouter-preact';
import blobToBuffer from 'blob-to-buffer';

import FontContext from './FontContext';

import Dropdown from './Dropdown';
import Slider from './Slider';
import Switch from './Switch';

import fonts from './fonts.json';

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
    metrics,
    setMetrics,
    leading,
    setLeading,
    baseline,
    setBaseline,
  } = useContext(FontContext);

  const [match, params] = useRoute('/:idx');
  const { idx = 0 } = params || {};

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
          top: 16px;
          z-index: 999;
          background-color: rgba(255, 255, 255, 0.9);
          width: 100%;
          padding: 0 20px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-column-gap: 20px;
          grid-row-gap: 20px;
          @media (min-width: 60rem) {
            top: 32px;
            padding: 0 64px;
            grid-column-gap: 64px;
            grid-template-columns: repeat(17, minmax(0, 1fr));
          }
        `}
      >
        <div
          className={css`
            grid-column: span 1;
            align-self: center;
            @media (min-width: 60rem) {
              grid-column: span 2;
            }
          `}
        >
          <h3 className={h3}>Baseline Grid/Metrics</h3>
          <div
            className={css`
              height: 48px;
            `}
          >
            <Switch
              checked={metrics}
              onInput={(e) => {
                setMetrics(e.target.checked);
              }}
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
          <h3 className={h3}>Font</h3>
          <Dropdown
            selected={`${fonts[idx].family} - ${fonts[idx].key}`}
            options={fonts}
          />
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

        {metrics && (
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
        )}
        {!metrics && (
          <div
            className={css`
              grid-column: span 1;
              align-self: center;
              @media (min-width: 60rem) {
                grid-column: span 3;
              }
            `}
          >
            <h3 className={h3}>Leading: {`${leading}`}</h3>
            <div
              className={css`
                height: 48px;
                display: flex;
                align-items: center;
              `}
            >
              <Slider
                min={0}
                max={10}
                step={1}
                value={leading}
                onInput={(e) => setLeading(e.target.value)}
              />
            </div>
          </div>
        )}

        {!metrics && (
          <div
            className={css`
              grid-column: span 1;
              align-self: center;
              @media (min-width: 60rem) {
                grid-column: span 3;
              }
            `}
          >
            <h3 className={h3}>Baseline: {`${baseline}`}</h3>
            <div
              className={css`
                height: 48px;
                display: flex;
                align-items: center;
              `}
            >
              <Slider
                min={2}
                max={80}
                step={1}
                value={baseline}
                onInput={(e) => setBaseline(e.target.value)}
              />
            </div>
          </div>
        )}
      </header>
    )
  );
};
