import { h } from 'preact';
import { css } from 'emotion';

const RulerH = ({ unit = 'px', y, label, right }) => {
  return (
    <span
      className={css`
        position: absolute;
        display: block;
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.4);
        bottom: ${`${y}${unit}`};
      `}
    >
      <span
        className={css`
          position: absolute;
          text-align: ${right ? 'left' : 'right'};
          left: ${right ? 'auto' : '-1rem'};
          right: ${right ? '-1em' : 'auto'};
          transform: ${right ? 'translateX(100%)' : 'translateX(-100%)'}
            translateY(-50%);
          font-size: 8px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont,
            'Helvetica Neue';
        `}
      >
        {label}
      </span>
    </span>
  );
};

const Box = ({
  unit = 'px',
  x = 0,
  y = 0,
  origin,
  width = '0.02em',
  height = '40px',
  label,
}) => {
  return (
    <span
      className={css`
        position: absolute;
        display: block;
        left: ${`${x}${unit}`};
        bottom: ${`${origin}${unit}`};
      `}
    >
      <span
        className={css`
          position: absolute;
          display: block;
          width: ${`${width}${unit}`};
          height: ${`${height}${unit}`};
          background-color: rgba(255, 0, 255, 0.2);
          transform: translateY(${origin - 1}px);
          bottom: ${`${y}${unit}`};
        `}
      ></span>
      <span
        className={css`
          position: absolute;
          text-align: left;
          left: 0;
          top: 10px;
          transform: translateX(0) translateY(0%);
          font-size: 8px;
          font-family: Helvetica;
        `}
      >
        {label}
      </span>
    </span>
  );
};

const Guide = {
  RulerH,
  Box,
};

export default Guide;
