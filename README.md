# Advent of Code 2019 🎄

Once again, I've decided to semi-seriously take part in this year's [Advent of Code](https://adventofcode.com/2019). I'll be solving this year's puzzles in JavaScript.

## Day 1: [The Tyranny of the Rocket Equation](https://adventofcode.com/2019/day/1)

- `Math.round()` vs. `Math.floor()`
- recursion in part two

## Day 2: [1202 Program Alarm](https://adventofcode.com/2019/day/2)

- memory, instructions, instruction pointer
- tried to copy an Array by doing `arr.splice()` without args which doesn't work, went with `arr.concat([])` instead

## Day 3: [Crossed Wires](https://adventofcode.com/2019/day/3)

- remeber [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry)?
- tried to rewrite an ugly if-then (4 possible single-character options) into a switch-case, looked even uglier. fuck switch-case.
- TODO my variable/function naming sucks, how can we improve?
- TODO should we try visualizing the 'wires'? would that look cool?

## Day 4: [Secure Container](https://adventofcode.com/2019/day/4)

- [what  did we learn today?](https://www.youtube.com/watch?v=J6VjPM5CeWs)

## Day 5: [Sunny with a Chance of Asteroids](https://adventofcode.com/2019/day/5)

- reading and concentrating on the task was the hardest part, the implementation itself is quite trivial
- TODO tidy up

## Day 6: [Universal Orbit Map](https://adventofcode.com/2019/day/6)

- had to Google for part 2, decided on a pretty limited data structure for part 1 and didn't know how to quickly dig myself out of that
- figured finding common ancestor would be the way to go, if we're already traversing each object's path backward towards root, might as well return the paths & compare
- TODO do a couple more Tree, Graph, shortest-path, Dijkstra problems to remember / learn more
