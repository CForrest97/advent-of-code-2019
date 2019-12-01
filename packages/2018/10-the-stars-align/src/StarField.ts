import { List, Repeat } from "immutable";

// eslint-disable-next-line no-unused-vars
import Star from "./Star";

export default class StarField {
  private stars: List<Star> = List();

  public addStar(star: Star): void {
    this.stars = this.stars.push(star);
  }

  public tick(): void {
    this.stars.forEach(star => star.tick());
  }

  public getWidth() {
    const minX: number = this.stars.map(star => star.getPosition().getX()).min();
    const maxX: number = this.stars.map(star => star.getPosition().getX()).max();
    return maxX - minX + 1;
  }

  public getHeight() {
    const minY: number = this.stars.map(star => star.getPosition().getY()).min();
    const maxY: number = this.stars.map(star => star.getPosition().getY()).max();
    return maxY - minY + 1;
  }

  public toString(): string {
    const minY: number = this.stars.map(star => star.getPosition().getY()).min();
    const minX: number = this.stars.map(star => star.getPosition().getX()).min();

    let field: List<List<string>> = List(Repeat(List(Repeat(" ", this.getWidth())), this.getHeight()));

    this.stars.forEach(star => {
      field = field.update(star.getPosition().getY() - minY, row => row.update(star.getPosition().getX() - minX, () => "*"));
    });

    return field.map(row => row.join("")).join("\n");
  }
}
