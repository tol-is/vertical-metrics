import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { css, cx } from 'emotion';

import FontContext from './FontContext';
import TextBaseline from './TextBaseline';
import Text from './Text';
import TextMetrics from './TextMetrics';

import './main.css';

let h2 = css`
  font-size: 24px;
  margin: 0 0 1em 0;
  @media (min-width: 60rem) {
    font-size: 30px;
  }
`;

let h3 = css`
  font-size: 20px;
  margin: 1em 0 1em 0;
  @media (min-width: 60rem) {
    font-size: 22px;
  }
`;

let h2_alt = css`
  font-size: 20px;
  margin: 0em 0 2em 0;
  @media (min-width: 60rem) {
    font-size: 22px;
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
      <main>
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
            <h2 className={h2_alt}>{metrics ? 'Hhea' : 'Hhea'}</h2>
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
            <h2 className={h2_alt}>{metrics ? 'usWin' : 'usWin'}</h2>
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
            <h2 className={h2_alt}>{metrics ? 'OS/2' : 'OS/2'}</h2>
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

        <section
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
              <th colSpan={2}>usWin Metrics</th>
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
              <th colSpan={2}>OS/2 Metrics</th>
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
        </section>

        <section
          className={css`
            margin-top: 104px;
            max-width: 55ch;
          `}
        >
          <h2 className={h2}>Wtf</h2>
          <p>
            Vertical metrics determine the baseline in a text and the space
            between lines of text. For historical reasons, there are three pairs
            of ascender/descender values, known as hhea, OS/2 and uSWin metrics.
            Depending on the font, operating system and application a different
            set will be used to render text on the screen. This test is about
            the browser.
          </p>
          <h3 className={h3}>Mac</h3>
          <p>
            On the Mac, Safari and Chrome use the hhea values to render text.
            Firefox will respect the useTypoMetrics setting and will use the
            OS/2 if it is set. If the useTypoMetrics is not set, Firefox will
            also use metrics from the hhea table.
          </p>

          <h3 className={h3}>Windows</h3>
          <p>
            On Windows, all browsers use the usWin metrics, but respect the
            useTypoMetrics setting and if set will use the OS/2 values.
          </p>
        </section>
      </main>

      <footer
        className={css`
          width: 100%;
          margin-top: 40px;
          margin-right: 10px;
          text-align: right;
          font-size: 14px;
          & > * {
            color: #fd62ff;
            margin-right: 20px;
          }
          @media (min-width: 80rem) {
            margin-top: 0px;
          }
        `}
      >
        <a
          className={css`
            display: inline;
            color: #fd62ff;
          `}
          href="https://github.com/a7sc11u"
        >
          A7SC11U
        </a>
      </footer>
    </div>
  );
};
