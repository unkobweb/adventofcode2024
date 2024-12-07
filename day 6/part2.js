const fs = require('fs');

// let input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(line => line.split(''));

function getInput() {
  return fs.readFileSync('./input.txt', 'utf-8').split('\r\n').map(line => line.split(''));
}

function findStart() {
  const input = getInput();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '^') {
        return [x, y];
      }
    }
  }
}

function findBlockPossibilities() {
  let loopCount = 0;
  let input = getInput();
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      let input = getInput();
      if (input[row][col] !== '.') continue;
      input[row][col] = '#';
      console.log('OBSTACLE EN ', row, col);
      const usedPath = new Set();
      let isProbablyInLoop = false;
      let isInLoop = false;

      let probablyInLoopCoord;
      let [x, y] = findStart();
      let direction = 'up';
      let newDirection = {
        up: 'right',
        right: 'down',
        down: 'left',
        left: 'up'
      }

      let pathCount = 0;
      while (input[y]?.[x] !== undefined && pathCount < 50000) {
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

        // if (usedPath.has(`${x},${y}`)) {
        //   if (isProbablyInLoop && probablyInLoopCoord === `${x},${y}`) {
        //     isInLoop = true;
        //   }
        //   isProbablyInLoop = true;
        //   probablyInLoopCoord = `${x},${y}`;
        // }
        if (next === '#') {
          direction = newDirection[direction];
          // usedPath.add(`${x},${y}`);
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
        pathCount++;
      }
      if (pathCount >= 50000) {
        loopCount++;
      }
      // if (isInLoop) {
      //   loopCount++;
      //   console.log('LOOP');
      //   console.log(input.map(row => row.join('')).join('\n'));
      //   process.exit(0);
      // }
    }

  }
  return loopCount;
}
console.log(findBlockPossibilities());