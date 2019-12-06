'use strict';

// https://adventofcode.com/2019/day/6#part2

const fs = require('fs');

let input = fs.readFileSync('06input.txt', 'utf8').split('\n');

let start = (new Date).getTime();

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

let ancestry1 = getAncestry(data, 'YOU');
let ancestry2 = getAncestry(data, 'SAN');
let commonAncestor = findCommonAncestor(ancestry1, ancestry2);
let commonDepth = getDepth(data, commonAncestor);
let youDepth = getDepth(data, 'YOU');
let sanDepth = getDepth(data, 'SAN');

// console.log('common ancestor', commonAncestor);
// console.log('common depth', commonDepth);
// console.log('YOU depth', youDepth);
// console.log('SAN depth', sanDepth);
console.log((youDepth + sanDepth - 2 * commonDepth) - 2); // 474 too high
console.log(`Completed in ${(new Date).getTime() - start}ms.`);

function getDepth(data, key, depth = 0) {
  if (data[key].parent) {
    // console.log(`parent is ${data[key].parent}`);
    return getDepth(data, data[key].parent, depth + 1);
  }
  return depth;
}

function getAncestry(data, key) {
  let running = true;
  let target = data[key];
  if (!target.parent) return [];
  target = data[target.parent];
  let ancestors = [];
  do {
    if (target && target.parent) {
      ancestors.unshift(target.name);
      target = data[target.parent];
    } else {
      ancestors.unshift('COM');
      running = false; 
    }
  } while (running)
  return ancestors;
}

function findCommonAncestor(data1, data2) {
  let ancestor = null;
  for (let i = 0; i < data1.length; i++) {
    if (i > data2.length - 1) break;
    if (data1[i] === data2[i]) {
      ancestor = data1[i];
    }
  }
  return ancestor;
}

// console.log(data);