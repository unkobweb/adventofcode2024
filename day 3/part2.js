const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

function mul(a, b) {
  return a * b;
}

const regex = /(?:mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
const res = input.match(regex);

let sum = 0;
let enable = true;

for (const r of res) {
  if (r === "do()") {
    enable = true;
    continue;
  }
  if (r === "don't()") {
    enable = false;
    continue;
  }
  if (!enable) continue;

  const [a, b] = r.slice(4, -1).split(',');
  sum += mul(+a, +b);
}

console.log(sum);