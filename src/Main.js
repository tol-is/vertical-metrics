import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { css, cx } from 'emotion';

import FontContext from './FontContext';
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
  margin: 2em 0 1em 0;
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
  const {
    font,
    text,
    fontSize,
    lineHeight,
    leading,
    metrics,
    hhea,
    typo,
    win,
  } = useContext(FontContext);

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
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-column-gap: 20px;
            grid-row-gap: 120px;
            @media (min-width: 60rem) {
              grid-column-gap: 64px;
              grid-row-gap: 240px;
            }
          `}
        >
          {hhea && (
            <section className={css``}>
              <h2 className={h2_alt}>{metrics ? 'Hhea' : 'Hhea'}</h2>
              <TextMetrics
                fontSize={fontSize}
                lineHeight={lineHeight}
                use="hhea"
              >
                {text}
              </TextMetrics>

              <table
                className={css`
                  margin-top: 96px;
                  width: 100%;
                `}
              >
                <tr>
                  <td>ascender</td>
                  <td>{font.hhea.ascent}</td>
                </tr>
                <tr>
                  <td>descender</td>
                  <td>{font.hhea.descent}</td>
                </tr>
              </table>
            </section>
          )}
          {win && (
            <section className={css``}>
              <h2 className={h2_alt}>{metrics ? 'usWin' : 'usWin'}</h2>

              <TextMetrics
                fontSize={fontSize}
                lineHeight={lineHeight}
                use="win"
              >
                {text}
              </TextMetrics>

              <table
                className={css`
                  margin-top: 96px;
                  width: 100%;
                `}
              >
                <tr>
                  <td>ascender</td>
                  <td>{font['OS/2'].winAscent}</td>
                </tr>
                <tr>
                  <td>descender</td>
                  <td>{font['OS/2'].winDescent}</td>
                </tr>
              </table>
            </section>
          )}

          {typo && (
            <section className={css``}>
              <h2 className={h2_alt}>{metrics ? 'OS/2' : 'OS/2'}</h2>

              <TextMetrics
                fontSize={fontSize}
                lineHeight={lineHeight}
                use="typo"
              >
                {text}
              </TextMetrics>

              <table
                className={css`
                  margin-top: 96px;
                  width: 100%;
                `}
              >
                <tr>
                  <td>ascender</td>
                  <td>{font['OS/2'].typoAscender}</td>
                </tr>
                <tr>
                  <td>descender</td>
                  <td>{font['OS/2'].typoDescender}</td>
                </tr>
              </table>
            </section>
          )}
        </div>

        <section
          className={css`
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-column-gap: 20px;
            @media (min-width: 60rem) {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
            @media (min-width: 80rem) {
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
            margin-top: 96px;
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
