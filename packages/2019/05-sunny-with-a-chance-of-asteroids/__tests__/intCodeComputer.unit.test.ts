import { join } from "path";
import { List } from "immutable";

import {
  compute,
  parser,
  getParameterModes,
} from "../src/intCodeComputer";

describe("day 5 - Sunny with a Chance of Asteroids", () => {
  describe("part 1", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(compute(input, List.of(1)).last()).toBe(13285749);
    });
    test("should get parameter modes correctly", () => {
      expect(getParameterModes(1001)).toEqual(List.of(0, 1, 0));
      expect(getParameterModes(1101)).toEqual(List.of(1, 1, 0));
      expect(getParameterModes(10001)).toEqual(List.of(0, 0, 1));
    });
  });
  describe("part 2", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(compute(input, List.of(5)).last()).toBe(5000972);
    });
  });
});
