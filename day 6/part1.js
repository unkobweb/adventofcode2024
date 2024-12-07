const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(line => line.split(''));

console.log(input);

function findStart() {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '^') {
        return [x, y];
      }
    }
  }
}

function findUsedPath() {
  const usedPath = new Set();

  let [x, y] = findStart();
  let direction = 'up';
  let newDirection = {
    up: 'right',
    right: 'down',
    down: 'left',
    left: 'up'
  }

  while (input[y]?.[x] !== undefined) {
    let next;
    switch (direction) {
      case 'up':
        next = input[y - 1]?.[x];
        break;
      case 'down':
        next = input[y + 1]?.[x];
        break;
      case 'left':
        next = input[y][x - 1];
        break;
      case 'right':
        next = input[y][x + 1];
        break;
    }

    if (next === '#') {
      direction = newDirection[direction];
    } else {
      usedPath.add(`${x},${y}`);
      switch (direction) {
        case 'up':
          y--;
          break;
        case 'down':
          y++;
          break;
        case 'left':
          x--;
          break;
        case 'right':
          x++;
      }
    }

  }
  return usedPath.size;
}
console.log(findUsedPath());