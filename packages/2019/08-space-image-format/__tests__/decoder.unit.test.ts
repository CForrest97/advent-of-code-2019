import { join } from "path";

import {
  parser,
  checksum,
  decode,
} from "../src/decoder";

describe("Day 8: Amplification Circuit", () => {
  describe("part 1", () => {
    test("should compute input question", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"), 6 * 25);
      expect(checksum(input)).toBe(2480);
    });
  });
  describe("part 2", () => {
    test("should decode simple image", async () => {
      const input = await parser(join(__dirname, "testfiles", "input.txt"), 6 * 25);
      expect(decode(input, 6, 25).length).toBe(155);
    });
  });
});
