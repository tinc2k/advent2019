'use strict';

// https://adventofcode.com/2019/day/6

const fs = require('fs');

let input = fs.readFileSync('06input.txt', 'utf8').split('\n');
// let input = fs.readFileSync('06debug.txt', 'utf8').split('\n');

let data = {};
data['COM'] = { parent: null };

for (let orbit of input) {
  let [ parent, child ] = orbit.split(')');
    data[child] = { name: child, parent: parent }
}

let total = 0;
for (let object in data) {
  if (data[object].parent) {
    total += 1;
    total += getDepth(data, data[object].parent);
  }
}
console.log(total);

function getDepth(data, key, depth = 0) {
  if (data[key].parent) {
    // console.log(`parent is ${data[key].parent}`);
    return getDepth(data, data[key].parent, depth + 1);
  }
  return depth;
}

// console.log(data);