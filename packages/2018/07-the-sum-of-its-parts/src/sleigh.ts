import { List, Range } from "immutable";
import { promises as fs } from "fs";

// eslint-disable-next-line no-unused-vars
import Node from "./Node";
import Graph from "./Graph";
import Worker from "./Worker";

const traverseGraph = (graph): string => {
  let traversedNodes: List<Node> = List();

  while (graph.getAvailableNodes().size) {
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

const generateGraph = (dependencies): Graph => {
  const graph: Graph = new Graph();
  dependencies.flatten().forEach(s => graph.addNode(s));

  dependencies.forEach(
    ([dependencyId, dependentId]) => graph.addDependency(dependentId, dependencyId),
  );
  return graph;
};

const calculateTime = (graph: Graph, workerCount: number, taskDelay: number): number => {
  let tickCount = 0;
  let workers: List<Worker> = List();
  Range(0, workerCount).forEach(() => {
    workers = workers.push(new Worker());
  });

  while (graph.unvisitedNodes.size + graph.inProgressNodes.size) {
    workers.forEach(worker => worker.tick());
    const availableWorkers = workers.filter(worker => worker.isAvailable());
    const availableTasks = graph.getAvailableNodes();
    availableWorkers.forEach(worker => graph.finishNode(worker.task));
    availableWorkers.zip(availableTasks).forEach(([worker, task]) => {
      graph.startNode(task);
      worker.addTask(task, taskDelay);
    });
    tickCount += 1;
  }
  return tickCount;
};

export {
  traverseGraph,
  parser,
  generateGraph,
  calculateTime,
};
