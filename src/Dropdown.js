import { Component, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { css, injectGlobal } from 'emotion';
import { Link } from 'wouter-preact';

import FontContext from './FontContext';

import './dropdown.css';

export default ({ selected, options }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={`dropdown ${active ? 'active' : ''}`}>
      <button
        class="dropbtn"
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      >
        {selected}
      </button>
      <div class="dropdown-content">
        {options.map((f, idx) => (
          <Link href={`/${idx}`} tabIndex={-1}>
            {f.family} - {f.key}
          </Link>
        ))}
      </div>
    </div>
  );
};
