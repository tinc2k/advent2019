'use strict';

// https://adventofcode.com/2019/day/5

const fs = require('fs');

let intcodes = fs.readFileSync('05input.txt', 'utf8').split(',').map(i => parseInt(i));
// let intcodes = fs.readFileSync('05debug.txt', 'utf8').split(',').map(i => parseInt(i));


run(intcodes, 5);

function run(memory, input) {
  let running = true;

  let counter = 0;
  let output = null;
  do {
    let { opcode, mode1, mode2, mode3 } = decomposeOpcode(memory[counter]);
    // console.log({ opcode, mode1, mode2, mode3 });
    if (opcode === 1) {
      // add
      // console.log('add');
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      let param3 = memory[counter + 3]
      // console.log({ param1, param2, param3 });
      memory[param3] = param1 + param2;
      counter += 4;
      // console.log(`result is ${memory[address3]}`);
    }
    else if (opcode === 2) {
      // multiply
      // console.log('multiply');
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      let param3 = memory[counter + 3]
      // console.log({ param1, param2, param3 });
      memory[param3] = param1 * param2;
      counter += 4;
      // console.log(`result is ${memory[address3]}`);
    }
    /* Opcode 3 takes a single integer as input and saves it to the position given by its only parameter. For example, the instruction 3,50 would take an input value and store it at address 50. */
    else if (opcode === 3) {
      // input
      let address1 = memory[counter + 1];
      memory[address1] = input;
      counter += 2;
    }
    /* Opcode 4 outputs the value of its only parameter. For example, the instruction 4,50 would output the value at address 50. */
    else if (opcode === 4) {
      // output
      let address1 = memory[counter + 1];
      output = mode1 ? address1 : memory[address1];
      console.log(output);
      if (mode1) {
        console.log('we have output in mode1, sneaky');
      }
      counter += 2;
    }

    else if (opcode === 5) {
      // jump-if-true
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      if (param1 !== 0) {
        counter = param2;
      } else {
        counter += 3;
      }
    }
    else if (opcode === 6) {
      // jump-if-false
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      if (param1 === 0) {
        counter = param2;
      } else {
        counter += 3;
      }
    }

    else if (opcode === 7) {
      // less-than
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      let param3 = memory[counter + 3];
      memory[param3] = param1 < param2 ? 1 : 0;
      counter += 4;
    }
    else if (opcode === 8) {
      // equals
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      let param3 = memory[counter + 3];
      memory[param3] = param1 === param2 ? 1 : 0;
      counter += 4;
    }

    else if (opcode === 99) {
      // halt
      running = false;
      counter += 2;
    }
    else {
      console.error('Unknown opcode; something went wrong.', { counter, opcode });
      process.exit();
    }
  } while (running);
  // spit out memory after halting
  return { memory, input, output};
}

function decomposeOpcode(opcode) {
  opcode = opcode.toString();
  // if (opcode.toString) opcode = opcode.toString();
  // console.log(`going through opcode ${opcode}.`);
  // prepend zeros if necessary
  if (opcode.length === 1) opcode = '0000' + opcode;
  else if (opcode.length === 2) opcode = '000' + opcode;
  else if (opcode.length === 3) opcode = '00' + opcode;
  else if (opcode.length === 4) opcode = '0' + opcode;

  // console.log(`opcode now is ${opcode}.`);

  let command = parseInt(opcode.substr(3,5));
  let mode1 = opcode[2] === '1';
  let mode2 = opcode[1] === '1';
  let mode3 = opcode[0] === '1';

  return { opcode: command, mode1, mode2, mode3 };
}