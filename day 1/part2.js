const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const listA = []
const similarityMap = {}
for (const i of input) {
  const [a, b] = i.split('   ')
  listA.push(+a)
  if (!similarityMap[b]) similarityMap[b] = 1
  else similarityMap[b]++
}

let similarity = 0;

for (let i = 0; i < listA.length; i++) {
  const similarityMultiplier = similarityMap[listA[i]] || 0
  similarity += listA[i] * similarityMultiplier
}

console.log(similarity);