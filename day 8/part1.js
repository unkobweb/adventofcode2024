const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map((line) => line.split(''));

const antennas = {};
const antinodes = new Set();

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    const cell = input[y][x];
    if (cell !== '.') {
      if (!antennas[cell]) antennas[cell] = [[x, y]];
      else antennas[cell].push([x, y]);
    }
  }
}

for (let type in antennas) {
  const typeAntennas = antennas[type];
  for (let i = 0; i < typeAntennas.length; i++) {
    for (let j = 0; j < typeAntennas.length; j++) {
      if (i === j) continue;

      const [x1, y1] = typeAntennas[i];
      const [x2, y2] = typeAntennas[j];

      const dx = x2 - x1;
      const dy = y2 - y1;

      const x3 = x2 + dx;
      const y3 = y2 + dy;

      if (input[y3]?.[x3]) antinodes.add(`${x3},${y3}`);
    }
  }
}

console.log(antennas);
console.log(antinodes);