import { join } from "path";
import { List, Map } from "immutable";

import {
  countSleepingMinutes,
  strategy1,
  parser,
  strategy2,
} from "../src/reposeRecord";

describe("day 4 - Repose Record", () => {
  describe("part 1", () => {
    test("should process logs", () => {
      const input = List([
        Map({
          dateTime: "1518-05-12 23:15",
          action: "begins shift",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-13 00:15",
          action: "falls asleep",
          number: 15,
        }),
        Map({
          dateTime: "1518-05-13 00:20",
          action: "wakes up",
          number: 20,
        }),
      ]);

      expect(countSleepingMinutes(input).get(10).getTotalSleepingMinutes()).toEqual(5);
    });
    test("should find the sleepiest guard", () => {
      const input = List([
        Map({
          dateTime: "1518-05-14 23:15",
          action: "begins shift",
          number: 11,
        }),
        Map({
          dateTime: "1518-05-15 00:15",
          action: "falls asleep",
          number: 19,
        }),
        Map({
          dateTime: "1518-05-15 00:20",
          action: "wakes up",
          number: 20,
        }),
        Map({
          dateTime: "1518-05-12 23:15",
          action: "begins shift",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-13 00:15",
          action: "falls asleep",
          number: 15,
        }),
        Map({
          dateTime: "1518-05-13 00:20",
          action: "wakes up",
          number: 20,
        }),
        Map({
          dateTime: "1518-05-13 23:15",
          action: "begins shift",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-14 00:15",
          action: "falls asleep",
          number: 19,
        }),
        Map({
          dateTime: "1518-05-14 00:20",
          action: "wakes up",
          number: 25,
        }),
      ]);
      expect(strategy1(input)).toBe(190);
    });
    test("should parse the file with 3 logs", async () => {
      const file = join(__dirname, "testfiles", "simpleInput.txt");
      const parsedFile = await parser(file);
      expect(parsedFile).toEqual(List([
        Map({
          dateTime: "1518-05-12 23:15",
          action: "begins shift",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-13 00:15",
          action: "falls asleep",
          number: 15,
        }),
        Map({
          dateTime: "1518-05-13 00:20",
          action: "wakes up",
          number: 20,
        }),
      ]));
    });
    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(strategy1(parsedFile)).toEqual(143415);
    });
  });

  describe("part 2", () => {
    test("should find the most regular sleeper", () => {
      const input = List([
        Map({
          dateTime: "1518-05-12 23:15",
          action: "begins shift",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-13 00:15",
          action: "falls asleep",
          number: 19,
        }),
        Map({
          dateTime: "1518-05-13 00:20",
          action: "wakes up",
          number: 20,
        }),
        Map({
          dateTime: "1518-05-13 23:15",
          action: "begins shift",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-14 00:15",
          action: "falls asleep",
          number: 19,
        }),
        Map({
          dateTime: "1518-05-14 00:20",
          action: "wakes up",
          number: 20,
        }),
        Map({
          dateTime: "1518-05-14 23:15",
          action: "begins shift",
          number: 20,
        }),
        Map({
          dateTime: "1518-05-15 00:15",
          action: "falls asleep",
          number: 10,
        }),
        Map({
          dateTime: "1518-05-15 00:20",
          action: "wakes up",
          number: 50,
        }),
      ]);
      expect(strategy2(input)).toEqual(190);
    });

    test("input question", async () => {
      const file = join(__dirname, "testfiles", "input.txt");
      const parsedFile = await parser(file);
      expect(strategy2(parsedFile)).toEqual(49944);
    });
  });
});
