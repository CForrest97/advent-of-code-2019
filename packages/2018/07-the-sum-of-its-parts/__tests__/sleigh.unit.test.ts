import { join } from "path";
import { List, Map } from "immutable";
import Node from "../src/Node";
import Graph from "../src/Graph";

import {
  traverseGraph,
  parser,
} from "../src/sleigh";

describe("day 7 - The Sum of Its Parts", () => {
  describe("part 1", () => {
    test("should find first available node", () => {
      const input = List([
        List(["C", "A"]),
        List(["C", "F"]),
        List(["A", "B"]),
        List(["A", "D"]),
        List(["B", "E"]),
        List(["D", "E"]),
        List(["F", "E"]),
      ]);
      expect(traverseGraph(input)).toEqual("CABDFE");
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
      expect(traverseGraph(parsedFile)).toEqual("JDEKPFABTUHOQSXVYMLZCNIGRW");
    });
  });

  describe.skip("part 2", () => {
    // test("should react polymer from dabAcCaCBAcCcaDA", () => {
    //   const input = List([
    //     Map({ id: 0, x: 1, y: 1 }),
    //     Map({ id: 1, x: 1, y: 6 }),
    //     Map({ id: 2, x: 8, y: 3 }),
    //     Map({ id: 3, x: 3, y: 4 }),
    //     Map({ id: 4, x: 5, y: 5 }),
    //     Map({ id: 5, x: 8, y: 9 }),
    //   ]);
    //   expect(countSafestRegionsArea(input, 32)).toEqual(16);
    // });

    // test.skip("input question", async () => {
    //   const file = join(__dirname, "testfiles", "input.txt");
    //   const parsedFile = await parser(file);
    //   expect(countSafestRegionsArea(parsedFile, 10000)).toEqual(46667);
    // });
  });
});
