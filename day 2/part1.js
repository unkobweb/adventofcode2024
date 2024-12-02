const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let safeReports = 0

for (const report of input) {
  let unsafe = false;
  const levels = report.split(' ').map(lvl => +lvl);

  if (levels[0] === levels[1]) continue;

  let type = levels[0] > levels[1] ? 'decreasing' : 'increasing';

  for (let i = 0; i < levels.length; i++) {
    let gap = Math.abs(levels[i] - levels[i + 1]);
    if (gap < 1 || gap > 3) {
      unsafe = true;
      break;
    }

    if (type === 'decreasing' && levels[i] < levels[i + 1]) {
      unsafe = true;
      break;
    }

    if (type === 'increasing' && levels[i] > levels[i + 1]) {
      unsafe = true;
      break;
    }
  }

  if (!unsafe) safeReports++;
}

console.log(safeReports);