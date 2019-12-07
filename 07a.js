'use strict';

// https://adventofcode.com/2019/day/7

const fs = require('fs');

let intcodes = fs.readFileSync('07input.txt', 'utf8').split(',').map(i => parseInt(i));
let possiblePhaseSettings = getPermutations('01234');

let maxValue = 0;
let maxPhaseSetting = null;
for (let phaseSetting of possiblePhaseSettings) {
  let outputA = run(intcodes.concat([]), [parseInt(phaseSetting[0]), 0]);
  let outputB = run(intcodes.concat([]), [parseInt(phaseSetting[1]), outputA]);
  let outputC = run(intcodes.concat([]), [parseInt(phaseSetting[2]), outputB]);
  let outputD = run(intcodes.concat([]), [parseInt(phaseSetting[3]), outputC]);
  let outputE = run(intcodes.concat([]), [parseInt(phaseSetting[4]), outputD]);
  if (outputE > maxValue) {
    maxValue = outputE;
    maxPhaseSetting = phaseSetting;
  }
}
console.log({maxValue, maxPhaseSetting});

// https://medium.com/@lindagmorales94/how-to-solve-a-string-permutation-problem-using-javascript-95ad5c388219
// https://stackoverflow.com/questions/9960908/permutations-in-javascript
function getPermutations(str) {
  let letters = str.split(''),
      results = [[letters.shift()]];
  while (letters.length) {
      const currLetter = letters.shift();
      let tmpResults = [];
      results.forEach(result => {
          let rIdx = 0;
          while (rIdx <= result.length) {
              const tmp = [...result];
              tmp.splice(rIdx, 0, currLetter);
              tmpResults.push(tmp);
              rIdx++;
          }
      })
      results = tmpResults;
  }
  return results
    .map(letterArray => letterArray.join(''))
    .filter((el, idx, self) => (self.indexOf(el) === idx))
    .sort();
}

function run(memory, inputs) {
  let running = true;
  let inputCounter = 0;
  let counter = 0;
  let output = null;
  do {
    let { opcode, mode1, mode2, mode3 } = decomposeOpcode(memory[counter]);
    // console.log({ opcode, mode1, mode2, mode3 });
    if (opcode === 1) {
      // add
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      let param3 = memory[counter + 3]
      memory[param3] = param1 + param2;
      counter += 4;
    }
    else if (opcode === 2) {
      // multiply
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      let param2 = mode2 ? memory[counter + 2] : memory[memory[counter + 2]];
      let param3 = memory[counter + 3]
      memory[param3] = param1 * param2;
      counter += 4;
    }
    else if (opcode === 3) {
      // input
      let address1 = memory[counter + 1];
      memory[address1] = inputs[inputCounter];
      inputCounter++
      counter += 2;
    }
    else if (opcode === 4) {
      // output
      let param1 = mode1 ? memory[counter + 1] : memory[memory[counter + 1]];
      output = param1;
      //console.log(output);
      //if (mode1) console.log('we have output in mode1, sneaky', { opcode, mode1, address1 });
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
      counter += 1;
      return output;
    }
    else {
      console.error('Unknown opcode; something went wrong.', { counter, opcode });
      throw `Unknown opcode ${opcode} at counter ${counter}`;
    }
  } while (running);
  // spit out memory after halting
  return { memory, input, output};
}

function decomposeOpcode(opcode) {
  opcode = opcode.toString();
  // prepend zeros if necessary
  if (opcode.length === 1) opcode = '0000' + opcode;
  else if (opcode.length === 2) opcode = '000' + opcode;
  else if (opcode.length === 3) opcode = '00' + opcode;
  else if (opcode.length === 4) opcode = '0' + opcode;

  let command = parseInt(opcode.substr(3,5));
  let mode1 = opcode[2] === '1';
  let mode2 = opcode[1] === '1';
  let mode3 = opcode[0] === '1';

  return { opcode: command, mode1, mode2, mode3 };
}