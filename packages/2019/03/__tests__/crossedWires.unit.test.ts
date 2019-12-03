import { join } from "path";
import { Map } from "immutable";

import {
  parser,
  generateWire,
  findIntersectionPoints,
} from "../src/crossedWires";

describe("day 3 - Crossed Wires", () => {
  test("should parse the input with simple input", async () => {
    const file = join(__dirname, "testfiles", "simpleInput.txt");
    const parsedFile = await parser(file);
    const [wire1, wire2] = parsedFile.map(line => generateWire(line));
    expect(findIntersectionPoints(wire1, wire2)).toEqual(Map({
      manhattan: 159,
      distance: 610,
    }));
  });

  test("input question", async () => {
    const file = join(__dirname, "testfiles", "input.txt");
    const parsedFile = await parser(file);
    const [wire1, wire2] = parsedFile.map(line => generateWire(line));
    expect(findIntersectionPoints(wire1, wire2)).toEqual(Map({
      manhattan: 2193,
      distance: 63526,
    }));
  });
});
