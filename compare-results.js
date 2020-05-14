const fs = require('fs');

const data = require('./results.json');

const findIssues = async () => {
  const issues = [];

  data.forEach((font) => {
    const {
      useTypoMetrics,
      typoAscentDif,
      typoDescentDif,
      winAscentDif,
      winDescentDif,
    } = font;
    if (
      (useTypoMetrics && (typoAscentDif !== 0 || typoDescentDif !== 0)) ||
      (!useTypoMetrics && (winAscentDif !== 0 || winDescentDif !== 0))
    ) {
      issues.push(font);
    }
  });

  let json = JSON.stringify(issues, null, 4);
  fs.writeFileSync('issues.json', json);

  return issues;
};

findIssues();
