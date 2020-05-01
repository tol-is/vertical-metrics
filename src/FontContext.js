import { createContext } from 'preact';

export default createContext({
  font: null,
  features: null,
  setFont: () => 1,
  setFeatures: () => 1
});
