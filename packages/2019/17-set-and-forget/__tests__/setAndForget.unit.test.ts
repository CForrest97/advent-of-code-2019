import { join } from "path";

import {
  parser,
} from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

import part1 from "../src/setAndForget";

describe("Day 17: Set and Forget", () => {
  describe("part 1", () => {
    test("input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(part1(input)).toEqual(482);
    });
  });
});
