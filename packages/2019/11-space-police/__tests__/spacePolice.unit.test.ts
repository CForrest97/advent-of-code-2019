import { join } from "path";

import { getPath, draw } from "../src/spacePolice";
import { parser } from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

describe("day 11 - Space Police", () => {
  describe("part 1", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      expect(getPath(input, 0).size).toEqual(2539);
    });
  });
  describe("part 2", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      const path = getPath(input, 1);
      expect(path.size).toEqual(249);
      expect(draw(path).length).toEqual(286);
    });
  });
});
