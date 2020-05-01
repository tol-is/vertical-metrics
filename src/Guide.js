import { h } from 'preact';
import { css } from 'emotion';

const RulerH = ({ unit = 'px', y, label }) => {
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
          text-align: right;
          left: -1rem;
          transform: translateX(-100%) translateY(-50%);
          font-size: 8px;
          font-family: Helvetica;
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
  width = '15%',
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
          background-color: rgba(0, 0, 0, 0.4);
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
