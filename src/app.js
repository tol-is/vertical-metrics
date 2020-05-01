import { Component, h, render } from 'preact';
import { useState } from 'preact/hooks';

import FontContext from './FontContext';
import FontLoader from './FontLoader';
import Main from './Main';

const App = () => {
  const [font, setFont] = useState();
  const [features, setFeatures] = useState();

  return (
    <FontContext.Provider value={{ font, setFont, features, setFeatures }}>
      <FontLoader />
      {font && <Main />}
    </FontContext.Provider>
  );
};

render(<App />, document.body);
