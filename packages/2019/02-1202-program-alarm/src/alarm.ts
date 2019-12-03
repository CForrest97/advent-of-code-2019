import { List } from "immutable";
import { promises as fs } from "fs";

const gravityAssist = (i: List<number>, override1: number = 12, override2: number = 2): number => {
  let intCodes = i.set(1, override1).set(2, override2);
  for (let index = 0; index < intCodes.size; index += 4) {
    const [instructionCode, parameter1, parameter2, parameter3] = intCodes.skip(index);
    if (instructionCode === 1) {
      intCodes = intCodes.set(parameter3, intCodes.get(parameter1) + intCodes.get(parameter2));
    } else if (instructionCode === 2) {
      intCodes = intCodes.set(parameter3, intCodes.get(parameter1) * intCodes.get(parameter2));
    } else if (instructionCode === 99) {
      return intCodes.get(0);
    }
  }
  return -1;
};

const targetGravityAssist = (intCodes: List<number>, target: number): number => {
  for (let i = 0; i < 100; i += 1) {
    for (let j = 0; j < 100; j += 1) {
      if (gravityAssist(intCodes, i, j) === target) {
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
