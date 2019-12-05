import { join } from "path";
import { List } from "immutable";

import {
  calculateReductionLength,
  calculateReductionLengthWithRemoval,
  parser,
} from "../src/alchemicalReduction";

describe("day 5 - Alchemical Reduction", () => {
  describe("part 1", () => {
    test("should react polymer from ABba", () => {
      expect(calculateReductionLength("AaBb")).toEqual(0);
    });
    // test("should parse the simple file", async () => {
    //   const file = join(__dirname, "testfiles", "simpleInput.txt");
    //   const parsedFile = await parser(file);
    //   expect(parsedFile).toEqual(List("dabAcCaCBAcCcaDA".split("")));
    // });
    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(calculateReductionLength(parsedFile)).toEqual(11476);
    });
  });

  describe("part 2", () => {
    test("should react polymer from dabAcCaCBAcCcaDA", () => {
      const input = List("dabAcCaCBAcCcaDA".split(""));
      expect(calculateReductionLengthWithRemoval(input)).toEqual(4);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(calculateReductionLengthWithRemoval(parsedFile)).toEqual(5446);
    });
  });
});
