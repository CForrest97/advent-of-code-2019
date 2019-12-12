import Vector from "./Vector";

export default class Moon {
  private position: Vector;

  private velocity: Vector;

  constructor(position: Vector) {
    this.position = position;
    this.velocity = new Vector(0, 0, 0);
  }

  public getPosition(): Vector {
    return this.position;
  }

  public getVelocity(): Vector {
    return this.velocity;
  }

  public updatePosition(): void {
    this.position = this.position.addVector(this.velocity);
  }

  public updateVelocity(acceleration: Vector): void {
    this.velocity = this.velocity.addVector(acceleration);
  }

  public getTotalEnergy(): number {
    const potenitalEnergy = this.position.getManhattanDistance(new Vector(0, 0, 0));
    const kineticEnergy = this.velocity.getManhattanDistance(new Vector(0, 0, 0));
    return potenitalEnergy * kineticEnergy;
  }
}
