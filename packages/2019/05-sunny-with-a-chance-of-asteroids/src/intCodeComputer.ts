import { List, Map } from "immutable";
import { promises as fs } from "fs";

const add = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) + intCodes.get(parameters[1]));
const multiply = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) * intCodes.get(parameters[1]));
const storeInput = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[0], parameters[3]);
const identity = (intCodes: List<number>): List<number> => intCodes;
const isLessThan = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) < intCodes.get(parameters[1]) ? 1 : 0);
const isEqual = (intCodes: List<number>, ...parameters): List<number> => intCodes
  .set(parameters[2], intCodes.get(parameters[0]) === intCodes.get(parameters[1]) ? 1 : 0);

const addFour = (index: number): number => index + 4;
const addTwo = (index: number): number => index + 2;
const jumpIfTrue = (index: number, intCodes: List<number>, ...parameters): number => (
  intCodes.get(parameters[0]) ? intCodes.get(parameters[1]) : index + 3);
const jumpIfFalse = (index: number, intCodes: List<number>, ...parameters): number => (
  intCodes.get(parameters[0]) ? index + 3 : intCodes.get(parameters[1]));

const opcodes = Map.of(
  1, Map({ updateIntCode: add, updateIndex: addFour }),
  2, Map({ updateIntCode: multiply, updateIndex: addFour }),
  3, Map({ updateIntCode: storeInput, updateIndex: addTwo }),
  4, Map({ updateIntCode: identity, updateIndex: addTwo }),
  5, Map({ updateIntCode: identity, updateIndex: jumpIfTrue }),
  6, Map({ updateIntCode: identity, updateIndex: jumpIfFalse }),
  7, Map({ updateIntCode: isLessThan, updateIndex: addFour }),
  8, Map({ updateIntCode: isEqual, updateIndex: addFour }),
);

const compute = (i: List<number>, inputValues: List<number>) => {
  let intCodes = i;
  let outputs = List();
  let index = 0;
  let inputValuesIndex = 0;

  while (intCodes.skip(index).first() !== 99) {
    let [instructionCode, parameter1, parameter2, parameter3] = intCodes.skip(index);

    if (instructionCode > 10) {
      if (instructionCode % 1000 >= 100) parameter1 = index + 1;
      if (instructionCode % 10000 >= 1000) parameter2 = index + 2;
      if (instructionCode % 100000 >= 10000) parameter3 = index + 3;
      instructionCode %= 10;
    }

    intCodes = opcodes.get(instructionCode).get("updateIntCode")(intCodes, parameter1, parameter2, parameter3, inputValues.get(inputValuesIndex));
    index = opcodes.get(instructionCode).get("updateIndex")(index, intCodes, parameter1, parameter2);

    if (instructionCode === 4) {
      outputs = outputs.push(intCodes.get(parameter1));
    }
    if (instructionCode === 3) {
      inputValuesIndex += 1;
      if (inputValues.size < inputValuesIndex) {
        return outputs;
      }
    }
  }
  return outputs;
};

const parser = async (filePath: string): Promise<List<number>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const intCodes = List(contents.toString().split(","));
  return intCodes.map(n => parseInt(n, 10));
};

export {
  compute,
  parser,
};
