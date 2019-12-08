'use strict';

// https://adventofcode.com/2019/day/7

const fs = require('fs');

class Amplifier {
  constructor(initialMemory) {
    this.memory = initialMemory.concat([]);
    this.isHalted = false;
    // this.isAwaitingInput = false;
    this.pointer = 0;
  }
  run(input) {
    let running = true;
    let inputUsed = false;
    let output = null;
    if (this.isHalted) {
      console.log(`halted; cannot process input ${input}.`)
      return output;
    }
    do {
      let { opcode, mode1, mode2, mode3 } = this.decomposeOpcode(this.memory[this.pointer]);
      // console.log({ opcode, mode1, mode2, mode3 });
      if (opcode === 1) {
        // add
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        let param2 = mode2 ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]];
        let param3 = this.memory[this.pointer + 3]
        this.memory[param3] = param1 + param2;
        this.pointer += 4;
      }
      else if (opcode === 2) {
        // multiply
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        let param2 = mode2 ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]];
        let param3 = this.memory[this.pointer + 3]
        this.memory[param3] = param1 * param2;
        this.pointer += 4;
      }
      else if (opcode === 3) {
        // input
        if (inputUsed) {
          // console.log('input already used!');
          // this.isAwaitingInput = true;
          running = false;
          break;
        } else {
          inputUsed = true;
          // this.isAwaitingInput = false;
        }
        let address1 = this.memory[this.pointer + 1];
        this.memory[address1] = input;
        this.pointer += 2;
      }
      else if (opcode === 4) {
        // output
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        output = param1;
        this.pointer += 2;
        // console.log(`output ${output}`);
        return output;
      }
      else if (opcode === 5) {
        // jump-if-true
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        let param2 = mode2 ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]];
        this.pointer = param1 !== 0 ? param2 : this.pointer + 3;
      }
      else if (opcode === 6) {
        // jump-if-false
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        let param2 = mode2 ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]];
        this.pointer = param1 === 0 ? param2 : this.pointer + 3;
      }
      else if (opcode === 7) {
        // less-than
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        let param2 = mode2 ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]];
        let param3 = this.memory[this.pointer + 3];
        this.memory[param3] = param1 < param2 ? 1 : 0;
        this.pointer += 4;
      }
      else if (opcode === 8) {
        // equals
        let param1 = mode1 ? this.memory[this.pointer + 1] : this.memory[this.memory[this.pointer + 1]];
        let param2 = mode2 ? this.memory[this.pointer + 2] : this.memory[this.memory[this.pointer + 2]];
        let param3 = this.memory[this.pointer + 3];
        this.memory[param3] = param1 === param2 ? 1 : 0;
        this.pointer += 4;
      }
      else if (opcode === 99) {
        // halt
        // console.log('halted.');
        running = false;
        this.pointer += 1;
        this.isHalted = true;
        return null;
      }
      else {
        console.error('Unknown opcode; something went wrong.', { instructionPointer: this.pointer, opcode });
        throw `Unknown opcode ${opcode} at instruction pointer ${this.pointer}`;
      }
    } while (running);
  }
  decomposeOpcode(opcode) {
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
}

let intcodes = fs.readFileSync('07input.txt', 'utf8').split(',').map(i => parseInt(i));
let possiblePhaseSettings = getPermutations('56789');
let maxValue = 0;
let maxPhaseSettings;

for (let phase of possiblePhaseSettings) {

  let amplifierA = new Amplifier(intcodes),
      amplifierB = new Amplifier(intcodes),
      amplifierC = new Amplifier(intcodes),
      amplifierD = new Amplifier(intcodes),
      amplifierE = new Amplifier(intcodes);

  // console.log(`setting phase settings ${phase}...`);
  amplifierA.run(parseInt(phase[0]));
  amplifierB.run(parseInt(phase[1]));
  amplifierC.run(parseInt(phase[2]));
  amplifierD.run(parseInt(phase[3]));
  amplifierE.run(parseInt(phase[4]));

  let input = 0;
  let running = true;
  do {
    let outputA = amplifierA.run(input);
    let outputB = amplifierB.run(outputA);
    let outputC = amplifierC.run(outputB);
    let outputD = amplifierD.run(outputC);
    let outputE = amplifierE.run(outputD);
    input = outputE;
    // console.log(`E output: ${outputE}`);
    if (outputE > maxValue) {
      maxValue = outputE;
      maxPhaseSettings = phase;
    }
    if (amplifierE.isHalted) {
      running = false;
    }
  } while(running);
}
console.log({ maxValue, maxPhaseSettings });

// https://medium.com/@lindagmorales94/how-to-solve-a-string-permutation-problem-using-javascript-95ad5c388219
function getPermutations(string) {
  let characters = string.split(''),
      // shift() removes arr[0] and returns it
      results = [[characters.shift()]];
  while (characters.length > 0) {
    const character = characters.shift();
    let tempResults = [];
    for (let array of results) {
      let index = 0;
      while (index <= array.length) {
        const temp = [...array];
        // insert character at temp[index]?
        temp.splice(index, 0, character);
        tempResults.push(temp);
        index++;
      }
    }
    results = tempResults;
  }
  return results
    .map(letterArray => letterArray.join(''))
    .filter((element, index, self) => (self.indexOf(element) === index))
    .sort();
}
