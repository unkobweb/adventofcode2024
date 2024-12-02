const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let safeReports = 0

for (const report of input) {
  const levels = report.split(' ').map(lvl => +lvl);

  for (let j = -1; j < levels.length; j++) {
    const testedLevels = [...levels];
    let unsafe = false;
    if (j !== -1) testedLevels.splice(j, 1);

    if (testedLevels[0] === testedLevels[1]) continue;

    let type = testedLevels[0] > testedLevels[1] ? 'decreasing' : 'increasing';

    for (let i = 0; i < testedLevels.length; i++) {
      let gap = Math.abs(testedLevels[i] - testedLevels[i + 1]);
      if (gap < 1 || gap > 3) {
        unsafe = true;
        break;
      }

      if (type === 'decreasing' && testedLevels[i] < testedLevels[i + 1]) {
        unsafe = true;
        break;
      }

      if (type === 'increasing' && testedLevels[i] > testedLevels[i + 1]) {
        unsafe = true;
        break;
      }
    }

    if (!unsafe) {
      safeReports++;
      break;
    }
  }
}

console.log(safeReports);