const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(line => line.split('').map(Number));

const allZeros = []

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === 0) {
      allZeros.push([x, y]);
    }
  }
}

let nineCount = 0;

for (const zero of allZeros) {
  let knownNine = 0

  function findPossibleNext(x, y, currentValue) {
    if (input[y][x] === 9) {
      knownNine++;
      return;
    }
    const possibleNext = [];
    if (input[y][x + 1] === currentValue + 1) findPossibleNext(x + 1, y, currentValue + 1);
    if (input[y][x - 1] === currentValue + 1) findPossibleNext(x - 1, y, currentValue + 1);
    if (input[y + 1] && input[y + 1][x] === currentValue + 1) findPossibleNext(x, y + 1, currentValue + 1);
    if (input[y - 1] && input[y - 1][x] === currentValue + 1) findPossibleNext(x, y - 1, currentValue + 1);
    return possibleNext;
  }

  const [x, y] = zero;
  findPossibleNext(x, y, 0);
  nineCount += knownNine;
}

console.log(nineCount);