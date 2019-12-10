import { join } from "path";

import {
  parser,
  maximiseVisibleAsteroids,
  sortAsteroidsByAngleAndMagnitude,
  findNthAsteroid,
} from "../src/monitor";
import Vector from "../../../2018/10-the-stars-align/src/Vector";

describe("Day 10: Monitoring Station", () => {
  describe("part 1", () => {
    test("should parse simple", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      const best = maximiseVisibleAsteroids(input);
      expect(best.get("count")).toEqual(347);
    });
  });
  describe("part 2", () => {
    test("should parse simple", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      const best = maximiseVisibleAsteroids(input).get("vector");
      if (best instanceof Vector) {
        const sortedAsteroids = sortAsteroidsByAngleAndMagnitude(input, best);
        const asteroid = findNthAsteroid(sortedAsteroids, 200).addVector(best);
        expect(asteroid.getX() * 100 + asteroid.getY()).toEqual(829);
      }
    });
  });
});
