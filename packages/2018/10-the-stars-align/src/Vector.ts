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
    this.x += v2.getX();
    this.y += v2.getY();
  }
}
