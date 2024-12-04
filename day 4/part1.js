const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(line => line.split(''));

let xmasCount = 0;

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    // horizontal
    if (`${input[y]?.[x] || ''}${input[y]?.[x + 1] || ''}${input[y]?.[x + 2] || ''}${input[y]?.[x + 3] || ''}` === 'XMAS') xmasCount++;
    if (`${input[y]?.[x] || ''}${input[y]?.[x + 1] || ''}${input[y]?.[x + 2] || ''}${input[y]?.[x + 3] || ''}`.split('').reverse().join('') === 'XMAS') xmasCount++;
    // vertical
    if (`${input[y]?.[x] || ''}${input[y + 1]?.[x] || ''}${input[y + 2]?.[x] || ''}${input[y + 3]?.[x] || ''}` === 'XMAS') xmasCount++;
    if (`${input[y]?.[x] || ''}${input[y + 1]?.[x] || ''}${input[y + 2]?.[x] || ''}${input[y + 3]?.[x] || ''}`.split('').reverse().join('') === 'XMAS') xmasCount++;
    // diagonal
    if (`${input[y]?.[x] || ''}${input[y + 1]?.[x + 1] || ''}${input[y + 2]?.[x + 2] || ''}${input[y + 3]?.[x + 3] || ''}` === 'XMAS') xmasCount++;
    if (`${input[y]?.[x] || ''}${input[y + 1]?.[x + 1] || ''}${input[y + 2]?.[x + 2] || ''}${input[y + 3]?.[x + 3] || ''}`.split('').reverse().join('') === 'XMAS') xmasCount++;
    // anti-diagonal
    if (`${input[y]?.[x] || ''}${input[y + 1]?.[x - 1] || ''}${input[y + 2]?.[x - 2] || ''}${input[y + 3]?.[x - 3] || ''}` === 'XMAS') xmasCount++;
    if (`${input[y]?.[x] || ''}${input[y + 1]?.[x - 1] || ''}${input[y + 2]?.[x - 2] || ''}${input[y + 3]?.[x - 3] || ''}`.split('').reverse().join('') === 'XMAS') xmasCount++;
  }
}

console.log(xmasCount);