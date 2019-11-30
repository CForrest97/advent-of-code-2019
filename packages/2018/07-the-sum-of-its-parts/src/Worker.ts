// eslint-disable-next-line no-unused-vars
import Node from "./Node";

export default class Worker {
  task: Node;

  workRemaining: number = 0;

  public addTask(node: Node, taskDelay: number) {
    this.task = node;
    this.workRemaining = this.task.id.charCodeAt(0) - 65 + taskDelay;
  }

  public isAvailable(): boolean {
    return this.workRemaining === 0;
  }

  public tick(): void {
    this.workRemaining = Math.max(this.workRemaining - 1, 0);
  }
}
