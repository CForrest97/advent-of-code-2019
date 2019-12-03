import { List, Map } from "immutable";

// eslint-disable-next-line no-unused-vars
import Vector from "../../../2018/10-the-stars-align/src/Vector";

export default class Wire {
  private currentPosition: Vector;

  public junctions = List();

  private distance = 0;

  constructor(currentPosition: Vector) {
    this.junctions = List.of(Map({ position: currentPosition, distance: this.distance }));
    this.currentPosition = currentPosition;
  }

  public addJunction(vector: Vector) {
    this.currentPosition = this.currentPosition.addVector(vector);
    this.distance += vector.getMagnitude();
    this.junctions = this.junctions.push(
      Map({ position: this.currentPosition, distance: this.distance }),
    );
  }
}
