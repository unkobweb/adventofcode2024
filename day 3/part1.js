const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

function mul(a, b) {
  return a * b;
}

const regex = /mul\(\d{1,3},\d{1,3}\)/g;
const res = input.match(regex);

let sum = 0;

for (const r of res) {
  const [a, b] = r.slice(4, -1).split(',');
  sum += mul(+a, +b);
}

console.log(sum);