'use strict';

// https://adventofcode.com/2019/day/9

const fs = require('fs');


class Computer {
  constructor(initialMemory) {
    this.memory = initialMemory.concat([]);
    this.isHalted = false;
    // this.isAwaitingInput = false;
    this.pointer = 0;
    this.relativeBase = 0;
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
      console.log({ opcode, mode1, mode2, mode3 });
      if (opcode === 1) {
        // add
        let param1 = this.getValue(mode1, this.pointer + 1);
        let param2 = this.getValue(mode2, this.pointer + 2);
        let param3 = this.getAddress(mode3, this.pointer + 3);
        this.memory[param3] = param1 + param2;
        this.pointer += 4;
      }
      else if (opcode === 2) {
        // multiply
        let param1 = this.getValue(mode1, this.pointer + 1);
        let param2 = this.getValue(mode2, this.pointer + 2);
        let param3 = this.getAddress(mode3, this.pointer + 3);
        this.memory[param3] = param1 * param2;
        this.pointer += 4;
      }
      else if (opcode === 3) {
        // input
        if (inputUsed) {
          // console.log('input already used!');
          // this.isAwaitingInput = true;
          console.log('awaiting input...');
          running = false;
          break;
        } else {
          inputUsed = true;
          // this.isAwaitingInput = false;
        }
        let param1 = this.getAddress(mode1, this.pointer + 1);
        this.memory[param1] = input;
        this.pointer += 2;
      }
      else if (opcode === 4) {
        // output
        let param1 = this.getValue(mode1, this.pointer + 1);
        output = param1;
        this.pointer += 2;
        console.log(output);
        // return output;
      }
      else if (opcode === 5) {
        // jump-if-true
        let param1 = this.getValue(mode1, this.pointer + 1);
        let param2 = this.getAddress(mode2, this.pointer + 2);
        this.pointer = param1 === 0 ? this.pointer + 3 : param2;
      }
      else if (opcode === 6) {
        // jump-if-false
        let param1 = this.getValue(mode1, this.pointer + 1);
        let param2 = this.getAddress(mode2, this.pointer + 2);
        this.pointer = param1 === 0 ? param2 : this.pointer + 3;
      }
      else if (opcode === 7) {
        // less-than
        let param1 = this.getValue(mode1, this.pointer + 1);
        let param2 = this.getValue(mode2, this.pointer + 2);
        let param3 = this.getAddress(mode3, this.pointer + 3);
        this.memory[param3] = param1 < param2 ? 1 : 0;
        this.pointer += 4;
      }
      else if (opcode === 8) {
        // equals
        let param1 = this.getValue(mode1, this.pointer + 1);
        let param2 = this.getValue(mode2, this.pointer + 2);
        let param3 = this.getAddress(mode3, this.pointer + 3);
        this.memory[param3] = param1 === param2 ? 1 : 0;
        this.pointer += 4;
      }
      else if (opcode === 9) {
        // set relative base
        let param1 = this.memory[this.pointer + 1];
        console.log(`setting relative base to ${param1}.`);
        this.relativeBase = param1;
        this.pointer += 2;
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
  getValue(mode, address) {
    // position mode
    // https://adventofcode.com/2019/day/5
    if (mode === 0) {
      return this.memory[address]; 
    }
    // immediate mode
    // https://adventofcode.com/2019/day/5
    else if (mode === 1) {
      return this.memory[this.memory[address]];
    }
    // relative mode
    // https://adventofcode.com/2019/day/9
    else if (mode === 2) {
      return this.memory[address + this.relativeBase];
    }
  }
  getAddress(mode, address) {
    // position mode
    if (mode === 0) {
      return address;
    }
    // relative mode
    else if (mode === 2) {
      return address + this.relativeBase;
    }
    else {
      console.error('unsupported getAddressMode()', { mode, address });
    }
  }
  decomposeOpcode(opcode) {
    opcode = opcode.toString();
    // prepend zeros if necessary
    if (opcode.length === 1) opcode = '0000' + opcode;
    else if (opcode.length === 2) opcode = '000' + opcode;
    else if (opcode.length === 3) opcode = '00' + opcode;
    else if (opcode.length === 4) opcode = '0' + opcode;
  
    let command = parseInt(opcode.substr(3,5));
    let mode1 = parseInt(opcode[2]);
    let mode2 = parseInt(opcode[1]);
    let mode3 = parseInt(opcode[0]);

    return { opcode: command, mode1, mode2, mode3 };
  }
}

// let intcodes = fs.readFileSync('09input.txt', 'utf8').split(',').map(i => parseInt(i));
let intcodes = fs.readFileSync('09debug.txt', 'utf8').split(',').map(i => parseInt(i));
// let intcodes = fs.readFileSync('09debug2.txt', 'utf8').split(',').map(i => parseInt(i));

let computer = new Computer(intcodes);

computer.run(1);


