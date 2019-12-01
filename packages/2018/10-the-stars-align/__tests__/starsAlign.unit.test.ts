import { join } from "path";
import { List } from "immutable";

import {
  alignStars,
  parser,
} from "../src/starsAlign";

import Vector from "../src/Vector";

describe("day 10 - The stars align", () => {
  describe("part 1", () => {
    test("should draw a starField", () => {
      const positions = List([
        new Vector(9, 1),
        new Vector(7, 0),
        new Vector(3, -2),
        new Vector(6, 10),
        new Vector(2, -4),
        new Vector(-6, 10),
        new Vector(1, 8),
        new Vector(1, 7),
        new Vector(-3, 11),
        new Vector(7, 6),
        new Vector(-2, 3),
        new Vector(-4, 3),
        new Vector(10, -3),
        new Vector(5, 11),
        new Vector(4, 7),
        new Vector(8, -2),
        new Vector(15, 0),
        new Vector(1, 6),
        new Vector(8, 9),
        new Vector(3, 3),
        new Vector(0, 5),
        new Vector(-2, 2),
        new Vector(5, -2),
        new Vector(1, 4),
        new Vector(-2, 7),
        new Vector(3, 6),
        new Vector(5, 0),
        new Vector(-6, 0),
        new Vector(5, 9),
        new Vector(14, 7),
        new Vector(-3, 6),
      ]);

      const velocities = List([
        new Vector(0, 2),
        new Vector(-1, 0),
        new Vector(-1, 1),
        new Vector(-2, -1),
        new Vector(2, 2),
        new Vector(2, -2),
        new Vector(1, -1),
        new Vector(1, 0),
        new Vector(1, -2),
        new Vector(-1, -1),
        new Vector(1, 0),
        new Vector(2, 0),
        new Vector(-1, 1),
        new Vector(1, -2),
        new Vector(0, -1),
        new Vector(0, 1),
        new Vector(-2, 0),
        new Vector(1, 0),
        new Vector(0, -1),
        new Vector(-1, 1),
        new Vector(0, -1),
        new Vector(2, 0),
        new Vector(1, 2),
        new Vector(2, 1),
        new Vector(2, -2),
        new Vector(-1, -1),
        new Vector(1, 0),
        new Vector(2, 0),
        new Vector(1, -2),
        new Vector(-2, 0),
        new Vector(2, -1),
      ]);

      expect(alignStars(positions, velocities, 3)).toEqual("CABDFE");
    });
    test("should parse the simple file", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);

      const expectedPositions = List([
        new Vector(9, 1),
        new Vector(7, 0),
      ]);

      const expectedVelocities = List([
        new Vector(0, 2),
        new Vector(-1, 0),
      ]);

      expect(parsedFile).toEqual([expectedPositions, expectedVelocities]);
    });
    test.only("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const [positions, velocities] = await parser(file);
      const starfield = alignStars(positions, velocities, 11000);
      expect(starfield.size).toEqual(1);
      // expect(`\n${starfield.get(0)}`).toBe(undefined);
    });
  });

  // describe("part 2", () => {
  //   test("should find the time to complete the graph with 2 workers", () => {
  //     const input = List([
  //       List(["C", "A"]),
  //       List(["C", "F"]),
  //       List(["A", "B"]),
  //       List(["A", "D"]),
  //       List(["B", "E"]),
  //       List(["D", "E"]),
  //       List(["F", "E"]),
  //     ]);
  //     const graph = generateGraph(input);
  //     expect(calculateTime(graph, 2, 0)).toEqual(15);
  //   });

  //   test("input question", async () => {
  //     const file = join(__dirname, "testfiles", "input.txt");
  //     const parsedFile = await parser(file);
  //     const graph = generateGraph(parsedFile);
  //     expect(calculateTime(graph, 5, 60)).toEqual(1048);
  //   });
  // });
});
