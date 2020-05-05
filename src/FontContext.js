import { createContext } from 'preact';

export default createContext({
  font: null,
  features: null,
  metrics: false,
  setMetrics: () => null,
  setFont: () => 1,
  setFeatures: () => 1,
  fontSize: 80,
  setFontsize: () => null,
  text: 'XxQg',
  setText: () => null,
  lineHeight: 1,
  setLineHeight: () => null,
});
