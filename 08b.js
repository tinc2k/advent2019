'use strict';

// https://adventofcode.com/2019/day/8

const fs = require('fs');

let image = fs.readFileSync('08input.txt', 'utf8').split('');
// let image = fs.readFileSync('08debug.txt', 'utf8').split('');
// let image = fs.readFileSync('08debug2.txt', 'utf8').split('');

// let WIDTH = 2;
// let HEIGHT = 2;

let WIDTH = 25;
let HEIGHT = 6;

let BLOCK_SIZE = WIDTH * HEIGHT;

let blocks = [];

for (let index = 0; index < image.length; index+= BLOCK_SIZE) {
  let block = {
    digits: [],
    zeros: 0,
    ones: 0,
    twos: 0,
  };
  for (let i = index; i < index + BLOCK_SIZE; i++) {
    let parsed = parseInt(image[i]);
    block.digits.push(parsed);
    if (image[i] === 0) block.zeros++;
    if (image[i] === 1) block.ones++;
    if (image[i] === 2) block.twos++;
    // console.log(i);
  }
  // console.log("\n");
  blocks.push(block);
}

// digits indicate color of pixel: 0 black 1 white 2 transparent
// layers are rendered with the first layer in front and the last layer in back

let final = new Array(BLOCK_SIZE);
final.fill(2);

for (let i = 0; i < blocks.length; i++) {
  let currentBlock = blocks[i]
  for (let j = 0; j < BLOCK_SIZE; j++) {

    let color = currentBlock.digits[j];
    
    if (color === 1 && final[j] === 2) {
      final[j] = 1;
    }
    else if (color === 0 && final[j] === 2) {
      final[j] = 0;
    }
  }
}

// print out final
for (let row = 0; row < HEIGHT; row++) {
  let printyRow = '';
  for (let column = 0; column < WIDTH; column++) {
    let offset = row * WIDTH + column;
    let char = ' ';
    if (final[offset] === 1) {
      char = 'O';
    }
    else if (final[offset] === 0) {
      char = ' ';
    }
    printyRow += char;
  }
  console.log(printyRow)
}