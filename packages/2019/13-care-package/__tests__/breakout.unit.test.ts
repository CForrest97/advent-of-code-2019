import { join } from "path";
import { List, Repeat } from "immutable";

import {
  parser,
} from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

import {
  loadBreakout,
  countBlocks,
} from "../src/breakout";
import IntcodeComputer from "../../11-space-police/src/IntcodeComputer";

describe("day 13: care package", () => {
  describe("part 1", () => {
    test("should count blocks", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      const c = new IntcodeComputer(input, List());
      c.compute();
      expect(countBlocks(c.getOutputs())).toBe(251);
    });
  });
  describe("part 2", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(loadBreakout(input.set(0, 2).concat(Repeat(0, 10000)))).toBe(12779);
    });
  });
});
