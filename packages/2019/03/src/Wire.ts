import { List, Map } from "immutable";

import Vector from "../../../2018/10-the-stars-align/src/Vector";

export default class Wire {
  private currentPosition: Vector;

  public junctions = List();

  private counter = 0;

  constructor(currentPosition: Vector) {
    this.junctions = List.of(Map({ position: currentPosition, distance: this.counter }));
    this.currentPosition = currentPosition;
  }

  public addJunction(instruction) {
    let newX = this.currentPosition.getX();
    let newY = this.currentPosition.getY();

    if (instruction.get("direction") === "R") {
      newX += instruction.get("magnitude");
    } else if (instruction.get("direction") === "L") {
      newX -= instruction.get("magnitude");
    } else if (instruction.get("direction") === "U") {
      newY += instruction.get("magnitude");
    } else if (instruction.get("direction") === "D") {
      newY -= instruction.get("magnitude");
    }
    this.counter += instruction.get("magnitude");

    this.currentPosition = new Vector(newX, newY);
    this.junctions = this.junctions.push(
      Map({ position: new Vector(newX, newY), distance: this.counter }),
    );
  }
}
