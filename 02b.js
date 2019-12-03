'use strict';

// https://adventofcode.com/2019/day/2#part2

const fs = require('fs');

const WANTED = 19690720;

let initial = fs.readFileSync('02input.txt', 'utf8').split(',').map(i => parseInt(i));

for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    let memory = initial.concat([]);
    // attempt this [i,j] combination
    memory[1] = i;
    memory[2] = j;
    let result = run(memory);
    if (result[0] === WANTED) {
      console.log({ noun: i, verb: j, output: 100 * i + j });
    }
  }
}

function run(memory) {
  let running = true;
  let address = 0;
  do {
    // console.log(`instruction pointer is ${address}`);
    if (memory[address] === 1) {
      // add
      let address1 = memory[address + 1];
      let address2 = memory[address + 2];
      let address3 = memory[address + 3];
      memory[address3] = memory[address1] + memory[address2];
      address += 4;
    }
    else if (memory[address] === 2) {
      // multiply
      let address1 = memory[address + 1];
      let address2 = memory[address + 2];
      let address3 = memory[address + 3];
      memory[address3] = memory[address1] * memory[address2];
      address += 4;
    }
    else if (memory[address] === 99) {
      // halt
      running = false;
      address += 1;
    }
    else {
      console.error('Unknown opcode; something went wrong.', { address });
    }
  } while (running);
  // spit out memory after halting
  return memory;
}
