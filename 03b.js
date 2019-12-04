'use strict';

// https://adventofcode.com/2019/day/3#part2

const fs = require('fs');

let paths = fs.readFileSync('03input.txt', 'utf8').split('\n');
// let paths = fs.readFileSync('03debug.txt', 'utf8').split('\n');
let path1 = paths[0].split(',');
let path2 = paths[1].split(',');

let map1 = renderPath(path1);
let map2 = renderPath(path2);

let closest = findClosestIntersection(map1, map2);
console.log(closest);
function renderPath(path) {
  let map = {};
  let x = 0;
  let y = 0;
  let steps = 0;
  for (let instruction of path) {
    let direction = instruction[0];
    let distance = parseInt(instruction.substr(1));
    for (let i = 0; i < distance; i++) {
      if (direction === 'U') {
        y += 1;
      }
      else if (direction === 'R') {
        x += 1;
      }
      else if (direction === 'D') {
        y -= 1;
      }
      else if (direction === 'L') {
        x -= 1;
      }
      else {
        throw `wtf is ${direction}? that's not a direction.`;
      }
      steps++;
      let coords = `${x},${y}`;
      if (map[coords]) {
        // console.log(`overlap with self at ${coords}.`);
      } else {
        // each coordinate contains number of steps to get there
        map[coords] = steps;
      }
    }
  }
  return map;
}

function distanceFromCenter(x,y) {
  return Math.abs(x) + Math.abs(y);
}

function findClosestIntersection(map1, map2) {
  let closestDistance = null;
  for (let key in map1) {
    if (map2[key]) {
      let distance = distanceFromCenter(map1[key], map2[key]);
      if (closestDistance === null || distance < closestDistance) {
        closestDistance = distance;
      }
    }
  }
  return closestDistance;
}