import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';
import FontContext from './FontContext';

const preventCollapse = 1;

const Grid = ({ children }) => {
  const { baseline } = useContext(FontContext);

  let grid = css`
    display:block;
    position: relative;
    background-repeat: repeat;
    background-osition: center bottom;
    background-size: 100% ${baseline * 2}px;
    background-image: linear-gradient(
    to bottom,
    rgba(255, 0, 255, 0.2) ${baseline}px,
    transparent ${baseline}px
    );
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      background-color: rgba(255, 0, 255, 0.2);
    },
  `;

  return <div className={grid}>{children}</div>;
};

export default ({ children, fontSize, leading = 0, use = 'hhea' }) => {
  const { font, baseline } = useContext(FontContext);

  let { familyName, unitsPerEm, capHeight, ascent, descent } = font;

  if (use === 'win') {
    ascent = font['OS/2'].winAscent;
    descent = font['OS/2'].winDescent * -1;
  }

  if (use === 'typo') {
    ascent = font['OS/2'].typoAscender;
    descent = font['OS/2'].typoDescender;
  }

  // cap height
  const capHeightRatio = capHeight / unitsPerEm;
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
    ((ascent + Math.abs(descent)) / unitsPerEm) * fontSize;
  const descendHeight = Math.abs(descent / unitsPerEm) * fontSize;
  const whiteSpaceHalf = (boundingBoxHeight - lineHeight) / 2;
  const baselineOffset = -1 * (whiteSpaceHalf - descendHeight);

  return (
    <Grid>
      <span
        className={css`
          display: block;
          position: relative;
          font-family: '${familyName}';
          font-weight: ${font['OS/2'].usWeightClass};
          font-size: ${fontSize}px;
          line-height: ${lineHeight}px;
          transform: translateY(${baselineOffset}px);
          padding-top: ${preventCollapse}px;
          word-break: break-all;
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
    </Grid>
  );
};
