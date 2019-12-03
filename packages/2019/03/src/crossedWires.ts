import { List, Map, Set } from "immutable";
import { promises as fs } from "fs";
import Wire from "./Wire";
import Vector from "../../../2018/10-the-stars-align/src/Vector";

const parser = async (filePath: string): Promise<List<List<Map<string, string | number>>>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const wires = List(contents.toString().split("\n"));
  return wires.map(wire => List(wire.split(",")).map(instruction => Map({
    direction: instruction.charAt(0),
    magnitude: parseInt(instruction.slice(1), 10),
  })));
};

const generateWire = instuctions => {
  const wire = new Wire(new Vector(0, 0));
  instuctions.forEach(instuction => {
    wire.addJunction(instuction);
  });
  return wire;
};

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
function intersect(v1: Vector, v2: Vector, v3: Vector, v4: Vector): Vector {
  const x1 = v1.getX();
  const y1 = v1.getY();
  const x2 = v2.getX();
  const y2 = v2.getY();
  const x3 = v3.getX();
  const y3 = v3.getY();
  const x4 = v4.getX();
  const y4 = v4.getY();
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return undefined;
  }

  const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // Lines are parallel
  if (denominator === 0) {
    return undefined;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return undefined;
  }

  // Return a object with the x and y coordinates of the intersection
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return new Vector(x, y);
}

const getDistance = (v1: Vector, v2: Vector) => Math.abs(v2.getX() - v1.getX())
  + Math.abs(v2.getY() - v1.getY());

const getDistances = (intersectionPoint, junction1, junction2) => Map({
  manhattan: getDistance(intersectionPoint, new Vector(0, 0)),
  distance:
    getDistance(intersectionPoint, junction1.get("position"))
    + getDistance(intersectionPoint, junction2.get("position"))
    + junction1.get("distance")
    + junction2.get("distance"),
});

const findCrosses = (wire1: Wire, wire2: Wire) => {
  let crosses = Set();

  for (let i = 0; i < wire1.junctions.size - 1; i += 1) {
    for (let j = 0; j < wire2.junctions.size - 1; j += 1) {
      const intersection = intersect(
        wire1.junctions.get(i).get("position"),
        wire1.junctions.get(i + 1).get("position"),
        wire2.junctions.get(j).get("position"),
        wire2.junctions.get(j + 1).get("position"),
      );
      if (intersection) {
        crosses = crosses.add(
          getDistances(intersection, wire1.junctions.get(i), wire2.junctions.get(j)),
        );
      }
    }
  }
  return Map({
    manhattan: List(crosses)
      .map(x => x.get("manhattan"))
      .filterNot(d => d === 0)
      .sort()
      .first(),
    distance: List(crosses)
      .map(x => x.get("distance"))
      .filterNot(d => d === 0)
      .sort()
      .first(),
  });
};

export {
  parser,
  generateWire,
  findCrosses,
};
