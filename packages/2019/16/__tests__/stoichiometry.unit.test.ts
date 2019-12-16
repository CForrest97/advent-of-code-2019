import { List } from "immutable";
import part1 from "../src/stoichiometry";

describe("Day 10: Monitoring Station", () => {
  describe("part 1", () => {
    test("input question", async () => {
      const input = "59758034323742284979562302567188059299994912382665665642838883745982029056376663436508823581366924333715600017551568562558429576180672045533950505975691099771937719816036746551442321193912312169741318691856211013074397344457854784758130321667776862471401531789634126843370279186945621597012426944937230330233464053506510141241904155782847336539673866875764558260690223994721394144728780319578298145328345914839568238002359693873874318334948461885586664697152894541318898569630928429305464745641599948619110150923544454316910363268172732923554361048379061622935009089396894630658539536284162963303290768551107950942989042863293547237058600513191659935";
      expect(part1(input)).toEqual(List.of(3, 0, 3, 7, 9, 5, 8, 5));
    });
  });
  // describe("part 2", () => {
  //   test("input question", async () => {
  //     const input = await parser(join(__dirname, "testfiles", "input.txt"));
  //     expect(search(input, 1000000000000, 783895, 7838950)).toEqual(1896688);
  //   });
  // });
});
