import { join } from "path";
import { List } from "immutable";

import {
  sumRequiredRocketFuel,
  parser,
  recursivelySumRocketFuel,
} from "../src/rocketFuel";

describe("day 1 - The Tyranny of the Rocket Equation", () => {
  describe("part 1", () => {
    test("should calculate total fuel required for 12 14 1969 100756", () => {
      const input = List([12, 14, 1969, 100756]);
      expect(sumRequiredRocketFuel(input)).toBe(34241);
    });

    test("should parse the input with 12 14 1969 100756", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([12, 14, 1969, 100756]));
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(sumRequiredRocketFuel(parsedFile)).toEqual(3432671);
    });
  });

  describe("part 2", () => {
    test("should calculate total fuel required for 12 14 1969 100756", () => {
      const input = List([12, 14, 1969, 100756]);
      expect(recursivelySumRocketFuel(input)).toBe(51316);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(recursivelySumRocketFuel(parsedFile)).toEqual(5146132);
    });
  });
});
