// import { join } from "path";
import { List, Repeat } from "immutable";
import { join } from "path";

import IntcodeComputer from "../src/IntcodeComputer";
import { parser } from "../../05-sunny-with-a-chance-of-asteroids/src/intCodeComputer";

describe("Intcode Computer", () => {
  test("should be able to process 1 and 2 intcodes", () => {
    const c = new IntcodeComputer(List.of(1, 0, 0, 0, 99), List());
    c.compute();
    expect(c.getIndex()).toEqual(4);
    expect(c.isComplete()).toEqual(true);
    expect(c.getIntcode()).toEqual(List.of(2, 0, 0, 0, 99));
  });
  test("should be able to handle I/O", () => {
    const c = new IntcodeComputer(List.of(3, 0, 4, 0, 99), List.of(7));
    c.compute();
    expect(c.getIndex()).toEqual(4);
    expect(c.isComplete()).toEqual(true);
    expect(c.getIntcode()).toEqual(List.of(7, 0, 4, 0, 99));
    expect(c.getOutputs()).toEqual(List.of(7));
  });
  test("should be able to handle multiple inputs", () => {
    const c = new IntcodeComputer(List.of(3, 0, 3, 0, 4, 0, 99), List.of(7, 6));
    c.compute();
    expect(c.getIndex()).toEqual(6);
    expect(c.isComplete()).toEqual(true);
    expect(c.getIntcode()).toEqual(List.of(6, 0, 3, 0, 4, 0, 99));
    expect(c.getOutputs()).toEqual(List.of(6));
  });
  test("should block without an input", () => {
    const c = new IntcodeComputer(List.of(3, 0, 4, 0, 99), List.of());
    c.compute();
    expect(c.getIndex()).toEqual(0);
    expect(c.isComplete()).toEqual(false);
    expect(c.getIntcode()).toEqual(List.of(3, 0, 4, 0, 99));
    expect(c.isBlocked()).toEqual(true);
  });
  test("should unblock when an input is supplied", () => {
    const c = new IntcodeComputer(List.of(3, 0, 4, 0, 99), List.of());
    c.compute();
    c.addInput(5);
    expect(c.getIndex()).toEqual(4);
    expect(c.isComplete()).toEqual(true);
    expect(c.getIntcode()).toEqual(List.of(5, 0, 4, 0, 99));
    expect(c.isBlocked()).toEqual(false);
    expect(c.getOutputs()).toEqual(List.of(5));
  });
  test("should solve day 2", async () => {
    const input = await parser(join(__dirname, "testfiles", "02.input.txt"));
    const c = new IntcodeComputer(input, List.of());
    c.compute();
    expect(c.isComplete()).toEqual(true);
    expect(c.isBlocked()).toEqual(false);
    expect(c.getIntcode().get(0)).toEqual(4570637);
  });
  test("should solve day 5.1", async () => {
    const input = await parser(join(__dirname, "testfiles", "05.input.txt"));
    const c = new IntcodeComputer(input, List.of(1));
    c.compute();
    expect(c.isComplete()).toEqual(true);
    expect(c.isBlocked()).toEqual(false);
    expect(c.getOutputs()).toEqual(
      List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 13285749),
    );
  });
  test("should solve day 5.2", async () => {
    const input = await parser(join(__dirname, "testfiles", "05.input.txt"));
    const c = new IntcodeComputer(input, List.of(5));
    c.compute();
    expect(c.isComplete()).toEqual(true);
    expect(c.isBlocked()).toEqual(false);
    expect(c.getOutputs()).toEqual(List.of(5000972));
  });
  test("should solve quine", async () => {
    const input = await parser(join(__dirname, "testfiles", "quine.txt"));
    const c = new IntcodeComputer(input.concat(Repeat(0, 10000)), List.of());
    c.compute();
    expect(c.getOutputs()).toEqual(input);
  });
  test("should output big number", async () => {
    const input = await parser(join(__dirname, "testfiles", "bigOutput.txt"));
    const c = new IntcodeComputer(input.concat(Repeat(0, 10000)), List.of());
    c.compute();
    expect(c.getOutputs().last()).toEqual(1219070632396864);
  });
  test("should output big number in itself", async () => {
    const input = List.of(104, 1125899906842624, 99);
    const c = new IntcodeComputer(input.concat(Repeat(0, 10000)), List.of());
    c.compute();
    expect(c.getOutputs().last()).toEqual(1125899906842624);
  });
  test("should solve day 9.1", async () => {
    const input = await parser(join(__dirname, "testfiles", "09.input.txt"));
    const c = new IntcodeComputer(input.concat(Repeat(0, 10000)), List.of(1));
    c.compute();
    expect(c.getOutputs().first()).toBe(3742852857);
  });
  test("should solve day 9.2", async () => {
    const input = await parser(join(__dirname, "testfiles", "09.input.txt"));
    const c = new IntcodeComputer(input.concat(Repeat(0, 10000)), List.of(2));
    c.compute();
    expect(c.getOutputs().first()).toBe(73439);
  });
});
