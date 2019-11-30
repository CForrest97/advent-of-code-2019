import { Map, Set} from "immutable";
import Node from "./Node";

export default class Graph {
  private availableNodes: Set<Node> = Set();

  private visitedNodes: Set<Node> = Set();

  public addNode(id) {
    if (!this.getNode(id)) {
      this.availableNodes = this.availableNodes.add(new Node(id));
    }
  }

  public getNode(id) {
    return this.availableNodes.find(node => node.id === id);
  }

  public addDependency(dependentId, dependencyId) {
    this.getNode(dependentId).addDependency(dependencyId);
  }

  public getAvailableNodes(): Set<Node> {
    return this.availableNodes.filter(
      node => node.dependencies.subtract(this.visitedNodes.map(n => n.id)).isEmpty(),
    ).sortBy(node => node.id);
  }

  public visitNode(node: Node) {
    this.visitedNodes = this.visitedNodes.add(node);
    this.availableNodes = this.availableNodes.remove(node);
  }
}
