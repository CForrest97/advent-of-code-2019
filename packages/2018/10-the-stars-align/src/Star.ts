// eslint-disable-next-line no-unused-vars
import Vector from "./Vector";

export default class Node {
  private position: Vector;

  private velocity: Vector;

  constructor(position: Vector, velocity: Vector) {
    this.position = position;
    this.velocity = velocity;
  }

  public tick() {
    this.position = this.position.addVector(this.velocity);
  }

  public getPosition(): Vector {
    return this.position;
  }
}
