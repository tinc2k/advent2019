const fs = require('fs');

let masses = fs.readFileSync('01input.txt', 'utf8').split('\n');

let fuel = 0;
for (let mass of masses) {
  fuel += getTotalFuel(0, mass);
}
console.log(fuel);

function getTotalFuel(total, leftover) {
  let fuel = getFuel(leftover);
  if (fuel <= 0) {
    return total;
  } else {
    total += fuel;
    leftover = fuel;
    return getTotalFuel(total, fuel);
  }
}

function getFuel(mass) {
  let fuel = Math.floor(mass / 3) - 2;
  return fuel;
}
