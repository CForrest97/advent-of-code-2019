export default class Vector {
  private x: number;

  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public addVector(v2: Vector) {
    return new Vector(this.x + v2.getX(), this.y + v2.getY());
  }

  public scaleVector(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  public getMagnitude(): number {
    return Math.hypot(this.x, this.y);
  }

  public getManhattanDistance(v2: Vector): number {
    return Math.abs(this.x - v2.getX()) + Math.abs(this.getY() - v2.getY());
  }

  public subtractVector(v2: Vector) {
    return new Vector(this.x - v2.getX(), this.y - v2.getY());
  }

  public getAngleFromVertical(): number {
    return (Math.atan2(this.x, -this.y) + 2 * Math.PI) % (2 * Math.PI);
  }

  public toString(): string {
    return `${this.x},${this.y}`;
  }
}
