/* eslint-disable no-loop-func */
import { List, Map } from "immutable";
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

const traverseKnownAreas = (knownAreas: Map<string, number>, startingPosition: Vector) => {
  let currentPosition = startingPosition;

  let measuredAreas: Map<string, number> = Map();
  measuredAreas = measuredAreas.set(currentPosition.toString(), 0);
  while (true) {
    const currentDistance = measuredAreas.get(currentPosition.toString());
    const options = getAdjacentPositions(currentPosition);
    const bestOption = options
      .find(option => measuredAreas.get(option.toString()) === undefined
        && knownAreas.get(option.toString()) !== 9999);
    if (bestOption) {
      currentPosition = bestOption;
    } else {
      currentPosition = options
        .filter(option => knownAreas.get(option.toString()) !== 9999)
        .minBy(option => measuredAreas.get(option.toString()));
      if (currentPosition.components.equals(List.of(-18, -12))) {
        break;
      }
    }
    measuredAreas = measuredAreas.update(
      currentPosition.toString(),
      value => Math.min(value || 9999, currentDistance + 1),
    );
  }
  return List(measuredAreas.values()).max();
};

const discover = (intcode: List<number>) => {
  let knownAreas: Map<string, number> = Map();

  const c = new IntcodeComputer(intcode, List());
  c.compute();

  let currentPosition = new Vector(0, 0);
  knownAreas = knownAreas.set(currentPosition.toString(), 0);

  while (true) {
    const options = getAdjacentPositions(currentPosition);
    const bestOption = options
      .find(option => knownAreas.get(option.toString()) === undefined);
    let preferredPosition;
    if (bestOption) {
      preferredPosition = bestOption;
    } else {
      preferredPosition = options.minBy(option => knownAreas.get(option.toString()));
    }
    const i = options.findIndex(x => x === preferredPosition);
    c.addInput(i + 1);
    if (currentPosition.components.equals(List.of(0, 0))
      && knownAreas.get(preferredPosition.toString()) === 1
    ) break;
    if (c.getOutputs().last() === 0) {
      knownAreas = knownAreas.set(preferredPosition.toString(), 9999);
    } else if (c.getOutputs().last() === 1) {
      const currentDistance = knownAreas.get(currentPosition.toString());
      knownAreas = knownAreas.update(
        preferredPosition.toString(),
        value => Math.min(value || 9999, currentDistance + 1),
      );
      currentPosition = preferredPosition;
    } else {
      const currentDistance = knownAreas.get(currentPosition.toString());
      knownAreas = knownAreas.update(
        preferredPosition.toString(),
        value => Math.min(value || 9999, currentDistance + 1),
      );
      currentPosition = preferredPosition;
    }
  }
  return traverseKnownAreas(knownAreas, new Vector(-18, -12));
};

export default discover;
