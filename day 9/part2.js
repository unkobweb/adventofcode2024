console.time('part2');
const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('').map(Number);

let newBlocks = [];
const fileMap = {}

let id = 0;
let isFreeSpace = false;
for (const block of input) {
  newBlocks.push(...Array.from({ length: block }, () => isFreeSpace ? '.' : id.toString()));
  if (isFreeSpace) id++;
  else {
    fileMap[id] = block;
  }
  isFreeSpace = !isFreeSpace;
}

loop1: while (Object.keys(fileMap).length) {
  const fileToMove = Math.max(...Object.keys(fileMap).map(Number));
  const fileSize = fileMap[fileToMove];
  let subsequentDots = 0;
  let indexOfFirstDotOfSubsequentDots;

  const oldFilePosition = newBlocks.indexOf(fileToMove.toString());

  for (let i = 0; i < newBlocks.length; i++) {
    if (i >= oldFilePosition) {
      delete fileMap[fileToMove];
      continue loop1
    };
    if (newBlocks[i] === '.') {
      if (!indexOfFirstDotOfSubsequentDots) indexOfFirstDotOfSubsequentDots = i;
      subsequentDots++;
      if (subsequentDots === fileSize) {
        break;
      }
    } else {
      subsequentDots = 0;
      indexOfFirstDotOfSubsequentDots = undefined;
    }
  }

  const firstPart = newBlocks.slice(0, indexOfFirstDotOfSubsequentDots);
  const middlePart = Array.from({ length: fileSize }, () => fileToMove.toString());
  const lastPart = newBlocks.slice(indexOfFirstDotOfSubsequentDots + fileSize);

  newBlocks = [...firstPart, ...middlePart, ...lastPart];
  for (let i = 0; i < fileSize; i++) {
    newBlocks[oldFilePosition + i] = '.';
  }
  delete fileMap[fileToMove];
}

let sum = 0;

for (let i = 0; i < newBlocks.length; i++) {
  if (newBlocks[i] === '.') continue;
  sum += +newBlocks[i] * i;
}

console.log(sum);
console.timeEnd('part2');