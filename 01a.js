'use strict';

const fs = require('fs');

let masses = fs.readFileSync('01input.txt', 'utf8').split('\n');

let fuel = 0;
for (let mass of masses) {
  fuel += getFuel(mass);
}

console.log(fuel);

function getFuel(mass) {
  return Math.floor(mass / 3) - 2;
}
