const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8').split(' ').map(Number);

for (let i = 0; i < 25; i++) {
  const nextOccurence = [];

  for (const stone of input) {
    if (stone === 0) {
      nextOccurence.push(1);
      continue
    }

    if (stone.toString().length % 2 === 0) {
      const firstStone = stone.toString().slice(0, stone.toString().length / 2);
      const secondStone = stone.toString().slice(stone.toString().length / 2);
      nextOccurence.push(+firstStone);
      nextOccurence.push(+secondStone);
      continue;
    }

    nextOccurence.push(stone * 2024);
  }
  input = [...nextOccurence];
}

console.log(input.length);