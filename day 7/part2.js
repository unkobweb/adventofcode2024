const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let sum = 0;

loop1: for (const line of input) {
  const [a, b] = line.split(': ');
  const wantedResult = +a;
  const numbers = b.split(' ').map(Number);

  const operands = Array.from({ length: numbers.length - 1 }, (_, i) => '+');

  let stop = false;
  while (!stop) {
    const clonedOperands = [...operands];
    const clonedNumbers = [...numbers];
    for (let i = 0; i < clonedOperands.length; i++) {
      const currentOperands = clonedOperands[i];
      const firstNumber = clonedNumbers.shift();
      const secondNumber = clonedNumbers.shift();
      if (currentOperands === '+') {
        clonedNumbers.unshift(firstNumber + secondNumber);
      } else if (currentOperands === '*') {
        clonedNumbers.unshift(firstNumber * secondNumber);
      } else {
        clonedNumbers.unshift(+`${firstNumber}${secondNumber}`);
      }
      if (clonedNumbers.length === 1 && clonedNumbers[0] === wantedResult) {
        sum += wantedResult;
        continue loop1;
      }
    }

    if (operands.every(op => op === '|')) stop = true;
    defineNextOperands(operands);
  }
}

// think in base 3, like : +++ become ++* become ++| become +*+ become +** become +*| become +|+ become +|* become +||
function defineNextOperands(operands) {
  for (let i = operands.length - 1; i >= 0; i--) {
    if (operands[i] === '+') {
      operands[i] = '*';
      break;
    } else if (operands[i] === '*') {
      operands[i] = '|';
    } else if (operands[i] === '|') {
      operands[i] = '+';
    }
  }
  return operands;
}

console.log(sum);