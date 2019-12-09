import { join } from "path";
import { List, Repeat } from "immutable";

import {
  compute,
  parser,
} from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

describe("day 9 - Sensor boost", () => {
  describe("part 1", () => {
    test("should return a quine", async () => {
      const quine = await parser(join(__dirname, "testfiles", "quine.txt"));
      expect(compute(quine.concat(Repeat(0, 10000)), List())).toEqual(quine);
    });
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(compute(input.concat(Repeat(0, 10000)), List.of(1)).first()).toBe(3742852857);
    });
  });
  describe("part 2", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(compute(input.concat(Repeat(0, 10000)), List.of(2)).first()).toBe(73439);
    });
  });
});
