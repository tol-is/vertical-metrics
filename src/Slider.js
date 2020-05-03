import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css } from 'emotion';

const thumb = {
  appearance: 'none',
  width: '45px',
  height: '46px',
  border: 0,
  borderRadius: 0,
  background: 'linear-gradient(to bottom, #000, #000) no-repeat',
  backgroundSize: '2px 48px',
  backgroundPosition: 'center 1px',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
};

const thumbHover = {
  appearance: 'none',
  width: '45px',
  height: '46px',
  border: 0,
  borderRadius: 0,
  background: 'linear-gradient(to bottom, #000, #000) no-repeat',
  backgroundSize: '6px 48px',
  backgroundPosition: 'center center',
};

export const Slider = (props) => (
  <input
    {...props}
    type="range"
    className={css({
      display: 'block',
      width: 'calc(100% + 48px)',
      height: '2px',
      cursor: 'pointer',
      marginLeft: '-24px',
      marginRight: '-24px',
      appearance: 'none',
      borderRadius: 0,
      border: 0,
      color: 'inherit',
      background: 'linear-gradient(to right, #cccccc, #cccccc) no-repeat',
      backgroundSize: 'calc(100% - 48px) 2px',
      backgroundPosition: '24px 0',
      '&::-webkit-slider-thumb': thumb,
      '&::-moz-range-thumb': thumb,
      '&::-ms-thumb': thumb,
      '&::-moz-focus-outer': {
        border: 0,
      },
      ':focus': {
        outline: 'none',
        background: 'linear-gradient(to right, #f78ae0, #f78ae0) no-repeat',
        backgroundSize: 'calc(100% - 48px) 2px',
        backgroundPosition: '24px 0',
        '&::-webkit-slider-thumb': thumbHover,
        '&::-moz-range-thumb': thumbHover,
        '&::-ms-thumb': thumbHover,
      },
      ':hover': {
        outline: 'none',
        background: 'linear-gradient(to right, #f78ae0, #f78ae0) no-repeat',
        backgroundSize: 'calc(100% - 48px) 2px',
        backgroundPosition: '24px 0',
        '&::-webkit-slider-thumb': thumbHover,
        '&::-moz-range-thumb': thumbHover,
        '&::-ms-thumb': thumbHover,
      },
    })}
  />
);

export default Slider;
