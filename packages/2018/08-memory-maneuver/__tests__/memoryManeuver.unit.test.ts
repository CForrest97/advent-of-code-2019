import { join } from "path";
import { List } from "immutable";

import {
  sumMetadata,
  parser,
  sumMetadata2,
} from "../src/memoryManeuver";

describe("day 8 - Memory Maneuver", () => {
  describe("part 1", () => {
    test("should count the metadata for 0 children", () => {
      const input = List("0 5 2 2 2 2 2 3 3".split(" ").map(s => parseInt(s, 10)));
      expect(sumMetadata(input)[0]).toEqual(10);
    });
    test("should count the metadata for 1 child", () => {
      const input = List("1 2 0 5 2 2 2 2 2 3 3".split(" ").map(s => parseInt(s, 10)));
      expect(sumMetadata(input)[0]).toEqual(16);
    });
    test("should count the metadata", () => {
      const input = List("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2".split(" ").map(s => parseInt(s, 10)));
      expect(sumMetadata(input)[0]).toEqual(138);
    });
    test("should parse the simple file", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List(
        "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2".split(" ").map(s => parseInt(s, 10)),
      ));
    });
    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(sumMetadata(parsedFile)[0]).toEqual(47112);
    });
  });

  describe("part 2", () => {
    test("should count the metadata", () => {
      const input = List("2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2".split(" ").map(s => parseInt(s, 10)));
      expect(sumMetadata2(input)[0]).toEqual(66);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(sumMetadata2(parsedFile)[0]).toEqual(28237);
    });
  });
});
