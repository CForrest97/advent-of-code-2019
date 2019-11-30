import { join } from "path";
import { List } from "immutable";

import {
  traverseGraph,
  parser,
  generateGraph,
  calculateTime,
} from "../src/sleigh";

describe("day 7 - The Sum of Its Parts", () => {
  describe("part 1", () => {
    test("should traverse the graph", () => {
      const input = List([
        List(["C", "A"]),
        List(["C", "F"]),
        List(["A", "B"]),
        List(["A", "D"]),
        List(["B", "E"]),
        List(["D", "E"]),
        List(["F", "E"]),
      ]);
      const graph = generateGraph(input);
      expect(traverseGraph(graph)).toEqual("CABDFE");
    });
    test("should parse the simple file", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([
        List(["C", "A"]),
        List(["C", "F"]),
        List(["A", "B"]),
        List(["A", "D"]),
        List(["B", "E"]),
        List(["D", "E"]),
        List(["F", "E"]),
      ]));
    });
    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      const graph = generateGraph(parsedFile);
      expect(traverseGraph(graph)).toEqual("JDEKPFABTUHOQSXVYMLZCNIGRW");
    });
  });

  describe("part 2", () => {
    test("should find the time to complete the graph with 2 workers", () => {
      const input = List([
        List(["C", "A"]),
        List(["C", "F"]),
        List(["A", "B"]),
        List(["A", "D"]),
        List(["B", "E"]),
        List(["D", "E"]),
        List(["F", "E"]),
      ]);
      const graph = generateGraph(input);
      expect(calculateTime(graph, 2, 0)).toEqual(15);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      const graph = generateGraph(parsedFile);
      expect(calculateTime(graph, 5, 60)).toEqual(1048);
    });
  });
});
