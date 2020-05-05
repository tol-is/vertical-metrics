import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { css, cx } from 'emotion';

import FontContext from './FontContext';
import TextBaseline from './TextBaseline';
import Text from './Text';
import TextMetrics from './TextMetrics';

import './main.css';

let h2 = css`
  font-size: 20px;
  margin: 0 0 1em 0;
  @media (min-width: 60rem) {
    font-size: 24px;
  }
`;

export default () => {
  const { font, text, fontSize, lineHeight, leading, metrics } = useContext(
    FontContext
  );

  if (!font) return null;
  return (
    <div
      className={css`
        padding: 200px 20px 80px 20px;
        @media (min-width: 60rem) {
          padding: 240px 64px 80px 64px;
        }
      `}
    >
      <div>
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            grid-column-gap: 20px;
            grid-row-gap: 120px;
            @media (min-width: 60rem) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-column-gap: 64px;
              grid-row-gap: 240px;
            }
          `}
        >
          {/* <section
          className={css`
            grid-column: span 2;
          `}
        >
          <h2 className={h2}>Native: line-height:1</h2>
          <div
            className={css`
              border-top: 1px solid rgba(0, 0, 0, 0.4);
              border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            `}
          >
            <Text fontSize={fontSize} lineHeight={lineHeight}>
              {text}
            </Text>
          </div>
        </section> */}
          {/* <section
          className={css`
            grid-column: 1 / span 1;
          `}
        >
          <h2 className={h2}>HHEA Metrics</h2>
          <div>
            <TextMetrics fontSize={fontSize} lineHeight={lineHeight} use="hhea">
              {text}
            </TextMetrics>
          </div>
        </section> */}
          <section
            className={css`
              grid-column: span 1;
            `}
          >
            <h2 className={h2}>
              {metrics
                ? 'Horizontal Header Table'
                : 'Baseline Horizontal Header Table'}
            </h2>
            {metrics ? (
              <TextMetrics
                fontSize={fontSize}
                lineHeight={lineHeight}
                use="hhea"
              >
                {text}
              </TextMetrics>
            ) : (
              <TextBaseline fontSize={fontSize} leading={leading} use="hhea">
                {text}
              </TextBaseline>
            )}
          </section>

          {/* <section
          className={css`
            grid-column: 1 / span 1;
          `}
        >
          <h2 className={h2}>Win metrics</h2>
          <div>
            <TextMetrics fontSize={fontSize} lineHeight={lineHeight} use="win">
              {text}
            </TextMetrics>
          </div>
        </section> */}

          <section
            className={css`
              grid-column: span 1;
            `}
          >
            <h2 className={h2}>
              {metrics ? 'Win Metrics' : 'Baseline Win Metrics'}
            </h2>
            {metrics ? (
              <TextMetrics
                fontSize={fontSize}
                lineHeight={lineHeight}
                use="win"
              >
                {text}
              </TextMetrics>
            ) : (
              <TextBaseline fontSize={fontSize} leading={leading} use="win">
                {text}
              </TextBaseline>
            )}
          </section>

          {/* <section
          className={css`
            grid-column: 1 / span 1;
          `}
        >
          <h2 className={h2}>OS/2 typo metrics</h2>
          <div>
            <TextMetrics fontSize={fontSize} lineHeight={lineHeight} use="typo">
              {text}
            </TextMetrics>
          </div>
        </section> */}
          <section
            className={css`
              grid-column: span 1;
            `}
          >
            <h2 className={h2}>
              {metrics ? 'Typo Metrics' : 'Baseline Typo Metrics'}
            </h2>
            {metrics ? (
              <TextMetrics
                fontSize={fontSize}
                lineHeight={lineHeight}
                use="typo"
              >
                {text}
              </TextMetrics>
            ) : (
              <TextBaseline fontSize={fontSize} leading={leading} use={'typo'}>
                {text}
              </TextBaseline>
            )}
          </section>
        </div>

        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: 180px;
            grid-column-gap: 20px;
            margin-top: 100px;
            @media (min-width: 60rem) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 80rem) {
              margin-top: 120px;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              grid-column-gap: 64px;
            }
            & > * {
              align-self: flex-end;
            }
          `}
        >
          <table>
            <tr>
              <th colSpan={2}>Horizontal Header Table</th>
            </tr>
            <tr>
              <td>ascender</td>
              <td>{font.hhea.ascent}</td>
            </tr>
            <tr>
              <td>descender</td>
              <td>{font.hhea.descent}</td>
            </tr>
          </table>
          <table>
            <tr>
              <th colSpan={2}>Win Metrics</th>
            </tr>
            <tr>
              <td>ascender</td>
              <td>{font['OS/2'].winAscent}</td>
            </tr>
            <tr>
              <td>descender</td>
              <td>{font['OS/2'].winDescent}</td>
            </tr>
          </table>
          <table>
            <tr>
              <th colSpan={2}>Typo Metrics</th>
            </tr>
            <tr>
              <td>ascender</td>
              <td>{font['OS/2'].typoAscender}</td>
            </tr>
            <tr>
              <td>descender</td>
              <td>{font['OS/2'].typoDescender}</td>
            </tr>
          </table>
          <table>
            <tr>
              <th colSpan={2}>&nbsp;</th>
            </tr>
            <tr>
              <td>Units Per Em</td>
              <td> {font.unitsPerEm}</td>
            </tr>
            <tr>
              <td>
                <b>Use Typo Metrics</b>
              </td>
              <td>
                <b>
                  {font['OS/2'].fsSelection.useTypoMetrics ? 'true' : 'false'}
                </b>
              </td>
            </tr>
          </table>
          <table>
            <th colSpan={2}>&nbsp;</th>
            <tr>
              <td>Weight </td>
              <td>{font['OS/2'].usWeightClass}</td>
            </tr>
            <tr>
              <td>Italic</td>
              <td> {font['OS/2'].fsSelection.italic ? 'true' : 'false'}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th colSpan={2}>&nbsp;</th>
            </tr>
            <tr>
              <td>Cap Height </td>
              <td>{font.capHeight}</td>
            </tr>
            <tr>
              <td>X Height</td>
              <td> {font.xHeight}</td>
            </tr>
          </table>
        </div>
      </div>
      <footer
        className={css`
          width: 100%;
          margin-top: 100px;
          text-align: right;
        `}
      >
        <a
          className={css`
            display: inline;
          `}
          href="https://a7sc11u.dev"
        >
          A7SC11U
        </a>
      </footer>
    </div>
  );
};
