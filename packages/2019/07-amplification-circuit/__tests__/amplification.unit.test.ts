import { List } from "immutable";
import { join } from "path";

import {
  decimalReader,
} from "../../../utils/src/parser";

import maximiseAmplification from "../src/amplification";

describe("Day 7: Amplification Circuit", () => {
  describe("part 1", () => {
    test("should compute input question", async () => {
      const input = await decimalReader(join(__dirname, "testfiles", "input.txt"));
      expect(maximiseAmplification(input, List.of(0, 1, 2, 3, 4))).toBe(46248);
    });
  });
  describe("part 2", () => {
    test("should compute input question", async () => {
      const input = await decimalReader(join(__dirname, "testfiles", "input.txt"));
      expect(maximiseAmplification(input, List.of(5, 6, 7, 8, 9))).toBe(54163586);
    });
  });
});
