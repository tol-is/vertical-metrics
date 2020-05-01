import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';
import FontContext from './FontContext';

const baseline = 8;
const preventCollapse = 1;

export default ({ children, fontSize, leading = 0 }) => {
  const { font } = useContext(FontContext);

  // cap height
  const capHeightRatio = font.capHeight / font.unitsPerEm;
  const typeHeight = capHeightRatio * fontSize;

  //
  const typesRows = Math.floor(typeHeight / baseline);

  // round leading
  const leadingRound = Math.round(leading);
  // if negative min value is typeRows
  const leadingValue =
    leadingRound < 0
      ? Math.min(Math.abs(leadingRound), typesRows) * -1
      : leadingRound;

  // leading height in px
  const leadingHeight = leadingValue * baseline;

  // line-height in px
  const lineHeight = typeHeight + leadingHeight;

  // crop white space top
  const negativeSpace = lineHeight - typeHeight;
  const cropHeight = negativeSpace;

  // align to baseline
  const boundingBoxHeight =
    ((font.ascent + Math.abs(font.descent)) / font.unitsPerEm) * fontSize;
  const descendHeight = Math.abs(font.descent / font.unitsPerEm) * fontSize;
  const whiteSpaceHalf = (boundingBoxHeight - lineHeight) / 2;
  const baselineOffset = -1 * (whiteSpaceHalf - descendHeight);

  return (
    <div
      className={css`
        background-color: hsla(44, 100%, 50%, 0.5);
      `}
    >
      <span
        className={css`
          display: inline-block;
          vertical-align: bottom;
          position: relative;
          max-width: 20ch;
          font-family: '${font.familyName}';
          font-weight: ${font['OS/2'].usWeightClass};
          font-size: ${fontSize}px;
          line-height: ${lineHeight}px;
          transform: translateY(${baselineOffset}px);
          padding-top: ${preventCollapse}px;
          &:before {
            content: '';
            margin-top: ${-(cropHeight + preventCollapse)}px;
            display: block;
            height: 0;
          }
        `}
      >
        {children}
      </span>
    </div>
  );
};
