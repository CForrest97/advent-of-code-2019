import { join } from "path";

import {
  compute,
  parser,
} from "../src/intCodeComputer";

describe("day 5 - Sunny with a Chance of Asteroids", () => {
  describe("part 1", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(compute(input, 1).last()).toBe(13285749);
    });
  });
  describe("part 2", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(compute(input, 5).last()).toBe(5000972);
    });
  });
});
