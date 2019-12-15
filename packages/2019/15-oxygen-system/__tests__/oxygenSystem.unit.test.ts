import { join } from "path";

import {
  parser,
} from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

import discover from "../src/oxygenSystem";

describe("Day 10: Monitoring Station", () => {
  describe("part 1", () => {
    test("getTotalEnergyAfterNSteps", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(discover(input)).toEqual(1896688);
    });
  });
  // describe("part 2", () => {
  //   test("should parse simple", async () => {
  //     expect([1, 2, 3, 4, 5].reduce(lowestCommonMultiple)).toEqual(60);
  //   });
  //   test.skip("calculateCycleLength", async () => {
  //     const input = await parser(join(__dirname, "testfiles", "input.txt"));
  //     expect(calculateCycleLength(input)).toEqual(537881600740876);
  //   });
  // });
});
