'use strict';

// https://adventofcode.com/2019/day/8

const fs = require('fs');

const image = fs.readFileSync('08input.txt', 'utf8').split('');

const WIDTH = 25;
const HEIGHT = 6;
const BLOCK_SIZE = WIDTH * HEIGHT;

let blocks = [];

// fill blocks
for (let index = 0; index < image.length; index += BLOCK_SIZE) {
  let block = {
    digits: [],
  };
  for (let i = index; i < index + BLOCK_SIZE; i++) {
    let parsed = parseInt(image[i]);
    block.digits.push(parsed);
  }
  blocks.push(block);
}

let final = new Array(BLOCK_SIZE);
final.fill(2);

// calculate final image
for (let block of blocks) {
  for (let j = 0; j < BLOCK_SIZE; j++) {
    let color = block.digits[j];
    if (final[j] === 2 && color === 1) {
      final[j] = 1;
    }
    else if (final[j] === 2 && color === 0) {
      final[j] = 0;
    }
  }
}

// print out final image
for (let row = 0; row < HEIGHT; row++) {
  let printyRow = '';
  for (let column = 0; column < WIDTH; column++) {
    let offset = row * WIDTH + column;
    let char = ' ';
    if (final[offset] === 1) {
      char = '█';
    }
    else if (final[offset] === 0) {
      char = '░';
    }
    printyRow += char;
  }
  console.log(printyRow)
}