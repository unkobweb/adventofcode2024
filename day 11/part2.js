const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8').split(' ').map(Number);

const memoization = {};

function findNumberOfStones(stone, blinkLeft) {
  const memoizationKey = `${stone}|${blinkLeft}`;
  if (memoization[memoizationKey]) return memoization[memoizationKey];

  let val;

  if (stone === 0) {
    if (blinkLeft === 0) return 1;
    val = findNumberOfStones(1, blinkLeft - 1);
  } else if (stone.toString().length % 2 === 0) {
    if (blinkLeft === 0) return 2;
    const firstStone = stone.toString().slice(0, stone.toString().length / 2);
    const secondStone = stone.toString().slice(stone.toString().length / 2);
    val = findNumberOfStones(+firstStone, blinkLeft - 1) + findNumberOfStones(+secondStone, blinkLeft - 1);
  } else {
    if (blinkLeft === 0) return 1;
    val = findNumberOfStones(stone * 2024, blinkLeft - 1);
  }

  memoization[memoizationKey] = val;
  return val;
}

let sum = 0;
const NB_OF_BLINKS = 75;

for (const stone of input) {
  sum += findNumberOfStones(stone, NB_OF_BLINKS - 1);
}

console.log(sum);