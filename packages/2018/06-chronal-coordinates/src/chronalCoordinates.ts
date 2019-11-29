import { List, Map, Set } from "immutable";
import { promises as fs } from "fs";

const getNearestNode = (x, y, nodes) => {
  const sortedNodes = nodes.map(
    node => Map({
      id: node.get("id"),
      distance: Math.abs(node.get("x") - x) + Math.abs(node.get("y") - y),
    }),
  ).sortBy(node => node.get("distance"));
  const first = sortedNodes.get(0);
  const second = sortedNodes.get(1);
  if (first.get("distance") === second.get("distance")) {
    return Map({ node: -1, distance: first.get("distance") });
  }
  return first;
};

const parser = async (filePath: string) => {
  const contents: Buffer = await fs.readFile(filePath);
  return List(contents.toString().split("\n")).map((s, id) => Map({
    id,
    x: parseInt(s.substring(0, s.indexOf(", ")), 10),
    y: parseInt(s.substring(s.indexOf(", ") + 2), 10),
  }));
};

const findLargestFiniteArea = nodes => {
  const maxX = nodes.maxBy(node => node.get("x")).get("x");
  const maxY = nodes.maxBy(node => node.get("y")).get("y");

  let grid = List();

  for (let y = 0; y <= maxY; y += 1) {
    let row = List();
    for (let x = 0; x <= maxX; x += 1) {
      row = row.push(getNearestNode(x, y, nodes));
    }
    grid = grid.push(row);
  }

  const infiniteNodes = Set(
    grid.first()
      .concat(grid.last())
      .concat(grid.map(row => row.first()))
      .concat(grid.map(row => row.last()))
      .map(node => node.get("id")),
  );

  let scores = grid.flatten(1).countBy(node => node.get("id"));

  List(infiniteNodes).forEach(node => {
    scores = scores.delete(node);
  });

  return scores.max();
};

const sumDistances = (x, y, nodes) => nodes
  .map(node => Math.abs(node.get("x") - x) + Math.abs(node.get("y") - y))
  .reduce((total, n) => total + n, 0);

const countSafestRegionsArea = (nodes, maxDistance) => {
  const maxX = nodes.maxBy(node => node.get("x")).get("x");
  const maxY = nodes.maxBy(node => node.get("y")).get("y");

  let distances = List();

  for (let y = 0; y <= maxY; y += 1) {
    for (let x = 0; x <= maxX; x += 1) {
      distances = distances.push(sumDistances(x, y, nodes));
    }
  }

  return distances.filter(d => d < maxDistance).count();
};


export {
  findLargestFiniteArea,
  parser,
  countSafestRegionsArea,
};
