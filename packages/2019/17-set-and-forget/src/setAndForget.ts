/* eslint-disable no-loop-func */
import { List, Set } from "immutable";
import IntcodeComputer from "../../11-space-police/src/IntcodeComputer";
import Vector from "../../12/src/Vector";

const directions = List.of(
  new Vector(0, 1),
  new Vector(0, -1),
  new Vector(-1, 0),
  new Vector(1, 0),
);

const getAdjacentPositions = (position: Vector): List<Vector> => List(
  directions.map(direction => direction.addVector(position)),
);

const ascii = a => a.charCodeAt(0);

const part2 = (intcode: List<number>) => {
  const A = "L,4,L,6,L,8,L,12".split("").map(ascii);
  const B = "L,8,R,12,L,12".split("").map(ascii);
  const C = "R,12,L,6,L,6,L,8".split("").map(ascii);

  const mainRoutine = "A,B,B,A,B,C,A,C,B,C".split("").map(ascii);

  const mode = "n".split("").map(ascii);
  const inputs: List<number> = List.of(mainRoutine, A, B, C, mode).interpose(ascii(10));

  const c = new IntcodeComputer(intcode, inputs);
  c.compute();
  return c.getOutputs().last();
};

const part1 = (intcode: List<number>) => {
  const c = new IntcodeComputer(intcode, List());
  c.compute();
  const s = String.fromCharCode(...c.getOutputs());
  let walls = Set();

  List(s.split("\n")).forEach((row, y) => {
    (row.split("").forEach((tile, x) => {
      if (tile === "#") {
        walls = walls.add(new Vector(x, y));
      }
    }));
  });

  let intersections = List();

  walls.forEach(wall => {
    let neighbours = getAdjacentPositions(wall);
    const wallStrings = List(walls).map(wall2 => wall2.toString());
    neighbours = neighbours.filter(neighbour => wallStrings.includes(neighbour.toString()));
    if (neighbours.size === 4) {
      intersections = intersections.push(wall.getX() * wall.getY());
    }
  });

  return intersections.reduce((sub, x) => sub + x);
};

export default part2;
