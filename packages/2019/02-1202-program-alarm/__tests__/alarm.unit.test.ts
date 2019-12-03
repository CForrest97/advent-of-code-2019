import { join } from "path";
import { List } from "immutable";

import {
  gravityAssist,
  parser,
  targetGravityAssist,
} from "../src/alarm";

describe("day 2 - 1202 Program Alarm", () => {
  describe("part 1", () => {
    test("should program the alarm with 1, 0, 0, 0, 99", () => {
      const input = List([1, 0, 0, 0, 99]);
      expect(gravityAssist(input, 0, 0)).toBe(2);
    });

    test("should parse the input with 1,0,0,0,99", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([1, 0, 0, 0, 99]));
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(gravityAssist(parsedFile)).toEqual(4570637);
    });
  });

  describe("part 2", () => {
    test("should reverse engineer part1 input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(targetGravityAssist(parsedFile, 4570637)).toBe(1202);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(targetGravityAssist(parsedFile, 19690720)).toEqual(5485);
    });
  });
});
