import { join } from "path";

import {
  parser,
  breakdownChemical,
  search,
} from "../src/stoichiometry";

describe("Day 10: Monitoring Station", () => {
  describe("part 1", () => {
    test("input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(breakdownChemical(input)).toEqual(783895);
    });
  });
  describe("part 2", () => {
    test("input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(search(input, 1000000000000, 783895, 7838950)).toEqual(1896688);
    });
  });
});
