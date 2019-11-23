import { join } from "path";
import { List, Map } from "immutable";

import {
  countDuplicates,
  calculateChecksum,
  parser,
  findCommonCharacters,
} from "../src/inventoryManagementSystem";

describe("day 1 - Chronal Calibration", () => {
  describe("part 1", () => {
    test("should count pairs and triplets from abcdef", () => {
      const input = List("abcdef".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: false, triplet: false }));
    });

    test("should count pairs and triplets from bababc", () => {
      const input = List("bababc".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: true, triplet: true }));
    });

    test("should count pairs and triplets from abbcde", () => {
      const input = List("abbcde".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: true, triplet: false }));
    });

    test("should count pairs and triplets from abcccd", () => {
      const input = List("abcccd".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: false, triplet: true }));
    });

    test("should count pairs and triplets from aabcdd", () => {
      const input = List("aabcdd".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: true, triplet: false }));
    });

    test("should count pairs and triplets from abcdee", () => {
      const input = List("abcdee".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: true, triplet: false }));
    });

    test("should count pairs and triplets from ababab", () => {
      const input = List("ababab".split(""));
      expect(countDuplicates(input)).toEqual(Map({ pair: false, triplet: true }));
    });

    test("should calculate checksum from ids", () => {
      const ids = List([
        "abcdef",
        "bababc",
        "abbcde",
        "abcccd",
        "aabcdd",
        "abcdee",
        "ababab",
      ]).map(id => List(id.split("")));

      expect(calculateChecksum(ids)).toEqual(12);
    });

    test("should parse the file with abc def ghi", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([
        List(["a", "b", "c"]),
        List(["d", "e", "f"]),
        List(["g", "h", "i"]),
      ]));
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(calculateChecksum(parsedFile)).toEqual(8296);
    });
  });

  describe("part 2", () => {
    test("find common characters for similar ids", () => {
      const ids = List([
        "abcde",
        "fghij",
        "klmno",
        "pqrst",
        "fguij",
        "axcye",
        "wvxyz",
      ]).map(s => List(s.split("")));
      expect(findCommonCharacters(ids)).toEqual("fgij");
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(findCommonCharacters(parsedFile)).toEqual("pazvmqbftrbeosiecxlghkwud");
    });
  });
});
