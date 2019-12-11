import { List, Map, Repeat } from "immutable";

import Vector from "../../../2018/10-the-stars-align/src/Vector";
import IntcodeComputer from "./IntcodeComputer";

const directions = List.of(
  new Vector(0, 1),
  new Vector(1, 0),
  new Vector(0, -1),
  new Vector(-1, 0),
);

const getPath = (intcode: List<number>, initialSquare: number) => {
  const computer = new IntcodeComputer(intcode, List.of());
  computer.compute();

  let colours: Map<string, number> = Map({ "0,0": initialSquare });
  let currentPosition = new Vector(0, 0);
  let currentDirection = 0;

  while (!computer.isComplete()) {
    computer.addInput(colours.get(currentPosition.toString()) || 0);

    const [newColour, directionChange] = computer.getOutputs().takeLast(2);

    colours = colours.set(currentPosition.toString(), newColour);
    currentDirection += directionChange === 0 ? 3 : 5;
    currentDirection %= 4;

    currentPosition = currentPosition.addVector(directions.get(currentDirection % 4));
  }

  return colours;
};

const draw = (colours: Map<string, number>) => {
  let grid = List(Repeat(List(Repeat(" ", 40)), 7));
  colours.forEach((v, k) => {
    const [, x, y] = k.match(/(.*),(.*)/);
    if (v === 1) {
      grid = grid.update((1 - parseInt(y, 10)), row => row.update(parseInt(x, 10), () => "█"));
    }
  });
  return (grid.map(row => row.join(""))).join("\n");
};

export {
  getPath,
  draw,
};
