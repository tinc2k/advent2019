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

## Day 7: [Amplification Circuit](https://adventofcode.com/2019/day/7)

- figured I needed permutations, googled [this blogpost](https://medium.com/@lindagmorales94/how-to-solve-a-string-permutation-problem-using-javascript-95ad5c388219) for a quick JavaScript solution
- part 2 was much more difficult, because we need to keep track of memory & instruction pointer and crucially, leave the 'amplifier' waiting for next input
- decided I wanted to try a more object-oriented approach to defining an `Amplifier` with it's internal data & methods, end result currently looks a bit like [FizzBuzz Enterprise Edition](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition)
- TODO rewrite/grok permutation method
  - spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

## Day 8: [Space Image Format](https://adventofcode.com/2019/day/8)

- playing with [characters](https://www.utf8-chartable.de/unicode-utf8-table.pl?start=9600&number=128), but not much learned otherwise?
- TODO parsing integers in current solution, but we might go back to string form, as we don't really need integers right?
