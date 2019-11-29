import { join } from "path";
import { List, Map } from "immutable";

import {
  findLargestFiniteArea,
  parser,
  countSafestRegionsArea,
} from "../src/chronalCoordinates";

describe("day 6 - Chronal Coordinates", () => {
  describe("part 1", () => {
    test("should findLargestFiniteArea", () => {
      const input = List([
        Map({ id: 0, x: 1, y: 1 }),
        Map({ id: 1, x: 1, y: 6 }),
        Map({ id: 2, x: 8, y: 3 }),
        Map({ id: 3, x: 3, y: 4 }),
        Map({ id: 4, x: 5, y: 5 }),
        Map({ id: 5, x: 8, y: 9 }),
      ]);
      expect(findLargestFiniteArea(input)).toEqual(17);
    });
    test("should parse the simple file", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([
        Map({ id: 0, x: 1, y: 1 }),
        Map({ id: 1, x: 1, y: 6 }),
        Map({ id: 2, x: 8, y: 3 }),
        Map({ id: 3, x: 3, y: 4 }),
        Map({ id: 4, x: 5, y: 5 }),
        Map({ id: 5, x: 8, y: 9 }),
      ]));
    });
    test.skip("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(findLargestFiniteArea(parsedFile)).toEqual(3420);
    });
  });

  describe("part 2", () => {
    test("should react polymer from dabAcCaCBAcCcaDA", () => {
      const input = List([
        Map({ id: 0, x: 1, y: 1 }),
        Map({ id: 1, x: 1, y: 6 }),
        Map({ id: 2, x: 8, y: 3 }),
        Map({ id: 3, x: 3, y: 4 }),
        Map({ id: 4, x: 5, y: 5 }),
        Map({ id: 5, x: 8, y: 9 }),
      ]);
      expect(countSafestRegionsArea(input, 32)).toEqual(16);
    });

    test.skip("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(countSafestRegionsArea(parsedFile, 10000)).toEqual(46667);
    });
  });
});
