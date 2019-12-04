'use strict';

// https://adventofcode.com/2019/day/4

const LOW = 134564;
const HIGH = 585159;

function isValidPassword(stringy) {
  let hasDoubles = false;
  for (let i = 1; i < stringy.length; i++) {
    if (stringy[i-1] === stringy[i]) {
      // password has at least one 'double'
      hasDoubles = true;
    }
    if (stringy[i-1] > stringy[i]) {
      // previous digit was higher than current
      return false;   
    }  
  }
  return hasDoubles;
}

let validPasswords = [];
for (let i = LOW; i <= HIGH; i++) {
   if (isValidPassword(i.toString())) {
     validPasswords.push(i);
   }
}

console.log(`we have ${validPasswords.length} valid passwords.`);

// let result = isValidPassword('1223');
// console.log(result);

