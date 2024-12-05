const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const numberMap = {}
let score = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === '') {
    input = input.slice(i + 1);
    break;
  };

  const [first, second] = input[i].split('|');
  if (numberMap[second] === undefined) numberMap[second] = [first];
  else numberMap[second].push(first);
}


for (const line of input) {
  const pageNumbers = line.split(',');
  let problem = false;
  for (let i = 0; i < pageNumbers.length; i++) {
    if (numberMap[pageNumbers[i]] === undefined) continue;

    for (let j = i; j < pageNumbers.length; j++) {
      if (numberMap[pageNumbers[i]].includes(pageNumbers[j])) {
        problem = true;
        break;
      }
    }
  }
  if (!problem) {
    console.log(line);
    // get the middle item of the array
    const middle = Math.floor(pageNumbers.length / 2);
    score += +pageNumbers[middle];
  }
}

console.log(score);