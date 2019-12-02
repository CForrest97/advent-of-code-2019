import { List } from "immutable";
import { promises as fs } from "fs";

const gravityAssist = (i: List<number>): List<number> => {
  let intCodes = i;
  for (let index = 0; index < intCodes.size; index += 4) {
    const [instructionCode, parameter1, parameter2, parameter3] = intCodes.skip(index).take(4);
    if (instructionCode === 1) {
      intCodes = intCodes.set(parameter3, intCodes.get(parameter1) + intCodes.get(parameter2));
    } else if (instructionCode === 2) {
      intCodes = intCodes.set(parameter3, intCodes.get(parameter1) * intCodes.get(parameter2));
    } else if (instructionCode === 99) {
      return intCodes;
    }
  }
  return List();
};

const targetGravityAssist = (intCodes: List<number>, target: number): number => {
  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 100; j += 1) {
      const modifiedCodes = intCodes.set(1, i).set(2, j);
      if (gravityAssist(modifiedCodes).get(0) === target) {
        return i * 100 + j;
      }
    }
  }
  return -1;
};

const parser = async (filePath: string): Promise<List<number>> => {
  const contents: Buffer = await fs.readFile(filePath);
  const intCodes = List(contents.toString().split(","));
  return intCodes.map(n => parseInt(n, 10));
};

export {
  gravityAssist,
  parser,
  targetGravityAssist,
};
