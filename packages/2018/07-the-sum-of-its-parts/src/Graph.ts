import { Set } from "immutable";
import Node from "./Node";

export default class Graph {
  unvisitedNodes: Set<Node> = Set();

  inProgressNodes: Set<Node> = Set();

  private visitedNodes: Set<Node> = Set();

  public addNode(id) {
    if (!this.getNode(id)) {
      this.unvisitedNodes = this.unvisitedNodes.add(new Node(id));
    }
  }

  public getNode(id) {
    return this.unvisitedNodes.find(node => node.id === id);
  }

  public addDependency(dependentId, dependencyId) {
    this.getNode(dependentId).addDependency(dependencyId);
  }

  public getAvailableNodes(): Set<Node> {
    return this.unvisitedNodes.filter(
      node => node.dependencies.subtract(this.visitedNodes.map(n => n.id)).isEmpty(),
    ).sortBy(node => node.id);
  }

  public visitNode(node: Node) {
    this.visitedNodes = this.visitedNodes.add(node);
    this.unvisitedNodes = this.unvisitedNodes.remove(node);
  }

  public startNode(node: Node) {
    this.inProgressNodes = this.inProgressNodes.add(node);
    this.unvisitedNodes = this.unvisitedNodes.remove(node);
  }

  public finishNode(node: Node) {
    if (this.inProgressNodes.has(node)) {
      this.visitedNodes = this.visitedNodes.add(node);
      this.inProgressNodes = this.inProgressNodes.remove(node);
    }
  }
}
