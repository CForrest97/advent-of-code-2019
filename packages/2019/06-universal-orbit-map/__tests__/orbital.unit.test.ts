import { join } from "path";
import { Set } from "immutable";
import {
  generateGraph,
  mapOrbits,
  parser,
  mapDependents,
} from "../src/orbital";

describe("day 6 - Universal Orbit Map", () => {
  describe("part 1", () => {
    test("should calculate orbits - simple inputs", async () => {
      const input = await parser(join(__dirname, "testfiles", "simpleInput.txt"));
      const graph = generateGraph(input);
      expect(mapOrbits(graph)).toBe(42);
    });
    test.skip("should calculate orbits - input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      const graph = generateGraph(input);
      expect(mapOrbits(graph)).toBe(270768);
    });
  });
  describe("part 2", () => {
    test("input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"));
      const graph = generateGraph(input);
      const you = mapDependents(graph, "YOU");
      const san = mapDependents(graph, "SAN");
      expect(Set(you).union(Set(san)).subtract(Set(you).intersect(Set(san))).size - 2).toBe(451);
    });
  });
});
