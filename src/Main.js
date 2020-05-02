import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { css, cx } from 'emotion';

import FontContext from './FontContext';
import TextBaseline from './TextBaseline';
import TextMetrics from './TextMetrics';

let grid = css`
  background-color: #fff;
  color: #000;
  padding: 16px;
  padding-top: 80px;
  padding-left: 80px;
  min-height: 100vh;
  position: relative;
  background-repeat: repeat;
  background-size: 100% 16px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 0, 255, 0.2) 8px,
    transparent 8px
  );
`;

export default () => {
  const { font } = useContext(FontContext);

  if (!font) return null;
  return (
    <section className={grid}>
      <div
        className={css`
          margin-bottom: 48px;
          background-color: rgba(0, 0, 0, 0.2);
        `}
      >
        <TextBaseline fontSize={120} leading={0}>
          HAMBURGERFÖSTIV
        </TextBaseline>
      </div>

      <TextMetrics fontSize={120} lineHeight={1}>
        Hamburgefonstiv
      </TextMetrics>
    </section>
  );
};
