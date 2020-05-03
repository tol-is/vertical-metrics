import { Component, h, render } from 'preact';
import { useState } from 'preact/hooks';

import FontContext from './FontContext';
import FontLoader from './FontLoader';
import Main from './Main';

const App = () => {
  const [font, setFont] = useState();
  const [text, setText] = useState('Xxfg');
  const [fontSize, setFontSize] = useState(200);
  const [lineHeight, setLineHeight] = useState(1);

  return (
    <FontContext.Provider
      value={{
        font,
        setFont,
        fontSize,
        setFontSize,
        text,
        setText,
        lineHeight,
        setLineHeight,
      }}
    >
      <FontLoader />
      {font && <Main />}
    </FontContext.Provider>
  );
};

render(<App />, document.body);
