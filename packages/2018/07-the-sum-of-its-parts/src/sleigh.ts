import { List, Map, Set } from "immutable";
import { promises as fs } from "fs";

import Node from "./Node";
import Graph from "./Graph";

const traverseGraph = (dependencies): string => {
  let traversedNodes: List<Node> = List();
  const graph: Graph = new Graph();
  dependencies.flatten().forEach(s => graph.addNode(s));

  dependencies.forEach(
    ([dependencyId, dependentId]) => graph.addDependency(dependentId, dependencyId),
  );
  // const x = graph.getAvailableNodes().first();
  while (graph.getAvailableNodes().size > 0) {
    const nextNode: Node = graph.getAvailableNodes().first();
    traversedNodes = traversedNodes.push(nextNode);
    graph.visitNode(nextNode);
  }

  return traversedNodes.map(node => node.id).join("");
};

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  return List(contents.toString().split("\n"))
    .map(s => List(s.match(/Step (.*) must be finished before step (.*) can begin./)).shift());
};

export {
  traverseGraph,
  parser,
};
