import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css } from 'emotion';
import FontContext from './FontContext';

export default ({ children, fontSize, lineHeight = 1.2 }) => {
  const { font } = useContext(FontContext);

  return (
    <div
      className={css`
        position: relative;
        flex: 0;
        display: inline-block;
      `}
    >
      <span
        className={css`
          width: auto;
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
        `}
      >
        {children}
      </span>
    </div>
  );
};
