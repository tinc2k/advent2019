'use strict';

// https://adventofcode.com/2019/day/8

const fs = require('fs');

let image = fs.readFileSync('08input.txt', 'utf8').split('');
// let image = fs.readFileSync('08debug.txt', 'utf8').split('');


// Images are sent as a series of digits that each represent the color of a single pixel.
// The digits fill each row of the image left-to-right, then move downward to the next row, filling rows top-to-bottom until every pixel of the image is filled.
// Each image actually consists of a series of identically-sized layers that are filled in this way
// 

// let WIDTH = 3;
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
    block.digits.push(image[i]);
    if (image[i] === '0') block.zeros++;
    if (image[i] === '1') block.ones++;
    if (image[i] === '2') block.twos++;
    // console.log(i);
  }
  // console.log("\n");
  blocks.push(block);
}

let blockWithFewestZeros = null;
for (let block of blocks) {
  if (!blockWithFewestZeros || block.zeros < blockWithFewestZeros.zeros) {
    blockWithFewestZeros = block;
  }
}

// console.log(blockWithFewestZeros);
console.log(blockWithFewestZeros.ones * blockWithFewestZeros.twos);
