import { Component, h } from 'preact';

import './switch.css';

export const Switch = (props) => (
  <label class="switch">
    <input type="checkbox" {...props} />
    <span class="slider round"></span>
  </label>
);

export default Switch;
