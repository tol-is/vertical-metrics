import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';
import FontContext from './FontContext';

import Guide from './Guide';

export default ({ children, fontSize, lineHeight = 1.2, use = 'hhea' }) => {
  const { font } = useContext(FontContext);

  let { capHeight, xHeight, ascent, descent, unitsPerEm } = font;

  if (use === 'win') {
    ascent = font['OS/2'].winAscent;
    descent = font['OS/2'].winDescent * -1;
  }

  if (use === 'typo') {
    ascent = font['OS/2'].typoAscender;
    descent = font['OS/2'].typoDescender;
  }

  const lineHeightRatio = lineHeight;
  const capHeightRatio = capHeight / unitsPerEm;
  const xHeightRatio = xHeight / unitsPerEm;
  const ascenderRatio = ascent / unitsPerEm;
  const descenderRatio = descent / unitsPerEm;
  const baselineRatio = descenderRatio * -1;
  const boundingBoxRatio = (ascent + Math.abs(descent)) / unitsPerEm;
  const lineGapRatio = lineHeightRatio - boundingBoxRatio;

  const originOffset = (lineGapRatio / 2) * fontSize;
  const baselineOffset = originOffset + baselineRatio * fontSize;
  const ascenderOffset = baselineOffset + ascenderRatio * fontSize;
  const capHeightOffset = baselineOffset + capHeightRatio * fontSize;
  const xHeightOffset = baselineOffset + xHeightRatio * fontSize;
  const descenderOffset = baselineOffset + descenderRatio * fontSize;

  return (
    <div
      className={css`
        position: relative;
        flex: 0;
        display: block;
        width: 100%;
      `}
    >
      <Guide.Box
        hue={180}
        height={boundingBoxRatio * fontSize}
        origin={originOffset}
        y={originOffset}
        x={fontSize * 0.3 + 2}
        width={fontSize * 0.3}
        label="bounding box"
      />

      <Guide.Box
        hue={180}
        origin={originOffset}
        height={lineHeightRatio * fontSize}
        y={0}
        x={0}
        width={fontSize * 0.3}
        label="line-height"
      />
      <span
        type="text"
        className={css`
          width: 100%;
          display: block;
          vertical-align: top;
          position: relative;
          font-family: '${font.familyName}';
          font-weight: ${font['OS/2'].usWeightClass};
          font-size: ${fontSize}px;
          line-height: ${lineHeight};
          background-color: transparent;
          outline:none;
          color: inherit;
          white-space: nowrap;
          
        `}
      >
        {children}
      </span>
      <Guide.RulerH hue={120} y={ascenderOffset} label="ascender" />
      <Guide.RulerH hue={120} y={capHeightOffset} label="cap-height" />
      <Guide.RulerH hue={120} y={xHeightOffset} label="x-height" />
      <Guide.RulerH hue={120} y={descenderOffset} label="descender" />
      <Guide.RulerH hue={120} y={baselineOffset} label="baseline" />
    </div>
  );
};
