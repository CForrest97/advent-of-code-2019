import { Set } from "immutable";

export default class Node {
  id: string;

  dependencies: Set<string> = Set();

  constructor(id: string) {
    this.id = id;
  }

  public addDependency(id: string) {
    this.dependencies = this.dependencies.add(id);
  }
}
