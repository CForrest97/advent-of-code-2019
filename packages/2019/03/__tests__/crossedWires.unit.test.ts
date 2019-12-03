import { join } from "path";
import { Map } from "immutable";

import {
  parser,
  generateWire,
  findCrosses,
} from "../src/crossedWires";

describe("day 2 - 1202 Program Alarm", () => {
  test("should parse the input with simple input", async () => {
    const file = join(__dirname, "testfiles", "simpleInput.txt");
    const parsedFile = await parser(file);
    const [wire1, wire2] = parsedFile.map(line => generateWire(line));
    expect(findCrosses(wire1, wire2)).toEqual(Map({
      manhattan: 159,
      distance: 610,
    }));
  });

  test("input question", async () => {
    const file = join(__dirname, "testfiles", "input.txt");
    const parsedFile = await parser(file);
    const [wire1, wire2] = parsedFile.map(line => generateWire(line));
    expect(findCrosses(wire1, wire2)).toEqual(Map({
      manhattan: 2193,
      distance: 63526,
    }));
  });
});
