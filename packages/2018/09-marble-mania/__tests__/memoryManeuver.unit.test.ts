import playMarbleMania from "../src/marbleMania";

describe("day 9 - Marble Mania", () => {
  describe("part 1", () => {
    test("should play marbles with 9 players and 25 marbles", () => {
      expect(playMarbleMania(9, 23)).toEqual(32);
    });
    test("should play marbles with 10 players and 1618 marbles", () => {
      expect(playMarbleMania(10, 1618)).toEqual(8317);
    });
    test("should play marbles with 13 players and 7999 marbles", () => {
      expect(playMarbleMania(13, 7999)).toEqual(146373);
    });
    test("should play marbles with 17 players and 1104 marbles", () => {
      expect(playMarbleMania(17, 1104)).toEqual(2764);
    });
    test("should play marbles with 21 players and 6111 marbles", () => {
      expect(playMarbleMania(21, 6111)).toEqual(54718);
    });
    test("should play marbles with 30 players and 5807 marbles", () => {
      expect(playMarbleMania(30, 5807)).toEqual(37305);
    });
    test("input question", async () => {
      expect(playMarbleMania(446, 71522)).toEqual(390592);
    });
  });

  describe("part 2", () => {
    test("input question", async () => {
      expect(playMarbleMania(446, 7152200)).toEqual(3277920293);
    });
  });
});
