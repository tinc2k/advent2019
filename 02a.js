// https://adventofcode.com/2019/day/2

const fs = require('fs');

let intcodes = fs.readFileSync('02input.txt', 'utf8').split(',').map(i => parseInt(i));

// restore the gravity assist program
intcodes[1] = 12;
intcodes[2] = 2;

let address = 0;
let running = true;

do {
  //console.log(`currentAddress is ${address}`);
  if (intcodes[address] === 1) {
    let address1 = intcodes[address + 1];
    let address2 = intcodes[address + 2];
    let address3 = intcodes[address + 3];
    intcodes[address3] = intcodes[address1] + intcodes[address2];
    address += 4;
  }
  else if (intcodes[address] === 2) {
    let address1 = intcodes[address + 1];
    let address2 = intcodes[address + 2];
    let address3 = intcodes[address + 3];
    intcodes[address3] = intcodes[address1] * intcodes[address2];
    address += 4;
  }
  else if (intcodes[address] === 99) {
    console.log('halt detected.');
    console.log('spitting out current memory...', intcodes.toString());
    running = false;
  }
  else {
    console.error('unknown opcode; something went wrong.', { address });
  }
} while (running);