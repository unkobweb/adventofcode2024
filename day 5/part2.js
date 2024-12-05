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
  if (problem) {
    pageNumbers.sort((a, b) => {
      if (numberMap[a] && numberMap[a].includes(b)) return -1;
      else if (numberMap[b] && numberMap[b].includes(a)) return 1;
      else return 0;
    });
    score += +pageNumbers[Math.floor(pageNumbers.length / 2)];
  }
}

console.log(score);