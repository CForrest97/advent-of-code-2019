import {
  getValidPasswords1,
  getValidPasswords2,
} from "../src/secureContainer";

describe("day 4", () => {
  describe("part 1", () => {
    test("input question", () => {
      expect(getValidPasswords1(357253, 892942)).toEqual(530);
    });
  });
  describe("part 2", () => {
    test("input question", () => {
      expect(getValidPasswords2(357253, 892942)).toEqual(324);
    });
  });
});
