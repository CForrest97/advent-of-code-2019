import { join } from "path";
import { List, Map } from "immutable";

import {
  countOverlappingPlots,
  parser,
  findUncontestedClaim,
} from "../src/noMatterHowYouSliceIt";

describe("day 1 - No Matter How You Slice It", () => {
  describe("part 1", () => {
    test("should count overlap with 3 claims", () => {
      const input = List([
        Map({
          yOffset: 1,
          xOffset: 3,
          height: 4,
          width: 4,
        }),
        Map({
          yOffset: 3,
          xOffset: 1,
          height: 4,
          width: 4,
        }),
        Map({
          yOffset: 5,
          xOffset: 5,
          height: 2,
          width: 2,
        }),
      ]);
      expect(countOverlappingPlots(input)).toEqual(4);
    });
    test("should parse the file with 3 claims", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([
        Map({
          id: 1,
          yOffset: 1,
          xOffset: 3,
          height: 4,
          width: 4,
        }),
        Map({
          id: 2,
          yOffset: 3,
          xOffset: 1,
          height: 4,
          width: 4,
        }),
        Map({
          id: 3,
          yOffset: 5,
          xOffset: 5,
          height: 2,
          width: 2,
        }),
      ]));
    });
    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(countOverlappingPlots(parsedFile)).toEqual(101565);
    });

    describe("part 2", () => {
      test("find uncontested claims for 3 claims", () => {
        const input = List([
          Map({
            id: 1,
            yOffset: 1,
            xOffset: 3,
            height: 4,
            width: 4,
          }),
          Map({
            id: 2,
            yOffset: 3,
            xOffset: 1,
            height: 4,
            width: 4,
          }),
          Map({
            id: 3,
            yOffset: 5,
            xOffset: 5,
            height: 2,
            width: 2,
          }),
        ]);
        expect(findUncontestedClaim(input)).toEqual(3);
      });

      test("input question", async () => {
        const file = join(__dirname, "testfiles", "input.txt");
        const parsedFile = await parser(file);
        expect(findUncontestedClaim(parsedFile)).toEqual(656);
      });
    });
  });
});
