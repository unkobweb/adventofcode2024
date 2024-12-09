const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('').map(Number);

let newBlocks = [];

let id = 0;
let isFreeSpace = false;
for (const block of input) {
  newBlocks.push(...Array.from({ length: block }, () => isFreeSpace ? '.' : id.toString()));
  if (isFreeSpace) id++;
  isFreeSpace = !isFreeSpace;
}

console.log(newBlocks);

const regex = /(?<=\d)\.+(?=\d)/g
while (newBlocks.join('').match(regex)) {
  // get the first number at the end of string, get the first point of the string and swap them
  for (let index = newBlocks.length - 1; index >= 0; index--) {
    if (newBlocks[index] !== '.') {
      firstNumberAtTheEndIndex = index;
      break;
    }
  }

  let firstPointIndex = newBlocks.indexOf('.');

  newBlocks[firstPointIndex] = newBlocks[firstNumberAtTheEndIndex];
  newBlocks[firstNumberAtTheEndIndex] = '.';
}

let sum = 0;

for (let i = 0; i < newBlocks.length; i++) {
  if (newBlocks[i] === '.') break;
  sum += +newBlocks[i] * i;
}

console.log(sum);