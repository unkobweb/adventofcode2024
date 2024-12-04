const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(line => line.split(''));

let xmasCount = 0;

for (let y = 1; y < input.length - 1; y++) {
  for (let x = 1; x < input[y].length - 1; x++) {
    const char = input[y][x];
    if (char !== 'A') continue;

    const topLeftChar = input[y - 1][x - 1];
    const topRightChar = input[y - 1][x + 1];
    const bottomLeftChar = input[y + 1][x - 1];
    const bottomRightChar = input[y + 1][x + 1];

    const str = [topLeftChar, topRightChar, bottomLeftChar, bottomRightChar].sort().join('');
    if (str !== 'MMSS') continue;

    if (topLeftChar === topRightChar || topLeftChar === bottomLeftChar) {
      xmasCount++;
    }
  }
}

console.log(xmasCount);