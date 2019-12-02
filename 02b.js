// https://adventofcode.com/2019/day/2#part2

const fs = require('fs');

const WANTED_OUTPUT = 19690720;

// let intcodes = fs.readFileSync('02input_debug.txt', 'utf8').split(',').map(i => parseInt(i));
let intcodes = fs.readFileSync('02input.txt', 'utf8').split(',').map(i => parseInt(i));

for (let i = 0; i < 99; i++) {
  for (let j = 0; j < 99; j++) {
    let memory = intcodes.concat([]);
    memory[1] = i;
    memory[2] = j;
    let kurac = runProgram(memory);
    if (kurac[0] === WANTED_OUTPUT) {
      console.log('whoa', { i, j, wat: 100 * i + j });
    }
  
  }
}

// restore the gravity assist program
// intcodes[1] = 12;
// intcodes[2] = 2;

// let kurac = runProgram(intcodes);
// console.log(kurac.toString());

function runProgram(memory) {
  let running = true;
  let address = 0;
  do {
    // console.log(`instruction pointer is ${address}`);
    if (memory[address] === 1) {
      let address1 = memory[address + 1];
      let address2 = memory[address + 2];
      let address3 = memory[address + 3];
      memory[address3] = memory[address1] + memory[address2];
      address += 4;
    }
    else if (memory[address] === 2) {
      let address1 = memory[address + 1];
      let address2 = memory[address + 2];
      let address3 = memory[address + 3];
      memory[address3] = memory[address1] * memory[address2];
      address += 4;
    }
    else if (memory[address] === 99) {
      // halt
      // console.log('Halt detected; program complete.');
      running = false;
    }
    else {
      console.error('unknown opcode; something went wrong.', { address });
    }
  } while (running);

  // spit out memory
  return memory;
}

