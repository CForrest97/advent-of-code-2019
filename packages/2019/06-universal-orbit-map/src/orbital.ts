import { List, Map, Set } from "immutable";
import { promises as fs } from "fs";
import Graph from "../../../2018/07-the-sum-of-its-parts/src/Graph";
import Node from "../../../2018/07-the-sum-of-its-parts/src/Node";

const mapOrbits = (graph: Graph) => {
  let counter = 0;
  let l = List();
  while (graph.getAvailableNodes().size > 0) {
    const availableNodes = graph.getAvailableNodes();
    for (let i = 0; i < availableNodes.size; i += 1) {
      l = l.push(counter);
      graph.visitNode(List(availableNodes).get(i));
    }

    counter += 1;
  }
  return l.reduce((sub, x) => sub + x);
};

const mapDependents = (graph: Graph, id: string) => {
  const node = graph.findNode(id).first();
  let ancestry = List.of(id);
  if (node instanceof Node) {
    let parent = graph.findNode(node.dependencies.first()).first();

    while (parent instanceof Node && parent) {
      ancestry = ancestry.push(parent.id);
      const parent2 = parent.dependencies.first();
      parent = graph.findNode(parent2).first();
    }
  }

  return ancestry;
};

const generateGraph = (dependencies): Graph => {
  const graph: Graph = new Graph();
  dependencies.flatMap(d => [d.get("dependency"), d.get("dependent")]);

  const nodes = dependencies
    .flatMap(d => [d.get("dependency"), d.get("dependent")]);
  Set(nodes).forEach(c => graph.addNode(c));


  dependencies.forEach(d => graph.addDependency(d.get("dependent"), d.get("dependency")));

  dependencies.forEach(
    (d: Map<string, string>) => graph.addDependency(d.get("dependent"), d.get("dependency")),
  );

  return graph;
};


const parser = async (filePath: string): Promise<List<Map<string, string>>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const orbitalStrings = List(contents.toString().split("\n"));
  return orbitalStrings.map(s => {
    const [, dependency, dependent] = s.match(/(.*)\)(.*)/);
    return Map({ dependency, dependent });
  });
};

export {
  generateGraph,
  mapOrbits,
  parser,
  mapDependents,
};
