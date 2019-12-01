import { promises as fs } from "fs";
import { List } from "immutable";

import Vector from "./Vector";
import StarField from "./StarField";
import Star from "./Star";

const alignStars = (positions: List<Vector>, velocities: List<Vector>, maxTicks: number) => {
  const starField: StarField = new StarField();

  positions.zip(velocities).forEach(([pos, vel]) => starField.addStar(new Star(pos, vel)));

  let possibleSolutions = List();
  for (let tickCount = 0; tickCount < maxTicks; tickCount += 1) {
    starField.tick();

    if (starField.getWidth() < 2000 && starField.getHeight() < 15) {
      possibleSolutions = possibleSolutions.push(`${starField.toString()}\n${tickCount + 1}`);
    }
  }
  return possibleSolutions;
};

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  const lines = List(contents.toString().split("\n"));
  let positions: List<Vector> = List();
  let velocities: List<Vector> = List();
  lines.forEach(line => {
    const [, xPosition, yPosition, xVelocity, yVelocity] = line.match(/position=<(.*), (.*)> velocity=<(.*), (.*)>/);
    positions = positions.push(new Vector(parseInt(xPosition, 10), parseInt(yPosition, 10)));
    velocities = velocities.push(new Vector(parseInt(xVelocity, 10), parseInt(yVelocity, 10)));
  });
  return [positions, velocities];
};

export {
  alignStars,
  parser,
};
