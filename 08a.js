'use strict';

// https://adventofcode.com/2019/day/8

const fs = require('fs');

let image = fs.readFileSync('08input.txt', 'utf8').split('');

const WIDTH = 25;
const HEIGHT = 6;
const BLOCK_SIZE = WIDTH * HEIGHT;

let blocks = [];

for (let index = 0; index < image.length; index += BLOCK_SIZE) {
  let block = {
    digits: [],
    zeros: 0,
    ones: 0,
    twos: 0,
  };
  for (let i = index; i < index + BLOCK_SIZE; i++) {
    let parsed = parseInt(image[i]);
    block.digits.push(parsed);
    if (parsed === 0) block.zeros++;
    else if (parsed === 1) block.ones++;
    else if (parsed === 2) block.twos++;
  }
  blocks.push(block);
}

let blockWithFewestZeros = null;
for (let block of blocks) {
  if (!blockWithFewestZeros || block.zeros < blockWithFewestZeros.zeros) {
    blockWithFewestZeros = block;
  }
}

console.log(blockWithFewestZeros.ones * blockWithFewestZeros.twos);
