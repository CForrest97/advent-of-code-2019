import { join } from "path";

import {
  parser,
} from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

import discover from "../src/oxygenSystem";

describe("Day 10: Monitoring Station", () => {
  describe("part 2", () => {
    test("getTotalEnergyAfterNSteps", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(discover(input)).toEqual(482);
    });
  });
});
