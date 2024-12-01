const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const listA = []
const listB = []
for (const i of input) {
  const [a, b] = i.split('   ')
  listA.push(+a)
  listB.push(+b)
}

listA.sort()
listB.sort()

let distances = 0;

for (let i = 0; i < listA.length; i++) {
  distances += Math.abs(listA[i] - listB[i])
}

console.log(distances);