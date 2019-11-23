import { join } from "path";
import { List } from "immutable";

import {
  calculateFrequency,
  parser,
  calculateFrequencyFoundTwice,
} from "../src/chronalCalibration";

describe("day 1 - Chronal Calibration", () => {
  describe("part 1", () => {
    test("should calculate frequency from +1, -2, +3, +1", () => {
      const input = List([+1, -2, +3, +1]);
      expect(calculateFrequency(input)).toBe(3);
    });

    test("should calculate frequency from +1, +1, +1", () => {
      const input = List([+1, +1, +1]);
      expect(calculateFrequency(input)).toBe(3);
    });

    test("should calculate frequency from +1, +1, -2", () => {
      const input = List([+1, +1, -2]);
      expect(calculateFrequency(input)).toBe(0);
    });

    test("should calculate frequency from -1, -2, -3", () => {
      const input = List([-1, -2, -3]);
      expect(calculateFrequency(input)).toBe(-6);
    });

    test("should parse the file with +1, -2, +1", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([+1, -2, +1]));
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(calculateFrequency(parsedFile)).toEqual(472);
    });
  });

  describe("part 2", () => {
    test("should calculate first duplicate frequency from +1, -2, +3, +1", () => {
      const input = List([+1, -2, +3, +1]);
      expect(calculateFrequencyFoundTwice(input)).toBe(2);
    });

    test("should calculate first duplicate frequency from +3, +3, +4, -2, -4", () => {
      const input = List([+3, +3, +4, -2, -4]);
      expect(calculateFrequencyFoundTwice(input)).toBe(10);
    });

    test("should calculate first duplicate frequency from -6, +3, +8, +5, -6", () => {
      const input = List([-6, +3, +8, +5, -6]);
      expect(calculateFrequencyFoundTwice(input)).toBe(5);
    });

    test("should calculate first duplicate frequency from +7, +7, -2, -7, -4", () => {
      const input = List([+7, +7, -2, -7, -4]);
      expect(calculateFrequencyFoundTwice(input)).toBe(14);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(calculateFrequencyFoundTwice(parsedFile)).toEqual(66932);
    });
  });
});
