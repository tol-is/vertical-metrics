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
  const capSize = capHeightRatio * fontSize;

  // content box / round up baseline unit
  const typeRows = Math.ceil(capSize / baseline);
  const typeHeight = typeRows * baseline;

  // round leading
  const leadingRound = Math.round(leading);
  // if negative min value is typeRows
  const leadingValue =
    leadingRound < 0
      ? Math.min(Math.abs(leadingRound), typeRows) * -1
      : leadingRound;

  // leading height in px
  const leadingHeight = leadingValue * baseline;

  // line-height in px
  const lineHeight = typeHeight + leadingHeight;

  // crop white space top
  const negativeSpace = lineHeight - typeHeight;
  const cropHeight = negativeSpace - (negativeSpace % baseline);

  // align to baseline
  const boundingBoxHeight =
    ((font.ascent + Math.abs(font.descent)) / font.unitsPerEm) * fontSize;
  const descendHeight = Math.abs(font.descent / font.unitsPerEm) * fontSize;
  const whiteSpaceHalf = (boundingBoxHeight - lineHeight) / 2;
  const baselineOffset = -1 * (whiteSpaceHalf - descendHeight);

  return (
    <span
      className={css`
          display: inline-block;
          vertical-align: baseline;
          position: relative;
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
  );
};
