// eslint-disable-next-line no-unused-vars
import { List } from "immutable";

export default class Vector {
  public components: List<number>;

  constructor(...components) {
    this.components = List(components);
  }

  public getX() {
    return this.components.get(0);
  }

  public getY() {
    return this.components.get(1);
  }

  public getZ() {
    return this.components.get(2);
  }

  public scaleVector(scalar: number) {
    return new Vector(this.components.map(component => component + scalar));
  }

  public getMagnitude(): number {
    return Math.hypot(...this.components);
  }

  public getManhattanDistance(v2: Vector): number {
    return this.components.zip(v2.components)
      .map(([a, b]) => Math.abs(a - b))
      .reduce((subtotal, x) => subtotal + x, 0);
  }

  public addVector(v2: Vector) {
    return new Vector(...this.components.zip(v2.components).map(([a, b]) => a + b));
  }

  // public subtractVector(v2: Vector) {
  //   return new Vector(this.components.zip(v2.components).map(([a, b]) => a - b));
  // }

  public toString(): string {
    return this.components.join(",");
  }
}
