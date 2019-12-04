'use strict';

// https://adventofcode.com/2019/day/4#part2

const LOW = 134564;
const HIGH = 585159;

function isValidPassword(stringy) {
  let hasExactDouble = false;
  for (let i = 1; i < stringy.length; i++) {
    if (stringy[i] < stringy[i - 1]) {
      // if previous digit is higher than current, password is invalid
      return false;
    }
    if (i === 1) {
      // check first three
      if (stringy[1] === stringy[0] && stringy[1] !== stringy[2]) {
        // has a 'double' in the beginning of string
        hasExactDouble = true;
      }
    }
    else if (i === stringy.length - 1) {
      // check last three
      if (stringy[i] === stringy[i - 1] && stringy[i] !== stringy[i - 2]) {
        // has a 'double' in the end of string
        hasExactDouble = true;
      }
    }
    else {
      // check any 'middle two'
      if (stringy[i] === stringy[i - 1] && stringy[i] !== stringy[i - 2] && stringy[i] !== stringy[i + 1]) {
        hasExactDouble = true;
      }
    }
  }
  return hasExactDouble;
}

let validPasswords = [];
for (let i = LOW; i <= HIGH; i++) {
   if (isValidPassword(i.toString())) {
     validPasswords.push(i);
   }
}

console.log(`we have ${validPasswords.length} valid passwords.`);
